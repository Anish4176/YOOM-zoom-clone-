import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling application",
  icons:{
    icon:'/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      layout:{
        logoImageUrl:"/icons/logo.svg"
      },
      variables: {
        colorPrimary:"#3758F9"
      }
    }}
     >
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>{children}
      <Toaster /> 
      </body>
    </html>
    </ClerkProvider>
  );
}
