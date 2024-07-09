import { Button, Card, Col, Row } from "antd";
import QnAReact from "../../data/QAReact";
import { Link } from "react-router-dom";

function ReactPage() {
  return (
    <div className="mx-10">
      <h2 className="text-bold text-3xl mt-5 text-center mb-10">React</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="basic"
            bordered={false}
            extra={<Link to="/react/practice/basic"><Button type="primary">Practice</Button></Link>}
          >
            {QnAReact.map((ele) => {
              if(ele?.type == 'basic') {
                return (
                  <p className="font-bold" key={ele.question}>
                    {ele.question}
                  </p>
                )
              }
            })}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="medium" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="hard" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ReactPage;
