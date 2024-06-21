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
            title="1 năm exp"
            bordered={false}
            extra={<Link to="/react/practice"><Button type="primary">Practice</Button></Link>}
          >
            {QnAReact.map((ele) => (
              <p className="font-bold" key={ele.question}>
                {ele.question}
              </p>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="2 năm exp" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="3 năm exp" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ReactPage;
