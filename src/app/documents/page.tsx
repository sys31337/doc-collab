'use client';

import React, { useEffect, useState } from 'react'
import useDocumentStore from '@lib/stores/documentStore';
import { Card } from "@lib/components/ui/card"
import { Plus } from 'lucide-react';
import Link from 'next/link';
import DocumentCard from '@components/DocumentCard';


const Documents: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { documents, setDocuments } = useDocumentStore();

  useEffect(() => {
    const getDocument = async () => {
      const res = await fetch('/api/v1/documents/get');
      const data = await res.json();
      setDocuments(data.documents);
      setIsLoading(false);
    }
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? <p>Loading</p> : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
      <Link className='h-full w-full' href="/documents/create">
        <Card className='h-full w-full flex flex-col justify-center items-center'>
          <Plus className='w-8 h-8' />
          <p>Create new document</p>
        </Card>
      </Link>
      {documents?.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  )
}

export default Documents
