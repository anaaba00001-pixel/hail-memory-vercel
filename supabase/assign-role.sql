-- First create/confirm the user in Supabase Authentication > Users.
-- Replace the email and display name. Use researcher for a research account.
insert into public.hm_profiles(user_id,name,role,active)
select id,'مدير المتحف','admin',true
from auth.users where lower(email)=lower('CHANGE_ME@example.com')
on conflict(user_id) do update set name=excluded.name,role=excluded.role,active=true;
-- Confirm that one matching row exists (zero rows means incorrect email/no account).
select p.name,p.role,p.active,u.email from public.hm_profiles p join auth.users u on u.id=p.user_id
where lower(u.email)=lower('CHANGE_ME@example.com');
