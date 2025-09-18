# Art Department UI Revamp UI/UX Specification

This document defines the user experience goals, information architecture, user flows, and visual design specifications for the Art Department UI Revamp's user interface. It serves as the foundation for visual design and frontend development, ensuring a cohesive and user-centered experience.

## Overall UX Goals & Principles

### Target User Personas

**Production Department Heads:**
- Directors of Photography, Sound Mixers, Gaffers, Key Grips
- Need to rent high-end camera, audio, lighting, and grip equipment
- Working with million-dollar budgets and tight production schedules
- Often comparing specs and compatibility of professional gear

**Production Tech Crew:**
- Camera operators, sound technicians, lighting techs, grips
- Need detailed specifications and compatibility information
- Often request specific models and brands they're trained on
- Browse between takes or during setup on mobile devices

**Production Manager/Coordinator:**
- Manages equipment budgets and logistics across departments
- Needs availability tracking and scheduling coordination
- Responsible for cost optimization and inventory management

**Rental House Staff:**
- Equipment managers and rental coordinators
- Need efficient inventory management and booking workflow
- Track maintenance schedules and equipment condition

### Usability Goals

- **Ease of learning:** New crew members can find and book equipment within 3 minutes
- **Spec-focused:** Quick access to detailed technical specifications and compatibility charts
- **Efficiency of use:** Department heads can build complete equipment packages quickly
- **Error prevention:** Clear availability status, maintenance schedules, and booking conflicts
- **Mobile optimization:** Touch-friendly for on-set use during shoots and setup
- **Professional workflow:** Designed for high-budget production rental needs

### Design Principles

1. **Department-organized** - Structured by production departments (Camera, Audio, Lighting, Grip, Electric)
2. **Spec-driven** - Technical specifications prominently displayed for professional decision-making
3. **Compatibility-focused** - Clear indication of equipment compatibility and accessory requirements
4. **Schedule-aware** - Production calendar integration with maintenance scheduling
5. **Professional workflow** - Designed for high-value equipment rental in the film industry
6. **Consistent visual language** - Maintain the established dark theme with accent colors
7. **Performance optimized** - Fast loading for on-set use in various connectivity conditions

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-09-19 | 1.0 | Initial UI/UX specification for Art Department UI Revamp | Sally (UX Expert) |

## Information Architecture (IA)

### Site Map / Screen Inventory

```
graph TD
    A[Art Department Landing] --> B[Categories View]
    A --> C[Search Results]
    A --> D[Selected Items Panel]

    B --> B1[Category Grid]
    B --> B2[Item Detail View]
    B --> B3[Quick Add Functionality]

    C --> C1[Search Filters]
    C --> C2[Filtered Results Grid]

    D --> D1[Selection Summary]
    D --> D2[Quantity Adjustments]
    D --> D3[Booking Form]
    D --> D4[Confirmation Screen]

    E[User Account] --> E1[Order History]
    E --> E2[Wishlist]
```

### Navigation Structure

**Primary Navigation:**
- Department-based categories (Camera, Audio, Lighting, Grip, Electric, Crane/Jib)
- Equipment specifications and compatibility charts
- Production schedule calendar with availability checking
- Floating action button for rental cart summary
- Advanced search with technical specifications filters

**Secondary Navigation:**
- Breadcrumb navigation showing department > category > sub-category hierarchy
- Quick filters (available now, by manufacturer, price range, specifications)
- Sort options (name, daily/weekly rate, popularity, condition rating)
- Equipment packages and kit bundles for common production setups
- New arrivals and recently serviced equipment

**Breadcrumb Strategy:**
- Shows Home > Category > Sub-category hierarchy
- Clickable to navigate back to parent categories
- Collapses on mobile to save space

## User Flows

### Browse and Select Items Flow

**User Goal:** Browse categories and select items for booking

**Entry Points:** Landing page, category navigation, search results

**Success Criteria:** User can navigate through categories, view items, and add them to their selection with quantity management

#### Flow Diagram

```
graph TD
    A[Landing Page] --> B[Select Category]
    B --> C[View Category Items]
    C --> D[Click Item for Details]
    D --> E[Add Quantity]
    E --> F[Add to Selection]
    F --> G[Continue Shopping or Checkout]
    G --> H{Decision}
    H -->|Continue| B
    H -->|Checkout| I[Review Selection]
    I --> J[Submit Booking Request]
```

#### Edge Cases & Error Handling:
- Item unavailable during selection - show alternative suggestions
- Network error during image load - retry mechanism with fallback
- Invalid quantity input - validation with helpful error message
- Browser navigation back - preserve selection state

#### Notes: Maintain selection persistence across navigation, use localStorage for session recovery

### Search and Filter Items Flow

**User Goal:** Find specific items using search functionality

