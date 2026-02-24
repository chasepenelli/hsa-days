# Kit (ConvertKit) Setup Guide

## 1. Create a Kit Account

1. Go to [kit.com](https://kit.com) (formerly ConvertKit)
2. Create an account or sign in

## 2. Create a Signup Form

1. Go to Grow > Landing Pages & Forms
2. Create a new form for "HSA Days Signup"
3. Note the **Form ID** from the URL or form settings

## 3. Create the 30-Day Email Sequence

1. Go to Send > Sequences
2. Create a new sequence: "HSA Days — 30-Day Journey"
3. Add 30 emails, one per day

### Getting Email Content

To get the email content for all 30 days, run this command:

```bash
curl -H "Authorization: Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" \
  https://hsadays.com/api/drip-content
```

This returns JSON with the day number, title, and email excerpt for each of the 30 days. Use these as the starting content for each email in the sequence.

### Email Template Suggestion

For each day's email:

**Subject:** Day {number}: {title}

**Body:**
```
Hey {first_name},

{excerpt}

[Continue Day {number} on HSA Days →](https://hsadays.com/days/{number})

---
HSA Days — A 30-day journey with your dog.
```

4. Set each email to send 1 day after the previous
5. Note the **Sequence ID** from the URL

## 4. Get Your API Key

1. Go to Settings > Advanced > API
2. Copy your **API Key**

## 5. Set Environment Variables in Vercel

Go to your Vercel project > Settings > Environment Variables and add:

```
KIT_API_KEY=your-api-key
KIT_FORM_ID=your-form-id
KIT_SEQUENCE_ID=your-sequence-id
```

## 6. Redeploy

After setting the environment variables, redeploy. New signups will automatically be added to both the form and the 30-day sequence.

## How It Works

- When `KIT_API_KEY` is missing or `placeholder`, Kit integration is skipped silently
- When configured, every new signup is added to the form AND the 30-day drip sequence
- The `/api/drip-content` endpoint exports all email content from the database for easy copy-paste into Kit
