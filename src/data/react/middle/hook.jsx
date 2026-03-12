// hook.js
// React Hooks Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const hook = [
  {
    question: "useState hoạt động như thế nào?",
    answer: `
<h3>useState - State Management trong Function Components</h3>

<h4>1) Cơ bản syntax</h4>
<pre><code>const [state, setState] = useState(initialValue);

// Example
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', age: 0 });
const [items, setItems] = useState([]);
</code></pre>

<h4>2) State updates</h4>
<ul>
  <li><b>Synchronous trong component</b> nhưng trigger re-render async</li>
  <li><b>Batched updates</b> - multiple setState có thể được batch</li>
  <li><b>Functional updates</b> khi cần previous state</li>
</ul>

<h4>3) Functional updates pattern</h4>
<pre><code>// ✅ Safe với multiple updates
setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1);

// ❌ Có thể miss updates
setCount(count + 1);
setCount(count + 1);
</code></pre>

<h4>4) Lazy initial state</h4>
<pre><code>// Chỉ chạy 1 lần khi component mount
const [state, setState] = useState(() => {
  return expensiveComputation();
});
</code></pre>

<h4>5) State với objects/arrays</h4>
<pre><code>// ❌ Mutate trực tiếp (không trigger re-render)
const [user, setUser] = useState({ name: 'John', age: 30 });
user.age = 31; // Bad!

// ✅ Tạo object mới
setUser(prevUser => ({
  ...prevUser,
  age: 31
}));
</code></pre>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "useEffect dependencies hoạt động ra sao?",
    answer: `
<h3>useEffect Dependencies Array</h3>

<h4>1) Empty array []</h4>
<pre><code>useEffect(() => {
  console.log('Chỉ chạy 1 lần khi mount');
}, []); // Empty dependency array
</code></pre>

<h4>2) With dependencies</h4>
<pre><code>const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Chạy khi count thay đổi');
  return () => console.log('Cleanup');
}, [count]); // Re-run khi count thay đổi
</code></pre>

<h4>3) No dependency array</h4>
<pre><code>useEffect(() => {
  console.log('Chạy sau mỗi render');
}); // Re-run sau mỗi render
</code></pre>

<h4>4) Cleanup function</h4>
<pre><code>useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup khi unmount hoặc deps thay đổi
  };
}, []);
</code></pre>

<h4>5) Common mistakes</h4>
<ul>
  <li><b>Quên dependency</b> → stale closure</li>
  <li><b>Object/array làm dependency</b> → infinite loop</li>
  <li><b>Async trong useEffect</b> → race conditions</li>
</ul>

<h4>6) ESLint rule</h4>
<p>Dùng eslint-plugin-react-hooks để check missing dependencies.</p>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "useCallback và useMemo khác nhau thế nào?",
    answer: `
<h3>useCallback vs useMemo</h3>

<h4>1) useMemo - Memoize values</h4>
<pre><code>// Memoize computed value
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
</code></pre>

<h4>2) useCallback - Memoize functions</h4>
<pre><code>// Memoize function reference
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);
</code></pre>

<h4>3) Khi nào dùng?</h4>

<h5>useMemo:</h5>
<ul>
  <li>Expensive calculations</li>
  <li>Derived state từ props/state</li>
  <li>Prevent unnecessary re-computations</li>
</ul>

<h5>useCallback:</h5>
<ul>
  <li>Pass callbacks to memoized child components</li>
  <li>Prevent child re-renders caused by function identity</li>
  <li>Custom hooks that return functions</li>
</ul>

<h4>4) Performance consideration</h4>
<ul>
  <li><b>Không nên overuse</b> - có cost để check dependencies</li>
  <li><b>Chỉ dùng khi thực sự cần</b> - measure performance first</li>
  <li><b>Dependencies array quan trọng</b> - sai sẽ gây bugs</li>
</ul>

<h4>5) Alternative approach</h4>
<p>Sometimes moving state down or using context is better than memoization.</p>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "useRef dùng để làm gì?",
    answer: `
<h3>useRef - Access DOM elements & Persistent values</h3>

<h4>1) DOM access</h4>
<pre><code>function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Access DOM element
  };

  return (
    &lt;input ref={inputRef} /&gt;
  );
}
</code></pre>

