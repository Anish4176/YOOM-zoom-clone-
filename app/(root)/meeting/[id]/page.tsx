'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React from 'react'
import { useState } from 'react';
import { useParams } from 'next/navigation';

const Meeting = () => {
  const {id}= useParams();
  const {user, isLoaded} =useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const {call, isCallLoading} = useGetCallById( id);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className='h-screen w-full'>
     <StreamCall call={call}>
      <StreamTheme>
       {!isSetupComplete ? (
          <MeetingSetup setisSetupComplete={setisSetupComplete} />
        ):(
          <MeetingRoom/>
        )
       }
      </StreamTheme>
     </StreamCall>
    </main>
  )
}

export default Meeting