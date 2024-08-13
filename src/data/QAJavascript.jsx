const QAJavascript = [
  {
    id: 1,
    question: "Event loop trong javascript là gì",
    questionENG: "What is the event loop in JavaScript and how does the event loop operate?",
    answer: `
        <div>
  <h2>Event Loop trong JavaScript</h2>
  <p>Event loop là cơ chế cốt lõi giúp JavaScript, ngôn ngữ đơn luồng, có thể xử lý hiệu quả các tác vụ bất đồng bộ. Dưới đây là các thành phần chính và cách vận hành của event loop:</p>
  <h3>Thành Phần Chính</h3>
  <ul>
    <li><strong>Call Stack:</strong> Nơi lưu giữ các hàm đang được thực thi. Hàm nào được gọi sẽ đẩy vào đỉnh stack và sẽ bị loại bỏ khi hoàn thành.</li>
    <li><strong>Web APIs:</strong> Các API do trình duyệt cung cấp, hỗ trợ thực hiện các tác vụ nặng như AJAX, setTimeout, fetch, và xử lý sự kiện.</li>
    <li><strong>Callback Queue:</strong> Hàng đợi cho các callback từ Web APIs sau khi hoàn tất tác vụ.</li>
    <li><strong>Microtask Queue:</strong> Hàng đợi cho các microtasks từ Promises, được xử lý trước các callback thông thường.</li>
  </ul>
  <h3>Cách Vận Hành của Event Loop</h3>
  <ol>
    <li><strong>Kiểm tra Call Stack:</strong> Nếu không trống, thực thi các hàm cho đến khi trống.</li>
    <li><strong>Xử lý Microtasks:</strong> Sau khi call stack trống, kiểm tra và thực thi tất cả microtasks trong queue.</li>
    <li><strong>Lấy một Item từ Callback Queue:</strong> Khi microtask queue trống và call stack không có gì, lấy một callback từ callback queue để thực thi.</li>
    <li><strong>Lặp lại Quy Trình:</strong> Quá trình lặp lại liên tục, đảm bảo rằng mọi tác vụ được xử lý kịp thời.</li>
  </ol>
  <p>Quá trình này giúp JavaScript xử lý các tác vụ không đồng bộ, cập nhật UI và phản hồi người dùng một cách hiệu quả.</p>
</div>

        `,
    answerENG: `
        <div>
  <h2>Event Loop in JavaScript</h2>
  <p>The event loop is a core mechanism that enables JavaScript, a single-threaded language, to effectively handle asynchronous tasks. Below are the main components and the operation of the event loop:</p>
  <h3>Main Components</h3>
  <ul>
    <li><strong>Call Stack:</strong> This is where functions that are currently being executed are stored. A function is pushed onto the stack when it is called and removed once it is completed.</li>
    <li><strong>Web APIs:</strong> Provided by the browser, these APIs support tasks like AJAX, setTimeout, fetch, and event handling that are heavy and non-blocking.</li>
    <li><strong>Callback Queue:</strong> A queue for callbacks from Web APIs after they complete their tasks.</li>
    <li><strong>Microtask Queue:</strong> A queue for microtasks from Promises, which are processed before regular callbacks.</li>
  </ul>
  <h3>How the Event Loop Operates</h3>
  <ol>
    <li><strong>Check the Call Stack:</strong> If it's not empty, execute functions until it is empty.</li>
    <li><strong>Process Microtasks:</strong> After the call stack is empty, check and execute all microtasks in the queue.</li>
    <li><strong>Retrieve an Item from the Callback Queue:</strong> When the microtask queue is empty and the call stack is clear, take a callback from the callback queue to execute.</li>
    <li><strong>Repeat the Process:</strong> This process repeats continuously, ensuring that all tasks are handled promptly.</li>
  </ol>
  <p>This process allows JavaScript to handle asynchronous tasks, update the UI, and respond to user interactions efficiently.</p>
</div>
        `,
    type: "basic",
  },
  {
    id: 2,
    question: "Ba trạng thái của Promise?",
    questionENG: "What are the three states of a Promise?",
    answer: `
<div>
  <h3>Three States of a JavaScript Promise</h3>
  <ul>
    <li><strong>Pending:</strong> The initial state of a Promise. It remains in this state while awaiting resolution or rejection, with the outcome still unknown.</li>
    <li><strong>Fulfilled:</strong> This state is reached when the asynchronous task within the Promise is successfully completed. In this state, the registered 'then' callback is invoked, passing the resulting value from the asynchronous task as an argument.</li>
    <li><strong>Rejected:</strong> If the asynchronous task fails, the Promise transitions to this state. The registered 'catch' callback is called in this state, receiving the reason for rejection (typically an error object) as an argument.</li>
  </ul>
</div>
        `,
    answerENG: `
<div>
  <h3>Three States of a JavaScript Promise</h3>
  <ul>
    <li><strong>Pending:</strong> The initial state of a Promise. It remains in this state while awaiting resolution or rejection, with the outcome still unknown.</li>
    <li><strong>Fulfilled:</strong> This state is reached when the asynchronous task within the Promise is successfully completed. In this state, the registered 'then' callback is invoked, passing the resulting value from the asynchronous task as an argument.</li>
    <li><strong>Rejected:</strong> If the asynchronous task fails, the Promise transitions to this state. The registered 'catch' callback is called in this state, receiving the reason for rejection (typically an error object) as an argument.</li>
  </ul>
</div>
        `,
    type: "basic",
  },
];

export default QAJavascript;
