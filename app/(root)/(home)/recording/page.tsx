import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='text-3xl font-bold'>
        Recordings
      </h1>
      <CallList type='recording'/>
    </section>
  )
}

export default Recordings