import { Card } from "antd";
import { Link } from "react-router-dom";

const gridStyle = {
  width: "25%",
  textAlign: "center",
  fontWeight: "bold",
};

function Home() {
  return (
    <Card title="hehe">
      <Card.Grid style={gridStyle}>
        <Link to="/javascript">Javascript</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Link to="/vue">Vue</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Link to="/react">React</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  );
}

export default Home;
