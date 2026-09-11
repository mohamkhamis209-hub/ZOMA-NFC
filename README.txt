ZOMA SMART CARD — FULL FRONT-END + SUPABASE
============================================

1) Open Supabase SQL Editor and run sql/after-schema.sql after your existing ZOMA schema.
2) Make sure your Admin Auth user has a matching row in public.admins:
   insert into public.admins (id, username, full_name, role)
   values ('AUTH_USER_UUID','Mohamed','Mohamed','owner');

3) Open index.html through a local server or deploy to HTTPS (GitHub Pages/Netlify/etc.).
4) Admin: admin/login.html
5) Customer: customer/register.html
6) Public card: card/index.html?id=ZOMA-XXXXXX

IMPORTANT:
- The browser contains only the Supabase ANON/PUBLISHABLE key. Never place service_role/secret keys in these files.
- QR generation is intentionally NOT part of the business logic. The admin gets the permanent card URL and can convert it to QR using any external QR website.
- NFC: write the same permanent card URL to the physical NFC card using a compatible Android NFC writing app/device. The database never stores personal data on the NFC chip.
- The project is a complete functional prototype. Production hardening should include email verification policy, stronger admin controls, Storage for profile images, audit logs, notifications, device/session controls, and a real deployment domain.
