'use client'
import React from 'react'
import { SidebarLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
const Sidebar = () => {
    const pathname= usePathname();
  return (
    <section className='sticky h-screen bg-dark-2 flex flex-col text-white top-0 left-0 max-sm:hidden p-6 pt-28'>
      <div className='flex flex-col gap-6  max-w-[264px]'>
         {
            SidebarLinks.map((item)=>{
             const isActive= pathname=== item.link || pathname.startsWith(`${item.link}/`) ;
             return(
              <Link href={item.link} className={cn('flex gap-4 p-4 rounded-lg ',{
                'bg-blue-600': isActive
              })}
              key={item.linkName}
              >
                <Image
                 src={item.imgUrl}
                 alt={item.linkName}
                 width={24}
                 height={24}
                />
                <p className='text-lg font-semibold max-lg:hidden'>{item.linkName}</p>
              </Link>
             )
            })
         }
      </div>
    </section>
  )
}

export default Sidebar