# Free Deployment Guide — Cloudflare Pages (₹0 Budget)

This guide walks you through deploying the Nextvin Marketing Solutions website to **Cloudflare Pages** completely free, with unlimited bandwidth, global CDN caching, and automatic SSL/HTTPS.

---

## 🌟 Why Cloudflare Pages?
- **100% Free Plan:** Includes 500 builds per month, unlimited bandwidth, and free SSL certificate.
- **Fast Global Performance:** Cloudflare delivers your site from servers across India (Mumbai, Delhi, Bangalore, Chennai, etc.) and worldwide.
- **Custom Domain Support:** Connect `nextvinmarketingsolutions.in` with zero cost.
- **Beginner-Friendly:** Zero complex terminal commands required.

---

## Method 1: Direct Upload (Easiest — 2 Minutes, No Git Required)

If you don't use Git or GitHub yet, you can deploy the website directly via drag-and-drop:

1. **Sign Up / Log In to Cloudflare:**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com/) and create a free account.
2. **Navigate to Workers & Pages:**
   - In the left sidebar, click **"Workers & Pages"** → **"Create application"**.
   - Select the **"Pages"** tab.
   - Click **"Upload assets"**.
3. **Upload Your Project Folder:**
   - Give your project a name (e.g. `nextvin-website`).
   - Drag and drop the entire folder (`Nextvin Marketing Solutions Website`) or select all files including `index.html`, `about.html`, `services/`, `industries/`, `insights/`, `sitemap.xml`, and `robots.txt`.
   - Click **"Deploy site"**.
4. **Instant Preview:**
   - Within 15 seconds, Cloudflare will generate a live preview URL (e.g. `https://nextvin-website.pages.dev`).
   - Click the link to verify all pages and navigation.

---

## Method 2: Git-Based Deployment (Recommended for Long-Term Maintenance)

With Git, whenever you update a page and push to GitHub, Cloudflare automatically rebuilds and publishes the changes.

1. **Create a GitHub Repository:**
   - Log in to [github.com](https://github.com/) and click **"New repository"**.
   - Name it `nextvin-marketing-website`.
   - Set it to **Private** (or Public).
   - Click **"Create repository"**.
2. **Push the Files to GitHub:**
   - Open PowerShell or Terminal in your project folder:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of Nextvin Marketing Solutions website"
     git branch -M main
     git remote add origin https://github.com/YOUR_GITHUB_USERNAME/nextvin-marketing-website.git
     git push -u origin main
     ```
3. **Connect GitHub in Cloudflare Pages:**
   - In Cloudflare Dashboard, go to **"Workers & Pages"** → **"Create application"** → **"Pages"** tab.
   - Click **"Connect to Git"**.
   - Authorize GitHub and select your repository (`nextvin-marketing-website`).
   - Configure build settings:
     - **Framework preset:** `None`
     - **Build command:** *(leave empty)*
     - **Build output directory:** `/` *(root folder)*
   - Click **"Save and Deploy"**.

---

## 🔒 Next Step: Connect Custom Domain Safely

Once your site is live on Cloudflare Pages, proceed to **`DNS-SETUP-GUIDE.md`** to connect `nextvinmarketingsolutions.in` **without interrupting your existing business email**.
