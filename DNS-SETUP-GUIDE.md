# Safe Domain & DNS Setup Guide — Hostinger to Cloudflare Pages

> ⚠️ **CRITICAL WARNING — PRESERVE YOUR BUSINESS EMAIL:**
> Your business email is **`support@nextvinmarketingsolutions.in`**.
> **NEVER DELETE OR OVERWRITE YOUR EXISTING MX, SPF, DKIM, OR DMARC RECORDS.**
> Following this guide ensures your website points to your new pages while your email service continues working with zero downtime.

---

## 📌 Overview: Two Methods to Connect Domain

There are two safe methods to connect your Hostinger domain (`nextvinmarketingsolutions.in`) to Cloudflare Pages:

| Method | Recommendation | Description |
| :--- | :--- | :--- |
| **Option A: CNAME Records in Hostinger DNS** | ⭐ **Safest & Simplest** | Keeps your DNS inside Hostinger. Only modifies web records; email records remain 100% untouched. |
| **Option B: Full Cloudflare Nameserver Delegation** | Advanced | Moves DNS management to Cloudflare. Requires carefully copying over all existing Hostinger email records. |

---

## 🟢 Option A: CNAME Records Inside Hostinger (Recommended)

In this approach, you leave your domain nameservers with Hostinger. You only add or edit the web address records.

### Step 1: Add Custom Domain in Cloudflare Pages
1. Go to your Cloudflare Pages project (e.g. `nextvin-website`).
2. Click the **"Custom domains"** tab.
3. Click **"Set up a custom domain"**.
4. Enter: `nextvinmarketingsolutions.in` (and optionally `www.nextvinmarketingsolutions.in`).
5. Cloudflare will display the target CNAME target (e.g. `nextvin-website.pages.dev`).

### Step 2: Open Hostinger DNS Zone Editor
1. Log in to your **Hostinger Control Panel (hPanel)**.
2. Go to **Domains** → Select `nextvinmarketingsolutions.in`.
3. In the left menu, click **"DNS / Nameservers"** (or **"DNS Zone"**).

### Step 3: Inspect & Protect Existing Email Records
Before making changes, verify that your email records are present:
- **MX Records:** (e.g., `mx1.hostinger.com`, `mx2.hostinger.com` or Google/Titan mail servers). **DO NOT TOUCH.**
- **TXT Records for SPF:** (e.g., `v=spf1 include:_spf.mail.hostinger.com ~all`). **DO NOT TOUCH.**
- **TXT Records for DKIM / DMARC:** (e.g., `_domainkey` or `v=DMARC1`). **DO NOT TOUCH.**

### Step 4: Add / Update Website Records
You only need to update the records pointing visitors to your website:

1. **For `www` Subdomain:**
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Points to / Target:** `nextvin-website.pages.dev` (your exact Cloudflare Pages URL)
   - **TTL:** 14400 (or default)
   - Click **Save / Add Record**.

2. **For Root Domain (`@` or `nextvinmarketingsolutions.in`):**
   - In Hostinger, check if there is an existing `A` record for `@` pointing to an old parking IP.
   - If Hostinger supports CNAME flattening or an ALIAS record for `@`, point it to `nextvin-website.pages.dev`.
   - Alternatively, add an A record or URL redirect from root to `https://www.nextvinmarketingsolutions.in`.

---

## 🟡 Option B: Using Cloudflare Nameservers (If Preferred)

If you decide to delegate the domain's DNS to Cloudflare:
1. When Cloudflare scans your Hostinger DNS records, **carefully verify that every MX and TXT (SPF/DKIM) record is listed in Cloudflare's table**.
2. If any record is missing, manually copy it from Hostinger into Cloudflare before changing nameservers.
3. Only after confirming all email records are safely present in Cloudflare, update the Nameservers in Hostinger to Cloudflare's two assigned nameservers.

---

## ✅ How to Verify Everything Is Working

1. **Website Check:** Open [https://nextvinmarketingsolutions.in/](https://nextvinmarketingsolutions.in/) in an incognito window. You should see the padlock icon (HTTPS) and the new Nextvin agency website.
2. **Email Test:** Send an email from your personal Gmail or Outlook to `support@nextvinmarketingsolutions.in`. Verify that you receive it in your inbox without bounce messages.
