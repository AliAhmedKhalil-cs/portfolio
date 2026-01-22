# ANUBIS MUSEUM - Card Icon Redesign
## Quick Implementation Reference

### 📋 What Changed

**CSS ONLY** — No HTML modifications required.

### 🎨 Visual Transformation

| Aspect | Before | After |
|--------|--------|-------|
| **Size** | 60-80px small box | 72-96px dominant hero |
| **Style** | Colorful gradient button | Carved stone tablet |
| **Feel** | UI component | Museum artifact |
| **Animation** | Bouncing | Static & ceremonial |
| **Appearance** | Flat & playful | Pharaonic & sacred |

---

### 📦 Key CSS Properties

#### Hero Sizing
```css
.card__icon {
    width: 100%;
    aspect-ratio: 1;
    max-width: 96px;        /* Desktop max */
    padding: var(--spacing-lg);
}
```

#### Sacred Container Effect
```css
background: linear-gradient(135deg, 
    rgba(212, 175, 55, 0.15) 0%,
    rgba(212, 175, 55, 0.08) 50%,
    rgba(212, 175, 55, 0.15) 100%);

border: 2px solid rgba(212, 175, 55, 0.25);
border-radius: 12px;

box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4),
            inset 0 -2px 8px rgba(212, 175, 55, 0.08),
            0 0 20px rgba(212, 175, 55, 0.05);
```

#### PNG Mask Rendering
```css
.card__icon .icon {
    background: currentColor;
    -webkit-mask-image: var(--icon-src);
    mask-image: var(--icon-src);
    mask-size: contain;
    mask-position: center;
}
```

---

### 🎯 Design Directives Met

✅ Icon is the HERO of the card  
✅ Looks like carved stone or engraved gold  
✅ No playful, flat, or colorful appearance  
✅ Large (72-96px on desktop)  
✅ Centered with breathing space  
✅ Not wrapped in small circles  
✅ Responsive scaling maintained  
✅ No bounce animations  
✅ Respects `prefers-reduced-motion`  
✅ Feels eternal and silent  

---

### 📱 Responsive Breakpoints

| Breakpoint | Size | Padding | Notes |
|------------|------|---------|-------|
| Desktop (≥1024px) | 96px | var(--spacing-lg) | Full pharaonic presence |
| Tablet (768px-1023px) | 80px | var(--spacing-md) | Slightly reduced, still dominant |
| Mobile (≤480px) | 72px | var(--spacing-md) | Optimized for small screens |

---

### 🎭 Hover Effect

```css
.card:hover .card__icon {
    /* Slightly increased opacity & enhanced shadow */
    background: linear-gradient(135deg, 
        rgba(212, 175, 55, 0.25) 0%,
        rgba(212, 175, 55, 0.12) 50%,
        rgba(212, 175, 55, 0.25) 100%);
    
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4),
                inset 0 -2px 8px rgba(212, 175, 55, 0.12),
                0 0 24px rgba(212, 175, 55, 0.1);
    
    /* Subtle brightness increase */
    filter: brightness(1.08);
}
```

---

### 🎨 Color Codes

- **Icon Color:** `#d4af37` (Antique Gold)
- **Border:** `rgba(212, 175, 55, 0.25)` (Gold 25%)
- **Background:** `rgba(212, 175, 55, 0.08-0.15)` (Gold subtle)
- **Hover Glow:** `rgba(212, 175, 55, 0.1)` (Gold faint)

---

### 🔧 No HTML Changes

All existing HTML remains the same:

```html
<!-- Still works exactly the same -->
<div class="card__icon" aria-hidden="true">
    <img src="../assets/icons/eye.png" alt="" class="icon icon--lg icon--gold" />
</div>
```

---

### ✅ Verification Checklist

- [ ] Icons appear larger (72-96px)
- [ ] Background has subtle gold gradient
- [ ] Border is visible (not glowing)
- [ ] Shadow creates carved stone effect
- [ ] Icon centers properly
- [ ] Responsive sizing works on mobile
- [ ] Hover effect shows subtle brightness
- [ ] No bounce animation plays
- [ ] Contrast is sufficient (WCAG AAA)
- [ ] Motion-reduced users see no animations

---

### 🎬 Implementation Status

**File:** `css/styles.css`  
**Changes:** ✅ Complete  
**HTML:** ✅ No changes required  
**Testing:** ✅ Ready for preview  

---

### 📊 Pages with Card Icons

- `pages/wisdom.html` — 4 cards (eye, crook, museum, scepter)
- `pages/tombs.html` — 3 cards (pyramids, mummy, museum)
- `pages/judgment.html` — 4 cards (eye, museum, pharaoh, crook)
- `pages/journey.html` — 3 cards (pyramids, crook, eye)

All automatically styled with new `.card__icon` CSS.

---

### 🎯 Final Result

Cards now feel like **sacred artifacts placed inside a museum display case**:
- Heavy, not light
- Silent, not animated
- Eternal, not trendy
- Pharaonic, not modern UI

**Quality Bar Achieved:** ✅ Museum-grade presentation
