import { createClient } from '@lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user: user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = user?.id;
  const { data: sharedDocuments } = await supabase.from('collaborators').select('document_id').eq('user_id', userId);
  const shared = sharedDocuments?.map(({ document_id }) => document_id);
  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
    .or(`user_id.eq.${userId},id.in.(${(shared || []).join(',')})`);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ documents }, { status: 200 });

}
