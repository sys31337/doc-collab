import { createClient } from "@lib/supabase";
import { WebhookHandler } from "@liveblocks/node";

const webhookHandler = new WebhookHandler(`${process.env.NEXT_PRIVATE_LIVEBLOCKS_WEBHOOK_SIGNING_SECRET}`);
const API_SECRET = `${process.env.NEXT_PRIVATE_LIVEBLOCKS_SECRET_KEY}`;

export async function POST(request: Request) {
  const body = await request.json();
  const headers = request.headers;

  let event;
  try {
    event = webhookHandler.verifyRequest({
      headers: headers,
      rawBody: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err);
    return new Response("Could not verify webhook call", { status: 400 });
  }

  if (event.type === "ydocUpdated") {
    const { roomId } = event.data;

    const url = `https://api.liveblocks.io/v2/rooms/${roomId}/ydoc`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_SECRET}` },
    });
    if (!response.ok) {
      return new Response("Problem accessing Liveblocks REST APIs", {
        status: 500,
      });
    }

    const content = await response.text();
    const supabase = await createClient();
    const documentId = roomId.split(`${process.env.NEXT_PUBLIC_ROOM_PREFIX}`)[1];
    await supabase
      .from('documents')
      .update({ content })
      .eq('id', documentId)
    return new Response(null, { status: 201 });
  }

  return new Response(null, { status: 200 });
}

export async function GET(request: Request) {
  return new Response('Hello', { status: 200 });
}
