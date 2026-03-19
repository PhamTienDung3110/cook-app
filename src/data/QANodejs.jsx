const QANodejs = [
  {
    id: 1,
    role: "junior",
    type: "basic",
    question: "Node.js là gì? Khác gì so với JavaScript chạy trên trình duyệt?",
    questionENG: "What is Node.js? How is it different from JavaScript running in the browser?",
    answer: `
<div>
  <p><strong>Node.js</strong> là môi trường runtime chạy JavaScript ngoài trình duyệt, dựa trên V8.</p>
  <ul>
    <li><strong>Browser</strong>: có DOM/Web APIs (window, document), tập trung UI.</li>
    <li><strong>Node.js</strong>: có APIs hệ thống như file system, network, process; không có DOM mặc định.</li>
  </ul>
  <p>Node phù hợp xây API/server, CLI, worker…</p>
</div>
    `,
    answerENG: `
<div>
  <p><strong>Node.js</strong> is a JavaScript runtime outside the browser, built on V8.</p>
  <ul>
    <li><strong>Browser</strong>: provides DOM/Web APIs (window, document), UI-centric.</li>
    <li><strong>Node.js</strong>: provides system APIs (fs, net, process) and no DOM by default.</li>
  </ul>
  <p>Node is commonly used for APIs/servers, CLIs, workers, etc.</p>
</div>
    `,
  },
  {
    id: 2,
    role: "junior",
    type: "basic",
    question: "Event loop trong Node.js hoạt động như thế nào (tổng quan)?",
    questionENG: "How does the event loop work in Node.js (high level)?",
    answer: `
<div>
  <p>Node.js chạy JS trên 1 main thread và dựa vào <strong>event loop</strong> để xử lý I/O bất đồng bộ.</p>
  <ul>
    <li>I/O (fs, network, timers) được đăng ký callback.</li>
    <li>Khi tác vụ hoàn thành, callback được đưa vào hàng đợi.</li>
    <li>Event loop lấy callback và chạy khi call stack rỗng.</li>
  </ul>
  <p>Trong Node, Promise microtasks cũng được ưu tiên hơn so với macrotasks.</p>
</div>
    `,
    answerENG: `
<div>
  <p>Node.js runs JS on a single main thread and uses the <strong>event loop</strong> to coordinate async I/O.</p>
  <ul>
    <li>I/O operations register callbacks (fs, network, timers).</li>
    <li>When completed, callbacks are queued.</li>
    <li>The event loop runs queued callbacks when the call stack is empty.</li>
  </ul>
  <p>In Node, Promise microtasks are prioritized over macrotasks.</p>
</div>
    `,
  },
  {
    id: 3,
    role: "junior",
    type: "basic",
    question: "CommonJS và ES Modules trong Node.js khác nhau thế nào?",
    questionENG: "What are the differences between CommonJS and ES Modules in Node.js?",
    answer: `
<div>
  <ul>
    <li><strong>CommonJS</strong>: <code>require()</code>/<code>module.exports</code>, load đồng bộ theo runtime, phổ biến legacy.</li>
    <li><strong>ESM</strong>: <code>import</code>/<code>export</code>, có thể static analysis, hỗ trợ tree-shaking tốt hơn.</li>
  </ul>
  <p>Trong Node, ESM thường bật bằng <code>"type": "module"</code> trong <code>package.json</code> hoặc dùng đuôi <code>.mjs</code>.</p>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>CommonJS</strong>: <code>require()</code>/<code>module.exports</code>, runtime synchronous loading, legacy-friendly.</li>
    <li><strong>ESM</strong>: <code>import</code>/<code>export</code>, supports static analysis and better tree-shaking.</li>
  </ul>
  <p>In Node, ESM is commonly enabled via <code>"type": "module"</code> in <code>package.json</code> or by using <code>.mjs</code>.</p>
</div>
    `,
  },
  {
    id: 4,
    role: "junior",
    type: "basic",
    question: "package.json dùng để làm gì? dependencies vs devDependencies?",
    questionENG: "What is package.json used for? dependencies vs devDependencies?",
    answer: `
<div>
  <p><code>package.json</code> mô tả project Node: scripts, dependencies, metadata, cấu hình module…</p>
  <ul>
    <li><strong>dependencies</strong>: thư viện cần khi chạy production.</li>
    <li><strong>devDependencies</strong>: dùng cho dev/build/test (eslint, vite, jest…).</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><code>package.json</code> describes a Node project: scripts, dependencies, metadata, module config, etc.</p>
  <ul>
    <li><strong>dependencies</strong>: required at runtime in production.</li>
    <li><strong>devDependencies</strong>: used only for development/build/test.</li>
  </ul>
</div>
    `,
  },
  {
    id: 5,
    role: "middle",
    type: "basic",
    question: "Phân biệt process.nextTick, Promise microtask và setImmediate trong Node.js.",
    questionENG: "Differentiate process.nextTick, Promise microtasks, and setImmediate in Node.js.",
    answer: `
<div>
  <ul>
    <li><strong>process.nextTick</strong>: chạy <em>trước</em> microtasks, ưu tiên rất cao; lạm dụng có thể starving I/O.</li>
    <li><strong>Promise microtasks</strong>: chạy sau nextTick, trước timers/I/O callbacks.</li>
    <li><strong>setImmediate</strong>: xếp vào phase check, thường chạy sau I/O callbacks.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>process.nextTick</strong>: runs <em>before</em> microtasks, extremely high priority; can starve I/O if abused.</li>
    <li><strong>Promise microtasks</strong>: run after nextTick, before timers/I/O callbacks.</li>
    <li><strong>setImmediate</strong>: queued in the check phase, often after I/O callbacks.</li>
  </ul>
</div>
    `,
  },
  {
    id: 6,
    role: "junior",
    type: "basic",
    question: "Callback hell là gì? Cách tránh trong Node.js?",
    questionENG: "What is callback hell? How do you avoid it in Node.js?",
    answer: `
<div>
  <p><strong>Callback hell</strong> là việc callback lồng nhau quá sâu làm code khó đọc/khó xử lý lỗi.</p>
  <ul>
    <li>Dùng <strong>Promise</strong> và chain.</li>
    <li>Dùng <strong>async/await</strong> + try/catch.</li>
    <li>Tách hàm nhỏ, dùng library control-flow khi cần.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><strong>Callback hell</strong> happens when deeply nested callbacks make code hard to read and error-prone.</p>
  <ul>
    <li>Use <strong>Promises</strong> and chaining.</li>
    <li>Use <strong>async/await</strong> with try/catch.</li>
    <li>Extract functions and use flow-control utilities when needed.</li>
  </ul>
</div>
    `,
  },
  {
    id: 7,
    role: "junior",
    type: "basic",
    question: "Express middleware là gì? next() dùng để làm gì?",
    questionENG: "What is Express middleware? What is next() used for?",
    answer: `
<div>
  <p><strong>Middleware</strong> là hàm nằm giữa request và response: đọc/sửa req, trả res, hoặc chuyển tiếp.</p>
  <ul>
    <li><code>next()</code> chuyển quyền xử lý sang middleware/handler tiếp theo.</li>
    <li>Nếu trả response (res.send/res.json) thì thường không gọi next.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><strong>Middleware</strong> is a function in the request/response pipeline: it can read/mutate req, send a response, or delegate.</p>
  <ul>
    <li><code>next()</code> passes control to the next middleware/handler.</li>
    <li>If you send a response, you usually do not call next.</li>
  </ul>
</div>
    `,
  },
  {
    id: 8,
    role: "middle",
    type: "basic",
    question: "Error handling trong Express nên làm như thế nào?",
    questionENG: "How should you do error handling in Express?",
    answer: `
<div>
  <ul>
    <li>Dùng <strong>error-handling middleware</strong>: <code>(err, req, res, next)</code>.</li>
    <li>Chuẩn hoá lỗi (status, code, message) và log.</li>
    <li>Với async/await: đảm bảo reject/throw được chuyển vào middleware (wrapper hoặc express-async-errors).</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li>Use an <strong>error-handling middleware</strong>: <code>(err, req, res, next)</code>.</li>
    <li>Normalize errors (status, code, message) and log appropriately.</li>
    <li>With async/await, ensure thrown errors are forwarded (wrapper or express-async-errors).</li>
  </ul>
</div>
    `,
  },
  {
    id: 9,
    role: "middle",
    type: "basic",
    question: "Streams trong Node.js là gì? Khi nào nên dùng stream thay vì đọc toàn bộ file?",
    questionENG: "What are Node.js streams? When to use streams instead of reading the whole file?",
    answer: `
<div>
  <p><strong>Stream</strong> là cơ chế xử lý dữ liệu theo luồng (chunk-by-chunk) thay vì load hết vào memory.</p>
  <ul>
    <li>Hữu ích với file lớn, upload/download, transform (zip, encrypt).</li>
    <li>Giảm memory, tăng throughput nhờ backpressure.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><strong>Streams</strong> process data incrementally (chunk-by-chunk) rather than loading it all into memory.</p>
  <ul>
    <li>Great for large files, uploads/downloads, transforms (zip, encrypt).</li>
    <li>Lower memory usage and better throughput via backpressure.</li>
  </ul>
</div>
    `,
  },
  {
    id: 10,
    role: "middle",
    type: "basic",
    question: "Backpressure trong stream là gì?",
    questionENG: "What is backpressure in streams?",
    answer: `
<div>
  <p><strong>Backpressure</strong> là cơ chế điều tiết khi tốc độ ghi (consumer) chậm hơn tốc độ đọc (producer).</p>
  <p>Node stream sẽ báo hiệu (ví dụ <code>write()</code> trả về false) để tạm dừng đọc và tránh tràn bộ nhớ.</p>
</div>
    `,
    answerENG: `
<div>
  <p><strong>Backpressure</strong> regulates flow when the consumer is slower than the producer.</p>
  <p>Node streams signal this (e.g. <code>write()</code> returns false) so producers can pause to prevent memory bloat.</p>
</div>
    `,
  },
  {
    id: 11,
    role: "middle",
    type: "basic",
    question: "Cluster và worker_threads khác nhau thế nào? Khi nào dùng cái nào?",
    questionENG: "How do cluster and worker_threads differ? When would you use each?",
    answer: `
<div>
  <ul>
    <li><strong>cluster</strong>: chạy nhiều process Node (mỗi process 1 event loop), scale theo CPU core cho HTTP server.</li>
    <li><strong>worker_threads</strong>: chạy nhiều thread trong cùng process, phù hợp CPU-bound tasks (hash, image, compute).</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>cluster</strong>: multiple Node processes (each has its own event loop), good for scaling HTTP across CPU cores.</li>
    <li><strong>worker_threads</strong>: multiple threads within one process, better for CPU-bound tasks (hashing, image processing, heavy compute).</li>
  </ul>
</div>
    `,
  },
  {
    id: 12,
    role: "senior",
    type: "basic",
    question: "Vì sao Node.js có thể xử lý nhiều kết nối đồng thời? Giới hạn nằm ở đâu?",
    questionENG: "Why can Node.js handle many concurrent connections? Where are the limits?",
    answer: `
<div>
  <p>Node tối ưu cho I/O nhờ non-blocking + event loop, nên có thể giữ nhiều socket cùng lúc.</p>
  <ul>
    <li><strong>Giới hạn</strong>: CPU-bound code trên main thread, memory, file descriptors, network throughput, DB pool.</li>
    <li>Cần tối ưu: tránh blocking, dùng stream, cache, rate limit, worker_threads/cluster khi cần.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p>Node is strong at I/O concurrency due to non-blocking I/O + the event loop, enabling many open sockets.</p>
  <ul>
    <li><strong>Limits</strong>: CPU-bound work on the main thread, memory, file descriptors, network bandwidth, DB pools.</li>
    <li>Mitigate by avoiding blocking, using streams, caching, rate limiting, and offloading CPU work.</li>
  </ul>
</div>
    `,
  },
  {
    id: 13,
    role: "middle",
    type: "basic",
    question: "CORS là gì? Xử lý CORS trong API Node/Express như thế nào?",
    questionENG: "What is CORS? How do you handle CORS in Node/Express APIs?",
    answer: `
<div>
  <p><strong>CORS</strong> là cơ chế trình duyệt chặn request cross-origin nếu server không cho phép.</p>
  <ul>
    <li>Server trả header như <code>Access-Control-Allow-Origin</code>, methods, headers.</li>
    <li>Với Express thường dùng middleware (ví dụ package <code>cors</code>) và cấu hình theo origin.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><strong>CORS</strong> is a browser security mechanism that blocks cross-origin requests unless the server allows them.</p>
  <ul>
    <li>Server sets headers like <code>Access-Control-Allow-Origin</code>, methods, headers.</li>
    <li>In Express you typically use a CORS middleware and configure allowed origins.</li>
  </ul>
</div>
    `,
  },
  {
    id: 14,
    role: "junior",
    type: "basic",
    question: "Environment variables là gì? Trong Node.js đọc biến môi trường như thế nào?",
    questionENG: "What are environment variables? How do you read them in Node.js?",
    answer: `
<div>
  <p>Biến môi trường dùng để cấu hình theo môi trường (dev/staging/prod), tránh hard-code secrets.</p>
  <p>Trong Node: đọc qua <code>process.env.NAME</code>. Thường dùng <code>dotenv</code> để load từ file <code>.env</code> (dev).</p>
</div>
    `,
    answerENG: `
<div>
  <p>Environment variables store configuration per environment (dev/staging/prod) and avoid hard-coded secrets.</p>
  <p>In Node: read via <code>process.env.NAME</code>. Commonly use <code>dotenv</code> to load a local <code>.env</code> in development.</p>
</div>
    `,
  },
  {
    id: 15,
    role: "middle",
    type: "basic",
    question: "JWT authentication flow trong Node/Express (tổng quan) như thế nào?",
    questionENG: "What is a typical JWT authentication flow in Node/Express (high level)?",
    answer: `
<div>
  <ul>
    <li>User login → server verify password → sign JWT (access token).</li>
    <li>Client gửi token trong <code>Authorization: Bearer ...</code>.</li>
    <li>Middleware verify token → attach user info → handler xử lý.</li>
  </ul>
  <p>Nên đặt expiry, refresh token (tuỳ kiến trúc), và revoke strategy khi cần.</p>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li>User logs in → server verifies password → signs a JWT (access token).</li>
    <li>Client sends the token in <code>Authorization: Bearer ...</code>.</li>
    <li>Middleware verifies the token → attaches user context → route handler runs.</li>
  </ul>
  <p>Use expirations, refresh tokens (if needed), and a revocation strategy when required.</p>
</div>
    `,
  },
  {
    id: 16,
    role: "senior",
    type: "basic",
    question: "Những rủi ro bảo mật phổ biến khi viết API Node.js là gì? (OWASP top items)",
    questionENG: "What are common security risks when writing Node.js APIs? (OWASP-style)",
    answer: `
<div>
  <ul>
    <li><strong>Injection</strong>: SQL/NoSQL injection nếu không validate/sanitize input.</li>
    <li><strong>Auth/Access control</strong>: thiếu kiểm tra quyền, token handling sai.</li>
    <li><strong>SSRF</strong>: fetch URL theo input user.</li>
    <li><strong>Rate limit</strong>: brute force, DDoS nhỏ.</li>
    <li><strong>Secrets</strong>: lộ env, log nhạy cảm.</li>
    <li><strong>Dependencies</strong>: package có CVE.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>Injection</strong>: SQL/NoSQL injection without input validation/sanitization.</li>
    <li><strong>Auth/Access control</strong>: missing authorization checks, bad token handling.</li>
    <li><strong>SSRF</strong>: server-side fetching user-controlled URLs.</li>
    <li><strong>Rate limiting</strong>: brute force / small DDoS.</li>
    <li><strong>Secrets</strong>: leaking env vars or sensitive logs.</li>
    <li><strong>Dependencies</strong>: vulnerable packages.</li>
  </ul>
</div>
    `,
  },
  {
    id: 17,
    role: "middle",
    type: "basic",
    question: "Bạn sẽ cấu trúc project Node.js theo tầng (controller/service/repo) như thế nào?",
    questionENG: "How would you structure a Node.js project into layers (controller/service/repo)?",
    answer: `
<div>
  <ul>
    <li><strong>routes</strong>: mapping URL → controller.</li>
    <li><strong>controllers</strong>: parse input, call service, format response.</li>
    <li><strong>services</strong>: business logic, orchestration, transactions.</li>
    <li><strong>repositories/dao</strong>: data access (DB queries).</li>
    <li><strong>middlewares</strong>: auth, validation, logging, rate limit.</li>
  </ul>
  <p>Mục tiêu là tách trách nhiệm, test dễ, thay DB dễ.</p>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>routes</strong>: URL → controller mapping.</li>
    <li><strong>controllers</strong>: parse input, call service, shape responses.</li>
    <li><strong>services</strong>: business logic and orchestration.</li>
    <li><strong>repositories/dao</strong>: data access (DB queries).</li>
    <li><strong>middlewares</strong>: auth, validation, logging, rate limiting.</li>
  </ul>
  <p>This separation improves testability and maintainability.</p>
</div>
    `,
  },
  {
    id: 18,
    role: "junior",
    type: "basic",
    question: "Nodemon dùng để làm gì? Vì sao cần trong dev?",
    questionENG: "What is nodemon used for? Why is it useful in development?",
    answer: `
<div>
  <p><strong>nodemon</strong> tự restart process Node khi file thay đổi.</p>
  <p>Giúp dev nhanh hơn, không phải tắt/mở server thủ công.</p>
</div>
    `,
    answerENG: `
<div>
  <p><strong>nodemon</strong> automatically restarts the Node process when files change.</p>
  <p>It speeds up development by removing manual restarts.</p>
</div>
    `,
  },
  {
    id: 19,
    role: "junior",
    type: "basic",
    question: "Phân biệt fs.readFile và fs.createReadStream. Khi nào dùng cái nào?",
    questionENG: "Differentiate fs.readFile and fs.createReadStream. When would you use each?",
    answer: `
<div>
  <ul>
    <li><code>fs.readFile</code>: đọc toàn bộ file vào memory rồi mới callback/resolve.</li>
    <li><code>fs.createReadStream</code>: đọc theo từng chunk, phù hợp file lớn và pipeline.</li>
  </ul>
  <p>File nhỏ/đơn giản → <code>readFile</code>. File lớn/streaming → <code>createReadStream</code>.</p>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><code>fs.readFile</code>: reads the entire file into memory before resolving.</li>
    <li><code>fs.createReadStream</code>: reads chunk-by-chunk, good for large files and pipelines.</li>
  </ul>
  <p>Small/simple files → <code>readFile</code>. Large/streaming → <code>createReadStream</code>.</p>
</div>
    `,
  },
  {
    id: 20,
    role: "junior",
    type: "basic",
    question: "HTTP status code 200/201/204/400/401/403/404/500 nghĩa là gì?",
    questionENG: "What do HTTP status codes 200/201/204/400/401/403/404/500 mean?",
    answer: `
<div>
  <ul>
    <li><strong>200</strong>: OK (thành công)</li>
    <li><strong>201</strong>: Created (tạo mới thành công)</li>
    <li><strong>204</strong>: No Content (thành công nhưng không trả body)</li>
    <li><strong>400</strong>: Bad Request (request sai/validate fail)</li>
    <li><strong>401</strong>: Unauthorized (thiếu/không hợp lệ auth)</li>
    <li><strong>403</strong>: Forbidden (có auth nhưng không đủ quyền)</li>
    <li><strong>404</strong>: Not Found</li>
    <li><strong>500</strong>: Internal Server Error</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>200</strong>: OK</li>
    <li><strong>201</strong>: Created</li>
    <li><strong>204</strong>: No Content</li>
    <li><strong>400</strong>: Bad Request</li>
    <li><strong>401</strong>: Unauthorized</li>
    <li><strong>403</strong>: Forbidden</li>
    <li><strong>404</strong>: Not Found</li>
    <li><strong>500</strong>: Internal Server Error</li>
  </ul>
</div>
    `,
  },
  {
    id: 21,
    role: "junior",
    type: "basic",
    question: "npm scripts là gì? Bạn hay dùng scripts nào cho dev/build/start?",
    questionENG: "What are npm scripts? Which scripts do you commonly use for dev/build/start?",
    answer: `
<div>
  <p><strong>npm scripts</strong> là các lệnh tuỳ biến khai báo trong <code>package.json</code> để chạy tooling.</p>
  <ul>
    <li><code>dev</code>: chạy local server (hot reload)</li>
    <li><code>build</code>: build production</li>
    <li><code>start</code>: chạy production server</li>
    <li><code>test</code>/<code>lint</code>: kiểm thử/format</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><strong>npm scripts</strong> are custom commands defined in <code>package.json</code> to run tooling.</p>
  <ul>
    <li><code>dev</code>: run a local dev server (HMR)</li>
    <li><code>build</code>: produce a production build</li>
    <li><code>start</code>: run the production server</li>
    <li><code>test</code>/<code>lint</code>: testing/formatting</li>
  </ul>
</div>
    `,
  },
  {
    id: 22,
    role: "middle",
    type: "basic",
    question: "Connection pooling là gì? Vì sao cần pool khi dùng database trong Node?",
    questionENG: "What is connection pooling? Why do you need a pool when using a database in Node?",
    answer: `
<div>
  <p><strong>Connection pool</strong> là tập kết nối DB được tái sử dụng thay vì mở/đóng liên tục.</p>
  <ul>
    <li>Giảm latency và overhead khi tạo connection.</li>
    <li>Giới hạn số kết nối đồng thời, tránh “bắn” quá nhiều vào DB.</li>
    <li>Dễ quản lý timeout/retry.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p>A <strong>connection pool</strong> reuses a set of DB connections instead of constantly creating/closing them.</p>
  <ul>
    <li>Reduces latency and connection overhead.</li>
    <li>Limits concurrency to protect the DB.</li>
    <li>Makes timeouts/retries easier to manage.</li>
  </ul>
</div>
    `,
  },
  {
    id: 23,
    role: "middle",
    type: "basic",
    question: "Rate limiting và pagination nên thiết kế ra sao cho API Node/Express?",
    questionENG: "How would you design rate limiting and pagination for a Node/Express API?",
    answer: `
<div>
  <ul>
    <li><strong>Rate limiting</strong>: giới hạn request theo IP/user/token trong 1 khoảng thời gian; trả <code>429</code> khi vượt.</li>
    <li><strong>Pagination</strong>: dùng <code>limit</code> + <code>cursor</code> (khuyến nghị) hoặc <code>page</code> + <code>pageSize</code>.</li>
  </ul>
  <p>Cursor pagination ổn định hơn khi dữ liệu thay đổi liên tục.</p>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li><strong>Rate limiting</strong>: enforce request quotas per IP/user/token over a time window; return <code>429</code> when exceeded.</li>
    <li><strong>Pagination</strong>: use <code>limit</code> + <code>cursor</code> (recommended) or <code>page</code> + <code>pageSize</code>.</li>
  </ul>
  <p>Cursor pagination is more stable under frequent inserts/updates.</p>
</div>
    `,
  },
  {
    id: 24,
    role: "middle",
    type: "basic",
    question: "Logging và tracing trong Node nên làm thế nào để debug production hiệu quả?",
    questionENG: "How should you do logging and tracing in Node to debug production effectively?",
    answer: `
<div>
  <ul>
    <li>Log dạng <strong>structured</strong> (JSON) thay vì console text.</li>
    <li>Gắn <strong>requestId/correlationId</strong> để trace theo request.</li>
    <li>Phân cấp log: info/warn/error, tránh log secrets/PII.</li>
    <li>Kết hợp APM/tracing (OpenTelemetry) khi cần.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li>Use <strong>structured</strong> logs (JSON) instead of plain text.</li>
    <li>Attach a <strong>requestId/correlationId</strong> to trace a request end-to-end.</li>
    <li>Use log levels and avoid secrets/PII.</li>
    <li>Add APM/tracing (OpenTelemetry) when needed.</li>
  </ul>
</div>
    `,
  },
  {
    id: 25,
    role: "senior",
    type: "basic",
    question: "Libuv trong Node.js là gì và nó liên quan gì đến non-blocking I/O?",
    questionENG: "What is libuv in Node.js and how does it relate to non-blocking I/O?",
    answer: `
<div>
  <p><strong>libuv</strong> là thư viện C cung cấp event loop, thread pool và abstraction I/O cho Node.</p>
  <ul>
    <li>Nhiều I/O (network) dùng OS async APIs.</li>
    <li>Một số tác vụ (DNS, fs tuỳ OS) dùng <strong>libuv thread pool</strong> để tránh block main thread.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <p><strong>libuv</strong> is a C library that provides the event loop, thread pool, and cross-platform I/O abstractions for Node.</p>
  <ul>
    <li>Many I/O operations (network) use OS async APIs.</li>
    <li>Some tasks (DNS, fs depending on OS) use the <strong>libuv thread pool</strong> to avoid blocking the main thread.</li>
  </ul>
</div>
    `,
  },
  {
    id: 26,
    role: "senior",
    type: "basic",
    question: "V8 heap và memory leak trong Node: bạn debug/triage như thế nào?",
    questionENG: "V8 heap and memory leaks in Node: how do you debug/triage them?",
    answer: `
<div>
  <ul>
    <li>Quan sát RSS/heap qua metrics; tái hiện leak dưới load.</li>
    <li>Chụp <strong>heap snapshot</strong> (Chrome DevTools/inspector) so sánh diff theo thời gian.</li>
    <li>Kiểm tra các nguồn leak thường gặp: cache không giới hạn, listener không remove, closure giữ reference, global arrays/maps.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li>Watch RSS/heap metrics and reproduce under load.</li>
    <li>Take <strong>heap snapshots</strong> (DevTools/inspector) and compare diffs over time.</li>
    <li>Check common leak sources: unbounded caches, unreleased listeners, closures holding references, global arrays/maps.</li>
  </ul>
</div>
    `,
  },
  {
    id: 27,
    role: "senior",
    type: "basic",
    question: "Thiết kế graceful shutdown cho Node server (HTTP + DB) như thế nào?",
    questionENG: "How do you design graceful shutdown for a Node server (HTTP + DB)?",
    answer: `
<div>
  <ul>
    <li>Bắt tín hiệu <code>SIGTERM</code>/<code>SIGINT</code>.</li>
    <li>Stop nhận request mới (close server), chờ request đang xử lý xong với timeout.</li>
    <li>Đóng DB connections/pools và worker/queue.</li>
    <li>Trả health/readiness phù hợp để load balancer ngừng route.</li>
  </ul>
</div>
    `,
    answerENG: `
<div>
  <ul>
    <li>Handle <code>SIGTERM</code>/<code>SIGINT</code>.</li>
    <li>Stop accepting new requests (close server) and wait for in-flight requests with a timeout.</li>
    <li>Close DB pools and background workers/queues.</li>
    <li>Expose proper health/readiness so the load balancer stops routing traffic.</li>
  </ul>
</div>
    `,
  },
];

