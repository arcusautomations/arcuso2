# Supabase Configuration for Password Reset

## Critical: Update Supabase Site URL

The password reset emails are redirecting to `localhost:3000` because Supabase's Site URL is not configured correctly.

### Steps to Fix:

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project: `bonzdfhpfmutunewphba`

2. **Update Site URL**
   - Go to: **Authentication** → **URL Configuration**
   - Set **Site URL** to: `https://arcusonline-cursor.vercel.app`
   - Add to **Redirect URLs**:
     - `https://arcusonline-cursor.vercel.app/auth/callback`
     - `https://arcusonline-cursor.vercel.app/auth/reset-password`
     - `https://arcusonline-cursor.vercel.app/**` (wildcard for all routes)

3. **Save Changes**
   - Click "Save" to apply the changes
   - This will ensure all email links use the production URL

### Why This Matters:

- Supabase uses the **Site URL** as the base for all email redirects
- Even if we pass `redirectTo` in code, Supabase validates it against the Site URL
- If Site URL is `localhost:3000`, all emails will redirect there
- This must be set to your production URL for production emails to work

### Environment Variables:

Make sure these are set in Vercel:
- `NEXT_PUBLIC_APP_URL=https://arcusonline-cursor.vercel.app`
- `NEXT_PUBLIC_SUPABASE_URL=https://bonzdfhpfmutunewphba.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`

### Testing:

After updating Supabase settings:
1. Request a new password reset email
2. The email link should now point to: `https://arcusonline-cursor.vercel.app/auth/reset-password`
3. Clicking the link should work correctly

