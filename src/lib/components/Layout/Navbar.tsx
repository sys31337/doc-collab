'use client';

import React from 'react';
import Link from 'next/link';
import { HiDocumentMagnifyingGlass, HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { signOut } from '@functions/auth';
import { cn } from '@lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  user: User | null;
}

const NavLinks = [
  { id: 1, href: '/', label: 'Home' },
  { id: 2, href: '/documents', label: 'Documents' },
  { id: 3, href: '/documents/create', label: 'Create a document' },
]

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const path = usePathname();
  return (
    <header className="max-w-7xlsticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <HiDocumentMagnifyingGlass className="h-6 w-6" />
          <h1 className='font-semibold'>Doc-Collab</h1>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NavLinks.map(({ id, href, label }) => {
            const isActive = path === href;
            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  isActive
                    ? 'font-bold text-blue-500 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-50'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                )}
                prefetch={false}
              >
                {label}
              </Link>
            )
          })}
        </nav>
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
  )
};

export default Navbar;
