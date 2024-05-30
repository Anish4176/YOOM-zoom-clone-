import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between z-50 fixed px-6 py-4 lg:px-10 bg-dark-2 w-full text-white">
      <Link href="/" className="flex gap-2">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />

        <h1 className="text-[26px] max-sm:hidden font-bold">YOOM</h1>
      </Link>

      <div className="flex-between gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
