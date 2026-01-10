const QnAReact = [
  // =================== REACT & RENDERING SÂU ===================
  {
    question: "React reconciliation hoạt động thế nào?",
    answer: `
<h2>React Reconciliation - Thuật Toán So Sánh Ảo</h2>
<h3>Giới Thiệu</h3>
<p>React Reconciliation là thuật toán so sánh Virtual DOM với DOM thật để cập nhật giao diện hiệu quả nhất.</p>

<h3>Cách Hoạt Động Cơ Bản</h3>
<p>Khi state/props thay đổi:</p>
<ol>
  <li><b>Render Phase</b>: Component tạo Virtual DOM tree mới</li>
  <li><b>Reconciliation Phase</b>: So sánh tree mới với tree cũ</li>
  <li><b>Commit Phase</b>: Áp dụng thay đổi lên DOM thật</li>
</ol>

<h3>Thuật Toán Diffing Chi Tiết</h3>
<p>React sử dụng heuristics để so sánh hiệu quả:</p>
<ul>
  <li><b>Element Type</b>: div vs span → thay thế toàn bộ</li>
  <li><b>Key Props</b>: Track items trong list, tránh re-render không cần thiết</li>
  <li><b>Component Type</b>: Function vs Class component</li>
  <li><b>Props Comparison</b>: Shallow compare object props</li>
        </ul>

<h3>Performance Optimization</h3>
<p>React tối ưu bằng:</p>
<ul>
  <li><b>Component Skipping</b>: PureComponent, memo()</li>
  <li><b>Tree Pruning</b>: Dừng diff khi không cần thiết</li>
  <li><b>Fiber Architecture</b>: Interruptible rendering</li>
  <li><b>Concurrent Features</b>: useDeferredValue, useTransition</li>
        </ul>

<h3>React 18+ Cải Tiến</h3>
<ul>
  <li><b>Automatic Batching</b>: Gom nhóm state updates</li>
  <li><b>Concurrent Rendering</b>: Render không block UI</li>
  <li><b>Suspense SSR</b>: Streaming server rendering</li>
  <li><b>React Compiler</b>: Auto-memoization tại build time</li>
        </ul>

<h3>Khi Reconciliation Thất Bại</h3>
<p>React có thể tạo ra:</p>
<ul>
  <li><b>False Positives</b>: Re-render không cần thiết</li>
  <li><b>False Negatives</b>: Không re-render khi cần</li>
  <li><b>Infinite Loops</b>: State updates liên tục</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Sử dụng key đúng cách trong lists</li>
  <li>Stable function references với useCallback</li>
  <li>Memoization với React.memo, useMemo</li>
  <li>Tránh inline objects/arrays trong render</li>
        </ul>
    `,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Khi nào Virtual DOM trở thành bottleneck?",
    answer: `
<h2>Khi Nào Virtual DOM Trở Thành Bottleneck</h2>
<h3>Các Trường Hợp Virtual DOM Chậm</h3>

<h4>1. DOM Tree Quá Lớn</h4>
<p>Khi ứng dụng có 10k+ elements, việc tạo và diff Virtual DOM tree trở nên tốn kém về memory và CPU.</p>

<h4>2. Updates Thường Xuyên</h4>
<p>Real-time apps (chat, gaming, trading platforms) với updates mỗi giây gây reconciliation overhead liên tục.</p>

<h4>3. Deep Component Trees</h4>
<p>Component trees quá sâu (>10 levels) làm diffing algorithm chậm hơn exponential.</p>

<h4>4. Inefficient Keys</h4>
<p>Không dùng key hoặc dùng index làm key khiến React phải re-mount toàn bộ list thay vì reuse.</p>

<h4>5. Memory Pressure</h4>
<p>Virtual DOM trees lớn tiêu tốn memory, đặc biệt trên mobile devices.</p>

<h3>Giải Pháp Hiện Đại</h3>
<ul>
  <li><b>React Compiler</b>: Auto-memoization tại build time</li>
  <li><b>React Server Components</b>: Reduce client-side DOM manipulation</li>
  <li><b>Virtual Scrolling</b>: Chỉ render visible items (react-window, @tanstack/react-virtual)</li>
  <li><b>Code Splitting</b>: Lazy load components, reduce initial bundle</li>
  <li><b>Windowing</b>: Render only visible portion of large datasets</li>
</ul>

<h3>Alternatives Khi Virtual DOM Không Phù Hợp</h3>
<ul>
  <li><b>Svelte</b>: Compile-time optimization, zero runtime overhead</li>
  <li><b>Vue 3 Composition API</b>: Proxy-based reactivity, efficient updates</li>
  <li><b>Vanilla JS + lit-html</b>: Template literals với efficient diffing</li>
  <li><b>Preact</b>: Lightweight React alternative với smaller bundle</li>
</ul>

<h3>Khi Vẫn Nên Dùng Virtual DOM</h3>
<ul>
  <li>Complex UI logic với nhiều state interactions</li>
  <li>Large development team với established React expertise</li>
  <li>Rich ecosystem và third-party libraries</li>
  <li>SSR/SSG requirements (Next.js, Remix)</li>
</ul>
`,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "React StrictMode dùng để làm gì? Vì sao render 2 lần?",
    answer: `
<h2>React StrictMode: Development Safety Net</h2>
<h3>Mục Đích Chính</h3>
<p>StrictMode là development-only wrapper giúp phát hiện potential bugs và unsafe patterns trong React applications.</p>

<h3>Các Chức Năng Phát Hiện</h3>
<ul>
  <li><b>Side Effects trong Render</b>: Detect impure functions và unexpected mutations</li>
  <li><b>Legacy API Usage</b>: Cảnh báo deprecated methods (findDOMNode, context API cũ)</li>
  <li><b>Unsafe Lifecycle Methods</b>: Phát hiện componentWillMount, componentWillReceiveProps</li>
  <li><b>String Refs</b>: Cảnh báo việc sử dụng string refs thay vì callback/function refs</li>
  <li><b>Unexpected Side Effects</b>: Detect setState trong render, useEffect không có dependencies</li>
</ul>

<h3>Tại Sao Render 2 Lần?</h3>
<p>StrictMode intentionally double-invokes một số functions để expose side effects:</p>
<pre><code>// Development mode với StrictMode
function MyComponent() {
  console.log('Render!'); // Log xuất hiện 2 lần

  // ❌ Side effect trong render - sẽ bị detect
  useState(Math.random()); // Tạo state với random value

  return &lt;div&gt;Hello&lt;/div&gt;;
}
        </code></pre>

<h4>Functions Được Double-invoke</h4>
<ul>
  <li>Component constructors</li>
  <li>render() methods</li>
  <li>useState, useReducer initializers</li>
  <li>useEffect, useLayoutEffect callbacks</li>
</ul>

<h3>Lý Do Double Rendering</h3>
<ul>
  <li><b>Detect Impure Functions</b>: Functions nên return cùng kết quả cho cùng input</li>
  <li><b>Find Side Effects</b>: Phát hiện mutations không mong muốn</li>
  <li><b>Test Cleanup</b>: Đảm bảo cleanup functions hoạt động đúng</li>
  <li><b>Simulate Concurrent Features</b>: Prepare cho React's concurrent rendering</li>
</ul>

<h3>React 18+ Enhancements</h3>
<ul>
  <li><b>Concurrent Rendering Simulation</b>: Test components với interruptible renders</li>
  <li><b>Automatic Batching Detection</b>: Phát hiện unbatched updates</li>
  <li><b>Suspense Integration</b>: Test fallback states và error boundaries</li>
</ul>

<h3>Khi Nên Sử Dụng</h3>
<ul>
  <li>Development environment (tắt trong production)</li>
  <li>Wrap toàn bộ app hoặc specific components</li>
  <li>Kết hợp với React DevTools để debug</li>
</ul>

<h3>Best Practices với StrictMode</h3>
<ul>
  <li>Không dựa vào render count hoặc timing</li>
  <li>Đảm bảo functions pure và predictable</li>
  <li>Sử dụng useEffect đúng cách với dependencies</li>
  <li>Tránh mutations trong render phase</li>
  <li>Cleanup tất cả side effects properly</li>
</ul>

<h3>Performance Impact</h3>
<p>StrictMode chỉ active trong development, không ảnh hưởng production performance.</p>
`,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Hydration error là gì? Nguyên nhân phổ biến?",
    answer: `
<h2>Hydration Errors trong React</h2>

<h2>Hydration Là Gì?</h2>
<p>Hydration là quá trình React attach event handlers và state vào server-rendered HTML.</p>

<h2>Hydration Error</h2>
<p>Xảy ra khi server HTML không match với client-side render, gây "flash" và performance issues.</p>

<h2>Nguyên Nhân Phổ Biến</h2>

<h3>1. Timestamp/Date Differences</h3>
<pre><code>// ❌ Server vs Client khác nhau
&lt;p&gt;{new Date().toString()}&lt;/p&gt;
        </code></pre>

<h3>2. Browser APIs</h3>
<pre><code>// ❌ localStorage undefined trên server
&lt;p&gt;{localStorage.getItem('token')}&lt;/p&gt;
</code></pre>

<h3>3. Random Values</h3>
<pre><code>// ❌ Math.random() khác nhau
&lt;p&gt;Random: {Math.random()}&lt;/p&gt;
</code></pre>

<h3>4. Environment Variables</h3>
<pre><code>// ❌ process.env khác nhau
&lt;p&gt;Env: {process.env.NODE_ENV}&lt;/p&gt;
</code></pre>

<h2>Giải Pháp</h2>
<ul>
  <li><b>useEffect</b>: Client-only logic</li>
  <li><b>dynamic imports</b>: Lazy load components</li>
  <li><b>suppressHydrationWarning</b>: Bỏ qua warnings không quan trọng</li>
  <li><b>Next.js hydrate()</b>: Control hydration timing</li>
</ul>

<h2>Debug Hydration</h2>
<pre><code>// Thêm vào _app.js
useEffect(() => {
  console.log('Hydration complete');
}, []);
</code></pre>
`,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Controlled re-render khác uncontrolled re-render?",
    answer: `
<h2>Controlled vs Uncontrolled Re-renders</h2>

<h2>Controlled Re-render</h2>
<p>Re-render được kiểm soát bởi React, trigger bởi state/props changes theo reconciliation algorithm.</p>

<h3>Khi Nào Xảy Ra</h3>
<ul>
  <li>State update qua setState/useState</li>
  <li>Props change từ parent</li>
  <li>Context value change</li>
  <li>Force update (shouldComponentUpdate)</li>
</ul>

<h2>Uncontrolled Re-render</h2>
<p>Re-render không mong muốn, thường do bugs hoặc anti-patterns.</p>

<h3>Các Nguyên Nhân</h3>
<ul>
  <li><b>New Object/Function</b>: Tạo object mới mỗi render</li>
  <li><b>Inline Functions</b>: () => {} inline</li>
  <li><b>Missing Dependencies</b>: useEffect/useMemo thiếu deps</li>
  <li><b>Parent Re-render</b>: Component cha re-render không cần thiết</li>
</ul>

<h2>Performance Impact</h2>
<table>
  <tr>
    <th>Loại</th>
    <th>Performance</th>
    <th>Predictable</th>
        </tr>
  <tr>
    <td>Controlled</td>
    <td>Có thể optimize</td>
    <td>Cao</td>
        </tr>
        <tr>
    <td>Uncontrolled</td>
    <td>Chậm, wasteful</td>
    <td>Thấp</td>
        </tr>
</table>

<h2>Giải Pháp</h2>
<ul>
  <li><b>useMemo</b>: Memoize expensive calculations</li>
  <li><b>useCallback</b>: Stable function references</li>
  <li><b>React.memo</b>: Prevent unnecessary re-renders</li>
  <li><b>Profiler</b>: Debug re-render causes</li>
</ul>
`,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Khi nào nên tách component, khi nào không?",
    answer: `
<h2>Khi Nào Nên Tách Component</h2>

<h2>Khi NÊN Tách</h2>

<h3>1. Reusability</h3>
<p>Component được sử dụng ở nhiều nơi.</p>

<h3>2. Complexity</h3>
<p>Component quá lớn (>200 lines) hoặc có nhiều responsibilities.</p>

<h3>3. Performance</h3>
<p>Tách để optimize re-renders với React.memo.</p>

<h3>4. Testing</h3>
<p>Dễ test isolated logic.</p>

<h3>5. Maintainability</h3>
<p>Single Responsibility Principle.</p>

<h2>Khi KHÔNG Nên Tách</h2>

<h4>1. Over-Engineering</h4>
<p>Tách component chỉ dùng 1 lần, không phức tạp.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Premature Optimization</h3>
<p>Tách chỉ vì nghĩ sẽ dùng lại sau.</p>

<h3>3. Micro-Components</h3>
<p>Quá nhiều tiny components làm codebase phức tạp.</p>

<h3>4. Tight Coupling</h3>
<p>Components phụ thuộc chặt chẽ lẫn nhau.</p>

<h2>Best Practices 2026</h2>
<ul>
  <li><b>Atomic Design</b>: Atoms → Molecules → Organisms</li>
  <li><b>Composition</b>: Props.children thay vì hard-code</li>
  <li><b>Compound Components</b>: Context-based component groups</li>
  <li><b>React Server Components</b>: Server/client separation</li>
</ul>

<h2>Decision Framework</h2>
<ol>
  <li>Component > 100 lines? → Tách</li>
  <li>Dùng lại ở 2+ nơi? → Tách</li>
  <li>Multiple responsibilities? → Tách</li>
  <li>Complex state logic? → Tách</li>
</ol>
`,
    role: "senior",
    type: "react-rendering",
  },

  // =================== HOOKS NÂNG CAO ===================
  {
    question: "Custom hook có lifecycle riêng không?",
    answer: `
<h2>Custom Hooks và Lifecycle</h2>

<h2>Custom Hooks KHÔNG Có Lifecycle Riêng</h2>
<p>Custom hooks là functions, không phải components. Chúng không có lifecycle methods.</p>

<h3>Tại Sao?</h3>
<ul>
  <li>Hooks chỉ là JavaScript functions</li>
  <li>Không có internal state management</li>
  <li>Không render UI</li>
  <li>Không có mounting/unmounting</li>
</ul>

<h2>Nhưng Có Thể Sử Dụng Hooks Bên Trong</h2>
<pre><code>function useCustomHook() {
  // Có thể dùng useState, useEffect, etc.
  const [state, setState] = useState();
  useEffect(() => {
    // Logic here
  }, []);
  return state;
}
</code></pre>

<h2>Sharing Logic, Not Lifecycle</h2>
<p>Custom hooks share logic giữa components, không phải lifecycle.</p>

<h3>Patterns</h3>
<ul>
  <li><b>Data Fetching</b>: useApi, useQuery</li>
  <li><b>Event Handling</b>: useEventListener</li>
  <li><b>Form Management</b>: useForm</li>
  <li><b>Animation</b>: useSpring</li>
</ul>

<h2>React 18+ Advancements</h2>
<ul>
  <li><b>useDeferredValue</b>: Deferred updates</li>
  <li><b>useTransition</b>: Non-blocking transitions</li>
  <li><b>useId</b>: Unique IDs</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "useEffect vs useLayoutEffect khác nhau thế nào?",
    answer: `
<h2>useEffect vs useLayoutEffect</h2>

<h2>useEffect</h2>
<p>Chạy asynchronously sau khi DOM đã update và browser đã paint.</p>

<h3>Timing</h3>
<ul>
  <li>Sau render và paint</li>
  <li>Non-blocking</li>
  <li>Có thể delay</li>
</ul>

<h3>Use Cases</h3>
<ul>
  <li>API calls</li>
  <li>Subscriptions</li>
  <li>DOM measurements (sau paint)</li>
</ul>

<h2>useLayoutEffect</h2>
<p>Chạy synchronously ngay sau DOM mutations, trước khi browser paint.</p>

<h3>Timing</h3>
<ul>
  <li>Sau DOM update, trước paint</li>
  <li>Blocking</li>
  <li>Immediate execution</li>
</ul>

<h3>Use Cases</h3>
<ul>
  <li>DOM measurements</li>
  <li>Layout calculations</li>
  <li>Prevent visual flickers</li>
</ul>

<h2>Performance Comparison</h2>
<table>
  <tr>
    <th>Hook</th>
    <th>Performance</th>
    <th>Blocking</th>
    <th>Visual Impact</th>
        </tr>
        <tr>
    <td>useEffect</td>
    <td>Faster</td>
    <td>No</td>
    <td>Potential flicker</td>
        </tr>
        <tr>
    <td>useLayoutEffect</td>
    <td>Slower</td>
    <td>Yes</td>
    <td>Smooth</td>
        </tr>
</table>

<h2>Best Practice</h2>
<ul>
  <li>Dùng useEffect mặc định</li>
  <li>Chỉ dùng useLayoutEffect khi cần sync DOM measurements</li>
  <li>Tránh useLayoutEffect nếu không cần thiết</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Vì sao useEffect không đảm bảo thứ tự async?",
    answer: `
<h2>Thứ Tự Async trong useEffect</h2>

<h2>Vấn Đề Thứ Tự</h2>
<p>useEffect không guarantee execution order giữa multiple effects, đặc biệt với async operations.</p>

<h3>Tại Sao?</h3>
<ul>
  <li><b>Concurrent Rendering</b>: React 18+ có thể interrupt renders</li>
  <li><b>Automatic Batching</b>: State updates được batch</li>
  <li><b>Non-deterministic</b>: Network delays, race conditions</li>
</ul>

<h2>Ví Dụ Vấn Đề</h2>
<pre><code>useEffect(() => {
  fetchUser();
}, [userId]);

    useEffect(() => {
  fetchPosts(); // Có thể chạy trước fetchUser!
}, [userId]);
</code></pre>

<h2>Giải Pháp</h2>

<h3>1. Dependency Arrays</h3>
<pre><code>useEffect(() => {
  fetchUser().then(() => {
    fetchPosts(); // Đảm bảo thứ tự
  });
}, [userId]);
</code></pre>

<h3>2. useReducer cho Complex State</h3>
<pre><code>const [state, dispatch] = useReducer(reducer, initialState);
</code></pre>

<h3>3. React Query / SWR</h3>
<p>Quản lý dependencies và caching tự động.</p>

<h3>4. AbortController</h3>
<pre><code>useEffect(() => {
  const controller = new AbortController();
  fetchData({ signal: controller.signal });
  return () => controller.abort();
}, [deps]);
</code></pre>
`,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Closure problem trong hook là gì?",
    answer: `
<h2>Closure Problems trong React Hooks</h2>

<h2>Vấn Đề Closure</h2>
<p>Functions capture variables từ scope khi được tạo, không phải khi được gọi.</p>

<h3>Ví Dụ Classic</h3>
<pre><code>function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Luôn log giá trị cũ!
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps - closure captures initial count = 0

  return &lt;div&gt;{count}&lt;/div&gt;;
}
</code></pre>

<h2>Stale Closure</h2>
<p>Hooks capture stale values từ renders trước.</p>

<h3>Giải Pháp</h3>
<pre><code>// ✅ Thêm count vào dependencies
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // Dùng functional update
  }, 1000);
  return () => clearInterval(timer);
}, []); // Không cần count trong deps khi dùng functional update
</code></pre>

<h2>Common Patterns</h2>
<ul>
  <li><b>Functional Updates</b>: setState(prev => prev + 1)</li>
  <li><b>useRef</b>: Mutable values không trigger re-render</li>
  <li><b>useCallback</b>: Stable function references</li>
</ul>

<h2>React 18+ Solutions</h2>
<ul>
  <li><b>Automatic Batching</b>: Giảm stale closures</li>
  <li><b>useDeferredValue</b>: Deferred updates</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Làm sao tránh stale state?",
    answer: `
<h2>Tránh Stale State trong React</h2>

<h2>Stale State Là Gì?</h2>
<p>State cũ, không phản ánh latest updates do closure hoặc async operations.</p>

<h2>Giải Pháp</h2>

<h3>1. Functional Updates</h3>
<pre><code>// ✅ Luôn dùng latest state
setCount(prevCount => prevCount + 1);
setUser(prevUser => ({ ...prevUser, name }));
</code></pre>

<h3>2. useEffect Dependencies</h3>
<pre><code>// ✅ Include tất cả dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]); // Đừng bỏ userId!
</code></pre>

<h3>3. useRef cho Mutable Values</h3>
<pre><code>const latestValue = useRef(value);
latestValue.current = value; // Always latest
</code></pre>

<h3>4. useCallback với Dependencies</h3>
<pre><code>const callback = useCallback(() => {
  doSomething(latestValue.current);
}, []); // Stable reference
</code></pre>

<h3>5. State Batching</h3>
<pre><code>// React 18 auto-batches
setState(a);
setState(b); // Single re-render
</code></pre>

<h2>Advanced Patterns</h2>
<ul>
  <li><b>useReducer</b>: Complex state logic</li>
  <li><b>Zustand/Jotai</b>: External state management</li>
  <li><b>React Query</b>: Server state caching</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Khi nào nên dùng useReducer thay useState?",
    answer: `
<h2>useReducer vs useState</h2>

<h2>Khi Nên Dùng useReducer</h2>

<h3>1. Complex State Logic</h3>
<p>State có multiple sub-values hoặc interdependent updates.</p>

<pre><code>const [state, dispatch] = useReducer(reducer, initialState);
</code></pre>

<h3>2. Related State Updates</h3>
<p>Nhiều state pieces thay đổi cùng lúc.</p>

<h3>3. Predictable State Transitions</h3>
<p>Cần business logic phức tạp trong state updates.</p>

<h3>4. Performance với Deep Updates</h3>
<p>State objects lớn, cần avoid re-renders.</p>

<h2>Khi Dùng useState</h2>

<h4>1. Simple State</h4>
<p>Primitive values: string, number, boolean.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Independent Updates</h3>
<p>State không liên quan lẫn nhau.</p>

<h3>3. No Complex Logic</h3>
<p>Không cần validation hoặc side effects.</p>

<h2>Comparison</h2>
<table>
  <tr>
    <th>Aspect</th>
    <th>useState</th>
    <th>useReducer</th>
  </tr>
  <tr>
    <td>Boilerplate</td>
    <td>Low</td>
    <td>High</td>
  </tr>
  <tr>
    <td>Testability</td>
    <td>Low</td>
    <td>High</td>
  </tr>
  <tr>
    <td>Debugging</td>
    <td>Easy</td>
    <td>Harder</td>
  </tr>
</table>

<h2>Best Practice</h2>
<ul>
  <li>Bắt đầu với useState</li>
  <li>Refactor thành useReducer khi logic phức tạp</li>
  <li>Dùng Redux Toolkit cho global state</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },

  // =================== PERFORMANCE & TỐI ƯU ===================
  {
    question: "Đo performance React bằng cách nào?",
    answer: `
<h2>Đo Performance React Apps</h2>

<h2>Built-in Tools</h2>

<h3>1. React DevTools Profiler</h3>
<ul>
  <li>Record component renders</li>
  <li>Identify slow components</li>
  <li>Flame graph visualization</li>
</ul>

<h3>2. React.Profiler API</h3>
<pre><code>&lt;Profiler id="App" onRender={callback}&gt;
  &lt;App /&gt;
&lt;/Profiler&gt;
</code></pre>

<h2>Browser Tools</h2>

<h3>1. Chrome DevTools</h3>
<ul>
  <li>Performance tab: Record runtime</li>
  <li>Memory tab: Detect leaks</li>
  <li>Network tab: Loading performance</li>
</ul>

<h3>2. Lighthouse</h3>
<ul>
  <li>Automated performance audit</li>
  <li>Core Web Vitals</li>
  <li>Accessibility scores</li>
</ul>

<h2>Third-party Tools</h2>

<h3>1. Web Vitals Library</h3>
<pre><code>import { getCLS, getFID, getFCP } from 'web-vitals';</code></pre>

<h3>2. React Query DevTools</h3>
<p>Monitor API calls và caching.</p>

<h3>3. Bundle Analyzer</h3>
<pre><code>npm install --save-dev webpack-bundle-analyzer</code></pre>

<h2>Metrics 2026</h2>
<ul>
  <li><b>Core Web Vitals</b>: LCP, FID, CLS</li>
  <li><b>React Metrics</b>: Render time, re-render count</li>
  <li><b>Bundle Size</b>: First load JS</li>
  <li><b>Runtime Performance</b>: Main thread blocking</li>
</ul>
`,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Khi nào memo hóa gây phản tác dụng?",
    answer: `
<h2>Khi Nào Memoization Gây Phản Tác Dụng</h2>

<h2>Memoization Overhead</h2>
<p>Memoization có cost: memory và comparison time.</p>

<h3>Khi KHÔNG Nên Memoize</h3>

<h4>1. Cheap Calculations</h4>
<pre><code>// ❌ Không cần memo
const total = items.reduce((sum, item) => sum + item.price, 0);
</code></pre>

<h4>2. Primitive Values</h4>
<pre><code>// ❌ So sánh nhanh hơn tính toán
const doubled = count * 2;
</code></pre>

<h4>3. Unstable Dependencies</h4>
<pre><code>// ❌ Dependencies thay đổi liên tục
useMemo(() => compute(date), [date]); // date object mới mỗi render
</code></pre>

<h4>4. Large Objects</h4>
<pre><code>// ❌ Reference equality chậm
const config = useMemo(() => ({ theme, locale }), [theme, locale]);
</code></pre>

<h2>Premature Optimization</h2>
<p>80% performance issues không phải từ memoization thiếu.</p>

<h3>Better Solutions</h3>
<ul>
  <li><b>Structural Sharing</b>: Immer, immutable.js</li>
  <li><b>Component Splitting</b>: Isolate expensive components</li>
  <li><b>Lazy Loading</b>: Code splitting</li>
  <li><b>Virtual Scrolling</b>: Large lists</li>
</ul>

<h2>React 19+ Improvements</h2>
<ul>
  <li><b>React Compiler</b>: Auto-memoization</li>
  <li><b>Zero-cost memoization</b>: Compiler optimizations</li>
</ul>
`,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Render blocking vs non-blocking khác nhau thế nào?",
    answer: `
<h2>Render Blocking vs Non-blocking</h2>

<h2>Render Blocking</h2>
<p>Operations chặn UI updates, làm app feel laggy.</p>

<h3>Examples</h3>
<ul>
  <li><b>Heavy Calculations</b>: Synchronous loops</li>
  <li><b>useLayoutEffect</b>: Blocks painting</li>
  <li><b>Long-running Tasks</b>: Blocking main thread</li>
    </ul>
    
<h2>Non-blocking Rendering</h2>
<p>Operations không chặn UI, user interaction vẫn smooth.</p>

<h3>React 18+ Features</h3>
<ul>
  <li><b>Concurrent Rendering</b>: Interruptible renders</li>
  <li><b>useTransition</b>: Non-urgent updates</li>
  <li><b>useDeferredValue</b>: Deferred computations</li>
</ul>

<h2>Implementation</h2>

<h3>Blocking</h3>
<pre><code>function SlowComponent() {
  const result = expensiveCalculation(); // Blocks render
  return &lt;div&gt;{result}&lt;/div&gt;;
}
</code></pre>

<h3>Non-blocking</h3>
<pre><code>function FastComponent() {
  const [result, setResult] = useState();
  useEffect(() => {
    expensiveCalculation().then(setResult); // Non-blocking
  }, []);
  return &lt;div&gt;{result}&lt;/div&gt;;
}
    </code></pre>
    
<h2>Best Practices</h2>
<ul>
  <li>Dùng Suspense cho async operations</li>
  <li>Debounce/throttle user input</li>
  <li>Web Workers cho heavy computations</li>
  <li>Virtual scrolling cho large lists</li>
    </ul>
    `,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "useTransition giải quyết vấn đề gì?",
    answer: `
<h2>useTransition - Non-blocking State Updates</h2>

<h2>Vấn Đề Nó Giải Quyết</h2>
<p>Heavy state updates block UI, làm app unresponsive.</p>

<h3>Trước useTransition</h3>
<pre><code>function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setResults(search(e.target.value)); // Blocks UI!
  };
}
</code></pre>

