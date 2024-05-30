'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { useRouter } from 'next/navigation'

const EndCallButtton = () => {
  const router= useRouter();
  const call= useCall();
  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant= useLocalParticipant();

  const isMeetingOwner= localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
  if(!isMeetingOwner) return null;
  return (
    <button className='bg-red-500 px-4 py-2 rounded-md' onClick={async()=>{
        await call.endCall();
        router.push('/');
    }}>
      End call for Everyone
    </button>
  )
}

export default EndCallButtton