const stripHtml = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (text, maxLen) => {
  const t = (text || "").trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen) + "...";
};

const extractFirstParagraph = (answer, maxLen = 220) => {
  const pMatch = answer.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const raw = pMatch ? pMatch[1] : answer;
  return truncateText(stripHtml(raw), maxLen);
};

const extractFirstListItems = (answer, maxItems = 5) => {
  const listMatch = answer.match(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/i);
  if (!listMatch) return [];
  const listContent = listMatch[2];
  const liMatches = [...listContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return liMatches
    .slice(0, maxItems)
    .map((m) => truncateText(stripHtml(m[1]), 160))
    .filter(Boolean);
};

const extractFirstCodeBlock = (answer) => {
  const preMatch = answer.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  const codeMatch = answer.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
  const raw = preMatch ? preMatch[1] : codeMatch ? codeMatch[1] : "";
  return truncateText(stripHtml(raw).replace(/\n/g, " "), 180);
};

const hasInterviewStructureVN = (answer) =>
  /<h2>\s*Giải thích\s*<\/h2>/i.test(answer) &&
  /<h2>\s*Trả lời phỏng vấn\s*<\/h2>/i.test(answer);

const hasInterviewStructureEN = (answer) =>
  /<h2>\s*Explanation\s*<\/h2>/i.test(answer) &&
  /<h2>\s*Interview Answer\s*<\/h2>/i.test(answer);

const buildInterviewAnswerVN = (answer) => {
  const definition = extractFirstParagraph(answer);
  const items = extractFirstListItems(answer, 6);
  const code = extractFirstCodeBlock(answer);

  const parts = [];
  if (definition) parts.push(`<p><strong>Trả lời:</strong> ${definition}</p>`);

  if (items.length > 0) {
    parts.push(`<ul>${items.map((it) => `<li>${it}</li>`).join("")}</ul>`);
  }

  if (code) {
    parts.push(`<p><strong>Ví dụ:</strong></p><p><code>${code}</code></p>`);
  }

  if (parts.length === 0) {
    const fallback = truncateText(stripHtml(answer), 320);
    parts.push(`<p>${fallback}</p>`);
  }

  return parts.join("\n");
};

const buildInterviewAnswerEN = (answer) => {
  const definition = extractFirstParagraph(answer);
  const items = extractFirstListItems(answer, 6);
  const code = extractFirstCodeBlock(answer);

  const parts = [];
  if (definition) parts.push(`<p><strong>Interview answer:</strong> ${definition}</p>`);

  if (items.length > 0) {
    parts.push(`<ul>${items.map((it) => `<li>${it}</li>`).join("")}</ul>`);
  }

  if (code) {
    parts.push(`<p><strong>Example:</strong></p><p><code>${code}</code></p>`);
  }

  if (parts.length === 0) {
    const fallback = truncateText(stripHtml(answer), 320);
    parts.push(`<p>${fallback}</p>`);
  }

  return parts.join("\n");
};

const formatAnswerVN = (answer) => {
  if (hasInterviewStructureVN(answer)) return answer;
  const interview = buildInterviewAnswerVN(answer);
  return `
<h2>Giải thích</h2>
${answer}
<h2>Trả lời phỏng vấn</h2>
${interview}
`;
};

const formatAnswerEN = (answer) => {
  if (hasInterviewStructureEN(answer)) return answer;
  const interview = buildInterviewAnswerEN(answer);
  return `
<h2>Explanation</h2>
${answer}
<h2>Interview Answer</h2>
${interview}
`;
};

const QANodejsFormatted = QANodejs.map((q) => ({
  ...q,
  answer: formatAnswerVN(q.answer),
  answerENG: formatAnswerEN(q.answerENG),
}));

export default QANodejsFormatted;

