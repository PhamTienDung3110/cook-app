// hook.ts
// Advanced Hooks Q&A (Senior) — answers as HTML strings
// NOTE: If you render these answers in the browser, sanitize HTML to prevent XSS.

export const hook = [
  // =================== HOOKS NÂNG CAO ===================
  {
    question: "Custom hook có lifecycle riêng không?",
    answer: `
<h3>Custom Hook có lifecycle riêng không?</h3>

<h4>Kết luận</h4>
<p><b>Không.</b> Custom hook chỉ là <b>một function</b> dùng để gom và tái sử dụng logic. Nó <b>không có lifecycle độc lập</b> như component (mount/update/unmount).</p>

<h4>Vì sao?</h4>
<ul>
  <li><b>Custom hook không phải “instance”</b>: React không tạo instance riêng cho hook. Hook chạy “bên trong” lần render của component đang gọi nó.</li>
  <li><b>Hook chạy theo lifecycle của component</b>: Khi component mount/update/unmount, các hook bên trong (kể cả custom hook) cũng chạy tương ứng.</li>
  <li><b>Không render UI</b>: Hook không tạo JSX; nó chỉ trả về data/callbacks cho component.</li>
</ul>

<h4>“Giống lifecycle” là nhờ useEffect/useLayoutEffect</h4>
<p>Bạn có thể mô phỏng mount/unmount bằng effect:</p>
<pre><code>function useSocket(roomId: string) {
  // mount + cleanup theo lifecycle của component dùng hook
  React.useEffect(() => {
    const socket = connect(roomId);
    return () => socket.disconnect(); // unmount cleanup
  }, [roomId]);
}
</code></pre>

<h4>Điểm cần nhớ (React 18+)</h4>
<ul>
  <li><b>StrictMode (dev)</b> có thể khiến effect “mount → cleanup → mount” để lộ bug side-effects. Đây là behavior dev-only.</li>
  <li>Custom hook chỉ “tổ chức logic”; lifecycle thật sự vẫn là của component gọi hook.</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },

  {
    question: "useEffect vs useLayoutEffect khác nhau thế nào?",
    answer: `
<h3>useEffect vs useLayoutEffect</h3>

<h4>Khác nhau chính: thời điểm chạy & có block paint không</h4>
<table>
  <tr>
    <th>Hook</th>
    <th>Chạy khi nào?</th>
    <th>Block browser paint?</th>
    <th>Dùng cho</th>
  </tr>
  <tr>
    <td><b>useEffect</b></td>
    <td>Sau khi React commit DOM và <b>thường sau paint</b></td>
    <td><b>Không</b></td>
    <td>Data fetching, subscriptions, logging, sync với external systems</td>
  </tr>
  <tr>
    <td><b>useLayoutEffect</b></td>
    <td>Sau commit DOM nhưng <b>trước paint</b></td>
    <td><b>Có</b> (synchronous)</td>
    <td>Đo layout/size/position và chỉnh DOM để <b>tránh flicker</b></td>
  </tr>
</table>

<h4>useEffect</h4>
<ul>
  <li>Không chặn UI, phù hợp cho hầu hết side effects.</li>
  <li>Nếu effect sửa layout (setState để thay đổi DOM), có thể gây <b>flicker</b> vì user đã thấy frame trước đó.</li>
</ul>

<h4>useLayoutEffect</h4>
<ul>
  <li>Dùng khi bạn cần <b>đo DOM</b> (getBoundingClientRect, scrollHeight, …) rồi setState ngay để layout đúng trước khi user thấy.</li>
  <li>Vì nó block paint, nếu logic nặng sẽ làm UI “đơ”.</li>
</ul>

<h4>Rule of thumb</h4>
<ul>
  <li><b>Mặc định dùng useEffect</b>.</li>
  <li>Chỉ dùng <b>useLayoutEffect</b> khi bạn gặp vấn đề “nhảy layout / flash” mà useEffect không giải quyết được (tooltip positioning, scroll restoration, measure-then-render).</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },

  {
    question: "Vì sao useEffect không đảm bảo thứ tự async?",
    answer: `
<h3>Vì sao useEffect không đảm bảo thứ tự async?</h3>

<h4>Điểm quan trọng</h4>
<ul>
  <li><b>React đảm bảo thứ tự gọi “effect callbacks”</b> trong cùng một commit: các effects được chạy theo thứ tự khai báo trong component.</li>
  <li>Nhưng <b>async bên trong effect</b> (fetch, timeout, promise, websocket) <b>không có gì đảm bảo</b> sẽ hoàn thành theo thứ tự bạn mong muốn.</li>
</ul>

<h4>Tại sao async “lộn thứ tự”?</h4>
<ul>
  <li><b>Network / scheduler non-deterministic</b>: request B có thể trả về trước A.</li>
  <li><b>Re-render nhanh</b>: deps đổi liên tục (typing) tạo nhiều request “in-flight” chồng chéo.</li>
  <li><b>Concurrent rendering</b>: React có thể commit các update với nhịp khác nhau; effect cleanup và setup có thể chạy nhiều lần (đặc biệt dev StrictMode).</li>
</ul>

<h4>Ví dụ race condition</h4>
<pre><code>React.useEffect(() => {
  fetch("/api/users/" + userId).then(setUser);
}, [userId]);

// userId đổi nhanh: request cũ trả về sau -> ghi đè data mới
</code></pre>

<h4>Cách xử lý chuẩn</h4>

<h5>1) Cancel/ignore kết quả cũ (pattern phổ biến nhất)</h5>
<pre><code>React.useEffect(() => {
  let cancelled = false;

  (async () => {
    const res = await fetch("/api/users/" + userId);
    const data = await res.json();
    if (!cancelled) setUser(data);
  })();

  return () => { cancelled = true; };
}, [userId]);
</code></pre>

<h5>2) AbortController cho fetch</h5>
<pre><code>React.useEffect(() => {
  const controller = new AbortController();

  (async () => {
    try {
      const res = await fetch("/api/users/" + userId, { signal: controller.signal });
      setUser(await res.json());
    } catch (e) {
      // ignore abort errors
    }
  })();

  return () => controller.abort();
}, [userId]);
</code></pre>

<h5>3) Dependent queries (React Query / RTK Query)</h5>
<p>Thay vì tự quản lý race/cancel, dùng library có built-in caching + dedupe + cancellation + dependent queries.</p>

<h5>4) Nếu cần “chạy tuần tự”</h5>
<p>Chain promise/await trong cùng một effect, hoặc tách state để effect thứ 2 phụ thuộc vào kết quả effect thứ 1.</p>
`,
    role: "senior",
    type: "hooks-advanced",
  },

  {
    question: "Closure problem trong hook là gì?",
    answer: `
<h3>Closure problem (stale closure) trong hooks</h3>

<h4>Khái niệm</h4>
<p>Trong JS, function “đóng” (closure) lại các biến tại thời điểm nó được tạo ra. Trong React, callback/effect được tạo ở <b>một lần render</b> nào đó sẽ “nhớ” state/props của render đó — nên có thể bị <b>stale</b> nếu state/props thay đổi về sau.</p>

<h4>Ví dụ kinh điển</h4>
<pre><code>function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      // count ở đây bị "đóng" tại render đầu tiên nếu deps là []
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // ❌ stale closure

  return &lt;div&gt;{count}&lt;/div&gt;;
}
</code></pre>

<h4>Cách fix chuẩn</h4>

<h5>1) Functional update (an toàn nhất cho state update dựa trên previous state)</h5>
<pre><code>setCount(prev => prev + 1);
</code></pre>

<h5>2) Thêm dependencies đúng</h5>
<p>Nếu callback thực sự phụ thuộc vào biến nào, hãy đưa biến đó vào dependency array (và đảm bảo cleanup đúng).</p>

<h5>3) useRef để giữ “latest value”</h5>
<pre><code>const latest = React.useRef(value);
latest.current = value;

React.useEffect(() => {
  const id = setInterval(() => {
    console.log(latest.current); // luôn là 최신
  }, 1000);
  return () => clearInterval(id);
}, []);
</code></pre>

<h5>4) useCallback đúng cách</h5>
<p>useCallback chỉ giúp <b>ổn định reference</b>, không tự “làm mới” closure nếu bạn bỏ deps. Nếu callback cần state/props mới, phải có deps hoặc dùng ref/functional update.</p>

<h4>Ghi chú</h4>
<ul>
  <li>Đây là behavior “đúng” của JS + React render model, không phải bug của React.</li>
  <li>ESLint exhaustive-deps giúp bắt lỗi stale closure phổ biến.</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },

  {
    question: "Làm sao tránh stale state?",
    answer: `
<h3>Cách tránh stale state</h3>

<h4>1) Dùng functional updates khi update dựa trên state trước đó</h4>
<pre><code>setCount(prev => prev + 1);
setForm(prev => ({ ...prev, name: nextName }));
</code></pre>

<h4>2) Dependency array phải đầy đủ</h4>
<p>Mọi biến từ scope bạn dùng trong effect/callback (mà không phải stable) đều nên có trong deps.</p>
<pre><code>React.useEffect(() => {
  doSomething(userId);
}, [userId]);
</code></pre>

