import QAJavascript from "./QAJavascript";

// Chia level theo role ngay trên dataset.
const QAJavascriptMiddle = QAJavascript.filter((q) => q.role === "middle");

export default QAJavascriptMiddle;

