export const dataFetching = [
  // =================== DATA FETCHING & SERVER STATE ===================
  {
    question: "Server state khác client state ở điểm nào?",
    answer: `
  <h3>Server State vs Client State</h3>
  <h4>Server State</h4>
  <p>Server state là dữ liệu được lưu trữ trên server và được truy cập thông qua các API calls. Đây là dữ liệu "ngoài tầm kiểm soát" của client - client chỉ có thể request và nhận dữ liệu từ server, nhưng không thể trực tiếp thay đổi hay kiểm soát.</p>
  <h5>Đặc Điểm Chính</h5>
  <ul>
    <li><b>Bất Đồng Bộ (Asynchronous)</b>: Luôn cần network requests để lấy dữ liệu, có thể gặp delay, timeout, hoặc lỗi network. Client phải handle loading states, error states, và retry logic.</li>
    <li><b>Không Kiểm Soát Được (Uncontrolled)</b>: Nhiều users có thể modify dữ liệu cùng lúc, dẫn đến conflicts hoặc stale data. Client không thể đảm bảo data là latest version.</li>
    <li><b>Có Thể Lỗi Thời (Stale)</b>: Data có thể bị outdated giữa các requests. Client cần implement cache invalidation strategies để đảm bảo data freshness.</li>
    <li><b>Được Chia Sẻ (Shared)</b>: Nhiều clients có thể access cùng data source. Điều này yêu cầu synchronization và conflict resolution mechanisms.</li>
  </ul>
  <h5>Ví Dụ</h5>
  <ul>
    <li>Thông tin profile người dùng (user profiles)</li>
    <li>Danh mục sản phẩm (product catalogs)</li>
    <li>Tin nhắn chat (chat messages)</li>
    <li>Dữ liệu thời gian thực (real-time data như stock prices, live scores)</li>
  </ul>
  <h4>Client State</h4>
  <p>Client state là dữ liệu được lưu trữ cục bộ trong browser session. Đây là dữ liệu hoàn toàn được kiểm soát bởi client - client có thể read, write, và modify trực tiếp mà không cần network calls.</p>
  <h5>Đặc Điểm Chính</h5>
  <ul>
    <li><b>Đồng Bộ (Synchronous)</b>: Truy cập ngay lập tức mà không cần network. Không có loading states hoặc async operations.</li>
    <li><b>Được Kiểm Soát Hoàn Toàn (Controlled)</b>: Chỉ user hiện tại mới có thể modify data. Không có conflicts từ users khác.</li>
    <li><b>Luôn Tươi Mới (Fresh)</b>: Data luôn là latest version vì được lưu trữ locally và được update ngay lập tức.</li>
    <li><b>Riêng Tư (Private)</b>: Data chỉ tồn tại trong session của user hiện tại, không được chia sẻ với users khác.</li>
  </ul>
  <h5>Ví Dụ</h5>
  <ul>
    <li>Input values trong forms</li>
    <li>UI state (modal open/close, tab active, accordion expanded)</li>
    <li>User preferences (theme, language settings)</li>
    <li>Offline data cache</li>
  </ul>
  <h4>Chiến Lược Quản Lý</h4>
  <table>
    <tr>
      <th>Loại State</th>
      <th>Tool Phù Hợp</th>
      <th>Những Vấn Đề Chính</th>
    </tr>
    <tr>
      <td>Server State</td>
      <td>React Query/SWR</td>
      <td>Cache invalidation, race conditions, optimistic updates</td>
    </tr>
    <tr>
      <td>Client State</td>
      <td>useState/useReducer</td>
      <td>State management, persistence, complex logic</td>
    </tr>
  </table>
  `,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "Khi nào React Query không phù hợp?",
    answer: `
  <h5>Khi Nào KHÔNG Dùng React Query</h2>
  
  <h4>Khi Nào KHÔNG Dùng React Query</h4>
  <h5>1. Ứng Dụng Đơn Giản</h5>
  <p>Ứng dụng có ít API calls và không cần sophisticated caching strategies. Nếu app chỉ có vài API endpoints và data fetching logic đơn giản, việc setup React Query có thể overkill. Trong trường hợp này, useEffect + useState đã đủ để handle data fetching.</p>
  <h5>2. Yêu Cầu Thời Gian Thực Cao</h5>
  <p>Ứng dụng dựa trên WebSocket connections hoặc cần polling mỗi giây. React Query được tối ưu cho REST APIs với caching, không phải cho real-time data streams. Với real-time requirements, WebSocket libraries như Socket.io sẽ phù hợp hơn.</p>
  <h5>3. Logic State Phức Tạp</h5>
  <p>Khi server state bị tightly coupled với complex client state logic. Nếu có nhiều interdependent state updates và complex business logic, Redux Toolkit Query có thể phù hợp hơn vì nó tích hợp tốt với Redux ecosystem.</p>
  <h5>4. Legacy Codebases</h5>
  <p>Codebase đã sử dụng Redux/Saga và chi phí migration cao hơn lợi ích. Việc migrate từ Redux Saga sang React Query có thể tốn nhiều effort và có risk cao, đặc biệt với large codebases.</p>
  <h5>5. Ứng Dụng SEO-critical Với Server Components</h5>
  <p>Next.js apps sử dụng Server Components để render data trên server. Với Server Components, data fetching diễn ra trên server, không cần client-side data fetching libraries như React Query.</p>
  <h4>Alternatives Khi Không Dùng React Query</h4>
  <h5>1. SWR</h5>
  <p>Thư viện lightweight hơn React Query, tập trung vào simplicity. SWR có API đơn giản hơn và bundle size nhỏ hơn, phù hợp cho apps cần minimal setup.</p>
  <h5>2. Redux Toolkit Query</h5>
  <p>Nếu đã sử dụng Redux trong project. RTK Query tích hợp seamlessly với Redux store và cung cấp powerful caching, nhưng có learning curve cao hơn.</p>
  <h5>3. Apollo Client</h5>
  <p>Cho GraphQL-first applications. Apollo Client cung cấp powerful GraphQL features như caching, error handling, và real-time subscriptions.</p>
  <h5>4. Custom Hooks</h5>
  <p>Simple combination của useEffect + useState cho basic data fetching. Phù hợp cho small apps hoặc khi cần custom logic không có sẵn trong libraries.</p>
  <h4>Khi React Query Thật Sự Phát Huy</h4>
  <ul>
    <li><b>Ứng dụng nặng về data</b>: Nhiều API endpoints với complex data relationships và caching requirements.</li>
    <li><b>Caching phức tạp</b>: Background updates, cache invalidation, và optimistic updates.</li>
    <li><b>Optimistic updates</b>: UI phản hồi ngay lập tức khi user thực hiện actions, sau đó sync với server.</li>
    <li><b>Error handling</b>: Retry logic, error boundaries, và recovery mechanisms.</li>
  </ul>
  `,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "RTK Query vs React Query chọn cái nào cho team lớn?",
    answer: `
  <h5>RTK Query vs React Query</h2>
  
  <h5>RTK Query (Redux Toolkit)</h2>
  
  <h5>Pros</h3>
  <ul>
    <li><b>Redux Integration</b>: Seamless với existing Redux</li>
    <li><b>Type Safety</b>: TypeScript-first</li>
    <li><b>Caching</b>: Normalized cache</li>
    <li><b>Middleware</b>: Redux DevTools integration</li>
  </ul>
  
  <h5>Nhược Điểm</h5>
  <ul>
    <li><b>Boilerplate Code</b>: Cần viết nhiều setup code hơn React Query. RTK Query yêu cầu define reducers, actions, và store configuration.</li>
    <li><b>Learning Curve</b>: Yêu cầu kiến thức về Redux patterns. Developers cần hiểu concepts như actions, reducers, và middleware.</li>
    <li><b>Bundle Size</b>: Lớn hơn React Query vì bao gồm cả Redux core. Có thể impact initial load time.</li>
  </ul>
  <h4>React Query</h4>
  <h5>Ưu Điểm</h5>
  <ul>
    <li><b>Đơn Giản</b>: Dễ học và sử dụng. API intuitive với hooks-based approach.</li>
    <li><b>Developer Experience</b>: DX tuyệt vời với excellent TypeScript support, devtools, và error handling.</li>
    <li><b>Tính Năng</b>: Background refetch, offline support, optimistic updates, và advanced caching strategies.</li>
    <li><b>Community</b>: Large ecosystem với nhiều examples, tutorials, và third-party integrations.</li>
  </ul>
  <h5>Nhược Điểm</h5>
  <ul>
    <li><b>Ít Opinionated</b>: Nhiều decisions để developers tự đưa ra. Không có enforced patterns.</li>
    <li><b>TypeScript</b>: Ít strict hơn RTK Query trong một số scenarios, yêu cầu manual type definitions.</li>
  </ul>
  <h4>Lựa Chọn Theo Quy Mô Team</h4>
  <h5>Teams Lớn (Large Teams)</h5>
  <ul>
    <li><b>RTK Query</b>: Consistent patterns, type safety cao, và enforced structure. Phù hợp cho large teams với nhiều developers để maintain code quality và consistency.</li>
    <li><b>React Query</b>: Faster development, less boilerplate, và flexible approach. Phù hợp cho experienced teams có thể self-organize.</li>
  </ul>
  <h5>Yếu Tố Quyết Định</h5>
  <ul>
    <li>Đã dùng Redux trong project → Chọn RTK Query để tận dụng existing infrastructure.</li>
    <li>Project mới → Chọn React Query để development nhanh và simple.</li>
    <li>TypeScript heavy project → RTK Query cung cấp type safety tốt hơn.</li>
    <li>Prototyping/MVP → React Query cho tốc độ development nhanh.</li>
  </ul>
  `,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "Cache invalidation khó ở chỗ nào?",
    answer: `
  <h3>Cache Invalidation - Điểm Khó</h3>
  <h4>Các Vùng Phức Tạp</h4>
  <h5>1. Time-based Invalidation</h5>
  <p>Khi nào thì data được coi là "stale" (cũ)? 5 phút, 1 giờ, hay 1 ngày? Việc quyết định stale time phụ thuộc vào nature của data - user preferences có thể cache lâu hơn stock prices. Nếu stale time quá ngắn sẽ gây nhiều API calls không cần thiết, quá dài sẽ hiển thị outdated data cho users.</p>
  <h5>2. Dependent Data (Data Liên Quan)</h5>
  <p>Khi update user profile, có nên invalidate tất cả posts và comments của user đó không? Cache invalidation cần handle relationships giữa data entities. Ví dụ: khi update một post, có thể cần invalidate cache của post list, post detail, và related comments.</p>
  
  <h5>3. Optimistic Updates</h3>
  <p>Show changes immediately, rollback on failure.</p>
  
  <h5>4. Background Sync</h3>
  <p>Sync changes across multiple tabs/devices.</p>
  
  <h5>5. Race Conditions</h3>
  <p>Multiple updates cùng lúc gây conflicts.</p>
  
  <h5>Strategies</h2>
  
  <h5>1. Time-based</h3>
  <pre><code>// React Query
  useQuery('posts', fetchPosts, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  </code></pre>
  
  <h5>2. Event-based Invalidation</h5>
  <pre><code>// Invalidate khi có mutations
  queryClient.invalidateQueries('posts'); // Invalidate tất cả queries với key 'posts'
  </code></pre>
  <p>Sau khi user tạo/sửa/xóa data, invalidate các cache liên quan để ensure data consistency. Đây là cách phổ biến nhất trong real applications.</p>
  <h5>3. Tag-based Invalidation (RTK Query)</h5>
  <pre><code>// RTK Query approach
  providesTags: ['Post'],        // Endpoint cung cấp tags
  invalidatesTags: ['Post']       // Mutation invalidate tags
  </code></pre>
  <p>Sử dụng tags để tạo relationships giữa endpoints. Khi mutation chạy, tất cả endpoints có tags matching sẽ bị invalidate. Cách này granular và type-safe hơn.</p>
  <h4>Advanced Patterns</h4>
  <ul>
    <li><b>Polling</b>: Fetch data định kỳ để keep data fresh. Phù hợp cho real-time dashboards nhưng tốn network resources.</li>
    <li><b>WebSockets</b>: Real-time invalidation qua WebSocket connections. Khi server có updates, notify clients để invalidate cache.</li>
    <li><b>Focus refetch</b>: Refetch data khi user focus lại tab. Đảm bảo data fresh sau khi user inactive lâu.</li>
  </ul>
  `,
    role: "senior",
    type: "data-fetching",
  },
  {
    question: "Khi nào nên fetch ở server (Next.js), khi nào ở client?",
    answer: `
  <h3>Server vs Client Data Fetching trong Next.js</h3>
  <h4>Server-Side Fetching</h4>
  <h5>Khi Nên Sử Dụng</h5>
  <ul>
    <li><b>SEO Quan Trọng</b>: Content cần được search engines index. Server-side rendering đảm bảo crawlers thấy full content ngay từ request đầu.</li>
    <li><b>Performance</b>: Giảm client bundle size. Data được fetch và render trên server, client chỉ nhận HTML ready-to-display.</li>
    <li><b>Security</b>: API keys và sensitive logic được giữ trên server, không expose cho client. Tránh client-side attacks.</li>
    <li><b>Initial Load Critical</b>: Data quan trọng cho first paint. Server fetching loại bỏ loading states và improves perceived performance.</li>
  </ul>
  <h5>Các Phương Pháp</h5>
  <ul>
    <li><b>getServerSideProps</b>: Server-Side Rendering - Fetch data mỗi request. Phù hợp cho dynamic content thay đổi thường xuyên.</li>
    <li><b>getStaticProps</b>: Static Site Generation - Pre-build pages tại build time. Phù hợp cho content ít thay đổi, performance tốt nhất.</li>
    <li><b>Server Components (React 18+)</b>: Render components trên server. Có thể mix với client components, tối ưu performance.</li>
  </ul>
  <h4>Client-Side Fetching</h4>
  
  <h5>Khi Nên Dùng</h3>
  <ul>
    <li><b>User-specific</b>: Authenticated content</li>
    <li><b>User-specific Data</b>: Content cần authentication hoặc personalized data. Server không thể fetch data cho user cụ thể.</li>
    <li><b>Tương Tác</b>: Search, filters, sorting. Client fetching cho phép dynamic updates mà không cần page reloads.</li>
    <li><b>Real-time Updates</b>: Live data như chat messages, notifications. Client có thể subscribe và update real-time.</li>
    <li><b>Sau Tương Tác</b>: Lazy loading, infinite scroll. Load data theo demand để improve initial performance.</li>
  </ul>
  <h5>Các Phương Pháp</h5>
  <ul>
    <li><b>useEffect</b>: Simple fetching với basic loading/error states. Phù hợp cho simple cases.</li>
    <li><b>React Query</b>: Advanced caching, background refetch, error handling. Best choice cho complex data fetching.</li>
    <li><b>SWR</b>: Lightweight alternative với focus on simplicity. Good middle ground giữa custom hooks và React Query.</li>
  </ul>
  <h4>Hybrid Approach (Kết Hợp)</h4>
  <pre><code>// Server Component render static content
  export default function Page() {
    return (
      &lt;div&gt;
        &lt;StaticHeader /&gt;  // Server-rendered
        &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
          &lt;ClientPosts /&gt; // Client fetches dynamic data
        &lt;/Suspense&gt;
      &lt;/div&gt;
    );
  }
  </code></pre>
  <p>Kết hợp server và client fetching: Server render static content và shell, client fetch dynamic data. Best of both worlds.</p>
  <h4>Performance Trade-offs</h4>
  <table>
    <tr>
      <th>Yếu Tố</th>
      <th>Server</th>
      <th>Client</th>
    </tr>
    <tr>
      <td>SEO</td>
      <td>Tốt (crawlers thấy content ngay)</td>
      <td>Kém (crawlers thấy loading states)</td>
    </tr>
    <tr>
      <td>Tương Tác</td>
      <td>Kém (cần page reloads)</td>
      <td>Tốt (dynamic updates)</td>
    </tr>
    <tr>
      <td>Bundle Size</td>
      <td>Lớn hơn (server code)</td>
      <td>Nhỏ hơn (chỉ client code)</td>
    </tr>
    <tr>
      <td>Time to Interactive</td>
      <td>Nhanh hơn (server-rendered)</td>
      <td>Chậm hơn (client hydration)</td>
    </tr>
  </table>
  `,
    role: "senior",
    type: "data-fetching",
  },
]