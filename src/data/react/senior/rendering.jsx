// rendering.ts
// React Rendering / Reconciliation deep-dive Q&A (Senior)
// NOTE: answer content is HTML string (safe to inject only with proper sanitizer if needed)

export const rendering = [
  // =================== REACT & RENDERING SÂU ===================
  {
    question: "React reconciliation hoạt động thế nào?",
    answer: `
<h3>React Reconciliation – Cơ Chế So Sánh & Cập Nhật UI</h3>

<h4>1) Reconciliation là gì?</h4>
<p>
Reconciliation là quá trình React so sánh <b>UI description</b> (Virtual DOM/React elements) mới tạo ra sau khi state/props thay đổi
với bản cũ để quyết định <b>những cập nhật tối thiểu</b> cần áp dụng.
Kết quả của reconciliation là một <b>kế hoạch cập nhật</b> (update plan), còn việc đụng vào DOM thật chỉ xảy ra ở <b>Commit phase</b>.
</p>

<h4>2) Rendering pipeline của React</h4>
<ol>
  <li>
    <b>Render Phase</b>
    <ul>
      <li>React gọi function component / render() để tạo React element tree mới</li>
      <li>Phải là <b>pure</b>: không side effects (không DOM manipulation, không gọi API, không setState)</li>
      <li>Có thể bị <b>pause/restart/abandon</b> trong concurrent rendering</li>
    </ul>
  </li>
  <li>
    <b>Reconciliation (Diffing)</b>
    <ul>
      <li>So sánh tree mới với tree cũ để tìm thay đổi</li>
      <li>Tạo ra danh sách thao tác: update props, insert/move/remove nodes, mount/unmount components</li>
    </ul>
  </li>
  <li>
    <b>Commit Phase</b>
    <ul>
      <li>Áp dụng mutations lên DOM thật</li>
      <li>Gắn/đổi refs</li>
      <li>Chạy effects theo thứ tự: <b>useLayoutEffect</b> (trước paint) → browser paint → <b>useEffect</b> (sau paint)</li>
    </ul>
  </li>
</ol>

<h4>3) Diffing heuristics – React tối ưu bằng giả định gì?</h4>
<ul>
  <li>
    <b>Different element type ⇒ replace subtree</b><br/>
    Ví dụ <code>&lt;div&gt;</code> → <code>&lt;span&gt;</code> thì React thường unmount subtree cũ và mount subtree mới.
  </li>
  <li>
    <b>Same type ⇒ reuse instance + update props</b><br/>
    Nếu cùng type (cùng component/function), React giữ instance và chỉ cập nhật props/state cần thiết.
  </li>
  <li>
    <b>Keys trong list quyết định identity</b><br/>
    Key <b>stable + unique</b> giúp React nhận ra item nào là item nào để reuse và move đúng. Key thay đổi hoặc không ổn định ⇒ remount.
  </li>
  <li>
    <b>So sánh props theo reference</b><br/>
    Object/array/function mới mỗi render sẽ được xem là khác (dù value “giống”), dễ kéo theo re-render không cần thiết.
  </li>
</ul>

<h4>4) Fiber Architecture (React 16+)</h4>
<p>
Fiber biến công việc render/reconcile thành các <b>unit of work nhỏ</b> để:
</p>
<ul>
  <li>Chia nhỏ và scheduling theo ưu tiên</li>
  <li>Pause/resume work, nhường main thread để UI responsive</li>
  <li>Abort render work cho updates đã lỗi thời</li>
</ul>

<h4>5) React 18 liên quan gì đến reconciliation?</h4>
<ul>
  <li><b>Automatic batching</b>: giảm số lần render/commit bằng cách gộp nhiều state updates trong cùng tick</li>
  <li><b>Concurrent rendering</b>: render có thể bị interrupt và restart, yêu cầu render phase phải pure</li>
  <li><b>Transitions</b>: đánh dấu updates ít ưu tiên để tránh block input/typing</li>
</ul>

<h4>6) Best practices</h4>
<ul>
  <li>List dùng <b>key = ID stable</b> (không dùng index nếu list có reorder/insert/remove)</li>
  <li>Giữ reference ổn định: tránh inline object/array/function; dùng <b>useMemo/useCallback</b> khi cần</li>
  <li>Dùng <b>React.memo</b> để chặn re-render không cần thiết (đúng chỗ, đo bằng Profiler)</li>
  <li>Không mutate state/props; luôn tạo bản copy khi update</li>
</ul>
`,
    role: "senior",
    type: "react-rendering",
  },

  {
    question: "Khi nào Virtual DOM trở thành bottleneck?",
    answer: `
<h3>Khi Virtual DOM Trở Thành Bottleneck</h3>

<h4>1) Hiểu đúng: VDOM không “chậm tự thân”</h4>
<p>
Bottleneck thường không phải vì “Virtual DOM” tồn tại, mà vì <b>công việc render + diff + commit</b> bị kích hoạt quá nhiều hoặc quá nặng.
VDOM trở thành vấn đề khi bạn khiến React phải làm <b>nhiều work</b> hơn mức cần thiết.
</p>

<h4>2) Các case hay gặp trong thực tế</h4>

<h5>2.1 Tree quá lớn</h5>
<p>
Một màn hình có hàng nghìn node (đặc biệt list/table) mà re-render thường xuyên ⇒ chi phí tạo element tree + diff tăng,
GC pressure tăng, dễ gây jank (dropped frames).
</p>

<h5>2.2 Update tần suất cao (per-frame)</h5>
<p>
Animations/drag/scroll updates kiểu 60fps mà “đi qua React render” mỗi frame ⇒ React thường không phải lựa chọn tối ưu.
Nên đẩy per-frame work sang CSS transforms, requestAnimationFrame + canvas/webgl, hoặc dùng libs tối ưu.
</p>

<h5>2.3 Parent re-render kéo theo subtree</h5>
<p>
State đặt ở quá cao (root/layout) khiến 1 thay đổi nhỏ → cascade xuống hàng trăm component.
Nếu child không memo đúng và props không stable, bạn sẽ thấy “re-render storm”.
</p>

<h5>2.4 Keys không ổn định trong list</h5>
<p>
Dùng index làm key (trong list có insert/remove/reorder) ⇒ React remount item sai identity, mất state local, tốn commit lớn.
</p>

<h5>2.5 Commit nặng (DOM/layout)</h5>
<p>
Đôi khi bottleneck không phải diff mà là commit: DOM mutations nhiều, layout thrash (đọc/ghi layout), style recalculation.
</p>

<h4>3) Giải pháp chuẩn (ưu tiên theo ROI)</h4>
<ul>
  <li><b>Windowing/Virtualization</b>: react-window, @tanstack/react-virtual cho list/table lớn</li>
  <li><b>Giảm cascade</b>: đưa state xuống thấp hơn; tách state; tránh setState ở layout root</li>
  <li><b>Memo hóa đúng chỗ</b>: React.memo cho components “nặng” và props stable</li>
  <li><b>Stabilize references</b>: useCallback/useMemo hoặc chuyển object/function ra ngoài render</li>
  <li><b>Move per-frame work ngoài React</b>: CSS transform, canvas/webgl</li>
  <li><b>Đo bằng Profiler</b>: tối ưu dựa trên số liệu, không dựa cảm giác</li>
</ul>

<h4>4) Khi nào cân nhắc hướng khác?</h4>
<ul>
  <li>Realtime visualization/game/graph cực nặng → canvas/webgl (React chỉ quản lý shell UI)</li>
  <li>UI phần lớn là static/content → tối ưu SSR/RSC để giảm JS và hydration</li>
</ul>

<h4>5) Kết luận</h4>
<p>
React/VDOM rất mạnh cho <b>state-driven UI</b>. Nhưng nếu bạn cố dùng React cho <b>per-frame rendering</b> hoặc list cực lớn không virtualization,
thì render/diff/commit sẽ thành bottleneck.
</p>
`,
    role: "senior",
    type: "react-rendering",
  },

  {
    question: "React StrictMode dùng để làm gì? Vì sao render 2 lần?",
    answer: `
<h3>React StrictMode – Development Safety Tool</h3>

<h4>1) StrictMode là gì?</h4>
<p>
StrictMode là wrapper <b>chỉ chạy trong development</b>, không tạo UI riêng, nhưng bật thêm các kiểm tra để phát hiện
pattern không an toàn (đặc biệt liên quan concurrent rendering) và side effects.
Production build <b>không</b> bị ảnh hưởng bởi StrictMode.
</p>

<h4>2) Vì sao thấy “render 2 lần”?</h4>
<p>
Trong React 18 dev mode, StrictMode cố tình thực hiện các hành vi như <b>double-invoke</b> một số đoạn logic để:
</p>
<ul>
  <li>Expose side effects trong render phase (render phải pure)</li>
  <li>Kiểm tra effect cleanup có đúng không (mount/unmount/mount)</li>
  <li>Giả lập tình huống render bị restart trong concurrent rendering</li>
</ul>

<h4>3) Cái gì bị double-invoke?</h4>
<ul>
  <li>Function component body (render function)</li>
  <li>useState / useReducer initializer (hàm init)</li>
  <li>useEffect / useLayoutEffect: gọi effect + cleanup theo pattern dev-check</li>
</ul>

<h4>4) Cái gì KHÔNG bị double?</h4>
<ul>
  <li>Event handlers (onClick, onChange...)</li>
  <li>Production build</li>
</ul>

<h4>5) StrictMode giúp bạn tránh bug gì?</h4>
<ul>
  <li>Gọi API trong render</li>
  <li>Mutate object/array trong render</li>
  <li>Effect thiếu cleanup gây memory leaks</li>
  <li>Race conditions khi concurrent rendering restart work</li>
</ul>

<h4>6) Best practices</h4>
<ul>
  <li>Render phase phải pure</li>
  <li>Side effects chỉ nằm trong useEffect/useLayoutEffect</li>
  <li>Luôn có cleanup cho subscription/timer/listener</li>
</ul>
`,
    role: "senior",
    type: "react-rendering",
  },

  {
    question: "Hydration error là gì? Nguyên nhân phổ biến?",
    answer: `
<h3>Hydration Error trong React (SSR)</h3>

<h4>1) Hydration là gì?</h4>
<p>
Khi dùng SSR, server gửi HTML đã render sẵn. Trên client, React sẽ “hydrate” bằng cách
<b>gắn event handlers</b>, khôi phục component tree và biến trang thành interactive.
</p>

<h4>2) Hydration error xảy ra khi nào?</h4>
<p>
Khi HTML server render <b>không khớp</b> với HTML mà client render ra ở lần render đầu tiên.
React sẽ cảnh báo mismatch, và có thể bỏ subtree server rồi render lại → mất lợi ích SSR, gây flash và chậm.
</p>

<h4>3) Nguyên nhân phổ biến</h4>
<ul>
  <li>
    <b>Giá trị thay đổi theo thời gian</b>: Date.now(), new Date(), timezone khác nhau
  </li>
  <li>
    <b>Random</b>: Math.random(), uuid tạo ở render
  </li>
  <li>
    <b>Browser-only APIs trong render</b>: window, document, localStorage, navigator
  </li>
  <li>
    <b>Conditional render dựa vào client state</b>: window.innerWidth, prefers-color-scheme, userAgent
  </li>
  <li>
    <b>Third-party script mutate DOM</b>: ads/analytics chèn node trước khi React hydrate
  </li>
</ul>

<h4>4) Giải pháp chuẩn</h4>
<ul>
  <li>
    <b>Client-only logic</b> → chạy trong <b>useEffect</b> (đảm bảo SSR/client first render giống nhau)
  </li>
  <li>
    <b>Disable SSR cho component</b> (framework support): dynamic import với ssr: false
  </li>
  <li>
    <b>Pass dữ liệu từ server</b>: tính toán trên server và truyền vào props để client dùng cùng giá trị
  </li>
  <li>
    <b>suppressHydrationWarning</b>: chỉ dùng khi mismatch vô hại và bạn hiểu rõ trade-off
  </li>
</ul>

<h4>5) Rule vàng</h4>
<p>
<b>Client first render phải match server HTML.</b> Nếu cần khác, hãy defer bằng useEffect hoặc tách client-only component.
</p>
`,
    role: "senior",
    type: "react-rendering",
  },

  {
    question: "Controlled re-render khác uncontrolled re-render?",
    answer: `
<h3>Controlled vs Uncontrolled Re-render</h3>

<h4>1) Controlled re-render</h4>
<p>
Re-render “đúng kỳ vọng”, xuất phát từ thay đổi state/props/context cần phản ánh lên UI.
Đây là hành vi chuẩn của React (declarative UI).
</p>
<ul>
  <li>setState/useState/useReducer</li>
  <li>props thay đổi từ parent</li>
  <li>context value thay đổi</li>
</ul>

<h4>2) Uncontrolled re-render (không mong muốn)</h4>
<p>
Re-render xảy ra do <b>reference thay đổi</b> hoặc cascade từ parent, dù UI thực tế không cần thay đổi.
Nó gây tốn CPU và làm app “nặng” dần.
</p>

<h4>3) Nguyên nhân phổ biến</h4>
<ul>
  <li><b>Inline object/array</b>: <code>style={{...}}</code>, <code>options={[...]}</code> tạo mới mỗi render</li>
  <li><b>Inline function</b>: <code>onClick={() =&gt; ...}</code> tạo mới mỗi render</li>
  <li><b>Context value là object mới</b>: <code>&lt;Provider value={{a, b}}&gt;</code> luôn mới</li>
  <li><b>Parent render storm</b>: state đặt quá cao khiến subtree re-render</li>
</ul>

<h4>4) Cách xử lý (thực dụng)</h4>
<ul>
  <li><b>Stabilize references</b>: useMemo/useCallback hoặc move ra ngoài component</li>
  <li><b>React.memo</b>: chặn re-render khi props shallow-equal</li>
  <li><b>Tách state</b>: đưa state xuống thấp, tách context theo domain</li>
  <li><b>React DevTools Profiler</b>: tìm component re-render nhiều và nguyên nhân</li>
</ul>

<h4>5) Lưu ý quan trọng</h4>
<p>
Không phải re-render là xấu. Tối ưu chỉ khi bạn thấy vấn đề (jank, slow input, profiler đỏ).
</p>
`,
    role: "senior",
    type: "react-rendering",
  },

  {
    question: "Khi nào nên tách component, khi nào không?",
    answer: `
<h3>Khi Nên Tách Component</h3>

<h4>1) Khi NÊN tách</h4>
<ul>
  <li><b>Reuse</b>: UI/logic dùng ở ≥ 2 nơi</li>
  <li><b>Độ phức tạp</b>: component dài, nhiều responsibility, khó đọc/maintain</li>
  <li><b>Performance boundary</b>: muốn tạo “memo boundary” để giảm cascade re-render</li>
  <li><b>Testing</b>: cần tách để test isolated (UI hoặc logic)</li>
</ul>

<h4>2) Khi KHÔNG nên tách</h4>
<ul>
  <li><b>Chỉ dùng 1 lần</b> và rất đơn giản (YAGNI)</li>
  <li><b>Micro-components</b> vô nghĩa làm code khó navigate (mỗi div một component)</li>
  <li><b>Premature abstraction</b>: tách vì “có thể tương lai dùng lại” nhưng chưa có use-case</li>
</ul>

<h4>3) Framework quyết định thực dụng</h4>
<ol>
  <li>Nếu tách giúp <b>giảm cognitive load</b> (đọc dễ hơn) → tách</li>
  <li>Nếu tách tạo nhiều prop drilling/coupling hơn → cân nhắc giữ chung hoặc refactor state trước</li>
  <li>Nếu tách để performance → đo bằng Profiler, rồi mới memoize</li>
</ol>

<h4>4) Rule nhanh</h4>
<p>
Tách component là để <b>đọc dễ hơn</b> hoặc <b>tối ưu boundary</b>. Đừng tách chỉ để “đẹp”.
</p>
`,
    role: "senior",
    type: "react-rendering",
  },
]

export default rendering
