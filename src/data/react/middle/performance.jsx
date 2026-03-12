// performance.js
// Performance & Optimization Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const performance = [
  {
    question: "Làm sao để optimize React app performance?",
    answer: `
<h3>React Performance Optimization</h3>

<h4>1) Component level optimizations</h4>

<h5>React.memo</h5>
<pre><code>const MyComponent = React.memo(function MyComponent({ value }) {
  return &lt;div&gt;{value}&lt;/div&gt;;
});

// Chỉ re-render khi props thực sự thay đổi
</code></pre>

<h5>useMemo for expensive calculations</h5>
<pre><code>const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
</code></pre>

<h5>useCallback for functions</h5>
<pre><code>const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);
</code></pre>

<h4>2) List optimization</h4>

<h5>Keys for list items</h5>
<pre><code>{items.map(item => (
  &lt;ListItem key={item.id} item={item} /&gt;
))}
</code></pre>

<h5>Virtual scrolling for large lists</h5>
<pre><code>// Dùng react-window hoặc react-virtualized
import { FixedSizeList as List } from 'react-window';

&lt;List
  height={150}
  itemCount={1000}
  itemSize={35}
&gt;
  {({ index, style }) => (
    &lt;div style={style}&gt;Item {index}&lt;/div&gt;
  )}
&lt;/List&gt;
</code></pre>

<h4>3) Bundle optimization</h4>

<h5>Code splitting</h5>
<pre><code>// Dynamic imports
const OtherComponent = lazy(() => import('./OtherComponent'));

// Route-based splitting
const Home = lazy(() => import('./routes/Home'));
</code></pre>

<h5>Tree shaking</h5>
<p>Import only what you need:</p>
<pre><code>// ✅ Good
import { useState } from 'react';

// ❌ Avoid
import React from 'react';
</code></pre>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "Bundle size optimization như thế nào?",
    answer: `
<h3>Bundle Size Optimization</h3>

<h4>1) Analyze bundle</h4>
<pre><code>// webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// Trong webpack config
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
</code></pre>

<h4>2) Code splitting strategies</h4>

<h5>Route-based splitting</h5>
<pre><code>import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Suspense&gt;
  );
}
</code></pre>

<h5>Component-based splitting</h5>
<pre><code>// Split heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyPage() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    &lt;div&gt;
      &lt;button onClick={() => setShowHeavy(true)}&gt;
        Load Heavy Component
      &lt;/button&gt;
      {showHeavy && (
        &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
          &lt;HeavyComponent /&gt;
        &lt;/Suspense&gt;
      )}
    &lt;/div&gt;
  );
}
</code></pre>

<h4>3) Library optimization</h4>

<h5>Import selectively</h5>
<pre><code>// ✅ Import specific functions
import { map, filter } from 'lodash-es';

// ❌ Import entire library
import _ from 'lodash';
</code></pre>

<h5>Use lighter alternatives</h5>
<ul>
  <li>date-fns instead of moment.js</li>
  <li>react-use instead of custom hooks</li>
  <li>Bundle size aware libraries</li>
</ul>

<h4>4) Build optimizations</h4>

<h5>Production build</h5>
<pre><code>npm run build // Creates optimized production build
</code></pre>

<h5>Gzip compression</h5>
<p>Enable gzip on server for text-based assets.</p>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "Lazy loading images và components?",
    answer: `
<h3>Lazy Loading - Load on Demand</h3>

<h4>1) Image lazy loading</h4>

<h5>Native lazy loading</h5>
<pre><code>&lt;img
  src="image.jpg"
  loading="lazy"
  alt="Lazy loaded image"
/&gt;
</code></pre>

<h5>Intersection Observer API</h5>
<pre><code>function LazyImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    if (imageRef) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    return () => observer?.disconnect();
  }, [imageRef, src]);

  return &lt;img ref={setImageRef} src={imageSrc} alt={alt} /&gt;;
}
</code></pre>

<h4>2) Component lazy loading</h4>

<h5>React.lazy</h5>
<pre><code>import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  );
}
</code></pre>

<h4>3) Route-based lazy loading</h4>

<h5>With React Router</h5>
<pre><code>import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Contact = lazy(() => import('./routes/Contact'));

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
        &lt;Routes&gt;
          &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
          &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
          &lt;Route path="/contact" element={&lt;Contact /&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/Suspense&gt;
    &lt;/BrowserRouter&gt;
  );
}
</code></pre>

<h4>4) Benefits</h4>
<ul>
  <li><b>Faster initial load</b> - smaller initial bundle</li>
  <li><b>Reduced bandwidth</b> - load only when needed</li>
  <li><b>Better user experience</b> - progressive loading</li>
  <li><b>Improved performance metrics</b> - faster LCP, FCP</li>
</ul>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "Debouncing và throttling trong React?",
    answer: `
<h3>Debouncing vs Throttling</h3>

<h4>1) Debouncing</h4>
<p><b>Delay execution until user stops triggering</b></p>

