'use client';

import React, { useEffect, useState } from 'react'
import useDocumentStore from '@lib/stores/documentStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@lib/components/ui/card"
import { BellRing, Check, Delete, DeleteIcon, Edit2, Plus, Trash } from 'lucide-react';
import { Button } from '@components/ui/button';
import Link from 'next/link';


const Documents: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { documents, setDocuments } = useDocumentStore();

  useEffect(() => {
    const getDocument = async () => {
      const res = await fetch('/api/v1/documents/get');
      const data = await res.json();
      console.log(data)
      setDocuments(data.documents);
      setIsLoading(false);
    }
    getDocument();
  }, []);

  return isLoading ? <p>Loading</p> : (
    <div className='grid grid-cols-3 gap-4 justify-between'>
      {documents?.map(({ id, title }) => (
        <Card key={id} className="flex-1">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full inline-block border-2 border-background">
                  <img className="aspect-square h-full w-full" src="https://ui.shadcn.com/avatars/01.png" />
                </span>
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full inline-block border-2 border-background">
                  <img className="aspect-square h-full w-full" src="https://ui.shadcn.com/avatars/05.png" />
                </span>
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full inline-block border-2 border-background">
                  <img className="aspect-square h-full w-full" src="https://ui.shadcn.com/avatars/02.png" />
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className='gap-2'>
            <Button className="w-full">
              <Edit2 /> View
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-500/90 text-white">
              <Trash /> Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Link className='h-full w-full' href="/documents/create">
        <Card className='h-full w-full flex justify-center items-center'>
          <Plus />
        </Card>
      </Link>
      {(documents.length % 3 === 0) ? (
        <Card className="flex-1 opacity-0">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check /> Mark all as read
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  )
}

export default Documents
