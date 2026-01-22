# Pharaonic Overlay Effects - Usage Guide v3.0

## Overview
New advanced CSS overlay classes for images to add Egyptian mystique and pharaonic effects.

## Available Classes

### Frame & Border Effects

#### `.image-frame-hieroglyphic`
Royal hieroglyphic border frame with gold accents and inner borders.
```html
<img src="image.jpg" class="image-frame-hieroglyphic" />
```

#### `.image-frame-cartouche`
Cartouche frame - royal Egyptian seal shape with curved top.
```html
<img src="image.jpg" class="image-frame-cartouche" />
```

### Corner & Accent Decorations

#### `.image-corner-lotus`
Lotus flower corner decorations at diagonal corners.
```html
<img src="image.jpg" class="image-corner-lotus" />
```

#### `.image-accent-scarab`
Scarab beetle symbol accent in top-right corner.
```html
<img src="image.jpg" class="image-accent-scarab" />
```

#### `.image-symbol-eye-of-ra`
Eye of Ra (Wedjat) mystical symbol glow in top-left.
```html
<img src="image.jpg" class="image-symbol-eye-of-ra" />
```

### Aura & Lighting Effects

#### `.image-aura-anubis`
Mystical glow effect inspired by Anubis deity.
```html
<img src="image.jpg" class="image-aura-anubis" />
```

#### `.image-lighting-torch`
Torch light illumination from top-left and bottom-right.
```html
<img src="image.jpg" class="image-lighting-torch" />
```

#### `.image-vignette-tomb`
Dark vignette effect mimicking tomb darkness.
```html
<img src="image.jpg" class="image-vignette-tomb" />
```

### Style & Texture Effects

#### `.image-texture-linen`
Mummy linen texture overlay pattern.
```html
<img src="image.jpg" class="image-texture-linen" />
```

#### `.image-overlay-papyrus`
Premium papyrus paper texture overlay.
```html
<img src="image.jpg" class="image-overlay-papyrus" />
```

#### `.image-overlay-sand`
Sand dune gradient overlay effect.
```html
<img src="image.jpg" class="image-overlay-sand" />
```

#### `.image-effect-pyramid`
3D perspective pyramid effect.
```html
<img src="image.jpg" class="image-effect-pyramid" />
```

### Display & Styling

#### `.image-style-scroll`
Ancient scroll roll effect with side borders.
```html
<img src="image.jpg" class="image-style-scroll" />
```

#### `.image-style-glass`
Museum glass display case effect with reflections.
```html
<img src="image.jpg" class="image-style-glass" />
```

### Animations

#### `.image-animation-dust`
Floating gold dust particle animation effect.
```html
<img src="image.jpg" class="image-animation-dust" />
```

## Combining Classes

You can combine multiple classes for enhanced effects:

```html
<!-- Multiple effects -->
<img src="image.jpg" class="image-frame-hieroglyphic image-overlay-papyrus image-animation-dust" />

<!-- Anubis focused -->
<img src="image.jpg" class="image-aura-anubis image-accent-scarab image-lighting-torch" />

<!-- Royal treatment -->
<img src="image.jpg" class="image-frame-cartouche image-corner-lotus image-overlay-sand" />

<!-- Tomb display -->
<img src="image.jpg" class="image-style-glass image-vignette-tomb image-texture-linen" />
```

## Hero Background Enhancement

The hero background now includes enhanced filters and gradient overlays:

### `.hero__background-enhanced`
Apply to hero background for enhanced pharaonic filters.

The hero now features:
- Adjusted brightness (0.9) and contrast (1.1)
- Saturated colors (1.05)
- Gold gradient overlay
- Responsive performance optimization

## Text Effects

### `.text-shadow-hieroglyphic`
Premium text shadow for hieroglyphic-style text.
```html
<h1 class="text-shadow-hieroglyphic">ANUBIS MUSEUM</h1>
```

## Responsive Adjustments

All overlay classes automatically adjust for mobile devices:
- Smaller decorations and symbols on tablets
- Reduced border widths on mobile
- Optimized animations for performance

## Performance Notes

- All overlays use CSS only (no JavaScript)
- Animations are GPU-accelerated
- Use `loading="lazy"` on images for better performance
- Overlays are applied via `::before` and `::after` pseudo-elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid, Flexbox, and CSS Variables required
- IE 11 not supported

## Example HTML Structure

```html
<div class="places-gallery">
    <div class="place-image-card image-frame-hieroglyphic image-overlay-sand">
        <img src="assets/img/places/giza/pyramid.jpg" alt="Great Pyramid" loading="lazy" />
        <div class="place-image-title">
            <h3>Giza Plateau</h3>
            <p>Where pharaohs touch the heavens</p>
        </div>
    </div>
</div>
```

## Customization

To adjust overlay opacity or colors, use CSS variables in the root:

```css
:root {
    --color-gold-primary: #d4af37;
    --color-text-dark: #070708;
}
```

## Attribution

- Icons and effects inspired by Egyptian archaeological design
- Golden palette based on pharaonic color schemes
- Geometry influenced by hieroglyphic writing system
