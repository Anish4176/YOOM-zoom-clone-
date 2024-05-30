import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({setisSetupComplete}:{setisSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false);
  const call= useCall();
  
  if(!call){
    throw new Error("useCall must be used")
  }

  useEffect(() => {
    if(isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  
    
  }, [isMicCamToggledOn,call?.camera, call?.microphone])
  
  return (
    <div className='flex h-screen text-white flex-col justify-center items-center gap-3'>

      <h1 className='text-3xl font-bold'>Setup</h1>
      <VideoPreview/>

      <div className="h-12 flex-center">
        <label htmlFor="">
          <input
           type="checkbox" 
           checked={isMicCamToggledOn}
           onChange={(e)=>setisMicCamToggledOn(e.target.checked)}
           />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>

      <button className='bg-green-500 rounded-sm py-2 px-4' onClick={()=>{
        call.join();
        setisSetupComplete(true);
      }}>
        Join Meeting
      </button>
      
    </div>
  )
}

export default MeetingSetup