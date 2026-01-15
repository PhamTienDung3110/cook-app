export const testQuality = [
  // =================== TESTING & QUALITY ===================
  {
    question: "Test pyramid là gì?",
    answer: `
<h4>Test Pyramid (Chiến lược testing chuẩn thực chiến)</h4>

<p>
<b>Test Pyramid</b> là mô hình phân bổ test theo <b>tỷ lệ – chi phí – độ tin cậy</b>,
giúp hệ thống test vừa nhanh, vừa đáng tin, vừa dễ maintain.
</p>

<hr/>

<h5>I. Nguyên lý cốt lõi</h5>
<ul>
  <li>Càng gần đáy → <b>chạy càng nhanh, rẻ, ổn định</b></li>
  <li>Càng lên đỉnh → <b>chậm, đắt, dễ flaky</b></li>
  <li>Test càng cao → giá trị business cao nhưng số lượng phải ít</li>
</ul>

<hr/>

<h5>II. Các tầng trong Test Pyramid</h5>

<h6>1) Unit Tests (Đáy – nền móng)</h6>
<ul>
  <li><b>Tỷ lệ</b>: ~60–75%</li>
  <li><b>Mục tiêu</b>: kiểm tra logic thuần (pure logic)</li>
  <li><b>Đặc điểm</b>: nhanh, deterministic, không phụ thuộc môi trường</li>
  <li><b>Test gì?</b>
    <ul>
      <li>Business rules</li>
      <li>Validation logic</li>
      <li>Reducers, utils, selectors</li>
    </ul>
  </li>
</ul>

<pre><code>
// Ví dụ: unit test logic
test('calculate total price with discount', () => {
  expect(calcTotal(100, 0.1)).toBe(90);
});
</code></pre>

<h6>2) Integration Tests (Thân – quan trọng nhất trong FE)</h6>
<ul>
  <li><b>Tỷ lệ</b>: ~20–30%</li>
  <li><b>Mục tiêu</b>: test interaction giữa nhiều phần</li>
  <li><b>Đặc điểm</b>: chậm hơn unit, nhưng bắt bug thật</li>
  <li><b>Test gì?</b>
    <ul>
      <li>Component + hook</li>
      <li>Component + API (mock bằng MSW)</li>
      <li>Form submit + validation + error UI</li>
    </ul>
  </li>
</ul>

<pre><code>
// React Testing Library + MSW
test('user list loads and renders', async () => {
  render(&lt;UserList /&gt;);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText('John')).toBeInTheDocument();
});
</code></pre>

<h6>3) E2E Tests (Đỉnh – test business flow)</h6>
<ul>
  <li><b>Tỷ lệ</b>: ~5–10%</li>
  <li><b>Mục tiêu</b>: bảo vệ user journey quan trọng</li>
  <li><b>Đặc điểm</b>: chậm, dễ flaky, chi phí cao</li>
  <li><b>Test gì?</b>
    <ul>
      <li>Login / Register</li>
      <li>Checkout / Payment</li>
      <li>Create / Update flows quan trọng</li>
    </ul>
  </li>
</ul>

<pre><code>
// Playwright
test('user can complete checkout', async ({ page }) => {
  await page.goto('/checkout');
  await page.fill('[data-testid=email]', 'a@test.com');
  await page.click('[data-testid=submit]');
  await expect(page.getByText('Success')).toBeVisible();
});
</code></pre>

<hr/>

<h5>III. Common Anti-patterns</h5>
<ul>
  <li>❌ Quá nhiều E2E → test chậm, flaky, team ghét test</li>
  <li>❌ Chỉ viết unit test, không test flow → lọt bug integration</li>
  <li>❌ Test pyramid ngược (ice-cream cone)</li>
</ul>

<h5>IV. Rule of Thumb (Senior dùng)</h5>
<ul>
  <li>Logic phức tạp → unit</li>
  <li>Component behavior → integration</li>
  <li>User money / auth / data loss → E2E</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },

  {
    question: "Khi nào không nên viết unit test?",
    answer: `
<h4>Khi nào KHÔNG nên viết Unit Test (Senior Perspective)</h4>

<p>
Không phải code nào cũng đáng để viết unit test.
Senior focus vào <b>ROI (Return on Investment)</b> của test.
</p>

<hr/>

<h5>I. Những trường hợp KHÔNG nên viết</h5>

<h6>1) Third-party / framework code</h6>
<ul>
  <li>React, Lodash, date-fns… đã được test kỹ</li>
  <li>Unit test lại chỉ tạo false sense of safety</li>
</ul>

<h6>2) Code quá trivial</h6>
<pre><code>
// ❌ Không đáng test
const getName = (user) => user.name;
</code></pre>

<h6>3) Generated code</h6>
<ul>
  <li>GraphQL types</li>
  <li>OpenAPI client</li>
  <li>ORM auto-generated</li>
</ul>

<h6>4) Configuration & wiring</h6>
<ul>
  <li>Webpack/Vite config</li>
  <li>Env mapping</li>
  <li>Index export files</li>
</ul>

<h6>5) UI thuần presentational</h6>
<ul>
  <li>Không logic</li>
  <li>Chỉ render props</li>
  <li>Nên test bằng integration hoặc snapshot (nếu cần)</li>
</ul>

<hr/>

<h5>II. NÊN viết unit test khi nào?</h5>