<h2>Cách useTransition Hoạt Động</h2>
<pre><code>import { useTransition } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      setResults(search(e.target.value)); // Non-blocking!
    });
  };
}
</code></pre>

<h2>Benefits</h2>
<ul>
  <li><b>Responsive UI</b>: Input vẫn smooth</li>
  <li><b>Loading States</b>: isPending flag</li>
  <li><b>Concurrent Rendering</b>: React prioritize urgent updates</li>
</ul>

<h2>Use Cases</h2>
<ul>
  <li>Search/filter operations</li>
  <li>Page navigation</li>
  <li>Tab switching</li>
  <li>Form submissions</li>
</ul>

<h2>React 18+ Integration</h2>
<p>Works with Suspense và concurrent features.</p>
`,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Khi nào nên dùng virtualization?",
    answer: `
<h2>Virtualization trong React Apps</h2>

<h2>Khi Nên Dùng</h2>

<h4>1. Large Lists</h4>
<p>Hiển thị 1000+ items mà không lag.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Infinite Scroll</h3>
<p>Load more data khi user scroll.</p>

<h3>3. Table Grids</h3>
<p>Spreadsheet-like interfaces.</p>

<h3>4. Chat Applications</h3>
<p>Message history dài.</p>

<h2>Popular Libraries</h2>

