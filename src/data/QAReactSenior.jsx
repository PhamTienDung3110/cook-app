import QnAReact from "./QAReact";

const QnAReactSenior = QnAReact.filter((q) => q.role === "senior");

export default QnAReactSenior;

