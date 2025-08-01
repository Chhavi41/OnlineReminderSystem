User Authentication
POST /auth/register → Register user (email, password, name).
POST /auth/login → Login and receive JWT.
<!-- GET /auth/me → Fetch logged-in user profile. -->

Reminders CRUD
POST /reminders → Create reminder (title, description, datetime).
GET /reminders → Get all upcoming reminders for logged-in user.
<!-- PUT /reminders/:id → Update reminder. -->
<!-- DELETE /reminders/:id → Delete reminder. -->

Email Notifications
Use node-cron or database polling to find reminders that match the current time.
Send email via Nodemailer.