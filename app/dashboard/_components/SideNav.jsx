"use client"

import Image from 'next/image';
import React, { useEffect } from 'react';
import { MdDashboard } from 'react-icons/md';
import { PiStudentFill } from "react-icons/pi";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNav = () => {

  const { user } = useKindeBrowserClient()
  const path = usePathname()

  useEffect(() => {
    console.log(path)
  }, [path])


  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: MdDashboard,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Student',
      icon: PiStudentFill,
      path: '/dashboard/student'
    },
    {
      id: 3,
      name: 'Attendance',
      icon: HiOutlineHandRaised,
      path: '/dashboard/attendance'
    },
    {
      id: 4,
      name: 'Settings',
      icon: CiSettings,
      path: '/dashboard/settings'
    }
  ];

  return (

    <div className='border shadow-md h-screen p-5'>
      <Image src={'/logo.svg'} width={180} height={50} alt='logo' />
      <hr className='my-5' />

      {menuList.map((menu) => (
        <Link key={menu.id} href={menu.path}>
          <div className='my-2'>
            <div
              className={`flex items-center gap-3 text-md px-4 py-3
            text-slate-500
            hover:bg-primary
            hover:text-white
            cursor-pointer
            rounded-lg
            ${path === menu.path ? 'bg-primary text-white' : ''}`}
            >
              <menu.icon className='mr-2 w-10 size-5' />
              <h2>{menu.name}</h2>
            </div>
          </div>
        </Link>
      ))}

      <div className='flex gap-2 items-center bottom-5 fixed p-4'>
        <Image src={user?.picture} width={35}
          height={35}
          alt='user'
          className='rounded-full' />
        <div>
          <h2 className='text-sm font-bold'>{user?.given_name}{user?.family_name}</h2>
          <h2 className='text-xs text-slate-400'>{user?.email}</h2>

        </div>
      </div>
    </div>
  );
};

export default SideNav;
