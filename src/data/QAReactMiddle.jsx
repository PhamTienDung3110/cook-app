import QnAReact from "./QAReact";

const QnAReactMiddle = QnAReact.filter((q) => q.role === "middle");

export default QnAReactMiddle;

