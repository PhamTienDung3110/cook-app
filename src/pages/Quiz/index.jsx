import { useState, useMemo, useRef } from "react";
import { Button, Card, Progress, Radio, Collapse, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined, TrophyOutlined } from "@ant-design/icons";
import quizData from "../../data/react_frontend_150_questions.json";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function QuizPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const questionRefs = useRef([]);

  const startQuiz = () => {
    const data = Array.isArray(quizData) ? quizData : (quizData?.default || []);
    const shuffled = shuffleArray(data).map((q) => ({
      ...q,
      options: shuffleArray(q.options || []),
    }));
    setShuffledQuestions(shuffled);
    setAnswers({});
    setIsSubmitted(false);
    setHasStarted(true);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const results = useMemo(() => {
    if (!isSubmitted || shuffledQuestions.length === 0) return null;
    let correct = 0;
    let wrong = 0;
    const details = shuffledQuestions.map((q, idx) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correct++;
      else wrong++;
      return {
        key: q.id,
        index: idx + 1,
        question: q.question,
        userAnswer: userAnswer ?? "(Chưa chọn)",
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });
    const score = Math.round((correct / shuffledQuestions.length) * 100);
    return { correct, wrong, score, details };
  }, [isSubmitted, shuffledQuestions, answers]);

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Card
            className="shadow-2xl border-0 overflow-hidden quiz-landing-card"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
              borderRadius: "16px",
            }}
          >
            <div className="text-center py-6 sm:py-8 px-4 sm:px-6">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-100 text-indigo-600 mb-4 sm:mb-6">
                <TrophyOutlined className="text-3xl sm:text-4xl" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                Bài thi React Frontend
              </h1>
              <p className="text-slate-600 mb-4 sm:mb-6 text-base sm:text-lg">
                150 câu trắc nghiệm - Kiểm tra kiến thức của bạn
              </p>
              <ul className="text-left max-w-md mx-auto space-y-2 text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
                <li>• Câu hỏi và đáp án được đảo thứ tự mỗi lần làm</li>
                <li>• Chọn đáp án và nhấn Nộp bài khi hoàn thành</li>
                <li>• Xem điểm, câu đúng/sai và giải thích chi tiết</li>
              </ul>
              <Button
                type="primary"
                size="large"
                onClick={startQuiz}
                className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-semibold rounded-xl w-full sm:w-auto"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", border: "none" }}
              >
                Bắt đầu làm bài
              </Button>
              <div className="mt-4 sm:mt-6">
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base">
                  ← Quay lại trang chủ
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-6 sm:py-12 px-4 sm:px-6 pb-24 sm:pb-12">
        <div className="max-w-4xl mx-auto w-full">
          <Card
            className="shadow-2xl border-0 mb-6 sm:mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.99) 100%)",
              borderRadius: "20px",
            }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-800 mb-6 sm:mb-8 px-2">
              Kết quả bài thi
            </h2>
            <Row gutter={[16, 16]} className="mb-6 sm:mb-8">
              <Col xs={24} sm={8}>
                <Card className="text-center">
                  <Statistic
                    title="Điểm số"
                    value={results.score}
                    suffix="/ 100"
                    valueStyle={{ color: results.score >= 70 ? "#22c55e" : results.score >= 50 ? "#f59e0b" : "#ef4444", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="text-center">
                  <Statistic
                    title="Câu đúng"
                    value={results.correct}
                    prefix={<CheckCircleOutlined style={{ color: "#22c55e" }} />}
                    valueStyle={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="text-center">
                  <Statistic
                    title="Câu sai"
                    value={results.wrong}
                    prefix={<CloseCircleOutlined style={{ color: "#ef4444" }} />}
                    valueStyle={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                  />
                </Card>
              </Col>
            </Row>
            <div className="text-center flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                type="primary"
                size="large"
                onClick={startQuiz}
                className="rounded-xl w-full sm:w-auto"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", border: "none" }}
              >
                Làm lại bài thi
              </Button>
              <Link to="/" className="w-full sm:w-auto">
                <Button size="large" className="rounded-xl w-full" style={{ minHeight: 40 }}>
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </Card>

          <Card
            title={
              <span className="text-base sm:text-lg font-semibold block truncate pr-8">
                Chi tiết từng câu - Xem giải thích
              </span>
            }
            className="shadow-2xl border-0"
            style={{
              background: "rgba(255,255,255,0.98)",
              borderRadius: "20px",
            }}
          >
            <Collapse
              accordion={false}
              size="small"
              className="quiz-result-collapse"
              items={results.details.map((d) => ({
                key: d.key,
                label: (
                  <span className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="font-medium text-slate-500 shrink-0">Câu {d.index}</span>
                    {d.isCorrect ? (
                      <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 16 }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "#ef4444", fontSize: 16 }} />
                    )}
                    <span className="text-slate-700 truncate min-w-0 flex-1 max-w-full">{d.question}</span>
                    <span className={`shrink-0 font-medium ${d.isCorrect ? "text-green-600" : "text-red-600"}`}>
                      {d.isCorrect ? "Đúng" : "Sai"}
                    </span>
                  </span>
                ),
                children: (
                  <div className="space-y-3 text-slate-700">
                    <p><strong>Đáp án của bạn:</strong> {d.userAnswer}</p>
                    <p><strong>Đáp án đúng:</strong> {d.correctAnswer}</p>
                    <p><strong>Giải thích:</strong></p>
                    <div
                      className="bg-slate-50 rounded-lg p-4 text-base"
                      dangerouslySetInnerHTML={{
                        __html: (d.explanation || "Không có giải thích.").replace(/`([^`]+)`/g, '<code class="bg-slate-200 px-1 rounded">$1</code>'),
                      }}
                    />
                  </div>
                ),
              }))}
            />
          </Card>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / shuffledQuestions.length) * 100);
  const totalCount = shuffledQuestions.length;
  const unansweredCount = totalCount - answeredCount;

  const scrollToQuestion = (idx) => {
    questionRefs.current?.[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-6 pb-28 sm:pb-8 lg:pb-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Cột chính - câu hỏi */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
            <Link to="/" className="text-indigo-300 hover:text-white text-sm sm:text-base truncate">
              ← Trang chủ
            </Link>
            <span className="text-white font-medium text-sm sm:text-base shrink-0">
              React Frontend - 150 câu
            </span>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-white mb-1.5 sm:mb-2 text-xs sm:text-sm">
              <span className="truncate pr-2">Tiến độ: {answeredCount} / {shuffledQuestions.length}</span>
              <span className="shrink-0 font-medium">{progressPercent}%</span>
            </div>
            <Progress
              percent={progressPercent}
              strokeColor={{ "0%": "#6366f1", "100%": "#a78bfa" }}
              showInfo={false}
              className="quiz-progress"
            />
          </div>

          <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-260px)] sm:max-h-[calc(100vh-280px)] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
          {shuffledQuestions.map((q, idx) => (
            <div
              key={`${q.id}-${idx}`}
              ref={(el) => { if (el) questionRefs.current[idx] = el; }}
            >
            <Card
              className="shadow-xl border-0 transition-shadow hover:shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.97)",
                borderRadius: "16px",
              }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4 leading-snug">
                Câu {idx + 1}. {q.question}
              </h3>
              <Radio.Group
                value={answers[q.id]}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                className="w-full quiz-radio-group"
              >
                <div className="space-y-3">
                  {(q.options || []).map((opt, optIdx) => (
                    <label
                      key={`${q.id}-${idx}-${optIdx}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAnswerChange(q.id, opt))}
                      className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[48px] sm:min-h-0 ${
                        answers[q.id] === opt
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                      }`}
                      onClick={() => handleAnswerChange(q.id, opt)}
                    >
                      <Radio value={opt} className="quiz-radio-option">
                        <span className="quiz-option-text">{String(opt ?? "")}</span>
                      </Radio>
                    </label>
                  ))}
                </div>
              </Radio.Group>
            </Card>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className="h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl min-h-[44px]"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", border: "none" }}
          >
            Nộp bài
          </Button>
          {answeredCount < shuffledQuestions.length && answeredCount > 0 && (
            <p className="text-center text-amber-300 mt-2 text-sm">
              Đã chọn {answeredCount}/{shuffledQuestions.length} câu. Có thể nộp bài bất kỳ lúc nào, câu chưa chọn sẽ tính sai.
            </p>
          )}
        </div>
        </div>

        {/* Bảng quan sát - số câu đã trả lời / chưa trả lời */}
        <div className="w-72 flex-shrink-0 hidden lg:block">
          <Card
            title="Bảng quan sát"
            className="sticky top-4 shadow-xl border-0"
            style={{
              background: "rgba(255,255,255,0.98)",
              borderRadius: "16px",
            }}
          >
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Tổng số câu:</span>
                <strong>{totalCount}</strong>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Đã trả lời:</span>
                <strong>{answeredCount}</strong>
              </div>
              <div className="flex justify-between text-amber-600">
                <span>Chưa trả lời:</span>
                <strong>{unansweredCount}</strong>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">Click số câu để cuộn tới:</p>
            <div className="grid grid-cols-10 gap-1 max-h-64 overflow-y-auto">
              {shuffledQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={`nav-${q.id}-${idx}`}
                    type="button"
                    onClick={() => scrollToQuestion(idx)}
                    className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                      isAnswered
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Bảng quan sát cho mobile - thu gọn trên điện thoại */}
      <div className="lg:hidden fixed bottom-20 left-3 right-3 sm:left-4 sm:right-4 z-10 max-w-lg mx-auto" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
        <Card size="small" className="shadow-lg rounded-xl">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Đã trả lời: <strong className="text-green-600">{answeredCount}</strong> / <strong>{totalCount}</strong></span>
            <span className="text-amber-600">Còn: <strong>{unansweredCount}</strong></span>
          </div>
        </Card>
      </div>

      <style>{`
        .quiz-progress .ant-progress-bg {
          height: 10px !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        .quiz-radio-group .ant-radio-wrapper {
          display: flex !important;
          align-items: center !important;
        }
        .quiz-radio-group .ant-radio + * {
          color: #1e293b !important;
          font-size: 1rem !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        .quiz-option-text {
          color: #1e293b !important;
          font-size: 1rem !important;
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default QuizPage;
