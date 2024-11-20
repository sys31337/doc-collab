import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { createClient } from '@lib/supabase';

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PRIVATE_LIVEBLOCKS_SECRET_KEY!,
});

export async function POST() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const session = liveblocks.prepareSession(`${user?.id || user.email}`, {
    userInfo: {
      name: user.user_metadata.full_name || user.email,
      avatar: user.user_metadata.avatar_url || 'default.png',
      color: "#85BBF0"
    },
  });

  // Todo: Adding more security for this depending on roomId
  session.allow(`${process.env.NEXT_PUBLIC_ROOM_PREFIX}*`, session.FULL_ACCESS);

  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
