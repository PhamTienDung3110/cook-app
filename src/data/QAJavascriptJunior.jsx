import QAJavascript from "./QAJavascript";

import { getQAJavascriptRole } from "./QAJavascriptRole";

// Chia level theo nội dung câu hỏi (không dựa vào id).
const QAJavascriptJunior = QAJavascript.filter(
  (q) => getQAJavascriptRole(q.question, q.questionENG) === "junior"
);

export default QAJavascriptJunior;

