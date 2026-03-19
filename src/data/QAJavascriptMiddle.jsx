import QAJavascript from "./QAJavascript";

import { getQAJavascriptRole } from "./QAJavascriptRole";

// Chia level theo nội dung câu hỏi (không dựa vào id).
const QAJavascriptMiddle = QAJavascript.filter(
  (q) => getQAJavascriptRole(q.question, q.questionENG) === "middle"
);

export default QAJavascriptMiddle;

