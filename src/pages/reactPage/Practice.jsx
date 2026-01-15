import { Carousel, Collapse } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { QnAReact as QnAReactSenior } from "../../data/react/senior";
import { QnAReact as QnAReactMiddle } from "../../data/react/middle";

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
function PracticeReact() {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const rolesParam = searchParams.get("roles") || "senior";
  const roles = useMemo(
    () => rolesParam.split(",").filter((role) => role.trim()),
    [rolesParam]
  );

  // Merge tất cả questions từ senior và middle
  const allQuestions = useMemo(() => {
    return [...QnAReactSenior, ...QnAReactMiddle];
  }, []);

  // Mapping từ type key sang tên hiển thị ngắn gọn
  const getTopicName = (topicKey) => {
    const topicNames = {
      "react-rendering": "Rendering",
      "hooks-advanced": "Hooks",
      "performance-optimization": "Performance",
      "data-fetching": "Data Fetching",
      "state-management": "State Management",
      "auth-security": "Security",
      "testing-quality": "Testing",
      "architecture-leadership": "Architecture",
      "system-design": "System Design"
    };
    return topicNames[topicKey] || topicKey;
  };

  const [listQnA, setListQnA] = useState([]);
  const [currentQnA, setCurrentQnA] = useState([{}]);
  // const [textValue, setTextValue] = useState('');
  // const [textAnswerChatGpt, setTextAnswerChatGpt] = useState('');

  useEffect(() => {
    // Filter theo type và roles được chọn
    let listQnAByType = allQuestions.filter(ele => {
      if (ele.type !== type) return false;

      // Nếu roles bao gồm senior và question không có role hoặc role là senior
      if (roles.includes('senior') && (!ele.role || ele.role === "senior")) return true;

      // Nếu roles bao gồm middle và question có role là middle
      if (roles.includes('middle') && ele.role === "middle") return true;

      // Nếu roles bao gồm junior và question có role là junior
      if (roles.includes('junior') && ele.role === "junior") return true;

      return false;
    });

    // Nếu không có câu hỏi nào, fallback về senior
    if (listQnAByType.length === 0) {
      listQnAByType = allQuestions.filter(ele =>
        ele.type === type && (!ele.role || ele.role === "senior")
      );
    }

    const shuffleQnA = shuffleArray([...listQnAByType]);
    setListQnA(shuffleQnA);

    if (shuffleQnA.length > 0) {
      const currentQnATemp = [
        {
          key: "1",
          label: shuffleQnA[0].question,
          children: <div className="answer-content" dangerouslySetInnerHTML={{ __html: shuffleQnA[0].answer }} />,
        },
      ];
      setCurrentQnA(currentQnATemp);
    }
  }, [type, roles, allQuestions]);

  const handleCarouselChange = (current) => {
    const currentQnATemp = [
      {
        key: "1",
        label: listQnA[current].question,
        children: <div className="answer-content" dangerouslySetInnerHTML={{ __html: listQnA[current].answer }} />,
      },
    ];
    setCurrentQnA(currentQnATemp);
  };

  // const handleTextChange = (e) => {
  //   setTextValue(e.target.value);
  // };

  // const handleSubmit = async () => {
  //   if(!textValue) {
  //       alert('nhập input vào, dùng api mất tiền đấy viết ngắn thôi')
  //       return
  //   }
  //   const prompt = `ví dụ bạn là người phỏng vấn, tôi là người đi phỏng vấn bạn hỏi câu: ${currentQnA[0].label}
  //   và tôi trả lời ${textValue} bạn hãy trả lời 2 câu hỏi, 1 câu hỏi trên đúng bao nhiêu phần trăm và và cần cải thiện gì ở câu trả lời, trả lời dạng html để tôi để trong <div dangerouslySetInnerHTML={{ __html: listQnA[current].answer }} />, trả lời ngắn gọn
  //   `
  //   try {
  //       const res = await axios.post('https://cook-app-be-c.vercel.app/chat', { prompt });
  //       setTextAnswerChatGpt(res.data.choices[0].message.content.trim());
  //   } catch (error) {
  //       console.error("There was an error!", error);
  //   }
  // }

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

        /* Custom scrollbar styling */
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

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }
      `}</style>
      <h2 className="text-center text-3xl text-bold my-6">
        Practice: {getTopicName(type)} ({roles.map(role => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')})
      </h2>
      <div className="mx-10 flex gap-5">
        {/* <div className="w-7/12"> */}
        <div>
          {listQnA.length > 0 ? (
            <>
              <Carousel
                arrows
                dotPosition="left"
                infinite={false}
                afterChange={handleCarouselChange}
              >
                {listQnA.map((ele) => (
                  <div key={ele.question}>
                    <h3 className="text-2xl" style={contentStyle}>
                      {ele.question}
                    </h3>
                  </div>
                ))}
              </Carousel>
              <div className="mt-5">
                <Collapse items={currentQnA} defaultActiveKey={["0"]} />
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">
                Không có câu hỏi nào cho cấp độ {roles} trong chủ đề này.
              </p>
            </div>
          )}
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

export default PracticeReact;
