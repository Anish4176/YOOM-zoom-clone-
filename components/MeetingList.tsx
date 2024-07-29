"use client";
import React from "react";
import MeetingCard from "./MeetingCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import Loader from "./Loader";
import { Input } from "./ui/input";

const MeetingList = () => {
  const router = useRouter();
  const [MeetingState, setMeetingState] = useState<
    "isInstantMeeting" | "isJoinMeeting" | "isScheduleMeeting" | undefined
  >();
  const { toast } = useToast();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [CallDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed to create call");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  

  if (!client || !user) return <Loader />;
  const MeetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${CallDetails?.id}`;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <MeetingCard
        iconImage="/icons/add-meeting.svg"
        iconalt="New Meeting"
        heading="New Meeting"
        description="Setup a new recording"
        bgColor="bg-orange-1"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
      />

      <MeetingCard
        iconImage="/icons/schedule.svg"
        iconalt="Schedule Meeting"
        heading="Schedule Meeting"
        description="Plan your meeting"
        bgColor="bg-purple-1"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
      />
      <MeetingCard
        iconImage="/icons/recordings.svg"
        iconalt="View Recordings"
        heading="View Recordings"
        description="Meeting recordings"
        bgColor="bg-yellow-1"
        handleClick={() => {
          router.push("/recording");
        }}
      />
            <MeetingCard
        iconImage="/icons/join-meeting.svg"
        iconalt="Join Meeting"
        heading="Join Meeting"
        description="via invitation link"
        bgColor="bg-blue-1"
        handleClick={() => {
          setMeetingState("isJoinMeeting");
        }}
      />

      {!CallDetails ? (
        <MeetingModal
          isOpen={MeetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          handleClick={createMeeting}
          title="Create Meeting"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setvalues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <DatePicker
              className="w-full bg-dark-3 outline-none p-2 rounded-md"
              selected={values.dateTime}
              onChange={(date) => setvalues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeCaption="time"
              timeIntervals={15}
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={MeetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          handleClick={() => {
            navigator.clipboard.writeText(MeetingLink);
            toast({
              title: "Meeting link copied ",
            });
          }}
          title="Meeting Created"
          image="icons/checked.svg"
          btnIcon="icons/copy.svg"
          btnText="Copy meeting link"
        />
      )}
      <MeetingModal
        isOpen={MeetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        handleClick={createMeeting}
        btnText="Start Meeting"
        title="Start an Instant Meeting"
      />
      <MeetingModal
        isOpen={MeetingState === "isJoinMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        handleClick={() => router.push(values.link)}
        btnText="Join Meeting"
        title="Type the link here"
      >
        <Input
        className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Paste the link here"
          onChange={(e) => {
            setvalues({ ...values, link: e.target.value });
          }}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingList;