<h3>react-window</h3>
<pre><code>import { FixedSizeList as List } from 'react-window';

&lt;List
  height={150}
  itemCount={1000}
  itemSize={35}
&gt;
  {({ index, style }) => &lt;div style={style}&gt;Row {index}&lt;/div&gt;}
&lt;/List&gt;
</code></pre>

<h3>react-virtualized</h3>
<p>More features, heavier bundle.</p>

<h3>@tanstack/react-virtual</h3>
<p>Modern, tree-shakable.</p>

<h2>Performance Benefits</h2>
<ul>
  <li><b>Memory</b>: Chỉ render visible items</li>
  <li><b>DOM Nodes</b>: Reduce từ 1000+ xuống ~10</li>
  <li><b>Scroll Performance</b>: Smooth scrolling</li>
</ul>

<h2>When NOT to Use</h2>
<ul>
  <li>Small lists (&lt;100 items)</li>
  <li>Simple static content</li>
  <li>SEO-critical content</li>
  <li>Mobile-first designs</li>
</ul>
`,
    role: "senior",
    type: "performance-optimization",
  },
  {
    question: "Bạn debug re-render thực tế bằng công cụ gì?",
    answer: `
<h2>Debug Re-renders trong React</h2>

<h2>React DevTools</h2>

<h3>1. Profiler Tab</h3>
<ul>
  <li>Record component renders</li>
  <li>Flame graph với commit times</li>
  <li>Identify wasteful re-renders</li>
</ul>

<h3>2. Components Tab</h3>
<ul>
  <li>Highlight re-renders</li>
  <li>Props/state changes</li>
  <li>Component hierarchy</li>
</ul>

<h2>Custom Debugging</h2>

<h3>1. useWhyDidYouUpdate</h3>
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
</code></pre>

<h3>2. React.memo với Logging</h3>
<pre><code>const Component = React.memo((props) => {
  console.log('Component rendered', props);
  return &lt;div&gt;...&lt;/div&gt;;
});
</code></pre>

<h2>Performance Monitoring</h2>

<h3>1. Web Vitals</h3>
<pre><code>import { getCLS, getFID, getFCP } from 'web-vitals';
getCLS(console.log);
</code></pre>

<h3>2. React Profiler API</h3>
<pre><code>&lt;Profiler id="App" onRender={(...data) => console.log(data)}&gt;
  &lt;App /&gt;
&lt;/Profiler&gt;
</code></pre>
`,
    role: "senior",
    type: "performance-optimization",
  },

  // =================== DATA FETCHING & SERVER STATE ===================
  {
    question: "Server state khác client state ở điểm nào?",
    answer: `
<h2>Server State vs Client State</h2>

<h2>Server State</h2>
<p>Data stored on server, accessed via APIs.</p>

