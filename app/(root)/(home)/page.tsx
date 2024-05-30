import MeetingList from "@/components/MeetingList";
import React from "react";

const Home = () => {

  const currentTime = new Date();
  const time = currentTime.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true });
  const date = (new Intl.DateTimeFormat('en-US',{dateStyle: 'full'})).format(currentTime);

  return (
    <section className="flex  flex-col gap-10 size-full text-white">
      <div className="h-[300px] justify-between item-center flex flex-col px-5 py-8 lg:p-11 bg-hero bg-cover rounded-md ">
        <h2 className="glassmorphism w-fit px-2 py-1 rounded-sm">
          Upcoming Meeting at 12:30 PM
        </h2>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
          <p className="text-lg text-sky-1 font-medium lg:text-2xl">{date} </p>
        </div>
      </div>
      <MeetingList/>
    </section>
  );
};

export default Home;
