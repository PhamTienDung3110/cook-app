import { Carousel, Collapse, Switch } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QANodejsJunior from "../../data/QANodejsJunior";
import QANodejsMiddle from "../../data/QANodejsMiddle";
import QANodejsSenior from "../../data/QANodejsSenior";

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

function PracticeNodejs() {
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

  useEffect(() => {
    let filtered = [];
    if (roles.includes("junior")) filtered = filtered.concat(QANodejsJunior);
    if (roles.includes("middle")) filtered = filtered.concat(QANodejsMiddle);
    if (roles.includes("senior")) filtered = filtered.concat(QANodejsSenior);

    if (filtered.length === 0) filtered = QANodejsJunior;

    const shuffled = shuffleArray([...filtered]);
    setListQnA(shuffled);
    setCurrentIndex(0);
  }, [roles]);

  useEffect(() => {
    const q = listQnA[currentIndex];
    if (!q) return;
    setCurrentQnA([
      {
        key: "0",
        id: q.id,
        label: isVn ? q.question : q.questionENG,
        children: (
          <div
            className="answer-content"
            dangerouslySetInnerHTML={{ __html: isVn ? q.answer : q.answerENG }}
          />
        ),
      },
    ]);
  }, [currentIndex, isVn, listQnA]);

  const handleCarouselChange = (current) => {
    setCurrentIndex(current);
  };

  const roleToExperienceLabel = {
    junior: "1-2 năm",
    middle: "3-5 năm",
    senior: "6+ năm",
  };

  const titleRoles =
    roles.length > 0 ? roles.map((r) => roleToExperienceLabel[r] || r).join(", ") : roleToExperienceLabel.junior;

  return (
    <>
      <style>{`
        .answer-content h1 { margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
        .answer-content h2 { margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
        .answer-content h3 { margin-top: 0.4rem !important; margin-bottom: 0.4rem !important; }
        .answer-content h4 { margin-top: 0.35rem !important; margin-bottom: 0.35rem !important; }
        .answer-content h5 { margin-top: 0.3rem !important; margin-bottom: 0.3rem !important; }
        .answer-content h6 { margin-top: 0.25rem !important; margin-bottom: 0.25rem !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
        ::-webkit-scrollbar-corner { background: #f1f1f1; }
        * { scrollbar-width: thin; scrollbar-color: #c1c1c1 #f1f1f1; }
      `}</style>

      <div className="flex items-center justify-between px-3 md:px-10 gap-3">
        <h2 className="text-center text-3xl text-bold my-6">Practice NodeJS ({titleRoles})</h2>
        <Switch checkedChildren="VN" unCheckedChildren="ENG" value={isVn} onChange={(e) => setIsVn(e)} />
      </div>

      <div className="mx-3 md:mx-10 flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <Carousel arrows dotPosition="left" infinite={false} afterChange={handleCarouselChange}>
            {listQnA.map((ele) => (
              <div key={ele.question}>
                <h3 className="text-2xl" style={contentStyle}>
                  {isVn ? ele.question : ele.questionENG}
                </h3>
              </div>
            ))}
          </Carousel>
          <div className="mt-5">{listQnA.length > 0 ? <Collapse items={currentQnA} defaultActiveKey={["0"]} /> : null}</div>
        </div>
      </div>
    </>
  );
}

export default PracticeNodejs;

