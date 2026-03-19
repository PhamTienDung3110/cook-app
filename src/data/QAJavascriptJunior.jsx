import QAJavascript from "./QAJavascript";

// Chia level theo role ngay trên dataset.
const QAJavascriptJunior = QAJavascript.filter((q) => q.role === "junior");

export default QAJavascriptJunior;

