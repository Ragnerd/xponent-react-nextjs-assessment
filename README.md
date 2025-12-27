# XPONENT Quiz System – Next.js Practical Assessment

## 📌 Overview

This project is a **Quiz System for internal technical interviews**, built as part of the XPONENT Next.js Developer practical assessment.

The system allows **admins** to create structured quizzes and tests, assign them to candidates, and evaluate results through both **auto-grading** and **manual review**.  
It follows a clear, role-based flow and focuses on **usability, correctness, and maintainable architecture**.

---

## 🧭 System Test Flow (Visual Overview)

The diagram below illustrates the **complete lifecycle of the application**, from quiz setup by admin to candidate test submission and evaluation.

It is intended to help evaluators quickly understand **how the system works and how to test it**.

![System Test Flow](./public/project-diagram.svg)

---

## 🧪 How to Test the Application

### 🔐 Admin Flow

1. Login as Admin  
   - **Email:** `admin@example.com`  
   - **Password:** `admin123`

2. Create a **Position**  
   Example: `Frontend Developer`

3. Create a **Quiz** under the Position  
   Example: `React & JavaScript Assessment`

4. Create **Groups** inside the Quiz  
   Examples:
   - Logic  
   - JavaScript  
   - React  

5. Add **Questions** to Groups  
   - Text-based (open answer)
   - MCQ (single or multiple correct answers)

6. Create a **Test**
   - Select a quiz
   - Choose questions from groups
   - Set test duration (e.g., 30 minutes)

7. Assign the test to an **Interviewee**
   - Provide name and email
   - Credentials are generated automatically

---

### 🧑‍💻 Candidate Flow

1. Login using assigned credentials
2. View assigned test
3. Click **Start Test**
   - Countdown timer starts immediately
4. Answer all questions
5. Submit test manually **or**
   - Test auto-submits when timer expires
6. Test becomes locked after submission or timeout

---

### 📊 Evaluation Flow

1. MCQ answers are **auto-evaluated**
2. Text answers require **manual review by admin**
3. Admin assigns scores to text responses
4. Final score report is generated per candidate

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **Prisma ORM**
- **SQLite**
- **NextAuth / Auth.js**
- **Tailwind CSS**

---

## ⚙️ Project Setup Instructions

## 1. Setup .env file
```bash
AUTH_SECRET="cFI2+xO9Uny+1Jb8ErhAB493xAiOrbpOSoEest0pKjE=" # Added by `npx auth`. Read more: https://cli.authjs.dev

NODE_ENV="development"
DATABASE_URL="file:./dev.db"

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 2. Run the development server:
```bash
npm install
npx prisma format && npx prisma generate && npx prisma db push && npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 3. Credential Registration: Verification link is available in console.
