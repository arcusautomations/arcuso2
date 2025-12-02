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
   - **CRITICAL**: This must match your production URL exactly
   
3. **Add Redirect URLs**
   - In the same **URL Configuration** section
   - Add these to **Redirect URLs** (one per line):
     - `https://arcusonline-cursor.vercel.app/auth/callback`
     - `https://arcusonline-cursor.vercel.app/auth/reset-password`
     - `https://arcusonline-cursor.vercel.app/**` (wildcard - allows all routes)
   - **IMPORTANT**: The redirect URL in code (`/auth/reset-password`) must be in this list

4. **Configure Token Expiration (Optional but Recommended)**
   - Go to: **Authentication** → **Settings** → **Auth**
   - Find **JWT expiry** or **Token expiry** settings
   - **Password reset tokens** typically expire after 1 hour by default
   - Consider increasing to 24 hours if needed (not recommended for security)
   - **Note**: Expired tokens will show "otp_expired" error - users must request a new reset link

5. **Save Changes**
   - Click "Save" to apply all changes
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

### Common Issues:

1. **"otp_expired" Error**
   - Password reset tokens expire after 1 hour (default)
   - Solution: Request a new password reset email
   - The app now handles this error gracefully

2. **Redirects to Homepage Instead of Reset Page**
   - This happens if the redirect URL isn't in Supabase's allowed list
   - Solution: Add `https://arcusonline-cursor.vercel.app/auth/reset-password` to Redirect URLs
   - The app now catches hash errors on homepage and redirects appropriately

3. **Still Redirecting to localhost**
   - Site URL in Supabase is still set to localhost
   - Solution: Update Site URL to production URL (step 2 above)

### Testing:

After updating Supabase settings:
1. Request a new password reset email (wait for it to arrive)
2. The email link should point to: `https://arcusonline-cursor.vercel.app/auth/reset-password#access_token=...`
3. Click the link immediately (tokens expire after 1 hour)
4. You should see the reset password form, not an error
5. If you see an expired error, request a new reset email

