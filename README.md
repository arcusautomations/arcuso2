# Arcus Automations - AI & Tech Solutions Platform

A production-ready web application for Arcus Automations, featuring secure authentication, user dashboard, and resource management.

## 🚀 Features

- **Secure Authentication**: Email/password signup and login with Supabase Auth
- **User Dashboard**: Access to training courses, guides, and resources
- **Profile Management**: User onboarding and settings
- **Row Level Security**: Database-level access control via Supabase RLS
- **Security Headers**: CSP, HSTS, and other security measures
- **Responsive Design**: Mobile-first UI built with Tailwind CSS

## 📋 Prerequisites

- Node.js 18.17.0 or higher
- npm 9.x or higher
- Supabase account and project
- Vercel account (for deployment)

## 🛠️ Setup

### 1. Clone and Install

```bash
cd src
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the template
cp .env.template .env.local

# Edit .env.local with your Supabase credentials
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Server-only service role key (never expose to client)
- `SUPABASE_JWT_SECRET` - JWT secret for token verification

### 3. Set Up Database

Run the following SQL scripts in your Supabase SQL Editor (in order):

1. `scripts/migrate.sql` - Creates tables and triggers
2. `scripts/rls-policies.sql` - Enables Row Level Security
3. `scripts/seed.sql` - (Optional) Adds initial resource data

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (protected)/       # Authenticated routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client factories
│   ├── validation/       # Zod schemas
│   └── auth/             # Auth helpers
├── types/                 # TypeScript types
├── scripts/               # Database and deployment scripts
└── tests/                 # Test suites
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:ci
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub** and connect to Vercel

2. **Set Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`

3. **Deploy** - Vercel will build and deploy automatically

4. **Verify Deployment**:
   ```bash
   ./scripts/verify-postdeploy.sh https://your-app.vercel.app
   ```

## 🔒 Security

This application implements several security measures:

- **Environment Separation**: Server-only secrets never exposed to client
- **Row Level Security**: Database policies control data access
- **Input Validation**: Zod schemas validate all user input
- **Security Headers**: CSP, X-Frame-Options, HSTS, etc.
- **HTTPS Only**: All production traffic uses HTTPS

### Security Checklist

- [ ] Environment variables properly configured
- [ ] RLS policies applied to all tables
- [ ] No secrets in version control
- [ ] Security headers verified
- [ ] npm audit shows no critical vulnerabilities

## 📚 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |
| `npm run test:unit` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:ci` | Run all tests (CI) |
| `npm run audit` | Run security audit |

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `vercel.json` - Vercel deployment settings
- `vitest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration
- `middleware.ts` - Security middleware

## 📝 Database Schema

### Tables

- **profiles** - User profile information
- **projects** - User projects
- **resources** - Platform resources (courses, guides)
- **user_resource_progress** - Progress tracking
- **user_purchases** - Purchase records

See `scripts/migrate.sql` for full schema.

## 🆘 Troubleshooting

### Common Issues

**"Missing environment variables" error**
- Ensure `.env.local` exists and contains all required variables
- Restart the development server after changes

**Authentication not working**
- Check Supabase project URL and keys
- Verify email templates are configured in Supabase

**Database errors**
- Ensure migrations have been applied
- Check RLS policies are enabled

**Build failures**
- Run `npm run typecheck` to check for TypeScript errors
- Run `npm run lint` to check for linting issues

## 📄 License

Proprietary - Arcus Automations

## 🤝 Support

For support, contact the Arcus Automations team.

---

Built with ❤️ using Next.js, Supabase, and Tailwind CSS
