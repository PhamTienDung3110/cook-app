// stateManagement.ts
// State Management & Architecture Q&A (Senior)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const stateManagement = [
  // =================== STATE MANAGEMENT & KIẾN TRÚC ===================
  {
    question: "Vì sao Redux dùng one-way data flow?",
    answer: `
<h3>Vì sao Redux dùng One-way Data Flow?</h3>

<h4>1) One-way data flow nghĩa là gì?</h4>
<p>
Trong Redux, dữ liệu chỉ đi theo <b>một chiều rõ ràng</b>:
<b>UI → dispatch(action) → reducer → store cập nhật → UI render lại</b>.
Không có chuyện UI tự “đẩy ngược” thay đổi vào state theo kiểu two-way binding.
</p>

<h4>2) Vì sao cần one-way?</h4>
<ul>
  <li><b>Predictable</b>: state change có công thức rõ: <code>nextState = reducer(prevState, action)</code></li>
  <li><b>Debuggable</b>: mọi thay đổi đều đi qua action → có thể log/replay/time-travel</li>
  <li><b>Testable</b>: reducer là pure function → unit test cực dễ</li>
  <li><b>Auditability</b>: biết “ai” đổi state, “khi nào”, “vì sao”</li>
</ul>

<h4>3) Two-way binding thường gây vấn đề gì?</h4>
<ul>
  <li><b>Khó trace</b>: state đổi từ nhiều nơi → khó tìm nguồn bug</li>
  <li><b>Cascade updates</b>: thay đổi A kéo theo B kéo theo C → dễ tạo loop</li>
  <li><b>Race condition</b>: nhiều nơi update cùng lúc → state khó dự đoán</li>
</ul>

<h4>4) Redux flow chuẩn</h4>
<ol>
  <li><b>Action</b>: mô tả “đã xảy ra gì” (plain object)</li>
  <li><b>Dispatch</b>: gửi action vào store</li>
  <li><b>Reducer</b>: tính state mới (pure)</li>
  <li><b>Subscribe</b>: UI nhận state mới và render lại</li>
</ol>

<h4>5) Ghi chú hiện đại (2026)</h4>
<ul>
  <li>Redux hiện đại = <b>Redux Toolkit</b> (giảm boilerplate)</li>
  <li>One-way flow vẫn hợp với React Concurrent vì render phase cần predictable</li>
  <li>Server Components: data thường “chảy” server → client, vẫn là một chiều</li>
</ul>
`,
    role: "senior",
    type: "state-management",
  },

  {
    question: "Redux Toolkit có thực sự immutable không?",
    answer: `
<h3>Redux Toolkit có thực sự immutable không?</h3>

<h4>1) Câu trả lời ngắn</h4>
<p>
<b>Có.</b> Redux Toolkit giữ immutability, nhưng cho phép bạn viết reducer theo “mutable style”
nhờ <b>Immer</b>.
</p>

<h4>2) Bạn viết như mutate, nhưng thực tế là immutable</h4>
<pre><code>const slice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo(state, action) {
      state.push(action.payload); // nhìn như mutate
    }
  }
});
</code></pre>

<p>
Immer sẽ tạo <b>draft proxy</b>, track các thay đổi và cuối cùng produce ra <b>state mới</b> theo kiểu immutable.
Những phần không đổi sẽ được <b>structural sharing</b> (share reference cũ).
</p>

<h4>3) Immer làm gì “under the hood”?</h4>
<ul>
  <li>Tạo proxy draft từ state</li>
  <li>Ghi lại mutations trên draft</li>
  <li>Chỉ clone những nhánh bị thay đổi (lazy cloning)</li>
  <li>Produce ra immutable result</li>
</ul>

<h4>4) Những edge cases cần nhớ</h4>
<ul>
  <li>
    <b>Đừng mutate object bên ngoài draft</b>: nếu bạn giữ reference ra ngoài rồi mutate sau,
    Immer không cứu được.
  </li>
  <li>
    <b>Non-serializable values</b>: Date/Map/Set/class instance có thể dùng được tùy case,
    nhưng Redux khuyến nghị state/action nên serializable để devtools + persistence ổn định.
  </li>
  <li>
    <b>State quá lớn</b>: Immer vẫn phải clone nhánh bị thay đổi; nếu update rất nặng,
    cân nhắc normalize state, split slice, hoặc tối ưu logic update.
  </li>
</ul>

<h4>5) Best practices</h4>
<ul>
  <li>Dùng RTK + Immer style cho 90% case</li>
  <li>Normalize data (entity adapter) cho collections lớn</li>
  <li>Giữ state/action serializable để tooling tốt</li>
</ul>
`,
    role: "senior",
    type: "state-management",
  },

  {
    question: "Khi nào global state trở thành anti-pattern?",
    answer: `
<h3>Khi nào Global State là Anti-pattern?</h3>

<h4>1) Global state chỉ nên dùng khi “thật sự global”</h4>
<p>
Nếu một state chỉ dùng trong 1 screen hoặc 1 component subtree,
đặt vào global store thường là overkill và gây side effects về re-render + coupling.
</p>

<h4>2) Dấu hiệu global state bị lạm dụng</h4>
<ul>
  <li><b>Tight coupling</b>: component phụ thuộc sâu vào shape store → đổi store là vỡ nhiều nơi</li>
  <li><b>Global chỉ để tránh props</b>: dùng store như “prop drilling workaround”</li>
  <li><b>State hoarding</b>: nhét mọi thứ vào store “cho chắc” → store phình to, khó maintain</li>
  <li><b>Mix UI state + domain state</b>: modal open/close, hover… trộn cùng user/cart…</li>
  <li><b>Zombie state</b>: screen unmount rồi nhưng state vẫn tồn tại, quay lại thấy stale</li>
</ul>

<h4>3) Thay thế đúng chỗ</h4>
<ul>
  <li><b>Local UI state</b>: useState/useReducer cho modal/form/toggle</li>
  <li><b>URL state</b>: filters/search/sort/pagination → query string</li>
  <li><b>Server state</b>: data từ API → React Query / RTK Query</li>
  <li><b>Context</b>: theme/locale/config ít thay đổi</li>
</ul>

<h4>4) Rule thực dụng</h4>
<p>
Nếu state chỉ cần trong một route → giữ ở route/page level.
Nếu cần share qua nhiều screens/flows → global.
</p>
`,
    role: "senior",
    type: "state-management",
  },

  {
    question: "So sánh Redux vs Zustand vs Jotai trong dự án lớn",
    answer: `
<h3>Redux vs Zustand vs Jotai trong dự án lớn</h3>

<h4>1) Redux (Redux Toolkit)</h4>
<h5>Ưu điểm</h5>
<ul>
  <li><b>Chuẩn hóa mạnh</b>: pattern rõ ràng, scale tốt với team lớn</li>
  <li><b>Tooling</b>: Redux DevTools (time travel), middleware ecosystem</li>
  <li><b>Data fetching</b>: RTK Query rất mạnh cho server state</li>
</ul>
<h5>Nhược điểm</h5>
<ul>
  <li><b>Overhead kiến trúc</b>: dù RTK giảm nhiều, vẫn “nặng” hơn alternatives</li>
  <li><b>Boilerplate</b>: lớn hơn Zustand/Jotai</li>
</ul>

<h4>2) Zustand</h4>
<h5>Ưu điểm</h5>
<ul>
  <li><b>API đơn giản</b>, ít ceremony</li>
  <li><b>Performance tốt</b>: subscribe theo selector → giảm re-render</li>
  <li><b>Nhẹ</b>: bundle size nhỏ</li>
</ul>
<h5>Nhược điểm</h5>
<ul>
  <li><b>Ít opinionated</b>: team phải tự đặt quy ước (structure, actions, slices)</li>
  <li><b>Large-team governance</b>: nếu không có discipline dễ thành “spaghetti store”</li>
</ul>

<h4>3) Jotai</h4>
<h5>Ưu điểm</h5>
<ul>
  <li><b>Atomic state</b>: fine-grained updates, tránh re-render toàn cục</li>
  <li><b>React-native mental model</b>: giống useState nhưng share được</li>
  <li><b>Composability</b>: atoms + derived atoms khá mạnh</li>
</ul>
<h5>Nhược điểm</h5>
<ul>
  <li><b>Tooling/debug</b>: không “đỉnh” như Redux DevTools ở nhiều team</li>
  <li><b>Paradigm mới</b>: team cần thống nhất cách tổ chức atoms (domain boundaries)</li>
</ul>

<h4>4) Chọn gì cho dự án lớn?</h4>
<ul>
  <li><b>Redux (RTK)</b>: team lớn, cần governance + audit + tooling mạnh, hoặc muốn RTK Query</li>
  <li><b>Zustand</b>: muốn đơn giản nhưng vẫn cần global state, team có kỷ luật</li>
  <li><b>Jotai</b>: cần atomic updates nhiều, UI phức tạp theo “pieces of state”</li>
</ul>

<h4>5) Gợi ý kiến trúc thực tế</h4>
<p>
Nhiều dự án lớn dùng combo:
<b>React Query (server state)</b> + <b>Zustand/Redux (client global)</b> + <b>local state</b>.
</p>
`,
    role: "senior",
    type: "state-management",
  },

  {
    question: "Context performance issue xử lý thế nào?",
    answer: `
<h3>Context Performance Issues – xử lý thế nào?</h3>

<h4>1) Vấn đề cốt lõi</h4>
<p>
Khi Provider <b>value đổi</b>, <b>tất cả consumers</b> bên dưới sẽ re-render.
Nếu value là object mới mỗi render, bạn sẽ trigger re-render liên tục.
</p>

<h4>2) Lỗi phổ biến</h4>
<ul>
  <li><b>Inline object</b>: <code>value={{ user, setUser }}</code> tạo mới mỗi render</li>
  <li><b>Context quá to</b>: user + theme + settings trong 1 context</li>
  <li><b>Consumer subscribe quá rộng</b>: component đọc context dù chỉ cần 1 field</li>
</ul>

<h4>3) Giải pháp hiệu quả</h4>

<h5>3.1 Split context theo domain</h5>
<pre><code>// ❌ One giant context
const AppContext = createContext({ user, theme, settings });

// ✅ Split
const UserContext = createContext(null);
const ThemeContext = createContext(null);
</code></pre>

<h5>3.2 Memoize provider value (bắt buộc nếu value là object)</h5>
<pre><code>const value = useMemo(() =&gt; ({ user, setUser }), [user]);
return &lt;UserContext.Provider value={value}&gt;...&lt;/UserContext.Provider&gt;;
</code></pre>

<h5>3.3 Colocate state (đặt state gần nơi dùng)</h5>
<p>
Nếu chỉ một subtree cần state, đặt Provider bao quanh subtree đó, không wrap toàn app.
</p>

<h5>3.4 Nếu cần selector behavior</h5>
<ul>
  <li>Dùng thư viện hỗ trợ context selector</li>
  <li>Hoặc chuyển qua Zustand/Jotai để subscribe theo selector/atom</li>
</ul>

<h4>4) Rule thực dụng</h4>
<p>
Context hợp cho <b>ít thay đổi</b> (theme/locale/auth basic).
Nếu state thay đổi liên tục và nhiều consumers → cân nhắc store (Zustand/Redux/Jotai).
</p>
`,
    role: "senior",
    type: "state-management",
  },

  {
    question: "Thiết kế state cho app 50+ screens thế nào?",
    answer: `
<h3>Thiết kế State cho App 50+ Screens</h3>

<h4>1) Nguyên tắc cốt lõi</h4>
<ul>
  <li><b>State proximity</b>: state ở level thấp nhất có thể</li>
  <li><b>Single source of truth</b>: tránh duplicate cùng một data ở nhiều nơi</li>
  <li><b>Phân loại state</b>: UI state / Client state / Server state / URL state</li>
  <li><b>Organize theo domain</b>: auth, products, cart, orders…</li>
</ul>

<h4>2) Phân lớp state (rất thực tế)</h4>

<h5>2.1 Local UI state (component)</h5>
<ul>
  <li>modal open/close, form input, toggle, hover</li>
  <li>useState/useReducer</li>
</ul>

<h5>2.2 Route/Page state</h5>
<ul>
  <li>filters, pagination, selected tab cho screen đó</li>
  <li>thường đặt ở page component hoặc page store riêng</li>
</ul>

<h5>2.3 URL state</h5>
<ul>
  <li>search params: sort/filter/page/query</li>
  <li>giúp share link, back/forward đúng</li>
</ul>

<h5>2.4 Server state</h5>
<ul>
  <li>API data, cache, refetch, stale-while-revalidate</li>
  <li>React Query / RTK Query</li>
</ul>

<h5>2.5 Global client state (truly global)</h5>
<ul>
  <li>auth session, feature flags, global notifications, app-level settings</li>
</ul>

<h4>3) Organization theo domain</h4>
<pre><code>src/
  features/
    auth/
      api/
      store/
      components/
    products/
    cart/
  shared/
    ui/
    utils/
</code></pre>

<h4>4) Anti-pattern cần tránh</h4>
<ul>
  <li>Nhét tất cả state vào global store</li>
  <li>Duplicate server data vào client store</li>
  <li>Mix UI state với domain state trong 1 chỗ</li>
</ul>

<h4>5) Combo khuyến nghị cho nhiều team</h4>
<p>
<b>React Query (server state)</b> + <b>Zustand/Redux (global client state nhỏ)</b> + <b>local state</b>.
</p>
`,
    role: "senior",
    type: "state-management",
  },
]

export default stateManagement