<h3>Characteristics</h3>
<ul>
  <li><b>Asynchronous</b>: Network requests</li>
  <li><b>Uncontrolled</b>: Multiple users modify</li>
  <li><b>Stale</b>: May be outdated</li>
  <li><b>Shared</b>: Accessible by multiple clients</li>
</ul>

<h3>Examples</h3>
<ul>
  <li>User profiles</li>
  <li>Product catalogs</li>
  <li>Chat messages</li>
  <li>Real-time data</li>
</ul>

<h2>Client State</h2>
<p>Data local to browser session.</p>

<h3>Characteristics</h3>
<ul>
  <li><b>Synchronous</b>: Immediate access</li>
  <li><b>Controlled</b>: User has full control</li>
  <li><b>Fresh</b>: Always current</li>
  <li><b>Private</b>: Per-user session</li>
</ul>

<h3>Examples</h3>
<ul>
  <li>Form inputs</li>
  <li>UI state (modals, tabs)</li>
  <li>Local preferences</li>
  <li>Offline data</li>
</ul>

<h2>Management Strategies</h2>
<table>
  <tr>
    <th>State Type</th>
    <th>Tool</th>
    <th>Concerns</th>
        </tr>
  <tr>
    <td>Server</td>
    <td>React Query/SWR</td>
    <td>Cache invalidation, race conditions</td>
        </tr>
        <tr>
    <td>Client</td>
    <td>useState/useReducer</td>
    <td>State management, persistence</td>
        </tr>
</table>
`,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "Khi nào React Query không phù hợp?",
    answer: `
<h2>Khi Nào KHÔNG Dùng React Query</h2>

<h2>Không Phù Hợp Với</h2>

<h3>1. Simple Apps</h3>
<p>Apps với ít API calls, không cần caching.</p>

<h3>2. Real-time Requirements</h3>
<p>WebSocket-based apps, polling mỗi giây.</p>

<h3>3. Complex State Logic</h3>
<p>Server state tightly coupled với complex client state.</p>

<h3>4. Legacy Codebases</h3>
<p>Existing Redux/Saga setup, migration cost cao.</p>

<h3>5. SEO-critical Apps</h3>
<p>Next.js với Server Components, không cần client-side fetching.</p>

<h2>Alternatives</h2>

<h4>1. SWR</h4>
<p>Lighter, focus on simplicity.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Redux Toolkit Query</h3>
<p>Nếu đã dùng Redux.</p>

<h3>3. Apollo Client</h3>
<p>GraphQL-first apps.</p>

<h3>4. Custom Hooks</h3>
<p>Simple useEffect + useState.</p>

<h2>When React Query Shines</h2>
<ul>
  <li><b>Data-heavy apps</b>: Many API endpoints</li>
  <li><b>Complex caching</b>: Background updates</li>
  <li><b>Optimistic updates</b>: Immediate UI feedback</li>
  <li><b>Error handling</b>: Retry logic</li>
</ul>
`,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "RTK Query vs React Query chọn cái nào cho team lớn?",
    answer: `
<h2>RTK Query vs React Query</h2>

<h2>RTK Query (Redux Toolkit)</h2>

<h3>Pros</h3>
<ul>
  <li><b>Redux Integration</b>: Seamless với existing Redux</li>
  <li><b>Type Safety</b>: TypeScript-first</li>
  <li><b>Caching</b>: Normalized cache</li>
  <li><b>Middleware</b>: Redux DevTools integration</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>Boilerplate</b>: More setup code</li>
  <li><b>Learning Curve</b>: Redux knowledge required</li>
  <li><b>Bundle Size</b>: Larger than React Query</li>
</ul>

<h2>React Query</h2>

<h3>Pros</h3>
<ul>
  <li><b>Simplicity</b>: Easy to learn</li>
  <li><b>Developer Experience</b>: Great DX</li>
  <li><b>Features</b>: Background refetch, offline</li>
  <li><b>Community</b>: Large ecosystem</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>Less Opinionated</b>: More decisions to make</li>
  <li><b>TypeScript</b>: Less strict than RTK</li>
</ul>

<h2>Team Size Considerations</h2>

<h3>Large Teams</h3>
<ul>
  <li><b>RTK Query</b>: Consistent patterns, type safety</li>
  <li><b>React Query</b>: Faster development, less boilerplate</li>
</ul>

<h3>Decision Factors</h3>
<ul>
  <li>Existing Redux usage → RTK Query</li>
  <li>New project → React Query</li>
  <li>TypeScript heavy → RTK Query</li>
  <li>Prototyping → React Query</li>
</ul>
`,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "Cache invalidation khó ở chỗ nào?",
    answer: `
<h2>Cache Invalidation Challenges</h2>

<h2>Complexity Areas</h2>

<h4>1. Time-based Invalidation</h4>
<p>Khi nào data "stale"? 5 phút? 1 giờ?</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Dependent Data</h3>
<p>Update user → invalidate posts? comments?</p>

<h3>3. Optimistic Updates</h3>
<p>Show changes immediately, rollback on failure.</p>

<h3>4. Background Sync</h3>
<p>Sync changes across multiple tabs/devices.</p>

<h3>5. Race Conditions</h3>
<p>Multiple updates cùng lúc gây conflicts.</p>

<h2>Strategies</h2>

<h3>1. Time-based</h3>
<pre><code>// React Query
useQuery('posts', fetchPosts, {
  staleTime: 5 * 60 * 1000, // 5 minutes
});
</code></pre>

<h3>2. Event-based</h3>
<pre><code>// Invalidate on mutations
queryClient.invalidateQueries('posts');
</code></pre>

<h3>3. Tag-based</h3>
<pre><code>// RTK Query
providesTags: ['Post'],
invalidatesTags: ['Post']
</code></pre>

<h2>Advanced Patterns</h2>
<ul>
  <li><b>Polling</b>: Regular background fetches</li>
  <li><b>WebSockets</b>: Real-time invalidation</li>
  <li><b>Focus refetch</b>: Refetch on tab focus</li>
</ul>
`,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "Khi nào nên fetch ở server (Next.js), khi nào ở client?",
    answer: `
<h2>Server vs Client Data Fetching</h2>

<h2>Server-Side Fetching (Next.js)</h2>

<h3>Khi Nên Dùng</h3>
<ul>
  <li><b>SEO</b>: Content cần index</li>
  <li><b>Performance</b>: Reduce client bundle</li>
  <li><b>Security</b>: Hide API keys</li>
  <li><b>Initial Load</b>: Critical data</li>
</ul>

<h3>Methods</h3>
<ul>
  <li><b>getServerSideProps</b>: SSR</li>
  <li><b>getStaticProps</b>: SSG</li>
  <li><b>Server Components</b>: React 18+</li>
</ul>

<h2>Client-Side Fetching</h2>

<h3>Khi Nên Dùng</h3>
<ul>
  <li><b>User-specific</b>: Authenticated content</li>
  <li><b>Interactive</b>: Search, filters</li>
  <li><b>Real-time</b>: Live updates</li>
  <li><b>After Interaction</b>: Lazy loading</li>
</ul>

<h3>Methods</h3>
<ul>
  <li><b>useEffect</b>: Simple fetching</li>
  <li><b>React Query</b>: Advanced caching</li>
  <li><b>SWR</b>: Lightweight option</li>
</ul>

<h2>Hybrid Approach</h2>
<pre><code>// Server Component
export default function Page() {
  return (
    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
      &lt;ClientPosts /&gt; // Client component fetches
    &lt;/Suspense&gt;
  );
}
</code></pre>

<h2>Performance Trade-offs</h2>
<table>
  <tr>
    <th>Aspect</th>
    <th>Server</th>
    <th>Client</th>
  </tr>
  <tr>
    <td>SEO</td>
    <td>Good</td>
    <td>Poor</td>
  </tr>
  <tr>
    <td>Interactivity</td>
    <td>Poor</td>
    <td>Good</td>
  </tr>
</table>
`,
    role: "senior",
    type: "data-fetching",
  },

  // =================== STATE MANAGEMENT & KIẾN TRÚC ===================
  {
    question: "Vì sao Redux dùng one-way data flow?",
    answer: `
<h2>One-way Data Flow trong Redux</h2>

<h2>Tại Sao One-way?</h2>
<p>Giúp state predictable, debuggable, testable.</p>

<h3>Problems with Two-way Binding</h3>
<ul>
  <li><b>Unpredictable</b>: Hard to track changes</li>
  <li><b>Cascade Updates</b>: Infinite loops</li>
  <li><b>Race Conditions</b>: Concurrent modifications</li>
  <li><b>Debugging</b>: Hard to trace bugs</li>
</ul>

<h2>Redux Flow</h2>
<ol>
  <li><b>Action</b>: Describe what happened</li>
  <li><b>Dispatch</b>: Send action to store</li>
  <li><b>Reducer</b>: Pure function updates state</li>
  <li><b>Subscribe</b>: UI re-renders</li>
</ol>

<h3>Benefits</h3>
<ul>
  <li><b>Predictable</b>: State = f(previousState, action)</li>
  <li><b>Debuggable</b>: Action log = bug reproduction</li>
  <li><b>Testable</b>: Pure functions dễ test</li>
  <li><b>Time Travel</b>: Redux DevTools</li>
</ul>

<h2>Modern Alternatives</h2>
<ul>
  <li><b>Zustand</b>: Simpler API, same benefits</li>
  <li><b>Jotai</b>: Atomic state management</li>
  <li><b>Recoil</b>: React-native state</li>
</ul>

<h2>2026 Updates</h2>
<p>React Server Components + one-way flow vẫn relevant.</p>
`,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Redux Toolkit có thực sự immutable không?",
    answer: `
<h2>Immutability trong Redux Toolkit</h2>

<h2>Có, Nhưng Có Nuances</h2>
<p>RTK sử dụng Immer internally để enable "mutable" syntax trong reducers.</p>

<h3>Under the Hood</h3>
<pre><code>// What you write
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // "Mutation"
    },
  },
});

// What Immer does
state.push(action.payload); // Creates new immutable state
</code></pre>

<h2>Immer's Magic</h2>
<p>Immer tạo proxy, track changes, produce immutable copy.</p>

<h3>Performance</h3>
<ul>
  <li><b>Structural Sharing</b>: Unchanged parts shared</li>
  <li><b>Lazy Cloning</b>: Only clone when modified</li>
  <li><b>Efficient</b>: Better than manual spread operators</li>
</ul>

<h2>Edge Cases</h2>
<ul>
  <li><b>Direct Mutations</b>: Immer may miss complex cases</li>
  <li><b>Large Objects</b>: Deep cloning expensive</li>
  <li><b>Date Objects</b>: Need special handling</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Use Immer syntax in RTK</li>
  <li>Manual immutable updates for complex logic</li>
  <li>Test reducers thoroughly</li>
</ul>
`,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Khi nào global state trở thành anti-pattern?",
    answer: `
