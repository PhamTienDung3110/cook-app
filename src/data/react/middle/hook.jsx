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
]

export default hook
