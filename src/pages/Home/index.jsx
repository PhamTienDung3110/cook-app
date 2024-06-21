import { Card } from "antd";
import { Link } from "react-router-dom";

const gridStyle = {
  width: "25%",
  textAlign: "center",
  fontWeight: "bold",
};

function Home() {
  return (
    <Card title="Cook">
      <Card.Grid style={gridStyle}>
        <Link to="/react">React</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle}>Vue</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  );
}

export default Home;
