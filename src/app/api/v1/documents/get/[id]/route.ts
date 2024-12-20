import { createClient } from '@lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient();
  const { data: { user: user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: document, error } = await supabase
    .from('documents')
    .select('*')
    // .eq('user_id', user?.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ document }, { status: 200 });

}
