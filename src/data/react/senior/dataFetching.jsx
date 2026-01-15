// dataFetching.ts
// Data Fetching & Server State Q&A (Senior) — answers as HTML strings
// NOTE: If you render these answers in the browser, sanitize HTML to prevent XSS.

export const dataFetching = [
  // =================== DATA FETCHING & SERVER STATE ===================
  {
    question: "Server state khác client state ở điểm nào?",
    answer: `
<h3>Server State vs Client State</h3>

<h4>Server State</h4>
<p>Server state là dữ liệu được lưu trên server và truy cập qua API. Đây là dữ liệu <b>ngoài tầm kiểm soát</b> của client: client chỉ request/nhận, không sở hữu nguồn dữ liệu.</p>

<h5>Đặc điểm</h5>
<ul>
  <li><b>Bất đồng bộ</b>: luôn có network latency, timeout, error → cần loading/error/retry.</li>
  <li><b>Uncontrolled</b>: nhiều user có thể sửa cùng lúc → conflict / stale.</li>
  <li><b>Stale</b>: dữ liệu có thể cũ giữa các lần fetch → cần cache + invalidation.</li>
  <li><b>Shared</b>: nhiều client dùng chung → cần sync (refetch, websocket, event).</li>
</ul>

<h5>Ví dụ</h5>
<ul>
  <li>User profile từ API</li>
  <li>Danh mục sản phẩm</li>
  <li>Tin nhắn chat</li>
  <li>Dữ liệu real-time (stock, live score)</li>
</ul>

<h4>Client State</h4>
<p>Client state là dữ liệu nằm cục bộ trong session/browser. Đây là dữ liệu <b>client kiểm soát hoàn toàn</b>: đọc/ghi trực tiếp không cần network.</p>

<h5>Đặc điểm</h5>
<ul>
  <li><b>Đồng bộ</b>: truy cập tức thì.</li>
  <li><b>Controlled</b>: chỉ user hiện tại thao tác, không có conflict từ user khác.</li>
  <li><b>Fresh</b>: cập nhật ngay, luôn là bản mới nhất trong UI.</li>
  <li><b>Private</b>: chỉ tồn tại trong phiên người dùng (trừ khi persist).</li>
</ul>

<h5>Ví dụ</h5>
<ul>
  <li>Giá trị input trong form</li>
  <li>UI state (modal open/close, tab active)</li>
  <li>User preferences (theme, language)</li>
  <li>Local cache offline</li>
</ul>

<h4>Tool gợi ý</h4>
<table>
  <tr>
    <th>Loại State</th>
    <th>Tool phù hợp</th>
    <th>Vấn đề chính</th>
  </tr>
  <tr>
    <td>Server State</td>
    <td>React Query / SWR / RTK Query</td>
    <td>Cache invalidation, race conditions, optimistic updates</td>
  </tr>
  <tr>
    <td>Client State</td>
    <td>useState / useReducer / Zustand</td>
    <td>State organization, persistence, complex UI logic</td>
  </tr>
</table>
`,
    role: "senior",
    type: "data-fetching",
  },

  {
    question: "Khi nào React Query không phù hợp?",
    answer: `
<h3>Khi nào React Query không phù hợp?</h3>

<h4>1) Ứng dụng quá đơn giản</h4>
<p>Ít API calls, logic fetch đơn giản, không cần caching/invalidations phức tạp → <b>useEffect + useState</b> có thể đủ.</p>

<h4>2) Real-time “hard” (streaming liên tục)</h4>
<p>Nếu app phụ thuộc WebSocket streams, updates theo từng message/giây: React Query vẫn dùng được nhưng không phải “core strength”. Nhiều case sẽ hợp hơn với:</p>
<ul>
  <li>WebSocket/SSE layer riêng</li>
  <li>Store (Zustand/Redux) để ingest stream</li>
  <li>Hoặc React Query chỉ đóng vai trò “snapshot + cache”, còn stream cập nhật bằng setQueryData</li>
</ul>

<h4>3) Business logic gắn chặt Redux workflow</h4>
<p>Nếu team đã “standardize” trên Redux, middleware, devtools flows… và muốn server-state integrate 100% store → <b>RTK Query</b> thường phù hợp hơn.</p>

<h4>4) Legacy codebase (Redux-Saga/Thunk) và migration cost cao</h4>
<p>React Query tốt, nhưng migrate có thể tốn effort/risk nếu app lớn và phụ thuộc sâu vào patterns cũ.</p>

<h4>5) Next.js dùng Server Components / fetch ở server là chính</h4>
<p>Với Next.js App Router, nếu phần lớn data fetch ở server (Server Components) để SSR/SEO/perf, React Query client-side có thể giảm vai trò (chỉ dùng cho phần client-only: search, infinite scroll, realtime UI...)</p>

<h4>Alternatives</h4>
<ul>
  <li><b>SWR</b>: nhẹ hơn, API đơn giản</li>
  <li><b>RTK Query</b>: nếu đã có Redux + cần conventions cho team lớn</li>
  <li><b>Apollo</b>: GraphQL-first</li>
  <li><b>Custom hooks</b>: app nhỏ / logic đặc thù</li>
</ul>

<h4>Khi React Query thật sự phát huy</h4>
<ul>
  <li>App nặng data, nhiều endpoints</li>
  <li>Cần caching, invalidation, background refetch</li>
  <li>Optimistic updates</li>
  <li>Retry + error recovery tốt</li>
</ul>
`,
    role: "senior",
    type: "data-fetching",
  },

  {
    question: "RTK Query vs React Query chọn cái nào cho team lớn?",
    answer: `
<h3>RTK Query vs React Query cho team lớn</h3>

<h4>RTK Query (Redux Toolkit)</h4>
<h5>Ưu điểm</h5>
<ul>
  <li><b>Chuẩn hóa cao</b>: patterns rõ ràng, enforce structure → hợp team lớn cần consistency.</li>
  <li><b>Tích hợp Redux</b>: devtools, middleware, slices, auth flow… đồng bộ.</li>
  <li><b>Type safety tốt</b>: endpoint definitions type-first.</li>
  <li><b>Tag-based invalidation</b>: invalidation có hệ thống.</li>
</ul>

<h5>Nhược điểm</h5>
<ul>
  <li><b>Setup/boilerplate nhiều hơn</b> React Query.</li>
  <li><b>Yêu cầu hiểu Redux</b> (learning curve cho dev mới).</li>
  <li><b>Bundle size</b> có thể lớn hơn vì Redux core.</li>
</ul>

<h4>React Query</h4>
<h5>Ưu điểm</h5>
<ul>
  <li><b>DX rất mạnh</b>: hooks-based, dễ adopt, devtools tốt.</li>
  <li><b>Ít boilerplate</b>: nhanh triển khai, phù hợp product velocity.</li>
  <li><b>Caching mạnh</b>: background refetch, mutations, optimistic, offline patterns.</li>
  <li><b>Flexible</b>: không ép kiến trúc, dễ mix với Zustand/Context.</li>
</ul>

<h5>Nhược điểm</h5>
<ul>
  <li><b>Ít opinionated</b>: team lớn cần guidelines để không mỗi người một kiểu.</li>
  <li>TypeScript đôi khi cần discipline (query keys, typed fetchers, shared types).</li>
</ul>

<h4>Chọn nhanh</h4>
<ul>
  <li><b>Đã dùng Redux sâu</b> (auth/workflow/middleware chuẩn) → <b>RTK Query</b>.</li>
  <li><b>Project mới</b> hoặc muốn ship nhanh, ít ceremony → <b>React Query</b>.</li>
  <li><b>Team lớn nhưng senior lead mạnh + guideline rõ</b> → React Query vẫn rất ổn.</li>
  <li><b>Team lớn cần chuẩn hóa “cứng”</b> → RTK Query dễ kiểm soát hơn.</li>
</ul>
`,
    role: "senior",
    type: "data-fetching",
  },

  {
    question: "Cache invalidation khó ở chỗ nào?",
    answer: `
<h3>Cache invalidation khó ở chỗ nào?</h3>

<h4>1) Định nghĩa “stale” (time-based)</h4>
<p>StaleTime bao lâu là hợp lý? Data khác nhau có độ “tươi” khác nhau (profile vs stock price). Chọn sai → hoặc spam API, hoặc hiển thị data cũ.</p>

<h4>2) Data liên quan (dependent/relational)</h4>
<p>Update một entity có thể ảnh hưởng nhiều màn hình:</p>
<ul>
  <li>Post detail</li>
  <li>Post list</li>
  <li>Comments list</li>
  <li>User profile widgets</li>
</ul>
<p>Invalidate thiếu → UI inconsistent. Invalidate quá nhiều → tốn network, UI nhấp nháy.</p>

<h4>3) Optimistic updates + rollback</h4>
<p>Update UI trước, nếu server fail phải rollback đúng phạm vi. Khó nhất là khi optimistic update ảnh hưởng nhiều cache keys.</p>

<h4>4) Multi-tab / multi-device sync</h4>
<p>Data thay đổi ở tab khác/device khác → tab hiện tại phải refetch/invalidate đúng lúc.</p>

<h4>5) Race conditions</h4>
<p>Nhiều mutations cùng lúc + refetch chồng chéo → dễ “ghi đè” cache sai (last response wins).</p>

<h4>Strategies</h4>

<h5>Time-based (React Query)</h5>
<pre><code>// React Query
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000,
});
</code></pre>

<h5>Event-based invalidation</h5>
<pre><code>// Sau mutation
queryClient.invalidateQueries({ queryKey: ['posts'] });
</code></pre>

<h5>Tag-based invalidation (RTK Query)</h5>
<pre><code>// Conceptual
providesTags: ['Post']
invalidatesTags: ['Post']
</code></pre>

<h4>Advanced patterns</h4>
<ul>
  <li><b>Polling</b> cho dashboard</li>
  <li><b>WebSocket</b> push events để invalidate</li>
  <li><b>Refetch on window focus</b> để tránh stale khi user quay lại tab</li>
</ul>
`,
    role: "senior",
    type: "data-fetching",
  },

  {
    question: "Khi nào nên fetch ở server (Next.js), khi nào ở client?",
    answer: `
<h3>Khi nào fetch ở Server vs Client (Next.js)?</h3>

<h4>Fetch ở Server (SSR/SSG/Server Components) khi</h4>
<ul>
  <li><b>SEO quan trọng</b>: page cần index, bots phải thấy content ngay.</li>
  <li><b>First load critical</b>: data quan trọng cho LCP/first paint.</li>
  <li><b>Security</b>: giữ API keys/secret logic ở server.</li>
  <li><b>Giảm JS client</b>: render HTML sẵn, client ít hydrate hơn.</li>
</ul>

<h5>Các hình thức</h5>
<ul>
  <li><b>SSR</b> (render mỗi request)</li>
  <li><b>SSG</b> (build-time)</li>
  <li><b>ISR</b> (revalidate theo thời gian)</li>
  <li><b>Server Components</b> (App Router)</li>
</ul>

<h4>Fetch ở Client khi</h4>
<ul>
  <li><b>User-specific</b>: data phụ thuộc session/token (profile private, permissions).</li>
  <li><b>Tương tác động</b>: search/filter/sort/pagination theo hành vi user.</li>
  <li><b>Real-time</b>: chat, notifications, live updates.</li>
  <li><b>Lazy load</b>: infinite scroll, load on demand sau tương tác.</li>
</ul>

<h5>Tools</h5>
<ul>
  <li><b>useEffect</b> cho case đơn giản</li>
  <li><b>React Query</b> cho caching/refetch/optimistic tốt</li>
  <li><b>SWR</b> cho lightweight</li>
</ul>

<h4>Hybrid (thực tế dùng nhiều nhất)</h4>
<pre><code>// Server: render shell + SEO content
// Client: fetch phần dynamic/interactive
export default function Page() {
  return (
    &lt;div&gt;
      &lt;StaticHeader /&gt;
      &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
        &lt;ClientPosts /&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>Trade-offs nhanh</h4>
<table>
  <tr>
    <th>Yếu tố</th>
    <th>Server Fetch</th>
    <th>Client Fetch</th>
  </tr>
  <tr>
    <td>SEO</td>
    <td>Tốt</td>
    <td>Thường kém hơn</td>
  </tr>
  <tr>
    <td>Tương tác</td>
    <td>Kém linh hoạt</td>
    <td>Tốt</td>
  </tr>
  <tr>
    <td>Bundle JS</td>
    <td>Có thể giảm JS client</td>
    <td>Cần JS + caching</td>
  </tr>
  <tr>
    <td>TTI/Hydration</td>
    <td>Thường nhanh hơn perceived</td>
    <td>Có thể chậm hơn vì fetch sau</td>
  </tr>
</table>
`,
    role: "senior",
    type: "data-fetching",
  },
]

export default dataFetching
