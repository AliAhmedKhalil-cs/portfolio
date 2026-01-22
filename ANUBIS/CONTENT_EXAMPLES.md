# Egypt Eternal - Content Examples

This file shows you **exactly how to add new content** to your site.

---

## ➕ How to Add a New Place

### Example: Luxor Temple Addition

**File**: `data/places.json`

Find the `places` array and add this object:

```json
{
  "id": 20,
  "name": "Temple of Luxor",
  "arabicName": "معبد الأقصر",
  "region": "Luxor",
  "category": "Temples",
  "image": "assets/luxor-temple.svg",
  "excerpt": "A radiant temple dedicated to Amun-Ra, Luxor's colossal pylons and statues rise from the banks of the Nile, eternally magnificent.",
  "teaserStory": "Stand before twin obelisks and colossal statues of Ramesses II that seem to command the Nile itself. Here, pharaohs performed sacred rituals to commune with the divine.",
  "fullStory": "Built primarily during the New Kingdom, Luxor Temple served as a sanctuary for the Theban Triad (Amun, Mut, and Khonsu). Unlike most temples set in isolated locations, Luxor stood within the ancient city of Thebes, integrated into daily religious life. The temple's layout follows a classic Egyptian design: a grand pylon entrance flanked by obelisks, an open courtyard, and inner sanctum. Ramesses II added the First Pylon and numerous colossal statues. The temple witnessed millennia of devotion—priests, pharaohs, and common people walked its corridors seeking divine blessing.",
  "era": "New Kingdom (c. 1390-1070 BCE)",
  "location": "Luxor city center, Upper Egypt",
  "discovered": "Continuously inhabited; formally excavated 19th-20th centuries",
  "highlights": "Great Pylon of Ramesses II, Colossal statues, Open courtyard, Sanctuary of Amun, Reliefs of religious ceremonies",
  "visitingTips": "Best visited at sunset when the temple glows golden. The site is in the city, easily accessed. An evening sound and light show adds drama. Modest dress recommended. Local guides provide rich historical context.",
  "relatedRulers": ["Ramesses II", "Amenhotep III", "Tuthmosis III"]
}
```

### After Adding:
1. Save the file
2. Refresh your browser
3. New place appears in grid automatically
4. Filterable by region and category
5. Click the card to see full details

---

## ➕ How to Add a New Ruler/Pharaoh

### Example: Adding Amenhotep III

**File**: `data/rulers.json`

Find the `rulers` array and add:

```json
{
  "name": "Amenhotep III",
  "arabicName": "أمنحتب الثالث",
  "icon": "👑",
  "title": "The Magnificent",
  "arabicTitle": "البداع",
  "era": "New Kingdom, Eighteenth Dynasty (c. 1390-1352 BCE)",
  "story": "Amenhotep III ascended to a powerful Egypt and maintained its grandeur through diplomacy and magnificent architecture. Known as 'the Dazzling Aten,' he ruled for 38 years during a golden age of prosperity. His reign saw little military strife, instead focusing on monumental building projects and diplomatic marriages. He married a Mitanni princess to cement alliances and maintained correspondence with other great powers. His son, Akhenaten, would later revolutionize Egyptian religion, but Amenhotep III remained a traditionalist, supporting the priesthood of Amun. He was deified during his own lifetime—a unique honor suggesting his immense popularity.",
  "achievements": [
    "Built Luxor Temple's main sanctuary and pylon",
    "Commissioned 700 colossal statues throughout Egypt",
    "Established lasting diplomatic relations with foreign powers",
    "Maintained peaceful prosperity for 38 years",
    "Built numerous temples and administrative buildings",
    "Increased Egyptian wealth through effective governance"
  ],
  "monuments": ["Luxor Temple (main sanctuary)", "Mortuary Temple at Malkata", "Colossi of Memnon", "Karnak Temple additions"]
}
```

### After Adding:
1. Save the file
2. Link any existing places that mention this ruler
3. Update `relatedRulers` arrays in places.json
4. Ruler automatically appears when their place is clicked

---

## ➕ How to Add a Historical Period

### Example: Adding a Dynasty

**File**: `data/timeline.json`

Find the `timeline` array and add:

```json
{
  "name": "Fifth Dynasty (Pyramid Age Continued)",
  "period": "c. 2494-2345 BCE",
  "description": "Following the Fourth Dynasty's monumental achievements, the Fifth Dynasty maintained the pyramid-building tradition but with decreasing resources and size. These pharaohs turned focus toward religious texts and the development of the Pyramid Texts—the oldest religious writings known. The priesthood of Ra grew increasingly influential, eventually rivaling royal authority. Trade expanded, particularly with Nubia and the Levant. Though smaller in scale than Fourth Dynasty monuments, Fifth Dynasty pyramids showcase sophisticated religious thought and maintained Egypt's cultural and economic prosperity."
}
```

---

## ➕ How to Add a Testimonial

