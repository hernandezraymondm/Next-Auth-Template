
# Next-Auth-Template

## Overview

This project is a template for authentication using NextAuth. It includes setting up user authentication, managing sessions, and integrating with various providers.



### Key Features

| Feature                                  | Description                                |
|------------------------------------------|--------------------------------------------|
| Next-auth v5 (Auth.js)                   | Authentication framework                  |
| WebAuthn Passkey                         | Passwordless login                        |
| Next.js 15 with server actions           | Latest Next.js with server-side actions   |
| Credentials Provider                     | Custom login using credentials            |
| OAuth Provider                           | Social login with Google & Facebook       |
| Forgot password functionality            | Password recovery                         |
| Email verification                       | Verify email addresses                    |
| Two-factor verification (2FA)            | Enhanced security with 2FA                |
| User roles                               | Admin and User roles                      |
| Login component                          | Opens as a modal or redirect             |
| Register component                       | User registration form                   |
| Forgot password component                | Password reset form                       |
| Verification component                   | Verification flow                         |
| Error component                          | Error handling UI                         |
| Login button                             | Interactive login button                  |
| Logout button                            | Interactive logout button                 |
| Role Gate                                | Role-based access control                 |
| Exploring next.js middleware             | Middleware experimentation                |
| Extending & exploring next-auth session  | Custom session management                 |
| Exploring next-auth callbacks            | Custom authentication callbacks           |
| useCurrentUser hook                      | React hook for current user               |
| useRole hook                             | React hook for user role                  |
| currentUser utility                      | Helper to fetch current user              |
| currentRole utility                      | Helper to fetch current role              |
| Example with server component            | Server-rendered component example         |
| Example with client component            | Client-rendered component example         |
| Render content for admins                | Admin-only content with RoleGate          |
| Protect API Routes                       | Admin-only API routes                     |
| Protect Server Actions                   | Admin-only server actions                 |
| Change email in Settings page            | Email change with verification            |
| Change password in Settings page         | Password update with old password check   |
| Enable/disable two-factor auth           | 2FA management in settings                |
| Change user role in Settings page        | Development-only role changes             |

### Technologies

| Technology       | Purpose                              |
|------------------|--------------------------------------|
| Auth.js          | Authentication library              |
| Resend           | Email service                       |
| ShadcnUI         | UI components                       |
| Clerk            | Authentication management           |
| WebAuthn         | Passwordless login support          |
| PostgreSQL       | Database                            |
| Prisma           | ORM for database interaction        |
| Bcrypt           | Password hashing                    |
| JWT              | Token-based authentication          |
| TailwindCSS      | Styling framework                   |
| React Hook Form  | Form handling                       |
| Zod              | Schema validation                   |
| Next.js          | React framework                     |
| Typescript       | Type-safe JavaScript                |
| Node.js          | Backend runtime                     |
| Middleware config| Middleware setup                    |



## Getting Started

**Prerequisites Before you begin, ensure you have met the following requirements:**

- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/)
- **npm**: Install npm from [npmjs.com](https://www.npmjs.com/)
- **Git**: Install Git from [git-scm.com](https://git-scm.com/)

**Follow the setup instructions to get your Next-Auth-Template up and running.**

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Next-Auth-Template.git
cd Next-Auth-Template
```

2. Install Dependencies:

```bash
npm install
```

3. Run the development server:

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

### Project Structure

```bash
├── .next                     # Build output directory created by Next.js (do not modify)
├── actions                   # Directory containing server action files
│   ├── login.ts              # Logic for handling user login
│   └── register.ts           # Logic for handling user registration
├── app                       # Main application directory
│   ├── api                   # API routes
│   │   └── auth              # Authentication-related API routes
│   │       └── {...nextauth}
│   │           └── route.ts  # NextAuth route handler
│   ├── auth                  # Authentication pages
│   │   ├── login
│   │   │   └── page.tsx      # Login page component
│   │   ├── register
│   │   │   └── page.tsx      # Registration page component
│   │   └── layout.tsx        # Layout component for authentication pages
│   ├── favicon.ico           # Favicon for the application
│   ├── globals.css           # Global styles for the application
│   ├── layout.tsx            # Main layout component
│   └── page.tsx              # Main page component
├── components                # Directory containing reusable components
│   ├── auth                  # Authentication-related components
│   │   ├── back-button.tsx   # Back button component
│   │   ├── card-wrapper.tsx  # Card wrapper component
│   │   ├── header.tsx        # Header component
│   │   ├── login-button.tsx  # Login button component
│   │   ├── login-form.tsx    # Login form component
│   │   ├── register-form.tsx # Registration form component
│   │   └── social.tsx        # Social login buttons component
│   ├── ui                    # Directory containing ShadcnUI components
│   ├── form-error.tsx        # Form error display component
│   └── form-success.tsx      # Form success display component
├── data                      # Directory for data models
│   └── user.ts               # Functions to fetch user data from the database
├── lib                       # Library and utility functions
│   ├── db.ts                 # Database connection and setup using PrismaClient
│   └── utils.ts              # General utility functions
├── node_modules              # Directory for npm packages (do not modify)
├── prisma                    # Prisma schema and configuration
│   └── schema.prisma         # Prisma schema definition
├── public                    # Static assets
│   └── images                # Image assets
├── schemas                   # Directory for validation schemas
│   └── index.ts              # Validation schemas entry point
├── .env                      # Environment variables
├── .gitignore                # Files and directories to be ignored by git
├── auth.config.ts            # Authentication configuration
├── auth.ts                   # Authentication logic
├── components.json           # Configuration for components (optional)
├── eslint.config.mjs         # ESLint configuration
├── middleware.ts             # Middleware functions
├── next-env.d.ts             # TypeScript environment declarations for Next.js
├── next-config.ts            # Next.js configuration
├── package-lock.json         # Exact versions of npm dependencies
├── package.json              # Project metadata and npm dependencies
├── postcss.config.mjs        # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.ts        # Tailwind CSS configuration
└── tailwind.json             # Tailwind CSS settings (optional)
```

### Dev Commands

```bash
npx prisma studio             # Open Prisma Studio GUI
npx prisma generate           # Generate Prisma Client based on your schema
npx prisma db push            # Push the Prisma schema state to the database
npx prisma migrate reset      # Reset the database by applying all migrations from scratch
```

> 💡 **Hint**: After running `npx prisma migrate reset`, you should run
> `npx prisma db push` to ensure that your schema changes are correctly
> applied to the database.
