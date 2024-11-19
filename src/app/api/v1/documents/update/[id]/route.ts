import { createClient } from '@lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { title, content } = await req.json();
  const supabase = await createClient();
  const { data: { user: user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { error } = await supabase
    .from('documents')
    .update({ title, content })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({}, { status: 200 });

}
