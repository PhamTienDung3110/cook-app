export const architectureLeadership = [
  // =================== ARCHITECTURE & LEADERSHIP ===================
  {
    question: "Bạn review code React theo tiêu chí nào?",
    answer: `
<h4>Code Review Criteria cho React (Senior / Tech Lead)</h4>

<h5>0) Trước khi vào code: Context & Intent</h5>
<ul>
  <li><b>Ticket/PR description có rõ</b>: mục tiêu, phạm vi, out-of-scope, risk, rollout plan?</li>
  <li><b>Acceptance criteria</b> có thể verify không (ai test, test case nào)?</li>
  <li><b>Chỉ số cần giữ</b>: Core Web Vitals, TTI, bundle size, error rate, conversion?</li>
  <li><b>Phụ thuộc</b>: API/contract thay đổi? feature flag? migration?</li>
</ul>

<hr/>

<h5>I. Functional Correctness (Đúng yêu cầu)</h5>

<h6>1) Requirements & Behavior</h6>
<ul>
  <li>Luồng chính có chạy đúng không? (happy path)</li>
  <li>Edge cases: empty, null, thiếu permission, network error, timeout, retry, offline?</li>
  <li>UI states đầy đủ: <b>loading / success / error / empty</b>?</li>
  <li>Form: validate đầy đủ? disable submit khi invalid? double-submit prevention?</li>
  <li>Routing: deep-link, back/forward, refresh, query params có giữ state hợp lý?</li>
</ul>

<h6>2) Data Integrity</h6>
<ul>
  <li>State có “source of truth” rõ ràng không? Tránh state trùng lặp (derived state lưu vào state).</li>
  <li>Mutations có optimistic update? rollback khi fail? invalidation đúng?</li>
  <li>Concurrency: 2 request về lệch thứ tự có gây stale UI không? (race condition)</li>
</ul>

<h6>3) Error handling chuẩn</h6>
<ul>
  <li>Có phân loại lỗi: validation / network / server / permission?</li>
  <li>User message rõ ràng, không lộ technical detail? Có guidance “thử lại / liên hệ”?</li>
  <li>Log/Tracking: Sentry/Datadog có attach context (userId, route, action)?</li>
</ul>

<hr/>

<h5>II. React Correctness (Đúng React, đúng lifecycle)</h5>

<h6>1) Render purity (rất quan trọng)</h6>
<ul>
  <li>Không gọi API, setState, mutate global trong render.</li>
  <li>Không tạo side effects trong render (vd: localStorage, analytics).</li>
</ul>

<h6>2) useEffect / dependency</h6>
<ul>
  <li>Dependency có đúng không? Tránh “lừa deps” bằng disable eslint tràn lan.</li>
  <li>Effect cleanup đúng: unsubscribe, abort fetch, clear timers.</li>
  <li>Không dùng useEffect để “compute” derived state nếu có thể tính trực tiếp.</li>
</ul>

<h6>Ví dụ: tránh race condition khi fetch</h6>
<pre><code>
useEffect(() => {
  const controller = new AbortController();
  (async () => {
    try {
      setLoading(true);
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (e) {
      if (e.name !== 'AbortError') setError(e);
    } finally {
      setLoading(false);
    }
  })();
  return () => controller.abort();
}, [url]);
</code></pre>

<h6>3) Keys trong list</h6>
<ul>
  <li>Key phải ổn định theo entity id, không dùng index (trừ list static không reorder).</li>
  <li>Tránh key thay đổi theo render (vd: Math.random()).</li>
</ul>

<h6>4) StrictMode & React 18 behavior</h6>
<ul>
  <li>Dev có thể chạy effect 2 lần (StrictMode). Code phải idempotent.</li>
  <li>Concurrent rendering: tránh assumption “render là commit”.</li>
</ul>

<hr/>

<h5>III. Performance (Không làm chậm app)</h5>

<h6>1) Re-render control (đúng cách)</h6>
<ul>
  <li>State đặt đúng nơi: local càng gần nơi dùng càng tốt.</li>
  <li>Tránh prop drilling quá sâu → cân nhắc context / state lib.</li>
  <li>Không vội useMemo/useCallback. Chỉ dùng khi: (a) child memoized + props stable, (b) compute nặng, (c) list lớn.</li>
</ul>

<h6>2) List lớn / UI nặng</h6>
<ul>
  <li>Virtualization (react-window / virtual list) khi item lớn.</li>
  <li>Pagination/infinite scroll thay vì render all.</li>
  <li>Debounce input search; cancel request cũ.</li>
</ul>

<h6>3) Bundle & Loading</h6>
<ul>
  <li>Code-splitting route-level, lazy cho phần ít dùng.</li>
  <li>Tránh import “barrel” kéo cả library.</li>
  <li>Images: đúng format (webp/avif), lazy, sizes/srcset.</li>
</ul>

<h6>4) Measuring (đo trước khi optimize)</h6>
<ul>
  <li>React Profiler: xác định component “hot”.</li>
  <li>Web Vitals: LCP/INP/CLS; kiểm tra regression.</li>
</ul>

<hr/>

<h5>IV. Security (Đúng chuẩn, không tạo lỗ hổng)</h5>
<ul>
  <li><b>XSS</b>: hạn chế dangerouslySetInnerHTML; nếu cần → sanitize (DOMPurify) + CSP.</li>
  <li><b>AuthZ</b>: không chỉ “ẩn nút”, phải enforce server. UI vẫn nên guard để tránh UX tệ.</li>
  <li><b>CSRF</b>: nếu cookie session, đảm bảo CSRF token/SameSite.</li>
  <li><b>Secrets</b>: không log token/PII; không hardcode.</li>
</ul>

<hr/>

<h5>V. Accessibility (A11y) & UX</h5>
<ul>
  <li>Semantic HTML đúng: button/label/input, heading order.</li>
  <li>Keyboard: focus visible, tab order, ESC close modal.</li>
  <li>ARIA đúng: role=dialog, aria-labelledby, aria-describedby.</li>
  <li>Color contrast, error messages gắn với field (aria-invalid).</li>
</ul>

<hr/>

<h5>VI. Maintainability & Architecture (Dễ sống về sau)</h5>

<h6>1) Separation of concerns</h6>
<ul>
  <li>UI component vs domain logic vs data fetching tách rõ.</li>
  <li>Tránh “God component” 500 dòng làm mọi thứ.</li>
</ul>

<h6>2) Naming & Structure</h6>
<ul>
  <li>Đặt tên theo domain (OrderSummary) hơn là UI (Box2).</li>
  <li>Folder theo feature (feature-based) giúp scale team.</li>
</ul>

<h6>3) TypeScript correctness</h6>
<ul>
  <li>Không lạm dụng any/as. Prefer type narrowing, discriminated unions.</li>
  <li>Null safety, optional chaining đúng chỗ.</li>
  <li>DTO/contract rõ ràng giữa FE-BE.</li>
</ul>

<hr/>

<h5>VII. Testing Strategy (test đúng thứ cần test)</h5>
<ul>
  <li>Unit test: pure functions, reducers, validators.</li>
  <li>Integration test: component + API mock (MSW) cho flow quan trọng.</li>
  <li>E2E: checkout/login/payment - các journey critical.</li>
  <li>Test theo behavior (Testing Library), tránh test implementation detail.</li>
</ul>

<hr/>

<h5>VIII. Review “Red Flags” (cờ đỏ)</h5>
<ul>
  <li>Disable eslint rules mà không có lý do.</li>
  <li>useEffect phụ thuộc thiếu/ừa cho qua.</li>
  <li>State trùng lặp với props/derived state.</li>
  <li>Hardcode magic numbers, string literal khắp nơi.</li>
  <li>Không có loading/error state.</li>
  <li>Không có plan rollback/feature flag cho thay đổi lớn.</li>
</ul>

<h5>IX. Review Comments style (Lead behavior)</h5>
<ul>
  <li>Phân loại feedback: <b>Blocker</b> / <b>Suggestion</b> / <b>Question</b>.</li>
  <li>Đưa alternative cụ thể + lý do (trade-off).</li>
  <li>Không bắt bẻ style nhỏ nếu không quan trọng (để formatter/lint xử lý).</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },

  {
    question: "Refactor lớn nên làm thế nào để an toàn?",
    answer: `
<h4>Refactor lớn an toàn (Playbook cho Tech Lead)</h4>

<h5>I. Define “Safety” & Constraints</h5>
<ul>
  <li>Mục tiêu refactor: giảm tech debt? tăng performance? chuẩn bị feature?</li>
  <li>Chỉ số phải giữ: error rate, conversion, web vitals, latency.</li>
  <li>Phạm vi rõ ràng: <b>đụng DB?</b> <b>đổi API contract?</b> <b>đổi routing?</b></li>
  <li>Phân loại rủi ro: UI-only / business logic / data migration.</li>
</ul>

<hr/>

<h5>II. Preparation (chuẩn bị trước khi code)</h5>

<h6>1) Test coverage tối thiểu</h6>
<ul>
  <li>Thiếu test → viết test “golden path” trước (smoke/integration) để khóa behavior.</li>
  <li>Ưu tiên test: login, checkout, payment, create/update flows.</li>
</ul>

<h6>2) Observability baseline</h6>
<ul>
  <li>Set dashboard/alerts: JS errors, API error, p95 latency, web vitals.</li>
  <li>Gắn tracing/correlation id nếu có.</li>
