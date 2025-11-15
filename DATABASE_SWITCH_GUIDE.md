# Switching to a Different Notion Database

This guide explains how to connect the blog to a different Notion database, specifically switching to the ClimateFair database.

---

## 🔄 Overview

The blog connects to a Notion database through environment variables. To switch databases, you need to:

1. Get the new database ID
2. Update your environment variables
3. Grant the integration access to the new database
4. Regenerate the post cache

---

## 📋 Step-by-Step Instructions

### Step 1: Get the ClimateFair Database ID

1. Open the ClimateFair database in Notion
2. Look at the URL in your browser
3. The database ID is the long string of characters in the URL

**URL Format:**
```
https://www.notion.so/[workspace]/[database-name]?v=[view-id]&id=[DATABASE-ID]
```

**Or if viewing a specific page:**
```
https://www.notion.so/[workspace]/[page-title]-[DATABASE-ID]
```

**How to Extract the Database ID:**
- The database ID is a 32-character string (letters and numbers)
- It's usually found after the last `-` in the URL
- Example: `https://www.notion.so/ClimateFair-abc123def456...` → `abc123def456...`
- The ID may also appear in the URL parameters

**Alternative Method:**
1. Open the database in Notion
2. Click the "..." menu (three dots) in the top right
3. Click "Copy link"
4. The link will contain the database ID

### Step 2: Verify Your Notion Integration Token

You'll need your Notion integration token. If you don't have it:

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Find your integration (or create a new one)
3. Copy the "Internal Integration Token"
4. It should start with `secret_` or `ntn_`

### Step 3: Update Environment Variables

1. Open or create `.env.local` in the project root directory
2. Update the `NOTION_DATABASE_ID` with the ClimateFair database ID:

```env
NOTION_TOKEN=your_integration_token_here
NOTION_DATABASE_ID=your_climatefair_database_id_here
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

**Important Notes:**
- Keep your existing `NOTION_TOKEN` (unless you're using a different integration)
- Only change the `NOTION_DATABASE_ID` value
- Make sure there are no spaces around the `=` sign
- Don't use quotes around the values

### Step 4: Grant Integration Access to the New Database

**Critical:** The Notion integration must have access to the ClimateFair database.

1. Open the ClimateFair database in Notion
2. Click the "..." menu (three dots) in the top right corner of the database
3. Select **"Connections"** or **"Add connections"**
4. Find and select your integration (the one matching your `NOTION_TOKEN`)
5. The integration should now have access to the database

**If you don't see your integration:**
- Make sure you're using the correct integration token
- The integration must be created in the same Notion workspace
- Some workspaces require admin approval for integrations

### Step 5: Verify Database Structure

Before proceeding, make sure the ClimateFair database has the required properties:

**Required Properties:**
- ✅ `Project name` (Title type)
- ✅ `Status` (Status type) - must have "Done" as an option
- ✅ `Work Tags` (Multi-select type)
- ✅ `End date` or `Start date` (Date type)

**Optional but Recommended:**
- `Prioritization Note` (Rich text) - used for post descriptions
- `Attach file` (Files) - used for cover images
- `createdBy` or `Assignees` (People) - used for author attribution

### Step 6: Clear Old Cache and Regenerate

1. **Delete the old cache** (optional but recommended):
   ```bash
   rm posts-cache.json
   ```

2. **Regenerate the cache** with the new database:
   ```bash
   pnpm run cache:posts
   ```

3. **Check for errors:**
   - If you see errors, verify:
     - Database ID is correct
     - Integration has access to the database
     - Database has the required properties
     - Required tags exist in the database

### Step 7: Test the Connection

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Visit the blog:**
   - Go to `http://localhost:3001`
   - Check if posts from the ClimateFair database appear

3. **Verify posts:**
   - Posts should have:
     - Status = "Done"
     - Work Tags contains "Published Blog Post"
     - Work Tags contains "climatefair"

---

## ⚠️ Important Considerations

### Database Schema Compatibility

The code expects specific property names. If the ClimateFair database uses different property names, you may need to update the code in `src/lib/notion.ts`.

**Current Expected Properties:**
- `Project name` → Used for post title
- `Status` → Must equal "Done"
- `Work Tags` → Must contain "Published Blog Post" and "climatefair"
- `End date` → Preferred publication date
- `Start date` → Fallback publication date
- `Prioritization Note` → Post description/excerpt
- `Attach file` → Cover image

### Tag Requirements

The code currently filters for posts with:
- `Work Tags` containing **"Published Blog Post"**
- `Work Tags` containing **"climatefair"**

Make sure your ClimateFair database has posts with both tags, or update the filter in `src/lib/notion.ts` if you want different tag requirements.

### Cache Management

- The `posts-cache.json` file stores all posts locally
- After switching databases, the cache will contain posts from the new database
- Old posts from the previous database will no longer appear
- To switch back, just change the `NOTION_DATABASE_ID` and regenerate the cache

---

## 🔍 Troubleshooting

### Error: "API token is invalid"

**Solution:**
- Verify your `NOTION_TOKEN` in `.env.local`
- Make sure there are no extra spaces or quotes
- Regenerate the token in Notion if needed

### Error: "Could not find database"

**Solution:**
- Double-check the `NOTION_DATABASE_ID` is correct
- Make sure the integration has access to the database
- Verify the database ID is the full 32-character string

### No posts appearing after cache regeneration

**Check:**
1. ✅ Does the database have posts with Status = "Done"?
2. ✅ Do those posts have "Published Blog Post" in Work Tags?
3. ✅ Do those posts have "climatefair" in Work Tags?
4. ✅ Are the property names exactly as expected?
5. ✅ Did the cache script run without errors?

### Posts from old database still showing

**Solution:**
- Delete `posts-cache.json`
- Run `pnpm run cache:posts` again
- Restart the dev server

### Integration doesn't have access

**Solution:**
- Go to the database in Notion
- Click "Connections" → "Add connections"
- Select your integration
- If it's not listed, verify you're using the correct workspace

---

## 📝 Quick Reference

**Files to Update:**
- `.env.local` - Update `NOTION_DATABASE_ID`

**Commands to Run:**
```bash
# Regenerate cache
pnpm run cache:posts

# Start dev server
pnpm dev
```

**Code Files (if schema differs):**
- `src/lib/notion.ts` - Update property names if needed

**Required Database Properties:**
- `Project name` (Title)
- `Status` (Status)
- `Work Tags` (Multi-select)
- `End date` or `Start date` (Date)

**Required Tags:**
- "Published Blog Post"
- "climatefair"

---

## 🎯 Summary

To switch to the ClimateFair database:

1. ✅ Get the ClimateFair database ID from the URL
2. ✅ Update `NOTION_DATABASE_ID` in `.env.local`
3. ✅ Grant integration access to the ClimateFair database
4. ✅ Verify database has required properties
5. ✅ Run `pnpm run cache:posts` to regenerate cache
6. ✅ Test with `pnpm dev`

That's it! The blog will now pull posts from the ClimateFair database. 🎉

---

**Last Updated**: Based on current codebase configuration
**For Developers**: See `src/lib/notion.ts` for database query logic

