# ComicVerse Hub - Testing Guide

## Manual Testing Checklist

Use this checklist to verify all functionality before demo or production deployment.

---

## 🧪 Test Environment Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Local server running (see README.md)
- Clear browser cache and localStorage before starting

### Clear State
```javascript
// Open browser DevTools (F12) and run:
localStorage.clear();
location.reload();
```

---

## ✅ Test Cases

### 1. Homepage Tests

#### 1.1 Hero Carousel
- [ ] **Auto-advance**: Carousel automatically advances every 5 seconds
- [ ] **Pause on hover**: Hovering stops auto-advance
- [ ] **Next button**: Clicking next arrow advances to next slide
- [ ] **Previous button**: Clicking previous arrow goes to previous slide
- [ ] **Indicators**: Clicking dots navigates to corresponding slide
- [ ] **Keyboard navigation**: Arrow keys (← →) change slides
- [ ] **Active indicator**: Current slide indicator is highlighted
- [ ] **Smooth transition**: Slides transition smoothly without jerky movement
- [ ] **Featured comics**: 4 featured comics display correctly
- [ ] **View Details button**: Clicking navigates to correct comic detail page

**Expected Result**: Carousel operates smoothly with all controls functioning.

#### 1.2 New Releases Section
- [ ] **4 comics displayed**: Shows exactly 4 comics
- [ ] **Sorted by date**: Comics appear in order of newest release date
- [ ] **Card layout**: Cards display cover, title, publisher, genre, price
- [ ] **Clickable cards**: Clicking any card navigates to detail page
- [ ] **Hover effect**: Cards lift on hover

**Expected Result**: New Releases section shows 4 most recent comics.

#### 1.3 Popular Series Section
- [ ] **4 comics displayed**: Shows exactly 4 comics
- [ ] **Card functionality**: Same as New Releases

**Expected Result**: Popular Series section displays correctly.

#### 1.4 Publisher Spotlights
- [ ] **All publishers shown**: Each unique publisher has a card
- [ ] **Comic count**: Displays correct number of comics per publisher
- [ ] **Hover effect**: Cards have border animation on hover

**Expected Result**: Publisher spotlights display all publishers with counts.

#### 1.5 Navigation
- [ ] **Sticky header**: Navigation stays at top when scrolling
- [ ] **Logo link**: Clicking logo returns to homepage
- [ ] **Active link**: Current page link is highlighted
- [ ] **Cart badge**: Shows "0" initially (or hidden)
- [ ] **Mobile menu**: Hamburger menu works on mobile/small screens

**Expected Result**: Navigation is functional and responsive.

---

### 2. Browse Page Tests

#### 2.1 Initial Load
- [ ] **All 12 comics displayed**: Grid shows all comics from data
- [ ] **Grid layout**: Responsive grid (1-4 columns based on width)
- [ ] **Results count**: Shows "Showing 12 comics"
- [ ] **Filters populated**: Publisher and Genre dropdowns have all options

**Expected Result**: Browse page loads with all comics visible.

#### 2.2 Search Functionality
- [ ] **Debounced search**: Typing waits 300ms before filtering
- [ ] **Title search**: Searching "Shadow" finds "Shadow Dawn: Rising"
- [ ] **Character search**: Searching "Nova" finds "Stellar Vanguard"
- [ ] **Creator search**: Searching creator names finds comics
- [ ] **Case insensitive**: "NEON" and "neon" both work
- [ ] **Results update**: Grid updates to show only matching comics
- [ ] **Count updates**: Results count reflects filtered results
- [ ] **No results**: Searching nonsense shows "No Comics Found" message

**Expected Result**: Search filters comics across multiple fields with debounce.

#### 2.3 Publisher Filter
- [ ] **Select Marvel**: Shows only Marvel comics
- [ ] **Select DC**: Shows only DC comics
- [ ] **Select Image**: Shows only Image comics
- [ ] **Reset filter**: Selecting "All Publishers" shows all comics
- [ ] **Combines with search**: Filters work together

