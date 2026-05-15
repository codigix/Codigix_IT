# Bug Investigation - Reviews and Theme Improvements

## Bug Summary
The current implementation of reviews/testimonials uses hardcoded values for the Google rating and fallback data for testimonials. There is no real-time integration with Google Reviews. Additionally, the color combinations, particularly in light mode, need improvement for better aesthetics and usability.

## Root Cause Analysis
1. **Google Rating**: The rating of 4.8 and review count of 80+ are hardcoded in `TestimonialSection.jsx`.
2. **Review Management**: While an `EntityManager` exists for testimonials, there is no distinction between manual reviews and external ones, nor is there a mechanism to sync or display real Google reviews.
3. **Theme Styling**: The light mode theme variables in `src/index.css` use a high-contrast but somewhat dated purple/light-blue palette that may not align with modern UI standards.

## Affected Components
- `src/components/TestimonialSection.jsx`: Displays hardcoded ratings and testimonials.
- `src/pages/admin/entities/TestimonialsAdmin.jsx`: Manages manual testimonials.
- `backend/controllers/entityController.js`: Handles backend logic for all entities including testimonials.
- `src/index.css`: Contains theme variables for light and dark modes.
- `tailwind.config.js`: Contains color definitions.

## Proposed Solution

### 1. Real Google Review Rating
- **Backend Integration**: Create a new controller and route (`/api/google-reviews`) to fetch the overall rating and review count using the Google Places API.
- **Caching**: Store the fetched data in the database or a local cache to minimize API calls and handle API key limits.
- **Frontend Update**: Modify `TestimonialSection.jsx` to fetch this real-time data instead of using hardcoded values.

### 2. Managing Admin Reviews
- **Source Differentiation**: Add a `source` field (e.g., 'google', 'manual') to the `testimonials` table.
- **Admin UI**: Update the `TestimonialsAdmin.jsx` to allow admins to manage all reviews, including toggling which ones are displayed on the frontend.
- **Sync Mechanism**: (Optional) Add a button in the admin panel to manually trigger a sync with Google Reviews.

### 3. Color Combination Improvements
- **Light Mode Refinement**: 
    - Update `--tj-color-theme-bg` to a cleaner white/grey (e.g., `#F9FAFB`).
    - Adjust `--tj-color-theme-primary` for better contrast in light mode.
    - Improve text contrast for body and heading colors.
- **Dark Mode Polish**: Ensure consistent usage of the primary color and improve shadow/border definitions for better depth.
- **Implementation**: Update `src/index.css` and `tailwind.config.js` with the new color palette.

## Questions for Clarification
1. Do you have a Google Places API Key and the Place ID for your business?
2. Should manual reviews be displayed alongside Google reviews in the same slider?
3. Are there specific areas in light mode that you find particularly problematic?
