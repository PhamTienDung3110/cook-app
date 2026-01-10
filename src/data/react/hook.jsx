export const hook = [
  // =================== HOOKS NÂNG CAO ===================
  {
    question: "Custom hook có lifecycle riêng không?",
    answer: `
  <h3>Custom Hooks và Lifecycle</h3>
  <h4>Custom Hooks KHÔNG Có Lifecycle Riêng</h4>
  <p>Custom hooks là functions, không phải components. Chúng không có lifecycle methods như componentDidMount, componentDidUpdate, hoặc componentWillUnmount. Custom hooks chỉ là JavaScript functions tuân theo Rules of Hooks - chúng phải được gọi ở top level và không được gọi conditionally. Lifecycle behavior trong custom hooks được implement thông qua các built-in hooks như useEffect, useLayoutEffect, và cleanup functions.</p>
  <h5>Tại Sao?</h5>
  <ul>
    <li>Hooks chỉ là JavaScript functions: Chúng không có internal React component instance, không có mounting/unmounting lifecycle. Mỗi lần component render, custom hook được gọi lại như một function bình thường.</li>
    <li>Không có internal state management: Custom hooks không tự quản lý state - chúng sử dụng useState, useReducer từ React. State được quản lý bởi component gọi hook.</li>
    <li>Không render UI: Custom hooks không return JSX, không có render phase. Chúng chỉ return values, functions, hoặc objects để component sử dụng.</li>
    <li>Không có mounting/unmounting: Lifecycle như mounting/unmounting chỉ tồn tại ở component level. Custom hooks chỉ có thể simulate lifecycle behavior qua useEffect với empty dependency array (mount) và cleanup function (unmount).</li>
  </ul>
  <h4>Nhưng Có Thể Sử Dụng Hooks Bên Trong</h4>
  <p>Custom hooks có thể sử dụng tất cả built-in hooks để implement logic phức tạp:</p>
  <pre><code>function useCustomHook() {
    // Có thể dùng useState, useEffect, etc.
    const [state, setState] = useState();
    useEffect(() => {
      // Logic here - simulate lifecycle
      return () => {
        // Cleanup - simulate unmount
      };
    }, []);
    return state;
  }
  </code></pre>
  <h4>Sharing Logic, Not Lifecycle</h4>
  <p>Custom hooks share logic giữa components, không phải lifecycle. Mục đích chính của custom hooks là extract và reuse logic giữa nhiều components. Lifecycle behavior chỉ là side effect của việc sử dụng useEffect bên trong hook. Khi component mount, useEffect trong hook chạy. Khi component unmount, cleanup function chạy. Nhưng đây không phải là lifecycle riêng của hook - nó là lifecycle của component sử dụng hook.</p>
  <h5>Patterns</h5>
  <ul>
    <li><b>Data Fetching</b>: useApi, useQuery - Fetch data và manage loading/error states. Có thể implement caching, retry logic, và automatic refetching.</li>
    <li><b>Event Handling</b>: useEventListener - Attach và cleanup event listeners. Quản lý window events, keyboard shortcuts, scroll events.</li>
    <li><b>Form Management</b>: useForm - Handle form state, validation, submission. Quản lý field values, errors, touched states, và form submission logic.</li>
    <li><b>Animation</b>: useSpring - Animate values với spring physics. Quản lý animation state, timing, và easing functions.</li>
  </ul>
  <h4>React 18+ Advancements</h4>
  <ul>
    <li><b>useDeferredValue</b>: Deferred updates cho non-urgent values. Giúp keep UI responsive khi có expensive updates. Value được defer đến khi React có time để process.</li>
    <li><b>useTransition</b>: Non-blocking transitions cho state updates. Mark updates là non-urgent, giúp React prioritize urgent updates và keep UI responsive.</li>
    <li><b>useId</b>: Unique IDs cho accessibility và SSR. Generate stable IDs consistent giữa server và client, tránh hydration mismatches.</li>
  </ul>
      `,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "useEffect vs useLayoutEffect khác nhau thế nào?",
    answer: `
  <h3>useEffect vs useLayoutEffect</h3>
  <h4>useEffect</h4>
  <p>Chạy asynchronously sau khi DOM đã update và browser đã paint. useEffect được schedule sau khi browser paint, không block rendering. Điều này giúp UI responsive nhưng có thể gây visual flicker nếu effect thay đổi DOM.</p>
  <h5>Timing</h5>
  <ul>
    <li>Sau render và paint: Effect chạy sau khi React commit changes lên DOM và browser đã paint screen. User có thể thấy changes trước khi effect chạy.</li>
    <li>Non-blocking: Effect không block browser paint. Nếu effect mất nhiều thời gian, UI vẫn responsive và user có thể interact.</li>
    <li>Có thể delay: React có thể delay effect nếu có urgent updates. Trong concurrent mode, React có thể interrupt và reschedule effect.</li>
  </ul>
  <h5>Use Cases</h5>
  <ul>
    <li>API calls: Fetch data từ server, không cần sync với DOM. User có thể thấy loading state trước khi data arrive.</li>
    <li>Subscriptions: Setup subscriptions, event listeners. Không cần immediate execution, có thể delay một chút.</li>
    <li>DOM measurements (sau paint): Measure DOM elements sau khi đã render. Có thể có slight delay nhưng không ảnh hưởng user experience.</li>
  </ul>
  <h4>useLayoutEffect</h4>
  <p>Chạy synchronously ngay sau DOM mutations, trước khi browser paint. useLayoutEffect chạy đồng bộ, block browser paint cho đến khi effect hoàn thành. Điều này đảm bảo DOM changes được apply trước khi user thấy, nhưng có thể làm UI feel laggy nếu effect mất nhiều thời gian.</p>
  <h5>Timing</h5>
  <ul>
    <li>Sau DOM update, trước paint: Effect chạy ngay sau khi React update DOM, nhưng trước khi browser paint. User không thấy intermediate state.</li>
    <li>Blocking: Effect block browser paint. Nếu effect mất nhiều thời gian, UI sẽ freeze cho đến khi effect hoàn thành.</li>
    <li>Immediate execution: Effect chạy ngay lập tức, không có delay. React đợi effect hoàn thành trước khi paint.</li>
  </ul>
  <h5>Use Cases</h5>
  <ul>
    <li>DOM measurements: Measure elements trước khi paint để avoid layout shift. Cần measurements chính xác để calculate layout.</li>
    <li>Layout calculations: Calculate positions, sizes trước khi render. Cần để position elements correctly, avoid visual jumps.</li>
    <li>Prevent visual flickers: Apply DOM changes trước khi user thấy. Đảm bảo smooth transitions, không có flash of incorrect content.</li>
  </ul>
  <h4>Performance Comparison</h4>
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
  <h4>Best Practice</h4>
  <ul>
    <li>Dùng useEffect mặc định: useEffect phù hợp cho hầu hết use cases. Chỉ switch sang useLayoutEffect khi thực sự cần sync DOM measurements.</li>
    <li>Chỉ dùng useLayoutEffect khi cần sync DOM measurements: Khi cần measure elements và apply changes trước paint. Ví dụ: tooltip positioning, scroll restoration.</li>
    <li>Tránh useLayoutEffect nếu không cần thiết: useLayoutEffect block paint, có thể làm UI laggy. Chỉ dùng khi có visual issues với useEffect.</li>
  </ul>
      `,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Vì sao useEffect không đảm bảo thứ tự async?",
    answer: `
  <h3>Thứ Tự Async trong useEffect</h3>
  <h4>Vấn Đề Thứ Tự</h4>
  <p>useEffect không guarantee execution order giữa multiple effects, đặc biệt với async operations. Mỗi effect chạy independently, và async operations có thể complete theo thứ tự khác với thứ tự được start. Điều này có thể gây race conditions và unpredictable behavior.</p>
  <h5>Tại Sao?</h5>
  <ul>
    <li><b>Concurrent Rendering</b>: React 18+ có thể interrupt renders và restart effects. Nếu component re-render trong khi effect đang chạy, effect có thể bị cancel và restart, gây unpredictable order.</li>
    <li><b>Automatic Batching</b>: State updates được batch, có thể trigger multiple effects cùng lúc. Effects không guarantee chạy theo thứ tự được define trong code.</li>
    <li><b>Non-deterministic</b>: Network delays, race conditions làm async operations complete theo thứ tự khác. Fast network requests có thể complete trước slow requests, bất kể thứ tự được start.</li>
  </ul>
  <h4>Ví Dụ Vấn Đề</h4>
  <pre><code>useEffect(() => {
    fetchUser(); // Async operation
  }, [userId]);

  useEffect(() => {
    fetchPosts(); // Có thể chạy trước fetchUser hoàn thành!
  }, [userId]);
  </code></pre>
  <p>Trong ví dụ này, fetchPosts có thể complete trước fetchUser nếu network request nhanh hơn, gây issues nếu posts cần user data.</p>
  <h4>Giải Pháp</h4>
  <h5>1. Dependency Arrays và Sequential Execution</h5>
  <pre><code>useEffect(() => {
    fetchUser().then(() => {
      fetchPosts(); // Đảm bảo thứ tự - posts chỉ fetch sau khi user loaded
    });
  }, [userId]);
  </code></pre>
  <p>Chain async operations để đảm bảo thứ tự. Sử dụng promises hoặc async/await để sequence operations.</p>
  <h5>2. useReducer cho Complex State</h5>
  <pre><code>const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_START' });
    fetchUser().then(user => {
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    });
  }, [userId]);

  useEffect(() => {
    if (state.user) {
      dispatch({ type: 'FETCH_POSTS_START' });
      fetchPosts(state.user.id).then(posts => {
        dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
      });
    }
  }, [state.user]);
  </code></pre>
  <p>useReducer giúp manage complex state dependencies và ensure operations chạy theo đúng thứ tự dựa trên state changes.</p>
  <h5>3. React Query / SWR</h5>
  <p>Quản lý dependencies và caching tự động. React Query có built-in support cho dependent queries - queries có thể depend on results của queries khác, đảm bảo thứ tự execution.</p>
  <h5>4. AbortController</h5>
  <pre><code>useEffect(() => {
    const controller = new AbortController();
    fetchData({ signal: controller.signal });
    return () => controller.abort(); // Cancel nếu component unmount hoặc deps change
  }, [deps]);
  </code></pre>
  <p>AbortController giúp cancel in-flight requests khi dependencies change, tránh race conditions và stale data.</p>
      `,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Closure problem trong hook là gì?",
    answer: `
  <h3>Closure Problems trong React Hooks</h3>
  <h4>Vấn Đề Closure</h4>
  <p>Functions capture variables từ scope khi được tạo, không phải khi được gọi. Trong React, điều này có nghĩa là callbacks và effects capture values từ render khi chúng được tạo, không phải latest values. Đây là một trong những common pitfalls khi làm việc với hooks.</p>
  <h5>Ví Dụ Classic</h5>
  <pre><code>function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        console.log(count); // Luôn log giá trị cũ (0)!
        setCount(count + 1); // Luôn set về 1!
      }, 1000);
      return () => clearInterval(timer);
    }, []); // Empty deps - closure captures initial count = 0

    return &lt;div&gt;{count}&lt;/div&gt;;
  }
  </code></pre>
  <p>Trong ví dụ này, setInterval callback capture count = 0 từ initial render. Mỗi lần callback chạy, nó vẫn thấy count = 0, nên setCount(count + 1) luôn set về 1, không bao giờ tăng lên.</p>
  <h4>Stale Closure</h4>
  <p>Hooks capture stale values từ renders trước. Khi effect có empty dependency array, nó chỉ chạy một lần và capture values từ render đó. Nếu values thay đổi sau đó, effect vẫn thấy old values.</p>
  <h5>Giải Pháp</h5>
  <pre><code>// ✅ Thêm count vào dependencies
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // Dùng functional update - luôn dùng latest state
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Không cần count trong deps khi dùng functional update
  </code></pre>
  <p>Functional updates (setState(prev => ...)) luôn nhận latest state, không cần capture từ closure. Đây là cách tốt nhất để avoid stale closures với state updates.</p>
  <h4>Common Patterns</h4>
  <ul>
    <li><b>Functional Updates</b>: setState(prev => prev + 1) - Luôn dùng latest state, không cần dependencies. Phù hợp cho counters, accumulators, và state updates dựa trên previous state.</li>
    <li><b>useRef</b>: Mutable values không trigger re-render - useRef.current có thể update mà không cause re-render, và value luôn là latest. Phù hợp cho storing mutable values cần access trong callbacks.</li>
    <li><b>useCallback</b>: Stable function references - Wrap callbacks với useCallback và include dependencies để ensure callback luôn có latest values. Phù hợp cho callbacks được pass xuống child components.</li>
  </ul>
  <h4>React 18+ Solutions</h4>
  <ul>
    <li><b>Automatic Batching</b>: Giảm stale closures bằng cách batch state updates. Multiple setState calls trong event handlers được batch, giảm số lần effects chạy và stale closure issues.</li>
    <li><b>useDeferredValue</b>: Deferred updates giúp avoid stale closures trong concurrent rendering. Value được defer, giúp React có time để process updates và avoid capturing stale values.</li>
  </ul>
      `,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Làm sao tránh stale state?",
    answer: `
  <h3>Tránh Stale State trong React</h3>
  <h4>Stale State Là Gì?</h4>
  <p>State cũ, không phản ánh latest updates do closure hoặc async operations. Stale state xảy ra khi code sử dụng old state values thay vì current values. Điều này có thể gây bugs như counters không tăng, forms không update, hoặc UI hiển thị wrong data.</p>
  <h4>Giải Pháp</h4>
  <h5>1. Functional Updates</h5>
  <pre><code>// ✅ Luôn dùng latest state
  setCount(prevCount => prevCount + 1);
  setUser(prevUser => ({ ...prevUser, name }));
  </code></pre>
  <p>Functional updates luôn nhận latest state từ React, không phụ thuộc vào closure. Đây là cách an toàn nhất để update state dựa trên previous state.</p>
  <h5>2. useEffect Dependencies</h5>
  <pre><code>// ✅ Include tất cả dependencies
  useEffect(() => {
    fetchData(userId);
  }, [userId]); // Đừng bỏ userId! Nếu bỏ, effect sẽ dùng stale userId
  </code></pre>
  <p>Luôn include tất cả values từ component scope được sử dụng trong effect. ESLint rule exhaustive-deps giúp catch missing dependencies.</p>
  <h5>3. useRef cho Mutable Values</h5>
  <pre><code>const latestValue = useRef(value);
  latestValue.current = value; // Always latest - update mỗi render

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(latestValue.current); // Luôn log latest value
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps OK vì dùng ref
  </code></pre>
  <p>useRef giữ mutable value không trigger re-render. Value có thể update mỗi render mà không cause effect re-run, nhưng effect luôn thấy latest value qua .current.</p>
  <h5>4. useCallback với Dependencies</h5>
  <pre><code>const callback = useCallback(() => {
    doSomething(latestValue.current); // Access latest value qua ref
  }, []); // Stable reference, nhưng vẫn access latest value
  </code></pre>
  <p>useCallback với empty deps tạo stable function reference, nhưng function vẫn có thể access latest values qua refs hoặc functional updates.</p>
  <h5>5. State Batching</h5>
  <pre><code>// React 18 auto-batches
  setState(a);
  setState(b); // Single re-render, cả hai updates dùng latest state
  </code></pre>
  <p>React 18 tự động batch state updates, giảm stale state issues. Multiple setState calls trong event handlers được batch thành single update.</p>
  <h4>Advanced Patterns</h4>
  <ul>
    <li><b>useReducer</b>: Complex state logic với predictable updates. Reducer function nhận current state và action, return new state. Tránh stale state vì reducer luôn nhận latest state.</li>
    <li><b>Zustand/Jotai</b>: External state management với automatic subscriptions. State được manage outside component, tránh closure issues. Components subscribe và receive updates khi state changes.</li>
    <li><b>React Query</b>: Server state caching với automatic invalidation. React Query manage server state, handle stale data, và provide fresh data automatically. Tránh stale state issues với server data.</li>
  </ul>
      `,
    role: "senior",
    type: "hooks-advanced",
  },
  {
    question: "Khi nào nên dùng useReducer thay useState?",
    answer: `
  <h3>useReducer vs useState</h3>
  <h4>Khi Nên Dùng useReducer</h4>
  <h5>1. Complex State Logic</h5>
  <p>State có multiple sub-values hoặc interdependent updates. Khi state structure phức tạp với nhiều fields liên quan, useReducer giúp manage updates một cách organized và predictable.</p>
  <pre><code>const [state, dispatch] = useReducer(reducer, {
    user: null,
    posts: [],
    loading: false,
    error: null
  });
  </code></pre>
  <h5>2. Related State Updates</h5>
  <p>Nhiều state pieces thay đổi cùng lúc. Khi một action cần update multiple state values, useReducer giúp update tất cả trong một reducer function, đảm bảo consistency.</p>
  <h5>3. Predictable State Transitions</h5>
  <p>Cần business logic phức tạp trong state updates. Reducer functions là pure functions, dễ test và debug. State transitions được centralize trong reducer, dễ track và understand.</p>
  <h5>4. Performance với Deep Updates</h5>
  <p>State objects lớn, cần avoid re-renders. useReducer có thể optimize bằng cách return same object reference nếu state không thay đổi, giảm unnecessary re-renders.</p>
  <h4>Khi Dùng useState</h4>
  <h5>1. Simple State</h5>
  <p>Primitive values: string, number, boolean. useState đơn giản và đủ cho simple state. Không cần complexity của useReducer cho single values.</p>
  <h5>2. Independent Updates</h5>
  <p>State không liên quan lẫn nhau. Khi các state values độc lập, useState cho mỗi value đơn giản hơn useReducer. Mỗi state có thể update independently.</p>
  <h5>3. No Complex Logic</h5>
  <p>Không cần validation hoặc side effects. useState phù hợp cho simple state updates không cần business logic. Nếu chỉ cần set value, useState đơn giản hơn.</p>
  <h4>Comparison</h4>
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
    <tr>
      <td>Complexity</td>
      <td>Simple</td>
      <td>Complex</td>
    </tr>
  </table>
  <h4>Best Practice</h4>
  <ul>
    <li>Bắt đầu với useState: useState đơn giản hơn, phù hợp cho hầu hết cases. Chỉ switch sang useReducer khi state logic trở nên phức tạp.</li>
    <li>Refactor thành useReducer khi logic phức tạp: Khi có nhiều useState calls với related updates, consider refactor thành useReducer để improve organization và testability.</li>
    <li>Dùng Redux Toolkit cho global state: useReducer phù hợp cho local component state. Cho global state, Redux Toolkit provide better tooling và patterns.</li>
  </ul>
      `,
    role: "senior",
    type: "hooks-advanced",
  },
]
