# CSS Mask-Image Implementation Guide
## For ANUBIS MUSEUM Card Icons

### 🎯 Purpose

The CSS `mask-image` technique allows PNG icons to be **color-independent**. Instead of using the PNG's original colors, we render it as a **transparent mask** that takes on the color we specify via CSS.

---

### 🔬 How It Works

#### Traditional PNG Method (Old)
```html
<img src="icon.png" alt="" />
<!-- PNG carries built-in colors, limited recoloring options -->
```

#### Mask-Image Method (New)
```html
<img src="icon.png" alt="" class="icon icon--lg icon--gold" />
<!-- PNG is used as a mask, rendered in --color-gold-primary -->
```

---

### 📝 CSS Implementation

#### Basic Mask-Image Syntax

```css
.card__icon .icon {
    /* Set background to the desired color */
    background: currentColor;  /* Uses color property value */
    
    /* Apply PNG as mask */
    -webkit-mask-image: url('../assets/icons/eye.png');
    mask-image: url('../assets/icons/eye.png');
    
    /* Control mask sizing */
    -webkit-mask-size: contain;
    mask-size: contain;
    
    /* Center the mask */
    -webkit-mask-position: center;
    mask-position: center;
    
    /* No tiling */
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    
    /* Ensure proper rendering */
    width: 100%;
    height: 100%;
}
```

#### With CSS Variables (Recommended for Multiple Icons)

```css
.card__icon .eye-icon {
    --icon-src: url('../assets/icons/eye.png');
    background: currentColor;
    -webkit-mask-image: var(--icon-src);
    mask-image: var(--icon-src);
}

.card__icon .crook-icon {
    --icon-src: url('../assets/icons/crook.png');
    background: currentColor;
    -webkit-mask-image: var(--icon-src);
    mask-image: var(--icon-src);
}
```

---

### 🎨 Color Control

Since icons are rendered as masks, color is controlled through standard CSS properties:

```css
/* Primary gold */
.card__icon .icon {
    color: var(--color-gold-primary);  /* #d4af37 */
}

/* On hover - brighter gold */
.card:hover .card__icon .icon {
    color: var(--color-gold-secondary);  /* #FFD700 */
}

/* Alternative: Use filter for dynamic changes */
.card:hover .card__icon .icon {
    filter: brightness(1.2);
}
```

---

### ✅ Browser Support

| Browser | Mask-Image | Prefix Required |
|---------|-----------|-----------------|
| Chrome 53+ | ✅ Yes | `-webkit-` |
| Firefox 53+ | ✅ Yes | No |
| Safari 15+ | ✅ Yes | `-webkit-` |
| Edge 79+ | ✅ Yes | `-webkit-` |
| IE 11 | ❌ No | Falls back to PNG |

---

### 🛡️ Fallback Strategy

For browsers without mask-image support:

```css
.card__icon .icon {
    /* Fallback: show PNG as-is */
    background-image: url('../assets/icons/eye.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    
    /* Modern: use mask */
    background: currentColor;
    -webkit-mask-image: url('../assets/icons/eye.png');
    mask-image: url('../assets/icons/eye.png');
    -webkit-mask-size: contain;
    mask-size: contain;
}
```

---

### 🎯 Key Requirements for PNG Icons

For optimal mask-image rendering, PNG icons should:

1. **Be solid color** (preferably black or dark)
2. **Have transparent background**
3. **Have clean edges** (no anti-aliasing artifacts)
4. **Be appropriately sized** (96px × 96px minimum for icons)

#### Example PNG Preparation

```
Source PNG: eye.png (100×100px)
├─ Icon: Solid black eye shape
├─ Background: Transparent
└─ Quality: High-resolution, sharp edges
```

---

### 🔄 Dynamic Icon Recoloring

You can easily change icon colors without modifying HTML:

```css
/* Default state */
.card__icon .icon {
    color: var(--color-gold-primary);
}

/* Hover state */
.card:hover .card__icon .icon {
    color: var(--color-gold-secondary);
}

/* Focus state */
.card:focus-within .card__icon .icon {
    color: #FFD700;
}

/* Dark mode (if applicable) */
@media (prefers-color-scheme: dark) {
    .card__icon .icon {
        color: #E6C200;
    }
}

/* Disabled/muted state */
.card--disabled .card__icon .icon {
    color: var(--color-text-muted);
    opacity: 0.6;
}
```

