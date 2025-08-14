# Wedding Story Images

This directory contains static images for the "Our Story" section of the homepage.

## Story Images

- **aisd-memories.jpg** - AISD childhood memories (Where It All Began)
- **university-years.jpg** - University years across continents (Love Across Continents)
- **tuscany-proposal.jpg** - The proposal in Tuscany (The Proposal in Tuscany)
- **engagement-celebration.jpg** - Building their future together (Building Our Future Together)
- **recent-together.jpg** - Recent photo of the couple (Available for future use)

## Usage

These images are served directly from the public directory using Next.js static file serving:

```jsx
<Image 
  src="/images/story/aisd-memories.jpg" 
  alt="AISD memories of Incia & Arvin"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Source

Original images are stored in `client/image/` directory and were copied to this location following Next.js best practices for serving static files.