**Expected Result**: Publisher filter correctly filters comics.

#### 2.4 Genre Filter
- [ ] **Select Superhero**: Shows only Superhero comics
- [ ] **Select Sci-Fi**: Shows only Sci-Fi comics
- [ ] **Select Horror**: Shows only Horror comics
- [ ] **Reset filter**: Selecting "All Genres" shows all comics
- [ ] **Combines with filters**: Works with publisher and search

**Expected Result**: Genre filter correctly filters comics.

#### 2.5 Sort Functionality
- [ ] **Title (A-Z)**: Comics sorted alphabetically
- [ ] **Title (Z-A)**: Comics sorted reverse alphabetically
- [ ] **Price (Low to High)**: Cheapest comics first
- [ ] **Price (High to Low)**: Most expensive comics first
- [ ] **Release Date (Newest)**: Most recent releases first
- [ ] **Release Date (Oldest)**: Oldest releases first
- [ ] **Maintains filters**: Sorting doesn't reset filters

**Expected Result**: All sort options work correctly.

#### 2.6 Combined Filters
- [ ] **Search + Publisher + Genre**: All filters work together
- [ ] **Filter then sort**: Sorting applies to filtered results
- [ ] **Clear one filter**: Other filters remain active

**Expected Result**: Multiple filters can be combined.

---

### 3. Comic Detail Page Tests

#### 3.1 Navigation
- [ ] **Direct URL**: Visiting `comic-detail.html?id=1` loads comic #1
- [ ] **From browse**: Clicking card on browse page loads correct comic
- [ ] **From homepage**: Clicking card on homepage loads correct comic
- [ ] **Invalid ID**: Visiting `comic-detail.html?id=999` redirects to browse
- [ ] **No ID**: Visiting `comic-detail.html` redirects to browse
- [ ] **Back button**: Clicking back returns to previous page

**Expected Result**: Detail page loads correctly with valid IDs.

#### 3.2 Display
- [ ] **Cover image**: Large cover image displays
- [ ] **Zoom on hover**: Cover scales up on hover
- [ ] **Title**: Comic title displays prominently
- [ ] **Metadata**: Publisher, genre, release date all show
- [ ] **Synopsis**: Full synopsis text displays
- [ ] **Characters**: Main characters list shows
- [ ] **Creators**: Writer, artist, colorist all display
- [ ] **Price**: Price displays correctly formatted

**Expected Result**: All comic information displays correctly.

#### 3.3 Add to Cart
- [ ] **Button visible**: "Add to Cart" button is present
- [ ] **Click button**: Clicking shows success modal
- [ ] **Modal content**: Modal says "Comic added to cart successfully!"
- [ ] **Modal buttons**: "Continue Shopping" and "View Cart" buttons work
- [ ] **Close modal**: X button and overlay click close modal
- [ ] **Escape key**: Pressing Escape closes modal
- [ ] **Cart badge updates**: Badge increments to show 1 item

**Expected Result**: Adding to cart works with custom modal.

#### 3.4 Multiple Adds
- [ ] **Add same comic twice**: Quantity increments to 2 (not duplicate entry)
- [ ] **Badge updates**: Badge shows total quantity

**Expected Result**: Adding same comic increases quantity.

---

### 4. Shopping Cart Tests

#### 4.1 Empty Cart
- [ ] **Initial state**: Empty cart shows "Your Cart is Empty" message
- [ ] **Empty icon**: Shopping cart icon displays
- [ ] **Browse button**: "Browse Comics" button links to browse page
- [ ] **Cart summary hidden**: Order summary not visible when empty

**Expected Result**: Empty cart displays helpful message.

#### 4.2 Cart with Items
- [ ] **Items display**: All cart items show with thumbnails
- [ ] **Titles**: Comic titles display correctly
- [ ] **Publishers**: Publishers display
- [ ] **Prices**: Individual prices show
- [ ] **Quantities**: Current quantities display
- [ ] **Item totals**: Line item totals calculate correctly (price × qty)

