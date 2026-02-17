-- Enable pg_cron and pg_net extensions for scheduled HTTP calls
create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

-- Schedule auto-publish-blog every 2 days at 08:00 WIB (01:00 UTC)
-- The edge function has its own 2-day cooldown as safety net
select cron.schedule(
  'auto-publish-blog-every-2-days',
  '0 1 */2 * *',
  $$
  select extensions.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/auto-publish-blog',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.anon_key')
    ),
    body := '{}'::jsonb
  );
  $$
);
