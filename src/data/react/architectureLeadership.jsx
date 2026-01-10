export const architectureLeadership = [
  // =================== ARCHITECTURE & LEADERSHIP ===================
  {
    question: "Bạn review code React theo tiêu chí nào?",
    answer: `
  <h5>Code Review Criteria cho React</h2>
  
  <h5>Functional Correctness</h2>
  
  <h5>1. Requirements</h3>
  <ul>
    <li>Implements specified requirements?</li>
    <li>Handles edge cases properly?</li>
    <li>Error handling adequate?</li>
  </ul>
  
  <h5>2. Logic</h3>
  <ul>
    <li>Business logic correct?</li>
    <li>Algorithm efficiency appropriate?</li>
    <li>No logical bugs?</li>
  </ul>
  
  <h5>Code Quality</h2>
  
  <h5>1. React Best Practices</h3>
  <ul>
    <li>Proper hooks usage?</li>
    <li>Components appropriately sized?</li>
    <li>Keys được sử dụng đúng trong lists?</li>
  </ul>
  
  <h5>2. Performance</h3>
  <ul>
    <li>Unnecessary re-renders avoided?</li>
    <li>Memoization used appropriately?</li>
    <li>Large data structures optimized?</li>
  </ul>
  
  <h5>3. Security</h3>
  <ul>
    <li>XSS prevention (dangerouslySetInnerHTML)?</li>
    <li>Input sanitization?</li>
    <li>Authentication checks?</li>
  </ul>
  
  <h5>Maintainability</h2>
  
  <h5>1. Readability</h3>
  <ul>
    <li>Clear variable/function names?</li>
    <li>Well-structured components?</li>
    <li>Comments cho logic phức tạp?</li>
  </ul>
  
  <h5>2. Testing</h3>
  <ul>
    <li>Unit tests written?</li>
    <li>Test coverage adequate?</li>
    <li>Tests meaningful?</li>
  </ul>
  
  <h5>3. Architecture</h3>
  <ul>
    <li>Follows project conventions?</li>
    <li>Separation of concerns (tách biệt concerns)?</li>
    <li>Reusable components extracted?</li>
  </ul>
  `,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Refactor lớn nên làm thế nào để an toàn?",
    answer: `
  <h5>Safe Large-scale Refactoring</h2>
  
  <h5>Preparation</h2>
  
  <h5>1. Comprehensive Testing</h3>
  <ul>
    <li>Unit tests cho tất cả components</li>
    <li>Integration tests cho critical flows</li>
    <li>E2E tests cho user journeys</li>
  </ul>
  
  <h5>2. Feature Flags</h3>
  <pre><code>// Gradual rollout
  const NEW_FEATURE = process.env.REACT_APP_NEW_UI;
  
  return NEW_FEATURE ? &lt;NewComponent /&gt; : &lt;OldComponent /&gt;;
  </code></pre>
  
  <h5>3. Code Analysis</h3>
  <ul>
    <li>Identify dependencies</li>
    <li>Impact analysis</li>
    <li>Risk assessment</li>
  </ul>
  
  <h5>Execution Strategy</h2>
  
  <h5>1. Incremental Changes</h3>
  <ul>
    <li>Break into small PRs</li>
    <li>Test each change</li>
    <li>Deploy frequently</li>
  </ul>
  
  <h5>2. Parallel Development</h3>
  <pre><code>// Feature branch strategy
  main
  ├── refactor/ui-cleanup
  ├── refactor/state-management
  └── refactor/api-layer
  </code></pre>
  
  <h5>3. Backward Compatibility</h3>
  <ul>
    <li>Keep old APIs working</li>
    <li>Migration scripts</li>
    <li>Deprecation warnings</li>
  </ul>
  
  <h5>Risk Mitigation</h2>
  
  <h5>1. Rollback Plan</h3>
  <ul>
    <li>Quick revert capability</li>
    <li>Database backup</li>
    <li>Feature flag toggles</li>
  </ul>
  
  <h5>2. Monitoring</h3>
  <ul>
    <li>Error tracking (Sentry)</li>
    <li>Performance monitoring</li>
    <li>User feedback collection</li>
  </ul>
  
  <h5>3. Team Communication</h3>
  <ul>
    <li>Clear timeline</li>
    <li>Regular updates</li>
    <li>Stakeholder alignment</li>
  </ul>
  `,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Làm sao prevent performance regression?",
    answer: `
  <h5>Prevent Performance Regression</h2>
  
  <h5>Automated Monitoring</h2>
  
  <h5>1. Bundle Size Checks</h3>
  <pre><code>// package.json
  "bundlesize": {
    "maxSize": "500kB"
  }
  </code></pre>
  
  <h5>2. Lighthouse CI</h3>
  <pre><code>// GitHub Actions
  - name: Lighthouse
    uses: treosh/lighthouse-ci-action@v8
    với:
      urls: https://example.com
  </code></pre>
  
  <h5>3. Performance Budgets</h3>
  <pre><code>// webpack config
  performance: {
    hints: 'error',
    maxAssetSize: 500000,
    maxEntrypointSize: 500000
  }
  </code></pre>
  
  <h5>Code Quality Gates</h2>
  
  <h5>1. ESLint Rules</h3>
  <pre><code>// .eslintrc
  {
    "rules": {
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-key": "error"
    }
  }
  </code></pre>
  
  <h5>2. TypeScript Strict</h3>
  <ul>
    <li>Strict null checks</li>
    <li>No implicit any</li>
    <li>Exact optional properties</li>
  </ul>
  
  <h5>3. Bundle Analysis</h3>
  <pre><code>// Analyze bundle
  npm install --save-dev webpack-bundle-analyzer
  </code></pre>
  
  <h5>Development Practices</h2>
  
  <h5>1. Performance Reviews</h3>
  <ul>
    <li>Code review checklist</li>
    <li>Performance impact assessment</li>
    <li>Mentor junior developers</li>
  </ul>
  
  <h5>2. Profiling Sessions</h3>
  <ul>
    <li>Regular performance audits</li>
    <li>React DevTools usage</li>
    <li>Chrome DevTools training</li>
  </ul>
  `,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Khi nào technical debt nên được trả?",
    answer: `
  <h5>Khi Nào Trả Technical Debt</h2>
  
  <h5>High Priority (Pay Now)</h2>
  
  <h5>1. Security Vulnerabilities</h3>
  <ul>
    <li>XSS, CSRF exploits</li>
    <li>Outdated dependencies với known vulnerabilities</li>
    <li>Insecure authentication</li>
  </ul>
  
  <h5>2. Performance Issues</h3>
  <ul>
    <li>Core Web Vitals failing</li>
    <li>Memory leaks causing crashes</li>
    <li>Slow page loads affecting revenue</li>
  </ul>
  
  <h5>3. Breaking Changes</h3>
  <ul>
    <li>API deprecations</li>
    <li>Framework major version updates</li>
    <li>Browser compatibility issues</li>
  </ul>
  
  <h4>Ưu Tiên Trung Bình (Plan to Pay)</h4>
  
  <h5>1. Developer Experience</h3>
  <ul>
    <li>Slow build times</li>
    <li>Poor test coverage</li>
    <li>Complex deployment process</li>
  </ul>
  
  <h5>2. Scalability Concerns</h3>
  <ul>
    <li>Monolithic components</li>
    <li>Tight coupling</li>
    <li>Code khó test</li>
  </ul>
  
  <h5>3. Upcoming Changes</h3>
  <ul>
    <li>Planned feature requiring refactor</li>
    <li>Team expansion needs</li>
    <li>Technology migration</li>
  </ul>
  
  <h5>Low Priority (Track)</h2>
  
  <h5>1. Code Quality</h3>
  <ul>
    <li>Code duplication</li>
    <li>Missing TypeScript</li>
    <li>Outdated patterns</li>
  </ul>
  
  <h5>2. Minor Issues</h3>
  <ul>
    <li>Unused code</li>
    <li>Suboptimal implementations</li>
    <li>Technical preferences</li>
  </ul>
  
  <h5>Decision Framework</h2>
  <ul>
    <li><b>Impact</b>: How many users/developers affected?</li>
    <li><b>Chi Phí</b>: Effort để fix vs maintain</li>
    <li><b>Rủi Ro</b>: Khả năng gây problems</li>
    <li><b>Timeline</b>: Khi nào cần được fix?</li>
  </ul>
  `,
    role: "senior",
    type: "architecture-leadership",
  },
  {
    question: "Bạn quyết định tech stack dựa trên yếu tố gì?",
    answer: `
  <h5>Tech Stack Decision Factors</h2>
  
  <h5>Business Factors</h2>
  
  <h5>1. Company Goals</h3>
  <ul>
    <li>Yêu cầu time-to-market</li>
    <li>Scalability needs</li>
    <li>Budget constraints</li>
  </ul>
  
  <h5>2. Team Composition</h3>
  <ul>
    <li>Existing team skills</li>
    <li>Hiring availability</li>
    <li>Training costs</li>
  </ul>
  
  <h5>3. Market Position</h3>
  <ul>
    <li>Competitor technology</li>
    <li>Industry standards</li>
    <li>Regulatory requirements</li>
  </ul>
  
  <h5>Technical Factors</h2>
  
  <h5>1. Project Requirements</h3>
  <ul>
    <li>Performance needs</li>
    <li>Security requirements</li>
    <li>Integration needs</li>
  </ul>
  
  <h5>2. Ecosystem Maturity</h3>
  <ul>
    <li>Library stability</li>
    <li>Community support</li>
    <li>Documentation quality</li>
  </ul>
  
  <h5>3. Long-term Viability</h3>
  <ul>
    <li>Maintenance costs</li>
    <li>Upgrade path</li>
    <li>Rủi ro vendor lock-in</li>
  </ul>
  
  <h5>Team Factors</h2>
  
  <h5>1. Developer Experience</h3>
  <ul>
    <li>Learning curve</li>
    <li>Development speed</li>
    <li>Debugging tools</li>
  </ul>
  
  <h5>2. Organizational Factors</h3>
  <ul>
    <li>Company size</li>
    <li>Development culture</li>
    <li>Open source contribution</li>
  </ul>
  
  <h5>Decision Process</h2>
  <ol>
    <li><b>Define Requirements</b>: Functional & non-functional</li>
    <li><b>Đánh Giá Tùy Chọn</b>: POC/MVP cho shortlisted</li>
    <li><b>Risk Assessment</b>: Failure modes & mitigations</li>
    <li><b>Team Buy-in</b>: Tham gia stakeholders</li>
    <li><b>Document Decisions</b>: Why chosen, alternatives considered</li>
  </ol>
  `,
    role: "senior",
    type: "architecture-leadership",
  },
]