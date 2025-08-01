# Online Reminder System

A full-stack reminder app where users can sign up, create scheduled reminders (daily/weekly/monthly), and receive email notifications when they are due.

## Features

- User registration and login with JWT authentication (cookie-based)
- Create reminders with:
  - **Daily**: specify hours of day
  - **Weekly**: select weekdays + hour
  - **Monthly**: select days of month + hour
- View upcoming reminders
- Hourly cron job evaluates due reminders and sends email notifications
- Secure password hashing (bcrypt) and JWT issuance
- Protected routes via middleware

## 🏗️ Architecture / Folder Structure
```remindersystem/
├── backend/
│ ├── src/
│ │ ├── controllers/ # Express route handlers
│ │ ├── middlewares/ # Auth middleware, error handling
│ │ ├── models/ # Mongoose schemas (User, Reminder)
│ │ ├── routes/ # API route definitions
│ │ ├── cron/ # Scheduled jobs (reminder email sender)
│ │ ├── utils/ # Helpers (email sender, validation, etc.)
│ │ ├── config/ # DB connection, environment loading
│ │ └── index.ts # Entry point
│ ├── .env # Environment variables (not committed)
│ └── package.json
├── frontend-vanilla/ # Vanilla HTML/JS frontend (or React frontend if used)
│ ├── login.html
│ ├── register.html
│ ├── reminders.html
│ ├── create.html
│ ├── js/
└── README.md # This file
```


## 🚀 Setup

### Prerequisites

- Node.js
- MongoDB running locally or remote
- Gmail account with App Password for sending emails

### Backend

1. **Install dependencies**
   ```bash
   cd backend
   npm install
```

2. **Create .env in backend/ with:**
```MONGO_URI=mongodb://127.0.0.1:27017/reminderDB
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password  # Gmail app password if using Gmail
```
`
3. **Run development server**
   npm run dev

### Frontend (vanilla HTML/JS)
1. Serve the static files:
```bash
python3 -m http.server 5173
```
2. Open in browser
http://localhost:5173/login.html



🔐 Authentication
JWT token is issued on login and stored in an httpOnly cookie.
Protected backend routes use userAuth middleware which verifies the token and attaches the user to req.user.
Frontend bootstraps auth state by calling /api/auth/me.

⚙️ Reminder Scheduling Logic
- 3 types of frequency options for scheduling reminders
- Daily: schedule contains hours (0–23); reminder triggers on those hours.
- Weekly: schedule contains weekdays (0=Sunday); uses time for hour.
- Monthly: schedule contains day-of-month (1–31); uses time for hour.


📧 Email Sending
Cron job runs hourly (cron expression: 0 * * * *) and finds due reminders based on current time/day.
Uses Nodemailer to send emails. Gmail requires an App Password if 2FA is enabled.


🔄 API Overview
Auth
POST /api/auth/register — register with { firstName, lastName, emailId, password }
POST /api/auth/login — login with { emailId, password }, sets JWT cookie
GET /api/auth/me — returns current user (requires auth)

Reminders
POST /api/reminders — create reminder; body:
{
  "title": "Example",
  "description": "Do thing",
  "frequency": "weekly",
  "schedule": [1,3], // weekdays or hours or days
  "time": 14 // required for weekly/monthly
}

GET /api/reminders — list reminders for authenticated user


🧪 Development Tips
To test the cron logic faster, temporarily adjust the cron schedule to "* * * * *" (every minute).
Ensure MongoDB is running and MONGO_URI is correct.



