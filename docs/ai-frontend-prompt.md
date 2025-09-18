# AI Frontend Generation Prompt - Art Department Equipment Rental UI

## Generated Prompt for AI Tools (v0, Lovable, etc.)

```
# High-Level Goal
Create a modern, responsive React UI for a professional film/TV production equipment rental system. This is a high-value rental platform where Hollywood production crews rent cameras, audio gear, lighting equipment, and grip gear. The interface should be professional, technical-spec-focused, and optimized for on-set use by professional crews like Directors of Photography, Sound Mixers, and Gaffers.

## Detailed, Step-by-Step Instructions

### 1. Setup and Foundation
- Create a Next.js 18 application with TypeScript
- Use Tailwind CSS for styling with the dark theme color palette provided
- Set up React Context for global state management (selections, availability)
- Implement a component-based architecture with reusable components
- Create responsive layouts for Mobile (320px-767px), Tablet (768px-1023px), Desktop (1024px-1439px), and Wide (1440px+)

### 2. Core Components to Build

#### Category Accordion Component
- Create collapsible sections for each department: Camera, Audio, Lighting, Grip, Electric, Crane/Jib
- Implement smooth expand/collapse animations (300ms ease-in-out)
- Add rotating chevron icons to indicate state
- Show item counts per category
- Make keyboard accessible with proper ARIA attributes
- Include loading states for dynamic content

#### Equipment Card Component
- Design cards with large hero images for equipment identification
- Display key technical specifications prominently (model, manufacturer, key specs)
- Include rental rates (daily/weekly) and availability status
- Add hover effects with subtle scale and overlay information
- Implement selection state with visual feedback (border color, checkmark)
- Add "Quick Add" button with quantity selector
- Include condition rating and maintenance status indicators

#### Floating Rental Cart Component
- Create a floating action button that expands into a slide-up panel
- Show total item count and estimated rental cost
- Display selected items with quantities and individual costs
- Include "Clear All" functionality
- Add "Proceed to Booking" CTA button
- Implement smooth slide animations (400ms ease-in-out)
- Make it sticky and responsive to scroll position

#### Advanced Search Component
- Build a search interface with technical specification filters
- Include filters for manufacturer, price range, availability date
- Add compatibility matching for related equipment
- Implement real-time search with debouncing
- Show search results in a responsive grid layout
- Include sorting options (name, rate, popularity, condition)

#### Equipment Detail Modal
- Create a modal view with expanded equipment information
- Display full technical specifications and compatibility charts
- Include multiple image gallery with zoom functionality
- Show availability calendar with maintenance schedules
- Add related equipment recommendations
- Include technical documentation and manual links
- Implement quantity selection with availability validation

### 3. Styling and Design Implementation

#### Color Theme (Dark Professional)
```css
/* Primary Colors */
--primary: #FF6B35; /* CTA buttons, active states */
--secondary: #2D3748; /* Cards, backgrounds */
--accent: #FFD93D; /* Warnings, attention */
--success: #48BB78; /* Available items */
--warning: #F6AD55; /* Maintenance items */
--error: #F56565; /* Unavailable items */
--neutral: #718096; /* Text, borders */
--dark-bg: #1A202C; /* Main background */
--light-text: #F7FAFC; /* Primary text */
```

#### Typography
- Use Inter or system sans-serif for primary font
- Implement responsive type scale: H1 (2.5rem), H2 (2rem), H3 (1.5rem), Body (1rem), Small (0.875rem)
- Maintain proper contrast ratios for accessibility
- Use font weights: 700 for headings, 600 for subheadings, 400 for body

#### Layout System
- Use 12-column CSS Grid or Flexbox with 8px spacing scale
- Implement mobile-first responsive design
- Use consistent padding/margin: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Ensure proper touch targets (minimum 44x44px)

### 4. Interactions and Animations
- Category expand/collapse: Height transition with rotating chevron (300ms ease-in-out)
- Item selection: Scale transform with color change and checkmark (200ms ease-out)
- Floating panel slide: Bottom-to-top slide with fade (400ms ease-in-out)
- Image loading: Fade-in with subtle scale (500ms ease-in-out)
- Button interactions: Scale transform on press with ripple effect (150ms ease-out)
- Respect user's reduced motion preferences

### 5. Accessibility Implementation
- Implement full keyboard navigation with logical tab order
- Add proper ARIA labels, roles, and live regions
- Ensure 4.5:1 color contrast for normal text, 3:1 for large text
- Add visible focus indicators with 2px minimum outline
- Include alt text for all images with descriptive equipment information
- Implement proper heading hierarchy without skipping levels
- Add explicit labels for all form inputs

### 6. Performance Optimizations
- Implement lazy loading for all equipment images
- Use React.memo for expensive components
- Implement debounced search and filter operations
- Use code splitting for components loaded on demand
- Optimize bundle size through tree shaking
- Use CSS animations over JavaScript where possible

### 7. Data Structure and State Management
```typescript
// Equipment Item Interface
interface EquipmentItem {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  category: string;
  subcategory: string;
  dailyRate: number;
  weeklyRate: number;
  images: string[];
  specifications: Record<string, string>;
  availability: {
    status: 'available' | 'rented' | 'maintenance' | 'unavailable';
    nextAvailable?: Date;
  };
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  compatibility: string[];
}

