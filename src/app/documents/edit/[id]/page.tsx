'use client';

import React, { useEffect, useState } from 'react';
import useDocumentStore from '@lib/stores/documentStore';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Content } from '@tiptap/react';
import { MinimalTiptapEditor } from '@components/minimal-tiptap';
import { TooltipProvider } from '@components/ui/tooltip';
import { useParams } from 'next/navigation';


const EditDocument: React.FC = () => {
  const { id } = useParams<{ id: string; }>()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Content>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const addDocument = useDocumentStore((state) => state.addDocument);

  const createDocument = async () => {

    setIsSaving(true);

    const res = await fetch('/api/v1/documents/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (res.ok) {
      addDocument(data.document);
      setTitle('');
    } else {
      alert(data.error);
    }

    setIsSaving(false);
  };

  useEffect(() => {
    const getDocument = async () => {
      const res = await fetch(`/api/v1/documents/get/${id}`);
      const data = await res.json();
      setTitle(data.document.title);
      setContent(data.document.content);
      setIsLoading(false);
    }
    getDocument();
  }, [id]);

  return isLoading ? <p>Loading</p> : (
    <div>
      <TooltipProvider>
        <h2>Editx Document - {id}</h2>
        <Input
          placeholder="Title"
          value={title}
          className='bg-white'
          onChange={(e) => setTitle(e.target.value)}
        />
        <MinimalTiptapEditor
          value={content}
          onChange={setContent}
          className="w-full bg-white mt-5 border-0"
          editorContentClassName="p-5"
          immediatelyRender={false}
          output="html"
          placeholder="Type your description here..."
          autofocus={true}
          editable={true}
          editorClassName="focus:outline-none"
        />
        <Button onClick={createDocument} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </TooltipProvider>
    </div>
  );
};

export default EditDocument
