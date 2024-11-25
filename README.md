
# Doc-Collab
## Overview:

**Doc-Collab** a collaborative document editing platform! using powerful set of technologies to deliver a seamless, interactive experience for users. Our tech stack includes:

- [**Liveblocks**](https://liveblocks.io/) – Real-time collaboration engine for multi-user interaction.
- [**Next.js**](https://nextjs.org/) – React framework for building fast, user-friendly web applications.
- [**Supabase**](https://supabase.com/) – Open-source Firebase alternative for database and authentication.
- [**Zustand**](https://github.com/pmndrs/zustand) – A fast and scalable state management solution for React.
- [**shadcn**](https://ui.shadcn.com/) – A library of modern UI components for beautiful and responsive design.

## Features

- **Authentication** – Different methods to login using supabase
- **Real-Time Document Collaboration** – Users can edit documents together, with changes instantly reflected across all users, and synchronizing to supabase database, with the ability to track other's cursors in real-time
- **Responsive Design** – The platform is responsive, ensuring an optimal user experience across all devices, using shadcn different components and tailwind classes.

## Setup

1. Clone the repo
   ```sh
   git clone https://github.com/sys31337/doc-collab
   ```
2. Installing dependencies (Using **Yarn**)
   ```sh
   yarn
   ```
3. Copy `.env.example` to `.env.local`
4. Set the variables accordingly

## Environment file
`NEXT_PUBLIC_SUPABASE_URL`: A link provided by supabase to ensure auth client

`NEXT_PUBLIC_SUPABASE_ANON_KEY`: A JWT Key provided by supabase to create client

`NEXT_PUBLIC_ROOM_PREFIX`: The room prefix to create in liveblocks

`NEXT_PRIVATE_LIVEBLOCKS_SECRET_KEY`: Secret key from liveblocks that allows Liveblocks initializing

`NEXT_PRIVATE_LIVEBLOCKS_WEBHOOK_SIGNING_SECRET`: A Secret key that is used to sync data

## Scripts

1. To start the dev server
   ```sh
   yarn dev
   ```
2. Build
   ```sh
   yarn build
   ```
3. Lint using `estlint`, to check for problems and syntax errors
   ```sh
   yarn lint
   ```
4. Serve on production
   ```sh
   yarn serve
   ```
