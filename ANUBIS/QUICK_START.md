# Egypt Eternal - Quick Reference Guide

## 🚀 Getting Started (60 seconds)

1. **Download/Clone** the project
2. **Open** `index.html` in your browser
3. **Done** ✓ Site is live

OR use any of these servers:
```bash
python -m http.server 8000          # Python
npx http-server                     # Node
php -S localhost:8000               # PHP
```

## 📝 Adding Content

### Add a New Archaeological Site

Edit `data/places.json`:

```json
{
  "id": 16,
  "name": "Dendera Temple Complex",
  "arabicName": "معبد دندرة",
  "region": "Luxor",
  "category": "Temples",
  "image": "assets/dendera.svg",
  "excerpt": "Ancient temple dedicated to Hathor, goddess of love.",
  "teaserStory": "Behold the zodiac ceiling—ancient astronomy carved in stone.",
  "fullStory": "Built during Ptolemaic times...",
  "era": "Ptolemaic Period (332-30 BCE)",
  "location": "Dendera, Upper Egypt",
  "discovered": "Continuously known; excavated 19th century",
  "highlights": "Zodiac ceiling, Hathor shrine, Roman additions",
  "visitingTips": "Day trip from Luxor. Bring flashlight for ceiling.",
  "relatedRulers": ["Cleopatra VII"]
}
```

### Add a Pharaoh/Ruler

Edit `data/rulers.json`:

```json
{
  "name": "Amenhotep III",
  "arabicName": "أمنحتب الثالث",
  "icon": "👑",
  "title": "The Magnificent",
  "arabicTitle": "العظيم",
  "era": "New Kingdom, Eighteenth Dynasty (c. 1390-1352 BCE)",
  "story": "Known for his magnificent temples and diplomatic achievements...",
  "achievements": [
    "Built Luxor Temple's main sanctuary",
    "Commissioned colossal statues at Luxor",
    "Maintained peace through diplomacy"
  ],
  "monuments": ["Luxor Temple", "Mortuary Temple at Malkata"]
}
```

### Add Historical Period

Edit `data/timeline.json`:

```json
{
  "name": "Ptolemaic Dynasty",
  "period": "c. 332-30 BCE",
  "description": "Greek rulers following Alexander's conquest. Alexandria became the intellectual center of the Mediterranean..."
}
```

### Add Testimonial

Edit `data/testimonials.json`:

```json
{
  "author": "Elena Rossi",
  "location": "Rome, Italy",
  "rating": 5,
  "text": "The most transformative trip of my life. Standing before the pyramids at dawn was transcendent."
}
```

## 🎨 Design Changes

### Change Primary Color (Gold → Different)

In `css/styles.css`, line 6-7:

```css
:root {
    --color-primary: #E8B4B8;    /* Change from #D4AF37 */
    --color-primary-light: #FFB4C2;
    /* ... rest remains same ... */
}
```

### Change Dark Theme Background

Line 10-11:

```css
--color-dark: #1a1a1a;           /* Lighter */
--color-dark-secondary: #2d2d2d; /* Lighter */
```

### Modify Button Style

In `css/styles.css`, search for `.btn-primary`:

```css
.btn-primary {
    background: linear-gradient(...);
    padding: 1.5rem 3rem;  /* Change padding */
    border-radius: 20px;    /* Change radius */
}
```

### Change Font Families

Line 15-18:

```css
--font-display: 'Georgia', serif;      /* Change from Cinzel */
--font-body: 'Verdana', sans-serif;    /* Change from Inter */
```

## 🌍 Language Settings

### Add New Language

1. Update HTML `data-en` and `data-ar` attributes
2. Extend language object in `js/app.js`:

```javascript
gettext(key) {
    const translations = {
        'en': { /* existing */ },
        'ar': { /* existing */ },
        'fr': { 'noResults': 'Aucun résultat...' } // Add French
    };
    return translations[this.currentLanguage][key];
}
```

3. Update language switcher in HTML

## 🔗 Navigation

### Add New Section

