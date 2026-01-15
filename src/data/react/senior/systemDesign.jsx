// systemDesign.ts
// Live coding / System design Q&A (Senior)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const systemDesign = [
  // =================== LIVE CODING / SYSTEM DESIGN ===================
  {
    question: "Design frontend cho e-commerce lớn",
    answer: `
<h3>Design Frontend cho E-commerce lớn</h3>

<h4>1) Requirements (phải chốt trước khi chọn tech)</h4>
<ul>
  <li><b>Performance</b>: LCP/INP/CLS tốt, TTFB ổn định, scroll list mượt</li>
  <li><b>Scalability</b>: 100k+ products, traffic spike, đa vùng (multi-region)</li>
  <li><b>SEO</b>: index product/category, schema.org, canonical, hreflang</li>
  <li><b>UX</b>: search/filter nhanh, cart/checkout mượt, error states rõ</li>
  <li><b>Reliability</b>: degrade gracefully khi backend chậm, retry/backoff, observability</li>
</ul>

<h4>2) Stack đề xuất (thực chiến)</h4>
<ul>
  <li><b>Next.js (App Router)</b>: SSR/SSG/ISR, streaming, metadata</li>
  <li><b>React 18</b>: concurrent, Suspense, transitions</li>
  <li><b>Server state</b>: React Query hoặc RTK Query (cache, dedupe, retry)</li>
  <li><b>Client global state</b>: Zustand (cart, wishlist, UI global)</li>
  <li><b>UI</b>: Tailwind + headless components (hoặc nội bộ)</li>
</ul>

<h4>3) Kiến trúc route / rendering strategy</h4>
<ul>
  <li><b>Home / Category</b>: ISR/SSG + revalidate (SEO + tốc độ)</li>
  <li><b>Product detail (PDP)</b>: SSR/ISR tuỳ inventory/pricing realtime</li>
  <li><b>Search</b>: client-driven + streaming/partial rendering; ưu tiên UX mượt</li>
  <li><b>Checkout</b>: CSR + bảo mật + idempotency; hạn chế caching sai</li>
</ul>

<h4>4) Data fetching & caching (quan trọng nhất)</h4>
<ul>
  <li><b>CDN caching</b>: HTML ISR + static assets; cache bust theo version</li>
  <li><b>API caching</b>: edge cache cho category/product phổ biến</li>
  <li><b>Client cache</b>: query keys chuẩn hoá, staleTime phù hợp</li>
  <li><b>Prefetch</b>: hover/viewport prefetch product, category next page</li>
</ul>

<h4>5) Search & filtering (bài toán nặng)</h4>
<ul>
  <li><b>Debounce</b> input, dùng <b>useTransition</b> để tránh lag</li>
  <li><b>URL state</b> cho filters/sort/page để share link & back/forward đúng</li>
  <li><b>Facet caching</b> và tối ưu payload (chỉ gửi facet cần thiết)</li>
</ul>

<h4>6) List lớn: virtualization</h4>
<ul>
  <li>Category listing/grid sản phẩm: dùng <b>@tanstack/react-virtual</b> hoặc <b>react-window</b></li>
  <li>Ảnh: lazy load, placeholder, blur, tránh layout shift</li>
</ul>

<h4>7) Folder structure theo domain</h4>
<pre><code>src/
  app/                      # Next routes
    (shop)/
      page.tsx
      category/[slug]/
      product/[id]/
      search/
      checkout/
  features/
    catalog/
    cart/
    auth/
    checkout/
  shared/
    ui/
    lib/
    hooks/
</code></pre>

<h4>8) Observability (bắt buộc với traffic lớn)</h4>
<ul>
  <li>RUM: LCP/INP/CLS, long tasks</li>
  <li>Error tracking: Sentry</li>
  <li>Backend correlation: request-id, tracing</li>
</ul>
`,
    role: "senior",
    type: "system-design",
  },

  {
    question: "State flow cho app realtime",
    answer: `
<h3>State Flow cho App Realtime</h3>

<h4>1) Mục tiêu realtime</h4>
<ul>
  <li>Update gần như tức thời (WS/SSE)</li>
  <li>Không drop frames (render không bị storm)</li>
  <li>Không mất consistency (ack, ordering, reconnection)</li>
  <li>Hỗ trợ offline/poor network (queue + sync)</li>
</ul>

<h4>2) Phân loại state (đỡ loạn)</h4>
<ul>
  <li><b>Server state</b>: dữ liệu canonical từ server (messages, prices, presence)</li>
  <li><b>Client state</b>: UI local (input text, selected tab, modal)</li>
  <li><b>Optimistic state</b>: pending updates chưa được server confirm</li>
</ul>

<h4>3) Pattern khuyến nghị</h4>
<ul>
  <li><b>React Query/RTK Query</b> giữ cache dữ liệu server</li>
  <li><b>WebSocket/SSE</b> đẩy events → cập nhật cache bằng setQueryData / updateQueryData</li>
  <li><b>Optimistic updates</b> cho UX: update UI trước, rollback nếu fail</li>
</ul>

<h4>4) Event pipeline thực tế</h4>
<ol>
  <li>Client gửi action (mutation) kèm <b>clientId</b> (idempotency key)</li>
  <li>UI apply optimistic update (đánh dấu pending)</li>
  <li>Server broadcast event (kèm version/sequence)</li>
  <li>Client nhận event → reconcile cache, clear pending nếu ack trùng clientId</li>
</ol>

<h4>5) Conflict resolution (tuỳ domain)</h4>
<ul>
  <li><b>Last-write-wins</b>: đơn giản, phù hợp presence/status</li>
  <li><b>Versioning/ETag</b>: update có điều kiện (CAS) cho record quan trọng</li>
  <li><b>OT/CRDT</b>: collaborative editing (docs), phức tạp nhưng chuẩn</li>
</ul>

<h4>6) Performance guardrails</h4>
<ul>
  <li>Batch events (gom theo 16ms) để tránh render storm</li>
  <li>Normalize data & update theo entity để update nhỏ</li>
  <li>Virtualize lists (chat/history dài)</li>
  <li>Throttle presence updates</li>
</ul>

<h4>7) Offline support</h4>
<ul>
  <li>Queue mutations (IndexedDB) + retry/backoff</li>
  <li>Rehydrate cache khi online</li>
  <li>Resolve conflict theo version/merge rules</li>
</ul>
`,
    role: "senior",
    type: "system-design",
  },

  {
    question: "Optimize page load cho traffic lớn",
    answer: `
<h3>Optimize Page Load cho Traffic lớn</h3>

<h4>1) Mục tiêu</h4>
<ul>
  <li><b>LCP</b> nhanh: hero image/content xuất hiện sớm</li>
  <li><b>INP</b> tốt: tương tác không lag</li>
  <li><b>CLS</b> thấp: không nhảy layout</li>
  <li><b>Ổn định khi spike</b>: cache + CDN giảm tải origin</li>
</ul>

<h4>2) Chiến lược rendering</h4>
<ul>
  <li><b>SSR/Streaming</b> cho trang cần SEO</li>
  <li><b>ISR</b> cho pages ít thay đổi (category/home)</li>
  <li><b>CSR</b> cho flow sensitive (checkout/account)</li>
</ul>

<h4>3) Bundle & JS execution</h4>
<ul>
  <li>Code splitting theo route</li>
  <li>Dynamic import cho phần nặng (reviews, recommendations)</li>
  <li>Tree-shake, tránh import toàn bộ libs</li>
  <li>Giảm hydration scope: chỉ client components cho phần interactive</li>
</ul>

<h4>4) Images (thường là LCP culprit)</h4>
<ul>
  <li>Next Image (resize, webp/avif), set width/height để tránh CLS</li>
  <li>Priority cho ảnh LCP, lazy cho phần dưới fold</li>
  <li>Preload hero image/font quan trọng</li>
</ul>

<h4>5) Caching (đòn bẩy lớn nhất cho traffic)</h4>
<ul>
  <li><b>CDN</b>: cache static assets + HTML ISR</li>
  <li><b>HTTP caching</b>: Cache-Control chuẩn, immutable cho hashed assets</li>
  <li><b>Edge cache</b>: cache response API phổ biến</li>
  <li><b>Stale-while-revalidate</b>: vừa nhanh vừa cập nhật</li>
</ul>

<h4>6) Server / network</h4>
<ul>
  <li>Compression (br/gzip), HTTP/2/3</li>
  <li>Keep-alive, connection reuse</li>
  <li>Co-locate compute near users (edge)</li>
</ul>

<h4>7) Monitoring (để chống regression)</h4>
<ul>
  <li>RUM: web-vitals trên user thật</li>
  <li>Lighthouse CI cho PR</li>
  <li>Trace backend + cache hit ratio</li>
</ul>
`,
    role: "senior",
    type: "system-design",
  },

  {
    question: "Thiết kế component library nội bộ",
    answer: `
<h3>Thiết kế Component Library nội bộ</h3>

<h4>1) Mục tiêu</h4>
<ul>
  <li>Consistency UI/UX giữa nhiều sản phẩm</li>
  <li>Giảm thời gian dev + tránh duplicate UI code</li>
  <li>Đảm bảo accessibility & quality</li>
</ul>

<h4>2) Phạm vi (đừng làm quá to ngay)</h4>
<ul>
  <li><b>Foundations</b>: colors, typography, spacing, radius, shadow (design tokens)</li>
  <li><b>Primitives</b>: Button, Input, Select, Modal, Tabs</li>
  <li><b>Patterns</b>: FormField, DataTable, Pagination (đến sau)</li>
</ul>

<h4>3) Tech stack đề xuất</h4>
<ul>
  <li>React + TypeScript</li>
  <li>Storybook (docs + playground)</li>
  <li>Build: tsup/rollup + dual ESM/CJS + typings</li>
  <li>Styling: Tailwind (tokens) hoặc CSS variables + vanilla-extract</li>
</ul>

<h4>4) Architecture (monorepo)</h4>
<pre><code>packages/
  ui/
    src/
      components/
      hooks/
      styles/
      index.ts
  tokens/
    src/
      tokens.json
  icons/
    src/
</code></pre>

<h4>5) API design principles</h4>
<ul>
  <li><b>Composable</b>: ưu tiên composition, không hard-code layout</li>
  <li><b>Accessible by default</b>: ARIA, keyboard nav, focus management</li>
  <li><b>Themeable</b>: tokens + CSS variables</li>
  <li><b>Stable contracts</b>: props naming nhất quán</li>
</ul>

<h4>6) Quality gates</h4>
<ul>
  <li>Unit tests (RTL)</li>
  <li>Visual regression (Chromatic)</li>
  <li>Lint/format + changeset + semver</li>
  <li>Release notes + migration guide khi breaking</li>
</ul>

<h4>7) Adoption strategy</h4>
<ul>
  <li>Bắt đầu từ 5–10 components dùng nhiều nhất</li>
  <li>Đưa vào 1 dự án pilot → fix DX → mở rộng</li>
  <li>Deprecate dần components cũ</li>
</ul>
`,
    role: "senior",
    type: "system-design",
  },

  {
    question: "Migration từ React SPA sang Next.js",
    answer: `
<h3>Migration React SPA → Next.js (Incremental)</h3>

<h4>1) Mục tiêu migration (phải rõ)</h4>
<ul>
  <li>SEO tốt hơn (SSR/SSG/ISR)</li>
  <li>Page load nhanh hơn, bundle tối ưu hơn</li>
  <li>Routing và data fetching chuẩn hoá</li>
</ul>

<h4>2) Chiến lược: migrate từng phần (đỡ risk)</h4>
<ul>
  <li>Giữ SPA chạy song song, migrate theo route</li>
  <li>Ưu tiên migrate pages có SEO value: home/category/product</li>
  <li>Checkout/account có thể để CSR lâu hơn</li>
</ul>

<h4>3) Các phase thực tế</h4>

<h5>Phase 1: Setup Next + shared UI</h5>
<ul>
  <li>Tạo Next app (App Router), setup lint/ts/tailwind</li>
  <li>Move shared components/utilities sang shared package/folder</li>
</ul>

<h5>Phase 2: Routing migration</h5>
<ul>
  <li>Map route: React Router → Next segments</li>
  <li>Replace navigation bằng next/link</li>
</ul>

<h5>Phase 3: Data fetching</h5>
<ul>
  <li>Chuyển phần “renderable” sang Server Components khi phù hợp</li>
  <li>Giữ client hooks cho interactive parts (use client)</li>
  <li>Chuẩn hoá caching/revalidate (ISR) cho content pages</li>
</ul>

<h5>Phase 4: State boundaries</h5>
<ul>
  <li>Global client state vẫn dùng Redux/Zustand nếu cần</li>
  <li>Chỉ mark 'use client' cho components thật sự cần events</li>
  <li>Server/client separation để giảm JS + hydration</li>
</ul>

<h5>Phase 5: Test & rollout</h5>
<ul>
  <li>E2E (Playwright) cho critical flows</li>
  <li>Monitor web-vitals + error rate</li>
  <li>Rollout theo feature flag hoặc % traffic</li>
</ul>

<h4>4) Pitfalls thường gặp</h4>
<ul>
  <li><b>Hydration mismatch</b>: dùng window/localStorage/date/random trong SSR render</li>
  <li><b>Env variables</b>: client chỉ dùng NEXT_PUBLIC_*</li>
  <li><b>Auth</b>: SSR cần strategy rõ (cookies, middleware, session)</li>
</ul>

<h4>5) Checklist “đủ ngon”</h4>
<ul>
  <li>Pages SEO đã SSR/ISR</li>
  <li>Bundle size giảm, hydration scope nhỏ</li>
  <li>RUM metrics cải thiện (LCP/INP/CLS)</li>
</ul>
`,
    role: "senior",
    type: "system-design",
  },
]

export default systemDesign
