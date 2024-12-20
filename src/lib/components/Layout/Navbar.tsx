'use client';

import React from 'react';
import Link from 'next/link';
import { HiDocumentMagnifyingGlass, HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { signOut } from '@functions/auth';

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => (
  <header className="max-w-7xlsticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
    <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <HiDocumentMagnifyingGlass className="h-6 w-6" />
        <h1 className='font-semibold'>Doc-Collab</h1>
      </Link>
      {user ? (
        <div className='flex items-center gap-1'>
          <Image src={user.user_metadata.avatar_url || '/default.png'} alt="profile picture" width={32} height={32} className='rounded-full' />
          <p>Welcome <span className='font-bold'>{user.user_metadata.full_name}</span></p>
          <Link href="#" onClick={signOut} className='p-0'>
            <HiArrowRightEndOnRectangle className='text-red-500' />
          </Link>
        </div>
      ) : null}
    </div>
  </header>
);

export default Navbar;
