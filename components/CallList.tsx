// @ts-nocheck
'use client'
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'
import CallCard from './CallCard';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { toast } from './ui/use-toast';

const CallList = ({type}:{type:'upcoming' | 'ended' | 'recording'}) => {
  const router= useRouter();
  const {endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();
 
  const [recording, setrecording] = useState<CallRecording[]>([])
  
  

  const getCall=()=>{
    switch (type) {
      case 'upcoming':
        return upcomingCalls;
      case 'ended':
        return endedCalls;
      case 'recording':
        return recording;
      default:
        return [];
    }
  }

  const getNoCallMessage=()=>{
    switch (type) {
      case 'upcoming':
        return 'No upcoming calls';
      case 'ended':
        return 'No ended calls';
      case 'recording':
        return 'No Recordings';
      default:
        return '';
    }
  }
  useEffect(() => {
    const allRecording= async()=> {
      try{

        const callData= await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()));
  
        const recordings= callData.filter(call=> call.recordings.length> 0 ).flatMap( call => call.recordings);
  
        setrecording(recordings);
      }catch(err){
        toast({title: 'Try again later'})
      }
    }
    if(type==='recording') allRecording();
  }, [type, callRecordings])

  const calls= getCall();
  const noCallmessage= getNoCallMessage();
  if(isLoading) return <Loader/>

  
  
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
      {calls && calls.length>0 ? ( calls.map((meeting: Call | CallRecording )=>
      <CallCard
      key={meeting.id}
      icon={
        type =='ended' ? '/icons/upcoming.svg' : type=='upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
      }
      title={meeting.state?.custom?.description?.substring(0, 20) ||meeting?.filename?.substring(0,20) || 'Personal Meeting'}
      date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
      isPreviousMeeting={type === 'ended'}
      buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
      buttonText={type === 'recording' ? 'Play' : 'Start'}
      handleClick={type === 'recording' ? ()=>router.push(`${meeting.url}`) : ()=>router.push(`/meeting/${meeting.id}`)}
      link={type=== 'recording' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
     
       />  
    )):(
      <h1>{noCallmessage}</h1>
    )}

    </div>
  )
}

export default CallList