# Technical Specification: Redesign Admin Login Page

## Technical Context
- **Language**: JavaScript (React)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`

## Implementation Approach
The goal is to transform the existing light-themed login page into a dark-themed interface as shown in the provided target image.

### Visual Changes:
1.  **Background**:
    - Change background color to a deep navy/dark blue (e.g., `bg-[#1a1c2e]`).
    - Implement decorative background elements: large diagonal rounded bars and circles using absolute positioning and CSS/Tailwind.
2.  **Login Card**:
    - Use a semi-transparent dark background (e.g., `bg-white/5` or `bg-[#25283d]`) with a subtle backdrop blur.
    - Remove the white background and shadow.
    - Increase border-radius to match the target design.
3.  **Typography**:
    - Change text colors to white or light gray for better contrast on dark backgrounds.
    - Match font sizes and weights from the target design.
4.  **Form Elements**:
    - **Inputs**: Darker background (e.g., `bg-[#2d304e]`), rounded corners, no icons inside the input (as per target image). Labels should be subtle.
    - **Button**: White background with blue text. Add a small icon next to "LOG IN".
    - **Forgot Password**: Move to the bottom of the form, center-aligned, and style as uppercase text.
5.  **Logo**:
    - Center the logo above the login card.

## Source Code Structure Changes
- Modify `src/pages/admin/AdminLogin.jsx` directly.
- No new files are expected.

## Data Model / API / Interface Changes
- No changes to the authentication logic or API calls.

## Verification Approach
- **Manual Verification**: Run the application and navigate to `/admin/login` to visually inspect the changes.
- **Linting**: Run `npm run lint` (if available) to ensure code quality.
- **Cross-browser check**: Ensure the layout remains consistent across different screen sizes (responsive design).