<h4>2) Persistent values across renders</h4>
<pre><code>function Timer() {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return &lt;div&gt;Timer&lt;/div&gt;;
}
</code></pre>

<h4>3) Previous value tracking</h4>
<pre><code>function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function MyComponent({ value }) {
  const previousValue = usePrevious(value);
  // So sánh value hiện tại vs previous
}
</code></pre>

<h4>4) Instance variables</h4>
<pre><code>function VideoPlayer({ src }) {
  const playerRef = useRef(new VideoPlayerAPI());

  useEffect(() => {
    playerRef.current.load(src);
  }, [src]);
}
</code></pre>

<h4>5) Important notes</h4>
<ul>
  <li><b>Mutating ref.current không trigger re-render</b></li>
  <li><b>Refs persist across renders</b></li>
  <li><b>Không dùng refs cho data sẽ trigger re-render</b></li>
</ul>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "Custom hooks giúp gì trong React?",
    answer: `
<h3>Custom Hooks - Reusable Logic</h3>

<h4>1) Tại sao cần custom hooks?</h4>
<ul>
  <li><b>Share logic</b> giữa multiple components</li>
  <li><b>Avoid code duplication</b></li>
  <li><b>Testable logic</b> riêng biệt với UI</li>
  <li><b>Clean component code</b></li>
</ul>

<h4>2) Basic custom hook</h4>
<pre><code>function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement } = useCounter(0);
  return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>3) Custom hook with effects</h4>
<pre><code>function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
</code></pre>

<h4>4) Rules for custom hooks</h4>
<ul>
  <li><b>Start with "use"</b> - useCounter, useLocalStorage</li>
  <li><b>Only call hooks at top level</b></li>
  <li><b>Can call other hooks</b></li>
  <li><b>Return whatever you want</b> - object, array, primitive</li>
</ul>

<h4>5) Testing custom hooks</h4>
<p>Dùng @testing-library/react-hooks để test custom hooks independently.</p>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "useReducer khi nào nên dùng thay useState?",
    answer: `
<h3>useReducer – Quản lý state phức tạp</h3>

<h4>1) Khi nào dùng useReducer?</h4>
<ul>
  <li><b>State có nhiều sub-values liên quan</b> (object/array phức tạp)</li>
  <li><b>State transition phụ thuộc vào action type</b> (add, remove, update, reset)</li>
  <li><b>Logic update phức tạp</b> cần tách riêng khỏi component</li>
  <li><b>Testing dễ hơn</b> vì reducer là pure function</li>
</ul>

<h4>2) Basic syntax</h4>
<pre><code>const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {state.count} (step: {state.step})&lt;/p&gt;
      &lt;button onClick={() =&gt; dispatch({ type: 'INCREMENT' })}&gt;+&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch({ type: 'DECREMENT' })}&gt;-&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch({ type: 'RESET' })}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>3) useReducer vs useState</h4>
<table>
  <tr>
    <th>useState</th>
    <th>useReducer</th>
  </tr>
  <tr>
    <td>State đơn giản (string, number, boolean)</td>
    <td>State phức tạp (object, array với nhiều action)</td>
  </tr>
  <tr>
    <td>Ít state transitions</td>
    <td>Nhiều action types khác nhau</td>
  </tr>
  <tr>
    <td>Logic update đơn giản</td>
    <td>Logic update phức tạp, cần tách riêng</td>
  </tr>
</table>