// Selected Item Interface
interface SelectedItem {
  equipment: EquipmentItem;
  quantity: number;
  rentalPeriod: 'daily' | 'weekly';
  startDate: Date;
  endDate: Date;
}
```

## Code Examples and Constraints

### Example Equipment Card Component Structure
```jsx
<EquipmentCard
  equipment={cameraItem}
  isSelected={selectedItems.some(item => item.equipment.id === cameraItem.id)}
  onSelect={() => addToSelection(cameraItem)}
  onQuickAdd={(quantity) => quickAddToSelection(cameraItem, quantity)}
/>
```

### API Integration Guidelines
- Use the existing WordPress AJAX endpoints for form submissions
- Maintain compatibility with existing PHP backend structure
- Use localStorage for session persistence and state recovery
- Implement optimistic UI updates with error handling

### What NOT to Do
- Do NOT modify the existing WordPress backend or database structure
- Do NOT use jQuery - use React hooks and modern patterns
- Do NOT create a completely separate application - integrate with existing WordPress plugin
- Do NOT ignore mobile performance - optimize for on-set use
- Do NOT skip accessibility features - WCAG 2.1 AA compliance is required

## Strict Scope

### Files to Create/Modify
- `src/components/EquipmentCard.tsx` - Individual equipment display
- `src/components/CategoryAccordion.tsx` - Department category navigation
- `src/components/FloatingRentalCart.tsx` - Shopping cart panel
- `src/components/AdvancedSearch.tsx` - Search and filter interface
- `src/components/EquipmentDetailModal.tsx` - Detailed equipment view
- `src/contexts/SelectionContext.tsx` - Global selection state management
- `src/utils/equipmentUtils.ts` - Equipment-related utility functions
- `src/styles/theme.css` - Tailwind theme customization

### Files to Leave Untouched
- Do NOT modify any PHP backend files
- Do NOT alter the existing WordPress plugin structure
- Do NOT change the database schema or data models
- Do NOT modify existing CSS files outside the new component structure

## Mobile-First Approach

### Mobile Layout (320px-767px)
- Single column layout for equipment grid
- Bottom navigation bar for main actions
- Slide-up panels for filters and cart
- Touch-friendly gesture support
- Optimized for one-handed use on set

### Tablet Layout (768px-1023px)
- Two-column layout for equipment browsing
- Side navigation for categories
- Larger touch targets and improved spacing
- Optimized for tablet use during production meetings

### Desktop Layout (1024px+)
- Multi-column grid with comprehensive information
- Hover states and advanced filtering
- Keyboard shortcuts and professional workflow features
- Optimized for detailed equipment comparison and selection
```

## Prompt Structure Explanation

This prompt follows the four-part structured framework for AI code generation:

1. **High-Level Goal**: Clear objective of creating a professional equipment rental UI for Hollywood productions
2. **Detailed Instructions**: Step-by-step breakdown of components, styling, and functionality
3. **Code Examples & Constraints**: Specific interfaces, patterns, and boundaries for the AI to follow
4. **Strict Scope**: Clear definition of what to build and what to avoid modifying

The prompt emphasizes:
- **Professional context** - This is for high-value film production equipment
- **Technical specifications** - Crews need detailed specs for decision-making
- **Mobile optimization** - Critical for on-set use during production
- **Accessibility compliance** - WCAG 2.1 AA standards are non-negotiable
- **Performance** - Fast loading and smooth interactions for professional use

**Important Note**: All AI-generated code will require careful human review, testing, and refinement to ensure it meets production standards and integrates properly with the existing WordPress backend system.