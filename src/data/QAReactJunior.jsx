import QnAReact from "./QAReact";

// File tách riêng theo level (role) để UI không cần filter toàn bộ dataset.
const QnAReactJunior = QnAReact.filter((q) => q.role === "junior");

export default QnAReactJunior;