**Expected Result**: Cart items display with all information.

#### 4.3 Quantity Controls
- [ ] **Increment (+)**: Clicking + increases quantity
- [ ] **Decrement (-)**: Clicking - decreases quantity
- [ ] **Quantity display updates**: Number updates immediately
- [ ] **Line total updates**: Item total recalculates
- [ ] **Subtotal updates**: Order subtotal recalculates
- [ ] **Tax updates**: Tax (5%) recalculates
- [ ] **Total updates**: Final total recalculates
- [ ] **Decrement to 0**: Decreasing to 0 removes item
- [ ] **Toast notification**: Shows "Item removed from cart"

**Expected Result**: Quantity changes update all totals in real-time.

#### 4.4 Remove Item
- [ ] **Remove button**: Clicking remove deletes item
- [ ] **Confirmation**: No confirmation dialog (immediate removal)
- [ ] **Toast notification**: Shows "Item removed from cart"
- [ ] **Cart updates**: Item disappears from cart
- [ ] **Totals update**: Subtotal, tax, total recalculate
- [ ] **Last item removed**: Shows empty cart state

**Expected Result**: Items can be removed with feedback.

#### 4.5 Calculations
- [ ] **Subtotal**: Sum of all (price × quantity)
- [ ] **Tax**: Exactly 5% of subtotal
- [ ] **Total**: Subtotal + tax
- [ ] **Formatting**: All amounts formatted to 2 decimals

**Test Case**: Add 3 comics:
- Comic A: $9.99 × 2 = $19.98
- Comic B: $14.99 × 1 = $14.99
- Comic C: $12.99 × 3 = $38.97
- **Subtotal**: $73.94
- **Tax (5%)**: $3.70
- **Total**: $77.64

**Expected Result**: All calculations are accurate.

#### 4.6 Checkout
- [ ] **Button enabled**: Checkout button is clickable with items
- [ ] **Button disabled**: Checkout button disabled when empty
- [ ] **Click checkout**: Shows checkout modal
- [ ] **Modal content**: Displays success message and order total
- [ ] **Cart cleared**: localStorage cart is cleared
- [ ] **Badge resets**: Cart badge shows 0
- [ ] **Close modal**: Redirects to browse page

**Expected Result**: Checkout clears cart and shows confirmation.

#### 4.7 Persistence
- [ ] **Add items**: Add 3 different comics to cart
- [ ] **Refresh page**: Press F5 or reload
- [ ] **Cart persists**: All items still in cart with quantities
- [ ] **Totals correct**: Calculations remain accurate
- [ ] **Close browser**: Close and reopen browser (if testing locally)
- [ ] **Cart still persists**: Items remain (until checkout or manual clear)

**Expected Result**: Cart survives page refreshes.

---

### 5. Cross-Page Tests

#### 5.1 Cart Badge Consistency
- [ ] **Homepage**: Badge shows correct count
- [ ] **Browse page**: Badge shows correct count
- [ ] **Detail page**: Badge shows correct count
- [ ] **Cart page**: Badge shows correct count
- [ ] **Add from detail**: Badge updates on all pages
- [ ] **Remove from cart**: Badge updates immediately

**Expected Result**: Cart badge is consistent across all pages.

#### 5.2 Navigation Flow
- [ ] **Home → Browse → Detail → Cart**: Full user flow works
- [ ] **Browser back button**: Returns to previous page correctly
- [ ] **Logo from any page**: Returns to homepage
- [ ] **Active link highlights**: Current page always highlighted

**Expected Result**: Navigation is intuitive and functional.

---

### 6. Responsive Design Tests

#### 6.1 Desktop (1920px)
- [ ] **Full layout**: All content visible without scrolling (hero)
- [ ] **Grid**: 4 columns for comic cards
- [ ] **Navigation**: Horizontal menu
- [ ] **Carousel**: Full-width with side images

