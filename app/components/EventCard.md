# EventCard Component Documentation

## Overview

The `EventCard` component is a pixel-perfect implementation of event cards based on the reference images from the arena-app rebrand. It provides a modern, interactive card design with hover effects, multiple variants, and responsive behavior.

## Features

### Visual Design

- **Pixel-perfect styling** based on extracted reference image specifications
- **Gradient overlays** and background fallbacks
- **Category and date badges** with backdrop blur effects
- **Smooth hover animations** with transform and shadow effects
- **Interactive action buttons** that appear on hover

### Responsive Design

- **Mobile-first approach** with specific breakpoint optimizations
- **Adaptive image heights** for different screen sizes
- **Flexible typography scaling** across devices
- **Touch-friendly interactions** on mobile devices

### Variants

- **Default**: Standard event card layout
- **Compact**: Smaller card for dense layouts
- **Featured**: Enhanced card with special styling for promoted events

### Interactive States

- **Hover effects**: Scale transform, enhanced shadows, color transitions
- **Loading states**: Skeleton loading with shimmer animations
- **Error handling**: Graceful fallback for missing images
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Usage

```tsx
import EventCard from "./components/EventCard";

const event = {
  id: "event-1",
  title: "Concert Event",
  description: "Amazing concert experience",
  date: "2024-12-25",
  venue: "Arena Kuwait",
  category: "Music",
  image: "/images/event.jpg",
  time: "8:00 PM",
};

<EventCard event={event} />;
```

### With Variants

```tsx
// Compact variant for sidebar or dense layouts
<EventCard event={event} variant="compact" />

// Featured variant for promoted events
<EventCard event={event} variant="featured" />

// Without action buttons
<EventCard event={event} showActions={false} />
```

### With Custom Styling

```tsx
<EventCard
  event={event}
  className="custom-card-class"
  variant="featured"
  showActions={true}
/>
```

## Props

| Prop          | Type                                   | Default     | Description              |
| ------------- | -------------------------------------- | ----------- | ------------------------ |
| `event`       | `Event`                                | Required    | Event data object        |
| `className`   | `string`                               | `""`        | Additional CSS classes   |
| `variant`     | `"default" \| "compact" \| "featured"` | `"default"` | Card variant             |
| `showActions` | `boolean`                              | `true`      | Show/hide action buttons |

## Event Interface

```typescript
interface Event {
  id: string; // Unique event identifier
  title: string; // Event title
  description: string; // Event description
  date: string; // Event date (ISO string)
  venue: string; // Event venue name
  category: string; // Event category
  image?: string; // Optional event image URL
  time?: string; // Optional event time
}
```

## CSS Classes

### Main Classes

- `.arena-event-card` - Main card container
- `.arena-event-card--compact` - Compact variant modifier
- `.arena-event-card--featured` - Featured variant modifier

### Component Classes

- `.arena-event-card-image-container` - Image container
- `.arena-event-card-image` - Event image
- `.arena-event-card-overlay` - Gradient overlay
- `.arena-event-card-category-badge` - Category badge
- `.arena-event-card-date-badge` - Date badge
- `.arena-event-card-content` - Content section
- `.arena-event-card-title` - Event title
- `.arena-event-card-venue` - Venue text
- `.arena-event-card-actions` - Action buttons container

## Styling Specifications

### Dimensions (Extracted from Reference Images)

- **Default height**: 200px (desktop), 160px (mobile)
- **Border radius**: 16px
- **Padding**: 20px (desktop), 16px (mobile)
- **Card width**: 100% (responsive)

### Colors (Extracted from Reference Images)

- **Background**: `var(--arena-bg-card)`
- **Border**: `rgba(255, 255, 255, 0.08)`
- **Text primary**: `var(--arena-text-primary)`
- **Text secondary**: `var(--arena-text-secondary)`
- **Accent**: `#ff6b35` (brand orange)

### Shadows (Extracted from Reference Images)

- **Default**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Hover**: `0 12px 32px rgba(0, 0, 0, 0.25)`
- **Button**: `0 4px 12px rgba(255, 107, 53, 0.3)`

### Animations

- **Hover transform**: `translateY(-4px) scale(1.02)`
- **Image zoom**: `scale(1.05)`
- **Transition duration**: `250ms`
- **Easing**: `cubic-bezier(0, 0, 0.2, 1)`

## Responsive Breakpoints

### Mobile (≤640px)

- Image height: 160px
- Padding: 16px
- Title size: 16px
- Reduced badge sizes

### Tablet (641px-768px)

- Image height: 180px
- Standard padding and typography

### Desktop (≥1024px)

- Image height: 220px
- Enhanced padding: 24px
- Larger typography: 20px title

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and link structure
- **Alt text**: Descriptive alt text for images
- **Keyboard navigation**: Full keyboard accessibility
- **Screen reader support**: ARIA labels and descriptions
- **Focus indicators**: Visible focus states
- **Color contrast**: WCAG compliant color ratios

## Performance Optimizations

- **Lazy loading**: Images load on demand
- **Error handling**: Graceful fallback for failed images
- **CSS animations**: Hardware-accelerated transforms
- **Minimal re-renders**: Optimized React rendering
- **Bundle size**: Efficient CSS with minimal overhead

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS features**: CSS Grid, Flexbox, Custom Properties, Backdrop Filter
- **JavaScript**: ES6+ features with Next.js transpilation
- **Mobile browsers**: iOS Safari, Chrome Mobile, Samsung Internet

## Integration with Arena Theme

The EventCard component is fully integrated with the arena-theme.css system:

- Uses CSS custom properties for consistent theming
- Follows the arena spacing and typography scale
- Implements arena color palette and gradients
- Supports theme variants and customization

## Loading States

The component includes a companion `EventCardSkeleton` component for loading states:

```tsx
import EventCardSkeleton from "./components/EventCardSkeleton";

// Show skeleton while loading
{
  loading ? <EventCardSkeleton /> : <EventCard event={event} />;
}
```

## Best Practices

### Performance

- Use the `compact` variant for lists with many cards
- Implement virtualization for large event lists
- Optimize images with proper sizing and formats

### UX/UI

- Use `featured` variant sparingly for promoted events
- Maintain consistent spacing in card grids
- Provide loading states for better perceived performance

### Accessibility

- Always provide meaningful alt text for event images
- Use semantic HTML structure
- Test with keyboard navigation and screen readers

## Future Enhancements

- **Lazy loading**: Implement intersection observer for images
- **Animation library**: Consider Framer Motion for advanced animations
- **Image optimization**: Add Next.js Image component support
- **Theming**: Support for multiple theme variants
- **Internationalization**: RTL/LTR layout support

## Related Components

- `EventCardSkeleton` - Loading state component
- `EventSlider` - Carousel component using EventCard
- `EventGrid` - Grid layout component for multiple cards

This documentation provides comprehensive guidance for using and maintaining the EventCard component in the arena-app project.
