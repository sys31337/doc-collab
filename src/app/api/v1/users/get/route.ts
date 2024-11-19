import { createClient } from '@lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userIds } = await req.json();
  const supabase = await createClient();
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .in('uuid', userIds);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ users }, { status: 200 });

}
