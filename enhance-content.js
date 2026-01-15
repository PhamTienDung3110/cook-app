import fs from 'fs';

let content = fs.readFileSync('src/data/QAReact.jsx', 'utf8');

// Loại bỏ class margin
content = content.replace(/className="[^"]*mt-[^"]*"/g, '');
content = content.replace(/className="[^"]*mb-[^"]*"/g, '');

// Giảm khoảng cách giữa các dòng
content = content.replace(/\n\n\n/g, '\n\n');

// Thêm section "Technical Details" cho một số câu trả lời
content = content.replace(
  /(question: "[^"]*",\s*answer: `[^`]*)<h3>1\. ([^<]+)<\/h3>\s*<p>([^<]+)<\/p>/g,
  '$1<h4>1. $2</h4>\n<p>$3</p>\n\n<h4>Technical Implementation</h4>\n<p>This requires careful consideration of performance and edge cases in production environments.</p>'
);

fs.writeFileSync('src/data/QAReact.jsx', content);
console.log('Enhanced content and removed margin classes');
