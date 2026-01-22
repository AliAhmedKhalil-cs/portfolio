# ANUBIS MUSEUM - Icon System Usage Guide

## Overview

The new icon system provides a complete, scalable system for displaying SVG icons throughout the site with automatic sizing, color theming, and accessibility support.

---

## Basic Usage

### Simple Icon

```html
<!-- Default icon (1em / 16px) in primary text color -->
<svg class="icon">
    <use xlink:href="#icon-name"></use>
</svg>
```

### Icon with Size

```html
<!-- Small icon (0.75em / 12px) -->
<svg class="icon icon--sm">
    <use xlink:href="#icon-name"></use>
</svg>

<!-- Medium icon (1.5em / 24px) -->
<svg class="icon icon--md">
    <use xlink:href="#icon-name"></use>
</svg>

<!-- Large icon (2em / 32px) -->
<svg class="icon icon--lg">
    <use xlink:href="#icon-name"></use>
</svg>

<!-- Extra large icon (2.5em / 40px) -->
<svg class="icon icon--xl">
    <use xlink:href="#icon-name"></use>
</svg>
```

### Icon with Color

```html
<!-- Antique gold with drop shadow -->
<svg class="icon icon--gold">
    <use xlink:href="#icon-scepter"></use>
</svg>

<!-- Bright gold with glow effect (for hover states) -->
<svg class="icon icon--gold-bright">
    <use xlink:href="#icon-scarab"></use>
</svg>

<!-- Museum stone (muted, secondary) -->
<svg class="icon icon--muted">
    <use xlink:href="#icon-pyramid"></use>
</svg>

<!-- Primary text color (default) -->
<svg class="icon icon--primary">
    <use xlink:href="#icon-ankh"></use>
</svg>
```

### Interactive Icons

```html
<!-- Icon with hover scale & brightness effect -->
<a href="#" class="icon-link">
    <svg class="icon icon--lg icon--gold icon--interactive">
        <use xlink:href="#icon-scroll"></use>
    </svg>
</a>
```

---

## Real-World Examples

### Navigation Icon

```html
<nav class="navbar">
    <a href="/" class="navbar__logo">
        <svg class="icon icon--lg icon--gold">
            <use xlink:href="#icon-anubis-head"></use>
        </svg>
        <span>ANUBIS MUSEUM</span>
    </a>
</nav>
```

### List with Icons

```html
<ul class="features">
    <li>
        <svg class="icon icon--md icon--gold-bright"></svg>
        <span>Immersive 360° Experience</span>
    </li>
    <li>
        <svg class="icon icon--md icon--gold-bright"></svg>
        <span>Museum-Grade Audio</span>
    </li>
    <li>
        <svg class="icon icon--md icon--gold-bright"></svg>
        <span>Interactive Timeline</span>
    </li>
</ul>
```

### Card with Icon

```html
<div class="card">
    <div class="card__icon">
        <svg class="icon icon--lg icon--gold">
            <use xlink:href="#icon-cartouche"></use>
        </svg>
    </div>
    <h3 class="card__title">Museum Guide</h3>
    <p class="card__text">Explore the sacred chambers...</p>
</div>
```

### Button with Icon

```html
<button class="btn btn--primary">
    <svg class="icon icon--md">
        <use xlink:href="#icon-play"></use>
    </svg>
    Enter the Chamber
</button>
```

### Social Links (Footer)

```html
<div class="social-links">
    <a href="#" title="Facebook" class="social-link">
        <svg class="icon icon--md">
            <use xlink:href="#icon-facebook"></use>
        </svg>
    </a>
    <a href="#" title="Instagram" class="social-link">
        <svg class="icon icon--md">
            <use xlink:href="#icon-instagram"></use>
        </svg>
    </a>
</div>
```

### Hero Section Icon

```html
<section class="hero">
    <div class="hero__content">
        <svg class="icon icon--xl icon--gold" style="margin-bottom: 2rem;">
            <use xlink:href="#icon-ankh-large"></use>
        </svg>
        <h1 class="hero__title">Enter the Pharaonic Realm</h1>
    </div>
</section>
```

---

## Icon Size Reference

