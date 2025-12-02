# Troubleshooting Guide

## Password Reset Issues

### Issue: "otp_expired" or "Email link is invalid or has expired"

**Cause**: Password reset tokens expire after 1 hour (Supabase default)

**Solution**:
1. Request a **new** password reset email
2. Click the link **immediately** after receiving it
3. Complete the password reset within 1 hour

**Note**: The app now handles expired tokens gracefully and shows a clear error message.

### Issue: Redirects to Homepage with Error in URL

**Cause**: Supabase redirect URL not configured correctly

**Solution**:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Ensure `https://arcusonline-cursor.vercel.app/auth/reset-password` is in **Redirect URLs**
3. Set **Site URL** to `https://arcusonline-cursor.vercel.app`
4. The app now catches errors on homepage and redirects to the correct page

## Login Issues

### Issue: Can't Login After Password Reset

**Possible Causes**:
1. **Password reset wasn't completed**: You must finish the password reset flow
2. **Using old password**: If reset completed, use the NEW password
3. **Account locked**: Too many failed attempts

**Solution**:
1. If you requested a reset but didn't complete it:
   - Request a new password reset
   - Complete the full flow (set new password)
   - Then login with the NEW password

2. If you completed the reset:
   - Make sure you're using the password you just set
   - Check for typos
   - Try requesting another reset if unsure

3. If account is locked:
   - Wait 15 minutes
   - Or contact support to unlock

### Issue: Login Success Toast But No Redirect

**Cause**: Cookies not being set properly or timing issue

**Solution**:
- The app now waits 1.5 seconds for cookies to be set
- If still not working, check browser console for errors
- Try clearing browser cookies and cache
- Try a different browser or incognito mode

## Supabase Configuration Checklist

✅ **Site URL**: `https://arcusonline-cursor.vercel.app`
✅ **Redirect URLs** include:
   - `https://arcusonline-cursor.vercel.app/auth/callback`
   - `https://arcusonline-cursor.vercel.app/auth/reset-password`
   - `https://arcusonline-cursor.vercel.app/**`

✅ **Environment Variables** in Vercel:
   - `NEXT_PUBLIC_APP_URL=https://arcusonline-cursor.vercel.app`
   - `NEXT_PUBLIC_SUPABASE_URL` (your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your anon key)

## Still Having Issues?

1. **Check Browser Console**: Look for JavaScript errors
2. **Check Network Tab**: Verify API calls are succeeding
3. **Clear Browser Data**: Cookies, cache, local storage
4. **Try Incognito Mode**: Rules out browser extension issues
5. **Check Supabase Logs**: Dashboard → Logs → Auth


