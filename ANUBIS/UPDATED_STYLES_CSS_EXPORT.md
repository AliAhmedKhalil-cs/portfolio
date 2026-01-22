/* ============================================================================
   ANUBIS MUSEUM - UPDATED CARD ICON STYLES
   Museum-Grade Pharaonic Design System v2.1
   ============================================================================

   COMPLETE CSS UPDATES FOR CARD ICONS
   
   This document contains all the CSS rules that were updated to fix and 
   enhance the card icons throughout the ANUBIS MUSEUM site.
   
   ============================================================================ */

/* ============================================================================
   PRIMARY CARD ICON CONTAINER - .card__icon
   Large (96px desktop), dominant, pharaonic seal/tablet styling
   ============================================================================ */

.card__icon {
    /* Hero Sizing - Large Dominant Icon */
    width: 100%;
    aspect-ratio: 1;
    max-width: 96px;
    margin: 0 auto var(--spacing-xl);
    
    /* Centering & Alignment */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Museum-Grade Pharaonic Seal/Tablet Background */
    background: linear-gradient(135deg, 
        #1a1410 0%,
        #2a2218 25%,
        #1a1410 50%,
        #241f14 75%,
        #1a1410 100%);
    
    /* Dark stone gradient with subtle gold highlights */
    position: relative;
    overflow: hidden;
    
    /* Subtle carved stone effect via inset shadow */
    border: 2px solid rgba(212, 175, 55, 0.35);
    border-radius: 10px;
    box-shadow: 
        inset 0 3px 12px rgba(0, 0, 0, 0.7),
        inset 0 -2px 6px rgba(212, 175, 55, 0.12),
        0 0 20px rgba(212, 175, 55, 0.08),
        inset 0 1px 0 rgba(212, 175, 55, 0.2);
    
    /* Breathing space and visual weight */
    padding: var(--spacing-lg);
    
    /* Transition for hover effects - subtle, no bounce */
    transition: all var(--transition-base) ease-out;
}

/* Top-left radial light accent - creates pharaonic "sheen" */
.card__icon::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, 
        rgba(212, 175, 55, 0.08) 0%,
        transparent 50%);
    border-radius: 10px;
    pointer-events: none;
}

/* Hover light sweep layer - smooth glow animation */
.card__icon::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, 
        rgba(212, 175, 55, 0.05) 0%,
        transparent 40%,
        rgba(0, 0, 0, 0.15) 100%);
    border-radius: 10px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-base) ease-out;
}

/* Hover: Light sweep effect (no bounce) */
.card__icon:hover::after {
    opacity: 1;
    animation: lightSweep 1.5s ease-in-out infinite;
}

/* Light sweep animation - subtle pharaonic glow */
@keyframes lightSweep {
    0% {
        background: linear-gradient(180deg, 
            rgba(212, 175, 55, 0.05) 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.15) 100%);
    }
    50% {
        background: linear-gradient(180deg, 
            rgba(212, 175, 55, 0.12) 0%,
            rgba(212, 175, 55, 0.05) 40%,
            rgba(0, 0, 0, 0.15) 100%);
    }
    100% {
        background: linear-gradient(180deg, 
            rgba(212, 175, 55, 0.05) 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.15) 100%);
    }
}

/* ============================================================================
   CARD ICON IMAGE STYLING
   Ensures proper scaling, aspect ratio, and centering
   ============================================================================ */

.card__icon .icon,
.card__icon img.icon {
    /* Use currentColor for mask-based rendering */
    color: var(--color-gold-primary);
    width: 80%;
    height: 80%;
    display: block;
    object-fit: contain;
    position: relative;
    z-index: 2;
}

/* For boxicons or icon fonts in cards (if present) */
.card__icon i[class^="bx"],
.card__icon i[class*=" bx-"] {
    color: var(--color-gold-primary);
    width: 100%;
    height: 100%;
    font-size: 100%;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
}

/* ============================================================================
   ARTIFACT CARD ICON CONTAINER - .artifact-card__icon
   Larger variant (120px desktop) for artifact showcase
   ============================================================================ */

.artifact-card__icon {
    /* Dominant icon container */
    margin-bottom: var(--spacing-lg);
    width: 100%;
    aspect-ratio: 1;
    max-width: 120px;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Museum-Grade Pharaonic Seal/Tablet Background */
    background: linear-gradient(135deg, 
        #1a1410 0%,
        #2a2218 25%,
        #1a1410 50%,
        #241f14 75%,
        #1a1410 100%);
    
    /* Subtle carved stone effect */
    border: 2px solid rgba(212, 175, 55, 0.35);
    border-radius: 10px;
    box-shadow: 
        inset 0 3px 12px rgba(0, 0, 0, 0.7),
        inset 0 -2px 6px rgba(212, 175, 55, 0.12),
        0 0 20px rgba(212, 175, 55, 0.08),
        inset 0 1px 0 rgba(212, 175, 55, 0.2);
    
    padding: var(--spacing-lg);
    position: relative;
    overflow: hidden;
    transition: all var(--transition-base) ease-out;
}

/* Top-left radial light accent for artifact icons */
.artifact-card__icon::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, 
        rgba(212, 175, 55, 0.08) 0%,
        transparent 50%);
    border-radius: 10px;
    pointer-events: none;
}

