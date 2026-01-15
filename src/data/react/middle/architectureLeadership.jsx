// architectureLeadership.js
// Architecture & Leadership Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const architectureLeadership = [
  {
    question: "Code review React: điểm cần chú ý?",
    answer: `
<h3>Code Review Checklist for React</h3>

<h4>1) Functionality & Requirements</h4>
<ul>
  <li><b>Requirements met</b>: Code giải quyết đúng problem statement?</li>
  <li><b>Edge cases</b>: Handle empty states, errors, loading?</li>
  <li><b>Performance</b>: No obvious performance issues (infinite loops, unnecessary renders)?</li>
  <li><b>Testing</b>: Unit tests cover main flows? Integration tests exist?</li>
</ul>

<h4>2) React Best Practices</h4>

<h5>Component structure</h5>
<ul>
  <li><b>Single responsibility</b>: Each component does one thing well?</li>
  <li><b>Props validation</b>: PropTypes or TypeScript interfaces?</li>
  <li><b>Default props</b>: Sensible defaults for optional props?</li>
  <li><b>Component naming</b>: PascalCase, descriptive names?</li>
</ul>

<h5>Hooks usage</h5>
<ul>
  <li><b>Rules of hooks</b>: No conditional calls, only in React functions?</li>
  <li><b>Dependencies</b>: useEffect/useCallback deps array correct?</li>
  <li><b>Custom hooks</b>: Logic extracted to reusable hooks?</li>
  <li><b>Hook naming</b>: useSomething naming convention?</li>
</ul>

<h4>3) Code Quality</h4>

<h5>Readability</h5>
<ul>
  <li><b>Variable names</b>: Descriptive, not abbreviated?</li>
  <li><b>Function length</b>: Functions not too long (>50 lines)?</li>
  <li><b>Comments</b>: Complex logic explained?</li>
  <li><b>Consistent style</b>: Follows team conventions?</li>
</ul>

<h5>Error handling</h5>
<ul>
  <li><b>Try-catch blocks</b>: Async operations wrapped?</li>
  <li><b>Error boundaries</b>: Used for error isolation?</li>
  <li><b>User feedback</b>: Errors communicated to users?</li>
  <li><b>Logging</b>: Errors logged for debugging?</li>
</ul>

<h4>4) Performance Considerations</h4>

<h5>Re-rendering</h5>
<ul>
  <li><b>Unnecessary renders</b>: Components re-render when they shouldn't?</li>
  <li><b>Memoization</b>: React.memo, useMemo, useCallback used appropriately?</li>
  <li><b>Key props</b>: Lists have stable, unique keys?</li>
</ul>

<h5>Bundle size</h5>
<ul>
  <li><b>Import optimization</b>: Only import what's needed?</li>
  <li><b>Code splitting</b>: Large components lazy loaded?</li>
  <li><b>Bundle analysis</b>: New dependencies justified?</li>
</ul>

<h4>5) Security</h4>

<h5>Data handling</h5>
<ul>
  <li><b>XSS prevention</b>: User input sanitized?</li>
  <li><b>CSRF protection</b>: State-changing operations protected?</li>
  <li><b>Auth checks</b>: Protected routes properly secured?</li>
  <li><b>Secrets</b>: No API keys or secrets in client code?</li>
</ul>

<h4>6) Accessibility</h4>

<h5>ARIA attributes</h5>
<ul>
  <li><b>Semantic HTML</b>: Proper element usage?</li>
  <li><b>ARIA labels</b>: Screen reader support?</li>
  <li><b>Keyboard navigation</b>: Focus management correct?</li>
  <li><b>Color contrast</b>: Text readable?</li>
</ul>

<h4>7) Testing Coverage</h4>

<h5>Test quality</h5>
<ul>
  <li><b>Happy path</b>: Main functionality tested?</li>
  <li><b>Error cases</b>: Error states tested?</li>
  <li><b>Edge cases</b>: Boundary conditions covered?</li>
  <li><b>Integration</b>: Component interactions tested?</li>
</ul>

<h4>8) Documentation</h4>

<h5>Code documentation</h5>
<ul>
  <li><b>JSDoc</b>: Functions documented?</li>
  <li><b>README</b>: Setup/installation instructions?</li>
  <li><b>Inline comments</b>: Complex logic explained?</li>
</ul>
`,
    role: "middle",
    type: "architecture-leadership",
  },

  {
    question: "Refactoring React code: khi nào và cách nào?",
    answer: `
<h3>React Code Refactoring</h3>

<h4>1) When to refactor</h4>

<h5>Code smells</h5>
<ul>
  <li><b>Long components</b>: >200 lines, hard to understand</li>
  <li><b>Complex functions</b>: Too many parameters/responsibilities</li>
  <li><b>Duplicate code</b>: Same logic repeated in multiple places</li>
  <li><b>Tight coupling</b>: Components know too much about each other</li>
  <li><b>Magic numbers/strings</b>: Hardcoded values everywhere</li>
</ul>

<h5>Performance issues</h5>
<ul>
  <li><b>Unnecessary re-renders</b>: Components update too frequently</li>
  <li><b>Large bundle size</b>: Unused code or large dependencies</li>
  <li><b>Memory leaks</b>: Event listeners not cleaned up</li>
  <li><b>Slow initial load</b>: Too much code loaded upfront</li>
</ul>

<h5>Maintainability issues</h5>
<ul>
  <li><b>Hard to test</b>: Code tightly coupled, side effects everywhere</li>
  <li><b>Hard to modify</b>: Changes break multiple places</li>
  <li><b>Outdated patterns</b>: Using deprecated APIs or anti-patterns</li>
</ul>

<h4>2) Refactoring techniques</h4>

<h5>Extract components</h5>
<pre><code>// Before: Large component
function UserProfile({ user }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;div&gt;
        &lt;p&gt;Email: {user.email}&lt;/p&gt;
        &lt;p&gt;Phone: {user.phone}&lt;/p&gt;
        &lt;p&gt;Address: {user.address.street}, {user.address.city}&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

// After: Smaller components
function ContactInfo({ email, phone }) {
  return (
    &lt;&gt;
      &lt;p&gt;Email: {email}&lt;/p&gt;
      &lt;p&gt;Phone: {phone}&lt;/p&gt;
    &lt;/&gt;
  );
}

function Address({ address }) {
  return &lt;p&gt;Address: {address.street}, {address.city}&lt;/p&gt;;
}

function UserProfile({ user }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;div&gt;
        &lt;ContactInfo email={user.email} phone={user.phone} /&gt;
        &lt;Address address={user.address} /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h5>Extract custom hooks</h5>
<pre><code>// Before: Logic mixed with UI
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // ... render logic
}

// After: Custom hook
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return { users, loading, error, refetch: fetchUsers };
}

function UserList() {
  const { users, loading, error } = useUsers();
  // ... render logic
}
</code></pre>

<h5>Use reducer for complex state</h5>
<pre><code>// Before: Multiple useState
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // ... more handlers
}

// After: useReducer
const initialState = {
  todos: [],
  filter: 'all',
  loading: false
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({
      type: 'ADD_TODO',
      payload: { id: Date.now(), text, completed: false }
    });
  };

  // ... simpler handlers
}
</code></pre>

<h4>3) Performance refactoring</h4>

<h5>Memoization</h5>
<pre><code>// Before: Expensive component re-renders
function UserCard({ user, onSelect }) {
  const avatarUrl = generateAvatarUrl(user); // Expensive operation
  return (
    &lt;div onClick={() => onSelect(user)}&gt;
      &lt;img src={avatarUrl} alt={user.name} /&gt;
      &lt;p&gt;{user.name}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// After: Memoize expensive operations
const UserCard = memo(function UserCard({ user, onSelect }) {
  const avatarUrl = useMemo(() => generateAvatarUrl(user), [user.id]);
  const handleSelect = useCallback(() => onSelect(user), [user, onSelect]);

  return (
    &lt;div onClick={handleSelect}&gt;
      &lt;img src={avatarUrl} alt={user.name} /&gt;
      &lt;p&gt;{user.name}&lt;/p&gt;
    &lt;/div&gt;
  );
});
</code></pre>

<h5>Code splitting</h5>
<pre><code>// Before: All code loaded upfront
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';

// After: Lazy load heavy components
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Reports = lazy(() => import('./components/Reports'));

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;Routes&gt;
        &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
        &lt;Route path="/reports" element={&lt;Reports /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Suspense&gt;
  );
}
</code></pre>

<h4>4) Testing during refactoring</h4>

<h5>Refactor with confidence</h5>
<ul>
  <li><b>Write tests first</b> if code is untested</li>
  <li><b>Refactor in small steps</b> - test after each change</li>
  <li><b>Use feature flags</b> for large refactors</li>
  <li><b>Pair programming</b> for complex refactors</li>
</ul>

<h5>Types of refactoring tests</h5>
<ul>
  <li><b>Unit tests</b>: Individual functions/components</li>
  <li><b>Integration tests</b>: Component interactions</li>
  <li><b>E2E tests</b>: Full user workflows</li>
  <li><b>Performance tests</b>: Bundle size, runtime performance</li>
</ul>
`,
    role: "middle",
    type: "architecture-leadership",
  },

  {
    question: "Tech debt trong React: nhận biết và xử lý?",
    answer: `
<h3>Technical Debt in React Applications</h3>

<h4>1) What is technical debt?</h4>
<p>Technical debt is the implied cost of additional rework caused by choosing an easy solution now instead of using a better approach that would take longer.</p>

<h4>2) Common React tech debt indicators</h4>

<h5>Code quality issues</h5>
<ul>
  <li><b>Outdated dependencies</b>: Security vulnerabilities, missing features</li>
  <li><b>Dead code</b>: Unused components, functions, imports</li>
  <li><b>Code duplication</b>: Same logic repeated across components</li>
  <li><b>Magic numbers/strings</b>: Hardcoded values scattered throughout</li>
  <li><b>Large components</b>: Components with too many responsibilities</li>
</ul>

<h5>Architecture problems</h5>
<ul>
  <li><b>Tight coupling</b>: Components depend heavily on each other</li>
  <li><b>Prop drilling</b>: Passing props through many component layers</li>
  <li><b>Global state abuse</b>: Everything in Redux/Context</li>
  <li><b>Mixed concerns</b>: Business logic mixed with UI logic</li>
  <li><b>Circular dependencies</b>: Components depend on each other</li>
</ul>

<h5>Performance issues</h5>
<ul>
  <li><b>Unnecessary re-renders</b>: Components update when they don't need to</li>
  <li><b>Large bundle size</b>: Unused dependencies, no code splitting</li>
  <li><b>Memory leaks</b>: Event listeners not cleaned up</li>
  <li><b>Slow loading</b>: No optimization for initial load</li>
</ul>

<h5>Testing gaps</h5>
<ul>
  <li><b>Missing tests</b>: Critical functionality not covered</li>
  <li><b>Flaky tests</b>: Tests that fail randomly</li>
  <li><b>Outdated tests</b>: Tests not updated after code changes</li>
  <li><b>Poor test coverage</b>: Important edge cases not tested</li>
</ul>

<h4>3) Measuring technical debt</h4>

<h5>Code metrics</h5>
<ul>
  <li><b>Cyclomatic complexity</b>: How complex the code is</li>
  <li><b>Code coverage</b>: Percentage of code tested</li>
  <li><b>Bundle size</b>: Size of JavaScript bundles</li>
  <li><b>Performance metrics</b>: LCP, FID, CLS scores</li>
  <li><b>Technical debt ratio</b>: Story points of debt vs new features</li>
</ul>

<h5>Tools for measurement</h5>
<ul>
  <li><b>SonarQube</b>: Code quality and security analysis</li>
  <li><b>CodeClimate</b>: Maintainability and technical debt scoring</li>
  <li><b>Lighthouse</b>: Performance and accessibility metrics</li>
  <li><b>Bundle analyzer</b>: JavaScript bundle analysis</li>
  <li><b>Coverage reports</b>: Test coverage visualization</li>
</ul>

<h4>4) Managing technical debt</h4>

<h5>Prevention strategies</h5>
<ul>
  <li><b>Code reviews</b>: Catch issues before they accumulate</li>
  <li><b>Automated testing</b>: Prevent regressions</li>
  <li><b>Continuous integration</b>: Quick feedback on code quality</li>
  <li><b>Refactoring time</b>: Allocate time for code improvement</li>
  <li><b>Clean code principles</b>: Follow established best practices</li>
</ul>

<h5>Paying down debt</h5>
<ul>
  <li><b>Regular refactoring</b>: Small improvements over time</li>
  <li><b>Dedicated cleanup sprints</b>: Focused time for technical debt</li>
  <li><b>Bug fixing days</b>: Time allocated for fixing known issues</li>
  <li><b>Dependency updates</b>: Keep libraries up to date</li>
  <li><b>Documentation</b>: Keep code well-documented</li>
</ul>

<h4>5) Prioritizing technical debt</h4>

<h5>High priority (fix immediately)</h5>
<ul>
  <li><b>Security vulnerabilities</b>: XSS, CSRF, injection attacks</li>
  <li><b>Data loss bugs</b>: Critical functionality broken</li>
  <li><b>Performance issues</b>: Slow loading, poor user experience</li>
  <li><b>Build failures</b>: Blocking development</li>
</ul>

<h5>Medium priority (fix soon)</h5>
<ul>
  <li><b>Code maintainability</b>: Hard to modify or test</li>
  <li><b>Outdated dependencies</b>: Minor version updates</li>
  <li><b>Test coverage gaps</b>: Missing tests for important features</li>
  <li><b>Code duplication</b>: Repeated logic across codebase</li>
</ul>

<h5>Low priority (monitor)</h5>
<ul>
  <li><b>Code style issues</b>: ESLint warnings</li>
  <li><b>Minor performance optimizations</b>: Micro-optimizations</li>
  <li><b>Documentation updates</b>: Outdated comments</li>
  <li><b>Cleanup tasks</b>: Remove console.logs, unused imports</li>
</ul>

<h4>6) Communicating technical debt</h4>

<h5>To stakeholders</h5>
<ul>
  <li><b>Explain impact</b>: How debt affects development velocity</li>
  <li><b>Use analogies</b>: Compare to financial debt</li>
  <li><b>Show metrics</b>: Performance improvements, bug rates</li>
  <li><b>Quantify costs</b>: Time spent on bugs vs features</li>
</ul>

<h5>To developers</h5>
<ul>
  <li><b>Code review comments</b>: Suggest improvements during review</li>
  <li><b>Refactoring sessions</b>: Pair programming for complex changes</li>
  <li><b>Knowledge sharing</b>: Document lessons learned</li>
  <li><b>Tool training</b>: Teach best practices and tools</li>
</ul>
`,
    role: "middle",
    type: "architecture-leadership",
  },

  {
    question: "Team collaboration trong React project?",
    answer: `
<h3>Team Collaboration in React Projects</h3>

<h4>1) Code organization</h4>

<h5>Folder structure</h5>
<pre><code>src/
  components/          # Reusable UI components
    ui/               # Basic UI elements (Button, Input, etc.)
    layout/           # Layout components (Header, Sidebar, etc.)
    forms/            # Form-related components
  pages/              # Page-level components
  hooks/              # Custom hooks
  utils/              # Utility functions
  services/           # API calls, external services
  stores/             # State management
  types/              # TypeScript type definitions
  constants/          # App constants
  styles/             # Global styles, theme
</code></pre>

<h5>Component organization</h5>
<pre><code>components/Button/
  Button.tsx          # Main component
  Button.test.tsx     # Unit tests
  Button.stories.tsx  # Storybook stories
  index.ts            # Export file
  README.md           # Documentation
</code></pre>

<h4>2) Development workflow</h4>

<h5>Git workflow</h5>
<ul>
  <li><b>Feature branches</b>: feature/user-authentication</li>
  <li><b>Small, focused commits</b>: Logical chunks of work</li>
  <li><b>Descriptive commit messages</b>: What and why</li>
  <li><b>Pull requests</b>: Code review before merge</li>
  <li><b>Main branch protection</b>: Require reviews and CI</li>
</ul>

<h5>Code review process</h5>
<ul>
  <li><b>Automated checks</b>: Lint, test, build pass</li>
  <li><b>Peer review</b>: At least one other developer</li>
  <li><b>Constructive feedback</b>: Focus on code, not person</li>
  <li><b>Knowledge sharing</b>: Explain complex changes</li>
  <li><b>Follow up</b>: Address review comments</li>
</ul>

<h4>3) Communication</h4>

<h5>Documentation</h5>
<ul>
  <li><b>README</b>: Project setup, development guide</li>
  <li><b>API docs</b>: Component props, usage examples</li>
  <li><b>Architecture docs</b>: System design, data flow</li>
  <li><b>Conventions</b>: Naming, folder structure, patterns</li>
</ul>

<h5>Planning and standups</h5>
<ul>
  <li><b>Daily standups</b>: What did, doing, blockers</li>
  <li><b>Sprint planning</b>: Break down features into tasks</li>
  <li><b>Retrospectives</b>: What went well, what to improve</li>
  <li><b>Tech discussions</b>: Architecture decisions, new tech</li>
</ul>

<h4>4) Quality assurance</h4>

<h5>Automated checks</h5>
<ul>
  <li><b>Pre-commit hooks</b>: Lint, format, test before commit</li>
  <li><b>CI/CD pipeline</b>: Build, test, deploy automatically</li>
  <li><b>Code coverage</b>: Track test coverage over time</li>
  <li><b>Performance monitoring</b>: Track bundle size, runtime metrics</li>
</ul>

<h5>Manual testing</h5>
<ul>
  <li><b>QA team</b>: Dedicated testing before release</li>
  <li><b>User acceptance testing</b>: Real users test features</li>
  <li><b>Cross-browser testing</b>: Test on different browsers</li>
  <li><b>Mobile testing</b>: Test responsive design</li>
</ul>

<h4>5) Tooling and automation</h4>

<h5>Development tools</h5>
<ul>
  <li><b>ESLint + Prettier</b>: Code linting and formatting</li>
  <li><b>Husky</b>: Git hooks for quality checks</li>
  <li><b>Storybook</b>: Component development and documentation</li>
  <li><b>Plop</b>: Code generation for consistent structure</li>
</ul>

<h5>Communication tools</h5>
<ul>
  <li><b>Slack/Discord</b>: Daily communication</li>
  <li><b>Jira/Linear</b>: Issue tracking and project management</li>
  <li><b>Figma</b>: Design collaboration</li>
  <li><b>Notion</b>: Documentation and knowledge base</li>
</ul>

<h4>6) Knowledge sharing</h4>

<h5>Team practices</h5>
<ul>
  <li><b>Code reviews</b>: Learn from each other's code</li>
  <li><b>Pair programming</b>: Work together on complex tasks</li>
  <li><b>Tech talks</b>: Share knowledge about new technologies</li>
  <li><b>Mentoring</b>: Help junior developers grow</li>
</ul>

<h5>Documentation</h5>
<ul>
  <li><b>Decision records</b>: Why certain architecture decisions</li>
  <li><b>Troubleshooting guides</b>: Common issues and solutions</li>
  <li><b>Code examples</b>: Reusable patterns and components</li>
  <li><b>Onboarding docs</b>: Help new team members get started</li>
</ul>

<h4>7) Scaling team collaboration</h4>

<h5>As team grows</h5>
<ul>
  <li><b>More structure</b>: Defined processes and roles</li>
  <li><b>Specialization</b>: Frontend, backend, QA, DevOps roles</li>
  <li><b>Code ownership</b>: Teams own specific features</li>
  <li><b>Cross-team coordination</b>: APIs between teams</li>
</ul>

<h5>Remote work considerations</h5>
<ul>
  <li><b>Asynchronous communication</b>: Written documentation</li>
  <li><b>Regular video calls</b>: Maintain personal connections</li>
  <li><b>Time zone awareness</b>: Respect working hours</li>
  <li><b>Over-communication</b>: More context in written form</li>
</ul>
`,
    role: "middle",
    type: "architecture-leadership",
  },

  {
    question: "Performance monitoring trong production?",
    answer: `
<h3>Production Performance Monitoring</h3>

<h4>1) Key metrics to track</h4>

<h5>Core Web Vitals</h5>
<ul>
  <li><b>Largest Contentful Paint (LCP)</b>: Time for largest content to load</li>
  <li><b>First Input Delay (FID)</b>: Responsiveness to user input</li>
  <li><b>Cumulative Layout Shift (CLS)</b>: Visual stability</li>
</ul>

<h5>Traditional metrics</h5>
<ul>
  <li><b>Time to First Byte (TTFB)</b>: Server response time</li>
  <li><b>First Contentful Paint (FCP)</b>: First content appears</li>
  <li><b>Time to Interactive (TTI)</b>: Page fully interactive</li>
  <li><b>Total Blocking Time (TBT)</b>: Time main thread blocked</li>
</ul>

<h4>2) Monitoring tools</h4>

<h5>Google tools</h5>
<ul>
  <li><b>PageSpeed Insights</b>: Free performance analysis</li>
  <li><b>Lighthouse</b>: Comprehensive auditing</li>
  <li><b>Chrome DevTools</b>: Browser-based analysis</li>
  <li><b>Search Console</b>: Real user performance data</li>
</ul>

<h5>Real User Monitoring (RUM)</h5>
<ul>
  <li><b>web-vitals</b>: Google library for Core Web Vitals</li>
  <li><b>Sentry</b>: Error tracking + performance monitoring</li>
  <li><b>DataDog</b>: Comprehensive monitoring platform</li>
  <li><b>New Relic</b>: Application performance monitoring</li>
</ul>

<h4>3) Implementing performance monitoring</h4>

<h5>web-vitals integration</h5>
<pre><code>import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, value, id }) {
  // Send to your analytics service
  gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    custom_map: { metric_value: value }
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
</code></pre>

<h5>Custom performance tracking</h5>
<pre><code>// Track component render performance
import { useEffect } from 'react';

function usePerformanceTracking(componentName) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Track mount time
      const startTime = performance.now();

      return () => {
        const mountTime = performance.now() - startTime;
        // Send to analytics
        console.log(\`\${componentName} mount time: \${mountTime}ms\`);
      };
    }
  }, [componentName]);
}

// Usage
function MyComponent() {
  usePerformanceTracking('MyComponent');
  // ...
}
</code></pre>

<h4>4) Bundle analysis</h4>

<h5>webpack-bundle-analyzer</h5>
<pre><code>// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    })
  ]
};
</code></pre>

<h5>Track bundle size over time</h5>
<pre><code>// CI/CD script
const fs = require('fs');
const path = require('path');

function trackBundleSize() {
  const stats = JSON.parse(
    fs.readFileSync('./build/static/js/*.js', 'utf8')
  );

  const bundleSize = stats.assets
    .filter(asset => asset.name.endsWith('.js'))
    .reduce((total, asset) => total + asset.size, 0);

  // Send to monitoring service
  console.log(\`Bundle size: \${(bundleSize / 1024 / 1024).toFixed(2)} MB\`);
}
</code></pre>

<h4>5) Error monitoring</h4>

<h5>Sentry setup</h5>
<pre><code>import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'your-dsn-here',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// Error boundary
function App() {
  return (
    &lt;Sentry.ErrorBoundary fallback={&lt;div&gt;An error has occurred&lt;/div&gt;}&gt;
      &lt;YourApp /&gt;
    &lt;/Sentry.ErrorBoundary&gt;
  );
}
</code></pre>

<h5>Custom error tracking</h5>
<pre><code>// Global error handler
window.addEventListener('error', (event) => {
  // Send to monitoring service
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  // Send to monitoring service
  console.error('Unhandled promise rejection:', event.reason);
});
</code></pre>

<h4>6) Performance budgets</h4>

<h5>Set performance budgets</h5>
<pre><code>// webpack performance hints
module.exports = {
  performance: {
    hints: 'warning',
    maxAssetSize: 244 * 1024,    // 244 KiB
    maxEntrypointSize: 244 * 1024, // 244 KiB
  }
};

// Lighthouse CI
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}]
      }
    }
  }
}
</code></pre>

<h4>7) Monitoring dashboards</h4>

<h5>Key dashboards to create</h5>
<ul>
  <li><b>Core Web Vitals dashboard</b>: LCP, FID, CLS trends</li>
  <li><b>Error dashboard</b>: Error rates, types, affected users</li>
  <li><b>Performance dashboard</b>: Load times, bundle sizes</li>
  <li><b>User journey dashboard</b>: Conversion funnels, drop-off points</li>
</ul>

<h5>Alerting</h5>
<ul>
  <li><b>Performance regressions</b>: LCP increases by 10%</li>
  <li><b>Error spikes</b>: Error rate exceeds threshold</li>
  <li><b>Bundle size increases</b>: Unexpected bundle growth</li>
  <li><b>Broken functionality</b>: Key user flows failing</li>
</ul>
`,
    role: "middle",
    type: "architecture-leadership",
  },
]

export default architectureLeadership
