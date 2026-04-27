# rapid-wait 🔔

A sleek, production-ready **product availability notification** app. Customers drop their email and get notified the moment your product goes live — built with Next.js, Supabase, and Prisma.

![Coming Soon](https://img.shields.io/badge/status-coming%20soon-7F77DD?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-database-3ECF8E?style=for-the-badge&logo=supabase)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-styling-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

- **Email capture** — Customers submit their email to be notified when the product is available
- **Duplicate detection** — Prevents the same email from being added twice
- **Instant feedback** — Success and error states shown directly on the page
- **Deep purple UI** — Captivating dark theme with glowing orbs and twinkling stars
- **Supabase backend** — Emails stored securely in a Postgres database
- **Prisma ORM** — Type-safe database access with schema management
- **Server Actions** — Form handled entirely via Next.js server actions, no API routes needed
- **Fully responsive** — Works beautifully on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Runtime | Node.js 18+ |
| Bundler | Turbopack |

---

## 📁 Project Structure

```
rapid-wait/
├── prisma/
│   └── schema.prisma        # Database schema
├── src/
│   └── app/
│       ├── actions.ts        # Server action — saves email to DB
│       ├── global.css        # Tailwind base styles
│       ├── layout.tsx        # Root layout with html/body tags
│       └── page.tsx          # Main landing page UI
│   └── lib/
│       └── db.ts             # Prisma client singleton
├── .env                      # Environment variables
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS config for Tailwind
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rapid-wait.git
cd rapid-wait
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the project root:

```env
DATABASE_URL="your-supabase-connection-string"
```

Get your connection string from:
**Supabase Dashboard → Your Project → Settings → Database → Connection string (URI)**

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Push schema to database

```bash
npx prisma db push
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄 Database Schema

```prisma
model Waitlist {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

The `email` field is unique — duplicate submissions are caught and shown as a friendly error message to the user.

---

## 🧪 Testing the App

1. Start the dev server with `npm run dev`
2. Open `http://localhost:3000`
3. Enter any email address and click **Notify Me**
4. You should see the success message on screen
5. Verify the email was saved by visiting:
   - **Supabase Dashboard → Table Editor → Waitlist**, or
   - Running `npx prisma studio` and opening `http://localhost:5555`

To test duplicate detection, submit the same email twice — you'll see the "You're already on the list!" message.

---

## 🌐 Deployment

### Deploy to Vercel (recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add your `DATABASE_URL` environment variable in the Vercel project settings
4. Deploy — Vercel auto-detects Next.js and handles the build

```bash
# Or deploy via Vercel CLI
npm i -g vercel
vercel
```

> **Note:** Make sure your Supabase project allows connections from Vercel's IP ranges, or enable the connection pooler in Supabase settings.

---

## 🔒 Security Notes

- RLS (Row Level Security) is currently **disabled** on the Waitlist table in Supabase. For production, consider enabling RLS and setting appropriate policies.
- The `DATABASE_URL` must never be committed to version control — keep it in `.env` which is listed in `.gitignore`.

---

## 📬 Viewing Collected Emails

**Option 1 — Supabase Dashboard:**
Supabase → Table Editor → Waitlist table

**Option 2 — Prisma Studio (local):**
```bash
npx prisma studio
# Opens at http://localhost:5555
```

**Option 3 — SQL Editor in Supabase:**
```sql
SELECT * FROM "Waitlist" ORDER BY "createdAt" DESC;
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">Built with 💜 using Next.js + Supabase</p>