<h6>1) Business logic</h6>
<ul>
  <li>Tính tiền</li>
  <li>Phân quyền</li>
  <li>Rule theo domain</li>
</ul>

<h6>2) Logic dễ sai</h6>
<ul>
  <li>Nhiều nhánh</li>
  <li>Edge cases</li>
  <li>Boundary conditions</li>
</ul>

<h6>3) Code thay đổi thường xuyên</h6>
<ul>
  <li>Core logic</li>
  <li>Shared utilities</li>
</ul>

<hr/>

<h5>III. Decision Framework (Senior dùng)</h5>
<ul>
  <li><b>Risk cao?</b> → viết</li>
  <li><b>Sai gây thiệt hại?</b> → viết</li>
  <li><b>Thay đổi thường xuyên?</b> → viết</li>
  <li><b>Dễ test không?</b> → nếu quá khó, xem lại design</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },

  {
    question: "Mock quá nhiều có hại không?",
    answer: `
<h4>Mock quá nhiều có hại không? — CÓ</h4>

<p>
Mock là con dao hai lưỡi. Dùng đúng → test nhanh.
Dùng sai → test giả, production lỗi.
</p>

<hr/>

<h5>I. Tác hại của over-mocking</h5>

<h6>1) False confidence</h6>
<ul>
  <li>Test pass nhưng production fail</li>
  <li>Mock ≠ behavior thật</li>
</ul>

<h6>2) Test gắn chặt implementation</h6>
<ul>
  <li>Refactor không đổi behavior nhưng test fail</li>
  <li>Developer sợ refactor</li>
</ul>

<h6>3) Che giấu bug integration</h6>
<ul>
  <li>API contract mismatch</li>
  <li>State flow sai</li>
</ul>

<hr/>

<h5>II. Khi nào NÊN mock?</h5>
<ul>
  <li>External services (HTTP, payment, email)</li>
  <li>Unreliable / slow dependencies</li>
  <li>Side effects nặng (file, timer, crypto)</li>
</ul>

<h5>III. Khi nào KHÔNG nên mock?</h5>
<ul>
  <li>Pure functions</li>
  <li>Internal domain logic</li>
  <li>Component behavior chính</li>
</ul>

<hr/>

<h5>IV. Ưu tiên Test Strategy</h5>
<ul>
  <li><b>Unit</b>: mock IO, test logic</li>
  <li><b>Integration</b>: dùng real code + MSW</li>
  <li><b>E2E</b>: ít mock nhất có thể</li>
</ul>

<h5>V. Rule of Thumb</h5>
<ul>
  <li>Nếu mock làm test dễ hơn → OK</li>
  <li>Nếu mock làm test giả → bỏ</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },

  {
    question: "Test async component khó ở đâu?",
    answer: `
<h4>Testing Async React Components — Khó vì đâu?</h4>

<hr/>

<h5>I. Các vấn đề thường gặp</h5>

<h6>1) Timing</h6>
<ul>
  <li>Test chạy trước khi async hoàn tất</li>
</ul>

<h6>2) Race conditions</h6>
<ul>
  <li>Nhiều request cùng lúc</li>
  <li>State update không theo thứ tự</li>
</ul>

<h6>3) Cleanup</h6>
<ul>
  <li>Effect không cleanup → leak giữa tests</li>
</ul>

<h6>4) Error paths</h6>
<ul>
  <li>Loading → Error → Retry</li>
  <li>Boundary không được test</li>
</ul>

<hr/>

<h5>II. Best Practices</h5>

<h6>1) Dùng async utilities của RTL</h6>
<pre><code>
await screen.findByText('Loaded');
</code></pre>

<h6>2) Test từng state</h6>
<ul>
  <li>Loading</li>
  <li>Success</li>
  <li>Error</li>
</ul>

<h6>3) Mock API đúng cách</h6>
<ul>
  <li>Ưu tiên MSW (mock ở network layer)</li>
  <li>Không mock implementation nội bộ</li>
</ul>

<h6>4) Đảm bảo cleanup</h6>
<ul>
  <li>AbortController</li>
  <li>clear timers</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },

  {
    question: "Snapshot test có thật sự hiệu quả?",
    answer: `
<h4>Snapshot Testing — Có hiệu quả không?</h4>

<h5>Kết luận ngắn gọn</h5>
<p>
Snapshot <b>KHÔNG phải rác</b>, nhưng <b>KHÔNG phải default choice</b>.
</p>

<hr/>

<h5>I. Khi snapshot có giá trị</h5>
<ul>
  <li>UI thuần, ít dynamic</li>
  <li>Component stable</li>
  <li>Muốn detect regression nhanh</li>
</ul>

<h5>II. Khi snapshot gây hại</h5>
<ul>
  <li>Component nhiều logic</li>
  <li>Dynamic content (id, date, random)</li>
  <li>Snapshot quá lớn → không ai review</li>
</ul>

<hr/>

<h5>III. Best Practices</h5>
<ul>
  <li>Dùng snapshot cho <b>presentational components</b></li>
  <li>Kết hợp với behavior tests</li>
  <li>Review snapshot diff như code</li>
</ul>

<h5>IV. Alternatives tốt hơn</h5>
<ul>
  <li>Behavior tests (RTL)</li>
  <li>Visual regression (Chromatic, Percy)</li>
  <li>Storybook interaction tests</li>
</ul>
`,
    role: "senior",
    type: "testing-quality",
  },
];
