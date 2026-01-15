// testQuality.js
// Testing & Quality Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const testQuality = [
  {
    question: "Unit test React components với Jest + RTL?",
    answer: `
<h3>Unit Testing React Components</h3>

<h4>1) Setup testing environment</h4>
<pre><code>// package.json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}

// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['&lt;rootDir&gt;/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
</code></pre>

<h4>2) Basic component test</h4>
<pre><code>import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('renders button with text', () => {
  render(&lt;Button&gt;Click me&lt;/Button&gt;);

  const buttonElement = screen.getByText('Click me');
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick when clicked', async () => {
  const user = userEvent.setup();
  const mockOnClick = jest.fn();

  render(&lt;Button onClick={mockOnClick}&gt;Click me&lt;/Button&gt;);

  await user.click(screen.getByText('Click me'));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
</code></pre>

<h4>3) Testing different scenarios</h4>

<h5>Props and state</h5>
<pre><code>function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Test
test('displays initial count', () => {
  render(&lt;Counter initialCount={5} /&gt;);
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});

test('increments count on button click', async () => {
  const user = userEvent.setup();
  render(&lt;Counter /&gt;);

  await user.click(screen.getByText('Increment'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
</code></pre>

<h5>Async operations</h5>
<pre><code>function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;
  return &lt;div&gt;{user.name}&lt;/div&gt;;
}

// Mock the API call
jest.mock('./api', () => ({
  fetchUser: jest.fn()
}));

import { fetchUser } from './api';

test('displays loading then user name', async () => {
  const mockUser = { name: 'John Doe' };
  fetchUser.mockResolvedValue(mockUser);

  render(&lt;UserProfile userId={1} /&gt;);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
</code></pre>

<h4>4) Testing custom hooks</h4>
<pre><code>import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('should use initial value', () => {
  const { result } = renderHook(() => useCounter(10));
  expect(result.current.count).toBe(10);
});
</code></pre>

<h4>5) Testing with context</h4>
<pre><code>const ThemeContext = createContext();

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return &lt;button onClick={toggleTheme}&gt;Current: {theme}&lt;/button&gt;;
}

// Test with custom wrapper
function renderWithTheme(ui, { theme = 'light', ...options } = {}) {
  const wrapper = ({ children }) => (
    &lt;ThemeContext.Provider value={{
      theme,
      toggleTheme: jest.fn()
    }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );

  return render(ui, { wrapper, ...options });
}

test('renders with theme', () => {
  renderWithTheme(&lt;ThemeButton /&gt;, { theme: 'dark' });
  expect(screen.getByText('Current: dark')).toBeInTheDocument();
});
</code></pre>
`,
    role: "middle",
    type: "testing-quality",
  },

  {
    question: "Integration test với React Testing Library?",
    answer: `
<h3>Integration Testing with RTL</h3>

<h4>1) What is integration testing?</h4>
<p>Tests how components work together, testing user interactions across multiple components.</p>

<h4>2) Testing a form submission</h4>
<pre><code>function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      /&gt;
      &lt;input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      /&gt;
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
}

// Test
test('submits form with user credentials', async () => {
  const user = userEvent.setup();
  const mockOnSubmit = jest.fn();

  render(&lt;LoginForm onSubmit={mockOnSubmit} /&gt;);

  // Fill out form
  await user.type(screen.getByPlaceholderText('Email'), 'user@example.com');
  await user.type(screen.getByPlaceholderText('Password'), 'password123');

  // Submit form
  await user.click(screen.getByText('Login'));

  expect(mockOnSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123'
  });
});
</code></pre>

<h4>3) Testing component interactions</h4>
<pre><code>function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    &lt;div&gt;
      &lt;AddTodoForm onAdd={addTodo} /&gt;
      &lt;FilterButtons filter={filter} onFilterChange={setFilter} /&gt;
      &lt;TodoList todos={filteredTodos} onToggle={toggleTodo} /&gt;
    &lt;/div&gt;
  );
}

// Integration test
test('user can add and filter todos', async () => {
  const user = userEvent.setup();
  render(&lt;TodoApp /&gt;);

  // Add todos
  await user.type(screen.getByPlaceholderText('Add todo'), 'Learn React');
  await user.click(screen.getByText('Add'));

  await user.type(screen.getByPlaceholderText('Add todo'), 'Write tests');
  await user.click(screen.getByText('Add'));

  // Mark first as completed
  await user.click(screen.getByText('Learn React'));

  // Filter to show only active
  await user.click(screen.getByText('Active'));

  // Should only show "Write tests"
  expect(screen.getByText('Write tests')).toBeInTheDocument();
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});
</code></pre>

<h4>4) Testing with mock APIs</h4>

<h5>Using MSW (Mock Service Worker)</h5>
<pre><code>// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]));
  }),

  rest.post('/api/users', (req, res, ctx) => {
    return res(ctx.json({ id: 3, name: req.body.name }));
  })
];

// src/setupTests.js
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
</code></pre>

<h5>Component test with MSW</h5>
<pre><code>function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;

  return (
    &lt;ul&gt;
      {users.map(user => (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

test('loads and displays users', async () => {
  render(&lt;UserList /&gt;);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
</code></pre>

<h4>5) Testing error states</h4>
<pre><code>// MSW error handler
rest.get('/api/users', (req, res, ctx) => {
  return res(ctx.status(500), ctx.json({ error: 'Server error' }));
});

// Test error handling
test('handles API errors gracefully', async () => {
  render(&lt;UserList /&gt;);

  await waitFor(() => {
    expect(screen.getByText('Failed to load users')).toBeInTheDocument();
  });
});
</code></pre>

<h4>6) Testing accessibility</h4>
<pre><code>import 'jest-axe/extend-expect';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(&lt;MyComponent /&gt;);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
</code></pre>
`,
    role: "middle",
    type: "testing-quality",
  },

  {
    question: "Test coverage và code quality tools?",
    answer: `
<h3>Test Coverage and Code Quality</h3>

<h4>1) Jest coverage configuration</h4>
<pre><code>// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/setupTests.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch"
  }
}
</code></pre>

<h4>2) Reading coverage reports</h4>

<h5>Coverage metrics</h5>
<ul>
  <li><b>Statements</b>: Percentage of statements executed</li>
  <li><b>Branches</b>: Percentage of if/else branches executed</li>
  <li><b>Functions</b>: Percentage of functions called</li>
  <li><b>Lines</b>: Percentage of lines executed</li>
</ul>

<h5>HTML coverage report</h5>
<pre><code>// Run coverage
npm run test:coverage

// Open coverage/lcov-report/index.html
// Shows which lines are covered/not covered
</code></pre>

<h4>3) Code quality tools</h4>

<h5>ESLint</h5>
<pre><code>// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn'
  }
};
</code></pre>

<h5>Prettier</h5>
<pre><code>// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}

// .prettierignore
node_modules
coverage
build
</code></pre>

<h5>Husky + lint-staged</h5>
<pre><code>// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests --passWithNoTests"
    ]
  }
}
</code></pre>

<h4>4) CI/CD integration</h4>

<h5>GitHub Actions</h5>
<pre><code>// .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v2
</code></pre>

<h4>5) Performance testing</h4>

<h5>React Testing Library performance</h5>
<pre><code>// Measure render performance
import { render } from '@testing-library/react';
import { Profiler } from 'react';

function onRender(id, phase, actualDuration) {
  console.log(\`\${id} \${phase} took \${actualDuration}ms\`);
}

test('component renders quickly', () => {
  render(
    &lt;Profiler id="test" onRender={onRender}&gt;
      &lt;ExpensiveComponent /&gt;
    &lt;/Profiler&gt;
  );
  // Assert duration is acceptable
});
</code></pre>

<h5>Bundle size monitoring</h5>
<pre><code>// webpack-bundle-analyzer
// Check bundle size doesn't exceed limits
// CI fails if bundle too large
</code></pre>

<h4>6) Accessibility testing</h4>

<h5>jest-axe</h5>
<pre><code>import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(&lt;MyComponent /&gt;);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
</code></pre>

<h5>Testing ARIA attributes</h5>
<pre><code>test('button has proper ARIA attributes', () => {
  render(&lt;CustomButton&gt;Click me&lt;/CustomButton&gt;);

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(button).toHaveAttribute('aria-controls', 'menu');
});
</code></pre>
`,
    role: "middle",
    type: "testing-quality",
  },

  {
    question: "E2E testing với Cypress hoặc Playwright?",
    answer: `
<h3>E2E Testing with Cypress/Playwright</h3>

<h4>1) Cypress basics</h4>
<pre><code>// cypress/integration/app.spec.js
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('loads the app', () => {
    cy.contains('Todo App').should('be.visible');
  });

  it('adds a new todo', () => {
    cy.get('[data-cy="todo-input"]').type('Learn Cypress');
    cy.get('[data-cy="add-todo"]').click();
    cy.get('[data-cy="todo-list"]').should('contain', 'Learn Cypress');
  });

  it('marks todo as complete', () => {
    // Add todo first
    cy.get('[data-cy="todo-input"]').type('Test completion');
    cy.get('[data-cy="add-todo"]').click();

    // Mark as complete
    cy.get('[data-cy="todo-item"]').first().find('[data-cy="toggle"]').click();
    cy.get('[data-cy="todo-item"]').first().should('have.class', 'completed');
  });
});
</code></pre>

<h4>2) Playwright basics</h4>
<pre><code>// tests/todo.spec.js
import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('loads the app', async ({ page }) => {
    await expect(page.locator('text=Todo App')).toBeVisible();
  });

  test('adds a new todo', async ({ page }) => {
    await page.fill('[data-testid="todo-input"]', 'Learn Playwright');
    await page.click('[data-testid="add-todo"]');
    await expect(page.locator('[data-testid="todo-list"]'))
      .toContainText('Learn Playwright');
  });
});
</code></pre>

<h4>3) Advanced patterns</h4>

<h5>Custom commands (Cypress)</h5>
<pre><code>// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="submit"]').click();
  cy.url().should('not.include', '/login');
});

// Usage
cy.login('user@example.com', 'password');
</code></pre>

<h5>Page Object Model (Playwright)</h5>
<pre><code>// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.submitButton = page.locator('[data-testid="submit"]');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForURL('**/dashboard');
  }
}

export { LoginPage };

// Usage
test('user login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@example.com', 'password');
});
</code></pre>

<h4>4) API testing</h4>

<h5>Cypress API testing</h5>
<pre><code>it('creates a user via API', () => {
  cy.request('POST', '/api/users', {
    name: 'John Doe',
    email: 'john@example.com'
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('id');
  });
});

it('tests full user flow', () => {
  // Create user via API
  cy.request('POST', '/api/users', {
    name: 'Jane Doe',
    email: 'jane@example.com'
  }).then((response) => {
    const userId = response.body.id;

    // Visit the app
    cy.visit('/');

    // Interact with UI
    cy.contains('Jane Doe').should('be.visible');
  });
});
</code></pre>

<h5>Playwright API testing</h5>
<pre><code>test('API integration', async ({ request }) => {
  // Create user
  const response = await request.post('/api/users', {
    data: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });

  expect(response.ok()).toBeTruthy();
  const user = await response.json();

  // Visit page and check UI
  await page.goto('/');
  await expect(page.locator(\`text=\${user.name}\`)).toBeVisible();
});
</code></pre>

<h4>5) Visual testing</h4>

<h5>Visual regression with Cypress</h5>
<pre><code>// cypress/plugins/index.js
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};

// In test
cy.visit('/dashboard');
cy.matchImageSnapshot('dashboard');
</code></pre>

<h5>Playwright visual comparison</h5>
<pre><code>test('visual regression', async ({ page }) => {
  await page.goto('/dashboard');

  // Take screenshot
  await expect(page).toHaveScreenshot('dashboard.png', {
    threshold: 0.2 // Allow 20% difference
  });
});
</code></pre>

<h4>6) CI/CD integration</h4>

<h5>Cypress in CI</h5>
<pre><code>// cypress.json
{
  "video": false,
  "screenshotOnRunFailure": false
}

// package.json
{
  "scripts": {
    "cy:run": "cypress run --record --parallel",
    "cy:run:ci": "cypress run --config video=false"
  }
}
</code></pre>

<h5>Playwright in CI</h5>
<pre><code>// playwright.config.js
export default {
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
};
</code></pre>
`,
    role: "middle",
    type: "testing-quality",
  },

  {
    question: "Debugging và troubleshooting tests?",
    answer: `
<h3>Debugging and Troubleshooting Tests</h3>

<h4>1) Common test failures</h4>

<h5>Async operations not awaited</h5>
<pre><code>// ❌ Wrong
test('data loads', () => {
  render(&lt;DataComponent /&gt;);
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});

// ✅ Correct
test('data loads', async () => {
  render(&lt;DataComponent /&gt;);
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
</code></pre>

<h5>Act warnings</h5>
<pre><code>// When testing state updates
import { act } from '@testing-library/react';

test('updates state', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
</code></pre>

<h4>2) Debugging techniques</h4>

<h5>Debug output</h5>
<pre><code>test('debug component', () => {
  const { container } = render(&lt;MyComponent /&gt;);

  // Log the DOM structure
  screen.debug();

  // Log specific element
  const button = screen.getByRole('button');
  console.log(button.outerHTML);
});
</code></pre>

<h5>Interactive debugging</h5>
<pre><code>// Add debugger statement
test('debug step by step', () => {
  render(&lt;MyComponent /&gt;);
  debugger; // Browser dev tools will pause here
  expect(screen.getByText('expected text')).toBeInTheDocument();
});
</code></pre>

<h4>3) Mocking issues</h4>

<h5>Incorrect mock setup</h5>
<pre><code>// ❌ Mock returns undefined
jest.mock('./api', () => ({
  fetchData: () => undefined // Should return Promise
}));

// ✅ Correct mock
jest.mock('./api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'mocked' })
}));
</code></pre>

<h5>Cleanup between tests</h5>
<pre><code>beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup(); // From @testing-library/react
});
</code></pre>

<h4>4) Flaky tests</h4>

<h5>Timing issues</h5>
<pre><code>// ❌ Race condition
test('async operation', () => {
  render(&lt;AsyncComponent /&gt;);
  setTimeout(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  }, 100);
});

// ✅ Proper async testing
test('async operation', async () => {
  render(&lt;AsyncComponent /&gt;);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
</code></pre>

<h5>Random data in tests</h5>
<pre><code>// Use seeded random or fixed values
const mockData = {
  id: 1,
  name: 'Test User',
  timestamp: new Date('2023-01-01').toISOString()
};
</code></pre>

<h4>5) Component testing issues</h4>

<h5>Missing context providers</h5>
<pre><code>// Create test wrapper
const TestWrapper = ({ children }) => (
  &lt;ThemeProvider&gt;
    &lt;Router&gt;
      {children}
    &lt;/Router&gt;
  &lt;/ThemeProvider&gt;
);

test('component with context', () => {
  render(&lt;MyComponent /&gt;, { wrapper: TestWrapper });
});
</code></pre>

<h5>Testing error boundaries</h5>
<pre><code>const ErrorComponent = () => {
  throw new Error('Test error');
};

test('error boundary catches errors', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    &lt;ErrorBoundary&gt;
      &lt;ErrorComponent /&gt;
    &lt;/ErrorBoundary&gt;
  );

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();

  spy.mockRestore();
});
</code></pre>

<h4>6) Performance testing</h4>

<h5>Slow tests</h5>
<pre><code>// Increase timeout for slow tests
test('slow async operation', async () => {
  // ... test code
}, 10000); // 10 second timeout

// Or configure globally in jest.config.js
module.exports = {
  testTimeout: 10000
};
</code></pre>

<h5>Memory leaks</h5>
<pre><code>// Test cleanup
afterEach(() => {
  // Clear any global state
  // Unmount components
  // Clear localStorage/sessionStorage
  // Reset mocks
});
</code></pre>

<h4>7) CI/CD debugging</h4>

<h5>Test artifacts</h5>
<pre><code>// Save screenshots/videos on failure
test('visual test', async ({ page }) => {
  try {
    // Test code
  } catch (error) {
    await page.screenshot({ path: 'failure.png' });
    throw error;
  }
});
</code></pre>

<h5>Conditional logic for CI</h5>
<pre><code>// Run different tests in different environments
const isCI = process.env.CI;

test.skip(isCI, 'skip in CI', () => {
  // Test that only runs locally
});
</code></pre>
`,
    role: "middle",
    type: "testing-quality",
  },
]

export default testQuality
