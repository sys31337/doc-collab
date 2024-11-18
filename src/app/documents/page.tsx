import React from 'react'
// import useDocumentStore from '@lib/stores/documentStore';
import { createClient } from '@lib/supabase';

const Documents: React.FC = async () => {
  // const { documents, setDocuments } = useDocumentStore();

  const supabase = await createClient();
  const { data: { user: user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('documents').select('*').eq('user_id', user?.id);

  if (!error) {
    // setDocuments(data);
  }
  return (
    <div>
      {data?.map(({ id, title }) => (
        <div key={id}>
          {id} - {title}
        </div>
      ))}
    </div>
  )
}

export default Documents
