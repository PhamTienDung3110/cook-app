export const authSecurity = [
  // =================== AUTH & SECURITY ===================
  {
    question: "XSS có bypass React escape không?",
    answer: `
  <h3>XSS và React Escaping</h3>
  <h4>Bảo Vệ Tích Hợp Trong React</h4>
  <p>React tự động escape content trong JSX để ngăn chặn các cuộc tấn công XSS.</p>
  <h5>An Toàn Theo Mặc Định</h5>
  <pre><code>// ✅ Tự động escape
  const content = "&lt;script&gt;alert('xss')&lt;/script&gt;";
  return &lt;div&gt;{content}&lt;/div&gt;; // Render thành text
  </code></pre>

  <h4>Các Pattern Dễ Bị Tấn Công</h4>
  <h5>1. dangerouslySetInnerHTML</h5>
  <pre><code>// ❌ Có thể dẫn đến XSS
  &lt;div dangerouslySetInnerHTML={{ __html: userInput }} /&gt;
  </code></pre>
  <h5>2. Thao Tác DOM Trực Tiếp</h5>
  <pre><code>// ❌ Bypass bảo vệ của React
  document.getElementById('myDiv').innerHTML = userInput;
  </code></pre>
  <h5>3. Links với javascript:</h5>
  <pre><code>// ❌ JavaScript URLs
  &lt;a href={userInput}&gt;Link&lt;/a&gt; // userInput: "javascript:alert(1)"
  </code></pre>

  <h4>Các Cách Bypass</h4>
  <h5>1. React Context</h5>
  <p>Malicious components trong context.</p>
  
  <h5>Technical Implementation</h4>
  <p>This requires careful consideration of performance and edge cases in production environments.</p>
  
  <h5>2. Third-party Libraries</h3>
  <p>Vulnerable jQuery, etc.</p>
  
  <h5>3. Server-side Rendering</h3>
  <p>Unsafe server-rendered content.</p>
  
  <h5>Protection Strategies</h2>
  <ul>
    <li><b>Content Security Policy</b>: CSP headers</li>
    <li><b>Sanitize Libraries</b>: DOMPurify</li>
    <li><b>Input Validation</b>: Server-side</li>
    <li><b>Trusted Types</b>: Browser API</li>
  </ul>
  `,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "CSRF xảy ra trong SPA khi nào?",
    answer: `
  <h3>CSRF trong Single Page Applications</h3>

  <h4>CSRF Là Gì?</h4>
  <p>Cross-Site Request Forgery: Attacker lừa user gửi các request không mong muốn.</p>

  <h4>Lỗ Hổng Bảo Mật Trong SPA</h4>

  <h5>1. API Calls</h5>
  <p>SPA hiện đại gọi API trực tiếp, CSRF có thể xảy ra nếu API không được bảo vệ.</p>

  <h5>2. Cookies Với APIs</h5>
  <pre><code>// Thiết lập dễ bị tấn công
  fetch('/api/user', {
    credentials: 'include' // Gửi cookies
  });
  </code></pre>

  <h5>3. Không Có Server-side Rendering</h5>
  <p>CSRF tokens truyền thống khó implement trong SPA.</p>

  <h4>Các Vector Tấn Công Phổ Biến</h4>
  
  <h5>1. Form Submissions</h3>
  <pre><code>// Hidden form on malicious site
  &lt;form action="https://app.com/api/transfer" method="POST"&gt;
    &lt;input name="to" value="attacker"&gt;
    &lt;input name="amount" value="1000"&gt;
  &lt;/form&gt;
  </code></pre>
  
  <h5>2. Image Tags</h5>
  <pre><code>&lt;img src="https://app.com/api/delete?item=123" /&gt;
  </code></pre>

  <h4>Bảo Vệ SPA</h4>

  <h5>1. SameSite Cookies</h5>
  <pre><code>Set-Cookie: session=abc; SameSite=Strict
  </code></pre>

  <h5>2. CSRF Tokens</h5>
  <pre><code>// Lưu trong httpOnly cookie
  // Bao gồm trong requests
  fetch('/api/data', {
    headers: { 'X-CSRF-Token': token }
  });
  </code></pre>

  <h5>3. Origin Checking</h5>
  <p>Validate request origin headers.</p>
  `,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "SameSite cookie hoạt động thế nào?",
    answer: `
  <h3>SameSite Cookie Attribute</h3>

  <h4>Cơ Bản Về Cookie</h4>
  <p>SameSite kiểm soát việc gửi cookie trong cross-site requests.</p>

  <h4>Các Giá Trị</h4>
  <ul>
    <li><b>Strict</b>: Chỉ cho phép same-site requests</li>
    <li><b>Lax</b>: Cho phép top-level navigation</li>
    <li><b>None</b>: Cho phép cross-site (yêu cầu Secure)</li>
  </ul>
  
  <h5>How It Works</h2>
  
  <h5>Strict</h3>
  <pre><code>// Cookie only sent to same origin
  Set-Cookie: session=abc; SameSite=Strict
  
  // ❌ Blocked: &lt;img src="https://example.com/api"&gt;
  // ✅ Allowed: Direct navigation to example.com
  </code></pre>
  
  <h5>Lax (Default 2026)</h3>
  <pre><code>// Allows top-level navigation
  Set-Cookie: session=abc; SameSite=Lax
  
  // ✅ Allowed: &lt;a href="https://example.com"&gt;
  // ❌ Blocked: &lt;img src="https://example.com/api"&gt;
  </code></pre>
  
  <h5>None</h3>
  <pre><code>// Cross-site allowed (secure only)
  Set-Cookie: session=abc; SameSite=None; Secure
  </code></pre>
  
  <h5>CSRF Protection</h2>
  <ul>
    <li><b>Strict</b>: Maximum security, may break flows</li>
    <li><b>Lax</b>: Balance security & usability</li>
    <li><b>None</b>: Legacy support, requires HTTPS</li>
  </ul>
  
  <h5>Implementation</h2>
  <pre><code>// Express.js
  res.cookie('session', 'value', {
    sameSite: 'strict', // or 'lax' or 'none'
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
  <h5>Secure Tokens trong SSR Applications</h2>
  
  <h5>Token Storage Risks</h2>
  
  <h5>1. localStorage</h3>
  <ul>
    <li><b>XSS Vulnerable</b>: JavaScript access</li>
    <li><b>No HttpOnly</b>: Client-side only</li>
  </ul>
  
  <h5>2. sessionStorage</h3>
  <ul>
    <li><b>Tab-specific</b>: Lost on tab close</li>
    <li><b>XSS Vulnerable</b>: Same as localStorage</li>
  </ul>
  
  <h5>3. Cookies</h3>
  <ul>
    <li><b>CSRF Risk</b>: Automatic sending</li>
    <li><b>Size Limits</b>: 4KB restriction</li>
  </ul>
  
  <h5>Secure Patterns</h2>
  
  <h5>1. HttpOnly Cookies</h3>
  <pre><code>// Server sets httpOnly cookie
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
  </code></pre>
  
  <h5>2. Refresh Token Rotation</h3>
  <pre><code>// Short-lived access token
  // Long-lived refresh token (httpOnly)
  const tokens = generateTokens();
  res.cookie('refreshToken', tokens.refresh, {
    httpOnly: true,
    secure: true
  });
  </code></pre>
  
  <h5>3. Token in Memory</h3>
  <pre><code>// Store in React state/memory
  // Not persisted across refreshes
  const [token, setToken] = useState();
  </code></pre>
  
  <h5>SSR Considerations</h2>
  
  <h5>1. Hydration Safety</h3>
  <pre><code>// Don't expose tokens in SSR
  const isServer = typeof window === 'undefined';
  const token = isServer ? null : localStorage.getItem('token');
  </code></pre>
  
  <h5>2. Server-side Auth</h3>
  <pre><code>// Use cookies for SSR auth
  export async function getServerSideProps({ req }) {
    const token = req.cookies.accessToken;
    // Validate server-side
  }
  </code></pre>
  `,
    role: "senior",
    type: "auth-security",
  },
  {
    question: "Role-based vs permission-based auth?",
    answer: `
  <h5>Role-based vs Permission-based Authorization</h2>
  
  <h5>Role-Based Access Control (RBAC)</h2>
  
  <h5>How It Works</h3>
  <ul>
    <li>Users assigned to roles (admin, editor, viewer)</li>
    <li>Roles have predefined permissions</li>
    <li>Simple to implement and understand</li>
  </ul>
  
  <h5>Example</h3>
  <pre><code>const user = { role: 'editor' };
  if (user.role === 'admin' || user.role === 'editor') {
    // Allow edit
  }
  </code></pre>
  
  <h5>Pros</h3>
  <ul>
    <li><b>Simple</b>: Easy to implement</li>
    <li><b>Scalable</b>: Add users to roles</li>
  </ul>
  
  <h5>Cons</h3>
  <ul>
    <li><b>Rigid</b>: Hard to customize permissions</li>
    <li><b>Role Explosion</b>: Too many roles</li>
  </ul>
  
  <h5>Permission-Based (PBAC/ABAC)</h2>
  
  <h5>How It Works</h3>
  <ul>
    <li>Users have individual permissions</li>
    <li>Context-aware decisions</li>
    <li>Granular control</li>
  </ul>
  
  <h5>Example</h3>
  <pre><code>const user = { permissions: ['post:read', 'post:create'] };
  if (user.permissions.includes('post:delete')) {
    // Allow delete
  }
  </code></pre>
  
  <h5>Pros</h3>
  <ul>
    <li><b>Flexible</b>: Fine-grained control</li>
    <li><b>Dynamic</b>: Context-based decisions</li>
  </ul>
  
  <h5>Cons</h3>
  <ul>
    <li><b>Complex</b>: Harder to manage</li>
    <li><b>Performance</b>: Permission checks everywhere</li>
  </ul>
  
  <h5>When to Use</h2>
  <ul>
    <li><b>RBAC</b>: Small apps, simple requirements</li>
    <li><b>PBAC</b>: Large apps, complex authorization</li>
    <li><b>Hybrid</b>: Best of both worlds</li>
  </ul>
  `,
    role: "senior",
    type: "auth-security",
  },
]