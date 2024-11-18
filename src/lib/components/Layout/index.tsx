import React from 'react'
import Navbar from './Navbar';
import { createClient } from '@lib/supabase';

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col bg-gray-50 min-h-[100dvh] h-full w-full">
      <Navbar user={user} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl pt-5">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout
