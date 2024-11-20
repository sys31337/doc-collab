## Creating the following tables in your supabase

On your supabase dashboard add the following tables by executing the following SQL Queries

### Create documents table that contains the user_id (owner), title and content.
```bash
create table documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  content text default '',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
)
```

### Create collaborators table that contains shared documents
```bash
create table collaborators (
  document_id uuid references documents(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  primary key (document_id, user_id)
)
```

### Create users table that will store user emails to allow sharing documents with users using emails only
```bash
create table users (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  uuid text not null,
  email text not null unique
)
```
