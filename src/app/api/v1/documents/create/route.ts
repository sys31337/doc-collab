import { createClient } from '@lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error: dbError } = await supabase
    .from('documents')
    .insert({ title, content, user_id: user.id })
    .select();

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  return NextResponse.json({ document: data[0] }, { status: 201 });
}
