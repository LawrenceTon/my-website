# 🏛️ Bountiful Journey - Setup Instructions

## Your Technical Architecture

This "Sovereign Sanctuary" uses:
- **Database**: Supabase (PostgreSQL) - Permanent Record
- **Calendly**: elkilla1989@gmail.com - Managed Inbox
- **Email Service**: Supabase Auth - Magic Links
- **Frontend**: React + TypeScript

---

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in with GitHub
3. Click **"New Project"**
4. Name it: `ideadex-bountiful`
5. Create a strong password
6. Wait for deployment (2-3 minutes)

### 2. Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase-schema.sql` from your repo
4. Paste into the query editor
5. Click **"Run"**
6. Wait for tables to be created ✓

### 3. Get Your Supabase Credentials

1. In Supabase, go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (looks like: `eyJhbGc...`)
3. Save these safely

### 4. Configure Environment Variables

1. In your project root, create a `.env.local` file (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
VITE_CALENDLY_URL=https://calendly.com/elkilla1989
VITE_CALENDLY_EMAIL=elkilla1989@gmail.com
VITE_MAGIC_LINK_BASE_URL=https://ideadex.me
```

### 5. Set Up Email Verification (Magic Links)

1. In Supabase, go to **Authentication** → **Providers**
2. Find **Email** provider
3. Enable **Email Confirmations**
4. Under **Email Templates**, customize if needed (already good)
5. Make sure **"Confirm email" is enabled**

### 6. Test Locally

```powershell
cd C:\Users\Lawrence\Downloads\Bunyag\ideadex
npm run dev
```

Visit: `http://localhost:3000/journey/bountiful`

### 7. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Go to your `my-website` project
3. Settings → **Environment Variables**
4. Add all the variables from `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_CALENDLY_URL`
   - `VITE_CALENDLY_EMAIL`
   - `VITE_MAGIC_LINK_BASE_URL`
5. Save and re-deploy

---

## How It Works

### The 7-Stage Journey

**Stage 1: Architect's Identity**
- Email verification (Magic Link sent)
- Name and Persona selection
- Data saved to Supabase

**Stages 2-4: Diagnostic**
- Solution description
- Growth barriers
- IP documentation status
- All saved to database

**Stage 5: Council Processing**
- Visual loading screen
- Data synced to "Sovereign Utility"

**Stage 6: Human Connection**
- Calendly widget embedded
- Creator books 15-min call
- Confirmation email sent

**Stage 7: Sanctuary Entrance**
- Celebratory success screen
- Entry into "Bountiful Queue"
- Email notification to you

### Data Persistence

- **localStorage**: Immediate saves for offline continuity
- **Cookies**: Track stage completion
- **Supabase**: Permanent record with email as unique identifier
- **Magic Links**: Recovery from any device

---

## Testing Checklist

- [ ] Click "Start Here" button → Redirects to `/journey/bountiful`
- [ ] Stage 1: Enter email → Gets verification email
- [ ] Click magic link → Auto-verifies
- [ ] Complete all stages
- [ ] Stage 6: Book a call on Calendly
- [ ] Stage 7: See success screen
- [ ] Check Supabase: Profile data saved
- [ ] Check email: Got confirmation

---

## Troubleshooting

**"Can't send verification email"**
- Make sure Supabase Auth email is enabled
- Check email is valid format

**"Button doesn't redirect"**
- Clear browser cache
- Check URL: should be `/journey/bountiful`

**"Data not saving"**
- Check `.env.local` has correct Supabase credentials
- Check Supabase RLS policies are set
- Browser console for errors

**"Calendly not loading"**
- Check URL is correct: `https://calendly.com/elkilla1989`
- Your browser may need JavaScript enabled

---

## Your Permanent Record

Every creator's journey is recorded in Supabase:
- Contact information
- Idea description
- Business barriers
- IP status
- Calendly booking confirmation
- Timestamp of each interaction

**This is your "Institutional Memory" for the Central Council vetting process.**

---

Need help? Check the code at: `src/pages/BountifulJourney.tsx`
