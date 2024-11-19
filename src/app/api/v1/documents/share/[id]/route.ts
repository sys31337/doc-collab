import { createClient } from '@lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { email } = await req.json();

  const supabase = await createClient();
  const { data, error: userFetchError } = await supabase.from('users').select('uuid').eq('email', email).single();
  if (userFetchError) throw new Error(userFetchError.message);
  const { error } = await supabase
    .from('collaborators')
    .insert({ document_id: id, user_id: data.uuid, role: 'editor' });
  if (error) throw new Error(error.message);

  if (error) return NextResponse.json({ error: 'Error occured while adding collaborator' }, { status: 400 });

  return NextResponse.json({}, { status: 200 });

}
