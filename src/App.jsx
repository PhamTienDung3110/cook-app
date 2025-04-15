import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReactPage from "./pages/reactPage";
import PracticeReact from "./pages/reactPage/Practice";
import PracticeVue from "./pages/vuePage/Practice";
import VuePage from "./pages/vuePage";
import JavascriptPage from "./pages/javascriptPage";
import PracticeJavascript from "./pages/javascriptPage/Practice";
import CSSPage from "./pages/cssPage";
import PracticeCSS from "./pages/cssPage/Practice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/react" element={<ReactPage />} />
        <Route path="/css" element={<CSSPage />} />
        <Route path="/vue" element={<VuePage />} />
        <Route path="/javascript" element={<JavascriptPage />} />
        <Route path="/css/practice/:type" element={<PracticeCSS />} />
        <Route path="/react/practice/:type" element={<PracticeReact />} />
        <Route path="/javascript/practice/:type" element={<PracticeJavascript />} />
        <Route path="/vue/practice" element={<PracticeVue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
