import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick: () => void;
  btnText: string;
  title: string;
}
const MeetingModal = ({
  isOpen,
  onClose,
  handleClick,
  btnText,
  title
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <DialogContent className="bg-dark-1 border-none flex gap-6 flex-col justify-center items-center  py-9 px-6 text-white">
        <div className=" flex flex-col gap-6 w-full item-center justify-center">
            <h1 className="text-3xl font-semibold leading-[42px] text-center">{title}</h1>
            <button onClick={handleClick} className="bg-blue-600 border-none outline-none py-2 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0">
                {btnText}
            </button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
