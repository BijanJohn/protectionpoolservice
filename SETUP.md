# Protection Pool Service - Setup Guide

## Quick Start (Local Preview)

Open `index.html` in your browser to preview the site locally.

---

## Step 1: Add Stock Video (Optional but Recommended)

The site has a beautiful gradient fallback, but a video background makes it more engaging.

### Download the Video:
1. Go to [Pexels - Clear Water on the Pool](https://www.pexels.com/video/clear-water-on-the-pool-5066798/)
2. Click the **Free Download** button
3. Choose **HD (1920x1080)** for best balance of quality and file size
4. Save the file as `pool-water.mp4`
5. Move it to: `assets/video/pool-water.mp4`

### Alternative Video Options:
- [Pixabay - Swimming Pool Ripples](https://pixabay.com/videos/swimming-pool-ripples-blue-water-13437/)
- [Pexels - Swimming Pool](https://www.pexels.com/video/swimming-pool-18202849/)

---

## Step 2: Set Up Web3Forms (Contact Form)

Web3Forms is free and sends form submissions directly to email.

### Get Your Access Key:
1. Go to [web3forms.com](https://web3forms.com/)
2. Enter the email: `d85003868@gmail.com`
3. Click **Create Access Key**
4. Check the Gmail inbox for a verification email
5. Copy the access key from the email

### Add the Key to Your Site:
1. Open `index.html`
2. Find this line (around line 340):
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key

---

## Step 3: Deploy to GitHub Pages

### Push Your Code:
```bash
cd /Users/machine/src/protectionpoolservice
git add .
git commit -m "Initial website for Protection Pool Service"
git push origin main
```

### Enable GitHub Pages:
1. Go to your GitHub repository
2. Click **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live at: `https://yourusername.github.io/protectionpoolservice/`

---

## Step 4: Configure Cloudflare DNS

### Point Domain to GitHub Pages:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain: `protectionpoolservice.com`
3. Go to **DNS** > **Records**
4. Add these records:

| Type  | Name | Content                           | Proxy |
|-------|------|-----------------------------------|-------|
| CNAME | @    | yourusername.github.io            | ON    |
| CNAME | www  | yourusername.github.io            | ON    |

*Replace `yourusername` with your actual GitHub username*

### Configure GitHub for Custom Domain:
1. In your repo, go to **Settings** > **Pages**
2. Under "Custom domain", enter: `protectionpoolservice.com`
3. Click **Save**
4. Check "Enforce HTTPS" once DNS propagates

### Create CNAME File:
Create a file called `CNAME` (no extension) in your repo root:
```
protectionpoolservice.com
```

---

## Step 5: Set Up Email Routing (Cloudflare)

Route `support@protectionpoolservice.com` to Gmail.

### Enable Email Routing:
1. In Cloudflare, go to **Email** > **Email Routing**
2. Click **Enable Email Routing**
3. Cloudflare will add necessary MX records automatically

### Create Email Route:
1. Go to **Email Routing** > **Routing Rules**
2. Click **Create address**
3. Custom address: `support`
4. Destination: `d85003868@gmail.com`
5. Click **Save**

### Verify Destination:
1. Check Gmail for a verification email from Cloudflare
2. Click the verification link

### (Optional) Send FROM support@protectionpoolservice.com via Gmail:

1. **Enable 2FA** on your Google account if not already
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create an app password for "Mail"
4. In Gmail, go to **Settings** > **See all settings** > **Accounts and Import**
5. Under "Send mail as", click **Add another email address**
6. Enter: `support@protectionpoolservice.com`
7. SMTP Server: `smtp.gmail.com`
8. Port: `587`
9. Username: `d85003868@gmail.com`
10. Password: (the app password you created)
11. Click **Add Account**

### Update SPF Record (for sending):
In Cloudflare DNS, add/update TXT record:
```
Type: TXT
Name: @
Content: v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
```

---

## Step 6: Set Up Google Business Profile

This is essential for appearing on Google Maps.

### Create Your Profile:
1. Go to [business.google.com](https://business.google.com/)
2. Sign in with a Google account
3. Click **Manage now** or **Add your business**
4. Enter business name: `Protection Pool Service`
5. Choose category: `Swimming Pool Cleaning Service` or `Swimming Pool Contractor`

### Enter Business Info:
- **Address**: 3709 E Martin Luther King Jr Blvd, Austin, TX 78721
- **Service Area**: Austin, TX (and surrounding areas)
- **Phone**: (737) 384-1702
- **Website**: https://protectionpoolservice.com

### Verify Your Business:
Google will verify via one of these methods:
- **Postcard** (most common) - takes 5-7 days
- **Phone call** - instant if available
- **Email** - if using business email

### Optimize Your Profile:
After verification:
1. Add business hours (or mark as "By appointment")
2. Add photos (pool work, team, equipment)
3. Write a business description
4. Add services with descriptions
5. Enable messaging
6. Request reviews from happy customers

---

## File Structure

```
protectionpoolservice/
├── index.html          # Main website
├── CNAME               # Custom domain for GitHub Pages
├── SETUP.md            # This file
└── assets/
    ├── video/
    │   └── pool-water.mp4    # Hero background video
    └── images/               # Future images
```

---

## Testing Checklist

- [ ] Site loads at protectionpoolservice.com
- [ ] HTTPS is enabled (padlock in browser)
- [ ] Mobile view looks good
- [ ] Contact form submits successfully
- [ ] Form submissions arrive at Gmail
- [ ] Email sent to support@protectionpoolservice.com arrives at Gmail
- [ ] Phone links dial correctly on mobile
- [ ] Google Business Profile is verified

---

## Maintenance

### Updating the Site:
```bash
# Make changes to index.html
git add .
git commit -m "Description of changes"
git push origin main
```
GitHub Pages will auto-deploy within a few minutes.

### Adding Testimonials Later:
The site is ready for testimonials. When you have reviews, you can add a testimonials section between "Why Choose Us" and the "Contact" section.

---

## Support

If you have issues:
- GitHub Pages: [pages.github.com](https://pages.github.com/)
- Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com/)
- Web3Forms: [web3forms.com](https://web3forms.com/)
