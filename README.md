# Deliberate Bodywork — Next.js Prototype

Mobile-first website for Max Goldman, CMT.

---

## 🚀 Local Setup

```bash
# 1. Clone your repo and cd in
git clone https://github.com/YOUR_USERNAME/deliberate-bodywork.git
cd deliberate-bodywork

# 2. Install dependencies
npm install

# 3. Add Max's photo
# Copy your best photo of Max to:
#   public/max.jpg
# (The hero section uses /max.jpg as the background portrait)

# 4. Start dev server
npm run dev
# → Open http://localhost:3000
```

---

## 📸 Adding the Photo

1. Export a clean portrait photo of Max (ideally the one from the flyer, cropped to show him from waist up).
2. Save it as `public/max.jpg` in the project root.
3. The hero `<Image>` component will pick it up automatically.

---

## 🌐 Deploy to GitHub Pages

### One-time setup
1. Create a new GitHub repo named `deliberate-bodywork`.
2. In `next.config.js`, make sure `basePath` matches your repo name exactly:
   ```js
   basePath: '/deliberate-bodywork',
   ```
3. Install the deploy helper:
   ```bash
   npm install -D gh-pages
   ```

### Push & deploy
```bash
# Push your code
git add .
git commit -m "initial prototype"
git push origin main

# Build + push static files to gh-pages branch
npm run deploy
```

4. In GitHub → your repo → **Settings → Pages**:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`
   - Save

5. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/deliberate-bodywork/
   ```

---

## 📁 Project Structure

```
src/
  app/
    layout.js      ← Root layout, fonts, metadata
    page.js        ← Assembles all sections
    globals.css    ← Tailwind + custom CSS
  components/
    Navbar.js      ← Sticky nav + hamburger menu
    Hero.js        ← Full-viewport portrait hero
    About.js       ← "Who is Max" paragraph
    Specialties.js ← 3 specialty cards
    Modalities.js  ← Tag cloud of 6 techniques
    Pricing.js     ← 3 pricing cards
    Contact.js     ← Phone/email links + inquiry form
    Footer.js      ← Brand + copyright
public/
  max.jpg          ← ← ← ADD PHOTO HERE
```

---

## 🔧 Customization Checklist

- [ ] Add `public/max.jpg`
- [ ] Update `basePath` in `next.config.js` to match your repo name
- [ ] Swap the `mailto:` in `Contact.js` for Formspree/Resend in production
- [ ] Add a `public/favicon.ico` for browser tab branding
