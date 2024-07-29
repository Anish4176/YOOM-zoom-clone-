'use client'
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'


const Table=({title,description}:{title:string ; description:string})=>{
  return(
    <div className='flex  items-center gap-4'>
      <h1 className='text-2xl font-semibold lg:text-xl xl:min-w-32'>{title} : </h1>
      <p className='truncate text-sm lg:text-lg font-bold max-sm-max-w-[320px]'>{description}</p>
    </div>
  )
}
const PersonalRoom = () => {
  const router=useRouter();
  const {user}= useUser();
  const client= useStreamVideoClient();
  const {call}= useGetCallById(user?.id!);
  const MeetingLink = `/meeting/${user?.id}/?personal=true`;
  const startnewMeeting = async() => {
    if (!user || !client) return;
    if(!call){
      const newCall = client.call("default", user?.id!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
         
          
        },
      });
    }
   router.push(`/meeting/${user?.id}/?personal=true`);
  }
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='text-3xl font-bold'>
        Personal room
      </h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.username}'s Meeting Room`} />
        <Table title='Meeting ID' description={`${user?.id} `} />
        <Table title='Meeting Link' description={`${MeetingLink}`} />       
      </div>
      <div className='flex gap-5'>
          <Button onClick={startnewMeeting} className='bg-blue-1 '>
            Start Meeting
          </Button>
          <Button
              onClick={() => {
                navigator.clipboard.writeText(MeetingLink);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >Copy Link</Button>
      </div>
    </section>
  )
}

export default PersonalRoom