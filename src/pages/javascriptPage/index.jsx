import { Button, Card, Checkbox, Col, Row } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import QAJavascriptJunior from "../../data/QAJavascriptJunior";
import QAJavascriptMiddle from "../../data/QAJavascriptMiddle";
import QAJavascriptSenior from "../../data/QAJavascriptSenior";

function JavascriptPage() {
  const [roles, setRoles] = useState({
    senior: false,
    middle: false,
    junior: true,
  });

  const navigate = useNavigate();

  const roleToExperienceLabel = {
    junior: "1-2 năm",
    middle: "3-5 năm",
    senior: "6+ năm",
  };

  const questionsByRole = useMemo(() => {
    return {
      junior: QAJavascriptJunior,
      middle: QAJavascriptMiddle,
      senior: QAJavascriptSenior,
    };
  }, []);

  const selectedRoles = useMemo(
    () =>
      Object.entries(roles)
        .filter(([, checked]) => checked)
        .map(([role]) => role),
    [roles]
  );

  const questions = useMemo(() => {
    const out = [];
    if (roles.junior) out.push(...questionsByRole.junior);
    if (roles.middle) out.push(...questionsByRole.middle);
    if (roles.senior) out.push(...questionsByRole.senior);

    if (out.length === 0) return questionsByRole.junior;
    return out;
  }, [roles, questionsByRole]);

  const handlePracticeClick = () => {
    const rolesParam = selectedRoles.length > 0 ? selectedRoles.join(",") : "junior";
    navigate(`/javascript/practice?roles=${rolesParam}`);
  };

  return (
    <>
      <style>{`
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
        .filter-section {
          padding: 1rem 1.5rem 0.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          background: rgba(249, 250, 251, 0.5);
        }
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
      `}</style>

      <div className="page-container">
        <div className="hero-header">
          <h1 className="hero-title">JavaScript Knowledge</h1>
          <p className="hero-subtitle">Master JS concepts with interactive practice</p>
          <p className="hero-description">Chọn level (tương đương 1-2/3-5/6+ năm) và luyện tập</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="filter-section">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">Chọn số năm kinh nghiệm</div>
              <Button className="practice-button" size="small" onClick={handlePracticeClick} icon={<PlayCircleOutlined />}>
                {questions.length}
              </Button>
            </div>
            <div className="text-sm font-semibold mt-2">
              Đang chọn:{" "}
              {selectedRoles.length > 0
                ? selectedRoles.map((r) => roleToExperienceLabel[r] || r).join(", ")
                : roleToExperienceLabel.junior}
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
            {[
              { role: "junior", label: roleToExperienceLabel.junior, className: "junior-label" },
              { role: "middle", label: roleToExperienceLabel.middle, className: "middle-label" },
              { role: "senior", label: roleToExperienceLabel.senior, className: "senior-label" },
            ].map((levelCard) => {
              const levelQuestions = questionsByRole[levelCard.role];
              return (
                <Col xs={24} sm={12} lg={8} key={levelCard.role}>
                  <Card
                    className="topic-card"
                    bordered={false}
                    title={
                      <div>
                        <div className="card-title">
                          <span className={levelCard.className}>{levelCard.label}</span>
                        </div>
                        <div className="card-description">{levelQuestions.length} câu hỏi</div>
                      </div>
                    }
                    extra={
                      <Checkbox
                        checked={roles[levelCard.role]}
                        onChange={(e) => setRoles((prev) => ({ ...prev, [levelCard.role]: e.target.checked }))}
                        size="small"
                        className="level-checkbox"
                      />
                    }
                  >
                    <div className="questions-list">
                      {levelQuestions.slice(0, 10).map((ele, index) => (
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

export default JavascriptPage;
