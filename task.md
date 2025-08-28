Project Context:
- Source Project: `icia-arvin-heartbeat`
- Target Project: `client` (Next.js)
- Component: `HeartCollage.tsx`
- Assets: Use images from `public/heart` directory in the target project.

Updated Goals:
- Refactor `HeartCollage.tsx` to remove all text or captions.
- Integrate the component into the Hero Section of `client/pages/index.tsx`.
- Position the collage **between** the following two lines:
  1. "From childhood friends at AISD to forever partners"
  2. "Join us as we celebrate our love story across continents"

Task Breakdown:
1. Analyze Source:
   - Review `icia-arvin-heartbeat` for tech stack, animation libraries (e.g. Framer Motion, CSS keyframes), and component structure.
   - Understand how `HeartCollage.tsx` is styled and animated.

2. Refactor Component:
   - Remove all text content from `HeartCollage.tsx`.
   - Modularize for reuse in the target Next.js setup.
   - Replace hardcoded image paths with dynamic imports from `public/heart`.

3. UI/UX Adaptation:
   - Match the Hero Section’s typography, spacing, and color palette (soft neutrals, serif fonts, romantic tone).
   - Ensure the collage is centered, responsive, and visually balanced.
   - Adjust image size and padding to harmonize with the Hero layout.
   - Apply subtle animation (e.g. fade-in, scale on hover) that complements existing transitions.

4. Hero Section Implementation:
   - In `client/pages/index.tsx`, insert the refactored `HeartCollage` component between the two narrative lines.
   - Ensure layout consistency and performance optimization.
   - Use semantic HTML and accessible markup.

5. Validation:
   - Test across screen sizes and browsers.
   - Confirm animation triggers and image loading behavior.
   - Ensure SEO and accessibility best practices are followed.

Reference:
- Use [Next.js Docs](https://nextjs.org/docs) for routing, public asset handling, and animation best practices.
- Align with the visual and emotional tone of [Incia & Arvin’s Wedding Site](https://arvinwedsincia.com).
