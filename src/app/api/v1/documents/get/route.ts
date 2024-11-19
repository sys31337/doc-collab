import { createClient } from '@lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user: user } } = await supabase.auth.getUser();
  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user?.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ documents }, { status: 200 });

}
