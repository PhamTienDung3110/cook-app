// stateManagement.js
// State Management Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const stateManagement = [
  {
    question: "Context API trong React hoạt động như thế nào?",
    answer: `
<h3>React Context API</h3>

<h4>1) Basic setup</h4>
<pre><code>import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}

// Consumer hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function ThemedButton() {
  const { theme, setTheme } = useTheme();

  return (
    &lt;button
      className={theme}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    &gt;
      Toggle Theme
    &lt;/button&gt;
  );
}
</code></pre>

<h4>2) When to use Context</h4>

<h5>Good for:</h5>
<ul>
  <li>Global app state (theme, locale, user auth)</li>
  <li>Data that doesn't change often</li>
  <li>Small to medium apps</li>
  <li>Deep component trees (avoid prop drilling)</li>
</ul>

<h5>Not good for:</h5>
<ul>
  <li>Frequent updates (causes re-renders)</li>
  <li>Complex state logic</li>
  <li>Large apps with many state slices</li>
</ul>

<h4>3) Performance considerations</h4>

<h5>Context value object</h5>
<pre><code>// ❌ Bad: new object every render
&lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;

// ✅ Good: memoized object
const value = useMemo(() => ({ theme, setTheme }), [theme]);
&lt;ThemeContext.Provider value={value}&gt;
</code></pre>

<h5>Split contexts</h5>
<pre><code>// Instead of one big context
const AppContext = createContext({
  user: null,
  theme: 'light',
  settings: {}
});

// Split into smaller contexts
const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();
</code></pre>

<h4>4) Context vs Props</h4>
<table>
  <tr>
    <th>Context</th>
    <th>Props</th>
  </tr>
  <tr>
    <td>Global state</td>
    <td>Local component data</td>
  </tr>
  <tr>
    <td>Infrequent changes</td>
    <td>Frequent updates</td>
  </tr>
  <tr>
    <td>Deep nesting</td>
    <td>Shallow nesting</td>
  </tr>
</table>
`,
    role: "middle",
    type: "state-management",
  },

  {
    question: "Redux cơ bản hoạt động như thế nào?",
    answer: `
<h3>Redux Fundamentals</h3>

<h4>1) Three Principles</h4>

<h5>Single source of truth</h5>
<p>The entire application state is stored in a single object tree.</p>

<h5>State is read-only</h5>
<p>The only way to change state is to emit an action.</p>

<h5>Changes are made with pure functions</h5>
<p>Reducers are pure functions that take previous state and action, return new state.</p>

<h4>2) Core concepts</h4>

<h5>Actions</h5>
<pre><code>// Action creator
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: { text, id: Date.now() }
  };
}

// Action object
{
  type: 'ADD_TODO',
  payload: { text: 'Learn Redux', id: 123 }
}
</code></pre>

<h5>Reducers</h5>
<pre><code>function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}
</code></pre>

<h5>Store</h5>
<pre><code>import { createStore } from 'redux';
import todosReducer from './reducers';

const store = createStore(todosReducer);

// Subscribe to changes
store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Dispatch actions
store.dispatch(addTodo('Learn Redux'));
</code></pre>

<h4>3) React-Redux</h4>

<h5>Provider</h5>
<pre><code>import { Provider } from 'react-redux';

ReactDOM.render(
  &lt;Provider store={store}&gt;
    &lt;App /&gt;
  &lt;/Provider&gt;,
  document.getElementById('root')
);
</code></pre>

<h5>useSelector & useDispatch</h5>
<pre><code>import { useSelector, useDispatch } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  return (
    &lt;ul&gt;
      {todos.map(todo => (
        &lt;li key={todo.id}&gt;{todo.text}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre>

<h4>4) Redux Toolkit (RTK)</h4>
<pre><code>import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
</code></pre>
`,
    role: "middle",
    type: "state-management",
  },

  {
    question: "Zustand so với Redux và Context?",
    answer: `
<h3>Zustand vs Redux vs Context</h3>

<h4>1) Zustand basics</h4>
<pre><code>import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// Usage
function BearCounter() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);

  return (
    &lt;div&gt;
      &lt;h1&gt;{bears} around here ...&lt;/h1&gt;
      &lt;button onClick={increasePopulation}&gt;one up&lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h4>2) Comparison</h4>

<h5>Redux</h5>
<ul>
  <li><b>Pros</b>: Predictable, devtools, middleware, large ecosystem</li>
  <li><b>Cons</b>: Boilerplate heavy, complex setup</li>
  <li><b>Best for</b>: Large apps, complex state logic, team collaboration</li>
</ul>

<h5>Zustand</h5>
<ul>
  <li><b>Pros</b>: Simple API, lightweight, TypeScript friendly</li>
  <li><b>Cons</b>: Less opinionated, fewer devtools</li>
  <li><b>Best for</b>: Medium apps, quick prototyping, modern React</li>
</ul>

<h5>Context + useReducer</h5>
<ul>
  <li><b>Pros</b>: Built-in React, no extra dependencies</li>
  <li><b>Cons</b>: Re-render issues, complex for large state</li>
  <li><b>Best for</b>: Small apps, theme/user auth</li>
</ul>

<h4>3) Zustand advanced features</h4>

<h5>Async actions</h5>
<pre><code>const useStore = create((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ loading: false });
      // handle error
    }
  }
}));
</code></pre>

<h5>Selectors</h5>
<pre><code>// Instead of
const users = useStore(state => state.users);

// Better performance with selectors
const users = useStore.use.users();
const loading = useStore.use.loading();
</code></pre>

<h5>Middleware</h5>
<pre><code>import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        // store definition
      }),
      {
        name: 'store-name',
      }
    )
  )
);
</code></pre>

<h4>4) Migration from Redux</h4>

<h5>Redux pattern</h5>
<pre><code>// Redux
dispatch({ type: 'INCREMENT' });

// Zustand
store.getState().increment();
</code></pre>

<h5>Reducers become actions</h5>
<pre><code>// Redux
case 'INCREMENT':
  return { ...state, count: state.count + 1 };

// Zustand
increment: () => set(state => ({ count: state.count + 1 }))
</code></pre>
`,
    role: "middle",
    type: "state-management",
  },

  {
    question: "State design patterns trong React?",
    answer: `
<h3>State Design Patterns</h3>

<h4>1) Lifting state up</h4>
<p>Move state to common ancestor when multiple components need it.</p>

<pre><code>// Before: state scattered
function Parent() {
  return (
    &lt;&gt;
      &lt;ChildA /&gt;
      &lt;ChildB /&gt;
    &lt;/&gt;
  );
}

// After: state lifted
function Parent() {
  const [sharedState, setSharedState] = useState('');

  return (
    &lt;&gt;
      &lt;ChildA value={sharedState} onChange={setSharedState} /&gt;
      &lt;ChildB value={sharedState} onChange={setSharedState} /&gt;
    &lt;/&gt;
  );
}
</code></pre>

<h4>2) Compound components</h4>
<pre><code>function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    &lt;&gt;
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        });
      })}
    &lt;/&gt;
  );
}

function Tab({ children, isActive, onClick }) {
  return (
    &lt;button
      className={isActive ? 'active' : ''}
      onClick={onClick}
    &gt;
      {children}
    &lt;/button&gt;
  );
}

// Usage
&lt;Tabs&gt;
  &lt;Tab&gt;Tab 1&lt;/Tab&gt;
  &lt;Tab&gt;Tab 2&lt;/Tab&gt;
&lt;/Tabs&gt;
</code></pre>

<h4>3) State reducer pattern</h4>
<pre><code>function useCounter(initialCount = 0, reducer = counterReducer) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });

  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });
  const reset = () => dispatch({ type: 'RESET' });

  return {
    state: state.count,
    increment,
    decrement,
    reset,
    dispatch // For advanced usage
  };
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}
</code></pre>

<h4>4) Container/Presentational pattern</h4>
<pre><code>// Container component (handles data/logic)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await fetch('/api/users').then(r => r.json());
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  return &lt;UserList users={users} loading={loading} /&gt;;
}

// Presentational component (handles UI)
function UserList({ users, loading }) {
  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;

  return (
    &lt;ul&gt;
      {users.map(user => (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre>

<h4>5) Custom hooks pattern</h4>
<pre><code>function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset
  };
}

// Usage
function LoginForm() {
  const { values, handleChange, handleBlur } = useForm({
    email: '',
    password: ''
  });

  // form logic
}
</code></pre>
`,
    role: "middle",
    type: "state-management",
  },

  {
    question: "Khi nào nên dùng global state?",
    answer: `
<h3>When to Use Global State</h3>

<h4>1) Clear indicators for global state</h4>

<h5>Cross-cutting concerns</h5>
<ul>
  <li>User authentication status</li>
  <li>App theme preferences</li>
  <li>Current language/locale</li>
  <li>Global notifications</li>
</ul>

<h5>Shared data across routes</h5>
<ul>
  <li>Shopping cart contents</li>
  <li>User profile information</li>
  <li>Application settings</li>
</ul>

<h5>Complex component communication</h5>
<ul>
  <li>Sibling components need same data</li>
  <li>Deep component tree with shared state</li>
  <li>Modal dialogs affecting multiple components</li>
</ul>

<h4>2) When NOT to use global state</h4>

<h5>Local component state</h5>
<ul>
  <li>Form input values</li>
  <li>UI toggle states (dropdown open/closed)</li>
  <li>Component-specific loading states</li>
  <li>Hover/focus states</li>
</ul>

<h5>Temporary UI state</h5>
<ul>
  <li>Search input value (use URL state instead)</li>
  <li>Sort/filter preferences (can be local or URL)</li>
</ul>

<h4>3) State management hierarchy</h4>

<h5>1. Local state (useState/useReducer)</h5>
<pre><code>// For component-specific state
const [isOpen, setIsOpen] = useState(false);
</code></pre>

<h5>2. Lifted state (props)</h5>
<pre><code>// When multiple siblings need same data
function Parent() {
  const [sharedData, setSharedData] = useState();
  return &lt;ChildA data={sharedData} /&gt;;
}
</code></pre>

<h5>3. Context (React.Context)</h5>
<pre><code>// For theme, locale, user auth
const ThemeContext = createContext();
</code></pre>

<h5>4. Global state (Redux/Zustand)</h5>
<pre><code>// For complex app state, persistence, devtools
const useStore = create((set) => ({
  user: null,
  cart: [],
}));
</code></pre>

<h4>4) Server state consideration</h4>

<h5>Server state vs Client state</h5>
<ul>
  <li><b>Server state</b>: Data from APIs (use React Query/SWR)</li>
  <li><b>Client state</b>: UI state, form state, navigation state</li>
</ul>

<h5>Don't put server state in global client state</h5>
<pre><code>// ❌ Don't do this
const useStore = create(set => ({
  users: [], // Server data in global state
  fetchUsers: async () => {
    const users = await api.getUsers();
    set({ users });
  }
}));

// ✅ Use React Query for server state
const { data: users } = useQuery(['users'], fetchUsers);
</code></pre>

<h4>5) Performance implications</h4>

<h5>Global state re-renders</h5>
<ul>
  <li>All components using global state re-render on changes</li>
  <li>Use selectors to prevent unnecessary re-renders</li>
  <li>Consider component splitting</li>
</ul>

<h5>State updates</h5>
<ul>
  <li>Minimize global state mutations</li>
  <li>Batch related updates</li>
  <li>Consider optimistic updates for better UX</li>
</ul>
`,
    role: "middle",
    type: "state-management",
  },
]

export default stateManagement
