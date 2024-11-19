'use client';

import React, { useState } from 'react';
import useDocumentStore from '@lib/stores/documentStore';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Content } from '@tiptap/react';
import { TooltipProvider } from '@components/ui/tooltip';
import { Room } from '../../Room';
import { MinimalTiptapEditor } from '@components/minimal-tiptap';

const DocumentCreation = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Content>('');
  const [isSaving, setIsSaving] = useState(false);

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

  return (
    <div>
      <TooltipProvider>
        <h2>Create New Document</h2>
        <Input
          placeholder="Title"
          value={title}
          className='bg-white'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Room>
          <MinimalTiptapEditor
            value={content}
            onChange={setContent}
            className="w-full bg-white border-0 my-2"
            editorContentClassName="px-5"
            output="html"
            placeholder="Type your description here..."
            autofocus={true}
            editable={true}
            editorClassName="focus:outline-none" />
        </Room>
        <Button onClick={createDocument} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </TooltipProvider>
    </div>
  );
};

export default DocumentCreation;
