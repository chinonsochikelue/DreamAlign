# 🌟 DreamAlign

**DreamAlign** is an AI-powered career coaching platform designed to align your dreams with actionable career goals. With personalized guidance from generative AI, a streamlined onboarding experience, and intuitive career tools, DreamAlign empowers you to explore, grow, and thrive.

<p align="center">
  <img src="public/logo.png" alt="DreamAlign Logo" width="200" />
</p>

---

## 🚀 Features

* 🧠 **AI-Powered Career Coach** (Gemini API)
* 🔐 **Seamless Authentication** via Clerk
* 🗺️ **Personalized Onboarding** experience
* 🎯 **Career Path Strategy & Alignment**
* 🌈 **Light/Dark Theme** support
* 📊 **Data Management** with MongoDB & Prisma
* ⚡ **Performance-Optimized** with Next.js 15
* 💎 **Modern UI** with Shadcn components
* 📄 **Resume Builder**
* 📝 **Cover Letter Generator**

<!-- ---

## 🎥 Demo Video

Watch a walkthrough of the DreamAlign platform:

[![DreamAlign Demo](https://img.youtube.com/vi/your_video_id/0.jpg)](https://www.youtube.com/watch?v=your_video_id) -->


---

## 📸 Screenshots

<p align="center">
  <img src="public/home.png" alt="Home" width="300" />
  <img src="public/dasbord.png" alt="Dashboard" width="300" />
  <img src="public/ai.png" alt="AI Coach" width="300" />
  <img src="public/resume.png" alt="Resume Builder" width="300" />
  <img src="public/resumemarkd.png" alt="Resume Builder Using Markdown Editor" width="300" />
  <img src="public/cl.png" alt="Cover Letter" width="300" />
  <img src="public/cvh.png" alt="CV Helper" width="300" />
  <img src="public/cvmarkd.png" alt="Markdown CV" width="300" />
  <img src="public/user.png" alt="User Profile" width="300" />
  <img src="public/security.png" alt="Security Settings" width="300" />
  <img src="public/update.png" alt="Update Info" width="300" />
  <img src="public/account.png" alt="Account Settings" width="300" />
  <img src="public/mobhom.png" alt="Mobile Home" width="300" />
  <img src="public/mobdash.png" alt="Mobile Dashboard" width="300" />
  <img src="public/mobai.png" alt="Mobile AI Coach" width="300" />
</p>

---

## 🛠 Tech Stack

| Category     | Technology                       |
| ------------ | -------------------------------- |
| **Frontend** | Next.js 15, Tailwind CSS, Shadcn |
| **Backend**  | Prisma, MongoDB                  |
| **Auth**     | Clerk.dev                        |
| **AI**       | Google Gemini API                |
| **Hosting**  | Vercel                           |

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/chinonsochikelue/DreamAlign.git
cd DreamAlign
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=mongodb

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your_gemini_api_key
```

### 4. Initialize Database

```bash
npx prisma db push
```

---

## 🧪 Run in Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the app.

---

## 🌐 Deploying on Vercel

1. Push your repo to GitHub.
2. Connect the repo to [Vercel](https://vercel.com).
3. Set your environment variables in the Vercel dashboard.
4. Deploy — Vercel handles the rest!

---

## 📄 License

Released under the [MIT License](https://github.com/chinonsochikelue/DreamAlign/blob/main/LICENSE)
© [Chinonso Chikelue](https://github.com/chinonsochikelue)

---