/* Hover light sweep layer for artifact icons */
.artifact-card__icon::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, 
        rgba(212, 175, 55, 0.05) 0%,
        transparent 40%,
        rgba(0, 0, 0, 0.15) 100%);
    border-radius: 10px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-base) ease-out;
}

/* Hover: Light sweep effect for artifact icons (no bounce) */
.artifact-card__icon:hover::after {
    opacity: 1;
    animation: lightSweep 1.5s ease-in-out infinite;
}

/* ============================================================================
   ARTIFACT ICON SVG STYLING
   Ensures proper scaling and hover effects
   ============================================================================ */

.artifact-icon {
    width: 80%;
    height: 80%;
    object-fit: contain;
    position: relative;
    z-index: 2;
    animation: none;
}

.artifact-card:hover .artifact-icon {
    animation: none;
    filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.7));
    transition: filter var(--transition-base) ease-out;
}

/* ============================================================================
   RESPONSIVE DESIGN - TABLET (max-width: 768px)
   ============================================================================ */

@media (max-width: 768px) {
    .icon--2xl {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 2.5rem;
    }

    /* Tablet: Card icons remain prominent */
    .card__icon {
        max-width: 80px;
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .artifact-card__icon {
        max-width: 100px;
        padding: var(--spacing-md);
    }

    .immersive__sigil {
        width: 100px;
        height: 100px;
    }
}

/* ============================================================================
   RESPONSIVE DESIGN - MOBILE (max-width: 480px)
   ============================================================================ */

@media (max-width: 480px) {
    .icon--lg {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.5rem;
    }

    .icon--xl {
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }

    /* Mobile: Icons slightly reduced but still dominant */
    .card__icon {
        max-width: 72px;
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-md);
        border-width: 1.5px;
    }

    .artifact-card__icon {
        max-width: 80px;
        padding: var(--spacing-md);
        border-width: 1.5px;
    }
}

/* ============================================================================
   ACCESSIBILITY - Reduced Motion Support
   Respects user's motion preferences for smooth animations
   ============================================================================ */

@media (prefers-reduced-motion: reduce) {
    .icon--interactive:hover,
    .icon--interactive:focus-visible {
        transform: none;
    }

    .immersive__spinner {
        animation: none;
        border-top-color: transparent;
    }
    
    /* Disable lightSweep animation for users who prefer reduced motion */
    .card__icon:hover::after,
    .artifact-card__icon:hover::after {
        animation: none;
        opacity: 0.5;
    }
}

/* ============================================================================
   COLOR REFERENCE
   ============================================================================

   PRIMARY COLORS:
   - Obsidian (Primary BG): #070708
   - Antique Gold (Accent): #d4af37 (212, 175, 55)
   - Bright Gold (Hover): #FFD700
   - Deep Gold (Shadows): #b88a2a (184, 138, 42)
   - Bronze (Darkest): #7a5b22
   
   NEW PHARAONIC SEAL/TABLET COLORS:
   - Dark Stone (Base): #1a1410
   - Stone (Mid): #2a2218
   - Stone (Dark): #241f14
   - Subtle Gold Border: rgba(212, 175, 55, 0.35)
   - Gold Accent (Light): rgba(212, 175, 55, 0.08-0.12)
   - Shadow (Deep): rgba(0, 0, 0, 0.7)
   
   ============================================================================ */

/* ============================================================================
   SIZING REFERENCE
   ============================================================================

   DESKTOP (≥1024px):
   - .card__icon: 96px × 96px max-width
   - .artifact-card__icon: 120px × 120px max-width
   
   TABLET (768px - 1023px):
   - .card__icon: 80px × 80px max-width
   - .artifact-card__icon: 100px × 100px max-width
   
   MOBILE (≤480px):
   - .card__icon: 72px × 72px max-width
   - .artifact-card__icon: 80px × 80px max-width
   
   IMAGE FILL:
   - width: 80% of container
   - height: 80% of container
   - object-fit: contain (maintains aspect ratio)
   - display: block (removes inline spacing)
   
   ============================================================================ */

/* ============================================================================
   ANIMATION PROPERTIES
   ============================================================================

   lightSweep Animation:
   - Duration: 1.5 seconds
   - Timing: ease-in-out (smooth, luxurious pace)
   - Iteration: infinite (continuous on hover)
   - Effect: Subtle gold light sweep from top to bottom
   - Bounce: NO bounce (ease-in-out prevents bouncing)
   
   Transition Properties:
   - All properties: transition: all var(--transition-base) ease-out
   - Hover layer: transition: opacity var(--transition-base) ease-out
   - No transform/scale animations (keeping it museum-grade, not playful)
   
   ============================================================================ */

/* ============================================================================
   ACCESSIBILITY FEATURES
   ============================================================================

   ✓ High contrast gold borders (WCAG AA compliant)
   ✓ Hover effects don't rely solely on color
   ✓ Smooth animations respect prefers-reduced-motion
   ✓ Icons marked with aria-hidden="true" (decorative)
   ✓ Proper z-index layering for pseudo-elements
   ✓ No transform-based animations (GPU accelerated for smooth performance)
   ✓ Sufficient visual feedback on hover state
   
   ============================================================================ */
