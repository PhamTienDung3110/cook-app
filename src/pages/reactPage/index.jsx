import { Button, Card, Checkbox, Col, Row } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { QnAReact as QnAReactSenior } from "../../data/react/senior";
import { QnAReact as QnAReactMiddle } from "../../data/react/middle";

function ReactPage() {
  const [filterLevels, setFilterLevels] = useState({});
  const navigate = useNavigate();

  // Merge tất cả questions từ senior và middle
  const allQuestions = useMemo(() => {
    return [...QnAReactSenior, ...QnAReactMiddle];
  }, []);

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

  const handlePracticeClick = (topic) => {
    const topicFilters = getFilterLevels(topic.key);

    // Tạo danh sách roles được chọn
    const selectedRoles = [];
    if (topicFilters.senior) selectedRoles.push('senior');
    if (topicFilters.middle) selectedRoles.push('middle');
    if (topicFilters.junior) selectedRoles.push('junior');

    // Nếu không có role nào được chọn, mặc định chọn senior
    const rolesParam = selectedRoles.length > 0 ? selectedRoles.join(',') : 'senior';

    navigate(`/react/practice/${topic.key}?roles=${rolesParam}`);
  };

  const getFilterLevels = (topicKey) => {
    return filterLevels[topicKey] || {
      senior: true,
      middle: true,
      junior: false
    };
  };

  const handleFilterChange = (topicKey, level, checked) => {
    setFilterLevels(prev => ({
      ...prev,
      [topicKey]: {
        ...getFilterLevels(topicKey),
        [level]: checked
      }
    }));
  };

  return (
    <>
      <style>{`
        /* Gradient background */
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .page-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 2rem 1rem;
        }

        .hero-header {
          text-align: center;
          margin-bottom: 1rem;
          padding: 1rem 0;
        }

        .hero-title {
          margin-top: 0.5rem;
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.1);
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          margin-bottom: 0.5rem;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero-description {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        /* Enhanced card styling */
        .topic-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow:
            0 20px 40px rgba(0,0,0,0.1),
            0 8px 16px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out both;
          height: 100%;
          overflow: hidden;
        }

        .topic-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 32px 64px rgba(0,0,0,0.15),
            0 16px 32px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .card-header {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding: 1.5rem;
          border-radius: 20px 20px 0 0;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-description {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 400;
          line-height: 1.4;
        }

        .filter-section {
          padding: 1rem 1.5rem 0.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          background: rgba(249, 250, 251, 0.5);
        }

        .level-checkbox {
          display: inline-flex;
          align-items: center;
          margin-right: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          transition: all 0.2s ease;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .level-checkbox:hover {
          background: rgba(0,0,0,0.05);
        }

        .level-checkbox.ant-checkbox-wrapper-checked .ant-checkbox-inner {
          background: currentColor;
          border-color: currentColor;
        }

        .junior-label { color: #ea580c; }
        .middle-label { color: #16a34a; }
        .senior-label { color: #2563eb; }

        .practice-button {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          border: none !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
          transition: all 0.3s ease !important;
          font-weight: 600 !important;
        }

        .practice-button:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4) !important;
        }

        .questions-list {
          padding: 1rem 1.5rem;
          max-height: 280px;
          overflow-y: auto;
        }

        .question-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          color: #374151;
          font-size: 0.875rem;
          line-height: 1.4;
          transition: all 0.2s ease;
        }

        .question-item:hover {
          color: #1f2937;
          background: rgba(102, 126, 234, 0.05);
          padding-left: 0.5rem;
          margin-left: -0.5rem;
          border-radius: 6px;
        }

        .question-number {
          font-weight: 600;
          color: #6b7280;
          margin-right: 0.5rem;
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.5);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .topic-card:nth-child(1) { animation-delay: 0.1s; }
        .topic-card:nth-child(2) { animation-delay: 0.2s; }
        .topic-card:nth-child(3) { animation-delay: 0.3s; }
        .topic-card:nth-child(4) { animation-delay: 0.4s; }
        .topic-card:nth-child(5) { animation-delay: 0.5s; }
        .topic-card:nth-child(6) { animation-delay: 0.6s; }
        .topic-card:nth-child(7) { animation-delay: 0.7s; }
        .topic-card:nth-child(8) { animation-delay: 0.8s; }
        .topic-card:nth-child(9) { animation-delay: 0.9s; }

        /* Responsive design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .topic-card {
            margin-bottom: 1.5rem;
          }

          .filter-section {
            padding: 0.75rem 1rem;
          }

          .questions-list {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>

      <div className="page-container">
        <div className="hero-header">
          <h1 className="hero-title">ReactJS Knowledge</h1>
          <p className="hero-subtitle">Master React concepts with interactive practice sessions</p>
          <p className="hero-description">Choose your skill level and dive deep into React fundamentals, advanced patterns, and best practices</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Row gutter={[24, 24]}>
            {topics.map((topic) => {
              const topicFilters = getFilterLevels(topic.key);

              // Lọc câu hỏi theo level được chọn cho topic này
              const questions = allQuestions.filter(q => {
                if (q.type !== topic.key) return false;

                if (topicFilters.senior && (!q.role || q.role === "senior")) return true;
                if (topicFilters.middle && q.role === "middle") return true;
                if (topicFilters.junior && q.role === "junior") return true;

                return false;
              });

              return (
                <Col xs={24} sm={12} lg={8} key={topic.key}>
                  <Card
                    className="topic-card"
                    title={
                      <div>
                        <div className="card-title">{topic.key}</div>
                        <div className="card-description">{topic.description}</div>
                      </div>
                    }
                    bordered={false}
                    extra={
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Checkbox
                            checked={topicFilters.junior}
                            onChange={(e) => handleFilterChange(topic.key, 'junior', e.target.checked)}
                            size="small"
                            className="level-checkbox"
                          >
                            <span className="junior-label">Junior</span>
                          </Checkbox>
                          <Checkbox
                            checked={topicFilters.middle}
                            onChange={(e) => handleFilterChange(topic.key, 'middle', e.target.checked)}
                            size="small"
                            className="level-checkbox"
                          >
                            <span className="middle-label">Middle</span>
                          </Checkbox>
                          <Checkbox
                            checked={topicFilters.senior}
                            onChange={(e) => handleFilterChange(topic.key, 'senior', e.target.checked)}
                            size="small"
                            className="level-checkbox"
                          >
                            <span className="senior-label">Senior</span>
                          </Checkbox>
                        </div>
                        <Button
                          className="practice-button"
                          size="small"
                          onClick={() => handlePracticeClick(topic)}
                          icon={<PlayCircleOutlined />}
                        >
                          {questions.length}
                        </Button>
                      </div>
                    }
                  >
                    <div className="mb-1">
                      <div className="text-xl font-mono font-bold text-black bg-gray-100 px-2 rounded inline-block">{topic.key}</div>
                    </div>
                    <div className="questions-list">
                      {questions.map((ele, index) => (
                        <div className="question-item" key={ele.question}>
                          <span className="question-number">{index + 1}.</span>
                          {ele.question}
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default ReactPage;