### Example: Adding a Review

**File**: `data/testimonials.json`

Find the `testimonials` array and add:

```json
{
  "author": "Hans Mueller",
  "location": "Berlin, Germany",
  "rating": 5,
  "text": "As an engineer, visiting these monuments was humbling. The precision of construction 4,500 years ago surpasses modern expectations. Egypt deserves to be on every engineer's pilgrimage list."
}
```

### Rating System
- 1 star: ⭐
- 2 stars: ⭐⭐
- 3 stars: ⭐⭐⭐
- 4 stars: ⭐⭐⭐⭐
- 5 stars: ⭐⭐⭐⭐⭐

---

## 🌍 Regions You Can Use

When adding places, use these region values (or add new ones):

```
"region": "Cairo/Giza"          - Pyramids and capital sites
"region": "Luxor"               - Upper Egypt temples
"region": "Aswan"               - Southern sites
"region": "Alexandria"          - Mediterranean coast
"region": "Sinai"               - Desert monasteries
"region": "Red Sea"             - Coastal areas
"region": "Western Desert"      - Oases and remote sites
```

---

## 🏛️ Categories You Can Use

When adding places, use these category values:

```
"category": "Pyramids"          - Pyramid complexes
"category": "Temples"           - Temples and sanctuaries
"category": "Tombs"             - Burial sites and valleys
"category": "Museums"           - Museum collections
"category": "Fortresses"        - Military structures
"category": "Monasteries"       - Religious communities
"category": "Monuments"         - Memorials and landmarks
```

---

## 🎨 Adding Custom Images

### Replace Placeholder SVGs

1. **Create or obtain high-quality image** (JPG, PNG, WebP)
2. **Save to** `assets/folder-name.jpg`
3. **Update JSON:**

```json
"image": "assets/your-image.jpg"
```

### Better Yet: Use External URLs

```json
"image": "https://example.com/high-quality-image.jpg"
```

This way you don't need to store large files locally.

---

## 🔤 Bilingual Content Rules

Always provide BOTH languages:

### In HTML:
```html
<h1 data-en="Home" data-ar="الرئيسية">Home</h1>
```

### In JSON (if applicable):
```json
{
  "name": "English Name",
  "arabicName": "الاسم بالعربية"
}
```

### Notes:
- Arabic text flows right-to-left automatically
- Use Arabic fonts (Cairo, Noto Kufi) for Arabic text
- Test language toggle to verify

---

## 📸 Creating Placeholder Content

### Before you have real images, use:

1. **Gradient placeholders** (easiest):
```html
<div style="background: linear-gradient(135deg, #D4AF37, #8B7355); 
            width: 100%; height: 300px;"></div>
```

2. **Online services**:
   - placeholder.com
   - unsplash.com (free historical photos)
   - pixabay.com (free images)
   - pexels.com (free images)

3. **SVG generators**:
   - Hero Patterns
   - Generate Data URI
   - Blobmaker

---

## ✏️ Editing Existing Content

### To update a place description:

**File**: `data/places.json`

Find the place by name, edit the `fullStory`:

```json
{
  "id": 1,
  "name": "The Great Pyramids of Giza",
  "fullStory": "Your updated story here..."  // ← Edit this
}
```

Save and refresh browser.

---

## 🎬 Advanced: Add Hero Video

Replace placeholder in `index.html` (line ~65):

```html
<!-- OLD -->
<video autoplay muted loop class="hero-video" playsinline>
    <source src="assets/hero-bg.mp4" type="video/mp4">
</video>

<!-- NEW: Your video URL -->
<video autoplay muted loop class="hero-video" playsinline>
    <source src="https://yoursite.com/egyptian-hero.mp4" type="video/mp4">
</video>
```

### Video Recommendations:
- Format: MP4 (H.264 codec)
- Duration: 10-30 seconds (loops)
- Resolution: 1920x1080 minimum
- File size: < 10MB (compress!)
- Content: Sunrise pyramids, Nile, temples

---

## 🔗 Linking Rulers to Places

The "Related Rulers" feature connects rulers to places.

### In `places.json`:
```json
{
  "name": "Valley of the Kings",
  "relatedRulers": ["Tutankhamun", "Ramesses II", "Seti I"]
}
```

### In `rulers.json`:
```json
{
  "name": "Tutankhamun",
  "monuments": ["Tomb (KV62) in Valley of the Kings"]
}
```

When you click a place, its related rulers appear in a modal. Click the ruler to see their full biography.

---

## 📊 JSON Format Validation

### Test your JSON

Paste your JSON into:
- jsonlint.com
- jsonchecker.com

### Common Errors:
```
❌ Missing comma: "name": "Egypt" "region": "Giza"
✓ Correct:        "name": "Egypt", "region": "Giza"

❌ Single quotes: 'name'
✓ Correct:        "name"

❌ Trailing comma: {"name": "Egypt",}
✓ Correct:        {"name": "Egypt"}
```

