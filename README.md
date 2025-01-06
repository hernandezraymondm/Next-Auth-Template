# Next-Auth-Template

## Overview

Next-Auth-Template is a comprehensive authentication template built with the latest technologies to streamline the integration of robust authentication systems in your Next.js projects. It utilizes Auth.js for authentication, middleware configuration for advanced routing and security, Resend for email services, Node.js as the runtime environment, ShaDCN UI for user interface components, and Clerk for user management and authentication services.

## Key Features

- 🔐 **Next-auth v5 (Auth.js)**
- 🚀 **Next.js 14 with server actions**
- 🔑 **Credentials Provider**
- 🌐 **OAuth Provider** (Social login with Google & GitHub)
- 🔒 **Forgot password functionality**
- ✉️ **Email verification**
- 📱 **Two-factor verification (2FA)**
- 👥 **User roles (Admin & User)**
- 🔓 **Login component** (Opens in redirect or modal)
- 📝 **Register component**
- 🤔 **Forgot password component**
- ✅ **Verification component**
- ⚠️ **Error component**
- 🔘 **Login button**
- 🚪 **Logout button**
- 🚧 **Role Gate**
- 🔍 **Exploring next.js middleware**
- 📈 **Extending & Exploring next-auth session**
- 🔄 **Exploring next-auth callbacks**
- 👤 **useCurrentUser hook**
- 🛂 **useRole hook**
- 🧑 **currentUser utility**
- 👮 **currentRole utility**
- 🖥️ **Example with server component**
- 💻 **Example with client component**
- 👑 **Render content for admins using RoleGate component**
- 🛡️ **Protect API Routes for admins only**
- 🔐 **Protect Server Actions for admins only**
- 📧 **Change email with new verification in Settings page**
- 🔑 **Change password with old password confirmation in Settings page**
- 🔔 **Enable/disable two-factor auth in Settings page**
- 🔄 **Change user role in Settings page** (for development purposes only)

## Tech Stack

- **Auth.js**
- **Middleware config**
- **Resend**
- **Node.js**
- **ShadcnUI**
- **Clerk**

## Getting Started

Follow the setup instructions to get your Next-Auth-Template up and running.

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Next-Auth-Template.git
   cd Next-Auth-Template
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