<h2>Khi Nào Global State Là Anti-pattern</h2>

<h2>Warning Signs</h2>

<h4>1. Tight Coupling</h4>
<p>Components phụ thuộc chặt chẽ vào global state structure.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Prop Drilling Workarounds</h3>
<p>Dùng global state chỉ để avoid pass props.</p>

<h3>3. State Hoarding</h3>
<p>Everything in global state "just in case".</p>

<h3>4. Cross-cutting Concerns</h3>
<p>UI state mixed với business logic.</p>

<h3>5. Zombie State</h3>
<p>State tồn tại sau khi component unmount.</p>

<h2>Better Alternatives</h2>

<h3>1. Component State</h3>
<pre><code>// Local state cho local concerns
const [isOpen, setIsOpen] = useState(false);
</code></pre>

<h3>2. Context for Themes</h3>
<pre><code>// Theme, locale - rarely change
const ThemeContext = createContext();
</code></pre>

<h3>3. URL State</h3>
<pre><code>// Search params, filters
const [searchParams] = useSearchParams();
</code></pre>

<h3>4. Server State</h3>
<p>Use React Query cho API data.</p>

<h2>Red Flags</h2>
<ul>
  <li>Global state > 50% của total state</li>
  <li>Components re-render khi unrelated state changes</li>
  <li>Hard to test components independently</li>
  <li>State structure changes break many components</li>
</ul>
`,
    role: "senior",
    type: "state-management",
  },
  {
    question: "So sánh Redux vs Zustand vs Jotai trong dự án lớn",
    answer: `
<h2>Redux vs Zustand vs Jotai</h2>

<h2>Redux</h2>

<h3>Pros</h3>
<ul>
  <li><b>Ecosystem</b>: RTK Query, DevTools</li>
  <li><b>Patterns</b>: Well-established</li>
  <li><b>Debugging</b>: Time travel debugging</li>
  <li><b>Team Size</b>: Scales well</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>Boilerplate</b>: Lots of code</li>
  <li><b>Learning Curve</b>: Steep</li>
  <li><b>Bundle Size</b>: Heavy</li>
</ul>

<h2>Zustand</h2>

<h3>Pros</h3>
<ul>
  <li><b>Simplicity</b>: Minimal API</li>
  <li><b>TypeScript</b>: Great support</li>
  <li><b>Performance</b>: Selective subscriptions</li>
  <li><b>Size</b>: Very lightweight</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>Less Structure</b>: More freedom = more mistakes</li>
  <li><b>Community</b>: Smaller than Redux</li>
</ul>

<h2>Jotai</h2>

<h3>Pros</h3>
<ul>
  <li><b>Atomic</b>: Fine-grained reactivity</li>
  <li><b>React-like</b>: useState semantics</li>
  <li><b>Concurrent</b>: React 18 friendly</li>
  <li><b>Flexible</b>: Mix patterns</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>New Paradigm</b>: Different mental model</li>
  <li><b>Debugging</b>: Less tooling</li>
  <li><b>Adoption</b>: Niche</li>
</ul>

<h2>For Large Projects</h2>
<ul>
  <li><b>Redux</b>: Established teams, complex apps</li>
  <li><b>Zustand</b>: Balance simplicity & features</li>
  <li><b>Jotai</b>: Innovative, small teams</li>
</ul>
`,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Context performance issue xử lý thế nào?",
    answer: `
<h2>Context Performance Issues</h2>

<h2>Vấn Đề</h2>
<p>Context re-renders all consumers khi value thay đổi.</p>

<h3>Common Issues</h3>
<ul>
  <li><b>Large Objects</b>: {...props} triggers re-render</li>
  <li><b>Inline Objects</b>: {theme: {}} mỗi render</li>
  <li><b>Unnecessary Consumers</b>: Components subscribe không cần</li>
</ul>

<h2>Giải Pháp</h2>

<h3>1. Split Contexts</h3>
<pre><code>// ❌ Single large context
const AppContext = createContext({ user, theme, settings });

// ✅ Multiple contexts
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
</code></pre>

<h3>2. useMemo Values</h3>
<pre><code>const contextValue = useMemo(() => ({
  user,
  updateUser,
}), [user, updateUser]);
</code></pre>

<h3>3. Context Selectors</h3>
<pre><code>const SelectedUser = () => {
  const user = useContextSelector(UserContext, s => s.user);
  // Chỉ re-render khi user thay đổi
};
</code></pre>

<h3>4. State Colocation</h3>
<p>Keep state close to components that use it.</p>

<h2>Alternatives</h2>
<ul>
  <li><b>Zustand</b>: Selective subscriptions</li>
  <li><b>Jotai</b>: Atomic state</li>
  <li><b>Recoil</b>: Atom-based</li>
</ul>
`,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Thiết kế state cho app 50+ screens thế nào?",
    answer: `
<h2>State Architecture cho Large Apps</h2>

<h2>Principles</h2>

<h4>1. Domain-driven Design</h4>
<p>Organize by business domains, not technical layers.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. State Proximity</h3>
<p>State close to components that use it.</p>

<h3>3. Single Source of Truth</h3>
<p>Avoid state duplication.</p>

<h2>Layered Architecture</h2>

<h3>1. Component State</h3>
<ul>
  <li>UI state: modals, forms, loading</li>
  <li>Local component concerns</li>
</ul>

<h3>2. Page State</h3>
<ul>
  <li>Route-specific data</li>
  <li>Search filters, pagination</li>
</ul>

<h3>3. Global State</h3>
<ul>
  <li>User authentication</li>
  <li>App configuration</li>
  <li>Cross-cutting concerns</li>
</ul>

<h3>4. Server State</h3>
<ul>
  <li>API data with React Query</li>
  <li>Cached, synchronized</li>
</ul>

<h2>Tools & Patterns</h2>

<h3>State Management</h3>
<ul>
  <li><b>Zustand</b>: Simple global state</li>
  <li><b>React Query</b>: Server state</li>
  <li><b>Context</b>: Theme, config</li>
</ul>

<h3>Organization</h3>
<pre><code>src/
  features/     # Domain-based
    auth/
    products/
    cart/
  shared/       # Cross-cutting
    ui/
    utils/
</code></pre>
`,
    role: "senior",
    type: "state-management",
  },

  // =================== AUTH & SECURITY ===================
  {
    question: "XSS có bypass React escape không?",
    answer: `
<h2>XSS và React Escaping</h2>

<h2>React's Built-in Protection</h2>
<p>React automatically escapes content trong JSX.</p>

<h3>Safe by Default</h3>
<pre><code>// ✅ Auto-escaped
const content = "&lt;script&gt;alert('xss')&lt;/script&gt;";
return &lt;div&gt;{content}&lt;/div&gt;; // Renders as text
</code></pre>

<h2>Vulnerable Patterns</h2>

<h3>1. dangerouslySetInnerHTML</h3>
<pre><code>// ❌ Vulnerable
&lt;div dangerouslySetInnerHTML={{ __html: userInput }} /&gt;
</code></pre>

<h3>2. Direct DOM Manipulation</h3>
<pre><code>// ❌ Bypasses React
document.getElementById('myDiv').innerHTML = userInput;
</code></pre>

<h3>3. Links với javascript:</h3>
<pre><code>// ❌ JavaScript URLs
&lt;a href={userInput}&gt;Link&lt;/a&gt; // userInput: "javascript:alert(1)"
</code></pre>

<h2>Bypass Techniques</h2>

<h4>1. React Context</h4>
<p>Malicious components trong context.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Third-party Libraries</h3>
<p>Vulnerable jQuery, etc.</p>

<h3>3. Server-side Rendering</h3>
<p>Unsafe server-rendered content.</p>

<h2>Protection Strategies</h2>
<ul>
  <li><b>Content Security Policy</b>: CSP headers</li>
  <li><b>Sanitize Libraries</b>: DOMPurify</li>
  <li><b>Input Validation</b>: Server-side</li>
  <li><b>Trusted Types</b>: Browser API</li>
</ul>
`,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "CSRF xảy ra trong SPA khi nào?",
    answer: `
<h2>CSRF trong Single Page Applications</h2>

<h2>CSRF Là Gì?</h2>
<p>Cross-Site Request Forgery: Attacker tricks user vào send unwanted requests.</p>

<h2>SPA Vulnerabilities</h2>

<h4>1. API Calls</h4>
<p>Modern SPAs call APIs directly, CSRF possible nếu API không protect.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Cookies with APIs</h3>
<pre><code>// Vulnerable setup
fetch('/api/user', {
  credentials: 'include' // Sends cookies
});
</code></pre>

<h3>3. No Server-side Rendering</h3>
<p>Traditional CSRF tokens hard to implement.</p>

<h2>Common Attack Vectors</h2>

<h3>1. Form Submissions</h3>
<pre><code>// Hidden form on malicious site
&lt;form action="https://app.com/api/transfer" method="POST"&gt;
  &lt;input name="to" value="attacker"&gt;
  &lt;input name="amount" value="1000"&gt;
&lt;/form&gt;
</code></pre>

<h3>2. Image Tags</h3>
<pre><code>&lt;img src="https://app.com/api/delete?item=123" /&gt;
</code></pre>

<h2>SPA Protection</h2>

<h3>1. SameSite Cookies</h3>
<pre><code>Set-Cookie: session=abc; SameSite=Strict
</code></pre>

<h3>2. CSRF Tokens</h3>
<pre><code>// Store in httpOnly cookie
// Include in requests
fetch('/api/data', {
  headers: { 'X-CSRF-Token': token }
});
</code></pre>

<h3>3. Origin Checking</h3>
<p>Validate request origin headers.</p>
`,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "SameSite cookie hoạt động thế nào?",
    answer: `
<h2>SameSite Cookie Attribute</h2>

<h2>Cookie Basics</h2>
<p>SameSite controls cross-site request cookie sending.</p>

<h3>Values</h3>
<ul>
  <li><b>Strict</b>: Only same-site requests</li>
  <li><b>Lax</b>: Top-level navigation allowed</li>
  <li><b>None</b>: Cross-site allowed (requires Secure)</li>
</ul>

<h2>How It Works</h2>

<h3>Strict</h3>
<pre><code>// Cookie only sent to same origin
Set-Cookie: session=abc; SameSite=Strict

// ❌ Blocked: &lt;img src="https://example.com/api"&gt;
// ✅ Allowed: Direct navigation to example.com
</code></pre>

<h3>Lax (Default 2026)</h3>
<pre><code>// Allows top-level navigation
Set-Cookie: session=abc; SameSite=Lax

// ✅ Allowed: &lt;a href="https://example.com"&gt;
// ❌ Blocked: &lt;img src="https://example.com/api"&gt;
</code></pre>

<h3>None</h3>
<pre><code>// Cross-site allowed (secure only)
Set-Cookie: session=abc; SameSite=None; Secure
</code></pre>