<pre><code>import { useCallback, useRef } from 'react';

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
    // API call here
    console.log('Searching for:', searchTerm);
  }, 300);

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return &lt;input value={query} onChange={handleChange} /&gt;;
}
</code></pre>

<h4>2) Throttling</h4>
<p><b>Limit execution to once per time interval</b></p>

<pre><code>function useThrottle(callback, delay) {
  const lastRan = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = Date.now();
    }
  }, [callback, delay]);
}

// Usage - resize handler
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const throttledResize = useThrottle(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, [throttledResize]);

  return &lt;div&gt;{size.width} x {size.height}&lt;/div&gt;;
}
</code></pre>

<h4>3) When to use?</h4>

<h5>Debouncing:</h5>
<ul>
  <li>Search input (wait until user stops typing)</li>
  <li>Auto-save (save after user stops editing)</li>
  <li>API calls on user input</li>
</ul>

<h5>Throttling:</h5>
<ul>
  <li>Scroll events</li>
  <li>Resize events</li>
  <li>Mouse move events</li>
  <li>Button click (prevent double-click)</li>
</ul>

<h4>4) Libraries</h4>
<ul>
  <li><b>lodash</b>: _.debounce, _.throttle</li>
  <li><b>Custom hooks</b>: useDebounce, useThrottle</li>
  <li><b>React built-in</b>: useDeferredValue (React 18)</li>
</ul>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "React DevTools Profiler dùng như thế nào?",
    answer: `
<h3>React DevTools Profiler</h3>

<h4>1) Enable Profiler</h4>
<ol>
  <li>Open Chrome DevTools</li>
  <li>Go to React DevTools tab</li>
  <li>Click "Profiler" tab</li>
  <li>Click record button 🔴</li>
  <li>Interact with your app</li>
  <li>Stop recording</li>
</ol>

<h4>2) Reading the profiler</h4>

<h5>Flamegraph view</h5>
<ul>
  <li><b>Width</b>: Time component took to render</li>
  <li><b>Color</b>: Type of component (gray = unchanged)</li>
  <li><b>Height</b>: Component hierarchy depth</li>
</ul>

<h5>Ranked view</h5>
<ul>
  <li>Components sorted by render time</li>
  <li>Most expensive components first</li>
  <li>Help identify bottlenecks</li>
</ul>

<h4>3) Commit analysis</h4>

<h5>Why did this render?</h5>
<ul>
  <li><b>Props changed</b></li>
  <li><b>State changed</b></li>
  <li><b>Context changed</b></li>
  <li><b>Parent rendered</b></li>
</ul>

<h4>4) Performance insights</h4>

<h5>Common issues to look for:</h5>
<ul>
  <li>Components rendering too frequently</li>
  <li>Large component subtrees re-rendering</li>
  <li>Unnecessary renders due to object/array creation</li>
  <li>Missing memoization where needed</li>
</ul>

<h4>5) Profiling in production</h4>
<pre><code>// Enable in production (not recommended for regular use)
if (process.env.NODE_ENV === 'development') {
  const { registerObserver } = require('react-devtools-core');
  // register observer
}
</code></pre>

<h4>6) Best practices</h4>
<ul>
  <li><b>Profile realistic scenarios</b></li>
  <li><b>Compare before/after optimizations</b></li>
  <li><b>Focus on user-perceived performance</b></li>
  <li><b>Use with browser performance tools</b></li>
</ul>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "Web Workers trong React dùng khi nào?",
    answer: `
<h3>Web Workers trong React</h3>

<h4>1) Web Worker là gì?</h4>
<ul>
  <li><b>Background thread</b> riêng biệt với main thread</li>
  <li>Xử lý <b>heavy computation</b> mà không block UI</li>
  <li>Giao tiếp với main thread qua <b>postMessage</b></li>
  <li>Không có access tới DOM</li>
</ul>

<h4>2) Khi nào cần Web Worker?</h4>
<ul>
  <li><b>Data processing</b>: Parse CSV/JSON lớn</li>
  <li><b>Image processing</b>: Resize, filter, compress</li>
  <li><b>Sorting/filtering</b>: Danh sách hàng nghìn items</li>
  <li><b>Encryption</b>: Encrypt/decrypt data</li>
  <li><b>Complex calculations</b>: Math-heavy operations</li>
</ul>

<h4>3) Basic implementation</h4>
<pre><code>// worker.js
self.addEventListener('message', (e) => {
  const { data, type } = e.data;

  if (type === 'SORT') {
    const sorted = data.sort((a, b) => a.value - b.value);
    self.postMessage({ type: 'SORTED', result: sorted });
  }
});

// useWorker.js - Custom hook
function useWorker(workerPath) {
  const workerRef = useRef(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    workerRef.current = new Worker(workerPath);

    workerRef.current.onmessage = (e) => {
      setResult(e.data.result);
      setLoading(false);
    };

    return () => workerRef.current?.terminate();
  }, [workerPath]);

  const postMessage = useCallback((message) => {
    setLoading(true);
    workerRef.current?.postMessage(message);
  }, []);

  return { result, loading, postMessage };
}
</code></pre>

