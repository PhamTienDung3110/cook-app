import QANodejs from "./QANodejs";

const QANodejsSenior = QANodejs.filter((q) => q.role === "senior");

export default QANodejsSenior;

