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

export const signUp = async (payload: { email: string; password: string }) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(payload);
  if (error) {
    console.log(error);
  } else {
    redirect('/');
  }
}

export const signIn = async (payload: { email: string; password: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(payload);
  const { id: uuid, email } = data.user || {};
  await supabase.from('users').upsert({ uuid, email }, { onConflict: 'email' });
  if (error) {
    console.log(error);
  } else {
    redirect('/');
  }
}

export const oAuth = async (provider: 'discord' | 'google') => {
  'use server';
  const supabase = await createClient();
  const origin = (await headers()).get('origin')
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
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
