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
        <h3>Ngăn Re-render Không Cần Thiết trong React</h3>
        
        <p>
        Re-render là hành vi <b>bình thường và cần thiết</b> trong React.
        Vấn đề không phải là "tránh re-render", mà là:
        <b>tránh re-render không cần thiết và tốn kém</b>.
        </p>
        
        <hr/>
        
        <h4>I. Khi nào React component bị re-render?</h4>
        <ul>
          <li>State của component thay đổi</li>
          <li>Props từ parent thay đổi</li>
          <li>Parent component re-render (mặc định)</li>
          <li>Context value thay đổi</li>
        </ul>
        
        <hr/>
        
        <h4>1) React.memo – Ngăn re-render khi props không đổi</h4>
        <p>
        <code>React.memo</code> là <b>Higher-Order Component</b> dùng cho <b>function component</b>,
        giúp React skip re-render nếu props <b>shallow equal</b>.
        </p>
        
        <pre><code>const MyComponent = React.memo(function MyComponent({ value }) {
          return &lt;div&gt;{value}&lt;/div&gt;;
        });
        
        Component chỉ re-render khi 'value' thay đổi
        </code></pre>
        
        <ul>
          <li>So sánh props bằng <b>shallow comparison</b></li>
          <li>Hiệu quả với component:
            <ul>
              <li>Render nặng</li>
              <li>Props ít và ổn định</li>
            </ul>
          </li>
        </ul>
        
        <p><b>⚠️ Lưu ý:</b> Không nên bọc <i>mọi component</i> bằng React.memo.</p>
        
        <hr/>
        
        <h4>2) useMemo – Memoize giá trị tính toán nặng</h4>
        <p>
        <code>useMemo</code> dùng để <b>cache kết quả của phép tính</b>,
        không phải để ngăn re-render component.
        </p>
        
        <pre><code>const expensiveValue = useMemo(() => {
          return computeExpensiveValue(a, b);
        }, [a, b]); // Chỉ tính lại khi a hoặc b thay đổi
        </code></pre>
        
        <ul>
          <li>Component vẫn re-render</li>
          <li>Chỉ tránh việc <b>recompute tốn kém</b></li>
        </ul>
        
        <p><b>⚠️ Anti-pattern:</b> Dùng useMemo cho mọi biến đơn giản.</p>
        
        <hr/>
        
        <h4>3) useCallback – Ổn định reference của function</h4>
        <p>
        Mỗi lần component render, function mới sẽ được tạo.
        Điều này có thể làm child component bị re-render không cần thiết.
        </p>
        
        <pre><code>const handleClick = useCallback(() => {
          setCount(c => c + 1);
        }, []); // Function reference ổn định
        </code></pre>
        
        <ul>
          <li>Dùng khi:
            <ul>
              <li>Function truyền xuống component con</li>
              <li>Component con dùng React.memo</li>
            </ul>
          </li>
        </ul>
        
        <p><b>⚠️ Lưu ý:</b> useCallback chỉ có ý nghĩa khi reference stability quan trọng.</p>
        
        <hr/>
        
        <h4>4) Tách (Split) component hợp lý</h4>
        <p>
        Một component lớn re-render sẽ kéo theo toàn bộ UI con.
        Giải pháp tốt nhất thường là <b>tách component</b>.
        </p>
        
        <ul>
          <li>Localize state – state ở đâu, render ở đó</li>
          <li>Giảm phạm vi ảnh hưởng của re-render</li>
          <li>Đây là cách tối ưu <b>đơn giản và hiệu quả nhất</b></li>
        </ul>
        
        <hr/>
        
        <h4>5) Key prop – Giúp React diff chính xác list</h4>
        <pre><code>{items.map(item => (
          &lt;Item key={item.id} item={item} /&gt;
        ))}
        </code></pre>
        
        <ul>
          <li>Key giúp React:
            <ul>
              <li>Xác định item nào thay đổi</li>
              <li>Tránh unmount/mount không cần thiết</li>
            </ul>
          </li>
          <li>Không nên dùng <code>index</code> làm key nếu list có reorder</li>
        </ul>
        
        <hr/>
        
        <h4>VI. Chiến lược tổng quát để tối ưu re-render</h4>
        <ol>
          <li>Đặt state càng gần nơi dùng càng tốt</li>
          <li>Tách component trước khi dùng memo</li>
          <li>Chỉ dùng React.memo / useMemo / useCallback khi có vấn đề thật</li>
          <li>Đo bằng React DevTools Profiler trước khi tối ưu</li>
        </ol>
        
        <hr/>
        
        <h3>🔥 Trả lời khi đi phỏng vấn</h3>
        
        <p><b>Phiên bản ngắn – Middle:</b></p>
        <blockquote>
        Để tránh re-render không cần thiết, tôi thường tách component hợp lý,
        sử dụng React.memo cho component con khi props ổn định,
        useMemo cho các phép tính nặng và useCallback để giữ ổn định function reference
        khi truyền xuống component con.
        </blockquote>
        
        <p><b>Phiên bản sâu – Senior:</b></p>
        <blockquote>
        Re-render không phải vấn đề, vấn đề là re-render tốn kém.
        Tôi ưu tiên thiết kế component và colocate state trước.
        Chỉ khi đã xác định bottleneck bằng profiler,
        tôi mới dùng React.memo, useMemo hoặc useCallback.
        Mục tiêu là giảm phạm vi render và số DOM mutations,
        không phải loại bỏ re-render.
        </blockquote>
        `,        
        role: "middle",
        type: "react-rendering",
      },

      {
        question: "Virtual DOM khác gì Real DOM?",
        answer: `
    <h3>Virtual DOM vs Real DOM</h3>

    <h4>I. Real DOM là gì?</h4>
    <ul>
      <li><b>Real DOM</b> là cây DOM thật do browser quản lý</li>
      <li>Mỗi node là <b>browser object nặng</b> (nhiều properties, methods)</li>
      <li>Khi update DOM:
        <ul>
          <li>Trigger <b>recalculate style</b></li>
          <li>Trigger <b>layout (reflow)</b></li>
          <li>Trigger <b>paint & composite</b></li>
        </ul>
      </li>
      <li>Các bước này <b>tốn CPU</b> và có thể <b>block main thread</b></li>
    </ul>

    <h4>II. Virtual DOM là gì?</h4>
    <ul>
      <li><b>Virtual DOM</b> là <b>JavaScript object</b> mô phỏng cấu trúc DOM</li>
      <li>Không liên quan trực tiếp tới browser rendering</li>
      <li>Được tạo và cập nhật <b>trong memory</b></li>
      <li>Mỗi lần state/props thay đổi → React tạo <b>Virtual DOM mới</b></li>
    </ul>

    <h4>III. Vì sao cập nhật Real DOM chậm?</h4>
    <ul>
      <li>DOM là <b>shared resource</b> của browser</li>
      <li>Mỗi thay đổi nhỏ đều có thể gây:
        <ul>
          <li>Reflow toàn bộ layout</li>
          <li>Repaint nhiều vùng không cần thiết</li>
        </ul>
      </li>
      <li>Nhiều DOM updates liên tiếp = <b>nhiều lần render tốn kém</b></li>
    </ul>

    <h4>IV. Virtual DOM giải quyết vấn đề gì?</h4>
    <ul>
      <li><b>Không update DOM ngay</b> khi state thay đổi</li>
      <li>Tính toán tất cả thay đổi <b>trong JavaScript trước</b></li>
      <li>So sánh Virtual DOM cũ và mới để tìm ra:
        <ul>
          <li>Node nào thực sự thay đổi</li>
          <li>Update tối thiểu cần áp dụng</li>
        </ul>
      </li>
    </ul>

    <h4>V. Reconciliation (Diffing) hoạt động thế nào?</h4>
    <pre><code>1. State / Props thay đổi
    2. Component render → tạo Virtual DOM mới
    3. Diff Virtual DOM mới vs Virtual DOM cũ
    4. Xác định minimal set of changes
    5. Batch các thay đổi
    6. Apply một lần xuống Real DOM
    </code></pre>

    <h4>VI. Tại sao Virtual DOM thường nhanh hơn?</h4>
    <ol>
      <li><b>Batch updates</b>: gom nhiều setState thành 1 DOM update</li>
      <li><b>Diffing</b>: chỉ update node thực sự thay đổi</li>
      <li><b>Giảm reflow / repaint</b></li>
      <li><b>JS execution rẻ hơn DOM manipulation</b></li>
    </ol>

    <h4>VII. Hiểu đúng – Virtual DOM KHÔNG phải lúc nào cũng nhanh hơn</h4>
    <ul>
      <li>Virtual DOM vẫn có <b>chi phí tạo và diff</b></li>
      <li>Với UI rất đơn giản → DOM trực tiếp có thể nhanh hơn</li>
      <li>Lợi ích lớn nhất:
        <ul>
          <li>UI phức tạp</li>
          <li>Nhiều state updates</li>
          <li>Quản lý render predictable</li>
        </ul>
      </li>
    </ul>

    <hr/>

    <h3>🔥 Trả lời NGẮN GỌN khi đi phỏng vấn</h3>

    <p><b>Phiên bản 1 – Chuẩn Middle:</b></p>
    <blockquote>
    Virtual DOM là một bản sao nhẹ của Real DOM được giữ trong memory.
    React không update DOM ngay mà sẽ so sánh Virtual DOM cũ và mới để tìm ra thay đổi tối thiểu,
    sau đó batch và apply xuống Real DOM, giúp giảm số lần reflow và repaint.
    </blockquote>

    <p><b>Phiên bản 2 – Chuẩn Senior:</b></p>
    <blockquote>
    Real DOM update tốn kém vì mỗi thay đổi có thể trigger layout và paint.
    Virtual DOM cho phép React tính toán toàn bộ thay đổi trong JavaScript trước,
    sử dụng reconciliation để xác định minimal DOM mutations,
    từ đó batch và apply hiệu quả hơn.
    Virtual DOM không làm DOM nhanh hơn,
    mà giúp kiểm soát và tối ưu việc update DOM.
    </blockquote>
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

  {
    question: "React Fiber architecture hoạt động thế nào?",
    answer: `
<h3>React Fiber Architecture</h3>

<h4>1) Fiber là gì?</h4>
<ul>
  <li><b>Fiber</b> là unit of work trong React reconciliation engine</li>
  <li>Mỗi React element tương ứng với một <b>Fiber node</b></li>
  <li>Fiber cho phép React <b>chia nhỏ rendering</b> thành nhiều chunks</li>
  <li>Có thể <b>pause, resume, abort</b> rendering work</li>
</ul>

<h4>2) Tại sao cần Fiber?</h4>
<ul>
  <li><b>Stack reconciler cũ</b>: Render đồng bộ, block main thread</li>
  <li><b>Fiber reconciler mới</b>: Render async, chia nhỏ work units</li>
  <li><b>Priority-based rendering</b>: User interactions ưu tiên hơn background updates</li>
</ul>

<h4>3) Fiber node structure</h4>
<pre><code>// Mỗi Fiber node chứa:
{
  type: 'div',            // Element type
  key: null,              // Key for reconciliation
  child: fiberNode,       // First child
  sibling: fiberNode,     // Next sibling
  return: fiberNode,      // Parent
  stateNode: domElement,  // DOM element
  pendingProps: {},       // New props
  memoizedProps: {},      // Current props
  memoizedState: {},      // Current state
  effectTag: 'UPDATE',    // Side effect type
  alternate: fiberNode,   // Work-in-progress ↔ current
}
</code></pre>

<h4>4) Two phases of rendering</h4>

<h5>Phase 1: Render (Reconciliation) – interruptible</h5>
<ul>
  <li>Xây dựng work-in-progress tree</li>
  <li>Diff virtual DOM cũ vs mới</li>
  <li>Có thể bị interrupt bởi higher priority work</li>
</ul>

<h5>Phase 2: Commit – synchronous, không thể interrupt</h5>
<ul>
  <li>Apply thay đổi xuống real DOM</li>
  <li>Chạy lifecycle methods (componentDidMount, useEffect)</li>
  <li>Phải chạy liên tục để đảm bảo UI consistency</li>
</ul>

<h4>5) Concurrent Mode (React 18+)</h4>
<ul>
  <li><b>Time slicing</b>: Chia rendering work thành chunks nhỏ</li>
  <li><b>Priority lanes</b>: Urgent vs non-urgent updates</li>
  <li><b>Suspense</b>: Pause rendering chờ data</li>
  <li><b>useTransition</b>: Mark non-urgent updates</li>
</ul>
`,
    role: "middle",
    type: "react-rendering",
  },

  {
    question: "Reconciliation algorithm của React hoạt động ra sao?",
    answer: `
<h3>React Reconciliation Algorithm</h3>

<h4>1) Hai giả định chính</h4>
<ul>
  <li><b>Hai elements khác type</b> → tạo cây hoàn toàn mới</li>
  <li><b>Key prop</b> giúp xác định element nào stable qua các lần render</li>
</ul>

<h4>2) Diffing by element type</h4>
<pre><code>// Khác type → unmount cây cũ, mount cây mới
// Before:
&lt;div&gt;&lt;Counter /&gt;&lt;/div&gt;

// After:
&lt;span&gt;&lt;Counter /&gt;&lt;/span&gt;
// → Counter bị unmount rồi mount lại (state mất)
</code></pre>

<h4>3) Same type → update props</h4>
<pre><code>// Cùng type → React keep DOM node, chỉ update attributes
// Before:
&lt;div className="old" title="hello" /&gt;

// After:
&lt;div className="new" title="hello" /&gt;
// → Chỉ update className, giữ nguyên DOM node
</code></pre>

<h4>4) List diffing với Keys</h4>
<pre><code>// ❌ Không có key → React so sánh theo index
// Thêm item đầu list → re-render toàn bộ list
&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;  // Changed from Item 1 → New Item
  &lt;li&gt;Item 2&lt;/li&gt;  // Changed from Item 2 → Item 1
  &lt;li&gt;Item 3&lt;/li&gt;  // New element
&lt;/ul&gt;

// ✅ Có key → React biết item nào thêm/xóa/di chuyển
&lt;ul&gt;
  {items.map(item =&gt; (
    &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;
  ))}
&lt;/ul&gt;
</code></pre>

<h4>5) Key prop best practices</h4>
<ul>
  <li><b>Dùng stable, unique ID</b> (database ID, UUID)</li>
  <li><b>Tránh dùng index</b> nếu list có thể reorder/filter</li>
  <li><b>Index OK khi</b>: list static, không reorder, không filter</li>
  <li><b>Key phải unique trong siblings</b>, không cần global unique</li>
</ul>

<h4>6) Performance tips từ reconciliation</h4>
<ul>
  <li><b>Giữ component type ổn định</b>: Không define component trong render</li>
  <li><b>Key ổn định</b>: Tránh random key (Math.random())</li>
  <li><b>Cấu trúc cây ổn định</b>: Tránh thay đổi nesting level</li>
</ul>
`,
    role: "middle",
    type: "react-rendering",
  },

  {
    question: "Error Boundaries trong React hoạt động thế nào?",
    answer: `
<h3>Error Boundaries</h3>

<h4>1) Error Boundaries là gì?</h4>
<ul>
  <li><b>React component</b> bắt JavaScript errors ở component con</li>
  <li>Hiển thị <b>fallback UI</b> thay vì crash toàn bộ app</li>
  <li>Chỉ catch được errors trong <b>rendering, lifecycle, constructors</b></li>
  <li><b>Phải dùng class component</b> (chưa có hook API)</li>
</ul>

<h4>2) Implementation</h4>
<pre><code>class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state khi error xảy ra
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error (gửi tới error tracking service)
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
    // Send to Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        &lt;div&gt;
          &lt;h2&gt;Đã xảy ra lỗi&lt;/h2&gt;
          &lt;button onClick={() =&gt; this.setState({ hasError: false })}&gt;
            Thử lại
          &lt;/button&gt;
        &lt;/div&gt;
      );
    }
    return this.props.children;
  }
}
</code></pre>

<h4>3) Cách sử dụng</h4>
<pre><code>// Wrap từng section riêng biệt
function App() {
  return (
    &lt;div&gt;
      &lt;ErrorBoundary fallback={&lt;div&gt;Header error&lt;/div&gt;}&gt;
        &lt;Header /&gt;
      &lt;/ErrorBoundary&gt;

      &lt;ErrorBoundary fallback={&lt;div&gt;Content error&lt;/div&gt;}&gt;
        &lt;MainContent /&gt;
      &lt;/ErrorBoundary&gt;

      &lt;ErrorBoundary fallback={&lt;div&gt;Sidebar error&lt;/div&gt;}&gt;
        &lt;Sidebar /&gt;
      &lt;/ErrorBoundary&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>4) Không catch được</h4>
<ul>
  <li><b>Event handlers</b> → dùng try/catch trong handler</li>
  <li><b>Async code</b> (setTimeout, fetch) → dùng try/catch</li>
  <li><b>Server-side rendering</b></li>
  <li><b>Errors trong chính Error Boundary</b></li>
</ul>

<h4>5) react-error-boundary (recommended)</h4>
<pre><code>import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    &lt;div&gt;
      &lt;p&gt;Something went wrong: {error.message}&lt;/p&gt;
      &lt;button onClick={resetErrorBoundary}&gt;Try again&lt;/button&gt;
    &lt;/div&gt;
  );
}

function App() {
  return (
    &lt;ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() =&gt; { /* reset state */ }}
      onError={(error) =&gt; logErrorToService(error)}
    &gt;
      &lt;MyComponent /&gt;
    &lt;/ErrorBoundary&gt;
  );
}
</code></pre>
`,
    role: "middle",
    type: "react-rendering",
  },
]

export default rendering