<h2>CSRF Protection</h2>
<ul>
  <li><b>Strict</b>: Maximum security, may break flows</li>
  <li><b>Lax</b>: Balance security & usability</li>
  <li><b>None</b>: Legacy support, requires HTTPS</li>
</ul>

<h2>Implementation</h2>
<pre><code>// Express.js
res.cookie('session', 'value', {
  sameSite: 'strict', // or 'lax' or 'none'
  secure: true,
  httpOnly: true
});
</code></pre>
`,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "Làm sao secure token trong SSR app?",
    answer: `
<h2>Secure Tokens trong SSR Applications</h2>

<h2>Token Storage Risks</h2>

<h3>1. localStorage</h3>
<ul>
  <li><b>XSS Vulnerable</b>: JavaScript access</li>
  <li><b>No HttpOnly</b>: Client-side only</li>
</ul>

<h3>2. sessionStorage</h3>
<ul>
  <li><b>Tab-specific</b>: Lost on tab close</li>
  <li><b>XSS Vulnerable</b>: Same as localStorage</li>
</ul>

<h3>3. Cookies</h3>
<ul>
  <li><b>CSRF Risk</b>: Automatic sending</li>
  <li><b>Size Limits</b>: 4KB restriction</li>
</ul>

<h2>Secure Patterns</h2>

<h3>1. HttpOnly Cookies</h3>
<pre><code>// Server sets httpOnly cookie
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
</code></pre>

<h3>2. Refresh Token Rotation</h3>
<pre><code>// Short-lived access token
// Long-lived refresh token (httpOnly)
const tokens = generateTokens();
res.cookie('refreshToken', tokens.refresh, {
  httpOnly: true,
  secure: true
});
</code></pre>

<h3>3. Token in Memory</h3>
<pre><code>// Store in React state/memory
// Not persisted across refreshes
const [token, setToken] = useState();
</code></pre>

<h2>SSR Considerations</h2>

<h3>1. Hydration Safety</h3>
<pre><code>// Don't expose tokens in SSR
const isServer = typeof window === 'undefined';
const token = isServer ? null : localStorage.getItem('token');
</code></pre>

<h3>2. Server-side Auth</h3>
<pre><code>// Use cookies for SSR auth
export async function getServerSideProps({ req }) {
  const token = req.cookies.accessToken;
  // Validate server-side
}
</code></pre>
`,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "Role-based vs permission-based auth?",
    answer: `
<h2>Role-based vs Permission-based Authorization</h2>

<h2>Role-Based Access Control (RBAC)</h2>

<h3>How It Works</h3>
<ul>
  <li>Users assigned to roles (admin, editor, viewer)</li>
  <li>Roles have predefined permissions</li>
  <li>Simple to implement and understand</li>
</ul>

<h3>Example</h3>
<pre><code>const user = { role: 'editor' };
if (user.role === 'admin' || user.role === 'editor') {
  // Allow edit
}
</code></pre>

<h3>Pros</h3>
<ul>
  <li><b>Simple</b>: Easy to implement</li>
  <li><b>Scalable</b>: Add users to roles</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>Rigid</b>: Hard to customize permissions</li>
  <li><b>Role Explosion</b>: Too many roles</li>
</ul>

<h2>Permission-Based (PBAC/ABAC)</h2>

<h3>How It Works</h3>
<ul>
  <li>Users have individual permissions</li>
  <li>Context-aware decisions</li>
  <li>Granular control</li>
</ul>

<h3>Example</h3>
<pre><code>const user = { permissions: ['post:read', 'post:create'] };
if (user.permissions.includes('post:delete')) {
  // Allow delete
}
</code></pre>

<h3>Pros</h3>
<ul>
  <li><b>Flexible</b>: Fine-grained control</li>
  <li><b>Dynamic</b>: Context-based decisions</li>
</ul>

<h3>Cons</h3>
<ul>
  <li><b>Complex</b>: Harder to manage</li>
  <li><b>Performance</b>: Permission checks everywhere</li>
</ul>

<h2>When to Use</h2>
<ul>
  <li><b>RBAC</b>: Small apps, simple requirements</li>
  <li><b>PBAC</b>: Large apps, complex authorization</li>
  <li><b>Hybrid</b>: Best of both worlds</li>
</ul>
`,
    role: "senior",
    type: "auth-security",
  },

  // =================== TESTING & QUALITY ===================
  {
    question: "Test pyramid là gì?",
    answer: `
<h2>Testing Pyramid</h2>

<h2>Cấu Trúc</h2>
<p>Testing strategy với different types ở different levels.</p>

<h3>1. Unit Tests (Bottom)</h3>
<ul>
  <li><b>Most Numerous</b>: 70% of tests</li>
  <li><b>Fast</b>: Run in milliseconds</li>
  <li><b>Isolated</b>: Test individual functions</li>
</ul>

<h3>2. Integration Tests (Middle)</h3>
<ul>
  <li><b>Medium Coverage</b>: 20% of tests</li>
  <li><b>Moderate Speed</b>: Test component interactions</li>
  <li><b>Real Dependencies</b>: Test with actual DB/API</li>
</ul>

<h3>3. E2E Tests (Top)</h3>
<ul>
  <li><b>Fewest Tests</b>: 10% of tests</li>
  <li><b>Slowest</b>: Full user journeys</li>
  <li><b>End-to-End</b>: Test complete workflows</li>
</ul>

<h2>React Testing</h2>

