export const stateManagement = [
  // =================== STATE MANAGEMENT & KIẾN TRÚC ===================
  {
    question: "Vì sao Redux dùng one-way data flow?",
    answer: `
  <h3>One-way Data Flow trong Redux</h3>
  <h4>Tại Sao One-way?</h4>
  <p>Giúp state predictable, debuggable, testable. One-way data flow đảm bảo data chỉ flow theo một hướng: từ store → components → actions → store. Điều này tạo ra predictable state updates và dễ debug hơn nhiều so với two-way binding. Mỗi state change có thể trace được từ action đến UI update.</p>
  <h5>Problems with Two-way Binding</h5>
  <ul>
    <li><b>Unpredictable</b>: Hard to track changes - Khi data có thể thay đổi từ nhiều nơi, khó biết change nào gây ra bug. Two-way binding tạo ra circular dependencies và unpredictable behavior.</li>
    <li><b>Cascade Updates</b>: Infinite loops - Một change trigger change khác, có thể tạo ra infinite update loops. Điều này đặc biệt nguy hiểm với complex state dependencies.</li>
    <li><b>Race Conditions</b>: Concurrent modifications - Khi nhiều components update state cùng lúc, có thể gây race conditions và inconsistent state. Khó predict state sẽ như thế nào sau multiple concurrent updates.</li>
    <li><b>Debugging</b>: Hard to trace bugs - Không có clear flow của data changes, khó debug khi có issues. Không biết change nào gây ra problem, và từ đâu change đến.</li>
  </ul>
  <h4>Redux Flow</h4>
  <ol>
    <li><b>Action</b>: Describe what happened - Actions là plain objects mô tả intent của change. Chúng không thực hiện change, chỉ describe what should happen. Ví dụ: { type: 'ADD_TODO', payload: 'Learn Redux' }.</li>
    <li><b>Dispatch</b>: Send action to store - dispatch() gửi action đến store. Store là single source of truth, tất cả state changes phải đi qua store.</li>
    <li><b>Reducer</b>: Pure function updates state - Reducer nhận current state và action, return new state. Reducer là pure function - không có side effects, cùng input luôn return cùng output. Điều này làm state updates predictable và testable.</li>
    <li><b>Subscribe</b>: UI re-renders - Components subscribe to store changes. Khi state thay đổi, subscribed components re-render với new state. Đảm bảo UI luôn sync với state.</li>
  </ol>
  <h5>Benefits</h5>
  <ul>
    <li><b>Predictable</b>: State = f(previousState, action) - State chỉ thay đổi dựa trên previous state và action. Không có hidden mutations, mọi change đều explicit và traceable.</li>
    <li><b>Debuggable</b>: Action log = bug reproduction - Redux DevTools log tất cả actions. Có thể replay actions để reproduce bugs, hoặc time-travel để xem state tại bất kỳ điểm nào.</li>
    <li><b>Testable</b>: Pure functions dễ test - Reducers là pure functions, dễ test với unit tests. Chỉ cần test với different inputs và verify outputs.</li>
    <li><b>Time Travel</b>: Redux DevTools - Có thể undo/redo actions, xem state tại bất kỳ điểm nào trong history. Điều này cực kỳ hữu ích cho debugging.</li>
  </ul>
  <h4>Modern Alternatives</h4>
  <ul>
    <li><b>Zustand</b>: Simpler API, same benefits - Zustand giữ one-way flow nhưng với API đơn giản hơn. Không cần actions/reducers, chỉ cần update state trực tiếp. Vẫn maintain predictability và testability.</li>
    <li><b>Jotai</b>: Atomic state management - Jotai sử dụng atomic state model, mỗi atom là independent piece of state. One-way flow được maintain qua atomic updates và subscriptions.</li>
    <li><b>Recoil</b>: React-native state - Recoil cũng sử dụng atomic model với one-way flow. Atoms và selectors tạo ra predictable state updates.</li>
  </ul>
  <h4>2026 Updates</h4>
  <p>React Server Components + one-way flow vẫn relevant. Server Components render trên server, data flow từ server → client. One-way flow vẫn là best practice, đặc biệt với React's concurrent features và Server Components. State management libraries hiện đại vẫn follow one-way flow pattern để maintain predictability và debuggability.</p>
  `,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Redux Toolkit có thực sự immutable không?",
    answer: `
  <h3>Immutability trong Redux Toolkit</h3>
  <h4>Có, Nhưng Có Nuances</h4>
  <p>RTK sử dụng Immer internally để enable "mutable" syntax trong reducers. Redux Toolkit vẫn maintain immutability - state không bao giờ được mutate trực tiếp. Nhưng developers có thể viết code như đang mutate, Immer sẽ handle immutability behind the scenes. Điều này giúp code dễ đọc và viết hơn, nhưng vẫn đảm bảo immutability principles.</p>
  <h5>Under the Hood</h5>
  <pre><code>// What you write
  const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
      addTodo: (state, action) => {
        state.push(action.payload); // "Mutation"
      },
    },
  });
  
  // What Immer does
  state.push(action.payload); // Creates new immutable state
  </code></pre>
  
  <h4>Immer's Magic</h4>
  <p>Immer tạo proxy, track changes, produce immutable copy. Khi bạn viết code như đang mutate (state.push(item)), Immer tạo một proxy object. Mọi "mutations" trên proxy được track. Sau đó Immer tạo một new immutable object chỉ với những changes đã được track. Unchanged parts được share với original object, giúp performance tốt hơn.</p>
  <h5>Performance</h5>
  <ul>
    <li><b>Structural Sharing</b>: Unchanged parts shared</li>
    <li><b>Lazy Cloning</b>: Only clone when modified</li>
    <li><b>Efficient</b>: Better than manual spread operators</li>
  </ul>
  
  <h4>Edge Cases</h4>
  <ul>
    <li><b>Direct Mutations</b>: Immer may miss complex cases - Nếu mutate object bên ngoài Immer's draft, Immer có thể không detect changes. Luôn mutate draft state, không mutate original objects.</li>
    <li><b>Large Objects</b>: Deep cloning expensive - Với objects rất lớn, Immer vẫn phải clone changed parts. Consider splitting large state thành smaller pieces hoặc dùng manual immutable updates cho performance-critical cases.</li>
    <li><b>Date Objects</b>: Need special handling - Date objects là mutable, Immer có thể không track changes correctly. Nên convert dates thành timestamps hoặc strings trong state.</li>
  </ul>
  <h4>Best Practices</h4>
  <ul>
    <li>Use Immer syntax in RTK</li>
    <li>Manual immutable updates for complex logic</li>
    <li>Test reducers thoroughly</li>
  </ul>
  `,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Khi nào global state trở thành anti-pattern?",
    answer: `
  <h3>Khi Nào Global State Là Anti-pattern</h3>
  <h4>Warning Signs</h4>
  <h5>1. Tight Coupling</h5>
  <p>Components phụ thuộc chặt chẽ vào global state structure. Khi components biết quá nhiều về global state structure, thay đổi state structure sẽ break nhiều components. Điều này vi phạm principle of encapsulation và làm code khó maintain.</p>
  <h5>2. Prop Drilling Workarounds</h5>
  <p>Dùng global state chỉ để avoid pass props.</p>
  
  <h5>3. State Hoarding</h5>
  <p>Everything in global state "just in case". Đặt tất cả state vào global "just in case" sẽ cần sau này là anti-pattern. Điều này làm global state bloated, components re-render không cần thiết, và khó maintain. Chỉ nên đặt state vào global khi thực sự cần share giữa nhiều components.</p>
  <h5>4. Cross-cutting Concerns</h5>
  <p>UI state mixed với business logic. Khi UI state (như modal open/close) được mix với business logic (như user data) trong cùng global state, khó separate concerns. UI state nên ở component level, business logic ở global level.</p>
  <h5>5. Zombie State</h5>
  <p>State tồn tại sau khi component unmount. Khi component unmount nhưng state vẫn còn trong global store, tạo ra "zombie state". State này có thể cause memory leaks và bugs khi component mount lại với stale data.</p>
  <h4>Better Alternatives</h4>
  <h5>1. Component State</h5>
  <pre><code>// Local state cho local concerns
  const [isOpen, setIsOpen] = useState(false);
  </code></pre>
  
  <h3>2. Context for Themes</h3>
  <pre><code>// Theme, locale - rarely change
  const ThemeContext = createContext();
  </code></pre>
  
  <h3>3. URL State</h3>
  <pre><code>// Search params, filters
  const [searchParams] = useSearchParams();
  </code></pre>
  
  <h3>4. Server State</h3>
  <p>Use React Query cho API data.</p>
  
  <h4>Red Flags</h4>
  <ul>
    <li>Global state > 50% của total state - Nếu phần lớn state là global, có thể đang overuse global state. Hầu hết state nên là local component state.</li>
    <li>Components re-render khi unrelated state changes - Nếu components re-render khi state không liên quan thay đổi, global state đang quá broad. Nên split thành smaller, focused stores.</li>
    <li>Hard to test components independently - Nếu components khó test vì dependencies vào global state, có thể đang over-couple với global state. Components nên có thể test với mocked state.</li>
    <li>State structure changes break many components - Nếu thay đổi state structure break nhiều components, components đang quá tightly coupled với state structure. Nên use selectors hoặc abstractions để decouple.</li>
  </ul>
  `,
    role: "senior",
    type: "state-management",
  },
  {
    question: "So sánh Redux vs Zustand vs Jotai trong dự án lớn",
    answer: `
  <h3>Redux vs Zustand vs Jotai</h3>
  <h4>Redux</h4>
  <h5>Pros</h5>
  <ul>
    <li><b>Ecosystem</b>: RTK Query, DevTools</li>
    <li><b>Patterns</b>: Well-established</li>
    <li><b>Debugging</b>: Time travel debugging</li>
    <li><b>Team Size</b>: Scales well</li>
  </ul>
  
  <h5>Cons</h5>
  <ul>
    <li><b>Boilerplate</b>: Lots of code - Redux cần nhiều boilerplate: actions, reducers, store setup. Redux Toolkit giảm boilerplate nhưng vẫn nhiều hơn alternatives.</li>
    <li><b>Learning Curve</b>: Steep - Redux có learning curve cao với concepts như immutability, pure functions, middleware. Developers mới cần thời gian để hiểu patterns.</li>
    <li><b>Bundle Size</b>: Heavy - Redux + Redux Toolkit có bundle size lớn hơn alternatives. Có thể là concern cho apps cần bundle size nhỏ.</li>
  </ul>
  <h4>Zustand</h4>
  <h5>Pros</h5>
  <ul>
    <li><b>Simplicity</b>: Minimal API</li>
    <li><b>TypeScript</b>: Great support</li>
    <li><b>Performance</b>: Selective subscriptions</li>
    <li><b>Size</b>: Very lightweight</li>
  </ul>
  
  <h5>Cons</h5>
  <ul>
    <li><b>Less Structure</b>: More freedom = more mistakes - Zustand ít opinionated hơn Redux, developers có thể tạo patterns không tốt. Cần discipline và best practices từ team.</li>
    <li><b>Community</b>: Smaller than Redux - Zustand có community nhỏ hơn Redux, ít resources và examples. Nhưng đang grow nhanh.</li>
  </ul>
  <h4>Jotai</h4>
  <h5>Pros</h5>
  <ul>
    <li><b>Atomic</b>: Fine-grained reactivity</li>
    <li><b>React-like</b>: useState semantics</li>
    <li><b>Concurrent</b>: React 18 friendly</li>
    <li><b>Flexible</b>: Mix patterns</li>
  </ul>
  
  <h5>Cons</h5>
  <ul>
    <li><b>New Paradigm</b>: Different mental model - Jotai sử dụng atomic state model, khác với Redux's centralized store. Developers cần học new mental model.</li>
    <li><b>Debugging</b>: Less tooling - Jotai có ít DevTools và debugging tools hơn Redux. Redux DevTools là gold standard cho state debugging.</li>
    <li><b>Adoption</b>: Niche - Jotai ít được adopt hơn Redux/Zustand, ít resources và community support. Có thể khó tìm developers quen với Jotai.</li>
  </ul>
  <h4>For Large Projects</h4>
  <ul>
    <li><b>Redux</b>: Established teams, complex apps</li>
    <li><b>Zustand</b>: Balance simplicity & features</li>
    <li><b>Jotai</b>: Innovative, small teams</li>
  </ul>
  `,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Context performance issue xử lý thế nào?",
    answer: `
  <h3>Context Performance Issues</h3>
  <h4>Vấn Đề</h4>
  <p>Context re-renders all consumers khi value thay đổi. Đây là fundamental behavior của Context API - khi Provider value thay đổi, tất cả consumers re-render, bất kể họ có sử dụng phần nào của value hay không. Điều này có thể gây performance issues với large component trees.</p>
  <h5>Common Issues</h5>
  <ul>
    <li><b>Large Objects</b>: {...props} triggers re-render</li>
    <li><b>Inline Objects</b>: {theme: {}} mỗi render</li>
    <li><b>Unnecessary Consumers</b>: Components subscribe không cần</li>
  </ul>
  
  <h4>Giải Pháp</h4>
  <h5>1. Split Contexts</h5>
  <pre><code>// ❌ Single large context
  const AppContext = createContext({ user, theme, settings });
  
  // ✅ Multiple contexts
  const UserContext = createContext(user);
  const ThemeContext = createContext(theme);
  </code></pre>
  
  <h5>2. useMemo Values</h5>
  <pre><code>const contextValue = useMemo(() => ({
    user,
    updateUser,
  }), [user, updateUser]);
  </code></pre>
  
  <h5>3. Context Selectors</h5>
  <pre><code>const SelectedUser = () => {
    const user = useContextSelector(UserContext, s => s.user);
    // Chỉ re-render khi user thay đổi
  };
  </code></pre>
  
  <h5>4. State Colocation</h5>
  <p>Keep state close to components that use it. Thay vì đặt state trong global Context, đặt state ở component level hoặc component tree gần nhất. Điều này giảm số components re-render và improve performance.</p>
  <h4>Alternatives</h4>
  <ul>
    <li><b>Zustand</b>: Selective subscriptions</li>
    <li><b>Jotai</b>: Atomic state</li>
    <li><b>Recoil</b>: Atom-based</li>
  </ul>
  `,
    role: "senior",
    type: "state-management",
  },
  {
    question: "Thiết kế state cho app 50+ screens thế nào?",
    answer: `
  <h3>State Architecture cho Large Apps</h3>
  <h4>Principles</h4>
  <h5>1. Domain-driven Design</h5>
  <p>Organize by business domains, not technical layers. Thay vì organize code theo technical layers (components, hooks, utils), organize theo business domains (auth, products, cart). Mỗi domain có state management riêng, giúp code dễ maintain và scale.</p>
  <h5>2. State Proximity</h5>
  <p>State close to components that use it. Đặt state ở level thấp nhất có thể - component state cho local concerns, page state cho page-specific data, global state chỉ cho truly global data. Điều này giảm re-renders và improve performance.</p>
  <h5>3. Single Source of Truth</h5>
  <p>Avoid state duplication. Mỗi piece of data chỉ nên có một source of truth. Nếu data được duplicate ở nhiều nơi, khó maintain consistency. Sử dụng derived state hoặc selectors để compute data từ single source.</p>
  <h4>Layered Architecture</h4>
  <h5>1. Component State</h5>
  <ul>
    <li>UI state: modals, forms, loading</li>
    <li>Local component concerns</li>
  </ul>
  
  <h5>2. Page State</h5>
  <ul>
    <li>Route-specific data</li>
    <li>Search filters, pagination</li>
  </ul>
  
  <h5>3. Global State</h5>
  <ul>
    <li>User authentication</li>
    <li>App configuration</li>
    <li>Cross-cutting concerns</li>
  </ul>
  
  <h3>4. Server State</h3>
  <ul>
    <li>API data with React Query</li>
    <li>Cached, synchronized</li>
  </ul>
  
  <h4>Tools & Patterns</h4>
  <h5>State Management</h5>
  <ul>
    <li><b>Zustand</b>: Simple global state</li>
    <li><b>React Query</b>: Server state</li>
    <li><b>Context</b>: Theme, config</li>
  </ul>
  
  <h5>Organization</h5>
  <pre><code>src/
    features/     # Domain-based
      auth/
      products/
      cart/
    shared/       # Cross-cutting
      ui/
      utils/
  </code></pre>
  `,
    role: "senior",
    type: "state-management",
  },
]