</ul>

<h6>3) Feature flag / kill switch</h6>
<ul>
  <li>Refactor lớn nên có flag để bật/tắt nhanh.</li>
  <li>Phân tầng rollout: internal → 5% → 25% → 100%.</li>
</ul>

<pre><code>
// Flag split theo user/tenant
const enabled = flags.isEnabled("new_checkout", user.id);
return enabled ? &lt;NewCheckout /&gt; : &lt;OldCheckout /&gt;;
</code></pre>

<h6>4) Contract-first</h6>
<ul>
  <li>Nếu đổi API: làm schema/DTO trước, versioning nếu cần.</li>
  <li>Không “đổi cả FE+BE cùng lúc” nếu không có plan rollback.</li>
</ul>

<hr/>

<h5>III. Execution Strategy (triển khai)</h5>

<h6>1) Strangler Fig Pattern (bọc dần)</h6>
<ul>
  <li>Giữ hệ cũ chạy, thay từng phần bằng hệ mới.</li>
  <li>Điểm nối rõ: adapter layer.</li>
</ul>

<h6>2) Small PRs (nguyên tắc vàng)</h6>
<ul>
  <li>Mỗi PR nhỏ, review dễ, rollback dễ.</li>
  <li>Mỗi PR chỉ 1 mục tiêu.</li>
  <li>Giữ build xanh liên tục.</li>
