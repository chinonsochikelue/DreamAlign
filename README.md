# DreamAlign

**DreamAlign** is an AI-powered career coaching platform that helps users align their dreams with actionable career goals. It offers personalized guidance using generative AI, a clean onboarding process, and tools to explore, grow, and thrive in your career journey.

![DreamAlign Logo](public/logo.png)

---

## 🚀 Features

- 🧠 AI-Powered Career Coach (Gemini API)
- 🔐 Seamless authentication with Clerk
- 🗺️ Personalized onboarding experience
- 🎯 Career path alignment and strategy
- 🌈 Light/Dark theme support
- 📊 Data stored with PostgreSQL + Prisma
- ⚡ Built with performance-focused Next.js 15
- Modern UI using Shadcn component

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Prisma, PostgreSQL
- **Auth:** Clerk.dev
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/chinonsochikelue/DreamAlign.git
```

```bash
cd DreamAlign
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Create a `.env.local` file and add:

```env
DATABASE_URL=your_postgres_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your_gemini_api_key
```

### 4. Set up your database

```bash
npx prisma db push
```

---

## 🧪 Run in Development

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the app.

---

## 🌐 Deploying

You can deploy on [Vercel](https://vercel.com):

1. Connect your GitHub repo.
2. Add the same environment variables in Vercel settings.
3. Vercel will handle the build and deploy automatically.

---

## 📄 License

MIT © [Chinonso Chikelue](https://github.com/chinonsochikelue)

