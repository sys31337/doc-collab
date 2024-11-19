"use client";

import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { createBrowserClient } from '@supabase/ssr';
import useUserStore from '@lib/stores/userStore';

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const loadUser = async () => {
      const supabase = createBrowserClient(`${supabaseUrl}`, `${supabaseAnonKey}`);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user
    ? (<div className="flex flex-1 flex-col bg-gray-50 min-h-[100dvh] h-full w-full" >
      <Navbar user={user} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl p-5">
          {children}
        </div>
      </main>
    </div>)
    : (<>{children}</>)
}

export default Layout
