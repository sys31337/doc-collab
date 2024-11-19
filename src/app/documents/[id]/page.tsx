'use client';

import React, { useEffect, useState } from 'react';
import { useOthersMapped, useSelf } from "@liveblocks/react";
import { AnimatePresence, motion } from "framer-motion";
import useDocumentStore from '@lib/stores/documentStore';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Content } from '@tiptap/react';
import { TooltipProvider } from '@components/ui/tooltip';
import { useParams } from 'next/navigation';
import Room from 'app/Room';
import { MinimalTiptapEditor } from '@components/minimal-tiptap';
import { Avatar } from '@components/Avatars';

const MAX_OTHERS = 3;

const animationProps = {
  initial: { width: 0, transformOrigin: "left" },
  animate: { width: "auto", height: "auto" },
  exit: { width: 0 },
  transition: {
    type: "spring",
    damping: 15,
    mass: 1,
    stiffness: 200,
    restSpeed: 0.01,
  },
};

const avatarProps = {
  style: { marginLeft: "-0.45rem" },
  size: 48,
  outlineWidth: 3,
  outlineColor: "white",
};

const EditDocumentComponent: React.FC<{ id: string }> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Content>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const others = useOthersMapped((other) => other.info);
  const currentUser = useSelf();
  const hasMoreUsers = others.length > MAX_OTHERS;

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
        <div className='w-full flex justify-end'>
          <div className='flex items-center border w-fit p-1 ps-3 rounded-lg my-1 bg-white shadow-sm me-0'>
            <p className='text-sm'>Currently in this document</p>
            <div
              style={{
                minHeight: avatarProps.size + "px",
                display: "flex",
                paddingLeft: "0.75rem",
                overflow: "hidden",
              }}
            >
              <AnimatePresence>
                {hasMoreUsers ? (
                  <motion.div key="count" {...animationProps}>
                    <Avatar {...avatarProps} variant="more" count={others.length - 3} />
                  </motion.div>
                ) : null}

                {others
                  .slice(0, MAX_OTHERS)
                  .reverse()
                  .map(([key, info]) => (
                    <motion.div key={key} {...animationProps}>
                      <Avatar
                        {...avatarProps}
                        src={info.avatar}
                        name={info.name}
                        color={[info.color, info.color]}
                      />
                    </motion.div>
                  ))}

                {currentUser ? (
                  <motion.div key="you" {...animationProps}>
                    <Avatar
                      {...avatarProps}
                      src={currentUser.info.avatar}
                      name={currentUser.info.name + " (you)"}
                      color={[currentUser.info.color, currentUser.info.color]}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <Input
          placeholder="Title"
          value={title}
          className='bg-white'
          onChange={(e) => setTitle(e.target.value)}
        />
        <MinimalTiptapEditor
          value={content}
          onChange={setContent}
          className="w-full bg-white border-0 my-2"
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

const EditDocument = () => {
  const { id } = useParams<{ id: string; }>()
  return (
    <Room roomId={id}>
      <EditDocumentComponent id={id} />
    </Room>
  )
}

export default EditDocument
