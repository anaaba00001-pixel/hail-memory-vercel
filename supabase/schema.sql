-- Run once in Supabase SQL Editor; rerunning preserves existing data.
create table if not exists public.hm_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 name text not null check(char_length(name) between 1 and 100),
 role text not null check(role in ('admin','researcher')),
 active boolean not null default true
);
create table if not exists public.hm_contributions (
 id uuid primary key default gen_random_uuid(), reference text not null unique,
 name text not null check(char_length(name) between 1 and 100),
 email text not null check(char_length(email)<=190),
 title text not null check(char_length(title) between 1 and 160),
 category text not null check(category in ('story','photo','object')),
 place text not null default '' check(char_length(place)<=160),
 body text not null check(char_length(body) between 20 and 10000),
 source text not null default '' check(char_length(source)<=400),
 image_path text, consent_at timestamptz not null,
 show_name boolean not null default false,
 status text not null default 'pending' check(status in ('pending','approved','rejected')),
 review_note text, reviewed_by uuid references auth.users(id) on delete set null,
 reviewed_at timestamptz, version integer not null default 1,
 created_at timestamptz not null default now()
);
create index if not exists hm_status_created on public.hm_contributions(status,created_at desc);
create table if not exists public.hm_notes (
 contribution_id uuid not null references public.hm_contributions(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 note text not null check(char_length(note)<=5000),
 updated_at timestamptz not null default now(),
 primary key(contribution_id,user_id)
);
create table if not exists public.hm_sessions (
 token_hash text primary key, user_id uuid not null references auth.users(id) on delete cascade,
 expires_at timestamptz not null, last_seen timestamptz not null default now()
);
create index if not exists hm_session_expiry on public.hm_sessions(expires_at);
create table if not exists public.hm_rate_buckets (
 bucket text primary key, attempts integer not null, expires_at timestamptz not null
);
create index if not exists hm_rate_expiry on public.hm_rate_buckets(expires_at);
alter table public.hm_profiles enable row level security;
alter table public.hm_contributions enable row level security;
alter table public.hm_notes enable row level security;
alter table public.hm_sessions enable row level security;
alter table public.hm_rate_buckets enable row level security;
-- Browser/anonymous access is denied. Only server functions access these tables.
revoke all on public.hm_profiles,public.hm_contributions,public.hm_notes,public.hm_sessions,public.hm_rate_buckets from anon,authenticated,public;
grant all on public.hm_profiles,public.hm_contributions,public.hm_notes,public.hm_sessions,public.hm_rate_buckets to service_role;
create or replace function public.hm_rate_limit(p_key text,p_limit integer,p_window integer)
returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare k text; n integer;
begin
 if p_limit<1 or p_window<1 or char_length(p_key)<>64 then raise exception 'Invalid rate limit parameters'; end if;
 k:=p_key||':'||floor(extract(epoch from now())/p_window)::text;
 insert into public.hm_rate_buckets as b(bucket,attempts,expires_at)
 values(k,1,now()+make_interval(secs=>p_window))
 on conflict(bucket) do update set attempts=b.attempts+1 returning attempts into n;
 delete from public.hm_rate_buckets where expires_at<now();
 delete from public.hm_sessions where expires_at<now() or last_seen<now()-interval '30 minutes';
 return n<=p_limit;
end; $$;
revoke all on function public.hm_rate_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.hm_rate_limit(text,integer,integer) to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('hail-memory-private','hail-memory-private',false,4194304,array['image/webp'])
 on conflict(id) do update set public=false,file_size_limit=4194304,allowed_mime_types=array['image/webp'];
-- Do not add public policies to this bucket. Images are authorized and served by /api/image.
