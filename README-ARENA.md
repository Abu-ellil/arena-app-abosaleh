# arena-app - Event Booking App

This app has been converted from the original event booking app to "arena-app" with a new orange and yellow theme.

## Changes Made

### 1. App Name & Branding

- Changed package name from "event-booking-app" to "arena-app"
- Updated app title to "arena-app - حجز الفعاليات"
- Updated all references from "webook" to "arena-app"

### 2. Color Theme

- **Primary Color**: `#FF6B35` (Arena Orange)
- **Secondary Color**: `#F7931E` (Secondary Orange)
- **Accent Color**: `#FFD23F` (Arena Yellow)
- **Dark Background**: `#1A1A1A` with gradient to `#2A2A2A`

### 3. Visual Updates

- Updated search placeholder text
- Changed event category gradients to orange/yellow theme
- Updated loading spinner color
- Modified seat selection colors
- Updated header and footer branding
- Added Arena-specific CSS classes

### 4. Components Updated

- `app/layout.tsx` - Updated metadata and title
- `app/page.tsx` - Updated branding and colors
- `app/globals.css` - Added Arena theme colors and gradients
- `app/components/Header.tsx` - Updated branding and menu items
- `app/components/Footer.tsx` - Updated branding and links
- `app/components/EventSlider.tsx` - Updated colors and gradients
- `tailwind.config.js` - Added Arena color palette
- `package.json` - Changed app name

### 5. Theme Reference

The new theme is based on the screenshots provided in the `new-theme` folder, featuring:

- Orange and yellow color scheme
- "arena-app" branding
- Modern gradient backgrounds
- Consistent Arena styling throughout

## Development

To run the app:

```bash
npm run dev
```

The app maintains all original functionality while presenting the new arena-app brand identity.
