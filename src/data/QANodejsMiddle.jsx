import QANodejs from "./QANodejs";

const QANodejsMiddle = QANodejs.filter((q) => q.role === "middle");

export default QANodejsMiddle;

