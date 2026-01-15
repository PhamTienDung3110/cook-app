// systemDesign.js
// System Design Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const systemDesign = [
  {
    question: "Thiết kế component library nội bộ?",
    answer: `
<h3>Thiết kế Component Library Nội bộ</h3>

<h4>1) Mục tiêu và phạm vi</h4>

<h5>Mục tiêu chính</h5>
<ul>
  <li><b>Consistency</b>: UI nhất quán across products</li>
  <li><b>Efficiency</b>: Tái sử dụng components, giảm dev time</li>
  <li><b>Quality</b>: Tested, accessible, documented components</li>
  <li><b>Maintainability</b>: Easy to update and extend</li>
</ul>

<h5>Phạm vi hợp lý</h5>
<ul>
  <li><b>Primitives</b>: Button, Input, Select, Modal, Card</li>
  <li><b>Patterns</b>: Form, DataTable, Navigation (sau này)</li>
  <li><b>Không bao gồm</b>: Business-specific components</li>
</ul>

<h4>2) Tech stack lựa chọn</h4>

<h5>Core technologies</h5>
<ul>
  <li><b>React</b>: Component library, hooks for logic</li>
  <li><b>TypeScript</b>: Type safety, better DX</li>
  <li><b>Storybook</b>: Documentation, development, testing</li>
  <li><b>Rollup/Vite</b>: Bundle library for distribution</li>
</ul>

<h5>Styling approach</h5>
<ul>
  <li><b>Tailwind CSS</b>: Utility-first, consistent design tokens</li>
  <li><b>CSS Variables</b>: Theme customization</li>
  <li><b>CSS-in-JS</b>: styled-components hoặc emotion</li>
</ul>

<h4>3) Architecture và structure</h4>

<h5>Monorepo setup</h5>
<pre><code>packages/
  ui/                    # Main library
    src/
      components/
        Button/
        Input/
        Modal/
      hooks/
      utils/
      index.ts
  docs/                  # Storybook docs
  theme/                 # Design tokens
  icons/                 # Icon library
</code></pre>

<h5>Component structure</h5>
<pre><code>Button/
  Button.tsx            # Main component
  Button.test.tsx       # Unit tests
  Button.stories.tsx    # Storybook stories
  index.ts              # Exports
  README.md             # Component docs
</code></pre>

<h4>4) Design system foundation</h4>

<h5>Design tokens</h5>
<pre><code>// tokens.json
{
  "colors": {
    "primary": {
      "50": "#eff6ff",
      "500": "#3b82f6",
      "900": "#1e3a8a"
    }
  },
  "spacing": {
    "1": "0.25rem",
    "2": "0.5rem",
    "4": "1rem"
  },
  "typography": {
    "fontSize": {
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem"
    }
  }
}
</code></pre>

<h5>Component API design</h5>
<pre><code>// Good API design
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// Usage
&lt;Button variant="primary" size="md" loading={isLoading}&gt;
  Save Changes
&lt;/Button&gt;
</code></pre>

<h4>5) Development workflow</h4>

<h5>Storybook setup</h5>
<pre><code>// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react-vite'
};

// Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta&lt;typeof Button&gt; = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj&lt;typeof Button&gt;;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
</code></pre>

<h4>6) Quality assurance</h4>

<h5>Testing strategy</h5>
<ul>
  <li><b>Unit tests</b>: Component behavior, props handling</li>
  <li><b>Integration tests</b>: Component combinations</li>
  <li><b>Visual regression</b>: Chromatic hoặc Playwright</li>
  <li><b>Accessibility tests</b>: axe-core, jest-axe</li>
</ul>

<h5>Automated checks</h5>
<pre><code>// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build": "rollup -c",
    "storybook": "storybook dev",
    "build-storybook": "storybook build",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
</code></pre>

<h4>7) Distribution và consumption</h4>

<h5>Package publishing</h5>
<pre><code>// package.json
{
  "name": "@company/ui-library",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
</code></pre>

<h5>Consumption in projects</h5>
<pre><code>// In consuming app
import { Button, Input, Modal } from '@company/ui-library';

// Use components
function LoginForm() {
  return (
    &lt;Modal&gt;
      &lt;form&gt;
        &lt;Input placeholder="Email" /&gt;
        &lt;Input type="password" placeholder="Password" /&gt;
        &lt;Button&gt;Login&lt;/Button&gt;
      &lt;/form&gt;
    &lt;/Modal&gt;
  );
}
</code></pre>

<h4>8) Maintenance và evolution</h4>

<h5>Versioning strategy</h5>
<ul>
  <li><b>Semantic versioning</b>: Major.Minor.Patch</li>
  <li><b>Breaking changes</b>: Major version bump</li>
  <li><b>New features</b>: Minor version bump</li>
  <li><b>Fixes</b>: Patch version bump</li>
</ul>

<h5>Deprecation strategy</h5>
<pre><code>// Mark deprecated props
interface ButtonProps {
  /** @deprecated Use variant instead */
  type?: 'primary' | 'secondary';
  variant?: 'primary' | 'secondary';
}

// Console warnings for deprecated usage
if (type) {
  console.warn('Button: "type" prop is deprecated, use "variant" instead');
}
</code></pre>

<h4>9) Adoption strategy</h4>

<h5>Incremental adoption</h5>
<ul>
  <li><b>Start small</b>: 5-10 most used components</li>
  <li><b>Pilot project</b>: Test with one team</li>
  <li><b>Gradual migration</b>: Replace components over time</li>
  <li><b>Training</b>: Documentation and workshops</li>
</ul>

<h5>Communication</h5>
<ul>
  <li><b>Regular updates</b>: Newsletter about new components</li>
  <li><b>Migration guides</b>: How to adopt new patterns</li>
  <li><b>Support channels</b>: Slack, GitHub issues</li>
</ul>
`,
    role: "middle",
    type: "system-design",
  },

  {
    question: "Migration từ Create React App sang Next.js?",
    answer: `
<h3>Migration từ CRA sang Next.js</h3>

<h4>1) Tại sao migrate?</h4>

<h5>Lợi ích của Next.js</h5>
<ul>
  <li><b>SEO improvement</b>: Server-side rendering</li>
  <li><b>Performance</b>: Automatic code splitting, optimized loading</li>
  <li><b>Developer experience</b>: Built-in routing, API routes</li>
  <li><b>Scalability</b>: Static generation, ISR for dynamic content</li>
</ul>

<h4>2) Migration strategy</h4>

<h5>Phased approach</h5>
<ol>
  <li><b>Planning phase</b>: Assess current app, identify migration scope</li>
  <li><b>Setup phase</b>: Create Next.js app alongside CRA</li>
  <li><b>Migration phase</b>: Migrate components/pages incrementally</li>
  <li><b>Testing phase</b>: Comprehensive testing of migrated features</li>
  <li><b>Launch phase</b>: Deploy and monitor</li>
</ol>

<h4>3) Technical migration steps</h4>

<h5>1. Project setup</h5>
<pre><code>// Create Next.js app
npx create-next-app@latest my-app --typescript

// Install dependencies from CRA
npm install [your-existing-dependencies]

// Copy source files
cp -r ../cra-app/src/* ./src/
</code></pre>

<h5>2. Routing migration</h5>
<pre><code>// Before: React Router
// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
}

// After: Next.js App Router
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    &lt;html lang="en"&gt;
      &lt;body&gt;{children}&lt;/body&gt;
    &lt;/html&gt;
  );
}

// app/page.tsx
export default function Home() {
  return &lt;h1&gt;Home Page&lt;/h1&gt;;
}

// app/about/page.tsx
export default function About() {
  return &lt;h1&gt;About Page&lt;/h1&gt;;
}
</code></pre>

<h5>3. Component migration</h5>
<pre><code>// Client components need 'use client' directive
// components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h5>4. Data fetching migration</h5>
<pre><code>// Before: useEffect in component
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  return &lt;div&gt;{user?.name}&lt;/div&gt;;
}

// After: Server Components (recommended)
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetch(\`https://api.example.com/users/\${userId}\`)
    .then(res => res.json());

  return &lt;div&gt;{user.name}&lt;/div&gt;;
}

// Or Client Components with SWR/React Query
'use client';

function UserProfile({ userId }) {
  const { data: user } = useSWR(\`/api/users/\${userId}\`, fetcher);

  return &lt;div&gt;{user?.name}&lt;/div&gt;
}
</code></pre>

<h4>4) Common challenges</h4>

<h5>Client vs Server Components</h5>
<ul>
  <li><b>Server Components</b>: No browser APIs, useEffect, event handlers</li>
  <li><b>Client Components</b>: Interactive features, browser-only code</li>
  <li><b>Migration tip</b>: Start with Server Components, add 'use client' as needed</li>
</ul>

<h5>Styling migration</h5>
<pre><code>// Global styles
// app/layout.tsx
import './globals.css';

// CSS Modules (automatic in Next.js)
// components/Button.module.css
.button { /* styles */ }

// Usage
import styles from './Button.module.css';
&lt;button className={styles.button}&gt;Click&lt;/button&gt;
</code></pre>

<h5>Environment variables</h5>
<pre><code>// Next.js environment variables
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=secret

// Usage
// Client-side (browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side only
const apiSecret = process.env.API_SECRET_KEY;
</code></pre>

<h4>5) Testing migration</h4>

<h5>Update test configuration</h5>
<pre><code>// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['&lt;rootDir&gt;/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '&lt;rootDir&gt;/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: ['&lt;rootDir&gt;/.next/', '&lt;rootDir&gt;/out/']
};
</code></pre>

<h5>Update imports in tests</h5>
<pre><code>// Before
import { render } from '@testing-library/react';

// After (Next.js 13+)
import { render } from '@testing-library/react';
import { ThemeProvider } from 'your-theme-provider';

// Test with providers
const renderWithProviders = (component) => {
  return render(
    &lt;ThemeProvider&gt;
      {component}
    &lt;/ThemeProvider&gt;
  );
};
</code></pre>

<h4>6) Performance optimization</h4>

<h5>Image optimization</h5>
<pre><code>// Next.js Image component
import Image from 'next/image';

export default function Avatar({ src, alt }) {
  return (
    &lt;Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="rounded-full"
    /&gt;
  );
}
</code></pre>

<h5>Bundle analysis</h5>
<pre><code>// Analyze bundle size
npm install --save-dev @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

// Run analysis
ANALYZE=true npm run build
</code></pre>

<h4>7) Deployment considerations</h4>

<h5>Vercel deployment</h5>
<pre><code>// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
</code></pre>

<h5>Other platforms</h5>
<ul>
  <li><b>Netlify</b>: Automatic deployment from Git</li>
  <li><b>AWS Amplify</b>: Full-stack deployment</li>
  <li><b>Self-hosted</b>: Docker container deployment</li>
</ul>

<h4>8) Monitoring and rollback</h4>

<h5>Performance monitoring</h5>
<pre><code>// Add performance monitoring
import { NextWebVitalsMetric } from 'next/app';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics
  console.log(metric);
}
</code></pre>

<h5>Rollback strategy</h5>
<ul>
  <li><b>Feature flags</b>: Gradually enable migrated features</li>
  <li><b>Parallel deployment</b>: Run both versions</li>
  <li><b>Quick rollback</b>: Deploy previous version if issues</li>
</ul>
`,
    role: "middle",
    type: "system-design",
  },

  {
    question: "State management cho app phức tạp?",
    answer: `
<h3>State Management cho App Phức tạp</h3>

<h4>1) Khi nào cần global state?</h4>

<h5>Cross-cutting concerns</h5>
<ul>
  <li><b>User authentication</b>: Login status, user profile</li>
  <li><b>App configuration</b>: Theme, language, feature flags</li>
  <li><b>Global notifications</b>: Toast messages, alerts</li>
  <li><b>Router state</b>: Current route, navigation history</li>
</ul>

<h5>Shared state between components</h5>
<ul>
  <li><b>Shopping cart</b>: Items, quantities, totals</li>
  <li><b>Form state</b>: Multi-step forms, wizard flows</li>
  <li><b>Real-time data</b>: Chat messages, live updates</li>
  <li><b>Offline queue</b>: Pending actions, sync status</li>
</ul>

<h4>2) State management options</h4>

<h5>Built-in React</h5>
<ul>
  <li><b>useState/useReducer</b>: Local component state</li>
  <li><b>Context API</b>: Prop drilling solution</li>
  <li><b>useContext + useReducer</b>: Lightweight global state</li>
</ul>

<h5>Dedicated libraries</h5>
<ul>
  <li><b>Redux Toolkit</b>: Predictable state container</li>
  <li><b>Zustand</b>: Simple, scalable state management</li>
  <li><b>Jotai</b>: Atomic state management</li>
  <li><b>Recoil</b>: Facebook's state management</li>
</ul>

<h4>3) Architecture patterns</h4>

<h5>State layers</h5>
<pre><code>// 1. UI State (local)
function SearchInput() {
  const [query, setQuery] = useState('');
  // Component-specific state
}

// 2. Feature State (global slice)
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({
    items: [...state.items, item]
  })),
}));

// 3. App State (cross-cutting)
const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
</code></pre>

<h5>Server state separation</h5>
<pre><code>// Server state (React Query/SWR)
const { data: posts, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});

// Client state (Zustand/Redux)
const cart = useCartStore(state => state.items);
const user = useAuthStore(state => state.user);
</code></pre>

<h4>4) Redux Toolkit pattern</h4>

<h5>Store setup</h5>
<pre><code>// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

// TypeScript types
export type RootState = ReturnType&lt;typeof store.getState&gt;;
export type AppDispatch = typeof store.dispatch;
</code></pre>

<h5>Slice pattern</h5>
<pre><code>// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
</code></pre>

<h5>Usage with hooks</h5>
<pre><code>// features/counter/Counter.js
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    &lt;div&gt;
      &lt;div&gt;{count}&lt;/div&gt;
      &lt;button onClick={() => dispatch(increment())}&gt;+&lt;/button&gt;
      &lt;button onClick={() => dispatch(decrement())}&gt;-&lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>5) Zustand pattern</h4>

<h5>Store creation</h5>
<pre><code>// stores/useCounterStore.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useCounterStore = create(
  devtools(
    persist(
      (set, get) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        // Async actions
        incrementAsync: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({ count: state.count + 1 }));
        },
      }),
      {
        name: 'counter-storage', // persist to localStorage
      }
    ),
    {
      name: 'counter',
    }
  )
);

export default useCounterStore;
</code></pre>

<h5>Usage</h5>
<pre><code>// components/Counter.js
import useCounterStore from '../stores/useCounterStore';

function Counter() {
  const { count, increment, decrement, reset, incrementAsync } = useCounterStore();

  return (
    &lt;div&gt;
      &lt;div&gt;Count: {count}&lt;/div&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
      &lt;button onClick={reset}&gt;Reset&lt;/button&gt;
      &lt;button onClick={incrementAsync}&gt;+ Async&lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>6) Data fetching integration</h4>

<h5>Redux Toolkit Query</h5>
<pre><code>// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = api;
</code></pre>

<h5>Zustand with server state</h5>
<pre><code>// stores/usePostsStore.js
import { create } from 'zustand';

const usePostsStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      set({ posts, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addPost: async (post) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
      });
      const newPost = await response.json();
      set(state => ({ posts: [...state.posts, newPost] }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
</code></pre>

<h4>7) Testing state management</h4>

<h5>Testing Redux</h5>
<pre><code>// counterSlice.test.js
import counterReducer, { increment, decrement } from './counterSlice';

test('should return the initial state', () => {
  expect(counterReducer(undefined, { type: undefined })).toEqual({
    value: 0,
  });
});

test('should handle increment', () => {
  const previousState = { value: 0 };
  expect(counterReducer(previousState, increment())).toEqual({
    value: 1,
  });
});
</code></pre>

<h5>Testing Zustand</h5>
<pre><code>// useCounterStore.test.js
import { renderHook, act } from '@testing-library/react';
import { create } from 'zustand';
import { useCounterStore } from './useCounterStore';

test('increment counter', () => {
  const { result } = renderHook(() => useCounterStore());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
</code></pre>

<h4>8) Performance considerations</h4>

<h5>Selector optimization (Redux)</h5>
<pre><code>// Bad: Creates new reference every render
const user = useSelector(state => ({
  name: state.user.name,
  email: state.user.email
}));

// Good: Memoized selector
import { createSelector } from '@reduxjs/toolkit';

const selectUserInfo = createSelector(
  (state) => state.user.name,
  (state) => state.user.email,
  (name, email) => ({ name, email })
);

const user = useSelector(selectUserInfo);
</code></pre>

<h5>State structure optimization</h5>
<pre><code>// Normalized state for better performance
const posts = {
  byId: {
    'post1': { id: 'post1', title: 'Post 1', authorId: 'user1' },
    'post2': { id: 'post2', title: 'Post 2', authorId: 'user2' },
  },
  allIds: ['post1', 'post2'],
  loading: false,
};

const users = {
  byId: {
    'user1': { id: 'user1', name: 'John' },
    'user2': { id: 'user2', name: 'Jane' },
  },
  allIds: ['user1', 'user2'],
};
</code></pre>
`,
    role: "middle",
    type: "system-design",
  },

  {
    question: "API design và error handling?",
    answer: `
<h3>API Design và Error Handling</h3>

<h4>1) RESTful API design principles</h4>

<h5>Resource-based URLs</h5>
<pre><code>// Good RESTful design
GET    /api/users         # List users
GET    /api/users/:id     # Get user by ID
POST   /api/users         # Create user
PUT    /api/users/:id     # Update user
DELETE /api/users/:id     # Delete user

GET    /api/users/:id/posts    # User's posts
POST   /api/posts/:id/comments # Add comment to post
</code></pre>

<h5>HTTP methods</h5>
<ul>
  <li><b>GET</b>: Retrieve data (safe, idempotent)</li>
  <li><b>POST</b>: Create new resource</li>
  <li><b>PUT</b>: Update entire resource (idempotent)</li>
  <li><b>PATCH</b>: Partial update</li>
  <li><b>DELETE</b>: Remove resource (idempotent)</li>
</ul>

<h4>2) Response structure</h4>

<h5>Consistent response format</h5>
<pre><code>// Success response
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User created successfully"
}

// List response
{
  "success": true,
  "data": {
    "items": [...],
    "total": 150,
    "page": 1,
    "limit": 10
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
</code></pre>

<h5>Error response format</h5>
<pre><code>// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}

// HTTP status codes
400 Bad Request     // Validation errors
401 Unauthorized    // Authentication required
403 Forbidden       // Permission denied
404 Not Found       // Resource not found
409 Conflict        // Resource conflict (duplicate, etc.)
422 Unprocessable   // Business logic error
429 Too Many Requests // Rate limited
500 Internal Error  // Server error
</code></pre>

<h4>3) Frontend API integration</h4>

<h5>Base API client</h5>
<pre><code>// lib/api.js
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      // Network error
      throw new ApiError(0, { message: 'Network error' });
    }
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

class ApiError extends Error {
  constructor(status, data) {
    super(data.message || 'API Error');
    this.status = status;
    this.data = data;
  }
}

export const api = new ApiClient('/api');
</code></pre>

<h4>4) Error handling strategies</h4>

<h5>Global error handler</h5>
<pre><code>// hooks/useApiError.js
import { useState, useCallback } from 'react';
import { notification } from 'antd';

export function useApiError() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    setError(error);

    // Handle different error types
    switch (error.status) {
      case 401:
        // Redirect to login
        window.location.href = '/login';
        break;
      case 403:
        notification.error({
          message: 'Permission Denied',
          description: 'You do not have permission to perform this action.',
        });
        break;
      case 404:
        notification.error({
          message: 'Not Found',
          description: 'The requested resource was not found.',
        });
        break;
      case 422:
        // Validation errors - show field-specific errors
        if (error.data.details) {
          // Handle validation errors
        }
        break;
      case 429:
        notification.warning({
          message: 'Too Many Requests',
          description: 'Please wait before trying again.',
        });
        break;
      default:
        notification.error({
          message: 'Something went wrong',
          description: error.message,
        });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
</code></pre>

<h5>Error boundaries</h5>
<pre><code>// components/ErrorBoundary.js
import { Component } from 'react';
import { Result, Button } from 'antd';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        &lt;Result
          status="error"
          title="Something went wrong"
          subTitle={this.state.error?.message}
          extra={
            &lt;Button
              type="primary"
              onClick={() => this.setState({ hasError: false, error: null })}
            &gt;
              Try Again
            &lt;/Button&gt;
          }
        /&gt;
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
</code></pre>

<h4>5) Loading states</h4>

<h5>Loading UI patterns</h5>
<pre><code>// Skeleton loading
function UserCard({ user, loading }) {
  if (loading) {
    return (
      &lt;div className="user-card skeleton"&gt;
        &lt;div className="avatar skeleton" /&gt;
        &lt;div className="name skeleton" /&gt;
        &lt;div className="email skeleton" /&gt;
      &lt;/div&gt;
    );
  }

  return (
    &lt;div className="user-card"&gt;
      &lt;img src={user.avatar} alt={user.name} /&gt;
      &lt;h3&gt;{user.name}&lt;/h3&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// Spinner for buttons
function SubmitButton({ loading, children }) {
  return (
    &lt;button disabled={loading} type="submit"&gt;
      {loading && &lt;span className="spinner" /&gt;}
      {children}
    &lt;/button&gt;
  );
}
</code></pre>

<h5>Loading state management</h5>
<pre><code>// Custom hook for async operations
function useAsyncOperation() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'pending' | 'success' | 'error'

  const execute = useCallback(async (asyncFunction) => {
    setStatus('pending');
    try {
      const result = await asyncFunction();
      setStatus('success');
      return result;
    } catch (error) {
      setStatus('error');
      throw error;
    }
  }, []);

  return {
    execute,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

// Usage
function CreateUserForm() {
  const { execute, isLoading } = useAsyncOperation();
  const { handleError } = useApiError();

  const handleSubmit = async (userData) => {
    try {
      await execute(() => api.post('/users', userData));
      notification.success({ message: 'User created successfully' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      {/* form fields */}
      &lt;SubmitButton loading={isLoading}&gt;
        Create User
      &lt;/SubmitButton&gt;
    &lt;/form&gt;
  );
}
</code></pre>

<h4>6) Caching strategies</h4>

<h5>HTTP caching</h5>
<pre><code>// Server response headers
Cache-Control: max-age=300, public  // Cache for 5 minutes
ETag: "version-123"                  // Entity tag for conditional requests
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT

// Conditional requests
If-None-Match: "version-123"          // ETag comparison
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
</code></pre>

<h5>Client-side caching</h5>
<pre><code>// React Query caching
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Usage
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: () => api.get('/users'),
  staleTime: 2 * 60 * 1000, // Override default
});
</code></pre>

<h4>7) Rate limiting</h4>

<h5>Client-side rate limiting</h5>
<pre><code>// Debounce API calls
import { useCallback, useRef } from 'react';

function useDebounce(callback, delay) {
  const timeoutRef = useRef();

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}

// Usage
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounce((searchTerm) => {
    api.get(\`/search?q=\${searchTerm}\`);
  }, 300);

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return &lt;input value={query} onChange={handleChange} /&gt;;
}
</code></pre>

<h4>8) API versioning</h4>

<h5>URL versioning</h5>
<pre><code>// Version in URL
/api/v1/users
/api/v2/users

// Accept header versioning
Accept: application/vnd.api+json; version=2

// Custom header
X-API-Version: 2
</code></pre>

<h5>Version compatibility</h5>
<pre><code>// Backward compatible API
// v1 response
{
  "name": "John Doe",
  "email": "john@example.com"
}

// v2 response (adds new fields)
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",     // New field
  "avatar": "url/to/avatar"    // New field
}
</code></pre>
`,
    role: "middle",
    type: "system-design",
  },

  {
    question: "Real-time features với WebSockets?",
    answer: `
<h3>Real-time Features với WebSockets</h3>

<h4>1) WebSocket basics</h4>

<h5>Connection lifecycle</h5>
<pre><code>// Client-side connection
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('Connected to WS server');
  socket.send(JSON.stringify({
    type: 'subscribe',
    channel: 'notifications'
  }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('Disconnected from WS server');
});

// Error handling
socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});
</code></pre>

<h5>Server-side (Node.js)</h5>
<pre><code>const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Received:', data);

    // Echo back
    ws.send(JSON.stringify({
      type: 'echo',
      data: data
    }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
</code></pre>

<h4>2) React integration</h4>

<h5>Custom hook for WebSocket</h5>
<pre><code>// hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';

function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = useCallback((message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, messages, sendMessage };
}

// Usage
function ChatApp() {
  const { isConnected, messages, sendMessage } = useWebSocket('ws://localhost:8080');

  const handleSendMessage = (text) => {
    sendMessage({
      type: 'chat',
      text: text,
      timestamp: Date.now()
    });
  };

  return (
    &lt;div&gt;
      &lt;div&gt;Status: {isConnected ? 'Connected' : 'Disconnected'}&lt;/div&gt;
      &lt;div&gt;
        {messages.map((msg, index) => (
          &lt;div key={index}&gt;{msg.text}&lt;/div&gt;
        ))}
      &lt;/div&gt;
      &lt;input onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSendMessage(e.target.value);
          e.target.value = '';
        }
      }} /&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>3) State management với real-time data</h4>

<h5>Optimistic updates</h5>
<pre><code>function useOptimisticWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const { sendMessage } = useWebSocket(url);

  const sendOptimisticMessage = (message) => {
    // Add to UI immediately
    const optimisticMessage = {
      ...message,
      id: 'temp-' + Date.now(),
      status: 'pending'
    };

    setMessages(prev => [...prev, optimisticMessage]);
    setPendingMessages(prev => [...prev, optimisticMessage]);

    // Send to server
    sendMessage(message).then(() => {
      // Update status when confirmed
      setMessages(prev =>
        prev.map(msg =>
          msg.id === optimisticMessage.id
            ? { ...msg, status: 'confirmed' }
            : msg
        )
      );
      setPendingMessages(prev =>
        prev.filter(msg => msg.id !== optimisticMessage.id)
      );
    }).catch(() => {
      // Remove on error
      setMessages(prev =>
        prev.filter(msg => msg.id !== optimisticMessage.id)
      );
      setPendingMessages(prev =>
        prev.filter(msg => msg.id !== optimisticMessage.id)
      );
    });
  };

  return { messages, sendOptimisticMessage };
}
</code></pre>

<h4>4) Connection management</h4>

<h5>Reconnection logic</h5>
<pre><code>function useWebSocketWithReconnect(url, options = {}) {
  const {
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    maxReconnectInterval = 30000
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [reconnectCount, setReconnectCount] = useState(0);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      setReconnectCount(0);
    };

    socket.onclose = () => {
      setIsConnected(false);

      if (reconnectCount < reconnectAttempts) {
        const delay = Math.min(
          reconnectInterval * Math.pow(2, reconnectCount),
          maxReconnectInterval
        );

        reconnectTimeoutRef.current = setTimeout(() => {
          setReconnectCount(prev => prev + 1);
          connect();
        }, delay);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [url, reconnectAttempts, reconnectInterval, maxReconnectInterval, reconnectCount]);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  // ... rest of the hook
}
</code></pre>

<h4>5) Performance optimization</h4>

<h5>Message batching</h5>
<pre><code>function useBatchedWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const batchRef = useRef([]);
  const batchTimeoutRef = useRef(null);

  const processBatch = useCallback(() => {
    if (batchRef.current.length > 0) {
      setMessages(prev => [...prev, ...batchRef.current]);
      batchRef.current = [];
    }
  }, []);

  const addToBatch = useCallback((message) => {
    batchRef.current.push(message);

    // Process batch after 100ms of inactivity
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
    }

    batchTimeoutRef.current = setTimeout(processBatch, 100);
  }, [processBatch]);

  // ... WebSocket setup with addToBatch instead of direct setMessages

  return { messages };
}
</code></pre>

<h4>6) Security considerations</h4>

<h5>Authentication</h5>
<pre><code>// Include auth token in WebSocket connection
const token = localStorage.getItem('authToken');
const socket = new WebSocket(\`ws://localhost:8080?token=\${token}\`);

// Or send auth message after connection
socket.onopen = () => {
  socket.send(JSON.stringify({
    type: 'auth',
    token: localStorage.getItem('authToken')
  }));
};
</code></pre>

<h5>Input validation</h5>
<pre><code>// Validate incoming messages
socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    // Validate message structure
    if (!data.type || typeof data.type !== 'string') {
      console.warn('Invalid message format');
      return;
    }

    // Process valid messages
    handleMessage(data);
  } catch (error) {
    console.error('Failed to parse WebSocket message:', error);
  }
};
</code></pre>

<h4>7) Scaling considerations</h4>

<h5>Connection limits</h5>
<ul>
  <li><b>Browser limits</b>: ~6 concurrent connections per domain</li>
  <li><b>Server limits</b>: Connection pooling, load balancing</li>
  <li><b>Message size</b>: Keep messages small, compress if needed</li>
</ul>

<h5>Server architecture</h5>
<pre><code>// Redis pub/sub for scaling
const Redis = require('ioredis');
const redis = new Redis();

// Subscribe to channels
redis.subscribe('chat-room-1', 'notifications');

// Publish messages
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    redis.publish(data.channel, message);
  });
});

// Handle published messages
redis.on('message', (channel, message) => {
  // Broadcast to all clients in channel
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});
</code></pre>

<h4>8) Testing WebSocket connections</h4>

<h5>Mock WebSocket</h5>
<pre><code>// __mocks__/WebSocket.js
class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = WebSocket.CONNECTING;

    // Simulate connection
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      this.onopen && this.onopen();
    }, 100);
  }

  send(data) {
    // Mock sending
    setTimeout(() => {
      this.onmessage && this.onmessage({
        data: JSON.stringify({ type: 'echo', data: JSON.parse(data) })
      });
    }, 50);
  }

  close() {
    this.readyState = WebSocket.CLOSED;
    this.onclose && this.onclose();
  }
}

global.WebSocket = MockWebSocket;
</code></pre>

<h5>Testing real-time features</h5>
<pre><code>// Test optimistic updates
test('optimistic message update', async () => {
  render(&lt;ChatApp /&gt;);

  const input = screen.getByPlaceholderText('Type a message...');
  const sendButton = screen.getByText('Send');

  // Type and send message
  fireEvent.change(input, { target: { value: 'Hello!' } });
  fireEvent.click(sendButton);

  // Message should appear immediately (optimistic)
  expect(screen.getByText('Hello!')).toBeInTheDocument();
  expect(screen.getByText('Hello!')).toHaveAttribute('data-status', 'pending');

  // Wait for confirmation
  await waitFor(() => {
    expect(screen.getByText('Hello!')).toHaveAttribute('data-status', 'confirmed');
  });
});
</code></pre>
`,
    role: "middle",
    type: "system-design",
  },
]

export default systemDesign