<h4>3) Cancel/abort async để tránh kết quả cũ ghi đè</h4>
<ul>
  <li>AbortController (fetch)</li>
  <li>Flag cancelled (generic promises)</li>
</ul>

<h4>4) useRef cho “latest” khi bạn cần callback stable nhưng đọc data mới</h4>
<pre><code>const latestQuery = React.useRef(query);
latestQuery.current = query;

const onTick = React.useCallback(() => {
  search(latestQuery.current);
}, []);
</code></pre>

<h4>5) Tránh derived state sai</h4>
<ul>
  <li>Đừng copy props vào state nếu không cần.</li>
  <li>Derived data nên tính bằng memo/selector thay vì lưu state riêng.</li>
</ul>

<h4>6) Với server state: dùng library</h4>
<p>React Query/RTK Query xử lý stale data, caching, refetch, cancellation tốt hơn tự code.</p>
`,
    role: "senior",
    type: "hooks-advanced",
  },

  {
    question: "Khi nào nên dùng useReducer thay useState?",
    answer: `
<h3>Khi nào dùng useReducer thay useState?</h3>

<h4>Nên dùng useReducer khi</h4>

<h5>1) State phức tạp, nhiều nhánh cập nhật</h5>
<ul>
  <li>Nhiều field liên quan nhau</li>
  <li>Nhiều action types (start/success/error/reset...)</li>