---

## 🎓 Content Guidelines

### What Makes Good Content:

✓ **Accurate**: Dates, names, facts verified
✓ **Engaging**: Story-driven, not dry facts
✓ **Bilingual**: Always provide Arabic + English
✓ **Concise**: Teaser < 100 words, Full story < 500 words
✓ **Respectful**: Honor ancient cultures appropriately
✓ **Honest**: Label speculation or legend

### Teaser vs Full Story:

**Teaser** (used in cards, opening):
```
"Short, cinematic hook that makes user click for more."
```

**Full Story** (used in modal):
```
"Complete historical narrative with depth, context, 
and significance. 2-3 paragraphs."
```

---

## 🚀 Quality Checklist Before Publishing

- [ ] All JSON files valid (use jsonlint.com)
- [ ] All Arabic text properly transliterated
- [ ] All ruler names in `relatedRulers` exist in rulers.json
- [ ] All image paths work (refresh and test)
- [ ] No broken links
- [ ] Tested on mobile
- [ ] Tested language switcher
- [ ] Testimonials use 1-5 star rating

---

## 📝 Real-World Content Examples

### Example Place (Detailed)

```json
{
  "id": 18,
  "name": "Red Pyramid of Dahshur",
  "arabicName": "الهرم الأحمر في دهشور",
  "region": "Cairo/Giza",
  "category": "Pyramids",
  "image": "assets/red-pyramid.jpg",
  "excerpt": "The world's oldest bent pyramid, a transitional masterpiece showing ancient architects' evolving vision.",
  "teaserStory": "Two pyramids at Dahshur mark the moment Egyptian architects solved the pyramid puzzle. The Bent Pyramid experiments; the Red Pyramid perfects.",
  "fullStory": "Built by Pharaoh Sneferu (c. 2613-2589 BCE), the Red Pyramid at Dahshur stands 102 meters tall and remains the third-largest pyramid ever built. Its name comes from the reddish limestone blocks exposed by erosion. What makes Dahshur revolutionary is the pair of pyramids: the Bent Pyramid (where the angle changes mid-construction) and the Red Pyramid (perfect angle throughout). Sneferu's engineers experimented with the Bent Pyramid, discovering that steep angles weren't stable. By the time they built the Red Pyramid, they'd perfected the technique. The Red Pyramid's interior passages are surprisingly complex, with hidden chambers and false corridors. This site reveals the thinking process of ancient architects—seeing their trial and error across two monuments.",
  "era": "Old Kingdom, Fourth Dynasty (c. 2613-2589 BCE)",
  "location": "Dahshur, south of Cairo",
  "discovered": "Known to ancient Greeks; systematically excavated 20th century",
  "highlights": "Red Pyramid structure, Bent Pyramid, Internal passages, Limestone preservation",
  "visitingTips": "Day trip from Cairo (40 km). Less crowded than Giza. Interior passages can be explored (ducking required). Bring flashlight. The site is less developed for tourists—guide recommended.",
  "relatedRulers": ["Sneferu"]
}
```

### Example Ruler (Detailed)

```json
{
  "name": "Sneferu",
  "arabicName": "سنفرو",
  "icon": "🏗️",
  "title": "The Master Builder",
  "arabicTitle": "ملك الحرفة",
  "era": "Old Kingdom, Fourth Dynasty (c. 2613-2589 BCE)",
  "story": "Sneferu ruled for 24 years and is considered the greatest builder before Khufu. He commissioned FOUR pyramids during his reign—an unprecedented building program. The Bent Pyramid at Dahshur is his first, showing experimental design. The Red Pyramid is his masterpiece, perfecting pyramid construction. He also built pyramids at Meidum. Sneferu's building program transformed pyramid construction from art into science. His engineers tested designs, adjusted angles, and created a template for centuries of pyramid building. Beyond monuments, Sneferu was an effective administrator who expanded trade routes and maintained Egypt's stability. His son Khufu would build the Great Pyramid, but it was Sneferu who proved it possible.",
  "achievements": [
    "Built four pyramids during 24-year reign (unmatched productivity)",
    "Perfected pyramid design through experimentation",
    "Created the first true pyramids with stable angles",
    "Expanded Egyptian trade networks",
    "Maintained stable governance and economic prosperity",
    "Established the template for pyramid architecture"
  ],
  "monuments": [
    "Red Pyramid at Dahshur",
    "Bent Pyramid at Dahshur",
    "Pyramid at Meidum",
    "Maidum pyramid (earlier work)"
  ]
}
```

---

## 🎯 Ready to Add Content?

1. **Open `data/places.json`** in your text editor
2. **Find the end** of the places array
3. **Paste a new place object** (use examples above)
4. **Save the file**
5. **Refresh your browser**
6. **New place appears!**

Same process for rulers, timeline, and testimonials.

---

**Happy editing! 🏛️**
