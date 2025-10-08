# Arena Theme System Guide

## Overview

The Arena Theme System is a comprehensive design system built with CSS custom properties (CSS variables) that provides a consistent, maintainable, and pixel-perfect implementation of the arena-app rebrand.

## File Structure

```
app/
├── styles/
│   ├── arena-theme.css          # Main theme system file
│   └── arena-theme-guide.md     # This documentation file
├── globals.css                  # Updated to import arena theme
└── tailwind.config.js           # Updated with arena theme tokens
```

## Theme System Architecture

### 1. CSS Custom Properties (CSS Variables)

The theme system uses CSS custom properties defined in `:root` for maximum flexibility and maintainability. All values are centralized in `arena-theme.css`.

### 2. Tailwind Integration

The Tailwind configuration has been extended to use the CSS custom properties, allowing you to use both:

- Tailwind utility classes: `bg-arena-primary`, `text-arena-secondary`
- CSS custom properties: `var(--arena-primary)`, `var(--arena-text-secondary)`

### 3. Component Base Classes

Pre-built component classes are available for common UI elements:

- `.arena-button`, `.arena-button-primary`, `.arena-button-secondary`
- `.arena-input`, `.arena-card`, `.arena-modal`
- `.arena-dropdown`

## Color System

### Primary Brand Colors

- `--arena-primary`: Main brand color
- `--arena-primary-hover`: Hover state
- `--arena-primary-active`: Active state
- `--arena-primary-light`: Light variant
- `--arena-primary-dark`: Dark variant

### Usage Examples

```css
/* CSS */
.my-component {
  background-color: var(--arena-primary);
  color: var(--arena-text-primary);
}

/* Tailwind */
<div class="bg-arena-primary text-arena-text-primary">
```

## Typography System

### Font Families

- `--arena-font-primary`: Main font family
- `--arena-font-secondary`: Secondary font family
- `--arena-font-mono`: Monospace font family

### Font Sizes

- `--arena-text-xs` through `--arena-text-6xl`
- Corresponding Tailwind classes: `text-arena-xs` through `text-arena-6xl`

### Usage Examples

```css
/* CSS */
.heading {
  font-family: var(--arena-font-primary);
  font-size: var(--arena-text-3xl);
  line-height: var(--arena-leading-tight);
}

/* Tailwind */
<h1 class="font-arena-primary text-arena-3xl leading-arena-tight">
```

## Spacing System

### Spacing Scale

- `--arena-space-1` (4px) through `--arena-space-32` (128px)
- Corresponding Tailwind classes: `p-arena-4`, `m-arena-8`, etc.

### Usage Examples

```css
/* CSS */
.card {
  padding: var(--arena-space-6);
  margin-bottom: var(--arena-space-4);
}

/* Tailwind */
<div class="p-arena-6 mb-arena-4">
```

## Component Dimensions

### Pre-defined Heights

- `--arena-header-height`: Header component height
- `--arena-button-height-md`: Standard button height
- `--arena-input-height`: Input field height

### Usage Examples

```css
/* CSS */
.header {
  height: var(--arena-header-height);
}

/* Tailwind */
<header class="h-arena-header">
```

## Shadow System

### Shadow Variants

- `--arena-shadow-sm` through `--arena-shadow-2xl`
- Component-specific: `--arena-shadow-card`, `--arena-shadow-button`
- Focus shadows: `--arena-shadow-focus`

### Usage Examples

```css
/* CSS */
.card {
  box-shadow: var(--arena-shadow-card);
}

.card:hover {
  box-shadow: var(--arena-shadow-card-hover);
}

/* Tailwind */
<div class="shadow-arena-card hover:shadow-arena-card-hover">
```

## Border Radius System

### Radius Scale

- `--arena-radius-sm` through `--arena-radius-2xl`
- Component-specific: `--arena-radius-card`, `--arena-radius-button`

### Usage Examples

```css
/* CSS */
.button {
  border-radius: var(--arena-radius-button);
}

/* Tailwind */
<button class="rounded-arena-button">
```

## Gradient System

### Available Gradients

- `--arena-gradient-primary`: Main brand gradient
- `--arena-gradient-hero`: Hero section gradient
- `--arena-gradient-card`: Card overlay gradient
- `--arena-gradient-button`: Button gradient

### Usage Examples

```css
/* CSS */
.hero {
  background: var(--arena-gradient-hero);
}

/* Tailwind */
<div class="bg-arena-gradient-hero">
```

## Animation & Transitions

### Transition Durations

- `--arena-transition-fast`: 150ms
- `--arena-transition-normal`: 250ms
- `--arena-transition-slow`: 350ms

### Easing Functions

- `--arena-ease-linear`, `--arena-ease-in`, `--arena-ease-out`, `--arena-ease-in-out`

### Usage Examples

```css
/* CSS */
.button {
  transition: all var(--arena-transition-normal) var(--arena-ease-in-out);
}

/* Tailwind */
<button class="transition-all duration-arena-normal ease-arena-in-out">
```

## Responsive System

### Breakpoints

- `--arena-breakpoint-sm`: 640px
- `--arena-breakpoint-md`: 768px
- `--arena-breakpoint-lg`: 1024px
- `--arena-breakpoint-xl`: 1280px

