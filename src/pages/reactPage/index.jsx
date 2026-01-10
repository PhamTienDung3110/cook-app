import { Button, Card, Col, Row } from "antd";
import QnAReact from "../../data/QAReact";
import { Link } from "react-router-dom";

function ReactPage() {
  // Định nghĩa các chủ đề với tên hiển thị ngắn gọn
  const topics = [
    {
      key: "react-rendering",
      title: "Rendering",
      description: "Reconciliation, Virtual DOM, Hydration, StrictMode"
    },
    {
      key: "hooks-advanced",
      title: "Hooks",
      description: "useEffect, useLayoutEffect, Custom Hooks, Closures"
    },
    {
      key: "performance-optimization",
      title: "Performance",
      description: "Memoization, Virtualization, Profiling, Bundle analysis"
    },
    {
      key: "data-fetching",
      title: "Data Fetching",
      description: "React Query, RTK Query, Server vs Client fetching"
    },
    {
      key: "state-management",
      title: "State Management",
      description: "Redux, Zustand, Context, State design patterns"
    },
    {
      key: "auth-security",
      title: "Security",
      description: "XSS, CSRF, JWT, Role-based auth, Cookies"
    },
    {
      key: "testing-quality",
      title: "Testing",
      description: "Unit tests, Integration tests, E2E, Test pyramid"
    },
    {
      key: "architecture-leadership",
      title: "Architecture",
      description: "Code review, Refactoring, Tech debt, Tech stack decisions"
    },
    {
      key: "system-design",
      title: "System Design",
      description: "Frontend architecture, Performance optimization, Migrations"
    }
  ];

  return (
    <div className="mx-10">
      <h2 className="text-bold text-3xl mt-5 text-center mb-10">React</h2>
      <Row gutter={16}>
        {topics.map((topic) => {
          const questions = QnAReact.filter(q => q.type === topic.key);
          return (
            <Col span={8} key={topic.key} className="mb-4">
              <Card
                title={
                  <div>
                    <div className="font-bold text-xl">{topic.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{topic.description}</div>
                  </div>
                }
                bordered={false}
                extra={
                  <Link to={`/react/practice/${topic.key}`}>
                    <Button type="primary">Practice ({questions.length})</Button>
                  </Link>
                }
                className="h-full"
              >
                <div className="max-h-60 overflow-y-auto">
                  {questions.map((ele, index) => (
                    <p className="font-medium text-sm mb-2" key={ele.question}>
                      {index + 1}. {ele.question}
                    </p>
                  ))}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ReactPage;
