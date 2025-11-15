# Notion Database Setup Guide

## For Content Creators & Editors

This guide explains how to properly set up tags and work tags in the Notion database so your blog posts appear on the website correctly.

---

## 📋 Overview

The blog automatically pulls posts from your Notion database based on specific criteria. To ensure your posts are published correctly, you need to set up the **Work Tags** property properly.

---

## 🏷️ Understanding Work Tags

The **Work Tags** property is a **Multi-select** field that serves two purposes:

1. **Filtering**: Determines which posts appear on the blog
2. **Display**: Shows tags on the published blog post

### Required Tags

For a post to appear on the blog, it **must** have **both** of these tags:

1. ✅ **"Published Blog Post"** - Marks the post as ready for publication
2. ✅ **"climatefair"** - Identifies the post as part of the ClimateFair blog

**Important**: If either tag is missing, the post will **not** appear on the website, even if all other properties are set correctly.

---

## 📝 Step-by-Step: Setting Up a Blog Post

### Step 1: Create a New Database Entry

1. Open your Notion database
2. Click **"New"** to create a new entry
3. This creates a new page in your database

### Step 2: Set the Status

1. Find the **"Status"** property
2. Set it to **"Done"**
   - This is required for the post to be published
   - Posts with any other status will not appear on the blog

### Step 3: Add Required Work Tags

1. Find the **"Work Tags"** property (it should be a multi-select field)
2. Click on the field to open the tag selector
3. Add **both** required tags:
   - Type or select **"Published Blog Post"**
   - Type or select **"climatefair"**
4. If these tags don't exist yet:
   - Type the exact name and press Enter
   - Notion will create the tag automatically
   - Make sure the spelling matches exactly (case-sensitive)

### Step 4: Add Optional Tags (Recommended)

You can add additional tags to help organize and categorize your content. These tags will appear on the published blog post:

**Examples:**
- `travel`
- `sustainability`
- `climate-action`
- `community`
- `tips`
- `story`

**Best Practices:**
- Use lowercase for consistency
- Use hyphens for multi-word tags (e.g., `climate-action` not `climate action`)
- Keep tag names short and descriptive
- Reuse existing tags when possible

### Step 5: Fill in Other Required Properties

| Property | Type | What to Enter | Required? |
|----------|------|---------------|-----------|
| **Project name** | Title | Your blog post title | ✅ Yes |
| **End date** | Date | Publication date (preferred) | ✅ Yes* |
| **Start date** | Date | Alternative if no End date | ⚠️ Only if no End date |
| **Prioritization Note** | Rich text | Brief description/excerpt | ❌ Optional |
| **Attach file** | Files | Cover image | ❌ Optional |

\* The system prefers **End date** but will use **Start date** if End date is not set.

### Step 6: Write Your Content

1. Click into the page to open it
2. Write your blog post content using Notion's editor
3. You can use:
   - Headings, bold, italic
   - Lists (bulleted and numbered)
   - Images
   - Code blocks
   - Tables
   - And other Notion formatting

### Step 7: Verify Your Setup

Before publishing, double-check:

- [ ] **Status** = "Done"
- [ ] **Work Tags** contains "Published Blog Post"
- [ ] **Work Tags** contains "climatefair"
- [ ] **Project name** has a title
- [ ] **End date** or **Start date** is set
- [ ] Content is written in the page body

---

## 🔍 How Tags Work Behind the Scenes

### Tag Filtering Logic

The blog system uses this logic to find posts:

```
Show post IF:
  ✅ Status = "Done"
  ✅ Work Tags contains "Published Blog Post"
  ✅ Work Tags contains "climatefair"
```

**All three conditions must be true** for a post to appear.

### Tag Display

All tags in the **Work Tags** field (including the required ones) will appear on the published blog post. This means:

- Required tags ("Published Blog Post" and "climatefair") will be visible
- Optional tags you add will also be visible
- Tags are displayed in the order they appear in Notion

---

## ⚠️ Common Mistakes to Avoid

### ❌ Missing Required Tags

**Problem**: Post has "Published Blog Post" but not "climatefair" (or vice versa)

**Result**: Post will not appear on the blog