</ul>

<h6>3) Parallel run & compare</h6>
<ul>
  <li>Chạy logic mới song song logic cũ và so kết quả (shadow mode).</li>
  <li>Log chênh lệch để phát hiện bug trước khi switch.</li>
</ul>

<h6>4) Migration plan (nếu có data)</h6>
<ul>
  <li>Backward-compatible migrations (expand → migrate → contract).</li>
  <li>Không drop field ngay lập tức.</li>
  <li>Viết script backfill + verification.</li>
</ul>

<hr/>

<h5>IV. Risk Mitigation (giảm rủi ro)</h5>
<ul>
  <li><b>Rollback plan</b>: revert PR? tắt flag? DB rollback?</li>
  <li><b>Release strategy</b>: canary release, staged rollout.</li>
  <li><b>Monitoring</b>: theo dõi error/perf ngay sau deploy.</li>
  <li><b>War-room</b> cho release lớn: ai trực, kênh liên lạc, playbook.</li>
</ul>

<hr/>

<h5>V. Communication & Documentation (leadership)</h5>
<ul>
  <li>RFC/ADR: tại sao refactor, alternatives, trade-off, quyết định.</li>
  <li>Timeline: milestones, checkpoint, ai chịu trách nhiệm.</li>
  <li>Chốt “Definition of Done”: test pass + metrics ổn + docs update.</li>
</ul>