**Entry Points:** Search bar on any page, search results page

**Success Criteria:** User can search, filter, and find relevant items efficiently

#### Flow Diagram

```
graph TD
    A[Search Input] --> B[Search Results]
    B --> C[Apply Filters]
    C --> D[Filtered Results]
    D --> E[Select Item]
    E --> F[Add to Selection]
```

#### Edge Cases & Error Handling:
- No results found - show helpful suggestions and related items
- Search timeout - provide feedback and retry option
- Filter conflicts - resolve with smart defaults

### Booking Request Flow

**User Goal:** Submit a booking request for selected items

**Entry Points:** Selected items panel, checkout button

**Success Criteria:** User completes booking form and receives confirmation

#### Flow Diagram

```
graph TD
    A[Review Selection] --> B[Edit Booking Form]
    B --> C[Validate Form]
    C --> D[Submit Request]
    D --> E[Show Confirmation]
    E --> F[Send Email Notifications]
```

#### Edge Cases & Error Handling:
- Form validation errors - clear inline error messages
- Submission failure - retry with saved data
- Duplicate submission - prevent with unique tokens

## Wireframes & Mockups

**Primary Design Files:** Design mockups will be created in Figma, following the established dark theme with accent colors from the screenshots provided

### Key Screen Layouts

#### Landing/Browse Screen
**Purpose:** Main browsing interface with category navigation

**Key Elements:**
- Dark header with logo and search functionality
- Category accordion panels (collapsible/expandable)
- Image grid layout with hover effects
- Floating action button for selected items
- Mobile-first responsive design

**Interaction Notes:** Smooth expand/collapse animations for categories, lazy loading for images, touch-friendly gestures on mobile

**Design File Reference:** [Figma link to be provided]

#### Item Detail View
**Purpose:** Detailed view of individual items with selection options

**Key Elements:**
- Large hero image with gallery view
- Item specifications and description
- Quantity selector with +/- buttons
- Availability status and pricing
- "Add to Selection" CTA button

**Interaction Notes:** Image zoom functionality, real-time quantity updates, availability calendar integration

**Design File Reference:** [Figma link to be provided]

#### Selected Items Panel
**Purpose:** Floating panel showing current selections and checkout

**Key Elements:**
- Collapsible floating container
- List of selected items with quantities
- Remove individual items option
- "Clear All" functionality
- "Proceed to Booking" CTA

**Interaction Notes:** Smooth slide animations, persistent positioning, real-time updates when items added/removed

**Design File Reference:** [Figma link to be provided]

## Component Library / Design System

**Design System Approach:** Create a modern component library based on the existing dark theme, with reusable React components that maintain visual consistency

### Core Components

#### Category Accordion
**Purpose:** Collapsible category sections for organized browsing

**Variants:** Default, Active, Disabled states

**States:** Collapsed, Expanded, Loading, Empty

**Usage Guidelines:** Use for organizing items into logical groups, maintain consistent spacing and typography

#### Image Grid Card
**Purpose:** Display item thumbnails with selection capabilities

**Variants:** Thumbnail, Large, Featured

**States:** Default, Selected, Hover, Disabled

**Usage Guidelines:** Lazy load images, maintain aspect ratios, show selection status clearly

#### Quantity Selector
**Purpose:** Adjust item quantities for booking

**Variants:** Inline, Modal, Inline with max limit

**States:** Default, Hover, Disabled, Error (over max)

**Usage Guidelines:** Clear +/- buttons, validate against availability, show real-time updates

#### Floating Action Button
**Purpose:** Persistent access to selected items

**Variants:** Default, With Badge, Expanded

**States:** Default, Hover, Active, Disabled

**Usage Guidelines:** Sticky positioning, show item count badge, smooth animations

## Branding & Style Guide

**Brand Guidelines:** Based on the existing Stratosphere Sound brand identity shown in screenshots

### Visual Identity

**Brand Guidelines:** [Link to brand guidelines - to be provided]

### Color Palette

| Color Type | Hex Code | Usage |
|------------|----------|--------|
| Primary | #FF6B35 | Primary buttons, active states, highlights |
| Secondary | #2D3748 | Backgrounds, cards, secondary elements |
| Accent | #FFD93D | Warning states, attention elements |
| Success | #48BB78 | Positive feedback, confirmations |
| Warning | #F6AD55 | Cautions, important notices |
| Error | #F56565 | Errors, destructive actions |
| Neutral | #718096 | Text, borders, subtle elements |
| Dark Background | #1A202C | Main background, header |
| Light Text | #F7FAFC | Primary text, labels |

### Typography

#### Font Families
- **Primary:** Inter or system sans-serif
- **Secondary:** Open Sans or system sans-serif
- **Monospace:** SF Mono or system monospace

#### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem | 700 | 1.2 |
| H2 | 2rem | 600 | 1.3 |
| H3 | 1.5rem | 600 | 1.4 |
| Body | 1rem | 400 | 1.5 |
| Small | 0.875rem | 400 | 1.4 |

### Iconography

**Icon Library:** Feather Icons or Material Design Icons

**Usage Guidelines:** Use consistent stroke weight, maintain proper spacing, ensure accessibility with proper alt text

### Spacing & Layout

**Grid System:** 12-column CSS Grid or Flexbox with 8px base unit

**Spacing Scale:** 4px, 8px, 16px, 24px, 32px, 48px, 64px

## Accessibility Requirements

### Compliance Target

**Standard:** WCAG 2.1 AA compliance

### Key Requirements

**Visual:**
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: Visible focus rings with 2px minimum outline
- Text sizing: Responsive text that scales up to 200% without breaking layout

**Interaction:**
- Keyboard navigation: Full keyboard access with logical tab order
- Screen reader support: Proper ARIA labels, roles, and live regions
- Touch targets: Minimum 44x44 pixels for interactive elements

**Content:**
- Alternative text: Descriptive alt text for all images
- Heading structure: Proper heading hierarchy without skipping levels
- Form labels: Explicit labels for all form inputs

### Testing Strategy

- Automated testing with axe-core and Lighthouse
- Manual keyboard navigation testing
- Screen reader testing with NVDA and VoiceOver
- Color contrast validation with dedicated tools

## Responsiveness Strategy

### Breakpoints

| Breakpoint | Min Width | Max Width | Target Devices |
|------------|-----------|-----------|----------------|
| Mobile | 320px | 767px | Smartphones, small devices |
| Tablet | 768px | 1023px | Tablets, large phones |
| Desktop | 1024px | 1439px | Laptops, desktop computers |
| Wide | 1440px | - | Large desktop monitors, 4K displays |

### Adaptation Patterns

**Layout Changes:**
- Mobile: Single column layout, bottom navigation, swipe gestures
- Tablet: Two-column layout for categories, side-by-side views
- Desktop: Multi-column grid, floating elements, mouse interactions
- Wide: Expanded grid, larger images,充分利用屏幕空间

**Navigation Changes:**
- Mobile: Bottom navigation bar, hamburger menu for filters
- Tablet: Side navigation, larger touch targets
- Desktop: Top navigation, hover menus, keyboard shortcuts

**Content Priority:**
- Mobile: Essential content only, progressive disclosure
- Tablet: Moderate content with optional details
- Desktop: Full content with inline details and previews

**Interaction Changes:**
- Mobile: Touch gestures, swipe to navigate, long press for context
- Desktop: Click interactions, hover states, drag and drop

## Animation & Micro-interactions

### Motion Principles

Smooth, purposeful animations that enhance user experience without being distracting. Animations should:
- Provide clear feedback for user actions
- Guide attention to important changes
- Maintain performance with 60fps target
- Respect user's reduced motion preferences

### Key Animations

- **Category expand/collapse:** Smooth height transition with rotating chevron icon (Duration: 300ms, Easing: ease-in-out)
- **Item selection:** Scale transform with color change and checkmark animation (Duration: 200ms, Easing: ease-out)
- **Floating panel slide:** Smooth bottom-to-top slide with fade effect (Duration: 400ms, Easing: ease-in-out)
- **Image loading:** Fade-in effect with subtle scale transition (Duration: 500ms, Easing: ease-in-out)
- **Button interactions:** Scale transform on press with ripple effect (Duration: 150ms, Easing: ease-out)

## Performance Considerations

### Performance Goals

- **Page Load:** <3 seconds for initial contentful paint
- **Interaction Response:** <200ms for all user interactions
- **Animation FPS:** 60fps for smooth animations

### Design Strategies

- Image optimization with lazy loading and WebP format
- Code splitting for components loaded on demand
- Minimal DOM manipulation with efficient React state management
- CSS animations over JavaScript animations where possible
- Debounced search and filter operations
- Optimized bundle size through tree shaking

## Next Steps

### Immediate Actions

1. Review this specification with stakeholders for approval
2. Create detailed Figma mockups for key screens
3. Establish component library in React with TypeScript
4. Set up development environment with WordPress integration
5. Implement accessibility testing in the development workflow

### Design Handoff Checklist

- [ ] All user flows documented and approved
- [ ] Component inventory complete with variants and states
- [ ] Accessibility requirements defined and validated
- [ ] Responsive strategy clear with device-specific considerations
- [ ] Brand guidelines incorporated with color palette and typography
- [ ] Performance goals established with optimization strategies
- [ ] Animation specifications documented with timing and easing
- [ ] Handoff documentation prepared for development team