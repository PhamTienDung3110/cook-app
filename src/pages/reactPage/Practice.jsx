import { Carousel, Collapse } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QnAReact from "../../data/QAReact";

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
  console.log(type);

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
    const listQnAByType = QnAReact.filter(ele => ele.type == type)
    const shuffleQnA = shuffleArray([...listQnAByType])
    setListQnA(shuffleQnA); // shuffle once and set listQnA
    const currentQnATemp = [
      {
        key: "1",
        label: shuffleQnA[0].question,
        children: <div className="answer-content" dangerouslySetInnerHTML={{ __html: shuffleQnA[0].answer }} />,
      },
    ];
    setCurrentQnA(currentQnATemp);
  }, [type]);

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
      `}</style>
      <h2 className="text-center text-3xl text-bold my-6">Practice: {getTopicName(type)}</h2>
      <div className="mx-10 flex gap-5">
        {/* <div className="w-7/12"> */}
        <div>
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