<h5>VI. Red flags trong refactor</h5>
<ul>
  <li>Refactor + thêm feature chung PR.</li>
  <li>Không có flag nhưng thay đổi lớn.</li>
  <li>Không có baseline test/monitoring.</li>
  <li>Đổi API contract mà không versioning/backward compatibility.</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },

  {
    question: "Làm sao prevent performance regression?",
    answer: `
<h4>Prevent Performance Regression (System + Practice)</h4>

<h5>I. Define Performance “SLO” (định nghĩa chuẩn)</h5>
<ul>
  <li>Web Vitals: LCP, INP, CLS.</li>
  <li>Bundle size: entry, route chunks.</li>
  <li>Runtime: render time, p95 interaction latency.</li>
  <li>Error budget: JS error rate, API error rate.</li>
</ul>

<hr/>

<h5>II. Automated Guardrails (chặn từ CI)</h5>

<h6>1) Lighthouse CI / Web Vitals checks</h6>
<ul>
  <li>Chạy Lighthouse CI trên PR hoặc nightly.</li>
  <li>Fail pipeline nếu LCP/INP/CLS vượt budget.</li>
</ul>

<h6>2) Bundle size & dependency checks</h6>
<ul>
  <li>Fail PR nếu bundle tăng quá ngưỡng.</li>
  <li>Detect import nặng (moment -> dayjs, lodash full import).</li>
</ul>

<h6>3) ESLint / TypeScript gates</h6>
<ul>
  <li>react-hooks/exhaustive-deps = error (trừ trường hợp có lý do + comment).</li>
  <li>No-explicit-any, strictNullChecks.</li>
</ul>

<hr/>

<h5>III. Engineering Practices (đúng cách, không mù quáng)</h5>

<h6>1) Profiling-driven optimization</h6>
<ul>
  <li>Chỉ optimize khi đo được.</li>
  <li>React Profiler tìm component render nhiều và nặng.</li>
</ul>

<h6>2) Prevent common React perf traps</h6>
<ul>
  <li>Tránh inline object/function props ở component memoized (khi cần).</li>
  <li>Tránh setState theo interval gây re-render toàn cây.</li>
  <li>Tránh context value thay đổi liên tục khiến subtree rerender.</li>
</ul>

<h6>Ví dụ: context tối ưu value</h6>
<pre><code>
const value = useMemo(() => ({ user, setUser }), [user]);
return &lt;UserContext.Provider value={value}&gt;...&lt;/UserContext.Provider&gt;;
</code></pre>

<h6>3) Data fetching best practices</h6>
<ul>
  <li>Cache, dedupe, request cancellation.</li>
  <li>Debounce search + stale-while-revalidate nếu phù hợp.</li>
</ul>

<h6>4) Rendering lớn</h6>
<ul>
  <li>Virtualize list, pagination.</li>
  <li>Lazy load heavy components (charts, editors).</li>
  <li>Move heavy compute khỏi render (useMemo hoặc web worker).</li>
</ul>

<hr/>

<h5>IV. Monitoring in Production (bắt regression thật)</h5>
<ul>
  <li>RUM: track Web Vitals theo user thật.</li>
  <li>Sentry: track slow transactions, rerender hot paths (nếu setup).</li>
  <li>Alert khi regression: tăng error rate, tăng INP, tăng p95.</li>
</ul>

<h5>V. Team Process (để không tái phạm)</h5>
<ul>
  <li>Performance checklist trong PR template.</li>
  <li>Post-release review: nếu regression → RCA + action items.</li>
  <li>Training: React Profiler, Chrome Performance tab.</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },

  {
    question: "Khi nào technical debt nên được trả?",
    answer: `
<h4>When to Pay Technical Debt (Decision Framework)</h4>

<h5>I. Pay Now (Blocker / High risk)</h5>
<ul>
  <li><b>Security</b>: XSS/CSRF, auth bypass, dependency CVE nghiêm trọng.</li>
  <li><b>Reliability</b>: crash, memory leak, data corruption, race condition.</li>
  <li><b>Revenue-impact</b>: checkout chậm, lỗi conversion, web vitals fail nặng.</li>
  <li><b>Compliance</b>: PII leakage, logging sai, quy định ngành.</li>
</ul>

<h5>II. Plan to Pay (đưa vào roadmap)</h5>
<ul>
  <li>Chuẩn bị feature lớn cần nền tảng sạch.</li>
  <li>DX tệ: build chậm, test khó, onboarding lâu.</li>
  <li>Scale team: nhiều người chạm vào module dễ conflict.</li>
  <li>Kiến trúc “kẹt”: thay đổi nhỏ cũng phải sửa nhiều nơi (tight coupling).</li>
</ul>

<h5>III. Track Only (nợ “đẹp”, không gấp)</h5>
<ul>
  <li>Duplication nhỏ, chưa ảnh hưởng tốc độ dev.</li>
  <li>Refactor thuần style, chưa có bug/perf issues.</li>
  <li>Cải tiến optional, không ảnh hưởng roadmap.</li>
</ul>

<hr/>

<h5>IV. Scoring Model (rất dễ dùng với PM/Stakeholder)</h5>
<ul>
  <li><b>Impact</b> (0-5): ảnh hưởng user/dev/revenue?</li>
  <li><b>Risk</b> (0-5): khả năng gây sự cố?</li>
  <li><b>Cost</b> (0-5): effort để fix?</li>
  <li><b>Urgency</b> (0-5): có deadline/upgrade/depra?</li>
</ul>
<p><b>Rule of thumb:</b> (Impact + Risk + Urgency) - Cost càng cao càng nên làm sớm.</p>

<hr/>

<h5>V. Best Practices trả nợ không phá roadmap</h5>
<ul>
  <li>Allocate % cố định mỗi sprint (10-20%)</li>
  <li>Debt “kèm feature”: làm refactor đúng phần sắp đụng</li>
  <li>ADR/RFC để tránh “trả nợ rồi lại tạo nợ”</li>
</ul>

<h5>VI. Red Flags</h5>
<ul>
  <li>“Refactor cho sạch” nhưng không gắn outcome/metric.</li>
  <li>Đụng core module mà không test/flag.</li>
  <li>Không có owner maintain.</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },

  {
    question: "Bạn quyết định tech stack dựa trên yếu tố gì?",
    answer: `
<h4>Tech Stack Decision (Senior / Lead Framework)</h4>

<h5>I. Step 1 — Clarify Requirements (bắt buộc)</h5>
<ul>
  <li>Functional: feature set, user roles, integrations.</li>
  <li>Non-functional: performance, scalability, availability, security, compliance.</li>
  <li>Constraints: deadline, budget, existing infra, team skill, hiring market.</li>
</ul>

<hr/>

<h5>II. Business Factors</h5>
<ul>
  <li><b>Time-to-market</b>: stack nào ship nhanh + ít risk?</li>
  <li><b>Total Cost of Ownership</b>: chi phí vận hành + maintain 1-3 năm.</li>
  <li><b>Risk</b>: vendor lock-in, độ ổn định ecosystem.</li>
  <li><b>Talent</b>: dễ tuyển, dễ onboard.</li>
</ul>

<hr/>

<h5>III. Technical Factors</h5>

<h6>1) Architecture fit</h6>
<ul>
  <li>Monolith vs modular monolith vs microservices?</li>
  <li>SSR/SSG/CSR (SEO, TTFB, caching strategy)?</li>
  <li>Data: SQL vs NoSQL; event-driven cần không?</li>
</ul>

<h6>2) Ecosystem maturity</h6>
<ul>
  <li>Library ecosystem, community, release cadence.</li>
  <li>Docs quality, best practices, battle-tested patterns.</li>
</ul>

<h6>3) Maintainability</h6>
<ul>
  <li>Type safety, tooling, testing, migration path.</li>
  <li>Backward compatibility & upgrade pain.</li>
</ul>

<h6>4) Security & Compliance</h6>
<ul>
  <li>AuthN/AuthZ, secrets management, audit log.</li>
  <li>GDPR/PII policies nếu có.</li>
</ul>

<hr/>

<h5>IV. Team & Org Factors</h5>
<ul>
  <li>Skill hiện tại và learning curve.</li>
  <li>DevEx: local setup, CI speed, debugging, observability.</li>
  <li>Org scale: nhiều team cùng codebase? cần governance?</li>
</ul>

<hr/>

<h5>V. Decision Process (cách ra quyết định “được tin”)</h5>
<ol>
  <li><b>Shortlist 2-3 options</b> hợp lý.</li>
  <li><b>POC timeboxed</b> (1-2 tuần): implement 1 flow quan trọng.</li>
  <li><b>Evaluate bằng rubric</b>: performance, DX, maintain, cost, security.</li>
  <li><b>Risk mitigation</b>: migration path + rollback.</li>
  <li><b>Document (ADR)</b>: vì sao chọn, vì sao loại option khác.</li>
</ol>

<hr/>

<h5>VI. Rubric mẫu (chấm điểm)</h5>
<ul>
  <li>Ship speed (0-5)</li>
  <li>Operational complexity (0-5)</li>
  <li>Scalability (0-5)</li>
  <li>Security posture (0-5)</li>
  <li>Hiring/Onboarding (0-5)</li>
  <li>Long-term maintainability (0-5)</li>
</ul>

<h5>VII. Red Flags khi chọn stack</h5>
<ul>
  <li>Chọn theo trend, không gắn requirement.</li>
  <li>Chọn công nghệ team chưa biết mà deadline gấp.</li>
  <li>Không có plan vận hành: logging, monitoring, backup, deploy.</li>
  <li>Không đánh giá upgrade path/maintenance cost.</li>
</ul>
`,
    role: "senior",
    type: "architecture-leadership",
  },
];
