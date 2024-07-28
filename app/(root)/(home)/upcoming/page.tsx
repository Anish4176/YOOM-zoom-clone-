import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='text-3xl font-bold'>
        Upcoming
      </h1>
      <CallList type="upcoming"/>
    </section>
  )
}

export default Upcoming