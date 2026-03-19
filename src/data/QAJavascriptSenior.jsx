import QAJavascript from "./QAJavascript";

// Chia level theo role ngay trên dataset.
const QAJavascriptSenior = QAJavascript.filter((q) => q.role === "senior");

export default QAJavascriptSenior;