<h4>4) Kết hợp useReducer + Context</h4>
<pre><code>const TodoContext = createContext();

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  return (
    &lt;TodoContext.Provider value={{ state, dispatch }}&gt;
      {children}
    &lt;/TodoContext.Provider&gt;
  );
}
</code></pre>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "useLayoutEffect khác gì useEffect?",
    answer: `
<h3>useLayoutEffect vs useEffect</h3>

<h4>1) Thứ tự thực thi</h4>
<pre><code>// useEffect: chạy SAU khi browser paint
useEffect(() =&gt; {
  console.log('useEffect - sau paint');
}, []);

// useLayoutEffect: chạy TRƯỚC khi browser paint
useLayoutEffect(() =&gt; {
  console.log('useLayoutEffect - trước paint');
}, []);
</code></pre>

<h4>2) Timeline</h4>
<ol>
  <li>React renders component (virtual DOM)</li>
  <li>React updates real DOM</li>
  <li><b>useLayoutEffect runs</b> (synchronous, blocks paint)</li>
  <li>Browser paints screen</li>
  <li><b>useEffect runs</b> (asynchronous, after paint)</li>
</ol>

<h4>3) Khi nào dùng useLayoutEffect?</h4>
<ul>
  <li><b>Đo DOM elements</b>: getBoundingClientRect(), offsetWidth</li>
  <li><b>Scroll position</b>: cần set scroll trước khi user thấy</li>
  <li><b>Tránh visual flicker</b>: khi cần thay đổi DOM ngay lập tức</li>
  <li><b>Tooltips/Popovers</b>: tính position trước khi hiển thị</li>
</ul>

<pre><code>function Tooltip({ targetRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef();

  // Dùng useLayoutEffect để tránh flicker
  useLayoutEffect(() =&gt; {
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.left
    });
  }, [targetRef]);

  return (
    &lt;div ref={tooltipRef} style={{ position: 'fixed', ...position }}&gt;
      {children}
    &lt;/div&gt;
  );
}
</code></pre>

<h4>4) Lưu ý quan trọng</h4>
<ul>
  <li><b>Mặc định dùng useEffect</b> – hầu hết trường hợp không cần useLayoutEffect</li>
  <li><b>useLayoutEffect blocks painting</b> – nếu logic nặng sẽ làm UI lag</li>
  <li><b>SSR warning</b>: useLayoutEffect không chạy trên server, sẽ có warning</li>
</ul>
`,
    role: "middle",
    type: "hooks-advanced",
  },

  {
    question: "useTransition và useDeferredValue trong React 18?",
    answer: `
<h3>Concurrent Features – React 18</h3>

<h4>1) useTransition</h4>
<p><b>Đánh dấu state update là "non-urgent"</b>, cho phép React ưu tiên render urgent updates trước.</p>

<pre><code>import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) =&gt; {
    // Urgent: update input ngay lập tức
    setQuery(e.target.value);

    // Non-urgent: filter results có thể chậm hơn
    startTransition(() =&gt; {
      const filtered = filterLargeList(e.target.value);
      setResults(filtered);
    });
  };

  return (
    &lt;div&gt;
      &lt;input value={query} onChange={handleChange} /&gt;
      {isPending &amp;&amp; &lt;div&gt;Updating...&lt;/div&gt;}
      &lt;ResultsList results={results} /&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>2) useDeferredValue</h4>
<p><b>Tạo "deferred" version của một value</b> – React sẽ render với giá trị cũ trước, rồi re-render với giá trị mới ở background.</p>

<pre><code>import { useState, useDeferredValue, memo } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    &lt;div style={{ opacity: isStale ? 0.5 : 1 }}&gt;
      &lt;HeavyList query={deferredQuery} /&gt;
    &lt;/div&gt;
  );
}

const HeavyList = memo(function HeavyList({ query }) {
  // Component nặng, chỉ re-render khi deferredQuery thay đổi
  const items = filterItems(query);
  return items.map(item =&gt; &lt;div key={item.id}&gt;{item.name}&lt;/div&gt;);
});
</code></pre>

<h4>3) useTransition vs useDeferredValue</h4>
<table>
  <tr>
    <th>useTransition</th>
    <th>useDeferredValue</th>
  </tr>
  <tr>
    <td>Wrap state <b>setter</b></td>
    <td>Wrap <b>value</b> (thường là props)</td>
  </tr>
  <tr>
    <td>Có isPending flag</td>
    <td>So sánh value cũ vs mới</td>
  </tr>
  <tr>
    <td>Kiểm soát update nào là non-urgent</td>
    <td>Component con tự defer giá trị nhận được</td>
  </tr>
</table>

<h4>4) Use cases phổ biến</h4>
<ul>
  <li><b>Search/filter</b> danh sách lớn</li>
  <li><b>Tab switching</b> – chuyển tab mà không lag input</li>
  <li><b>Charts/visualizations</b> – render heavy components</li>
  <li><b>Autocomplete</b> – giữ input responsive</li>
</ul>
`,
    role: "middle",
    type: "hooks-advanced",
  },
]

export default hook
