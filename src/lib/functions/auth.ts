'use server';

import { createClient } from '@lib/supabase';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const signOut = async () => {
  'use server';
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    redirect('/login');
  }
}

export const signIn = async () => {
  'use server';
  const supabase = await createClient();
  const origin = (await headers()).get('origin')
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${origin}/auth/cb`
    }
  });
  if (error) {
    console.log(error);
  } else {
    redirect(data.url);
  }
}