<h4>4) Libraries hỗ trợ</h4>
<ul>
  <li><b>comlink</b>: Simplified Worker API</li>
  <li><b>workerize-loader</b>: Webpack loader for Workers</li>
  <li><b>use-worker</b>: React hook for Web Workers</li>
</ul>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "React.memo với custom comparison function?",
    answer: `
<h3>React.memo – Custom Comparison</h3>

<h4>1) Default behavior</h4>
<pre><code>// Mặc định: shallow comparison tất cả props
const MyComponent = React.memo(function MyComponent({ user, items }) {
  return &lt;div&gt;{user.name} - {items.length} items&lt;/div&gt;;
});

// Re-render khi:
// - user reference thay đổi (kể cả nếu content giống nhau)
// - items reference thay đổi
</code></pre>

<h4>2) Custom comparison function</h4>
<pre><code>// Tham số thứ 2: arePropsEqual function
const UserCard = React.memo(
  function UserCard({ user, onSelect, theme }) {
    return (
      &lt;div className={theme}&gt;
        &lt;h3&gt;{user.name}&lt;/h3&gt;
        &lt;p&gt;{user.email}&lt;/p&gt;
        &lt;button onClick={() =&gt; onSelect(user.id)}&gt;Select&lt;/button&gt;
      &lt;/div&gt;
    );
  },
  // Return true nếu KHÔNG cần re-render
  (prevProps, nextProps) => {
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.theme === nextProps.theme
      // Bỏ qua onSelect reference changes
    );
  }
);
</code></pre>

<h4>3) Khi nào dùng custom comparison?</h4>
<ul>
  <li><b>Props là object/array</b> với identity thay đổi nhưng content giống</li>
  <li><b>Callback props</b>: Muốn bỏ qua function reference thay đổi</li>
  <li><b>Chỉ một vài props quan trọng</b>: So sánh subset của props</li>
</ul>

<h4>4) Pitfalls cần tránh</h4>
<ul>
  <li><b>Deep comparison tốn kém</b>: Có thể chậm hơn re-render</li>
  <li><b>Quên so sánh props quan trọng</b>: Gây bug stale data</li>
  <li><b>Overuse</b>: Không phải mọi component đều cần memo</li>
</ul>

<pre><code>// ❌ Bad: Deep comparison cho large objects
(prev, next) => JSON.stringify(prev) === JSON.stringify(next)

// ✅ Good: So sánh only relevant fields
(prev, next) => prev.id === next.id && prev.updatedAt === next.updatedAt
</code></pre>

<h4>5) Alternative: Restructure props</h4>
<pre><code>// Thay vì custom comparison, truyền primitive props
// ❌
&lt;UserCard user={user} /&gt;

// ✅ Tách primitive để shallow compare work
&lt;UserCard userId={user.id} userName={user.name} /&gt;
</code></pre>
`,
    role: "middle",
    type: "performance-optimization",
  },

  {
    question: "Cách phòng tránh memory leak trong React?",
    answer: `
<h3>Memory Leak Prevention trong React</h3>

<h4>1) Nguyên nhân phổ biến</h4>
<ul>
  <li><b>Event listeners</b> không được cleanup</li>
  <li><b>Timers</b> (setTimeout, setInterval) không cleared</li>
  <li><b>Subscriptions</b> không unsubscribe</li>
  <li><b>Async operations</b> set state sau khi component unmount</li>
  <li><b>Closures</b> giữ tham chiếu tới objects không cần thiết</li>
</ul>

<h4>2) Cleanup trong useEffect</h4>
<pre><code>// ✅ Cleanup event listeners
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

// ✅ Cleanup timers
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);

// ✅ Cleanup subscriptions
useEffect(() => {
  const subscription = eventEmitter.subscribe('event', handler);
  return () => subscription.unsubscribe();
}, []);
</code></pre>

<h4>3) AbortController cho async operations</h4>
<pre><code>useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal
      });
      const data = await response.json();
      setData(data); // Safe: request cancelled if unmounted
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  }

  fetchData();
  return () => controller.abort();
}, []);
</code></pre>

<h4>4) WebSocket cleanup</h4>
<pre><code>useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');

  ws.onmessage = (event) => {
    setMessages(prev => [...prev, JSON.parse(event.data)]);
  };

  return () => {
    ws.close(); // ✅ Close connection on unmount
  };
}, []);
</code></pre>

<h4>5) Best practices</h4>
<ul>
  <li><b>Luôn return cleanup function</b> trong useEffect có side effects</li>
  <li><b>Dùng AbortController</b> cho mọi fetch request</li>
  <li><b>Set state conditionally</b>: Check mounted trước khi setState</li>
  <li><b>React DevTools Profiler</b>: Monitor component mounts/unmounts</li>
  <li><b>Chrome DevTools Memory tab</b>: Detect memory leaks</li>
</ul>
`,
    role: "middle",
    type: "performance-optimization",
  },
]

export default performance
