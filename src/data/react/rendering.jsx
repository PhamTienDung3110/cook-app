export const rendering = [
  // =================== REACT & RENDERING SÂU ===================
  {
    question: "React reconciliation hoạt động thế nào?",
    answer: `
  <h3>React Reconciliation - Thuật Toán So Sánh Ảo</h3>
  <h4>Giới Thiệu</h4>
  <p>React Reconciliation là thuật toán so sánh Virtual DOM với DOM thật để cập nhật giao diện hiệu quả nhất. Đây là cốt lõi của React's rendering engine, cho phép React quyết định phần nào của UI cần được cập nhật mà không phải re-render toàn bộ DOM tree. Quá trình này giúp ứng dụng React có performance tốt hơn so với việc thao tác trực tiếp với DOM.</p>
  <h4>Cách Hoạt Động Cơ Bản</h4>
  <p>Khi state/props thay đổi, React thực hiện 3 phase chính:</p>
  <ol>
    <li><b>Render Phase</b>: Component tạo Virtual DOM tree mới dựa trên state/props hiện tại. Đây là phase "pure" - không có side effects, có thể bị interrupt bởi React's concurrent features.</li>
    <li><b>Reconciliation Phase</b>: React so sánh Virtual DOM tree mới với tree cũ (snapshot từ lần render trước) để tìm ra những thay đổi (diff). Thuật toán diffing sử dụng heuristics để tối ưu performance.</li>
    <li><b>Commit Phase</b>: React áp dụng các thay đổi đã được tính toán lên DOM thật. Phase này có thể chia thành 3 sub-phases: before mutation, mutation (thực sự update DOM), và layout (đọc layout sau khi update).</li>
  </ol>
  <h4>Thuật Toán Diffing Chi Tiết</h4>
  <p>React sử dụng heuristics và assumptions để so sánh hiệu quả:</p>
  <ul>
    <li><b>Element Type</b>: Khi element type thay đổi (ví dụ div → span), React sẽ unmount component cũ và mount component mới hoàn toàn. Điều này xảy ra vì React giả định rằng các element types khác nhau sẽ có cấu trúc khác nhau.</li>
    <li><b>Key Props</b>: Key giúp React track identity của các items trong list. Khi có key, React có thể reuse components thay vì tạo mới, giảm thiểu re-render không cần thiết. Key nên là stable, unique, và predictable.</li>
    <li><b>Component Type</b>: Khi component type thay đổi (Function → Class hoặc ngược lại), React sẽ unmount và mount lại. Nếu cùng type, React sẽ update props và re-run lifecycle methods.</li>
    <li><b>Props Comparison</b>: React thực hiện shallow comparison cho object props. Nếu object reference thay đổi nhưng giá trị bên trong giống nhau, React vẫn sẽ re-render. Đây là lý do cần memoization.</li>
  </ul>
  <h4>Performance Optimization</h4>
  <p>React cung cấp nhiều cách để tối ưu reconciliation:</p>
  <ul>
    <li><b>Component Skipping</b>: PureComponent (class) và React.memo() (function) giúp skip re-render khi props không thay đổi. Chúng thực hiện shallow comparison của props.</li>
    <li><b>Tree Pruning</b>: React dừng diffing process khi phát hiện component không cần update, tránh diffing toàn bộ subtree không cần thiết.</li>
    <li><b>Fiber Architecture</b>: Từ React 16+, Fiber cho phép interruptible rendering. React có thể pause, resume, hoặc abort rendering work, giúp UI responsive hơn.</li>
    <li><b>Concurrent Features</b>: useDeferredValue và useTransition cho phép mark một số updates là non-urgent, giúp React ưu tiên updates quan trọng hơn và tránh block UI thread.</li>
  </ul>
  <h4>React 18+ Cải Tiến</h4>
  <ul>
    <li><b>Automatic Batching</b>: React 18 tự động gom nhóm tất cả state updates (kể cả trong promises, timeouts, native event handlers) thành một batch, giảm số lần re-render.</li>
    <li><b>Concurrent Rendering</b>: React có thể render multiple versions của UI cùng lúc, cho phép interrupt rendering của low-priority updates để ưu tiên high-priority updates.</li>
    <li><b>Suspense SSR</b>: Streaming server rendering cho phép server gửi HTML theo chunks, client có thể bắt đầu render trước khi toàn bộ HTML được gửi về, cải thiện Time to First Byte (TTFB).</li>
    <li><b>React Compiler</b>: React Compiler (experimental) tự động memoize components và values tại build time, giảm nhu cầu manual memoization với useMemo/useCallback.</li>
  </ul>
  <h4>Khi Reconciliation Thất Bại</h4>
  <p>Reconciliation có thể tạo ra các vấn đề:</p>
  <ul>
    <li><b>False Positives</b>: Re-render không cần thiết xảy ra khi props reference thay đổi nhưng giá trị thực tế không đổi. Điều này thường do tạo object/array mới trong render hoặc không memoize callbacks.</li>
    <li><b>False Negatives</b>: React không phát hiện thay đổi cần re-render, thường do mutation trực tiếp state hoặc props, hoặc sử dụng key không stable.</li>
    <li><b>Infinite Loops</b>: State updates trong render hoặc useEffect không có dependencies đúng có thể gây infinite re-render loop, làm app freeze.</li>
  </ul>
  <h4>Best Practices</h4>
  <ul>
    <li>Sử dụng key đúng cách trong lists: key nên là unique, stable identifier (ID từ database), không nên dùng array index trừ khi list không thay đổi thứ tự.</li>
    <li>Stable function references với useCallback: Wrap callbacks được pass xuống child components để tránh re-render không cần thiết.</li>
    <li>Memoization với React.memo, useMemo: Memoize expensive calculations và components nhận props là objects/arrays/functions.</li>
    <li>Tránh inline objects/arrays trong render: Tạo object/array mới trong JSX sẽ làm props luôn "mới", gây re-render. Nên extract ra ngoài hoặc dùng useMemo.</li>
  </ul>
      `,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Khi nào Virtual DOM trở thành bottleneck?",
    answer: `
  <h3>Khi Nào Virtual DOM Trở Thành Bottleneck</h3>
  <h4>Các Trường Hợp Virtual DOM Chậm</h4>
  <h5>1. DOM Tree Quá Lớn</h5>
  <p>Khi ứng dụng có 10k+ elements, việc tạo và diff Virtual DOM tree trở nên tốn kém về memory và CPU. Mỗi lần render, React phải tạo toàn bộ Virtual DOM tree mới, sau đó so sánh với tree cũ. Với tree lớn, quá trình này có thể mất hàng trăm milliseconds, gây janky UI. Memory usage cũng tăng đáng kể vì React phải giữ cả tree cũ và mới trong quá trình reconciliation.</p>
  <h5>2. Updates Thường Xuyên</h5>
  <p>Real-time apps (chat, gaming, trading platforms) với updates mỗi giây gây reconciliation overhead liên tục. Mỗi update trigger một reconciliation cycle, và nếu updates quá thường xuyên (ví dụ 60fps cho animations), React có thể không kịp hoàn thành reconciliation trước khi update tiếp theo đến, dẫn đến dropped frames và laggy experience.</p>
  <h5>3. Deep Component Trees</h5>
  <p>Component trees quá sâu (>10 levels) làm diffing algorithm chậm hơn vì React phải traverse toàn bộ tree từ root xuống leaf. Mỗi level sâu thêm một cấp, số lượng nodes cần so sánh tăng theo cấp số nhân. Ngoài ra, context propagation cũng chậm hơn với deep trees vì mỗi component phải check context value.</p>
  <h5>4. Inefficient Keys</h5>
  <p>Không dùng key hoặc dùng index làm key khiến React phải re-mount toàn bộ list thay vì reuse. Khi key không stable hoặc dùng index, React không thể track identity của items, dẫn đến việc phải unmount và mount lại components, tốn kém hơn nhiều so với update props. Điều này đặc biệt nghiêm trọng với lists lớn.</p>
  <h5>5. Memory Pressure</h5>
  <p>Virtual DOM trees lớn tiêu tốn memory, đặc biệt trên mobile devices với RAM hạn chế. Mỗi Virtual DOM node chứa metadata về component, props, state, và references. Với tree lớn, memory usage có thể lên đến hàng trăm MB, gây ra garbage collection pauses và app crashes trên devices yếu.</p>
  <h4>Giải Pháp Hiện Đại</h4>
  <ul>
    <li><b>React Compiler</b>: Auto-memoization tại build time giúp giảm manual memoization code. Compiler phân tích code và tự động thêm memoization ở những chỗ cần thiết, giảm re-renders không cần thiết.</li>
    <li><b>React Server Components</b>: Reduce client-side DOM manipulation bằng cách render components trên server. Chỉ interactive parts được hydrate trên client, giảm đáng kể Virtual DOM tree size.</li>
    <li><b>Virtual Scrolling</b>: Chỉ render visible items (react-window, @tanstack/react-virtual) thay vì render toàn bộ list. Khi user scroll, chỉ những items mới visible mới được render, giảm DOM nodes từ hàng nghìn xuống còn vài chục.</li>
    <li><b>Code Splitting</b>: Lazy load components, reduce initial bundle size và chỉ load code khi cần. Điều này giảm initial render time và memory footprint.</li>
    <li><b>Windowing</b>: Render only visible portion of large datasets, tương tự virtual scrolling nhưng áp dụng cho bất kỳ dataset lớn nào, không chỉ lists.</li>
  </ul>
  <h4>Alternatives Khi Virtual DOM Không Phù Hợp</h4>
  <ul>
    <li><b>Svelte</b>: Compile-time optimization, zero runtime overhead. Svelte compile components thành vanilla JS tại build time, không cần Virtual DOM runtime, resulting in smaller bundles và faster performance.</li>
    <li><b>Vue 3 Composition API</b>: Proxy-based reactivity, efficient updates. Vue 3 sử dụng Proxy để track dependencies, chỉ update những phần thực sự thay đổi, không cần diff toàn bộ tree.</li>
    <li><b>Vanilla JS + lit-html</b>: Template literals với efficient diffing. lit-html chỉ update những phần thay đổi trong template, không cần full Virtual DOM tree.</li>
    <li><b>Preact</b>: Lightweight React alternative với smaller bundle (3KB vs 45KB). Preact có API tương tự React nhưng implementation nhẹ hơn, phù hợp cho apps cần bundle size nhỏ.</li>
  </ul>
  <h4>Khi Vẫn Nên Dùng Virtual DOM</h4>
  <ul>
    <li>Complex UI logic với nhiều state interactions: Virtual DOM giúp quản lý complex state updates và UI synchronization dễ dàng hơn so với manual DOM manipulation.</li>
    <li>Large development team với established React expertise: Team đã quen với React patterns và ecosystem, switching cost cao hơn performance gain từ alternatives.</li>
    <li>Rich ecosystem và third-party libraries: React có ecosystem lớn nhất, nhiều libraries và tools hỗ trợ, giúp development nhanh hơn.</li>
    <li>SSR/SSG requirements (Next.js, Remix): React's SSR/SSG solutions đã mature và well-tested, alternatives có thể chưa có solutions tương đương.</li>
  </ul>
  `,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "React StrictMode dùng để làm gì? Vì sao render 2 lần?",
    answer: `
  <h3>React StrictMode: Development Safety Net</h3>
  <h4>Mục Đích Chính</h4>
  <p>StrictMode là development-only wrapper giúp phát hiện potential bugs và unsafe patterns trong React applications. Nó không render bất kỳ UI nào, chỉ thêm additional checks và warnings trong development mode. StrictMode giúp developers viết code an toàn hơn và prepare cho future React versions bằng cách highlight deprecated patterns và potential issues.</p>
  <h4>Các Chức Năng Phát Hiện</h4>
  <ul>
    <li><b>Side Effects trong Render</b>: Detect impure functions và unexpected mutations. StrictMode sẽ double-invoke render functions để expose side effects như DOM manipulation, API calls, hoặc state mutations trong render phase.</li>
    <li><b>Legacy API Usage</b>: Cảnh báo deprecated methods như findDOMNode (không còn được recommend), old Context API (trước React 16.3), và các APIs sẽ bị remove trong future versions.</li>
    <li><b>Unsafe Lifecycle Methods</b>: Phát hiện componentWillMount, componentWillReceiveProps, componentWillUpdate - những methods này unsafe với concurrent rendering và sẽ bị deprecated.</li>
    <li><b>String Refs</b>: Cảnh báo việc sử dụng string refs (ref="myRef") thay vì callback/function refs. String refs không work với concurrent features và có thể gây memory leaks.</li>
    <li><b>Unexpected Side Effects</b>: Detect setState trong render, useEffect không có dependencies đúng, hoặc mutations trong render phase - những patterns này có thể gây bugs khó debug.</li>
  </ul>
  <h4>Tại Sao Render 2 Lần?</h4>
  <p>StrictMode intentionally double-invokes một số functions để expose side effects và ensure functions are pure:</p>
  <pre><code>// Development mode với StrictMode
  function MyComponent() {
    console.log('Render!'); // Log xuất hiện 2 lần
  
    // ❌ Side effect trong render - sẽ bị detect
    useState(Math.random()); // Tạo state với random value - mỗi lần render sẽ khác nhau
  
    return &lt;div&gt;Hello&lt;/div&gt;;
  }
          </code></pre>
  <h5>Functions Được Double-invoke</h5>
  <ul>
    <li>Component constructors: Để detect side effects trong constructor</li>
    <li>render() methods: Để ensure render functions are pure</li>
    <li>useState, useReducer initializers: Để detect impure initializers (như useState(() => Math.random()))</li>
    <li>useEffect, useLayoutEffect callbacks: Để test cleanup functions và ensure effects can be safely re-run</li>
  </ul>
  <h4>Lý Do Double Rendering</h4>
  <ul>
    <li><b>Detect Impure Functions</b>: Functions nên return cùng kết quả cho cùng input. Nếu function return kết quả khác nhau khi được gọi 2 lần với cùng input, đó là dấu hiệu của impure function hoặc side effect.</li>
    <li><b>Find Side Effects</b>: Phát hiện mutations không mong muốn như thay đổi global variables, DOM manipulation, hoặc API calls trong render phase.</li>
    <li><b>Test Cleanup</b>: Đảm bảo cleanup functions hoạt động đúng. Khi React unmount và mount lại component, cleanup function phải được gọi và restore state về initial state.</li>
    <li><b>Simulate Concurrent Features</b>: Prepare cho React's concurrent rendering, nơi components có thể được interrupted và re-rendered. StrictMode giúp ensure code hoạt động đúng trong concurrent mode.</li>
  </ul>
  <h4>React 18+ Enhancements</h4>
  <ul>
    <li><b>Concurrent Rendering Simulation</b>: Test components với interruptible renders. StrictMode sẽ intentionally interrupt và restart renders để simulate concurrent rendering behavior, giúp find bugs related to race conditions.</li>
    <li><b>Automatic Batching Detection</b>: Phát hiện unbatched updates. Trong React 18, tất cả updates được auto-batched, nhưng StrictMode giúp detect cases where batching might not work as expected.</li>
    <li><b>Suspense Integration</b>: Test fallback states và error boundaries. StrictMode sẽ test Suspense boundaries bằng cách intentionally delay renders, giúp ensure fallback UI và error handling work correctly.</li>
  </ul>
  <h4>Khi Nên Sử Dụng</h4>
  <ul>
    <li>Development environment (tắt trong production): StrictMode chỉ nên dùng trong development vì nó làm chậm app và double-invoke functions. Production builds tự động disable StrictMode.</li>
    <li>Wrap toàn bộ app hoặc specific components: Có thể wrap toàn bộ app trong StrictMode hoặc chỉ wrap specific parts cần kiểm tra. Wrapping toàn bộ app giúp catch issues sớm hơn.</li>
    <li>Kết hợp với React DevTools để debug: StrictMode warnings thường xuất hiện trong console và React DevTools, giúp identify và fix issues nhanh hơn.</li>
  </ul>
  <h4>Best Practices với StrictMode</h4>
  <ul>
    <li>Không dựa vào render count hoặc timing: Code nên work đúng bất kể component render bao nhiêu lần. Không assume component chỉ render một lần.</li>
    <li>Đảm bảo functions pure và predictable: Render functions, initializers, và effects nên là pure - cùng input luôn return cùng output, không có side effects.</li>
    <li>Sử dụng useEffect đúng cách với dependencies: Luôn include tất cả dependencies trong dependency array, tránh stale closures và infinite loops.</li>
    <li>Tránh mutations trong render phase: Không mutate state, props, hoặc global variables trong render. Tất cả mutations nên ở trong effects hoặc event handlers.</li>
    <li>Cleanup tất cả side effects properly: Mọi side effect (subscriptions, timers, event listeners) cần có cleanup function để tránh memory leaks.</li>
  </ul>
  <h4>Performance Impact</h4>
  <p>StrictMode chỉ active trong development, không ảnh hưởng production performance. Trong development, StrictMode có thể làm chậm app một chút do double-invoking functions, nhưng đây là trade-off cần thiết để catch bugs sớm. Production builds tự động strip out StrictMode, nên không có performance overhead trong production.</p>
  `,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Hydration error là gì? Nguyên nhân phổ biến?",
    answer: `
  <h3>Hydration Errors trong React</h3>
  <h4>Hydration Là Gì?</h4>
  <p>Hydration là quá trình React attach event handlers và state vào server-rendered HTML. Khi sử dụng SSR (Server-Side Rendering), server render HTML và gửi về client. Client-side React sau đó "hydrate" HTML này bằng cách attach event listeners, initialize state, và setup component tree. Hydration giúp app có initial render nhanh (server HTML hiển thị ngay) và sau đó trở thành interactive (client React takes over).</p>
  <h4>Hydration Error</h4>
  <p>Xảy ra khi server HTML không match với client-side render, gây "flash" (content thay đổi đột ngột), performance issues, và potential bugs. React sẽ log warning trong console và có thể re-render toàn bộ subtree, làm mất lợi ích của SSR. Trong worst case, React sẽ discard server HTML và render lại từ đầu, làm chậm initial load.</p>
  <h4>Nguyên Nhân Phổ Biến</h4>
  <h5>1. Timestamp/Date Differences</h5>
  <p>Server và client có thể có timezone hoặc time khác nhau, dẫn đến HTML khác nhau:</p>
  <pre><code>// ❌ Server vs Client khác nhau
  &lt;p&gt;{new Date().toString()}&lt;/p&gt;
  // Server: "Mon Jan 15 2024 10:00:00 GMT+0700"
  // Client: "Mon Jan 15 2024 10:00:05 GMT+0700" (5 giây sau)
          </code></pre>
  <p><b>Giải pháp:</b> Sử dụng useEffect để render date chỉ trên client, hoặc format date trên server và pass qua props.</p>
  <h5>2. Browser APIs</h5>
  <p>Browser APIs như localStorage, window, document không tồn tại trên server:</p>
  <pre><code>// ❌ localStorage undefined trên server
  &lt;p&gt;{localStorage.getItem('token')}&lt;/p&gt;
  // Server: undefined hoặc error
  // Client: actual token value
  </code></pre>
  <p><b>Giải pháp:</b> Luôn check typeof window !== 'undefined' hoặc sử dụng useEffect để access browser APIs chỉ trên client.</p>
  <h5>3. Random Values</h5>
  <p>Math.random() sẽ return giá trị khác nhau giữa server và client:</p>
  <pre><code>// ❌ Math.random() khác nhau
  &lt;p&gt;Random: {Math.random()}&lt;/p&gt;
  // Server: 0.123456
  // Client: 0.789012 (hoàn toàn khác)
  </code></pre>
  <p><b>Giải pháp:</b> Generate random value trên server và pass qua props, hoặc generate trong useEffect trên client.</p>
  <h5>4. Environment Variables</h5>
  <p>process.env có thể khác nhau giữa server và client build:</p>
  <pre><code>// ❌ process.env khác nhau
  &lt;p&gt;Env: {process.env.NODE_ENV}&lt;/p&gt;
  // Server: "production"
  // Client: có thể khác nếu build config khác
  </code></pre>
  <p><b>Giải pháp:</b> Sử dụng Next.js public env variables (NEXT_PUBLIC_*) hoặc pass env values qua props từ server.</p>
  <h5>5. Third-party Scripts</h5>
  <p>Scripts như analytics, ads có thể modify DOM trên client, gây mismatch với server HTML.</p>
  <h5>6. Conditional Rendering Based on Client State</h5>
  <p>Render khác nhau dựa trên client-only state (như screen size từ window.innerWidth) sẽ mismatch với server.</p>
  <h4>Giải Pháp</h4>
  <ul>
    <li><b>useEffect</b>: Client-only logic nên được đặt trong useEffect, đảm bảo chỉ chạy sau khi component mount trên client. Đây là cách phổ biến nhất để handle client-only code.</li>
    <li><b>dynamic imports với ssr: false</b>: Lazy load components chỉ trên client bằng cách dùng dynamic import với ssr: false option. Next.js sẽ skip SSR cho component này.</li>
    <li><b>suppressHydrationWarning</b>: Bỏ qua warnings không quan trọng cho specific elements. Chỉ dùng khi chắc chắn mismatch không gây bugs, như date/time differences nhỏ.</li>
    <li><b>Next.js hydrate()</b>: Control hydration timing bằng cách delay hydration cho specific parts. Có thể dùng để hydrate critical parts trước, non-critical parts sau.</li>
    <li><b>useState với initial value từ server</b>: Pass initial values từ server qua props, tránh tính toán trên client khác với server.</li>
    <li><b>Check typeof window</b>: Luôn check typeof window !== 'undefined' trước khi access browser APIs trong render.</li>
  </ul>
  <h4>Debug Hydration</h4>
  <p>Để debug hydration issues, có thể thêm logging:</p>
  <pre><code>// Thêm vào _app.js hoặc root component
  useEffect(() => {
    console.log('Hydration complete');
    // Check for hydration mismatches
    if (typeof window !== 'undefined') {
      const serverHTML = document.getElementById('__next').innerHTML;
      // Compare với expected client HTML
    }
  }, []);
  </code></pre>
  <p>React DevTools cũng highlight hydration warnings trong console với stack traces, giúp identify exact component gây issue.</p>
  `,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Controlled re-render khác uncontrolled re-render?",
    answer: `
  <h3>Controlled vs Uncontrolled Re-renders</h3>
  <h4>Controlled Re-render</h4>
  <p>Re-render được kiểm soát bởi React, trigger bởi state/props changes theo reconciliation algorithm. Đây là expected behavior - React re-render khi có thay đổi thực sự cần update UI. Controlled re-renders là predictable, có thể optimize, và là foundation của React's declarative programming model.</p>
  <h5>Khi Nào Xảy Ra</h5>
  <ul>
    <li>State update qua setState/useState: Khi state thay đổi, React schedule re-render để reflect changes. Đây là primary trigger cho re-renders.</li>
    <li>Props change từ parent: Khi parent component re-render và pass props mới (hoặc props reference thay đổi), child component sẽ re-render. React.memo có thể prevent re-render nếu props values không thay đổi.</li>
    <li>Context value change: Khi Context Provider value thay đổi, tất cả consumers sẽ re-render. Đây là lý do cần split contexts để avoid unnecessary re-renders.</li>
    <li>Force update (shouldComponentUpdate return false nhưng forceUpdate được gọi): Trong class components, có thể force re-render bằng forceUpdate(), nhưng đây là anti-pattern và nên tránh.</li>
  </ul>
  <h4>Uncontrolled Re-render</h4>
  <p>Re-render không mong muốn, thường do bugs hoặc anti-patterns. Uncontrolled re-renders xảy ra khi component re-render mà không có thay đổi thực sự cần thiết, gây waste CPU cycles và có thể làm app chậm. Đây là common performance issue trong React apps.</p>
  <h5>Các Nguyên Nhân</h5>
  <ul>
    <li><b>New Object/Function</b>: Tạo object mới mỗi render (như style={{color: 'red'}} trong JSX) làm props luôn "mới", gây re-render child components dù values không đổi. React so sánh bằng reference, không phải deep equality.</li>
    <li><b>Inline Functions</b>: () => {} inline trong JSX tạo function mới mỗi render, làm props.function luôn khác, trigger re-render. Nên extract ra ngoài hoặc dùng useCallback.</li>
    <li><b>Missing Dependencies</b>: useEffect/useMemo thiếu dependencies có thể gây stale closures hoặc infinite loops. useEffect không có deps sẽ chạy mỗi render, có thể trigger state updates và cause re-render loop.</li>
    <li><b>Parent Re-render</b>: Component cha re-render không cần thiết sẽ cause tất cả children re-render (trừ khi dùng React.memo). Đây là cascade effect - một component re-render không cần thiết có thể trigger hàng trăm re-renders downstream.</li>
    <li><b>Context Value Changes</b>: Context Provider value là object/array mới mỗi render sẽ cause tất cả consumers re-render, dù values bên trong không đổi.</li>
  </ul>
  <h4>Performance Impact</h4>
  <table>
    <tr>
      <th>Loại</th>
      <th>Performance</th>
      <th>Predictable</th>
      <th>Optimizable</th>
    </tr>
    <tr>
      <td>Controlled</td>
      <td>Có thể optimize</td>
      <td>Cao</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Uncontrolled</td>
      <td>Chậm, wasteful</td>
      <td>Thấp</td>
      <td>Khó</td>
    </tr>
  </table>
  <h4>Giải Pháp</h4>
  <ul>
    <li><b>useMemo</b>: Memoize expensive calculations để tránh tính toán lại mỗi render. useMemo return cached value nếu dependencies không đổi, giảm CPU usage cho expensive operations như filtering large arrays hoặc complex calculations.</li>
    <li><b>useCallback</b>: Stable function references để tránh tạo function mới mỗi render. useCallback return cùng function reference nếu dependencies không đổi, giúp React.memo work correctly và prevent unnecessary re-renders.</li>
    <li><b>React.memo</b>: Prevent unnecessary re-renders bằng cách shallow compare props. Nếu props không đổi, component skip re-render. Có thể customize comparison function để deep compare nếu cần.</li>
    <li><b>Profiler</b>: Debug re-render causes bằng React DevTools Profiler. Profiler show exactly khi nào và tại sao components re-render, giúp identify performance bottlenecks và uncontrolled re-renders.</li>
    <li><b>Split Contexts</b>: Tách large contexts thành multiple smaller contexts để avoid unnecessary re-renders. Components chỉ subscribe contexts chúng thực sự cần.</li>
    <li><b>Extract Objects/Functions</b>: Extract objects và functions ra ngoài component hoặc dùng useMemo/useCallback để ensure stable references.</li>
  </ul>
  `,
    role: "senior",
    type: "react-rendering",
  },
  {
    question: "Khi nào nên tách component, khi nào không?",
    answer: `
  <h3>Khi Nào Nên Tách Component</h3>
  <h4>Khi NÊN Tách</h4>
  <h5>1. Reusability</h5>
  <p>Component được sử dụng ở nhiều nơi trong app. Khi có UI pattern hoặc logic được lặp lại ở 2+ places, nên extract thành reusable component. Điều này giúp maintain consistency, reduce code duplication, và make changes easier (chỉ cần update một nơi). Ví dụ: Button, Input, Modal, Card components thường được reuse nhiều lần.</p>
  <h5>2. Complexity</h5>
  <p>Component quá lớn (>200 lines) hoặc có nhiều responsibilities vi phạm Single Responsibility Principle. Khi component handle nhiều concerns (UI rendering, data fetching, state management, side effects), nên tách thành smaller, focused components. Mỗi component nên có một clear purpose. Điều này giúp code dễ đọc, dễ test, và dễ maintain hơn.</p>
  <h5>3. Performance</h5>
  <p>Tách để optimize re-renders với React.memo. Khi một phần của component re-render thường xuyên nhưng phần khác không, tách phần stable thành separate component và wrap với React.memo. Điều này prevent unnecessary re-renders của phần stable. Ví dụ: tách expensive list item thành separate component và memoize nó.</p>
  <h5>4. Testing</h5>
  <p>Dễ test isolated logic. Smaller components dễ test hơn vì có ít dependencies và clear boundaries. Có thể test component behavior, props handling, và edge cases một cách isolated mà không cần setup complex parent component. Điều này đặc biệt quan trọng cho business logic và complex UI interactions.</p>
  <h5>5. Maintainability</h5>
  <p>Single Responsibility Principle - mỗi component nên có một reason để change. Khi component có nhiều reasons để change (ví dụ: UI styling changes và business logic changes), nên tách thành separate components. Điều này giúp changes ít affect other parts, reduce risk of bugs, và make codebase more maintainable long-term.</p>
  <h4>Khi KHÔNG Nên Tách</h4>
  <h5>1. Over-Engineering</h5>
  <p>Tách component chỉ dùng 1 lần, không phức tạp. Nếu component chỉ được dùng một nơi và logic đơn giản, tách ra có thể là over-engineering và làm codebase phức tạp không cần thiết. YAGNI principle (You Aren't Gonna Need It) - không tách trừ khi thực sự cần. Đợi đến khi component thực sự được reuse hoặc trở nên phức tạp mới tách.</p>
  <h5>2. Premature Optimization</h5>
  <p>Tách chỉ vì nghĩ sẽ dùng lại sau. Không nên tách component dựa trên assumption về future needs. Tách khi có actual need, không phải hypothetical need. Premature abstraction có thể lead to wrong abstractions, making code harder to change later. Refactor khi có actual requirement, không phải speculation.</p>
  <h5>3. Micro-Components</h5>
  <p>Quá nhiều tiny components làm codebase phức tạp. Mỗi component có overhead (file, imports, exports). Nếu tách quá nhỏ (ví dụ: mỗi div thành một component), sẽ có quá nhiều files và components, làm codebase khó navigate và understand. Balance giữa reusability và simplicity - components nên có meaningful size và purpose.</p>
  <h5>4. Tight Coupling</h5>
  <p>Components phụ thuộc chặt chẽ lẫn nhau, không thể tách mà không break functionality. Nếu components share quá nhiều state hoặc logic, tách ra có thể làm code phức tạp hơn (cần pass nhiều props, setup context, hoặc duplicate logic). Trong trường hợp này, có thể better để keep together hoặc refactor để reduce coupling trước khi tách.</p>
  <h4>Best Practices 2026</h4>
  <ul>
    <li><b>Atomic Design</b>: Atoms → Molecules → Organisms. Organize components theo hierarchy: atoms (smallest, như Button), molecules (combinations, như SearchBar), organisms (complex sections, như Header). Pattern này giúp build UI từ small, reusable pieces.</li>
    <li><b>Composition</b>: Props.children thay vì hard-code. Sử dụng composition pattern để make components flexible. Thay vì hard-code content, accept children và let parent decide content. Điều này make components more reusable và flexible.</li>
    <li><b>Compound Components</b>: Context-based component groups. Components work together như một unit (như Select + Option, Tabs + TabPanel). Share state qua Context, expose API qua component composition. Pattern này giúp create flexible, powerful component APIs.</li>
    <li><b>React Server Components</b>: Server/client separation. Tách components thành Server Components (render on server, no JS sent to client) và Client Components (interactive, có event handlers). Điều này reduce bundle size và improve performance bằng cách chỉ send interactive code to client.</li>
  </ul>
  <h4>Decision Framework</h4>
  <p>Khi quyết định có nên tách component hay không, consider các câu hỏi sau:</p>
  <ol>
    <li>Component > 100 lines? → Nếu component quá dài, khó đọc và maintain, nên consider tách.</li>
    <li>Dùng lại ở 2+ nơi? → Nếu component được reuse, tách ra để avoid duplication và ensure consistency.</li>
    <li>Multiple responsibilities? → Nếu component handle nhiều concerns, tách theo Single Responsibility Principle.</li>
    <li>Complex state logic? → Nếu state logic phức tạp, có thể extract thành custom hook hoặc separate component để isolate và test logic.</li>
    <li>Performance issues? → Nếu một phần re-render thường xuyên nhưng phần khác không, tách để optimize với React.memo.</li>
    <li>Testing difficulties? → Nếu component khó test do complexity hoặc dependencies, tách để make testing easier.</li>
  </ol>
  <p>Nếu answer "yes" cho 2+ questions, nên consider tách component. Nhưng luôn balance với simplicity - không tách nếu làm code phức tạp hơn.</p>
  `,
    role: "senior",
    type: "react-rendering",
  },
]