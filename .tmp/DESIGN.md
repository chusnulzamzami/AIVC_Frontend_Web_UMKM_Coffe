---
version: alpha
name: Grass Neubrutalism UI
description: A high-energy, modern neubrutalist design system for a decentralized
  network platform.
colors:
  primary-neon: '#D4E875'
  primary-pastel: '#9DE85B'
  secondary-pastel: '#D4EBF8'
  surface: '#FFFFFF'
  neutral: '#F9FAEF'
  text-main: '#000000'
  shadow-dark: '#000000'
  surface-dim: '#dadbd0'
  surface-bright: '#f9faef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4ea'
  surface-container: '#eeefe4'
  surface-container-high: '#e8e9de'
  surface-container-highest: '#e2e3d9'
  on-surface: '#1a1c16'
  on-surface-variant: '#464838'
  inverse-surface: '#2f312a'
  inverse-on-surface: '#f0f2e7'
  outline: '#777867'
  outline-variant: '#c7c8b3'
  surface-tint: '#566500'
  primary: '#566500'
  on-primary: '#ffffff'
  primary-container: '#d4e875'
  on-primary-container: '#596800'
  inverse-primary: '#bdd060'
  secondary: '#4c616c'
  on-secondary: '#ffffff'
  secondary-container: '#cfe6f3'
  on-secondary-container: '#526772'
  tertiary: '#525e7a'
  on-tertiary: '#ffffff'
  tertiary-container: '#d2deff'
  on-tertiary-container: '#56627e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8ec79'
  primary-fixed-dim: '#bdd060'
  on-primary-fixed: '#181e00'
  on-primary-fixed-variant: '#404c00'
  secondary-fixed: '#cfe6f3'
  secondary-fixed-dim: '#b3cad6'
  on-secondary-fixed: '#071e27'
  on-secondary-fixed-variant: '#344a54'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#bac6e6'
  on-tertiary-fixed: '#0e1b33'
  on-tertiary-fixed-variant: '#3b4761'
  background: '#f9faef'
  on-background: '#1a1c16'
  surface-variant: '#e2e3d9'
typography:
  family-main: Bricolage Variable
  h1:
    fontFamily: '{typography.family-main}'
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.03em
  h2:
    fontFamily: '{typography.family-main}'
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-md:
    fontFamily: '{typography.family-main}'
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0em
  label-sm:
    fontFamily: '{typography.family-main}'
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0.05em
  headline-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
rounded:
  sm: 8px
  md: 24px
  lg: 32px
  full: 9999px
  DEFAULT: 0.5rem
  xl: 1.5rem
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
components:
  nav-item-active:
    backgroundColor: '{colors.primary-pastel}'
    textColor: '{colors.text-main}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
  card-news:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text-main}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
  button-pill:
    backgroundColor: '{colors.text-main}'
    textColor: '{colors.surface}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.md}'
  badge-new:
    backgroundColor: '{colors.primary-pastel}'
    textColor: '{colors.text-main}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
---

## Overview
A modern Neubrutalist interface designed to convey energy and technical prowess. The style is clean, relying on generous space and geometric shapes, but punctuated by bold color and hard, zero-blur offset shadows for a tactile, sticker-like feel.
## Colors
The system is built on extreme contrast. A primary neutral canvas reduces eye strain, while neon greens and pastel blues provide clear functional cues and visual excitement.
- **Primary Neon (#D4E875) & Pastel (#9DE85B):** Signature greens. Used exclusively for focal points, high-priority CTAs, and active states.
- **Shadow Dark (#000000):** Crucial architectural color used for all shadows and text, replacing borders for defining element boundaries.
- **Secondary Pastel (#D4EBF8):** Used for lower-priority badges and accent elements.
## Typography
- **Headlines (H1, H2):** **Bricolage Variable Extra-Bold**. The variable nature allows for precise expression. Highly expressive, tightly tracked, and commands immediate attention.
- **Body (Body-md):** **Bricolage Variable Medium**. Clean and legible, balancing the headers. Variable weight ensures supreme readability across technical information.
## Layout
The design utilizes a strict Bento Grid for features to pack information while maintaining organization. Generous spacing (using `spacing.lg` and `xl` between sections) prevents visual clutter despite the heavy, solid shadows.
## Elevation & Depth
Depth is strictly simulated through solid offset shadows (`4px 4px 0px #000000`). Absolutely no blur or soft gradients are permitted. This creates a physical, "press" effect on elements.
## Shapes
Geometric geometry is prominent. Main cards use pronounced rounded corners (`rounded.md` or `lg`), while interactive buttons and small badges push to a complete pill shape (`rounded.full`). The hard black shadows outline every shape strictly.
## Components
- **Active Navigation Items**: Rectangular with pronounced rounded corners (`rounded.md`) and a solid black offset shadow, using the primary pastel green for visibility.
- **News Cards**: Large corner radius (`rounded.md`), pure white background, and a sharp black offset shadow. Pol pola patterns can be integrated into the image content.
- **Pill Buttons**: Pill-shaped (`rounded.full`), with minimal or no border, relying on a hard offset shadow. Usually dark text on solid background.
## Do's and Don'ts
- **Do** apply a hard, zero-blur offset black shadow (`4px 4px 0px #000000`) to every active element and major card.
- **Don't** use any CSS `box-shadow` with a blur radius greater than `0`. Shadows must be solid and offset.
- **Do** strictly use **Bricolage Variable** for all typography to maintain the brand's engineered feel.
- **Don't** stack multiple neon colors together; use white or neutral backgrounds to let the primary greens stand out.
- **Do** ensure all text on colored backgrounds maintains a WCAG AA contrast ratio (using black text on neon green ensures this).