import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantListing,
  CallParticipantsList,
  CallStats,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layout, LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButtton from "./EndCallButtton";
import Loader from "./Loader";

const MeetingRoom = () => {
  const searchParams= useSearchParams();
  const isPersonalRoom= !!searchParams.get('personal');
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setshowParticipants] = useState(false);
  const {useCallCallingState}= useCallStateHooks();
  const callingState= useCallCallingState();

  if(callingState!== CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white ">
      <div className="relative flex justify-center items-center size-full ">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn('hidden h-[calc(100vh-86px) ml-2', {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setshowParticipants(false)} />
        </div>
      </div>
      <div className="bottom-0 w-full fixed flex gap-5 justify-center items-center flex-wrap">
        <CallControls />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={24} className="text-white"/>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="text-white  bg-dark-2 border-dark-2">
           {['Grid','Speaker-left','Speaker-right'].map((item,index)=>(
            <div key={index}>
              <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                setlayout(item.toLowerCase() as CallLayoutType)
              }}>
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-dark-2"/>
            </div>
           ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=> setshowParticipants((prev)=>!prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">

          <Users size={20} className="text-white"/>
          </div>
        </button>
        {!isPersonalRoom && <EndCallButtton/>}
      </div>
    </section>
  );
};

export default MeetingRoom;