</ul>

<h5>2) Muốn state transitions “predictable” và dễ test</h5>
<p>Reducer là <b>pure function</b>: (state, action) → newState. Dễ unit test và dễ review logic.</p>

<h5>3) Update phụ thuộc vào state hiện tại và logic điều kiện nhiều</h5>
<p>useState cũng làm được, nhưng reducer giúp gom logic vào một nơi thay vì rải rác.</p>

<h5>4) Cần “event-like” model</h5>
<p>dispatch(action) giống Redux-lite cho component-level state, giúp team hiểu luồng cập nhật rõ ràng.</p>

<h4>Nên dùng useState khi</h4>
<ul>
  <li>State đơn giản (string/number/boolean) hoặc ít field</li>
  <li>Cập nhật độc lập, ít nhánh logic</li>
  <li>Muốn code ngắn gọn, ít boilerplate</li>
</ul>

<h4>Ví dụ useReducer hợp lý</h4>
<pre><code>type State = { loading: boolean; data: any | null; error: string | null };
type Action =
  | { type: "start" }
  | { type: "success"; payload: any }
  | { type: "error"; payload: string }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start": return { ...state, loading: true, error: null };
    case "success": return { loading: false, data: action.payload, error: null };
    case "error": return { ...state, loading: false, error: action.payload };
    case "reset": return { loading: false, data: null, error: null };
    default: return state;
  }
}
</code></pre>

<h4>Rule of thumb</h4>
<ul>
  <li>Bắt đầu với useState.</li>
  <li>Chuyển sang useReducer khi bạn thấy: nhiều setState liên quan nhau + khó theo dõi + nhiều nhánh logic.</li>
</ul>
`,
    role: "senior",
    type: "hooks-advanced",
  },
]

export default hook
