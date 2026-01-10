export const systemDesign = [
  // =================== LIVE CODING / SYSTEM DESIGN ===================
  {
    question: "Design frontend cho e-commerce lớn",
    answer: `
  <h5>Frontend Architecture cho E-commerce</h2>
  
  <h5>Core Requirements</h2>
  
  <h5>1. Performance</h3>
  <ul>
    <li>Fast initial load</li>
    <li>Smooth navigation</li>
    <li>Mobile optimization</li>
  </ul>
  
  <h5>2. Scalability</h3>
  <ul>
    <li>100k+ products</li>
    <li>High traffic spikes</li>
    <li>Global CDN</li>
  </ul>
  
  <h5>3. User Experience</h3>
  <ul>
    <li>Search & filtering</li>
    <li>Shopping cart</li>
    <li>Checkout flow</li>
  </ul>
  
  <h5>Technology Stack</h2>
  
  <h5>Framework</h3>
  <ul>
    <li><b>Next.js 14+</b>: SSR, App Router, Edge Runtime</li>
    <li><b>React 18</b>: Concurrent features, Suspense</li>
  </ul>
  
  <h5>State Management</h3>
  <ul>
    <li><b>Zustand</b>: Global state (cart, user)</li>
    <li><b>React Query</b>: Server state (products, search)</li>
  </ul>
  
  <h5>UI & Performance</h3>
  <ul>
    <li><b>Tailwind CSS</b>: Utility-first styling</li>
    <li><b>Framer Motion</b>: Animations</li>
    <li><b>React Virtual</b>: Large product lists</li>
  </ul>
  
  <h5>Architecture Patterns</h2>
  
  <h5>1. Component Structure</h3>
  <pre><code>src/
    app/              # Next.js App Router
    components/
      ui/            # Reusable UI components
      product/       # Product-specific
      cart/          # Shopping cart
    hooks/           # Custom hooks
    stores/          # Zustand stores
    lib/             # Utilities
  </code></pre>
  
  <h5>2. Performance Optimizations</h3>
  <ul>
    <li><b>Image Optimization</b>: Next.js Image component</li>
    <li><b>Code Splitting</b>: Dynamic imports</li>
    <li><b>Caching</b>: React Query + Redis</li>
    <li><b>CDN</b>: Static assets</li>
  </ul>
  
  <h5>3. SEO & Analytics</h3>
  <ul>
    <li><b>Meta Tags</b>: Dynamic OG tags</li>
    <li><b>Structured Data</b>: Product schema</li>
    <li><b>Analytics</b>: Conversion tracking</li>
  </ul>
  `,
    role: "senior",
    type: "system-design",
  },
  {
    question: "State flow cho app realtime",
    answer: `
  <h5>State Flow cho Real-time Applications</h2>
  
  <h5>Real-time Requirements</h2>
  
  <h5>1. Live Updates</h3>
  <ul>
    <li>WebSocket connections</li>
    <li>Server-sent events</li>
    <li>Optimistic updates</li>
    </ul>
  
  <h5>2. Conflict Resolution</h3>
  <ul>
    <li>Concurrent edits</li>
    <li>Offline support</li>
    <li>Data synchronization</li>
  </ul>
  
  <h5>3. Performance</h3>
  <ul>
    <li>Efficient re-renders</li>
    <li>Memory management</li>
    <li>Network optimization</li>
  </ul>
  
  <h5>State Architecture</h2>
  
  <h5>1. Server State</h3>
  <pre><code>// React Query + WebSocket
  const useRealtimeData = (key) => {
    return useQuery({
      queryKey: [key],
      queryFn: fetchData,
      refetchInterval: 5000, // Fallback polling
    });
  };
  </code></pre>
  
  <h5>2. Real-time Updates</h3>
  <pre><code>// WebSocket integration
  const ws = new WebSocket('ws://api.example.com');
  
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    queryClient.setQueryData([update.key], update.data);
  };
  </code></pre>
  
  <h5>3. Optimistic Updates</h3>
  <pre><code>// Immediate UI feedback
  const mutation = useMutation({
    mutationFn: updateData,
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['data'] });
      
      // Snapshot previous value
      const previousData = queryClient.getQueryData(['data']);
      
      // Optimistically update
      queryClient.setQueryData(['data'], newData);
      
      return { previousData };
    },
    onError: (err, newData, context) => {
      // Rollback khi có lỗi
      queryClient.setQueryData(['data'], context.previousData);
    },
  });
  </code></pre>
  
  <h5>Offline Support</h2>
  
  <h5>1. Service Worker</h3>
  <pre><code>// Cache API responses
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  });
  </code></pre>
  
  <h5>2. Conflict Resolution</h3>
  <ul>
    <li><b>Last Write Wins</b>: Đơn giản, nhưng có thể mất data</li>
    <li><b>Operational Transforms</b>: Complex, preserves intent</li>
    <li><b>CRDTs</b>: Conflict-free replicated data types</li>
    </ul>
  `,
    role: "senior",
    type: "system-design",
  },
  {
    question: "Optimize page load cho traffic lớn",
    answer: `
  <h5>Page Load Optimization cho High Traffic</h2>
  
  <h5>Performance Metrics</h2>
  
  <h5>Core Web Vitals</h3>
  <ul>
    <li><b>LCP</b>: < 2.5s</li>
    <li><b>FID</b>: < 100ms</li>
    <li><b>CLS</b>: < 0.1</li>
  </ul>
  
  <h5>Bundle Metrics</h3>
  <ul>
    <li><b>First Load JS</b>: < 100KB</li>
    <li><b>Total Bundle</b>: < 200KB</li>
    <li><b>Images</b>: Optimized, lazy loaded</li>
  </ul>
  
  <h5>Optimization Strategies</h2>
  
  <h5>1. Code Splitting</h3>
  <pre><code>// Route-based splitting
  const HomePage = lazy(() => import('./pages/Home'));
  const ProductPage = lazy(() => import('./pages/Product'));
  
  // Component-based splitting
  const HeavyComponent = lazy(() => import('./components/Heavy'));
  </code></pre>
  
  <h5>2. Image Optimization</h3>
  <pre><code>// Next.js Image component
  import Image from 'next/image';
  
  &lt;Image
    src="/product.jpg"
    width={500}
    height={500}
    placeholder="blur"
    priority
  /&gt;
  </code></pre>
  
  <h5>3. Caching Strategy</h3>
  <ul>
    <li><b>HTTP Caching</b>: Cache-Control headers</li>
    <li><b>Service Worker</b>: Offline capability</li>
    <li><b>CDN</b>: Global distribution</li>
    <li><b>Browser Cache</b>: Long-term assets</li>
  </ul>
  
  <h5>4. Server-Side Optimizations</h3>
  <pre><code>// Streaming SSR
  export default function Page() {
    return (
      &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
        &lt;SlowComponent /&gt;
      &lt;/Suspense&gt;
    );
  }
  </code></pre>
  
  <h5>Monitoring & Tools</h2>
  
  <h5>1. Real User Monitoring</h3>
  <ul>
    <li><b>Web Vitals</b>: Core metrics</li>
    <li><b>Sentry</b>: Error tracking</li>
    <li><b>DataDog</b>: Performance monitoring</li>
  </ul>
  
  <h5>2. Bundle Analysis</h3>
  <pre><code>npm install --save-dev webpack-bundle-analyzer
  // Analyze bundle composition
  </code></pre>
  `,
    role: "senior",
    type: "system-design",
  },
  {
    question: "Thiết kế component library nội bộ",
    answer: `
  <h5>Thiết Kế Component Library Nội Bộ</h2>
  
  <h5>Requirements Analysis</h2>
  
  <h5>1. Design System</h3>
  <ul>
    <li>Consistent visual language</li>
    <li>Brand guidelines</li>
    <li>Accessibility standards</li>
  </ul>
  
  <h5>2. Technical Needs</h3>
  <ul>
    <li>Multiple projects</li>
    <li>Team collaboration</li>
    <li>Maintenance overhead</li>
  </ul>
  
  <h5>3. Developer Experience</h3>
  <ul>
    <li>Dễ sử dụng</li>
    <li>Well documented</li>
    <li>TypeScript support</li>
  </ul>
  
  <h5>Architecture</h2>
  
  <h5>1. Tech Stack</h3>
  <ul>
    <li><b>React</b>: Component library</li>
    <li><b>TypeScript</b>: Type safety</li>
    <li><b>Storybook</b>: Documentation & testing</li>
    <li><b>Rollup</b>: Bundle optimization</li>
  </ul>
  
  <h5>2. Project Structure</h3>
  <pre><code>packages/
    ui/                    # Main library
      src/
        components/       # UI components
        hooks/           # Shared hooks
        utils/           # Utilities
        types/           # TypeScript types
      stories/           # Storybook stories
    design-system/       # Design tokens
    icons/               # Icon library
  </code></pre>
  
  <h5>3. Component Structure</h3>
  <pre><code>// Button.tsx
  interface ButtonProps {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
  }
  
  export const Button: React.FC&lt;ButtonProps&gt; = ({ ... }) => { ... };
  </code></pre>
  
  <h5>Distribution & Usage</h2>
  
  <h5>1. Package Management</h3>
  <pre><code>// package.json
  {
    "name": "@company/ui",
    "version": "1.0.0",
    "main": "dist/index.js",
    "types": "dist/index.d.ts"
  }
  </code></pre>
  
  <h5>2. Versioning</h3>
  <ul>
    <li><b>Semantic Versioning</b>: Major.minor.patch</li>
    <li><b>Changelog</b>: Document changes</li>
    <li><b>Deprecation</b>: Migration guides</li>
  </ul>
  
  <h5>3. Documentation</h3>
  <ul>
    <li><b>Storybook</b>: Interactive docs</li>
    <li><b>README</b>: Setup instructions</li>
    <li><b>Confluence</b>: Usage guidelines</li>
  </ul>
  
  <h5>Quality Assurance</h2>
  
  <h5>1. Testing</h3>
  <ul>
    <li><b>Unit Tests</b>: Jest + React Testing Library</li>
    <li><b>Visual Tests</b>: Chromatic</li>
    <li><b>E2E Tests</b>: Playwright</li>
  </ul>
  
  <h5>2. Linting & Formatting</h3>
  <ul>
    <li><b>ESLint</b>: Code quality</li>
    <li><b>Prettier</b>: Code formatting</li>
    <li><b>Husky</b>: Pre-commit hooks</li>
  </ul>
  `,
    role: "senior",
    type: "system-design",
  },
  {
    question: "Migration từ React SPA sang Next.js",
    answer: `
  <h5>Migration Strategy: React SPA → Next.js</h2>
  
  <h5>Assessment Phase</h2>
  
  <h5>1. Current State Analysis</h3>
  <ul>
    <li>Routing structure</li>
    <li>API integrations</li>
    <li>State management</li>
    <li>Build configuration</li>
  </ul>
  
  <h5>2. Migration Goals</h3>
  <ul>
    <li>SEO improvement</li>
    <li>Performance gains</li>
    <li>Developer experience</li>
    <li>Scalability</li>
  </ul>
  
  <h5>Incremental Migration</h2>
  
  <h5>Phase 1: Setup & Infrastructure</h3>
  <pre><code>// Install Next.js
  npx create-next-app@latest migration-app --typescript
  
  // Move existing components
  cp -r src/components migration-app/components/
  
  // Configure build tools
  // Update package.json scripts
  </code></pre>
  
  <h5>Phase 2: Routing Migration</h3>
  <pre><code>// Convert React Router thành Next.js
  // src/pages/index.jsx → app/page.jsx
  // src/pages/products/[id].jsx → app/products/[id]/page.jsx
  
  // Update navigation
  import Link from 'next/link';
  &lt;Link href="/products"&gt;Products&lt;/Link&gt;
  </code></pre>
  
  <h5>Phase 3: Data Fetching</h3>
  <pre><code>// Convert API calls
  // Before: useEffect + fetch
  // After: Server Components + fetch
  
  export default async function Page() {
    const data = await fetch('https://api.example.com/data');
    const json = await data.json();
    
    return &lt;div&gt;{json.title}&lt;/div&gt;;
  }
  </code></pre>
  
  <h5>Phase 4: State Management</h3>
  <ul>
    <li>Keep existing Redux/Zustand</li>
    <li>Move client components sang 'use client'</li>
    <li>Optimize server/client boundaries</li>
  </ul>
  
  <h5>Testing & Deployment</h2>
  
  <h5>1. Testing Strategy</h3>
  <ul>
    <li>Unit tests: Unchanged</li>
    <li>Integration tests: Update cho SSR</li>
    <li>E2E tests: Test full pages</li>
  </ul>
  
  <h5>2. Deployment</h3>
  <ul>
    <li><b>Vercel</b>: Native Next.js support</li>
    <li><b>Netlify</b>: Static + serverless</li>
    <li><b>AWS</b>: Lambda@Edge</li>
  </ul>
  
  <h5>Common Challenges</h2>
  
  <h5>1. Hydration Mismatches</h3>
  <pre><code>// Tránh client-only content trong SSR
  'use client';
  import { useState } from 'react';
  </code></pre>
  
  <h5>2. API Routes</h3>
  <pre><code>// Convert thành Next.js API routes
  // pages/api/users.js
  export default function handler(req, res) {
    // API logic
  }
  </code></pre>
  
  <h5>3. Performance Monitoring</h3>
  <ul>
    <li>Update Core Web Vitals tracking</li>
    <li>Monitor server-side performance</li>
    <li>A/B test improvements</li>
  </ul>
  `,
    role: "senior",
    type: "system-design",
  },
]