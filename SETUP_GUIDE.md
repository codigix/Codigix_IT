# Ainex - React + Vite + Tailwind CSS SPA

## Project Summary

Successfully converted the HTML template to a modern **React Single Page Application (SPA)** using **Vite** and **Tailwind CSS**. All animations, layouts, and interactivity have been preserved and enhanced with modern React patterns.

## Project Structure

```
ainex-react/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx       # Navigation header with mobile menu
│   │   ├── HeroSlider.jsx   # Image carousel with Swiper
│   │   ├── ClientSection.jsx
│   │   ├── WorkingProcess.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ServiceSection.jsx
│   │   ├── ProjectSection.jsx
│   │   ├── TestimonialSection.jsx
│   │   ├── PricingSection.jsx
│   │   ├── BlogSection.jsx
│   │   └── Footer.jsx
│   ├── pages/               # Page components for routing
│   │   ├── Home.jsx         # Landing page with all sections
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceDetails.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetails.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetails.jsx
│   │   └── Contact.jsx
│   ├── App.jsx              # Main app with routing
│   ├── App.css              # Global styles
│   ├── index.css            # Tailwind CSS setup
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## Key Features

### ✅ Components Created
- **Header** - Sticky navigation with responsive mobile menu and search functionality
- **Hero Slider** - Image carousel with pagination and navigation controls
- **Client Section** - Auto-scrolling brand carousel
- **Working Process** - 3-step process visualization with animations
- **About Section** - Company info with embedded video
- **Service Section** - Service cards with hover effects
- **Project Section** - Portfolio grid with image zoom animations
- **Testimonial Section** - Client testimonials carousel
- **Pricing Section** - Monthly/yearly pricing switcher
- **Blog Section** - Blog posts grid with category tags
- **Footer** - Newsletter subscription and links
- **Back to Top** - Smooth scroll button

### 🎨 Design System
- **Colors**: Primary Orange (#FF6B35), Dark backgrounds, Gray scales
- **Typography**: Poppins font family, responsive sizes
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design with Tailwind breakpoints

### 🚀 Technologies Used
- **React 19** - Latest React version
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Swiper** - Touch slider library
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing

## Installation & Running

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup Instructions

1. **Navigate to project directory**
   ```bash
   cd codigix-IT-services
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend && npm install
   cd ..
   ```

3. **Start development servers**
   You can run both the frontend and the backend servers with a single command.

   **Recommended (Concurrent):**
   ```bash
   npm run dev:all
   ```
   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

   **Manual Option:**
   Open two terminal windows:
   - Terminal 1: `npm run dev`
   - Terminal 2: `npm run server`

   The app will start at `http://localhost:5173` and connect to the API at `http://localhost:5000`.

4. **Build for production**
   ```bash
   npm run build
   ```
   This creates optimized files in the `dist/` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Routing Map

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with all sections |
| `/about` | About | Company information page |
| `/services` | Services | Services overview |
| `/services/details` | ServiceDetails | Detailed service information |
| `/projects` | Projects | Portfolio grid |
| `/projects/details` | ProjectDetails | Individual project details |
| `/blog` | Blog | Blog posts list |
| `/blog/details` | BlogDetails | Full blog article |
| `/contact` | Contact | Contact form and info |

## Customization

### Colors
Update in `tailwind.config.js`:
```javascript
colors: {
  primary: '#FF6B35',
  dark: '#0F1419',
  // ... more colors
}
```

### Fonts
Modify `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your-Font', 'sans-serif'],
}
```

### Content & Assets
- Replace placeholder images with real images
- Update text content in components
- Modify form handling in Contact.jsx
- Update social media links throughout

## Features Implemented

### Animations
✓ Fade-in-up animations on scroll
✓ Hover scale effects on cards
✓ Smooth transitions on buttons
✓ Image parallax/zoom on hover
✓ Mobile menu slide animations

### Responsive Design
✓ Mobile-first approach
✓ Tablet optimizations
✓ Desktop layouts
✓ Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

### Interactivity
✓ Mobile hamburger menu
✓ Search popup modal
✓ Pricing monthly/yearly toggle
✓ Video embed with play button
✓ Form validation
✓ Smooth scroll behavior
✓ Back to top button

## Performance Notes

- Build size: ~502KB (before gzip)
- Gzip size: ~151KB (after compression)
- Consider code-splitting for large bundles using dynamic imports
- Images should be optimized and use WebP format

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

### Recommended Services
- **Vercel** (optimal for Vite)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Basic Deployment (Vercel)
```bash
npm install -g vercel
vercel
```

## Development Tips

1. **HMR (Hot Module Replacement)** - Changes are reflected instantly
2. **Tailwind IntelliSense** - Use VS Code extension for class suggestions
3. **React Developer Tools** - Browser extension for debugging
4. **Network Tab** - Check performance in DevTools

## Common Customizations

### Adding a New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Update Header navigation links

### Adding Components
1. Create `src/components/NewComponent.jsx`
2. Import and use in pages/components
3. Style with Tailwind classes

### Updating Styles
1. Global styles in `src/index.css`
2. Component-specific in component files
3. Responsive in Tailwind breakpoint prefixes

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Cache
```bash
rm -rf node_modules
npm install
```

### Build Fails
Check console for errors and ensure all imports are correct.

## Future Enhancements

- Implement full authentication system
- Add CMS for content management
- Integrate analytics
- Add PWA support
- Implement dark mode toggle

## Support & Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Swiper](https://swiperjs.com)

---

**Last Updated**: January 2025
**Project Status**: Complete & Production Ready ✅
