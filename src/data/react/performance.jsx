export const performance = [
  // =================== PERFORMANCE & TỐI ƯU ===================
  {
    question: "Đo performance React bằng cách nào?",
    answer: `
  <h3>Đo Performance React Apps</h3>
  <h4>Công Cụ Built-in</h4>
  <h5>1. React DevTools Profiler</h5>
  <ul>
    <li>Ghi lại quá trình render của components</li>
    <li>Xác định components render chậm</li>
    <li>Flame graph visualization với commit times</li>
    <li>Compare different commits để thấy performance changes</li>
  </ul>
  <h5>2. React.Profiler API</h5>
  <pre><code>&lt;Profiler id="App" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log(\`Component \${id} took \${actualDuration}ms to render\`);
  }}&gt;
    &lt;App /&gt;
  &lt;/Profiler&gt;
  </code></pre>
  <p>API programatic để measure performance của component trees. Có thể wrap specific parts của app để measure chi tiết.</p>
  <h4>Công Cụ Browser</h4>
  <h5>1. Chrome DevTools Performance Tab</h5>
  <ul>
    <li>Ghi lại runtime performance với JavaScript call stacks</li>
    <li>Memory tab: Phát hiện memory leaks và excessive memory usage</li>
    <li>Network tab: Analyze loading performance và bundle sizes</li>
    <li>Application tab: Inspect local storage, session storage, và cache</li>
  </ul>
  <h5>2. Lighthouse</h5>
  <ul>
    <li>Automated performance audit chạy trong browser</li>
    <li>Core Web Vitals metrics: LCP, FID, CLS</li>
    <li>Accessibility, SEO, và best practices scores</li>
    <li>Performance budget recommendations</li>
  </ul>
  <h4>Công Cụ Third-party</h4>
  <h5>1. Web Vitals Library</h5>
  <pre><code>import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

  getLCP(console.log); // Largest Contentful Paint
  getFID(console.log); // First Input Delay
  getCLS(console.log); // Cumulative Layout Shift
  </code></pre>
  <p>Library chính thức từ Google để measure Core Web Vitals. Accurate measurements theo web standards.</p>
  <h5>2. React Query DevTools</h5>
  <p>Monitor API calls, caching behavior, và query states. Debug background refetching và optimistic updates.</p>
  <h5>3. Bundle Analyzer</h5>
  <pre><code>npm install --save-dev webpack-bundle-analyzer
  // webpack config
  plugins: [
    new BundleAnalyzerPlugin()
  ]
  </code></pre>
  <p>Visualize bundle composition để identify large dependencies và optimize bundle size.</p>
  <h4>Metrics Quan Trọng 2026</h4>
  <ul>
    <li><b>Core Web Vitals</b>: LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1 - Standards từ Google</li>
    <li><b>React Metrics</b>: Render time, re-render count, component mount time</li>
    <li><b>Bundle Size</b>: First load JS &lt; 100KB, total bundle size optimization</li>
    <li><b>Runtime Performance</b>: Main thread blocking time, long tasks &gt; 50ms</li>
    <li><b>Memory Usage</b>: Memory leaks, excessive DOM nodes, efficient garbage collection</li>
  </ul>
  `,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Khi nào memo hóa gây phản tác dụng?",
    answer: `
  <h3>Khi Nào Memoization Gây Phản Tác Dụng</h3>
  <h4>Memoization Overhead</h4>
  <p>Memoization không phải lúc nào cũng tốt - nó có chi phí về memory và CPU time để so sánh dependencies. Việc lưu cache results và check dependencies có thể tốn hơn việc tính toán lại nếu computation đơn giản.</p>
  <h4>Khi KHÔNG Nên Memoize</h4>
  <h5>1. Cheap Calculations (Tính Toán Đơn Giản)</h5>
  <pre><code>// ❌ Không cần memo - tính toán quá nhanh
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const doubled = count * 2;
  const isEven = count % 2 === 0;
  </code></pre>
  <p>Primitive operations như arithmetic, comparisons chạy rất nhanh. Memoization sẽ tốn memory để lưu cache và time để check dependencies thay đổi.</p>
  <h5>2. Primitive Values Được Tính Từ Primitives</h5>
  <pre><code>// ❌ So sánh dependencies nhanh hơn tính toán lại
  const doubled = useMemo(() => count * 2, [count]);
  const greeting = useMemo(() => \`Hello \${name}!\`, [name]);
  </code></pre>
  <p>Shallow comparison của primitives rất nhanh. Việc memoize chỉ có lợi khi computation expensive hoặc dependencies phức tạp.</p>
  <h5>3. Unstable Dependencies (Dependencies Thay Đổi Liên Tục)</h5>
  <pre><code>// ❌ Dependencies thay đổi mỗi render
  const config = useMemo(() => ({ theme, locale }), [theme, locale]);
  const date = useMemo(() => new Date(), []); // Luôn tạo object mới
  </code></pre>
  <p>Nếu dependencies thay đổi mỗi render, memoization vô nghĩa vì cache không bao giờ được reuse. Thậm chí còn tệ hơn vì phải check dependencies mỗi lần.</p>
  <h5>4. Large Objects Trong Dependencies</h5>
  <pre><code>// ❌ Reference equality check chậm với large objects
  const filteredData = useMemo(() => data.filter(item => item.active), [data]);
  // Nếu data là array lớn, shallow compare sẽ chậm
  </code></pre>
  <p>Shallow comparison của large objects/arrays có thể tốn thời gian. Trong trường hợp này, nên để component re-render và filter trong render.</p>
  <h4>Premature Optimization</h4>
  <p>80% performance issues không phải từ thiếu memoization mà từ architectural problems. Trước khi thêm memoization, hãy profile app để xác định real bottlenecks. React's reconciliation algorithm rất efficient - hầu hết re-renders không phải vấn đề.</p>
  <h4>Solutions Tốt Hơn Memoization</h4>
  <ul>
    <li><b>Structural Sharing</b>: Immer, immutable.js - Efficient immutable updates mà không cần deep clone</li>
    <li><b>Component Splitting</b>: Isolate expensive components, use code splitting để reduce initial bundle</li>
    <li><b>Lazy Loading</b>: Dynamic imports, React.lazy() để load components on demand</li>
    <li><b>Virtual Scrolling</b>: Chỉ render visible items trong large lists thay vì memoize toàn bộ list</li>
    <li><b>State Colocation</b>: Đưa state xuống components sử dụng nó để reduce prop drilling</li>
  </ul>
  <h4>React 19+ Improvements</h4>
  <ul>
    <li><b>React Compiler</b>: Auto-memoization tại build time, zero runtime cost</li>
    <li><b>Zero-cost memoization</b>: Compiler tự động optimize memoization patterns</li>
    <li><b>Automatic batching</b>: Giảm unnecessary re-renders từ multiple state updates</li>
  </ul>
  `,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Render blocking vs non-blocking khác nhau thế nào?",
    answer: `
  <h3>Render Blocking vs Non-blocking</h3>
  <h4>Render Blocking</h4>
  <p>Operations chặn UI updates, làm app feel laggy và unresponsive. User interactions bị delay hoặc không phản hồi trong khi operation chạy.</p>
  <h5>Examples</h5>
  <ul>
    <li><b>Heavy Calculations</b>: Synchronous loops hoặc expensive computations trong render</li>
    <li><b>useLayoutEffect</b>: Chạy synchronously sau DOM updates, block browser painting</li>
    <li><b>Long-running Tasks</b>: Operations chiếm main thread > 50ms</li>
    <li><b>Large DOM Manipulations</b>: Thay đổi nhiều DOM nodes cùng lúc</li>
  </ul>
  <h4>Non-blocking Rendering</h4>
  <p>Operations không chặn UI updates, user interaction vẫn smooth. Work được schedule để không block main thread.</p>
  <h5>React 18+ Features</h5>
  <ul>
    <li><b>Concurrent Rendering</b>: Interruptible renders - React có thể pause và resume rendering work</li>
    <li><b>useTransition</b>: Mark updates là non-urgent, prioritize user interactions</li>
    <li><b>useDeferredValue</b>: Defer expensive computations đến khi có time</li>
    <li><b>Suspense</b>: Handle async operations gracefully với fallbacks</li>
  </ul>
  <h4>Implementation</h4>
  <h5>Blocking Example</h5>
  <pre><code>function SlowComponent() {
    // ❌ Blocks render thread
    const result = expensiveCalculation(); // Synchronous, blocking
    return &lt;div&gt;{result}&lt;/div&gt;;
  }

  // useLayoutEffect cũng blocking
  useLayoutEffect(() => {
    const measurements = measureDOM(); // Blocks painting
    setMeasurements(measurements);
  }, [dependencies]);
  </code></pre>
  <h5>Non-blocking Example</h5>
  <pre><code>function FastComponent() {
    const [result, setResult] = useState();

    // ✅ Non-blocking với useEffect
    useEffect(() => {
      expensiveCalculation().then(setResult);
    }, []);

    // ✅ useTransition cho urgent/non-urgent updates
    const [isPending, startTransition] = useTransition();

    const handleSearch = (query) => {
      setQuery(query); // Urgent - blocks để update input
      startTransition(() => {
        setResults(search(query)); // Non-urgent - không block UI
      });
    };

    return &lt;div&gt;{result}&lt;/div&gt;;
  }
  </code></pre>
  <h4>Best Practices</h4>
  <ul>
    <li>Dùng Suspense cho async operations với meaningful loading states</li>
    <li>Debounce/throttle user input để reduce frequent updates</li>
    <li>Web Workers cho heavy computations để không block main thread</li>
    <li>Virtual scrolling cho large lists thay vì render tất cả items</li>
    <li>Code splitting với React.lazy() để reduce initial bundle size</li>
    <li>useTransition để separate urgent (user input) và non-urgent updates</li>
  </ul>
  `,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "useTransition giải quyết vấn đề gì?",
    answer: `
  <h3>useTransition - Non-blocking State Updates</h3>
  <h4>Vấn Đề Nó Giải Quyết</h4>
  <p>Heavy state updates block UI, làm app unresponsive. Khi user type vào search box, expensive search operation có thể block input responsiveness, tạo bad UX.</p>
  <h4>Trước useTransition</h4>
  <pre><code>function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
      setQuery(e.target.value);
      // ❌ Blocks UI thread, input laggy
      setResults(search(e.target.value));
    };

    return (
      &lt;div&gt;
        &lt;input value={query} onChange={handleChange} /&gt;
        &lt;ResultsList results={results} /&gt;
      &lt;/div&gt;
    );
  }
  </code></pre>
  <h4>Cách useTransition Hoạt Động</h4>
  <pre><code>import { useTransition } from 'react';

  function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
      setQuery(e.target.value); // ✅ Urgent - user input

      startTransition(() => {
        // ✅ Non-urgent - expensive search
        setResults(search(e.target.value));
      });
    };

    return (
      &lt;div&gt;
        &lt;input value={query} onChange={handleChange} /&gt;
        {isPending && &lt;p&gt;Searching...&lt;/p&gt;}
        &lt;ResultsList results={results} /&gt;
      &lt;/div&gt;
    );
  }
  </code></pre>
  <h4>Benefits</h4>
  <ul>
    <li><b>Responsive UI</b>: Input vẫn smooth, không lag khi user type</li>
    <li><b>Loading States</b>: isPending flag để show loading indicators cho non-urgent updates</li>
    <li><b>Concurrent Rendering</b>: React prioritize urgent updates (user input) over non-urgent ones</li>
    <li><b>Better UX</b>: Users thấy immediate feedback cho actions của họ</li>
  </ul>
  <h4>Use Cases</h4>
  <ul>
    <li>Search/filter operations với large datasets</li>
    <li>Page navigation trong large apps</li>
    <li>Tab switching với heavy content</li>
    <li>Form submissions với validation</li>
    <li>Real-time data updates (chat, notifications)</li>
  </ul>
  <h4>React 18+ Integration</h4>
  <p>Works seamlessly với Suspense và concurrent features. useTransition là foundation của concurrent rendering, allowing React to interrupt và resume work based on priority.</p>
  `,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Khi nào nên dùng virtualization?",
    answer: `
  <h3>Virtualization trong React Apps</h3>
  <h4>Khi Nên Dùng</h4>
  <h5>1. Large Lists (Danh Sách Lớn)</h5>
  <p>Khi hiển thị 1000+ items mà không muốn app lag. Virtualization chỉ render visible items trong viewport, giữ DOM size nhỏ.</p>
  <h5>2. Infinite Scroll</h5>
  <p>Load more data khi user scroll xuống cuối list. Virtualization giúp smooth scrolling với large datasets.</p>
  <h5>3. Table Grids (Bảng Dữ Liệu)</h5>
  <p>Spreadsheet-like interfaces với hàng nghìn rows/columns. Virtualization render chỉ visible cells.</p>
  <h5>4. Chat Applications</h5>
  <p>Message history dài với thousands of messages. Chỉ render recent messages và load more on scroll.</p>
  <h5>5. Image Galleries</h5>
  <p>Large photo galleries hoặc media libraries với hundreds/thousands of items.</p>
  <h4>Popular Libraries</h4>
  <h5>react-window</h5>
  <pre><code>import { FixedSizeList as List } from 'react-window';

  &lt;List
    height={400}           // Container height
    itemCount={10000}      // Total items
    itemSize={50}          // Item height
    width={300}            // Container width
  &gt;
    {({ index, style }) => (
      &lt;div style={style}&gt;
        Row {index}: {data[index].name}
      &lt;/div&gt;
    )}
  &lt;/List&gt;
  </code></pre>
  <p>Lightweight, focused library. Perfect for simple lists với fixed/variable item sizes.</p>
  <h5>react-virtualized</h5>
  <p>Feature-rich nhưng heavier bundle. Có nhiều components (List, Grid, Table) và advanced features như auto-sizing.</p>
  <h5>@tanstack/react-virtual</h5>
  <pre><code>import { useVirtualizer } from '@tanstack/react-virtual';

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  </code></pre>
  <p>Modern, tree-shakable library. Flexible API, support dynamic sizing, và good TypeScript support.</p>
  <h4>Performance Benefits</h4>
  <ul>
    <li><b>Memory Usage</b>: Chỉ render visible items thay vì toàn bộ list</li>
    <li><b>DOM Nodes</b>: Reduce từ 1000+ DOM nodes xuống ~10-20 nodes</li>
    <li><b>Scroll Performance</b>: Smooth 60fps scrolling even với large datasets</li>
    <li><b>Initial Load</b>: Faster mount time vì ít components được render</li>
  </ul>
  <h4>Khi KHÔNG Nên Dùng</h4>
  <ul>
    <li>Small lists (&lt;100 items) - overhead không đáng</li>
    <li>Simple static content không cần scroll</li>
    <li>SEO-critical content - crawlers cần thấy all content</li>
    <li>Mobile-first designs - virtualization có thể complex trên mobile</li>
    <li>Content cần search/filter toàn bộ - virtualization hide data</li>
  </ul>
  `,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Bạn debug re-render thực tế bằng công cụ gì?",
    answer: `
  <h3>Debug Re-renders trong React</h3>
  <h4>React DevTools</h4>
  <h5>1. Profiler Tab</h5>
  <ul>
    <li>Record component renders trong user interactions hoặc automated tests</li>
    <li>Flame graph với commit times và render durations</li>
    <li>Identify wasteful re-renders và performance bottlenecks</li>
    <li>Ranked list của slowest components</li>
  </ul>
  <h5>2. Components Tab</h5>
  <ul>
    <li>Highlight re-renders với colored borders (màu khác nhau cho mỗi render)</li>
    <li>Props/state changes tracking giữa renders</li>
    <li>Component hierarchy inspection</li>
    <li>State và props inspection tại mỗi component</li>
  </ul>
  <h4>Custom Debugging Techniques</h4>
  <h5>1. useWhyDidYouUpdate Hook</h5>
  <pre><code>const useWhyDidYouUpdate = (name, props) => {
    const previousProps = useRef();

    useEffect(() => {
      if (previousProps.current) {
        const changes = {};
        Object.keys(props).forEach(key => {
          if (previousProps.current[key] !== props[key]) {
            changes[key] = {
              from: previousProps.current[key],
              to: props[key]
            };
          }
        });
        if (Object.keys(changes).length) {
          console.log('[why-did-you-update]', name, changes);
        }
      }
      previousProps.current = props;
    });
  };

// Usage
function MyComponent(props) {
  useWhyDidYouUpdate('MyComponent', props);
  // ... rest of component
}
  </code></pre>
  <p>Custom hook để track prop changes causing re-renders. Helpful để debug unnecessary re-renders.</p>
  <h5>2. React.memo với Logging</h5>
  <pre><code>const Component = React.memo((props) => {
    console.log('Component rendered at:', new Date().toISOString());
    console.log('Props:', props);
    return &lt;div&gt;{props.children}&lt;/div&gt;;
  });

// Hoặc conditional logging
const DebugComponent = React.memo((props) => {
    if (process.env.NODE_ENV === 'development') {
      console.count('DebugComponent render');
    }
    return &lt;div&gt;{props.children}&lt;/div&gt;;
  });
  </code></pre>
  <p>Add logging to components để track khi nào chúng re-render. Use console.count để count renders.</p>
  <h5>3. Performance Marks</h5>
  <pre><code>// Mark render start
  performance.mark('render-start');

  function MyComponent() {
    // Component logic
    return &lt;div&gt;Expensive component&lt;/div&gt;;
  }

  // Measure render time
  const measureRender = (WrappedComponent) => {
    return (props) => {
      performance.mark('render-start');
      const result = &lt;WrappedComponent {...props} /&gt;;
      performance.mark('render-end');
      performance.measure('render-time', 'render-start', 'render-end');
      return result;
    };
  };
  </code></pre>
  <p>Use Performance API để measure exact render times và identify slow components.</p>
  <h4>Performance Monitoring Libraries</h4>
  <h5>1. Web Vitals</h5>
  <pre><code>import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Monitor all Core Web Vitals
getCLS((metric) => {
  console.log('CLS:', metric.value);
  // Send to analytics
});

getFID((metric) => {
  console.log('FID:', metric.value);
});

getLCP((metric) => {
  console.log('LCP:', metric.value);
});
  </code></pre>
  <p>Monitor real user performance metrics. Integrate với analytics để track performance over time.</p>
  <h5>2. React Profiler API</h5>
  <pre><code>&lt;Profiler
    id="ExpensiveComponent"
    onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      console.log(\`Component \${id}:\`);
      console.log(\`  Phase: \${phase}\`);
      console.log(\`  Actual duration: \${actualDuration}ms\`);
      console.log(\`  Base duration: \${baseDuration}ms\`);

      // Alert if render takes too long
      if (actualDuration > 16) { // More than one frame at 60fps
        console.warn(\`Slow render detected: \${actualDuration}ms\`);
      }
    }}
  &gt;
    &lt;ExpensiveComponent /&gt;
  &lt;/Profiler&gt;
  </code></pre>
  <p>Programmatic performance monitoring. Track render times và detect performance regressions.</p>
  `,
    role: "senior",
    type: "performance-optimization",
  },
]