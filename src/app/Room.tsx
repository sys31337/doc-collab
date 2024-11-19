"use client";

import React, { ReactNode } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";

interface RoomProps {
  children: ReactNode;
  roomId: string
}

const Room: React.FC<RoomProps> = ({ children, roomId }) => {
  return (
    <LiveblocksProvider
      // publicApiKey={`${process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY}`}
      authEndpoint={"/api/v1/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const searchParams = new URLSearchParams(
          userIds.map((userId) => ["userIds", userId])
        );
        const response = await fetch(`/api/users?${searchParams}`);

        if (!response.ok) {
          throw new Error("Problem resolving users");
        }

        const users = await response.json();
        return users;
      }}
    >
      <RoomProvider id={`liveblocks:examples:${roomId}`} initialPresence={{
        cursor: null,
      }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;
