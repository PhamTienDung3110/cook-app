import { Carousel, Collapse, Switch } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QAJavascriptJunior from "../../data/QAJavascriptJunior";
import QAJavascriptMiddle from "../../data/QAJavascriptMiddle";
import QAJavascriptSenior from "../../data/QAJavascriptSenior";

const contentStyle = {
  margin: 0,
  height: "180px",
  color: "#fff",
  lineHeight: "180px",
  textAlign: "center",
  background: "#364d79",
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function PracticeJavascript() {
  const [searchParams] = useSearchParams();
  const rolesParam = searchParams.get("roles") || "junior";

  const roles = useMemo(
    () => rolesParam.split(",").map((r) => r.trim()).filter(Boolean),
    [rolesParam]
  );

  const [listQnA, setListQnA] = useState([]);
  const [currentQnA, setCurrentQnA] = useState([{}]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVn, setIsVn] = useState(true);
  // const [textAnswerChatGpt, setTextAnswerChatGpt] = useState('');

  useEffect(() => {
    const roleToExperienceLabel = {
      junior: "1-2 năm",
      middle: "3-5 năm",
      senior: "6+ năm",
    };
    let filtered = [];
    if (roles.includes("junior")) filtered = filtered.concat(QAJavascriptJunior);
    if (roles.includes("middle")) filtered = filtered.concat(QAJavascriptMiddle);
    if (roles.includes("senior")) filtered = filtered.concat(QAJavascriptSenior);

    if (filtered.length === 0) {
      // fallback mặc định
      filtered = QAJavascriptJunior;
    }

    const shuffleQnA = shuffleArray([...filtered]);
    setListQnA(shuffleQnA);
    setCurrentIndex(0);
    setCurrentQnA([
      {
        key: "0",
        label: shuffleQnA[0] ? (isVn ? shuffleQnA[0].question : shuffleQnA[0].questionENG) : "",
        children: shuffleQnA[0] ? (
          <div
            className="answer-content"
            dangerouslySetInnerHTML={{ __html: isVn ? shuffleQnA[0].answer : shuffleQnA[0].answerENG }}
          />
        ) : null,
      },
    ]);

    return () => {
      // no-op; giữ lại để tránh linter warning về hook cleanup nếu cần
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);

  const handleCarouselChange = (current) => {
    setCurrentIndex(current);
  };

  useEffect(() => {
    const q = listQnA[currentIndex];
    if (!q) return;
    setCurrentQnA([
      {
        key: "0",
        id: q.id,
        label: isVn ? q.question : q.questionENG,
        children: (
          <div className="answer-content" dangerouslySetInnerHTML={{ __html: isVn ? q.answer : q.answerENG }} />
        ),
      },
    ]);
  }, [currentIndex, isVn, listQnA]);

  const roleToExperienceLabel = {
    junior: "1-2 năm",
    middle: "3-5 năm",
    senior: "6+ năm",
  };

  const titleRoles = roles.length > 0 ? roles.map((r) => roleToExperienceLabel[r] || r).join(", ") : roleToExperienceLabel.junior;

  return (
    <>
      <style>{`
        .answer-content h1 {
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        .answer-content h2 {
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        .answer-content h3 {
          margin-top: 0.4rem !important;
          margin-bottom: 0.4rem !important;
        }
        .answer-content h4 {
          margin-top: 0.35rem !important;
          margin-bottom: 0.35rem !important;
        }
        .answer-content h5 {
          margin-top: 0.3rem !important;
          margin-bottom: 0.3rem !important;
        }
        .answer-content h6 {
          margin-top: 0.25rem !important;
          margin-bottom: 0.25rem !important;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        ::-webkit-scrollbar-corner {
          background: #f1f1f1;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }
      `}</style>
      <div className="flex items-center justify-between px-3 md:px-10 gap-3">
        <h2 className="text-center text-3xl text-bold my-6">Practice Javascript ({titleRoles})</h2>
        <Switch checkedChildren="VN" unCheckedChildren="ENG" value={isVn} onChange={(e) => setIsVn(e)} />
      </div>
      <div className="mx-3 md:mx-10 flex flex-col md:flex-row gap-5">
        {/* <div className="w-7/12"> */}
        <div className="w-full">
          <Carousel
            arrows
            dotPosition="left"
            infinite={false}
            afterChange={handleCarouselChange}
          >
            {listQnA.map((ele) => (
              <div key={ele.question}>
                <h3 className="text-2xl" style={contentStyle}>
                  {isVn ? ele.question : ele.questionENG}
                </h3>
              </div>
            ))}
          </Carousel>
          <div className="mt-5">
            {listQnA.length > 0 ? <Collapse items={currentQnA} defaultActiveKey={["0"]} /> : null}
          </div>
        </div>
        {/* <div className="w-5/12">
          <TextArea
            rows={12}
            value={textValue}
            onChange={handleTextChange}
            placeholder="Enter your answer and click submit ChatGPT-4 will check your answer"
          />
          <div className="flex justify-end">
            <Button className="mt-3" type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: textAnswerChatGpt }} />;
        </div> */}
      </div>
    </>
  );
}

export default PracticeJavascript;
