# 📰 Glimpse Feed Explorer

A dynamic feed explorer application built with **Next.js**, showcasing infinite scroll, filtering, dynamic metadata for SEO, and responsive UI — designed as part of the **Glimpse 33 Media React/Next.js Frontend Engineer Assessment**.

✅ Deployed on Vercel → [Live Demo](https://glimpse-feed-explorer.vercel.app)


## Features

### 🗞️ Core Functionality
- ✅ Paginated feed with infinite scroll
- ✅ Detail pages per feed item
- ✅ Search and category filter
- ✅ SEO with dynamic metadata (`title`, `description`, `og:image`)
- ✅ Skeletons for loading states
- ✅ Responsive design using tailwind CSS (mobile-first)

### 💻 Technical Stack
- **Next.js App Router**
- **React Query** for fetching and caching
- **Tailwind CSS** for styling
- **React Intersection Observer** for infinite scroll
- **Jest + React Testing Library** for unit & integration tests
- **Vercel** for deployment


### 🔧 Extras
- Dark/Light theme toggle
- OAuth with Google provider
- Live data from MongoDB
- Share buttons for major social media platforms (Facebook, WhatsApp, Twitter, Email)
- Simulated network delay (to test loaders)
- Animations for transitions between pages

## Testing
- Unit test for 3 Components (FeedCard, FeedFilter and ShareButtons)
- Integration test for user flow (OAuth)