### Container Widths

- `--arena-container-sm` through `--arena-container-2xl`

## Component Base Classes

### Button Components

```html
<!-- Primary Button -->
<button class="arena-button arena-button-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="arena-button arena-button-secondary">Secondary Action</button>
```

### Input Components

```html
<!-- Standard Input -->
<input class="arena-input" type="text" placeholder="Enter text..." />
```

### Card Components

```html
<!-- Standard Card -->
<div class="arena-card p-arena-6">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Modal Components

```html
<!-- Modal -->
<div class="arena-modal p-arena-8">
  <h2>Modal Title</h2>
  <p>Modal content...</p>
</div>
```

## Theme Customization

### Dark/Light Theme Support

The system includes support for theme switching:

```css
/* Dark theme (default) */
[data-theme="dark"] {
  --arena-bg-primary: #000000;
}

/* Light theme */
[data-theme="light"] {
  --arena-bg-primary: #ffffff;
}
```

### Custom Component Variants

You can create custom variants by extending the base classes:

```css
.arena-button-danger {
  background-color: var(--arena-error);
  color: var(--arena-text-primary);
}

.arena-button-danger:hover {
  background-color: var(--arena-error);
  opacity: 0.9;
}
```

## Extracting Values from Reference Images

### Required Extractions

All values marked with `[EXTRACT]` in `arena-theme.css` need to be replaced with exact values from the reference images:

#### 1. Color Extraction

Use color picker tools to extract exact hex values for:

- Primary brand colors
- Background colors
- Text colors
- Border colors
- Status colors

#### 2. Measurement Extraction

Use pixel measurement tools to extract:

- Font sizes
- Spacing values
- Component dimensions
- Border radius values
- Shadow specifications

#### 3. Typography Extraction

Identify and specify:

- Font families used
- Font weights
- Line heights
- Letter spacing

### Extraction Process

1. **Open reference images** in color picker and measurement tools
2. **Sample colors** from different UI elements
3. **Measure dimensions** of components and spacing
4. **Identify typography** specifications
5. **Update arena-theme.css** with exact values
6. **Test implementation** against reference images

### Tools Recommended

#### Color Extraction

- Digital Color Meter (macOS)
- ColorZilla (Browser extension)
- Adobe Color
- Photoshop/GIMP eyedropper

#### Measurement Tools

- PixelSnap (macOS)
- Browser Developer Tools
- Figma/Sketch rulers
- Online pixel rulers

## Migration Guide

### From Legacy Theme

1. **Replace color classes**:

   ```html
   <!-- Old -->
   <div class="bg-primary text-white">
     <!-- New -->
     <div class="bg-arena-primary text-arena-text-primary"></div>
   </div>
   ```

2. **Update component styling**:

   ```css
   /* Old */
   .my-component {
     background: #ff6b35;
     color: white;
   }

   /* New */
   .my-component {
     background: var(--arena-primary);
     color: var(--arena-text-primary);
   }
   ```

3. **Use new component classes**:

   ```html
   <!-- Old custom button -->
   <button class="bg-primary text-white px-6 py-2 rounded">
     <!-- New arena button -->
     <button class="arena-button arena-button-primary"></button>
   </button>
   ```

## Best Practices

### 1. Use CSS Custom Properties

Prefer CSS custom properties over hardcoded values for maintainability.

### 2. Leverage Component Classes

Use pre-built component classes for consistency.

### 3. Follow Naming Conventions

- Use `arena-` prefix for all custom classes
- Use semantic naming (primary, secondary, accent)
- Use size scales (sm, md, lg, xl)

### 4. Maintain Accessibility

- Ensure sufficient color contrast
- Use focus styles for interactive elements
- Provide alternative text and labels

### 5. Test Responsively

- Test all breakpoints
- Ensure mobile-first approach
- Validate touch targets on mobile

## Troubleshooting

### Common Issues

1. **CSS Variables not working**

   - Ensure `arena-theme.css` is imported in `globals.css`
   - Check that variables are defined in `:root`

2. **Tailwind classes not applying**

   - Verify Tailwind config includes arena theme extensions
   - Ensure content paths include all component files

3. **Colors not matching reference**
   - Double-check extracted hex values
   - Verify color picker accuracy
   - Test in different browsers

### Performance Considerations

1. **CSS Bundle Size**

   - Use Tailwind's purge feature to remove unused styles
   - Consider splitting theme into critical and non-critical parts

2. **Runtime Performance**
   - CSS custom properties have minimal performance impact
   - Avoid excessive DOM manipulation of theme variables

## Future Enhancements

### Planned Features

1. **Theme Switching**

   - Runtime theme switching capability
   - User preference persistence
   - System theme detection

2. **Component Library**

   - Expanded component base classes
   - React component wrappers
   - Storybook documentation

3. **Design Tokens**
   - JSON design token export
   - Integration with design tools
   - Automated theme generation

## Support

For questions or issues with the Arena Theme System:

1. Check this documentation first
2. Review the `arena-theme.css` file for available variables
3. Test with browser developer tools
4. Validate against reference images

Remember: The goal is pixel-perfect implementation matching the reference images exactly.