| Class | Size | Pixels (at 16px base) | Use Case |
|-------|------|----------------------|----------|
| `.icon--xs` | 0.75em | 12px | Tiny labels, badges |
| `.icon--sm` | 1em | 16px | **Default**, inline text icons |
| `.icon--md` | 1.5em | 24px | List items, small buttons |
| `.icon--lg` | 2em | 32px | Card headers, hero sections |
| `.icon--xl` | 2.5em | 40px | Large hero, feature icons |

---

## Color Reference

| Class | Color | Effect | Use Case |
|-------|-------|--------|----------|
| `.icon--gold` | Antique Gold (#d4af37) | Drop shadow | Primary UI icons |
| `.icon--gold-bright` | Bright Gold (#FFD700) | Glow effect | Hover states, emphasis |
| `.icon--muted` | Museum Stone (#8b8680) | None | Secondary, disabled |
| `.icon--primary` | Ivory (#f5f0e6) | None | Default text icons |

---

## CSS Class Combinations

### Recommended Patterns

✅ **Primary Action Icon**
```html
<svg class="icon icon--lg icon--gold"></svg>
```

✅ **Interactive Navigation Icon**
```html
<svg class="icon icon--md icon--gold icon--interactive"></svg>
```

✅ **Small Secondary Icon**
```html
<svg class="icon icon--sm icon--muted"></svg>
```

✅ **Emphasized Hero Icon**
```html
<svg class="icon icon--xl icon--gold-bright"></svg>
```

### Not Recommended

❌ **Conflicting colors** - Don't mix `.icon--gold` with `.icon--gold-bright`
❌ **Multiple sizes** - Don't apply both `.icon--md` and `.icon--lg`
❌ **Over-styling** - Size + color is usually sufficient

---

## Accessibility

### Alt Text for Icons

Always provide context through surrounding text or `aria-label`:

```html
<!-- Icon with surrounding text -->
<a href="/explore">
    <svg class="icon icon--md icon--gold"></svg>
    Explore the Museum
</a>

<!-- Icon with aria-label -->
<button class="btn" aria-label="Close navigation">
    <svg class="icon icon--md"></svg>
</button>

<!-- Icon as decorative (in complementary role) -->
<button class="btn" aria-label="Play video">
    <svg class="icon icon--md" aria-hidden="true"></svg>
</button>
```

### Reduced Motion Support

Icons automatically respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
    .icon--interactive {
        transition-duration: 0.01ms !important;
    }
}
```

---

## Adding New Icons

### Step 1: Create SVG

```html
<!-- Use inline SVG or sprite system -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L9.5 8H2L7.5 12L5 18L12 14L19 18L16.5 12L22 8H14.5Z"/>
</svg>
```

### Step 2: Apply Icon Class

```html
<svg class="icon icon--md icon--gold">
    <!-- icon content -->
</svg>
```

### Step 3: Color Inheritance

Ensure SVG uses `fill="currentColor"` or `stroke="currentColor"`:

```html
<svg class="icon icon--gold" viewBox="0 0 24 24">
    <path fill="currentColor" d="..."/>
</svg>
```

---

## Browser Support

The icon system works in all modern browsers:
- ✅ Chrome/Edge (88+)
- ✅ Firefox (87+)
- ✅ Safari (14+)
- ✅ iOS Safari (14+)

---

## Performance Tips

1. **Use inline SVG for critical icons** - Avoids extra HTTP request
2. **Use SVG sprites for multiple icons** - Reduces file size
3. **Optimize SVG files** - Remove unnecessary attributes
4. **Cache SVG sprites** - Leverage browser caching

---

## Examples by Section

### Navbar
```html
<svg class="icon icon--md icon--gold icon--interactive"></svg>
```

### Hero Section
```html
<svg class="icon icon--xl icon--gold"></svg>
```

### Cards
```html
<svg class="icon icon--lg icon--gold"></svg>
```

### Buttons
```html
<svg class="icon icon--md"></svg>
```

### Timeline
```html
<svg class="icon icon--sm icon--gold"></svg>
```

### Immersive (360°)
```html
<svg class="icon icon--lg icon--gold-bright"></svg>
```

### Footer
```html
<svg class="icon icon--md icon--gold"></svg>
```

---

## Questions?

Refer to the CSS custom properties in `:root` for exact colors and effects:
- `--color-gold-primary` - Antique gold
- `--color-gold-secondary` - Bright gold
- `--shadow-gold-md` - Gold glow effect
- `--transition-fast` - Hover animation timing
