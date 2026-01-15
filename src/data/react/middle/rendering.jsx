// rendering.js
// React Rendering Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const rendering = [
  {
    question: "React component re-render khi nào?",
    answer: `
<h3>Khi nào React component re-render?</h3>

<h4>1) State thay đổi</h4>
<pre><code>const [count, setCount] = useState(0);

setCount(count + 1); // ✅ Trigger re-render
</code></pre>

<h4>2) Props thay đổi</h4>
<pre><code>function Child({ value }) {
  // Re-render khi parent truyền props mới
  return &lt;div&gt;{value}&lt;/div&gt;;
}
</code></pre>

<h4>3) Context value thay đổi</h4>
<pre><code>const MyContext = createContext();

function Provider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    &lt;MyContext.Provider value={{ theme, setTheme }}&gt;
      {children}
    &lt;/MyContext.Provider&gt;
  );
}
</code></pre>

<h4>4) Parent component re-render</h4>
<p>Khi component cha re-render, component con cũng re-render theo mặc định.</p>

<h4>5) Hooks thay đổi</h4>
<ul>
  <li>useState setter</li>
  <li>useReducer dispatch</li>
  <li>Custom hooks return new values</li>
</ul>
`,
    role: "middle",
    type: "react-rendering",
  },

  {
    question: "Cách ngăn component re-render không cần thiết?",
    answer: `
<h3>Ngăn Re-render Không Cần Thiết</h3>

<h4>1) React.memo</h4>
<pre><code>const MyComponent = React.memo(function MyComponent({ value }) {
  return &lt;div&gt;{value}&lt;/div&gt;;
});

// Chỉ re-render khi props thực sự thay đổi
</code></pre>

<h4>2) useMemo cho expensive calculations</h4>
<pre><code>const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]); // Chỉ tính lại khi a hoặc b thay đổi
</code></pre>

<h4>3) useCallback cho functions</h4>
<pre><code>const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]); // Function reference ổn định khi count không đổi
</code></pre>

<h4>4) Split components</h4>
<p>Tách component thành nhiều phần nhỏ, chỉ re-render phần cần thiết.</p>

<h4>5) Key prop trong list</h4>
<pre><code>{items.map(item => (
  &lt;Item key={item.id} item={item} /&gt; // Giúp React track item chính xác
))}
</code></pre>
`,
    role: "middle",
    type: "react-rendering",
  },

  {
    question: "Virtual DOM khác gì Real DOM?",
    answer: `
<h3>Virtual DOM vs Real DOM</h3>

<h4>1) Virtual DOM</h4>
<ul>
  <li><b>Lightweight JavaScript object</b> represent DOM</li>
  <li><b>Không interact trực tiếp</b> với browser DOM</li>
  <li><b>React tạo và update</b> trong memory</li>
  <li><b>Batch updates</b> để tối ưu performance</li>
</ul>

<h4>2) Real DOM</h4>
<ul>
  <li><b>Heavy browser object</b> với nhiều properties/methods</li>
  <li><b>Directly interact</b> với browser APIs</li>
  <li><b>Slow khi update</b> - trigger layout, paint, composite</li>
  <li><b>Blocking operations</b></li>
</ul>

<h4>3) Tại sao Virtual DOM nhanh hơn?</h4>
<ol>
  <li><b>Batch updates</b>: Gom nhiều thay đổi thành 1 update</li>
  <li><b>Diff algorithm</b>: Chỉ update phần thực sự thay đổi</li>
  <li><b>Minimize DOM operations</b>: Giảm reflow/repaint</li>
  <li><b>Memory efficient</b>: Tính toán trong JavaScript trước</li>
</ol>

<h4>4) Reconciliation process</h4>
<pre><code>1. State/Props change → Component re-render
2. Create new Virtual DOM tree
3. Diff with previous Virtual DOM
4. Calculate minimal DOM updates
5. Batch and apply to Real DOM
</code></pre>
`,
    role: "middle",
    type: "react-rendering",
  },

  {
    question: "StrictMode trong React dùng để làm gì?",
    answer: `
<h3>React.StrictMode - Development Helper</h3>

<h4>1) Mục đích chính</h4>
<ul>
  <li><b>Phát hiện side effects</b> trong development</li>
  <li><b>Cảnh báo deprecated features</b></li>
  <li><b>Giúp code quality</b> và best practices</li>
</ul>

<h4>2) Double render detection</h4>
<pre><code>&lt;React.StrictMode&gt;
  &lt;App /&gt;
&lt;/React.StrictMode&gt;

// Component render 2 lần trong dev mode để phát hiện side effects
</code></pre>

<h4>3) Cảnh báo deprecated APIs</h4>
<ul>
  <li><b>findDOMNode</b> - deprecated</li>
  <li><b>String refs</b> - khuyến khích dùng callback refs</li>
  <li><b>Legacy context API</b> - khuyến khích new context</li>
</ul>

<h4>4) Phát hiện unsafe lifecycles</h4>
<ul>
  <li><b>componentWillMount</b></li>
  <li><b>componentWillReceiveProps</b></li>
  <li><b>componentWillUpdate</b></li>
</ul>

<h4>5) Lưu ý quan trọng</h4>
<ul>
  <li><b>Chỉ hoạt động trong development</b></li>
  <li><b>Không ảnh hưởng production</b></li>
  <li><b>Giúp catch bugs sớm</b></li>
  <li><b>Không cần thiết cho production build</b></li>
</ul>
`,
    role: "middle",
    type: "react-rendering",
  },

  {
    question: "Fragment trong React dùng khi nào?",
    answer: `
<h3>React Fragment - Group Elements Without Wrapper</h3>

<h4>1) Vấn đề cần giải quyết</h4>
<pre><code>// ❌ Thừa wrapper div
function ListItem({ items }) {
  return (
    &lt;div&gt; {/* Unnecessary wrapper */}
      {items.map(item => (
        &lt;div key={item.id}&gt;{item.name}&lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
}
</code></pre>

<h4>2) Giải pháp với Fragment</h4>
<pre><code>// ✅ Dùng Fragment
import { Fragment } from 'react';

function ListItem({ items }) {
  return (
    &lt;Fragment&gt;
      {items.map(item => (
        &lt;div key={item.id}&gt;{item.name}&lt;/div&gt;
      ))}
    &lt;/Fragment&gt;
  );
}

// Hoặc syntax ngắn hơn
function ListItem({ items }) {
  return (
    &lt;&gt;
      {items.map(item => (
        &lt;div key={item.id}&gt;{item.name}&lt;/div&gt;
      ))}
    &lt;/&gt;
  );
}
</code></pre>

<h4>3) Khi nào dùng Fragment?</h4>
<ul>
  <li><b>Return multiple elements</b> mà không muốn wrapper</li>
  <li><b>Clean DOM structure</b> - tránh div thừa</li>
  <li><b>Conditional rendering</b> - return multiple elements conditionally</li>
  <li><b>Table rows</b> - tránh break table structure</li>
</ul>

<h4>4) Fragment với key</h4>
<pre><code>// Khi cần key cho list
function ListWithKeys({ items }) {
  return (
    &lt;&gt;
      {items.map(item => (
        &lt;Fragment key={item.id}&gt;
          &lt;dt&gt;{item.term}&lt;/dt&gt;
          &lt;dd&gt;{item.description}&lt;/dd&gt;
        &lt;/Fragment&gt;
      ))}
    &lt;/&gt;
  );
}
</code></pre>

<h4>5) Performance benefits</h4>
<ul>
  <li><b>Shallow DOM tree</b> - ít nodes hơn</li>
  <li><b>Clean CSS selectors</b> - không có wrapper class</li>
  <li><b>Better semantic HTML</b></li>
</ul>
`,
    role: "middle",
    type: "react-rendering",
  },
]

export default rendering
