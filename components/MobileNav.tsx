"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="Hamburger"
            width={32}
            height={32}
            className="sm:hidden cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-2">
          <Link href="/" className="flex gap-2">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />

            <h1 className="text-[26px] font-bold text-white">YOOM</h1>
          </Link>

          <div className="flex flex-col gap-6 pt-28 text-white">
            {SidebarLinks.map((item) => {
              const isActive =
                pathname === item.link || pathname.startsWith(`${item.link}/`);
              return (
                <SheetClose asChild key={item.linkName} >
                  <Link
                    href={item.link}
                    className={cn("flex gap-4 p-4 rounded-lg w-full max-w-60", {
                      "bg-blue-600": isActive,
                    })}
                    key={item.linkName}
                  >
                    <Image
                      src={item.imgUrl}
                      alt={item.linkName}
                      width={24}
                      height={24}
                    />
                    <p className="text-lg font-semibold ">{item.linkName}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
