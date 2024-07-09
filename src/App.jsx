import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReactPage from "./pages/reactPage";
import PracticeReact from "./pages/reactPage/Practice";
import PracticeVue from "./pages/vuePage/Practice";
import VuePage from "./pages/vuePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/react" element={<ReactPage />} />
        <Route path="/vue" element={<VuePage />} />
        <Route path="/react/practice/:type" element={<PracticeReact />} />
        <Route path="/vue/practice" element={<PracticeVue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
