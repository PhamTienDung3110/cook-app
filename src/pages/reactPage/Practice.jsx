import { Button, Carousel, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import QnAReact from "../../data/QAReact";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

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
  const [listQnA, setListQnA] = useState([]);
  const [currentQnA, setCurrentQnA] = useState([{}]);
  const [textValue, setTextValue] = useState('');
  const [textAnswerChatGpt, setTextAnswerChatGpt] = useState('');

  useEffect(() => {
    const shuffleQnA = shuffleArray([...QnAReact])
    setListQnA(shuffleQnA); // shuffle once and set listQnA
    const currentQnATemp = [
      {
        key: "1",
        label: shuffleQnA[0].question,
        children: <div dangerouslySetInnerHTML={{ __html: shuffleQnA[0].answer }} />,
      },
    ];
    setCurrentQnA(currentQnATemp);
  }, []);

  const handleCarouselChange = (current) => {
    const currentQnATemp = [
      {
        key: "1",
        label: listQnA[current].question,
        children: <div dangerouslySetInnerHTML={{ __html: listQnA[current].answer }} />,
      },
    ];
    setCurrentQnA(currentQnATemp);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = async () => {
    if(!textValue) {
        alert('nhập input vào, dùng api mất tiền đấy viết ngắn thôi')
        return
    }
    const prompt = `ví dụ bạn là người phỏng vấn, tôi là người đi phỏng vấn bạn hỏi câu: ${currentQnA[0].question}
    và tôi trả lời ${textValue} bạn hãy trả lời 2 câu hỏi, 1 câu hỏi trên đúng bao nhiêu phần trăm và và cần cải thiện gì ở câu trả lời, trả lời dạng html để tôi để trong <div dangerouslySetInnerHTML={{ __html: listQnA[current].answer }} />, trả lời ngắn gọn tối đa 100 tokens chatgpt
    `
    try {
        const res = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o', // Sử dụng mô hình GPT-4
                messages: [{ role: 'user', content: prompt }], // Sử dụng định dạng tin nhắn cho mô hình trò chuyện
                max_tokens: 1000,
                n: 1,
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_CHATP_GPT_KEY}``,
                },
            }
        );
        setTextAnswerChatGpt(res.data.choices[0].message.content.trim());
    } catch (error) {
        console.error("There was an error!", error);
    }
  }

  return (
    <>
      <h2 className="text-center text-3xl text-bold my-6">Practice Reactjs</h2>
      <div className="mx-10 flex gap-5">
        <div className="w-7/12">
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
        <div className="w-5/12">
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
        </div>
      </div>
    </>
  );
}

export default PracticeReact;
