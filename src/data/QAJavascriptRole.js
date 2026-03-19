// Phân loại câu hỏi JS theo level (junior/middle/senior) dựa trên nội dung.
// Mục tiêu: thay việc chia theo `id` bằng việc “đọc câu hỏi” để xếp level phù hợp.
export function getQAJavascriptRole(questionVN, questionEN) {
  const text = `${questionVN || ""} ${questionEN || ""}`.toLowerCase();

  // Senior: các chủ đề nền tảng hệ thống/hiệu năng/inner workings
  if (/(garbage collection|garbage collector|memory management|garbage)/i.test(text)) {
    return "senior";
  }

  // Junior: event loop / cơ chế thực thi bất đồng bộ mức khái niệm (câu hỏi dạng tổng quan)
  if (/(event loop|microtask|microtasks|callback queue|call stack)/i.test(text)) {
    return "junior";
  }

  // Middle: các chủ đề intermediate/advanced hơn so với cú pháp cơ bản
  if (
    /(closure|closures)/i.test(text) ||
    /(\bthis\b)/i.test(text) ||
    /(prototype|prototypal inheritance)/i.test(text) ||
    /(promise chain|promise\b|async\/await|async\b)/i.test(text) ||
    /(asynchronous|async code execution)/i.test(text) ||
    /(higher-?order function|higher-?order)/i.test(text) ||
    /(reduce\b|map\b|filter\b)/i.test(text) ||
    /(debounce|throttle)/i.test(text) ||
    /(module|modules)/i.test(text) ||
    /(object\.freeze|freeze)/i.test(text) ||
    /(object\.create|create\(\))/.test(text)
  ) {
    return "middle";
  }

  // Default: junior (cú pháp/khái niệm cơ bản)
  return "junior";
}