1. Create section in `index.html`:
```html
<section id="my-section" class="section">
    <div class="container">
        <h2 class="section-title">My Section</h2>
        <!-- Content -->
    </div>
</section>
```

2. Add nav link:
```html
<a href="#" class="nav-link" data-section="my-section">My Section</a>
```

3. Router auto-handles scrolling

## 📱 Responsive Adjustments

### Mobile-First Approach

Add mobile styles at bottom of `css/styles.css`:

```css
@media (max-width: 768px) {
    .section-title {
        font-size: 1.5rem;  /* Smaller on mobile */
    }
    
    .container {
        padding: 0 1rem;    /* Tighter padding */
    }
}
```

## ⚡ Performance Tips

### Optimize Images

Replace placeholder SVGs with actual images:

```bash
# Convert PNG to WebP (smaller, better quality)
cwebp image.png -o image.webp

# Update paths in JSON
"image": "assets/image.webp"
```

### Enable Gzip Compression

Most hosting platforms auto-enable. Check with:

```bash
# Test with curl
curl -I -H "Accept-Encoding: gzip" http://yoursite.com
```

### Minify CSS/JS

Before deployment (optional):

```bash
# Using online tools or npm packages
npm install -g cssnano
cssnano css/styles.css > css/styles.min.css
```

## 🔍 SEO Optimization

### Update Meta Tags

In `index.html`, line 7-8:

```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="Egypt, pyramids, tourism, archaeology">
<meta property="og:title" content="Egypt Eternal">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
```

### Add Schema Markup

Before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Egypt Eternal",
  "description": "..."
}
</script>
```

## 🐛 Debugging

### Check Browser Console

Press `F12` → Console tab. Look for:
- `Uncaught TypeError` (JavaScript errors)
- `404` (missing files)
- CORS issues

### Test Locally

```bash
# Check if server is running
curl http://localhost:8000

# Test JSON loading
curl http://localhost:8000/data/places.json
```

### Common Issues

| Problem | Solution |
|---------|----------|
| Images not loading | Check path in JSON, use relative paths |
| Styles not applying | Clear browser cache (Ctrl+Shift+Delete) |
| JavaScript errors | Check console for typos in JSON |
| 3D scene blank | Ensure Three.js CDN loads (check Network tab) |

## 🚀 Deployment

### Deploy to Netlify

1. Push to GitHub
2. Visit netlify.com → "New site from Git"
3. Select repository
4. Build command: (leave empty, it's static)
5. Deploy ✓

### Deploy to Vercel

```bash
npm i -g vercel
vercel
# Follow prompts
```

### Deploy to GitHub Pages

```bash
git add .
git commit -m "Deploy"
git push origin main

# In repo settings → Pages → Source: main branch
```

## 📊 Analytics

Add Google Analytics to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🎓 Learning Resources

- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Three.js**: https://threejs.org/docs/
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Intersection Observer**: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

## 📞 Support

### Common Questions

**Q: How do I add a video header?**
A: Replace the `<video>` tag in hero section with your video URL

**Q: Can I add a contact form?**
A: Use Formspree.io or Basin.io for free form backend

**Q: How do I track clicks?**
A: Add Google Analytics (see above)

**Q: Can I monetize this?**
A: Yes! Add affiliate links or booking integrations

## 📋 Checklist Before Launch

- [ ] Test on mobile, tablet, desktop
- [ ] Update `index.html` title and description
- [ ] Replace placeholder images with real content
- [ ] Test all navigation links
- [ ] Verify JSON data loads
- [ ] Test 3D immersive section
- [ ] Check accessibility (tab key navigation)
- [ ] Test language switcher
- [ ] Set up analytics
- [ ] Configure SSL certificate
- [ ] Set up domain name
- [ ] Create social media graphics
- [ ] Write launch announcement

## 🎉 You're Ready!

Your premium Egyptian tourism website is now live. Customize, deploy, and enjoy! ✨

---

**Need help?** Check `index.html`, `css/styles.css`, and `js/app.js` for inline comments.
