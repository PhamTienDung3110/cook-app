export const testQuality = [
  // =================== TESTING & QUALITY ===================
  {
    question: "Test pyramid là gì?",
    answer: `
  <h3>Testing Pyramid</h3>

  <h4>Cấu Trúc</h4>
  <p>Chiến lược testing với các loại test khác nhau ở các cấp độ khác nhau.</p>

  <h5>1. Unit Tests (Đáy)</h5>
  <ul>
    <li><b>Nhiều Nhất</b>: 70% số tests</li>
    <li><b>Nhanh</b>: Chạy trong milliseconds</li>
    <li><b>Cô Lập</b>: Test từng function riêng lẻ</li>
  </ul>

  <h5>2. Integration Tests (Giữa)</h5>
  <ul>
    <li><b>Coverage Trung Bình</b>: 20% số tests</li>
    <li><b>Tốc Độ Trung Bình</b>: Test tương tác giữa components</li>
    <li><b>Dependencies Thực</b>: Test với DB/API thực</li>
  </ul>

  <h5>3. E2E Tests (Đỉnh)</h5>
  <ul>
    <li><b>Ít Nhất</b>: 10% số tests</li>
    <li><b>Chậm Nhất</b>: Toàn bộ user journeys</li>
    <li><b>End-to-End</b>: Test toàn bộ workflows</li>
  </ul>
  
  <h4>React Testing</h4>

  <h5>Unit Tests</h5>
  <pre><code>// Jest + React Testing Library
  test('renders learn react link', () => {
    render(&lt;App /&gt;);
    expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });
  </code></pre>

  <h5>Integration Tests</h5>
  <pre><code>// Test component + API
  test('fetches and displays users', async () => {
    render(&lt;UserList /&gt;);
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
  </code></pre>

  <h5>E2E Tests</h5>
  <pre><code>// Cypress/Playwright
  it('completes user registration', () => {
    cy.visit('/register');
    cy.get('[data-cy=name]').type('John');
    cy.get('[data-cy=submit]').click();
  });
  </code></pre>
  `,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Khi nào không nên viết unit test?",
    answer: `
  <h3>Khi Nào KHÔNG Viết Unit Tests</h3>

  <h4>Không Đáng Để Làm</h4>
  
  <h5>1. Third-party Code</h4>
  <p>Testing library code (React, Lodash) - họ đã test.</p>
  
  <h5>Technical Implementation</h4>
  <p>Điều này yêu cầu cân nhắc kỹ lưỡng về performance và edge cases trong môi trường production.</p>
  
  <h5>2. Simple Getters/Setters</h3>
  <pre><code>// ❌ Trivial
  const user = { name: 'John' };
  expect(user.name).toBe('John');
  </code></pre>
  
  <h5>3. UI Libraries</h3>
  <p>Testing Material-UI components - vendor responsibility.</p>
  
  <h5>4. Generated Code</h3>
  <p>API clients, GraphQL types - auto-generated.</p>
  
  <h5>5. Configuration</h3>
  <p>Testing webpack config, environment setup.</p>
  
  <h5>Focus on Value</h2>
  
  <h5>Test Business Logic</h3>
  <pre><code>// ✅ Business rules
  const calculateTax = (income, brackets) => { /* complex logic */ };
  </code></pre>
  
  <h5>Test Error Handling</h3>
  <pre><code>// ✅ Edge cases
  expect(() => divide(1, 0)).toThrow();
  </code></pre>
  
  <h5>Test Integration Points</h3>
  <pre><code>// ✅ Component + hook integration
  const { result } = renderHook(() => useCustomHook());
  </code></pre>
  
  <h5>ROI Considerations</h2>
  <ul>
    <li><b>High Risk</b>: Critical business logic</li>
    <li><b>Frequent Changes</b>: Core features</li>
    <li><b>Complex Logic</b>: Algorithms, calculations</li>
  </ul>
  
  <h5>Alternative Testing</h2>
  <ul>
    <li><b>Integration Tests</b>: For complex flows</li>
    <li><b>E2E Tests</b>: For critical user journeys</li>
    <li><b>Manual Testing</b>: For UI polish</li>
  </ul>
  `,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Mock quá nhiều có hại không?",
    answer: `
  <h5>Mocking Overuse trong Testing</h2>
  
  <h5>Rủi Ro Của Quá Nhiều Mocks</h2>
  
  <h5>1. False Confidence</h4>
  <p>Tests pass nhưng production fails do mock ≠ real implementation.</p>
  
  <h5>Technical Implementation</h4>
  <p>Điều này yêu cầu cân nhắc kỹ lưỡng về performance và edge cases trong môi trường production.</p>
  
  <h5>2. Maintenance Burden</h3>
  <p>Mocks bị hỏng khi code thay đổi, dẫn đến maintenance test địa ngục.</p>
  
  <h5>3. Missing Integration Bugs</h3>
  <p>Mocks hide integration issues between components.</p>
  
  <h5>4. Test Brittleness</h3>
  <p>Tests fail khi có thay đổi không liên quan.</p>
  
  <h5>Mock Wisely</h2>
  
  <h5>Good Mocks</h3>
  <ul>
    <li><b>External APIs</b>: HTTP calls, databases</li>
    <li><b>Heavy Operations</b>: File I/O, expensive computations</li>
    <li><b>Unreliable Dependencies</b>: Third-party services</li>
  </ul>
  
  <h5>Avoid Over-mocking</h3>
  <ul>
    <li><b>Internal Functions</b>: Test real implementations</li>
    <li><b>Simple Logic</b>: Don't mock pure functions</li>
    <li><b>UI Components</b>: Use shallow rendering</li>
  </ul>
  
  <h5>Testing Strategies</h2>
  
  <h5>1. Contract Testing</h3>
  <pre><code>// Test API contracts, không phải implementations
  const mockAPI = {
    getUsers: jest.fn().mockResolvedValue(users)
  };
  </code></pre>
  
  <h5>2. Integration Testing</h3>
  <p>Test với real dependencies khi có thể.</p>
  
  <h5>3. Test Doubles</h3>
  <ul>
    <li><b>Dummies</b>: Passed but not used</li>
    <li><b>Stubs</b>: Return fixed values</li>
    <li><b>Mocks</b>: Verify interactions</li>
    <li><b>Spies</b>: Wrap real objects</li>
  </ul>
  `,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Test async component khó ở đâu?",
    answer: `
  <h5>Testing Async React Components</h2>
  
  <h5>Common Challenges</h2>
  
  <h5>1. Timing Issues</h4>
  <p>Tests run before async operations complete.</p>
  
  <h5>Technical Implementation</h4>
  <p>Điều này yêu cầu cân nhắc kỹ lưỡng về performance và edge cases trong môi trường production.</p>
  
  <pre><code>// ❌ Wrong
  test('loads data', () => {
    render(&lt;AsyncComponent /&gt;);
    expect(screen.getByText('data')).toBeInTheDocument(); // Fails immediately
  });
  </code></pre>
  
  <h5>2. Race Conditions</h3>
  <p>Multiple async operations interfere.</p>
  
  <h5>3. Cleanup</h3>
  <p>Async effects không được cleanup giữa các tests.</p>
  
  <h5>4. Error States</h3>
  <p>Testing error boundaries và error UI.</p>
  
  <h5>Solutions</h2>
  
  <h5>1. Async/Await với RTL</h3>
  <pre><code>// ✅ Correct
  test('loads data', async () => {
    render(&lt;AsyncComponent /&gt;);
    await waitFor(() => {
      expect(screen.getByText('data')).toBeInTheDocument();
    });
  });
  </code></pre>
  
  <h5>2. Mock API Calls</h3>
  <pre><code>const mockFetchUsers = jest.fn();
  jest.mock('./api', () => ({
    fetchUsers: mockFetchUsers
  }));
  </code></pre>
  
  <h5>3. Test Loading States</h3>
  <pre><code>mockFetchUsers.mockResolvedValueOnce(users);
  render(&lt;Component /&gt;);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  </code></pre>
  
  <h5>4. Error Testing</h3>
  <pre><code>mockFetchUsers.mockRejectedValueOnce(new Error('API Error'));
  render(&lt;Component /&gt;);
  await waitFor(() => {
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
  </code></pre>
  `,
    role: "senior",
    type: "testing-quality",
  },
  {
    question: "Snapshot test có thật sự hiệu quả?",
    answer: `
  <h5>Snapshot Testing Effectiveness</h2>
  
  <h5>Pros</h2>
  
  <h5>1. Quick Regression Detection</h3>
  <p>Catch unexpected UI changes automatically.</p>
  
  <h5>2. Zero Effort</h3>
  <p>Code tối thiểu để viết.</p>
  
  <h5>3. Component Coverage</h3>
  <p>Test entire component output.</p>
  
  <h5>Cons</h2>
  
  <h5>1. False Positives</h4>
  <p>Tests fail khi có thay đổi có chủ đích (new features, refactors).</p>
  
  <h5>Technical Implementation</h4>
  <p>Điều này yêu cầu cân nhắc kỹ lưỡng về performance và edge cases trong môi trường production.</p>
  
  <h5>2. No Logic Testing</h3>
  <p>Chỉ test output, không phải behavior.</p>
  
  <h5>3. Large Snapshots</h3>
  <p>Khó review large HTML diffs.</p>
  
  <h5>4. Brittle</h3>
  <p>Bị hỏng khi formatting changes, IDs, timestamps.</p>
  
  <h5>Best Practices</h2>
  
  <h5>1. Strategic Usage</h3>
  <ul>
    <li>Sử dụng cho <b>presentational components</b></li>
    <li>Tránh cho <b>dynamic content</b></li>
    <li>Kết hợp với <b>unit tests</b></li>
  </ul>
  
  <h5>2. Snapshot Management</h3>
  <pre><code>// Update snapshots intentionally
  jest --updateSnapshot
  
  // Hoặc inline snapshots cho diffs tốt hơn
  expect(tree).toMatchInlineSnapshot();
  </code></pre>
  
  <h5>3. Selective Testing</h3>
  <ul>
    <li>Test <b>stable components</b></li>
    <li>Avoid <b>third-party components</b></li>
    <li>Tập trung vào <b>custom UI</b></li>
  </ul>
  
  <h5>Alternatives</h2>
  <ul>
    <li><b>Visual Regression</b>: Percy, Chromatic</li>
    <li><b>Component Storybook</b>: Interactive testing</li>
    <li><b>Unit Tests</b>: Behavior testing</li>
  </ul>
  `,
    role: "senior",
    type: "testing-quality",
  },
]