---

### 🎬 Performance Considerations

**Advantages:**
- ✅ No need for multiple icon variants (different colors)
- ✅ Single PNG file used for all color variations
- ✅ Faster asset loading (fewer files)
- ✅ Dynamic color changes via CSS

**Disadvantages:**
- ❌ Requires transparent PNG backgrounds
- ❌ No support for multi-color icons (renders as single color)
- ❌ Slightly older browsers show original PNG

---

### 🚀 Advanced: Using CSS Filter as Fallback

If mask-image fails, filter can approximate recoloring:

```css
.card__icon .icon {
    /* Try mask-image first */
    background: currentColor;
    -webkit-mask-image: url('../assets/icons/eye.png');
    mask-image: url('../assets/icons/eye.png');
    
    /* Fallback: use filter to colorize PNG
       (works on <img> elements) */
    filter: brightness(0) saturate(100%) invert(83%) 
            sepia(34%) saturate(1223%) hue-rotate(41deg);
}
```

---

### 📋 Troubleshooting

#### Issue: Icon appears as solid color block

**Solution:** Ensure PNG has transparent background, not white/solid background.

```css
/* Check if mask is rendering */
.card__icon .icon {
    background: red;  /* Debug: should show red if mask works */
    -webkit-mask-image: url('../assets/icons/eye.png');
    mask-image: url('../assets/icons/eye.png');
}
```

#### Issue: Icon flickers or shows original PNG colors

**Solution:** Ensure all vendor prefixes are present:

```css
.card__icon .icon {
    -webkit-mask-image: url('../assets/icons/eye.png');  /* Safari/Chrome */
    mask-image: url('../assets/icons/eye.png');          /* Standard */
    -webkit-mask-size: contain;
    mask-size: contain;
}
```

#### Issue: Icon appears pixelated or blurry

**Solution:** Use high-resolution PNG (at least 2x size) and ensure `mask-size: contain`:

```css
/* 192px × 192px PNG rendered as 96px × 96px = sharp */
.card__icon .icon {
    width: 96px;
    height: 96px;
    -webkit-mask-size: contain;
    mask-size: contain;
}
```

---

### 🎨 Complete Example

```html
<!-- HTML (no changes needed) -->
<div class="card__icon" aria-hidden="true">
    <img src="../assets/icons/eye.png" alt="" class="icon icon--lg icon--gold" />
</div>
```

```css
/* CSS with mask-image */
.card__icon {
    width: 96px;
    height: 96px;
    padding: var(--spacing-lg);
    background: linear-gradient(135deg, 
        rgba(212, 175, 55, 0.15) 0%,
        rgba(212, 175, 55, 0.08) 50%,
        rgba(212, 175, 55, 0.15) 100%);
    border: 2px solid rgba(212, 175, 55, 0.25);
    border-radius: 12px;
}

.card__icon .icon {
    width: 100%;
    height: 100%;
    background: currentColor;
    color: var(--color-gold-primary);
    
    /* Mask-image rendering */
    -webkit-mask-image: url('../assets/icons/eye.png');
    mask-image: url('../assets/icons/eye.png');
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
}

.card:hover .card__icon .icon {
    color: var(--color-gold-secondary);
    filter: brightness(1.1);
}
```

---

### 📚 Resources

- **MDN Web Docs:** https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
- **CSS Tricks:** https://css-tricks.com/clipping-masking-css/
- **Can I Use:** https://caniuse.com/css-mask

---

### ✅ ANUBIS Implementation Status

**Technique Applied:** ✅ CSS mask-image for all `.card__icon` PNG images  
**Browser Support:** ✅ 95%+ coverage with vendor prefixes  
**Fallback Strategy:** ✅ Original PNGs render if mask-image not supported  
**Dynamic Coloring:** ✅ Gold palette applied via `currentColor`  
**Performance:** ✅ Optimized with single PNG assets  

---

**Result:** Card icons can be easily recolored, resized, and styled entirely through CSS, without creating multiple PNG variants.
