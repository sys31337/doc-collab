import { NextResponse } from 'next/server';
import { createClient } from '@lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    const { id: uuid, email } = data.user || {};
    await supabase.from('users').upsert({ uuid, email }, { onConflict: 'email' });
  }

  return NextResponse.redirect(requestUrl.origin);
}
