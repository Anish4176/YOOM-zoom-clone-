import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
  children?:ReactNode;
  btnText?: string;
  title?: string;
  btnIcon?:string;
  image?: string;
}
const MeetingModal = ({
  isOpen,
  onClose,
  handleClick,
  btnText,
  title,
  btnIcon,
  image,
  children
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <DialogContent className="bg-dark-1 border-none flex gap-6 flex-col justify-center items-center  py-9 px-6 text-white">
        <div className=" flex flex-col gap-6 w-full item-center justify-center">
           {
            image && (
              <div className="flex justify-center">
                <Image
                src={image}
                alt='checked'
                width={72}
                height={72}
                />

              </div>
            )
           }
            <h1 className="text-3xl font-semibold leading-[42px] text-center">{title}</h1>
            {children}
            <button onClick={handleClick} className="bg-blue-600 border-none outline-none py-2.5 flex-center gap-1.5 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0">
              {btnIcon && (
                <Image
                src={btnIcon}
                alt="button icon"
                width={15}
                height={15}
                />
              )}{" "}
              &nbsp;
                {btnText || "Schedule Meeting"}
            </button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
