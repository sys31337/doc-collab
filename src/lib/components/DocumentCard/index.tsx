import React, { useState } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@lib/components/ui/card"
import { Edit2, Send, Share, Trash } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { Document } from '@lib/types/document';
import Link from 'next/link';
import useUserStore from '@lib/stores/userStore';
import { FaLock, FaUnlock } from 'react-icons/fa';

interface DocumentCardProps {
  document: Document
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const [shareEmail, setShareEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();
  const isOwner = user?.id === document.user_id;
  const toggleModal = () => setIsOpen((prev) => !prev);
  const handleShare = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!shareEmail) return;
    const res = await fetch(`/api/v1/documents/share/${document.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: shareEmail }),
    });
    if (res.status === 200) setIsOpen(false);
  }

  return (
    <Card className="flex-1">
      <CardHeader className='relative'>
        <div className='absolute top-0 right-0 m-3'>
          {isOwner && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={toggleModal} className='p-0 w-8 h-8 rounded-full'>
                  <Share />
                </Button>
              </DialogTrigger>
              {isOpen && (
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share document</DialogTitle>
                    <DialogDescription>
                      If the user exists, they will be able to view and edit the document
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleShare}>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="email" className="sr-only">
                          Email
                        </Label>
                        <Input
                          id="email"
                          onChange={(e) => setShareEmail(e.target.value)}
                          placeholder="user@example.com"
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Send</span>
                        <Send />
                      </Button>
                    </div>
                  </form>
                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              )}
            </Dialog>
          )}
        </div>
        <CardTitle>{document.title || 'Untitled'}</CardTitle>
        <CardDescription>{
          isOwner
            ? <span className='text-xs mt-1 text-green-500 flex gap-1'><FaUnlock /> Your document</span>
            : <span className='text-xs mt-1 text-red-500 flex gap-1'><FaLock /> Document shared with you</span>
        }</CardDescription>
      </CardHeader>
      <CardFooter className='gap-2'>
        <Link href={`documents/${document.id}`} className="w-full">
          <Button className="w-full">
            <Edit2 /> View
          </Button>
        </Link>
        <Button className="w-full bg-red-500 hover:bg-red-500/90 text-white">
          <Trash /> Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DocumentCard
