import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReactPage from "./pages/reactPage";
import PracticeReact from "./pages/reactPage/Practice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/react" element={<ReactPage />} />
        <Route path="/react/practice" element={<PracticeReact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
