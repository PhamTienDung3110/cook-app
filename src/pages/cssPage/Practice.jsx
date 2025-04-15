import { Carousel, Collapse, Switch } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QACss from "../../data/QACss";

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
function PracticeCSS() {
  const { type } = useParams();
  console.log(type);

  const [listQnA, setListQnA] = useState([]);
  const [currentQnA, setCurrentQnA] = useState([{}]);
  const [isVn, setIsVn] = useState(true);
  // const [textAnswerChatGpt, setTextAnswerChatGpt] = useState('');

  useEffect(() => {
    const listQnAByType = QACss.filter((ele) => ele.type == type);
    const shuffleQnA = shuffleArray([...listQnAByType]);
    setListQnA(shuffleQnA); // shuffle once and set listQnA
    const currentQnATemp = [
      {
        key: "1",
        id: shuffleQnA[0]?.id,
        label: isVn ? shuffleQnA[0].question : shuffleQnA[0].questionENG,
        children: (
          <div dangerouslySetInnerHTML={{ __html: isVn ? shuffleQnA[0].answer :  shuffleQnA[0].answerENG }} />
        ),
      },
    ];
    setCurrentQnA(currentQnATemp);
  }, [type]);

  useEffect(() => {
    const abcde = listQnA.find(ele => ele.id == currentQnA[0].id);
    if(abcde) {
      const currr = [{
        key: "1",
        id: abcde?.id,
        label: isVn ? abcde?.question : abcde?.questionENG,
        children: (
          <div dangerouslySetInnerHTML={{ __html: isVn ? abcde?.answer :  abcde?.answerENG }} />
        ),
      }]
      setCurrentQnA(currr);
    }
  },[isVn])

  const handleCarouselChange = (current) => {
    const currentQnATemp = [
      {
        key: "1",
        id: listQnA[current].id,
        label: isVn ? listQnA[current].question : listQnA[current].questionENG,
        children: (
          <div dangerouslySetInnerHTML={{ __html: isVn ? listQnA[current].answer : listQnA[current].answerENG }} />
        ),
      },
    ];
    setCurrentQnA(currentQnATemp);
  };

  return (
    <>
      <div className="flex items-center justify-between px-10">
        <h2 className=" text-center text-3xl text-bold my-6">
          Practice Javascript
        </h2>
        <Switch checkedChildren="VN" unCheckedChildren="ENG" value={isVn} onChange={(e) => setIsVn(e)} />
      </div>
      <div className="mx-10 flex gap-5">
        {/* <div className="w-7/12"> */}
        <div className="w-screen">
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

export default PracticeCSS;