#### 6.2 Tablet (768px)
- [ ] **Grid**: 2-3 columns for comic cards
- [ ] **Navigation**: Still horizontal or hamburger
- [ ] **Carousel**: Stacked layout
- [ ] **Filters**: Stacked vertically

#### 6.3 Mobile (375px)
- [ ] **Grid**: 2 columns for comic cards
- [ ] **Navigation**: Hamburger menu
- [ ] **Carousel**: Single column, smaller images
- [ ] **Filters**: Full-width dropdowns
- [ ] **Cart items**: Stacked layout
- [ ] **Touch targets**: Buttons are easily tappable

**Expected Result**: Site is fully functional on all screen sizes.

---

### 7. Accessibility Tests

#### 7.1 Keyboard Navigation
- [ ] **Tab order**: Logical tab progression through page
- [ ] **Focus indicators**: Visible outline on focused elements
- [ ] **Skip to content**: Can navigate without mouse
- [ ] **Carousel arrows**: Accessible via Tab and Enter
- [ ] **Carousel keyboard**: Arrow keys work
- [ ] **Modal focus trap**: Tab cycles within open modal
- [ ] **Close modal with Escape**: Escape key closes modals

**Expected Result**: Entire site navigable with keyboard only.

#### 7.2 Screen Reader
- [ ] **Headings**: Logical heading hierarchy (H1 → H2 → H3)
- [ ] **Landmarks**: nav, main, footer tags recognized
- [ ] **ARIA labels**: Cart badge, buttons have aria-labels
- [ ] **Alt text**: All images have descriptive alt attributes
- [ ] **Link text**: Links describe destination

**Expected Result**: Screen reader announces all content correctly.

#### 7.3 Zoom & Text Resize
- [ ] **200% zoom**: Page remains usable at 200% zoom
- [ ] **No horizontal scroll**: Content doesn't require side scrolling
- [ ] **Text readable**: All text remains legible

**Expected Result**: Site works at high zoom levels.

---

### 8. Performance Tests

#### 8.1 Load Time
- [ ] **Initial load**: Homepage loads in < 2 seconds
- [ ] **Navigation**: Page transitions feel instant
- [ ] **Search debounce**: No lag when typing fast

#### 8.2 Smooth Animations
- [ ] **Carousel transition**: Smooth, no stuttering
- [ ] **Card hover**: Lift animation is smooth
- [ ] **Modal open/close**: Fade animation is smooth

**Expected Result**: Site feels fast and responsive.

---

### 9. Edge Cases

#### 9.1 LocalStorage
- [ ] **Disabled storage**: Site works with localStorage disabled (cart doesn't persist)
- [ ] **Full storage**: Site handles storage quota errors gracefully

#### 9.2 Long Content
- [ ] **Long comic title**: Titles truncate or wrap appropriately
- [ ] **Long synopsis**: Text doesn't break layout
- [ ] **Many items in cart**: Cart remains scrollable and usable

#### 9.3 No JavaScript
- [ ] **Graceful degradation**: Basic HTML content visible
- [ ] **Links work**: Navigation links still functional

**Expected Result**: Site handles edge cases gracefully.

---

## 📊 Test Summary Template

```
Test Date: _______________
Tested By: _______________
Browser: _________________
OS: ______________________

Total Tests: ____
Passed: ____
Failed: ____
N/A: ____

Critical Issues:
- 

Minor Issues:
- 

Notes:
- 
```

---

## 🐛 Bug Reporting

If you find issues, report them with:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser and OS**
5. **Screenshot/video** (if applicable)

---

## ✅ Pre-Demo Checklist

Before presenting:

- [ ] Clear localStorage
- [ ] Test on demo device/browser
- [ ] Have 2-3 comics ready to add to cart
- [ ] Verify all links work
- [ ] Check responsive layout
- [ ] Test keyboard navigation
- [ ] Close unnecessary browser tabs
- [ ] Disable browser extensions (if they interfere)

---

<div align="center">
  <p><strong>Happy Testing! 🧪</strong></p>
</div>