**Fix**: Add the missing required tag

### ❌ Wrong Status

**Problem**: Status is set to "In Progress" or "Not Started"

**Result**: Post will not appear, even with correct tags

**Fix**: Change Status to "Done"

### ❌ Typo in Tag Name

**Problem**: Tag is "Published Blog Posts" (with an 's') or "ClimateFair" (wrong capitalization)

**Result**: Post will not appear because the filter looks for exact matches

**Fix**: Use exact spelling: "Published Blog Post" and "climatefair"

### ❌ Tags in Wrong Property

**Problem**: Tags are added to a different property (like a regular "Tags" field)

**Result**: Post will not appear because the system only checks "Work Tags"

**Fix**: Make sure tags are in the **"Work Tags"** property

---

## 🎯 Tag Organization Best Practices

### Creating a Tag System

To keep your content organized, consider creating a consistent tag structure:

**Content Type Tags:**
- `article`
- `story`
- `guide`
- `news`
- `interview`

**Topic Tags:**
- `climate-action`
- `sustainability`
- `community`
- `travel`
- `tips`

**Project Tags:**
- `climatefair`
- `featured`

**Example Post Tags:**
```
Work Tags: Published Blog Post, climatefair, article, climate-action, sustainability
```

### Managing Tags

- **Reuse existing tags**: Check what tags already exist before creating new ones
- **Be consistent**: Use the same tag name every time (e.g., always use `climate-action`, not sometimes `climate action`)
- **Keep it simple**: Don't create too many similar tags (e.g., avoid both `travel` and `traveling`)

---

## 🔄 Updating Published Posts

### To Update a Published Post:

1. Find the post in your Notion database
2. Make your changes (content, tags, properties)
3. **Important**: The changes won't appear on the website immediately
4. Ask a developer to run: `pnpm run cache:posts`
   - This regenerates the post cache from Notion
   - The updated post will then appear on the website

### To Unpublish a Post:

1. Remove one or both required tags ("Published Blog Post" or "climatefair")
2. Or change Status to something other than "Done"
3. Run cache regeneration to update the website

---

## 📊 Quick Reference Checklist

Use this checklist when creating a new blog post:

```
□ Created new database entry
□ Set Status to "Done"
□ Added "Published Blog Post" tag to Work Tags
□ Added "climatefair" tag to Work Tags
□ Added optional tags (if desired)
□ Set Project name (title)
□ Set End date (or Start date)
□ Added Prioritization Note (optional description)
□ Added cover image to Attach file (optional)
□ Wrote content in the page body
□ Verified all required fields are complete
```

---

## 🆘 Troubleshooting

### My post isn't appearing on the website

**Check these in order:**

1. ✅ Is Status = "Done"?
2. ✅ Does Work Tags contain "Published Blog Post" (exact spelling)?
3. ✅ Does Work Tags contain "climatefair" (exact spelling, lowercase)?
4. ✅ Is there a date set (End date or Start date)?
5. ✅ Has the cache been regenerated? (Ask developer to run `pnpm run cache:posts`)

### My tags aren't showing on the published post

- All tags in the Work Tags field should appear
- If tags are missing, check that they're in the "Work Tags" property, not another field
- Make sure the cache has been regenerated after adding tags

### I want to change a tag name

- If you rename a tag in Notion, it will update everywhere it's used
- However, if you're renaming a required tag ("Published Blog Post" or "climatefair"), you'll need to update the code configuration
- Contact a developer before renaming required tags

---

## 📞 Need Help?

If you're still having issues:

1. **Check this guide** - Make sure you followed all steps correctly
2. **Verify spelling** - Required tags must match exactly
3. **Contact the development team** - They can help troubleshoot technical issues

---

## 📝 Summary

**The Golden Rules:**

1. ✅ Status must be "Done"
2. ✅ Work Tags must include "Published Blog Post"
3. ✅ Work Tags must include "climatefair"
4. ✅ All three conditions must be true
5. ✅ Cache must be regenerated after changes

Follow these rules, and your posts will appear on the blog! 🎉

---

**Last Updated**: Based on current codebase configuration
**For Developers**: See `src/lib/notion.ts` for the filtering logic

