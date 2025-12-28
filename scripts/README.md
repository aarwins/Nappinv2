# Subscription Products Management Scripts

These scripts provide a code-based way to manage subscription products in Supabase, eliminating the need to manually run SQL in the Supabase UI.

## Setup

### 1. Install dependencies

```bash
npm install
```

This will install `dotenv` which is needed to load environment variables from `.env` files.

### 2. Environment Variables

Create a `.env.local` file in the project root (or add to your existing `.env` file) with:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important:**
- `SUPABASE_URL` - Your Supabase project URL (same as `EXPO_PUBLIC_SUPABASE_URL`)
- `SUPABASE_SERVICE_ROLE_KEY` - Found in Supabase Dashboard > Settings > API > service_role key (secret)
- **Never commit** the service role key to git (it should already be in `.gitignore`)

Alternatively, you can set these as environment variables in your shell:
```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

## Scripts

### `sync:products` - Sync Subscription Products

Safely upserts the 4 subscription products into the database. This script is **idempotent** - safe to run multiple times without creating duplicates.

```bash
npm run sync:products
```

**What it does:**
- Upserts 4 products (Advanced Monthly/Yearly, Precision Monthly/Yearly)
- Uses `onConflict: 'sku'` to update existing products or insert new ones
- Updates prices, trial lengths, and App Store product IDs
- Never deletes or truncates data

**Before first run:**
Edit `scripts/syncSubscriptionProducts.js` and replace the `YOUR_APPLE_ID_*` placeholders with your actual App Store product IDs:

```javascript
app_store_product_id: 'com.nappin.advanced.monthly', // Replace with your actual ID
```

### `list:products` - List All Products

Display all subscription products currently in the database:

```bash
npm run list:products
```

**What it does:**
- Fetches all products from `subscription_products` table
- Displays them in a formatted, readable format
- Shows prices, trial lengths, App Store IDs, and status

## Files

- `utils/supabaseAdminClient.ts` - Admin Supabase client with service role key (server-side only)
- `scripts/syncSubscriptionProducts.js` - Sync script for upserting products
- `scripts/listSubscriptionProducts.js` - List script for inspecting products

## Safety

These scripts are **safe** and **non-destructive**:
- ✅ Only use upsert operations (no deletes)
- ✅ Use `onConflict: 'sku'` to prevent duplicates
- ✅ Never truncate or drop tables
- ✅ Never delete data without explicit SKU filtering

## Troubleshooting

**Error: "Missing SUPABASE_SERVICE_ROLE_KEY"**
- Make sure you've added it to your `.env.local` file or exported it in your shell
- Restart your terminal after adding to `.env.local`

**Error: "Permission denied" or authentication errors**
- Verify your service role key is correct
- Check that it's the **service_role** key, not the anon key

**Products not updating**
- Check that the SKUs in the script match your database
- Run `list:products` to see current state
- The script uses upsert, so existing products will be updated

