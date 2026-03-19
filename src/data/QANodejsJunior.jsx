import QANodejs from "./QANodejs";

const QANodejsJunior = QANodejs.filter((q) => q.role === "junior");

export default QANodejsJunior;