<h3>Unit Tests</h3>
<pre><code>// Jest + React Testing Library
test('renders learn react link', () => {
  render(&lt;App /&gt;);
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
</code></pre>

<h3>Integration Tests</h3>
<pre><code>// Test component + API
test('fetches and displays users', async () => {
  render(&lt;UserList /&gt;);
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
</code></pre>

<h3>E2E Tests</h3>
<pre><code>// Cypress/Playwright
it('completes user registration', () => {
  cy.visit('/register');
  cy.get('[data-cy=name]').type('John');
  cy.get('[data-cy=submit]').click();
});
</code></pre>
`,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Khi nào không nên viết unit test?",
    answer: `
<h2>Khi Nào KHÔNG Viết Unit Tests</h2>

<h2>Không Worth It</h2>

<h4>1. Third-party Code</h4>
<p>Testing library code (React, Lodash) - họ đã test.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Simple Getters/Setters</h3>
<pre><code>// ❌ Trivial
const user = { name: 'John' };
expect(user.name).toBe('John');
</code></pre>

<h3>3. UI Libraries</h3>
<p>Testing Material-UI components - vendor responsibility.</p>

<h3>4. Generated Code</h3>
<p>API clients, GraphQL types - auto-generated.</p>

<h3>5. Configuration</h3>
<p>Testing webpack config, environment setup.</p>

<h2>Focus on Value</h2>

<h3>Test Business Logic</h3>
<pre><code>// ✅ Business rules
const calculateTax = (income, brackets) => { /* complex logic */ };
</code></pre>

<h3>Test Error Handling</h3>
<pre><code>// ✅ Edge cases
expect(() => divide(1, 0)).toThrow();
</code></pre>

<h3>Test Integration Points</h3>
<pre><code>// ✅ Component + hook integration
const { result } = renderHook(() => useCustomHook());
</code></pre>

<h2>ROI Considerations</h2>
<ul>
  <li><b>High Risk</b>: Critical business logic</li>
  <li><b>Frequent Changes</b>: Core features</li>
  <li><b>Complex Logic</b>: Algorithms, calculations</li>
</ul>

<h2>Alternative Testing</h2>
<ul>
  <li><b>Integration Tests</b>: For complex flows</li>
  <li><b>E2E Tests</b>: For critical user journeys</li>
  <li><b>Manual Testing</b>: For UI polish</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Mock quá nhiều có hại không?",
    answer: `
<h2>Mocking Overuse trong Testing</h2>

<h2>Rủi Ro Của Quá Nhiều Mocks</h2>

<h4>1. False Confidence</h4>
<p>Tests pass nhưng production fails do mock ≠ real implementation.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. Maintenance Burden</h3>
<p>Mocks break khi code changes, leading to test maintenance hell.</p>

<h3>3. Missing Integration Bugs</h3>
<p>Mocks hide integration issues between components.</p>

<h3>4. Test Brittleness</h3>
<p>Tests fail on irrelevant changes.</p>

<h2>Mock Wisely</h2>

<h3>Good Mocks</h3>
<ul>
  <li><b>External APIs</b>: HTTP calls, databases</li>
  <li><b>Heavy Operations</b>: File I/O, expensive computations</li>
  <li><b>Unreliable Dependencies</b>: Third-party services</li>
</ul>

<h3>Avoid Over-mocking</h3>
<ul>
  <li><b>Internal Functions</b>: Test real implementations</li>
  <li><b>Simple Logic</b>: Don't mock pure functions</li>
  <li><b>UI Components</b>: Use shallow rendering</li>
</ul>

<h2>Testing Strategies</h2>

<h3>1. Contract Testing</h3>
<pre><code>// Test API contracts, not implementations
const mockAPI = {
  getUsers: jest.fn().mockResolvedValue(users)
};
</code></pre>

<h3>2. Integration Testing</h3>
<p>Test with real dependencies where possible.</p>

<h3>3. Test Doubles</h3>
<ul>
  <li><b>Dummies</b>: Passed but not used</li>
  <li><b>Stubs</b>: Return fixed values</li>
  <li><b>Mocks</b>: Verify interactions</li>
  <li><b>Spies</b>: Wrap real objects</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Test async component khó ở đâu?",
    answer: `
<h2>Testing Async React Components</h2>

<h2>Common Challenges</h2>

<h4>1. Timing Issues</h4>
<p>Tests run before async operations complete.</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<pre><code>// ❌ Wrong
test('loads data', () => {
  render(&lt;AsyncComponent /&gt;);
  expect(screen.getByText('data')).toBeInTheDocument(); // Fails immediately
});
</code></pre>

<h3>2. Race Conditions</h3>
<p>Multiple async operations interfere.</p>

<h3>3. Cleanup</h3>
<p>Async effects not cleaned up between tests.</p>

<h3>4. Error States</h3>
<p>Testing error boundaries và error UI.</p>

<h2>Solutions</h2>

<h3>1. Async/Await với RTL</h3>
<pre><code>// ✅ Correct
test('loads data', async () => {
  render(&lt;AsyncComponent /&gt;);
  await waitFor(() => {
    expect(screen.getByText('data')).toBeInTheDocument();
  });
});
</code></pre>

<h3>2. Mock API Calls</h3>
<pre><code>const mockFetchUsers = jest.fn();
jest.mock('./api', () => ({
  fetchUsers: mockFetchUsers
}));
</code></pre>

<h3>3. Test Loading States</h3>
<pre><code>mockFetchUsers.mockResolvedValueOnce(users);
render(&lt;Component /&gt;);
expect(screen.getByText('Loading...')).toBeInTheDocument();
await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
</code></pre>

<h3>4. Error Testing</h3>
<pre><code>mockFetchUsers.mockRejectedValueOnce(new Error('API Error'));
render(&lt;Component /&gt;);
await waitFor(() => {
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
});
</code></pre>
`,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Snapshot test có thật sự hiệu quả?",
    answer: `
<h2>Snapshot Testing Effectiveness</h2>

<h2>Pros</h2>

<h3>1. Quick Regression Detection</h3>
<p>Catch unexpected UI changes automatically.</p>

<h3>2. Zero Effort</h3>
<p>Minimal code to write.</p>

<h3>3. Component Coverage</h3>
<p>Test entire component output.</p>

<h2>Cons</h2>

<h4>1. False Positives</h4>
<p>Tests fail on intentional changes (new features, refactors).</p>

<h4>Technical Implementation</h4>
<p>This requires careful consideration of performance and edge cases in production environments.</p>

<h3>2. No Logic Testing</h3>
<p>Only tests output, not behavior.</p>

<h3>3. Large Snapshots</h3>
<p>Hard to review large HTML diffs.</p>

<h3>4. Brittle</h3>
<p>Break on formatting changes, IDs, timestamps.</p>

<h2>Best Practices</h2>

<h3>1. Strategic Usage</h3>
<ul>
  <li>Use for <b>presentational components</b></li>
  <li>Avoid for <b>dynamic content</b></li>
  <li>Combine with <b>unit tests</b></li>
</ul>

<h3>2. Snapshot Management</h3>
<pre><code>// Update snapshots intentionally
jest --updateSnapshot

// Or inline snapshots for better diffs
expect(tree).toMatchInlineSnapshot();
</code></pre>

<h3>3. Selective Testing</h3>
<ul>
  <li>Test <b>stable components</b></li>
  <li>Avoid <b>third-party components</b></li>
  <li>Focus on <b>custom UI</b></li>
</ul>

<h2>Alternatives</h2>
<ul>
  <li><b>Visual Regression</b>: Percy, Chromatic</li>
  <li><b>Component Storybook</b>: Interactive testing</li>
  <li><b>Unit Tests</b>: Behavior testing</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },

  // =================== ARCHITECTURE & LEADERSHIP ===================
  {
    question: "Bạn review code React theo tiêu chí nào?",
    answer: `
<h2>Code Review Criteria cho React</h2>

<h2>Functional Correctness</h2>

<h3>1. Requirements</h3>
<ul>
  <li>Implements specified requirements?</li>
  <li>Handles edge cases properly?</li>
  <li>Error handling adequate?</li>
</ul>

<h3>2. Logic</h3>
<ul>
  <li>Business logic correct?</li>
  <li>Algorithm efficiency appropriate?</li>
  <li>No logical bugs?</li>
</ul>

<h2>Code Quality</h2>

<h3>1. React Best Practices</h3>
<ul>
  <li>Proper hooks usage?</li>
  <li>Components appropriately sized?</li>
  <li>Keys used correctly in lists?</li>
</ul>

<h3>2. Performance</h3>
<ul>
  <li>Unnecessary re-renders avoided?</li>
  <li>Memoization used appropriately?</li>
  <li>Large data structures optimized?</li>
</ul>

<h3>3. Security</h3>
<ul>
  <li>XSS prevention (dangerouslySetInnerHTML)?</li>
  <li>Input sanitization?</li>
  <li>Authentication checks?</li>
</ul>

<h2>Maintainability</h2>

<h3>1. Readability</h3>
<ul>
  <li>Clear variable/function names?</li>
  <li>Well-structured components?</li>
  <li>Comments for complex logic?</li>
</ul>

<h3>2. Testing</h3>
<ul>
  <li>Unit tests written?</li>
  <li>Test coverage adequate?</li>
  <li>Tests meaningful?</li>
</ul>

<h3>3. Architecture</h3>
<ul>
  <li>Follows project conventions?</li>
  <li>Separation of concerns?</li>
  <li>Reusable components extracted?</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Refactor lớn nên làm thế nào để an toàn?",
    answer: `
<h2>Safe Large-scale Refactoring</h2>

<h2>Preparation</h2>

<h3>1. Comprehensive Testing</h3>
<ul>
  <li>Unit tests for all components</li>
  <li>Integration tests for critical flows</li>
  <li>E2E tests for user journeys</li>
</ul>

<h3>2. Feature Flags</h3>
<pre><code>// Gradual rollout
const NEW_FEATURE = process.env.REACT_APP_NEW_UI;

return NEW_FEATURE ? &lt;NewComponent /&gt; : &lt;OldComponent /&gt;;
</code></pre>

<h3>3. Code Analysis</h3>
<ul>
  <li>Identify dependencies</li>
  <li>Impact analysis</li>
  <li>Risk assessment</li>
</ul>

<h2>Execution Strategy</h2>

<h3>1. Incremental Changes</h3>
<ul>
  <li>Break into small PRs</li>
  <li>Test each change</li>
  <li>Deploy frequently</li>
</ul>

<h3>2. Parallel Development</h3>
<pre><code>// Feature branch strategy
main
├── refactor/ui-cleanup
├── refactor/state-management
└── refactor/api-layer
</code></pre>

<h3>3. Backward Compatibility</h3>
<ul>
  <li>Keep old APIs working</li>
  <li>Migration scripts</li>
  <li>Deprecation warnings</li>
</ul>

<h2>Risk Mitigation</h2>

<h3>1. Rollback Plan</h3>
<ul>
  <li>Quick revert capability</li>
  <li>Database backup</li>
  <li>Feature flag toggles</li>
</ul>

<h3>2. Monitoring</h3>
<ul>
  <li>Error tracking (Sentry)</li>
  <li>Performance monitoring</li>
  <li>User feedback collection</li>
</ul>

<h3>3. Team Communication</h3>
<ul>
  <li>Clear timeline</li>
  <li>Regular updates</li>
  <li>Stakeholder alignment</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Làm sao prevent performance regression?",
    answer: `
<h2>Prevent Performance Regression</h2>

<h2>Automated Monitoring</h2>

<h3>1. Bundle Size Checks</h3>
<pre><code>// package.json
"bundlesize": {
  "maxSize": "500kB"
}
</code></pre>

<h3>2. Lighthouse CI</h3>
<pre><code>// GitHub Actions
- name: Lighthouse
  uses: treosh/lighthouse-ci-action@v8
  with:
    urls: https://example.com
</code></pre>

<h3>3. Performance Budgets</h3>
<pre><code>// webpack config
performance: {
  hints: 'error',
  maxAssetSize: 500000,
  maxEntrypointSize: 500000
}
</code></pre>

<h2>Code Quality Gates</h2>

<h3>1. ESLint Rules</h3>
<pre><code>// .eslintrc
{
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-key": "error"
  }
}
</code></pre>

<h3>2. TypeScript Strict</h3>
<ul>
  <li>Strict null checks</li>
  <li>No implicit any</li>
  <li>Exact optional properties</li>
</ul>

<h3>3. Bundle Analysis</h3>
<pre><code>// Analyze bundle
npm install --save-dev webpack-bundle-analyzer
</code></pre>

<h2>Development Practices</h2>

<h3>1. Performance Reviews</h3>
<ul>
  <li>Code review checklist</li>
  <li>Performance impact assessment</li>
  <li>Mentor junior developers</li>
</ul>

<h3>2. Profiling Sessions</h3>
<ul>
  <li>Regular performance audits</li>
  <li>React DevTools usage</li>
  <li>Chrome DevTools training</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Khi nào technical debt nên được trả?",
    answer: `
<h2>Khi Nào Trả Technical Debt</h2>

<h2>High Priority (Pay Now)</h2>

<h3>1. Security Vulnerabilities</h3>
<ul>
  <li>XSS, CSRF exploits</li>
  <li>Outdated dependencies với known vulnerabilities</li>
  <li>Insecure authentication</li>
</ul>

<h3>2. Performance Issues</h3>
<ul>
  <li>Core Web Vitals failing</li>
  <li>Memory leaks causing crashes</li>
  <li>Slow page loads affecting revenue</li>
</ul>

<h3>3. Breaking Changes</h3>
<ul>
  <li>API deprecations</li>
  <li>Framework major version updates</li>
  <li>Browser compatibility issues</li>
</ul>

<h2>Medium Priority (Plan to Pay)</h2>

<h3>1. Developer Experience</h3>
<ul>
  <li>Slow build times</li>
  <li>Poor test coverage</li>
  <li>Complex deployment process</li>
</ul>

<h3>2. Scalability Concerns</h3>
<ul>
  <li>Monolithic components</li>
  <li>Tight coupling</li>
  <li>Hard to test code</li>
</ul>

<h3>3. Upcoming Changes</h3>
<ul>
  <li>Planned feature requiring refactor</li>
  <li>Team expansion needs</li>
  <li>Technology migration</li>
</ul>

<h2>Low Priority (Track)</h2>

<h3>1. Code Quality</h3>
<ul>
  <li>Code duplication</li>
  <li>Missing TypeScript</li>
  <li>Outdated patterns</li>
</ul>

<h3>2. Minor Issues</h3>
<ul>
  <li>Unused code</li>
  <li>Suboptimal implementations</li>
  <li>Technical preferences</li>
</ul>

<h2>Decision Framework</h2>
<ul>
  <li><b>Impact</b>: How many users/developers affected?</li>
  <li><b>Cost</b>: Effort to fix vs maintain</li>
  <li><b>Risk</b>: Likelihood of causing problems</li>
  <li><b>Timeline</b>: When does it need to be fixed?</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Bạn quyết định tech stack dựa trên yếu tố gì?",
    answer: `
<h2>Tech Stack Decision Factors</h2>

<h2>Business Factors</h2>

<h3>1. Company Goals</h3>
<ul>
  <li>Time-to-market requirements</li>
  <li>Scalability needs</li>
  <li>Budget constraints</li>
</ul>

<h3>2. Team Composition</h3>
<ul>
  <li>Existing team skills</li>
  <li>Hiring availability</li>
  <li>Training costs</li>
</ul>

<h3>3. Market Position</h3>
<ul>
  <li>Competitor technology</li>
  <li>Industry standards</li>
  <li>Regulatory requirements</li>
</ul>

<h2>Technical Factors</h2>

<h3>1. Project Requirements</h3>
<ul>
  <li>Performance needs</li>
  <li>Security requirements</li>
  <li>Integration needs</li>
</ul>

<h3>2. Ecosystem Maturity</h3>
<ul>
  <li>Library stability</li>
  <li>Community support</li>
  <li>Documentation quality</li>
</ul>

<h3>3. Long-term Viability</h3>
<ul>
  <li>Maintenance costs</li>
  <li>Upgrade path</li>
  <li>Vendor lock-in risks</li>
</ul>

<h2>Team Factors</h2>

<h3>1. Developer Experience</h3>
<ul>
  <li>Learning curve</li>
  <li>Development speed</li>
  <li>Debugging tools</li>
</ul>

<h3>2. Organizational Factors</h3>
<ul>
  <li>Company size</li>
  <li>Development culture</li>
  <li>Open source contribution</li>
</ul>

<h2>Decision Process</h2>
<ol>
  <li><b>Define Requirements</b>: Functional & non-functional</li>
  <li><b>Evaluate Options</b>: POC/MVP for shortlisted</li>
  <li><b>Risk Assessment</b>: Failure modes & mitigations</li>
  <li><b>Team Buy-in</b>: Involve stakeholders</li>
  <li><b>Document Decisions</b>: Why chosen, alternatives considered</li>
</ol>
`,
    role: "senior",
    type: "architecture-leadership",
  },

  // =================== LIVE CODING / SYSTEM DESIGN ===================
  {
    question: "Design frontend cho e-commerce lớn",
    answer: `
<h2>Frontend Architecture cho E-commerce</h2>

<h2>Core Requirements</h2>

<h3>1. Performance</h3>
<ul>
  <li>Fast initial load</li>
  <li>Smooth navigation</li>
  <li>Mobile optimization</li>
</ul>

<h3>2. Scalability</h3>
<ul>
  <li>100k+ products</li>
  <li>High traffic spikes</li>
  <li>Global CDN</li>
</ul>

<h3>3. User Experience</h3>
<ul>
  <li>Search & filtering</li>
  <li>Shopping cart</li>
  <li>Checkout flow</li>
</ul>

<h2>Technology Stack</h2>

<h3>Framework</h3>
<ul>
  <li><b>Next.js 14+</b>: SSR, App Router, Edge Runtime</li>
  <li><b>React 18</b>: Concurrent features, Suspense</li>
</ul>

<h3>State Management</h3>
<ul>
  <li><b>Zustand</b>: Global state (cart, user)</li>
  <li><b>React Query</b>: Server state (products, search)</li>
</ul>

<h3>UI & Performance</h3>
<ul>
  <li><b>Tailwind CSS</b>: Utility-first styling</li>
  <li><b>Framer Motion</b>: Animations</li>
  <li><b>React Virtual</b>: Large product lists</li>
</ul>

<h2>Architecture Patterns</h2>

<h3>1. Component Structure</h3>
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

<h3>2. Performance Optimizations</h3>
<ul>
  <li><b>Image Optimization</b>: Next.js Image component</li>
  <li><b>Code Splitting</b>: Dynamic imports</li>
  <li><b>Caching</b>: React Query + Redis</li>
  <li><b>CDN</b>: Static assets</li>
</ul>

<h3>3. SEO & Analytics</h3>
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
<h2>State Flow cho Real-time Applications</h2>

<h2>Real-time Requirements</h2>

<h3>1. Live Updates</h3>
<ul>
  <li>WebSocket connections</li>
  <li>Server-sent events</li>
  <li>Optimistic updates</li>
  </ul>

<h3>2. Conflict Resolution</h3>
<ul>
  <li>Concurrent edits</li>
  <li>Offline support</li>
  <li>Data synchronization</li>
</ul>

<h3>3. Performance</h3>
<ul>
  <li>Efficient re-renders</li>
  <li>Memory management</li>
  <li>Network optimization</li>
</ul>

<h2>State Architecture</h2>

<h3>1. Server State</h3>
<pre><code>// React Query + WebSocket
const useRealtimeData = (key) => {
  return useQuery({
    queryKey: [key],
    queryFn: fetchData,
    refetchInterval: 5000, // Fallback polling
  });
};
</code></pre>

<h3>2. Real-time Updates</h3>
<pre><code>// WebSocket integration
const ws = new WebSocket('ws://api.example.com');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  queryClient.setQueryData([update.key], update.data);
};
</code></pre>

<h3>3. Optimistic Updates</h3>
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
    // Rollback on error
    queryClient.setQueryData(['data'], context.previousData);
  },
});
</code></pre>

<h2>Offline Support</h2>

<h3>1. Service Worker</h3>
<pre><code>// Cache API responses
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
</code></pre>

<h3>2. Conflict Resolution</h3>
<ul>
  <li><b>Last Write Wins</b>: Simple, but can lose data</li>
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
<h2>Page Load Optimization cho High Traffic</h2>

<h2>Performance Metrics</h2>

<h3>Core Web Vitals</h3>
<ul>
  <li><b>LCP</b>: < 2.5s</li>
  <li><b>FID</b>: < 100ms</li>
  <li><b>CLS</b>: < 0.1</li>
</ul>

<h3>Bundle Metrics</h3>
<ul>
  <li><b>First Load JS</b>: < 100KB</li>
  <li><b>Total Bundle</b>: < 200KB</li>
  <li><b>Images</b>: Optimized, lazy loaded</li>
</ul>

<h2>Optimization Strategies</h2>

<h3>1. Code Splitting</h3>
<pre><code>// Route-based splitting
const HomePage = lazy(() => import('./pages/Home'));
const ProductPage = lazy(() => import('./pages/Product'));

// Component-based splitting
const HeavyComponent = lazy(() => import('./components/Heavy'));
</code></pre>

<h3>2. Image Optimization</h3>
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

<h3>3. Caching Strategy</h3>
<ul>
  <li><b>HTTP Caching</b>: Cache-Control headers</li>
  <li><b>Service Worker</b>: Offline capability</li>
  <li><b>CDN</b>: Global distribution</li>
  <li><b>Browser Cache</b>: Long-term assets</li>
</ul>

<h3>4. Server-Side Optimizations</h3>
<pre><code>// Streaming SSR
export default function Page() {
  return (
    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
      &lt;SlowComponent /&gt;
    &lt;/Suspense&gt;
  );
}
</code></pre>

<h2>Monitoring & Tools</h2>

<h3>1. Real User Monitoring</h3>
<ul>
  <li><b>Web Vitals</b>: Core metrics</li>
  <li><b>Sentry</b>: Error tracking</li>
  <li><b>DataDog</b>: Performance monitoring</li>
</ul>

<h3>2. Bundle Analysis</h3>
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
<h2>Thiết Kế Component Library Nội Bộ</h2>

<h2>Requirements Analysis</h2>

<h3>1. Design System</h3>
<ul>
  <li>Consistent visual language</li>
  <li>Brand guidelines</li>
  <li>Accessibility standards</li>
</ul>

<h3>2. Technical Needs</h3>
<ul>
  <li>Multiple projects</li>
  <li>Team collaboration</li>
  <li>Maintenance overhead</li>
</ul>

<h3>3. Developer Experience</h3>
<ul>
  <li>Easy to use</li>
  <li>Well documented</li>
  <li>TypeScript support</li>
</ul>

<h2>Architecture</h2>

<h3>1. Tech Stack</h3>
<ul>
  <li><b>React</b>: Component library</li>
  <li><b>TypeScript</b>: Type safety</li>
  <li><b>Storybook</b>: Documentation & testing</li>
  <li><b>Rollup</b>: Bundle optimization</li>
</ul>

<h3>2. Project Structure</h3>
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

<h3>3. Component Structure</h3>
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

<h2>Distribution & Usage</h2>

<h3>1. Package Management</h3>
<pre><code>// package.json
{
  "name": "@company/ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
</code></pre>

<h3>2. Versioning</h3>
<ul>
  <li><b>Semantic Versioning</b>: Major.minor.patch</li>
  <li><b>Changelog</b>: Document changes</li>
  <li><b>Deprecation</b>: Migration guides</li>
</ul>

<h3>3. Documentation</h3>
<ul>
  <li><b>Storybook</b>: Interactive docs</li>
  <li><b>README</b>: Setup instructions</li>
  <li><b>Confluence</b>: Usage guidelines</li>
</ul>

<h2>Quality Assurance</h2>

<h3>1. Testing</h3>
<ul>
  <li><b>Unit Tests</b>: Jest + React Testing Library</li>
  <li><b>Visual Tests</b>: Chromatic</li>
  <li><b>E2E Tests</b>: Playwright</li>
</ul>

<h3>2. Linting & Formatting</h3>
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
<h2>Migration Strategy: React SPA → Next.js</h2>

<h2>Assessment Phase</h2>

<h3>1. Current State Analysis</h3>
<ul>
  <li>Routing structure</li>
  <li>API integrations</li>
  <li>State management</li>
  <li>Build configuration</li>
</ul>

<h3>2. Migration Goals</h3>
<ul>
  <li>SEO improvement</li>
  <li>Performance gains</li>
  <li>Developer experience</li>
  <li>Scalability</li>
</ul>

<h2>Incremental Migration</h2>

<h3>Phase 1: Setup & Infrastructure</h3>
<pre><code>// Install Next.js
npx create-next-app@latest migration-app --typescript

// Move existing components
cp -r src/components migration-app/components/

// Configure build tools
// Update package.json scripts
</code></pre>

<h3>Phase 2: Routing Migration</h3>
<pre><code>// Convert React Router to Next.js
// src/pages/index.jsx → app/page.jsx
// src/pages/products/[id].jsx → app/products/[id]/page.jsx

// Update navigation
import Link from 'next/link';
&lt;Link href="/products"&gt;Products&lt;/Link&gt;
</code></pre>

<h3>Phase 3: Data Fetching</h3>
<pre><code>// Convert API calls
// Before: useEffect + fetch
// After: Server Components + fetch

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return &lt;div&gt;{json.title}&lt;/div&gt;;
}
</code></pre>

<h3>Phase 4: State Management</h3>
<ul>
  <li>Keep existing Redux/Zustand</li>
  <li>Move client components to 'use client'</li>
  <li>Optimize server/client boundaries</li>
</ul>

<h2>Testing & Deployment</h2>

<h3>1. Testing Strategy</h3>
<ul>
  <li>Unit tests: Unchanged</li>
  <li>Integration tests: Update for SSR</li>
  <li>E2E tests: Test full pages</li>
</ul>

<h3>2. Deployment</h3>
<ul>
  <li><b>Vercel</b>: Native Next.js support</li>
  <li><b>Netlify</b>: Static + serverless</li>
  <li><b>AWS</b>: Lambda@Edge</li>
</ul>

<h2>Common Challenges</h2>

<h3>1. Hydration Mismatches</h3>
<pre><code>// Avoid client-only content in SSR
'use client';
import { useState } from 'react';
</code></pre>

<h3>2. API Routes</h3>
<pre><code>// Convert to Next.js API routes
// pages/api/users.js
export default function handler(req, res) {
  // API logic
}
</code></pre>

<h3>3. Performance Monitoring</h3>
<ul>
  <li>Update Core Web Vitals tracking</li>
  <li>Monitor server-side performance</li>
  <li>A/B test improvements</li>
</ul>
`,
    role: "senior",
    type: "system-design",
  },
];

export default QnAReact;
