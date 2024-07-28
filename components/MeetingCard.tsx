import Image from "next/image";
import React from "react";
interface MeetingCardProps {
  iconImage: string;
  iconalt: string;
  heading: string;
  description: string;
  bgColor: string;
  handleClick: () => void;
}

const MeetingCard = ({
  iconImage,
  iconalt,
  heading,
  description,
  bgColor,
  handleClick,
}: MeetingCardProps) => {
  return (
    <div
      className={`flex justify-between flex-col px-4 py-4 ${bgColor} rounded-[6px] h-[260px] cursor-pointer`}
      onClick={() => {
        handleClick();
      }}
    >
      <div className="flex-center size-10 glassmorphism rounded-sm">
        <Image src={iconImage} alt={iconalt} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{heading} </h1>
        <p className="text-lg font-normal">{description} </p>
      </div>
    </div>
  );
};

export default MeetingCard;
