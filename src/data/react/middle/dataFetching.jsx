// dataFetching.js
// Data Fetching Q&A (Middle)
// NOTE: answer content is HTML string (sanitize before injecting if needed)

export const dataFetching = [
  {
    question: "useEffect để fetch data như thế nào?",
    answer: `
<h3>useEffect for Data Fetching</h3>

<h4>1) Basic data fetching</h4>
<pre><code>import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  if (error) return &lt;div&gt;Error: {error}&lt;/div&gt;;
  return &lt;div&gt;{user.name}&lt;/div&gt;;
}
</code></pre>

<h4>2) Cleanup to prevent memory leaks</h4>
<pre><code>useEffect(() => {
  let isMounted = true;

  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      if (isMounted) {
        setData(data);
      }
    } catch (error) {
      if (isMounted) {
        setError(error);
      }
    }
  }

  fetchData();

  return () => {
    isMounted = false; // Cleanup
  };
}, []);
</code></pre>

<h4>3) Error handling patterns</h4>
<ul>
  <li><b>Loading state</b>: Show spinner/skeleton</li>
  <li><b>Error state</b>: Display error message with retry option</li>
  <li><b>Retry logic</b>: Allow users to retry failed requests</li>
  <li><b>Network error vs server error</b>: Different handling</li>
</ul>

<h4>4) Race conditions</h4>
<pre><code>// Prevent race conditions with abort controller
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchData() {
    try {
      const response = await fetch('/api/search?q=' + query, { signal });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  }

  fetchData();

  return () => controller.abort(); // Cancel on cleanup
}, [query]);
</code></pre>
`,
    role: "middle",
    type: "data-fetching",
  },

  {
    question: "React Query (TanStack Query) cơ bản?",
    answer: `
<h3>React Query Basics</h3>

<h4>1) Setup</h4>
<pre><code>import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    &lt;QueryClientProvider client={queryClient}&gt;
      &lt;MyComponents /&gt;
    &lt;/QueryClientProvider&gt;
  );
}
</code></pre>

<h4>2) useQuery hook</h4>
<pre><code>import { useQuery } from '@tanstack/react-query';

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  });

  if (isLoading) return &lt;div&gt;Loading...&lt;/div&gt;;
  if (error) return &lt;div&gt;Error: {error.message}&lt;/div&gt;;

  return (
    &lt;ul&gt;
      {data.map(todo => (
        &lt;li key={todo.id}&gt;{todo.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre>

<h4>3) useMutation hook</h4>
<pre><code>import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo) => fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (todo) => {
    mutation.mutate(todo);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input /&gt;
      &lt;button type="submit" disabled={mutation.isPending}&gt;
        {mutation.isPending ? 'Adding...' : 'Add Todo'}
      &lt;/button&gt;
    &lt;/form&gt;
  );
}
</code></pre>

<h4>4) Key features</h4>

<h5>Caching</h5>
<ul>
  <li>Automatic caching of server data</li>
  <li>Background refetching</li>
  <li>Cache invalidation</li>
</ul>

<h5>Loading & error states</h5>
<ul>
  <li><b>isLoading</b>: Initial loading</li>
  <li><b>isFetching</b>: Background refetching</li>
  <li><b>isError</b>: Error state</li>
  <li><b>isSuccess</b>: Success state</li>
</ul>

<h5>Query keys</h5>
<pre><code>// Good: descriptive keys
useQuery({
  queryKey: ['todos', { status: 'completed' }],
  queryFn: fetchCompletedTodos,
});

// Bad: generic keys
useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
});
</code></pre>
`,
    role: "middle",
    type: "data-fetching",
  },

  {
    question: "REST API error handling trong React?",
    answer: `
<h3>REST API Error Handling</h3>

<h4>1) HTTP status codes</h4>
<pre><code>async function fetchData() {
  try {
    const response = await fetch('/api/data');

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Bad Request - Invalid data');
        case 401:
          throw new Error('Unauthorized - Please login');
        case 403:
          throw new Error('Forbidden - Insufficient permissions');
        case 404:
          throw new Error('Not Found - Resource does not exist');
        case 500:
          throw new Error('Server Error - Try again later');
        default:
          throw new Error(\`HTTP Error: \${response.status}\`);
      }
    }

    return await response.json();
  } catch (error) {
    // Handle network errors, parsing errors, etc.
    console.error('Fetch error:', error);
    throw error;
  }
}
</code></pre>

<h4>2) Error boundary component</h4>
<pre><code>class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        &lt;div className="error-boundary"&gt;
          &lt;h2&gt;Something went wrong&lt;/h2&gt;
          &lt;button onClick={() => this.setState({ hasError: false, error: null })}&gt;
            Try again
          &lt;/button&gt;
        &lt;/div&gt;
      );
    }

    return this.props.children;
  }
}
</code></pre>

<h4>3) Retry logic</h4>
<pre><code>function useRetry(callback, maxRetries = 3) {
  const [retryCount, setRetryCount] = useState(0);

  const execute = async () => {
    try {
      const result = await callback();
      setRetryCount(0); // Reset on success
      return result;
    } catch (error) {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** retryCount));
        return execute();
      }
      throw error;
    }
  };

  return execute;
}
</code></pre>

<h4>4) User-friendly error messages</h4>
<pre><code>function getErrorMessage(error) {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error - Please check your connection';
  }

  if (error.status === 401) {
    return 'Session expired - Please login again';
  }

  if (error.status >= 500) {
    return 'Server is temporarily unavailable - Try again later';
  }

  return error.message || 'An unexpected error occurred';
}
</code></pre>

<h4>5) Loading states</h4>
<pre><code>function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Render based on states
}
</code></pre>
`,
    role: "middle",
    type: "data-fetching",
  },

  {
    question: "Axios vs Fetch API trong React?",
    answer: `
<h3>Axios vs Fetch API</h3>

<h4>1) Fetch API (built-in)</h4>
<pre><code>// Basic usage
fetch('/api/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

// With async/await
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed to fetch');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
}
</code></pre>

<h4>2) Axios</h4>
<pre><code>import axios from 'axios';

// Basic usage
axios.get('/api/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// With async/await
async function fetchUsers() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

// POST request
const newUser = { name: 'John', email: 'john@example.com' };
const response = await axios.post('/api/users', newUser);
</code></pre>

<h4>3) Key differences</h4>

<h5>Response handling:</h5>
<ul>
  <li><b>Fetch</b>: Manual status checking, response.json()</li>
  <li><b>Axios</b>: Automatic JSON parsing, built-in error handling</li>
</ul>

<h5>Error handling:</h5>
<ul>
  <li><b>Fetch</b>: Only rejects on network errors</li>
  <li><b>Axios</b>: Rejects on both network and HTTP errors</li>
</ul>

<h5>Request configuration:</h5>
<ul>
  <li><b>Fetch</b>: Headers in separate object</li>
  <li><b>Axios</b>: Everything in config object</li>
</ul>

<h4>4) When to use which?</h4>

<h5>Use Fetch:</h5>
<ul>
  <li>No extra dependencies wanted</li>
  <li>Simple GET requests</li>
  <li>Modern browsers only</li>
</ul>

<h5>Use Axios:</h5>
<ul>
  <li>Complex request configuration</li>
  <li>Automatic JSON handling</li>
  <li>Request/response interceptors</li>
  <li>Advanced error handling</li>
  <li>Cancel requests (AbortController)</li>
</ul>

<h4>5) Axios interceptors</h4>
<pre><code>// Request interceptor
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);
</code></pre>
`,
    role: "middle",
    type: "data-fetching",
  },

  {
    question: "Optimistic updates trong React?",
    answer: `
<h3>Optimistic Updates</h3>

<h4>1) What is optimistic update?</h4>
<p>Update UI immediately assuming the operation will succeed, then revert if it fails.</p>

<h4>2) Basic implementation</h4>
<pre><code>function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (text) => {
    const tempId = Date.now(); // Temporary ID

    // Optimistic update
    const optimisticTodo = { id: tempId, text, completed: false };
    setTodos(prev => [...prev, optimisticTodo]);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const realTodo = await response.json();

      // Replace with real data
      setTodos(prev =>
        prev.map(todo =>
          todo.id === tempId ? realTodo : todo
        )
      );
    } catch (error) {
      // Revert on error
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      alert('Failed to add todo');
    }
  };

  // ... render todos
}
</code></pre>

<h4>3) With React Query</h4>
<pre><code>import { useMutation, useQueryClient } from '@tanstack/react-query';

function TodoList() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodoToServer,
    onMutate: async (newTodo) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update
      queryClient.setQueryData(['todos'], old => [...old, newTodo]);

      // Return context with snapshotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      // Revert to snapshot on error
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
</code></pre>

<h4>4) When to use optimistic updates?</h4>

<h5>Good for:</h5>
<ul>
  <li>Fast user interactions (likes, follows, adds to cart)</li>
  <li>High-confidence operations</li>
  <li>Good network conditions</li>
</ul>

<h5>Not good for:</h5>
<ul>
  <li>Critical operations (payments, deletions)</li>
  <li>Unreliable networks</li>
  <li>Complex business logic</li>
</ul>

<h4>5) Handling conflicts</h4>
<pre><code>// Server returns conflict
onError: (error, variables, context) => {
  if (error.status === 409) { // Conflict
    // Show conflict resolution UI
    setConflictedItem(variables);
  } else {
    // Revert normally
    queryClient.setQueryData(['todos'], context.previousTodos);
  }
}
</code></pre>

<h4>6) Loading states</h4>
<pre><code>function TodoItem({ todo, onToggle }) {
  const [optimisticCompleted, setOptimisticCompleted] = useState(todo.completed);

  const handleToggle = async () => {
    setOptimisticCompleted(!optimisticCompleted);
    try {
      await onToggle(todo.id);
    } catch (error) {
      setOptimisticCompleted(todo.completed); // Revert
    }
  };

  return (
    &lt;li className={optimisticCompleted ? 'completed' : ''}&gt;
      &lt;input
        type="checkbox"
        checked={optimisticCompleted}
        onChange={handleToggle}
      /&gt;
      {todo.text}
    &lt;/li&gt;
  );
}
</code></pre>
`,
    role: "middle",
    type: "data-fetching",
  },
]

export default dataFetching
