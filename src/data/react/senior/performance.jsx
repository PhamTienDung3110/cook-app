// performance.ts
// Performance & Optimization Q&A (Senior)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const performance = [
  // =================== PERFORMANCE & TỐI ƯU ===================
  {
    question: "Đo performance React bằng cách nào?",
    answer: `
<h3>Đo Performance React Apps</h3>

<h4>1) React-level: biết component nào render chậm / render thừa</h4>

<h5>1.1 React DevTools Profiler</h5>
<ul>
  <li>Record user interaction → xem <b>commit</b> và component nào tốn thời gian</li>
  <li>Flamegraph / Ranked view: biết <b>component chậm nhất</b>, commit nào nặng nhất</li>
  <li>Xem “Why did this render?” để biết render vì <b>props/state/context</b> đổi</li>
  <li>So sánh commits trước/sau khi tối ưu để tránh “tối ưu cảm giác”</li>
</ul>

<h5>1.2 React Profiler API</h5>
<pre><code>&lt;Profiler
  id="App"
  onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) =&gt; {
    console.log(id, { phase, actualDuration, baseDuration, startTime, commitTime });
  }}
&gt;
  &lt;App /&gt;
&lt;/Profiler&gt;
</code></pre>
<p>
Dùng để đo theo code, phù hợp khi cần log/đẩy số liệu lên monitoring hoặc đo một subtree cụ thể.
</p>

<h4>2) Browser-level: biết main thread bị block ở đâu</h4>

<h5>2.1 Chrome DevTools Performance</h5>
<ul>
  <li>Trace runtime: JS call stack, long tasks, scripting/rendering/painting</li>
  <li>Check layout thrash: đo/đọc layout quá nhiều</li>
  <li>Memory: snapshot, allocation timeline để tìm memory leaks</li>
</ul>

<h5>2.2 Lighthouse / PageSpeed Insights</h5>
<ul>
  <li>Đo UX theo chuẩn web: <b>LCP / INP / CLS</b></li>
  <li>Gợi ý tối ưu bundle, images, caching, render-blocking resources</li>
</ul>

<h4>3) Product-level: đo trên người dùng thật (RUM)</h4>

<h5>3.1 web-vitals</h5>
<pre><code>import { onCLS, onINP, onLCP, onTTFB, onFCP } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
</code></pre>
<p>
Đo Core Web Vitals trên user thật và gửi về analytics (GA4, Datadog, Sentry, custom endpoint).
</p>

<h5>3.2 Sentry / Datadog / NewRelic (Frontend monitoring)</h5>
<ul>
  <li>Track slow transactions, long tasks, errors đi kèm performance</li>
  <li>Phát hiện regression theo version release</li>
</ul>

<h4>4) Build-level: tối ưu bundle & loading</h4>

<h5>4.1 Bundle Analyzer (webpack/Next.js/Vite)</h5>
<ul>
  <li>Biết dependency nào đang nặng</li>
  <li>Detect duplicate packages, chunking không hợp lý</li>
</ul>

<h4>5) Metrics quan trọng (hiện đại)</h4>
<ul>
  <li><b>LCP</b>: tốc độ hiển thị nội dung lớn nhất</li>
  <li><b>INP</b>: độ trễ tương tác thực (thay cho FID ở thực tế hiện nay)</li>
  <li><b>CLS</b>: layout shift</li>
  <li><b>Long tasks</b>: &gt; 50ms trên main thread</li>
  <li><b>React</b>: commit time, render count của component nặng</li>
  <li><b>Memory</b>: leak, DOM nodes tăng dần theo thời gian</li>
</ul>

<h4>6) Quy trình đo đúng</h4>
<ul>
  <li>Chọn 1 flow: search / mở modal / scroll list…</li>
  <li>Đo baseline bằng Profiler + Performance tab</li>
  <li>Tối ưu → đo lại → so sánh commits</li>
</ul>
`,
    role: "senior",
    type: "performance-optimization",
  },

  {
    question: "Khi nào memo hóa gây phản tác dụng?",
    answer: `
<h3>Khi Memoization Gây Phản Tác Dụng</h3>

<h4>1) Memoization luôn có “cost”</h4>
<ul>
  <li>Cost runtime: check dependencies / shallow compare props</li>
  <li>Cost memory: giữ cache/value/function reference</li>
  <li>Cost complexity: code khó đọc, dễ bug stale closure</li>
</ul>

<h4>2) Khi KHÔNG nên memoize</h4>

<h5>2.1 Tính toán quá rẻ</h5>
<pre><code>// ✅ Tính lại luôn rẻ hơn memo
const doubled = count * 2;
const isEven = count % 2 === 0;
</code></pre>

<h5>2.2 Memo nhưng deps đổi liên tục</h5>
<pre><code>// ❌ deps luôn đổi → memo vô nghĩa
const value = useMemo(() =&gt; heavyCalc(data), [data]); // data bị tạo mới mỗi render
</code></pre>
<p>
Nếu dependency không stable, memo không reuse được cache.
</p>

<h5>2.3 Memo sai chỗ làm chậm hơn</h5>
<ul>
  <li>React.memo cho component nhỏ, render nhanh</li>
  <li>useCallback bọc mọi handler dù child không memo</li>
  <li>useMemo cho primitive computation</li>
</ul>

<h5>2.4 Memo làm tăng “prop drilling / coupling”</h5>
<p>
Một số team memo quá mức → tách component quá nhỏ, truyền props vòng vèo,
kết quả khó maintain hơn nhưng performance không cải thiện.
</p>

<h4>3) Lỗi hiểu sai phổ biến</h4>
<ul>
  <li><b>React memo = không render</b> → sai: vẫn render nếu state/context trong component đổi</li>
  <li><b>useMemo tăng performance</b> → chỉ đúng khi computation nặng hoặc tránh tạo object khiến child memo bị phá</li>
</ul>

<h4>4) Thứ tự tối ưu đúng (ROI cao)</h4>
<ul>
  <li>Đầu tiên: <b>virtualization</b> cho list lớn</li>
  <li>Tiếp: <b>colocate state</b> (đưa state xuống thấp) để giảm cascade</li>
  <li>Sau đó: stabilize references + memoization “đúng chỗ”</li>
  <li>Luôn dùng Profiler để chứng minh</li>
</ul>

<h4>5) Kết luận</h4>
<p>
Memoization là <b>tool</b>, không phải “best practice mặc định”.
Nếu không đo, rất dễ tối ưu ngược.
</p>
`,
    role: "senior",
    type: "performance-optimization",
  },

  {
    question: "Render blocking vs non-blocking khác nhau thế nào?",
    answer: `
<h3>Render Blocking vs Non-blocking</h3>

<h4>1) Render blocking là gì?</h4>
<p>
Blocking xảy ra khi main thread bị chiếm lâu, khiến UI <b>không kịp paint</b> hoặc <b>input bị lag</b>.
Trên 60fps, bạn chỉ có khoảng ~16ms mỗi frame.
</p>

<h4>2) Những thứ hay gây blocking</h4>
<ul>
  <li><b>Heavy synchronous work</b>: loop lớn, serialize JSON lớn, sort/filter cực nặng trong render</li>
  <li><b>Commit DOM lớn</b>: insert/remove nhiều nodes, table lớn</li>
  <li><b>Layout thrashing</b>: đọc layout rồi ghi layout liên tục</li>
  <li><b>useLayoutEffect</b> nặng: chạy trước paint nên dễ block paint</li>
</ul>

<h4>3) Non-blocking là gì?</h4>
<p>
Non-blocking nghĩa là work được chia nhỏ/ưu tiên để UI vẫn responsive:
React có thể ưu tiên input/urgent update trước, còn update nặng xử lý sau.
</p>

<h4>4) React 18 giúp non-blocking như nào?</h4>
<ul>
  <li><b>Concurrent rendering</b>: render có thể bị pause/resume</li>
  <li><b>useTransition</b>: tách urgent vs non-urgent updates</li>
  <li><b>useDeferredValue</b>: defer value để giảm pressure khi typing</li>
  <li><b>Suspense</b>: show fallback khi chờ async</li>
</ul>

<h4>5) Ví dụ</h4>

<h5>Blocking</h5>
<pre><code>function Slow() {
  const result = expensiveCalculation(); // ❌ sync heavy
  return &lt;div&gt;{result}&lt;/div&gt;;
}
</code></pre>

<h5>Non-blocking (ưu tiên input)</h5>
<pre><code>const [isPending, startTransition] = useTransition();

const onChange = (e) =&gt; {
  setQuery(e.target.value); // urgent
  startTransition(() =&gt; {
    setResults(search(e.target.value)); // non-urgent
  });
};
</code></pre>

<h4>6) Best practices</h4>
<ul>
  <li>Virtualize list lớn</li>
  <li>Debounce/throttle input khi phù hợp</li>
  <li>Đẩy compute nặng sang Web Worker</li>
  <li>Tránh useLayoutEffect nặng nếu không cần đo layout trước paint</li>
</ul>
`,
    role: "senior",
    type: "performance-optimization",
  },

  {
    question: "useTransition giải quyết vấn đề gì?",
    answer: `
<h3>useTransition – Giải Quyết UI Lag Khi Update Nặng</h3>

<h4>1) Vấn đề</h4>
<p>
Khi bạn update state gây render nặng (filter list lớn, render grid lớn),
UI sẽ bị lag: typing chậm, click không ăn, scroll giật.
</p>

<h4>2) Ý tưởng</h4>
<p>
useTransition cho bạn tách update thành:
</p>
<ul>
  <li><b>Urgent</b>: input/typing/click → phải phản hồi ngay</li>
  <li><b>Non-urgent</b>: cập nhật results/list nặng → có thể trễ một chút</li>
</ul>

<h4>3) Ví dụ</h4>
<pre><code>import { useTransition } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) =&gt; {
    const next = e.target.value;

    setQuery(next); // ✅ urgent
    startTransition(() =&gt; {
      setResults(search(next)); // ✅ non-urgent
    });
  };

  return (
    &lt;div&gt;
      &lt;input value={query} onChange={handleChange} /&gt;
      {isPending &amp;&amp; &lt;p&gt;Loading...&lt;/p&gt;}
      &lt;ResultsList results={results} /&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>4) Lợi ích</h4>
<ul>
  <li>Typing mượt hơn</li>
  <li>React ưu tiên urgent updates</li>
  <li>isPending giúp hiển thị trạng thái loading hợp lý</li>
</ul>

<h4>5) Use cases đúng</h4>
<ul>
  <li>Search/filter list lớn</li>
  <li>Tab switching render nặng</li>
  <li>Navigation trong app lớn</li>
</ul>

<h4>6) Lưu ý</h4>
<p>
useTransition không làm computation “nhanh hơn”, nó giúp <b>scheduling</b> để UX mượt hơn.
Nếu work quá nặng, vẫn cần virtualization, caching hoặc worker.
</p>
`,
    role: "senior",
    type: "performance-optimization",
  },

  {
    question: "Khi nào nên dùng virtualization?",
    answer: `
<h3>Khi Nên Dùng Virtualization (Windowing)</h3>

<h4>1) Khi nào cần?</h4>
<ul>
  <li>List/table có ~<b>500+</b> items (tùy độ nặng mỗi row)</li>
  <li>Scroll giật, FPS drop, CPU cao khi render list</li>
  <li>Mount lần đầu chậm do quá nhiều DOM nodes</li>
</ul>

<h4>2) Virtualization giải quyết gì?</h4>
<ul>
  <li>Chỉ render những item <b>đang nằm trong viewport</b> (+ overscan)</li>
  <li>Giảm DOM nodes từ hàng nghìn xuống vài chục</li>
  <li>Scroll mượt hơn, giảm commit cost</li>
</ul>

<h4>3) Libraries phổ biến</h4>
<ul>
  <li><b>react-window</b>: nhẹ, API đơn giản</li>
  <li><b>@tanstack/react-virtual</b>: linh hoạt, TS tốt, hiện đại</li>
  <li><b>react-virtualized</b>: nhiều feature nhưng nặng hơn</li>
</ul>

<h4>4) Khi KHÔNG nên dùng</h4>
<ul>
  <li>List nhỏ (&lt; 100) và render nhẹ</li>
  <li>SEO cần nội dung “hiện hết” ở HTML (SSR crawl)</li>
  <li>UI cần “find in page” toàn bộ, hoặc copy toàn bộ list</li>
</ul>

<h4>5) Rule thực dụng</h4>
<p>
Nếu list scroll thấy lag → virtualization gần như luôn là ROI cao nhất.
</p>
`,
    role: "senior",
    type: "performance-optimization",
  },

  {
    question: "Bạn debug re-render thực tế bằng công cụ gì?",
    answer: `
<h3>Debug Re-render Thực Tế</h3>

<h4>1) React DevTools (ưu tiên số 1)</h4>
<h5>1.1 Profiler</h5>
<ul>
  <li>Record flow thật (typing/search/open modal)</li>
  <li>Xem commit nào nặng, component nào render nhiều</li>
  <li>Check “Why did this render?” để biết nguồn: props/state/context</li>
</ul>

<h5>1.2 Components tab</h5>
<ul>
  <li>Highlight updates (tính năng highlight re-render)</li>
  <li>Inspect props/state để biết reference nào thay đổi</li>
</ul>

<h4>2) Kỹ thuật debug nhanh trong code</h4>

<h5>2.1 console.count</h5>
<pre><code>function Row(props) {
  console.count('Row render');
  return &lt;div&gt;...&lt;/div&gt;;
}
</code></pre>

<h5>2.2 useWhyDidYouUpdate (dev helper)</h5>
<pre><code>function useWhyDidYouUpdate(name, props) {
  const prev = useRef(props);

  useEffect(() =&gt; {
    const changes = {};
    Object.keys(props).forEach((k) =&gt; {
      if (prev.current[k] !== props[k]) {
        changes[k] = { from: prev.current[k], to: props[k] };
      }
    });
    if (Object.keys(changes).length) {
      console.log('[why-did-you-update]', name, changes);
    }
    prev.current = props;
  });
}
</code></pre>

<h4>3) Browser tools để tìm “blocking”</h4>
<ul>
  <li>Chrome Performance tab: long tasks, scripting/render/paint</li>
  <li>Memory snapshot: leak (DOM nodes tăng dần)</li>
</ul>

<h4>4) Rule debug thực dụng</h4>
<ul>
  <li>Đầu tiên xác định: <b>render thừa</b> hay <b>commit/layout nặng</b></li>
  <li>Profiler trước → tối ưu sau</li>
  <li>Đừng memo bừa; chứng minh bằng số liệu</li>
</ul>
`,
    role: "senior",
    type: "performance-optimization",
  },
]

export default performance
