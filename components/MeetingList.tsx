"use client";
import React from "react";
import MeetingCard from "./MeetingCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"

const MeetingList = () => {
  const router = useRouter();
  const [MeetingState, setMeetingState] = useState<
    "isInstantMeeting" | "isJoinMeeting" | "isScheduleMeeting" | undefined
  >();
  const { toast } = useToast()
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime:new Date(),
    description:"",
    link:"",
  });
  const [CallDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    
    if (!user || !client) return;
    
    try {
      if(!values.dateTime){
        toast({
          title: "Please select a date and time",
        })
        return;
      }
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed to create call");
      const startsAt= values.dateTime.toISOString() || new Date(Date.now()).toISOString(); 
      const description= values.description || "Instant Meeting";

      await call.getOrCreate({
        data:{
          starts_at: startsAt,
          custom:{
            description
          }
        }
      })
      setCallDetails(call);

      if(!values.description){
        router.push(`/meeting/${callId}`);
      }
      toast({
        title: "Meeting Created",
      })

    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create meeting",
      })
    }
  };

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
        iconImage="/icons/join-meeting.svg"
        iconalt="Join Meeting"
        heading="Join Meeting"
        description="via invitation link"
        bgColor="bg-blue-1"
        handleClick={() => {
          setMeetingState("isJoinMeeting");
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
          router.push("/recordings");
        }}
      />

      <MeetingModal
        isOpen={MeetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        handleClick={createMeeting}
        btnText="Start Meeting"
        title="Start an Instant Meeting"
      />
    </section>
  );
};

export default MeetingList;
