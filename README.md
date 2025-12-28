# Nappinv2
# nappinforchatgpt

## Testing Entitlements

### How to Get Your User ID

**Option 1: From App Logs (Fast)**
1. After logging in, check your app console/logs
2. Look for `session.user.id` in auth state change logs
3. Copy the UUID (format: `abc123-def456-...`)

**Option 2: From Supabase Dashboard**
1. Go to Supabase Dashboard → Authentication → Users
2. Find your user account
3. Copy the UUID from the user row

### Grant Test Subscription

Grant a temporary test subscription to unlock premium features:

```bash
npm run grant:test-sub -- --user_id <uuid> [--sku <sku>] [--days <number>]
```

**Arguments:**
- `--user_id` (required): Your user UUID
- `--sku` (optional): Subscription product SKU. Options: `advanced_monthly`, `advanced_yearly`, `precision_monthly`, `precision_yearly`. Default: `advanced_monthly`
- `--days` (optional): Number of days until access expires. Default: `1`

**Examples:**
```bash
# Grant 1-day advanced monthly subscription
npm run grant:test-sub -- --user_id abc123-def456-...

# Grant 7-day advanced yearly subscription
npm run grant:test-sub -- --user_id abc123-def456-... --sku advanced_yearly --days 7

# Grant precision monthly subscription
npm run grant:test-sub -- --user_id abc123-def456-... --sku precision_monthly --days 3
```

After granting:
1. Open the app and trigger `refreshEntitlements()` (or wait for auth state refresh)
2. The app should unlock and show premium features
3. Access will expire after the specified number of days

### Revoke Test Subscription

Revoke a test subscription (sets status to 'expired' and access_expires_at to now):

```bash
npm run revoke:test-sub -- --user_id <uuid>
```

**Example:**
```bash
npm run revoke:test-sub -- --user_id abc123-def456-...
```

After revoking:
1. Open the app and trigger `refreshEntitlements()` (or wait for auth state refresh)
2. The app should lock and show paywall
3. To grant again, use the grant command above

### Notes

- These scripts use the service role key to bypass RLS
- All test grants/revokes are logged in `subscription_events` table
- Test subscriptions are marked with `original_transaction_id` starting with `test_`
- The scripts will not affect production subscriptions (they only modify test entries)
