// authSecurity.js
// Authentication & Security Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const authSecurity = [
  {
    question: "JWT authentication trong React?",
    answer: `
<h3>JWT Authentication in React</h3>

<h4>1) Basic JWT flow</h4>
<pre><code>// 1. User logs in
const login = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const { token } = await response.json();

  // 2. Store token
  localStorage.setItem('token', token);

  // 3. Include in requests
  const user = await fetch('/api/user', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
};
</code></pre>

<h4>2) Axios interceptor for JWT</h4>
<pre><code>import axios from 'axios';

// Request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor - handle token expiry
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
</code></pre>

<h4>3) Protected routes</h4>
<pre><code>import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Check if token exists and is valid
  if (!token) {
    return &lt;Navigate to="/login" replace /&gt;;
  }

  // Optional: verify token with server
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      return &lt;Navigate to="/login" replace /&gt;;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return &lt;Navigate to="/login" replace /&gt;;
  }

  return children;
}

// Usage
&lt;Route path="/dashboard" element={
  &lt;PrivateRoute&gt;
    &lt;Dashboard /&gt;
  &lt;/PrivateRoute&gt;
} /&gt;
</code></pre>

<h4>4) Token refresh</h4>
<pre><code>let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = \`Bearer \${token}\`;
          return axios(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios.post('/api/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken')
        }).then(response => {
          const { token } = response.data;
          localStorage.setItem('token', token);
          axios.defaults.headers.common.Authorization = \`Bearer \${token}\`;
          processQueue(null, token);
          resolve(axios(originalRequest));
        }).catch(err => {
          processQueue(err, null);
          localStorage.removeItem('token');
          window.location.href = '/login';
          reject(err);
        }).finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  }
);
</code></pre>

<h4>5) Context for auth state</h4>
<pre><code>import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with server
      fetch('/api/verify', {
        headers: { Authorization: \`Bearer \${token}\` }
      })
        .then(res => res.json())
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('/api/login', credentials);
    const { token, user: userData } = response.data;

    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    &lt;AuthContext.Provider value={{
      user,
      login,
      logout,
      loading
    }}&gt;
      {children}
    &lt;/AuthContext.Provider&gt;
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
</code></pre>
`,
    role: "middle",
    type: "auth-security",
  },

  {
    question: "XSS attacks và cách phòng chống?",
    answer: `
<h3>XSS (Cross-Site Scripting) Prevention</h3>

<h4>1) What is XSS?</h4>
<p>XSS occurs when an attacker injects malicious scripts into web pages viewed by other users.</p>

<h4>2) Types of XSS</h4>

<h5>Reflected XSS</h5>
<pre><code>// Malicious URL
http://example.com/search?q=&lt;script&gt;alert('XSS')&lt;/script&gt;

// If server reflects the query without escaping
echo "Search results for: " . $_GET['q'];
</code></pre>

<h5>Stored XSS</h5>
<pre><code>// User submits malicious comment
&lt;script&gt;stealCookies()&lt;/script&gt;

// Stored in database, displayed to all users
</code></pre>

<h5>DOM-based XSS</h5>
<pre><code>// Client-side code vulnerable
const name = location.hash.substring(1); // #&lt;script&gt;...
document.getElementById('welcome').innerHTML = \`Hello \${name}\`;
</code></pre>

<h4>3) React XSS Prevention</h4>

<h5>Automatic escaping</h5>
<pre><code>// React automatically escapes dangerous characters
const userInput = "&lt;script&gt;alert('xss')&lt;/script&gt;";
return &lt;div&gt;{userInput}&lt;/div&gt;;
// Renders: &lt;script&gt;alert('xss')&lt;/script&gt;
</code></pre>

<h5>Dangerously set HTML</h5>
<pre><code>// Only use when you trust the source
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(dangerousHTML);
return &lt;div dangerouslySetInnerHTML={{ __html: cleanHTML }} /&gt;;
</code></pre>

<h4>4) Best practices</h4>

<h5>Input validation</h5>
<pre><code>// Client-side validation (not sufficient alone)
const validateInput = (input) => {
  const dangerous = /(&lt;script|javascript:|on\w+=)/i;
  if (dangerous.test(input)) {
    throw new Error('Invalid input');
  }
  return input;
};
</code></pre>

<h5>Content Security Policy (CSP)</h5>
<pre><code>// Server sends CSP header
Content-Security-Policy: default-src 'self';
  script-src 'self' trusted.com;
  style-src 'self' fonts.googleapis.com;
  img-src 'self' data: https:;
</code></pre>

<h5>Sanitize user input</h5>
<pre><code>import DOMPurify from 'dompurify';

// For HTML content
const cleanHTML = DOMPurify.sanitize(userInput);

// For text content - escape HTML
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};
</code></pre>

<h4>5) Common vulnerabilities</h4>

<h5>dangerouslySetInnerHTML without sanitization</h5>
<pre><code>// ❌ Vulnerable
&lt;div dangerouslySetInnerHTML={{ __html: userComment }} /&gt;

// ✅ Safe
&lt;div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userComment)
}} /&gt;
</code></pre>

<h5>eval() and similar functions</h5>
<pre><code>// ❌ Never use eval
const result = eval(userInput);

// ✅ Use JSON.parse for trusted data
const data = JSON.parse(trustedString);
</code></pre>

<h5>URL parameters in client-side routing</h5>
<pre><code>// Be careful with URL fragments
const hash = window.location.hash;
// Validate before using in DOM
</code></pre>
`,
    role: "middle",
    type: "auth-security",
  },

  {
    question: "CSRF attacks và cách phòng chống?",
    answer: `
<h3>CSRF (Cross-Site Request Forgery) Prevention</h3>

<h4>1) What is CSRF?</h4>
<p>CSRF tricks a user into performing unwanted actions on a web application they're authenticated with.</p>

<h4>2) How CSRF works</h4>
<pre><code>&lt;!-- Malicious site --&gt;
&lt;img src="http://bank.com/transfer?to=attacker&amount=1000" style="display:none"&gt;

&lt;!-- When user visits malicious site while logged into bank.com --&gt;
&lt;!-- Browser automatically sends cookies, making the transfer --&gt;
</code></pre>

<h4>3) CSRF Prevention Methods</h4>

<h5>SameSite cookies</h5>
<pre><code>// Server sets cookie with SameSite attribute
Set-Cookie: session=abc123; SameSite=Strict; Secure

// Options: Strict, Lax, None (with Secure)
</code></pre>

<h5>CSRF tokens</h5>
<pre><code>// 1. Server generates unique token per session/user
const csrfToken = crypto.randomBytes(32).toString('hex');

// 2. Include in forms
&lt;form action="/transfer" method="POST"&gt;
  &lt;input type="hidden" name="_csrf" value="\${csrfToken}" /&gt;
  &lt;!-- other fields --&gt;
&lt;/form&gt;

// 3. Server validates token
app.post('/transfer', (req, res) => {
  if (req.body._csrf !== req.session.csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  // Process transfer
});
</code></pre>

<h5>Double submit cookie</h5>
<pre><code>// 1. Set random value in both cookie and form
const csrfToken = crypto.randomBytes(32).toString('hex');
res.cookie('csrfToken', csrfToken, { httpOnly: true });

// 2. Include in form
&lt;input type="hidden" name="csrfToken" value="\${csrfToken}" /&gt;

// 3. Server compares cookie and form value
if (req.cookies.csrfToken !== req.body.csrfToken) {
  return res.status(403).send('CSRF detected');
}
</code></pre>

<h4>4) React CSRF Protection</h4>

<h5>Include CSRF token in requests</h5>
<pre><code>// Get CSRF token from meta tag or cookie
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

// Include in fetch requests
fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});
</code></pre>

<h5>CSRF token in forms</h5>
<pre><code>function PaymentForm() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  return (
    &lt;form action="/payment" method="POST"&gt;
      &lt;input type="hidden" name="_csrf" value={csrfToken} /&gt;
      &lt;!-- payment form fields --&gt;
    &lt;/form&gt;
  );
}
</code></pre>

<h4>5) Additional protections</h4>

<h5>Check Origin/Referer headers</h5>
<pre><code>// Server middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // Allow only same origin
  if (origin && origin !== 'https://yourdomain.com') {
    return res.status(403).send('Invalid origin');
  }

  next();
});
</code></pre>

<h5>Use POST for state-changing operations</h5>
<pre><code>// Instead of GET for actions
GET /transfer?to=attacker&amount=1000  // Vulnerable

POST /transfer  // Better
Content-Type: application/json
{ "to": "legitimate", "amount": 100 }
</code></pre>

<h4>6) CSRF vs XSS</h4>
<table>
  <tr>
    <th>CSRF</th>
    <th>XSS</th>
  </tr>
  <tr>
    <td>Attacker tricks user into making request</td>
    <td>Attacker injects malicious script</td>
  </tr>
  <tr>
    <td>User's browser sends legitimate request</td>
    <td>Script runs in user's browser</td>
  </tr>
  <tr>
    <td>Uses user's authentication</td>
    <td>Steals user's data/session</td>
  </tr>
</table>
`,
    role: "middle",
    type: "auth-security",
  },

  {
    question: "Role-based access control (RBAC)?",
    answer: `
<h3>Role-Based Access Control (RBAC)</h3>

<h4>1) RBAC Components</h4>

<h5>Users</h5>
<p>Individual users in the system</p>

<h5>Roles</h5>
<p>Named job functions (admin, editor, viewer)</p>

<h5>Permissions</h5>
<p>Actions allowed on resources (create, read, update, delete)</p>

<h5>Role-Permission Mapping</h5>
<pre><code>const rolePermissions = {
  admin: ['user:create', 'user:read', 'user:update', 'user:delete'],
  editor: ['post:create', 'post:read', 'post:update'],
  viewer: ['post:read']
};
</code></pre>

<h4>2) Implementation in React</h4>

<h5>Permission checking hook</h5>
<pre><code>import { useContext } from 'react';

const PermissionContext = createContext();

function usePermissions() {
  const { user } = useContext(PermissionContext);

  const hasPermission = (permission) => {
    if (!user || !user.roles) return false;

    return user.roles.some(role =>
      rolePermissions[role]?.includes(permission)
    );
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  return { hasPermission, hasAnyPermission, hasAllPermissions };
}
</code></pre>

<h5>Protected components</h5>
<pre><code>function PermissionGuard({ permission, fallback = null, children }) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return children;
}

// Usage
&lt;PermissionGuard permission="post:create" fallback={&lt;div&gt;Access denied&lt;/div&gt;}&gt;
  &lt;CreatePostForm /&gt;
&lt;/PermissionGuard&gt;
</code></pre>

<h5>Conditional rendering</h5>
<pre><code>function PostActions({ post }) {
  const { hasPermission } = usePermissions();

  return (
    &lt;div&gt;
      {hasPermission('post:read') && (
        &lt;button&gt;View&lt;/button&gt;
      )}
      {hasPermission('post:update') && (
        &lt;button&gt;Edit&lt;/button&gt;
      )}
      {hasPermission('post:delete') && (
        &lt;button&gt;Delete&lt;/button&gt;
      )}
    &lt;/div&gt;
  );
}
</code></pre>

<h4>3) Route protection</h4>
<pre><code>import { Navigate } from 'react-router-dom';

function RoleRoute({ roles, children }) {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();

  // Check if user has any of the required roles
  const hasAccess = roles.some(role => user?.roles?.includes(role));

  if (!hasAccess) {
    return &lt;Navigate to="/unauthorized" replace /&gt;;
  }

  return children;
}

// Usage
&lt;Route path="/admin" element={
  &lt;RoleRoute roles={['admin']}&gt;
    &lt;AdminPanel /&gt;
  &lt;/RoleRoute&gt;
} /&gt;
</code></pre>

<h4>4) Dynamic permissions</h4>

<h5>Resource ownership</h5>
<pre><code>function canEditPost(user, post) {
  // Admin can edit any post
  if (user.roles.includes('admin')) return true;

  // Author can edit their own posts
  if (user.roles.includes('author') && post.authorId === user.id) return true;

  return false;
}

// Usage
const { data: post } = useQuery(['post', id], fetchPost);
const canEdit = canEditPost(user, post);
</code></pre>

<h4>5) Common patterns</h4>

<h5>Permission matrix</h5>
<pre><code>const permissions = {
  'user:profile': {
    admin: true,
    user: (user, targetUser) => user.id === targetUser.id
  },
  'post:publish': {
    admin: true,
    editor: true,
    author: (user, post) => post.authorId === user.id
  }
};
</code></pre>

<h5>UI state based on permissions</h5>
<pre><code>function usePermissionState(permission, resource) {
  const { hasPermission } = usePermissions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    if (!hasPermission(permission)) {
      throw new Error('Permission denied');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await action(...args);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
</code></pre>
`,
    role: "middle",
    type: "auth-security",
  },

  {
    question: "Secure data storage trong React?",
    answer: `
<h3>Secure Data Storage in React</h3>

<h4>1) Client-side storage options</h4>

<h5>LocalStorage</h5>
<pre><code>// Basic usage
localStorage.setItem('user', JSON.stringify(userData));
const user = JSON.parse(localStorage.getItem('user'));

// Limitations:
- Synchronous (blocks main thread)
- Plain text storage
- No expiration
- Vulnerable to XSS
</code></pre>

<h5>SessionStorage</h5>
<pre><code>// Similar to localStorage but cleared on tab close
sessionStorage.setItem('tempData', JSON.stringify(data));

// Good for: Temporary session data, form drafts
</code></pre>

<h5>Secure alternatives</h5>
<ul>
  <li><b>httpOnly cookies</b> for server-set data</li>
  <li><b>IndexedDB</b> for large data sets</li>
  <li><b>Service Worker Cache</b> for offline data</li>
</ul>

<h4>2) Token storage best practices</h4>

<h5>JWT in httpOnly cookies</h5>
<pre><code>// Server sets httpOnly cookie
res.cookie('authToken', token, {
  httpOnly: true,    // Not accessible via JavaScript
  secure: true,      // HTTPS only
  sameSite: 'strict' // CSRF protection
});

// Client includes automatically in requests
// No manual token handling needed
</code></pre>

<h5>Memory-only storage</h5>
<pre><code>// For sensitive data during session
let sensitiveData = null;

function login(credentials) {
  // Authenticate and store in memory
  sensitiveData = await authenticate(credentials);

  // Clear on logout or page unload
  window.addEventListener('beforeunload', () => {
    sensitiveData = null;
  });
}
</code></pre>

<h4>3) Encryption for client storage</h4>

<h5>Basic encryption</h5>
<pre><code>import CryptoJS from 'crypto-js';

// Encrypt before storing
const encrypted = CryptoJS.AES.encrypt(
  JSON.stringify(sensitiveData),
  'secret-key'
).toString();

localStorage.setItem('data', encrypted);

// Decrypt when retrieving
const decrypted = CryptoJS.AES.decrypt(
  localStorage.getItem('data'),
  'secret-key'
).toString(CryptoJS.enc.Utf8);

const data = JSON.parse(decrypted);
</code></pre>

<h4>4) Data validation and sanitization</h4>

<h5>Input validation</h5>
<pre><code>import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required().min(2).max(50),
  email: yup.string().email().required(),
  age: yup.number().min(18).max(120)
});

function saveUserData(userData) {
  try {
    const validatedData = await userSchema.validate(userData);
    localStorage.setItem('user', JSON.stringify(validatedData));
  } catch (error) {
    console.error('Invalid user data:', error);
  }
}
</code></pre>

<h4>5) Storage event handling</h4>

<h5>Cross-tab synchronization</h5>
<pre><code>// Listen for storage changes from other tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'user') {
    // Update local state when user data changes in another tab
    const newUser = JSON.parse(event.newValue);
    setUser(newUser);
  }
});
</code></pre>

<h4>6) Security checklist</h4>

<h5>Don't store sensitive data in localStorage</h5>
<ul>
  <li>Passwords</li>
  <li>Credit card numbers</li>
  <li>API keys</li>
  <li>Personal identifiable information (PII)</li>
</ul>

<h5>Implement data expiration</h5>
<pre><code>function setWithExpiry(key, value, ttl) {
  const item = {
    value: value,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
</code></pre>

<h5>Clear sensitive data on logout</h5>
<pre><code>function logout() {
  // Clear all auth-related data
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  sessionStorage.clear();

  // Clear any cached sensitive data
  // Redirect to login
}
</code></pre>
`,
    role: "middle",
    type: "auth-security",
  },
]

export default authSecurity
