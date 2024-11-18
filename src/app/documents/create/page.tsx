'use client';

import React, { useState } from 'react';
import useDocumentStore from '@lib/stores/documentStore';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

const DocumentCreation = () => {
  const [state, setState] = useState({ title: '', content: '' });

  const addDocument = useDocumentStore((state) => state.addDocument);

  const createDocument = async () => {
    const { title, content } = state;
    const res = await fetch('/api/v1/documents/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (res.ok) {
      addDocument(data.document);
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h2>Create New Document</h2>
      <Input
        placeholder="Title"
        value={state.title}
        onChange={(e) => setState((prev) => ({ ...prev, title: e.target.value }))}
      />
      <Textarea
        placeholder="Content"
        value={state.content}
        onChange={(e) => setState((prev) => ({ ...prev, content: e.target.value }))}
      />
      <Button onClick={createDocument}>Save</Button>
    </div>
  );
};

export default DocumentCreation;
