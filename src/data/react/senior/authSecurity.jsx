// authSecurity.ts
// Auth & Security Q&A (Senior) — answers as HTML strings
// NOTE: If you render these answers in the browser, sanitize HTML to prevent XSS.

export const authSecurity = [
  // =================== AUTH & SECURITY ===================
  {
    question: "XSS có bypass React escape không?",
    answer: `
<h3>XSS và React Escaping</h3>

<h4>React bảo vệ gì theo mặc định?</h4>
<p>React <b>tự động escape</b> mọi content render trong JSX (string/number) để tránh XSS. Nghĩa là nếu bạn render một chuỗi chứa &lt;script&gt; thì nó sẽ hiện ra như text, không chạy.</p>

<h5>An toàn theo mặc định</h5>
<pre><code>// ✅ React tự escape
const content = "&lt;script&gt;alert('xss')&lt;/script&gt;";
return &lt;div&gt;{content}&lt;/div&gt;; // render thành text
</code></pre>

<h4>Vậy XSS có bypass được không?</h4>
<p><b>Có</b> — nhưng không phải “bypass React escape” theo nghĩa phá được cơ chế escape của JSX, mà là bạn (hoặc lib) <b>đưa dữ liệu vào các sink nguy hiểm</b> khiến React không còn cơ hội escape.</p>

<h4>Những pattern dễ dính XSS</h4>

<h5>1) dangerouslySetInnerHTML</h5>
<pre><code>// ❌ XSS nếu userInput chưa sanitize
&lt;div dangerouslySetInnerHTML={{ __html: userInput }} /&gt;
</code></pre>
<p>Đây là “sink” nguy hiểm nhất trong React. Nếu buộc phải dùng, hãy sanitize HTML (DOMPurify) và cân nhắc Trusted Types.</p>

<h5>2) Thao tác DOM trực tiếp</h5>
<pre><code>// ❌ Bypass toàn bộ JSX escaping
document.getElementById('myDiv').innerHTML = userInput;
</code></pre>

<h5>3) URL injection (javascript:, data:...)</h5>
<pre><code>// ❌ nếu userInput = "javascript:alert(1)"
&lt;a href={userInput}&gt;Link&lt;/a&gt;
</code></pre>
<p>React không “sanitize URL scheme” cho bạn. Cần validate allow-list (https/http/mailto/tel) và normalize URL.</p>

<h5>4) CSS/Style injection qua “string style” (hiếm hơn, nhưng có)</h5>
<p>Nếu bạn build CSS string trực tiếp từ user input (inline style string, style tags), có thể dẫn đến injection/behavior không mong muốn.</p>

<h5>5) Third-party libraries</h5>
<p>Lib UI/editor/markdown/parser có thể tạo HTML nguy hiểm nếu config sai hoặc version có CVE. Ví dụ: markdown renderer cho phép raw HTML.</p>

<h5>6) SSR/templating không escape đúng</h5>
<p>Nếu server-side render/templating inject raw HTML từ user input, React phía client không cứu được.</p>

<h4>Chiến lược phòng thủ (practical)</h4>
<ul>
  <li><b>Tránh</b> dangerouslySetInnerHTML nếu không thật sự cần.</li>
  <li><b>Sanitize</b> HTML khi bắt buộc render raw HTML (DOMPurify) + allow-list tags/attrs.</li>
  <li><b>Validate URL</b>: chặn javascript:, data: (trừ khi có lý do) + allow-list scheme.</li>
  <li><b>CSP</b>: giảm impact nếu có XSS (script-src, object-src, base-uri, frame-ancestors).</li>
  <li><b>Trusted Types</b>: ép sink nguy hiểm phải dùng “trusted” objects (giảm DOM XSS).</li>
  <li><b>Escape ở server</b> + output encoding đúng context (HTML/attr/URL/JS).</li>
</ul>
`,
    role: "senior",
    type: "auth-security",
  },

  {
    question: "CSRF xảy ra trong SPA khi nào?",
    answer: `
<h3>CSRF trong Single Page Applications</h3>

<h4>CSRF là gì?</h4>
<p>Cross-Site Request Forgery: attacker khiến browser của user (đang đăng nhập) gửi request tới hệ thống bạn, do browser tự đính kèm credentials (cookie).</p>

<h4>Trong SPA, CSRF xảy ra khi nào?</h4>
<p>CSRF trong SPA chủ yếu xảy ra khi bạn dùng <b>cookie-based auth</b> (session cookie hoặc refresh/access token trong cookie) và API chấp nhận request “đúng cookie” mà <b>không kiểm tra thêm</b> (CSRF token / Origin / SameSite...).</p>

<h5>Điều kiện thường gặp</h5>
<ul>
  <li>Auth dựa trên cookie (session/httpOnly cookie)</li>
  <li>Browser tự gửi cookie theo request</li>
  <li>Server không verify CSRF token hoặc Origin/Referer</li>
  <li>Cookie cấu hình SameSite=None hoặc Lax/Strict nhưng flow vẫn có lỗ</li>
</ul>

<h4>Ví dụ rủi ro khi gửi cookies</h4>
<pre><code>// dễ dính nếu server không có CSRF defense
fetch('/api/transfer', {
  method: 'POST',
  credentials: 'include'
});
</code></pre>

<h4>Vector tấn công phổ biến</h4>

<h5>1) Hidden form POST từ site độc</h5>
<pre><code>&lt;form action="https://app.com/api/transfer" method="POST"&gt;
  &lt;input name="to" value="attacker"&gt;
  &lt;input name="amount" value="1000"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit()&lt;/script&gt;
</code></pre>

<h5>2) GET side-effect qua image/script tag (nếu API sai thiết kế)</h5>
<pre><code>&lt;img src="https://app.com/api/delete?item=123" /&gt;
</code></pre>
<p>Nếu bạn làm “delete” bằng GET là tự mở cửa cho CSRF. Side-effect phải dùng POST/PUT/PATCH/DELETE và có CSRF defense.</p>

<h4>Cách bảo vệ SPA</h4>

<h5>1) SameSite cookies</h5>
<pre><code>Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly
</code></pre>

<h5>2) CSRF token (double submit / synchronizer token)</h5>
<pre><code>// Client gửi token ở header
fetch('/api/data', {
  headers: { 'X-CSRF-Token': token },
  credentials: 'include'
});
</code></pre>

<h5>3) Origin / Referer checking</h5>
<p>Với requests state-changing, validate Origin/Referer đúng domain.</p>

<h5>4) Thiết kế API đúng</h5>
<ul>
  <li>Không dùng GET cho hành động có side-effect</li>
  <li>Yêu cầu Content-Type chuẩn (application/json) + chặn form-encoded nếu cần</li>
  <li>Rate limit + audit logs</li>
</ul>
`,
    role: "senior",
    type: "auth-security",
  },

  {
    question: "SameSite cookie hoạt động thế nào?",
    answer: `
<h3>SameSite Cookie Attribute</h3>

<h4>SameSite kiểm soát gì?</h4>
<p>SameSite quyết định browser có <b>gửi cookie</b> khi request được tạo trong bối cảnh <b>cross-site</b> hay không. Mục tiêu chính: giảm CSRF.</p>

<h4>Các giá trị</h4>
<ul>
  <li><b>Strict</b>: chỉ gửi cookie trong ngữ cảnh same-site.</li>
  <li><b>Lax</b>: chặn phần lớn cross-site subrequests, nhưng cho phép cookie trong một số top-level navigations (ví dụ click link).</li>
  <li><b>None</b>: cho phép cross-site, <b>bắt buộc Secure</b> (HTTPS).</li>
</ul>

<h4>Strict</h4>
<pre><code>Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly

// ❌ Blocked: request được trigger từ site khác (iframe, img, form…)
// ✅ Allowed: user đang ở đúng site và request cùng site
</code></pre>

<h4>Lax</h4>
<pre><code>Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly

// ✅ Allowed: top-level navigation (ví dụ user click link sang site bạn)
// ❌ Blocked: đa số subrequests cross-site như img/script/iframe
</code></pre>
<p>Lax thường là lựa chọn cân bằng: giảm CSRF mà ít phá flow.</p>

<h4>None</h4>
<pre><code>Set-Cookie: session=abc; SameSite=None; Secure; HttpOnly
</code></pre>
<p>Dùng khi bạn <b>cần</b> cookie hoạt động cross-site (ví dụ SSO, embedded app, subdomain/cross-domain đặc thù). Vì mở cửa cross-site nên phải có CSRF defense (token/origin) và HTTPS.</p>

<h4>CSRF protection</h4>
<ul>
  <li><b>Strict</b>: bảo vệ mạnh, nhưng có thể làm hỏng một số flow (SSO/redirect).</li>
  <li><b>Lax</b>: thường đủ tốt cho nhiều app web truyền thống.</li>
  <li><b>None</b>: cần thêm lớp phòng thủ.</li>
</ul>

<h4>Ví dụ cấu hình (Express)</h4>
<pre><code>res.cookie('session', 'value', {
  sameSite: 'lax',  // 'strict' | 'lax' | 'none'
  secure: true,
  httpOnly: true
});
</code></pre>
`,
    role: "senior",
    type: "auth-security",
  },

  {
    question: "Làm sao secure token trong SSR app?",
    answer: `
<h3>Secure token trong SSR applications</h3>

<h4>Rủi ro các cách lưu token</h4>

<h5>1) localStorage</h5>
<ul>
  <li><b>XSS</b>: JS đọc được → chỉ cần XSS là token bay.</li>
  <li>Không có HttpOnly.</li>
</ul>

<h5>2) sessionStorage</h5>
<ul>
  <li>Tab-specific, mất khi đóng tab.</li>
  <li><b>XSS</b>: vẫn đọc được.</li>
</ul>

<h5>3) Cookies</h5>
<ul>
  <li><b>CSRF risk</b>: browser tự gửi cookie.</li>
  <li>Giới hạn size ~4KB.</li>
</ul>

<h4>Pattern an toàn (phổ biến nhất cho SSR)</h4>

<h5>1) Access token ngắn hạn + HttpOnly cookie</h5>
<pre><code>// Server set cookie
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});
</code></pre>

<h5>2) Refresh token rotation (khuyến nghị)</h5>
<pre><code>// Refresh token dài hạn (httpOnly), access token ngắn hạn
res.cookie('refreshToken', refresh, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});
</code></pre>
<ul>
  <li>Access token short-lived (minutes)</li>
  <li>Refresh token rotate + revoke on reuse</li>
</ul>

<h5>3) Token in memory (client) cho một số case</h5>
<pre><code>// Không persist qua reload, giảm risk
const [token, setToken] = useState();
</code></pre>

<h4>SSR considerations (quan trọng)</h4>

<h5>1) Không leak token vào HTML</h5>
<p>Đừng embed token vào page props/HTML output. Token phải nằm trong HttpOnly cookie, server đọc từ req.cookies.</p>

<h5>2) Server-side auth check</h5>
<pre><code>export async function getServerSideProps({ req }) {
  const token = req.cookies.accessToken;
  // validate token server-side
  return { props: {} };
}
</code></pre>

<h5>3) CSRF defense nếu dùng cookie auth</h5>
<ul>
  <li>SameSite + CSRF token/origin check cho endpoints state-changing</li>
  <li>CSP + sanitize để giảm XSS</li>
</ul>
`,
    role: "senior",
    type: "auth-security",
  },

  {
    question: "Role-based vs permission-based auth?",
    answer: `
<h3>Role-based vs Permission-based Authorization</h3>

<h4>Role-Based Access Control (RBAC)</h4>
<p>User được gán <b>role</b> (admin/editor/viewer). Mỗi role có tập quyền cố định.</p>

<h5>Ví dụ</h5>
<pre><code>const user = { role: 'editor' };
if (user.role === 'admin' || user.role === 'editor') {
  // allow edit
}
</code></pre>

<h5>Pros</h5>
<ul>
  <li><b>Đơn giản</b>: dễ hiểu, dễ implement.</li>
  <li><b>Scale theo user</b>: thêm user vào role.</li>
</ul>

<h5>Cons</h5>
<ul>
  <li><b>Rigid</b>: khó customize quyền theo từng user/team.</li>
  <li><b>Role explosion</b>: yêu cầu tăng → role phình ra.</li>
</ul>

<h4>Permission-Based (PBAC/ABAC)</h4>
<p>User có danh sách <b>permissions</b> (post:read, post:create…), hoặc quyết định dựa trên thuộc tính (attribute) + context (resource ownership, time, org…).</p>

<h5>Ví dụ</h5>
<pre><code>const user = { permissions: ['post:read', 'post:create'] };
if (user.permissions.includes('post:delete')) {
  // allow delete
}
</code></pre>

<h5>Pros</h5>
<ul>
  <li><b>Granular</b>: kiểm soát chi tiết.</li>
  <li><b>Dynamic</b>: dễ áp rule theo context (owner, tenant, org…)</li>
</ul>

<h5>Cons</h5>
<ul>
  <li><b>Phức tạp</b>: quản lý permission khó hơn.</li>
  <li><b>Performance/coverage</b>: cần check permission nhiều nơi, phải chuẩn hóa pattern.</li>
</ul>

<h4>Khi nào dùng cái nào?</h4>
<ul>
  <li><b>RBAC</b>: app nhỏ/vừa, requirement đơn giản, ít biến thể.</li>
  <li><b>Permission-based</b>: app lớn, multi-tenant, quyền theo resource/owner/team.</li>
  <li><b>Hybrid</b> (thực tế hay nhất): role → map ra permissions, thêm rule theo context (owner/tenant).</li>
</ul>
`,
    role: "senior",
    type: "auth-security",
  },
]

export default authSecurity
