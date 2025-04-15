const QAJavascript = [
  {
    id: 1,
    question: "Giải thích sự khác biệt giữa `var`, `let`, và `const`.",
    questionENG: "Explain the differences between `var`, `let`, and `const` in JavaScript.",
    answer: `
<div>
  <h2>Khác biệt giữa var, let, và const</h2>
  <p><strong>var:</strong> 
    <br>- Có phạm vi function: Biến khai báo bằng var chỉ tồn tại bên trong hàm chứa nó, nếu khai báo ngoài hàm thì sẽ thuộc phạm vi toàn cục.
    <br>- Được hoisted: Chỉ có phần khai báo được nâng lên đầu phạm vi, nên trước khi gán giá trị, biến sẽ có giá trị <code>undefined</code>.
    <br>- Cho phép tái khai báo và gán lại: Điều này có thể gây ra lỗi do ghi đè giá trị không mong muốn, đặc biệt trong các khối mã phức tạp.
    <br><em>Ví dụ:</em> Nếu bạn khai báo <code>var x = 10</code> trong một hàm, bạn có thể tái khai báo lại <code>var x = 20</code> trong cùng hàm đó.
  </p>
  <p><strong>let:</strong>
    <br>- Có phạm vi block: Biến chỉ tồn tại bên trong cặp dấu ngoặc nhọn {} nơi nó được khai báo.
    <br>- Được hoisted nhưng kèm theo Temporal Dead Zone (TDZ): Bạn không thể truy cập biến trước khi dòng khai báo được thực thi.
    <br>- Không cho phép khai báo lại trong cùng một block, giúp tránh xung đột tên biến.
    <br><em>Ví dụ:</em> Khi sử dụng let trong vòng lặp for, mỗi lần lặp được tính là một block riêng, giúp giữ giá trị đúng cho mỗi lần lặp.
  </p>
  <p><strong>const:</strong>
    <br>- Cũng có phạm vi block tương tự let.
    <br>- Phải được khởi tạo khi khai báo và không được gán lại sau đó; đảm bảo rằng binding của biến không thay đổi.
    <br>- Nếu là đối tượng hoặc mảng, chỉ có binding được giữ cố định, các thuộc tính bên trong vẫn có thể thay đổi.
    <br><em>Ví dụ:</em> <code>const person = { name: "Alice" };</code> bạn không thể gán lại đối tượng <code>person</code>, nhưng có thể thay đổi thuộc tính <code>person.name</code>.
  </p>
  <p>Kết hợp lại, let và const giúp bảo vệ code khỏi các lỗi do phạm vi không chính xác và sự thay đổi không mong muốn, trong khi var phù hợp với các trường hợp cũ hoặc các hàm đơn giản.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Differences between var, let, and const</h2>
  <p><strong>var:</strong>
    <br>- Has function scope, meaning variables declared with var exist throughout the entire function in which they are declared, or globally if declared outside any function.
    <br>- Is hoisted: Only the declaration is moved to the top of its scope, while the initialization remains in place, resulting in an <code>undefined</code> value if accessed before assignment.
    <br>- Allows redeclaration and reassignment, which can lead to accidental overwrites in larger codebases.
    <br><em>Example:</em> In a function, you can declare <code>var x = 10</code> and later redeclare <code>var x = 20</code>, which might cause unexpected behavior.
  </p>
  <p><strong>let:</strong>
    <br>- Has block scope, meaning it is only accessible within the nearest pair of curly braces {}.
    <br>- Is hoisted but remains in the temporal dead zone (TDZ) until its declaration is executed, preventing premature access.
    <br>- Does not allow redeclaration within the same scope, reducing potential naming conflicts.
    <br><em>Example:</em> Using let in a for loop creates a separate binding for each iteration, preserving the correct value in callbacks.
  </p>
  <p><strong>const:</strong>
    <br>- Also block-scoped like let.
    <br>- Must be initialized at the time of declaration and cannot be reassigned later, ensuring that the binding remains constant.
    <br>- For objects or arrays, while the binding is constant, the contents can still be altered.
    <br><em>Example:</em> <code>const person = { name: "Alice" };</code> prevents reassignment of person, but <code>person.name</code> can be updated.
  </p>
  <p>In summary, using let and const offers better control over scope and assignment, promoting more predictable and error-resistant code compared to var.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 2,
    question: "Giải thích hoisting trong JavaScript.",
    questionENG: "What is hoisting in JavaScript?",
    answer: `
<div>
  <h2>Hoisting trong JavaScript</h2>
  <p>Hoisting là cơ chế của JavaScript mà trong đó các khai báo biến và hàm được “nâng lên” đầu phạm vi hiện hành trong quá trình biên dịch, trước khi code thực thi. Điều này cho phép một số biến có thể được truy cập trước khi chúng được gán giá trị.</p>
  <p>
    - Với <code>var</code>: Chỉ có phần khai báo được hoisted, do đó nếu bạn truy cập biến trước khi gán giá trị sẽ nhận <code>undefined</code>.
    <br>- Với <code>let</code> và <code>const</code>: Mặc dù khai báo cũng được hoisted, nhưng do tồn tại trong TDZ nên truy cập trước khi khai báo thực sự sẽ gây ra lỗi.
  </p>
  <p>Hiểu rõ hoisting giúp lập trình viên sắp xếp code hợp lý và tránh các lỗi do truy cập biến chưa được khởi tạo.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Hoisting in JavaScript</h2>
  <p>Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their respective scopes during the compilation phase, prior to code execution.</p>
  <p>
    - For <code>var</code>: Only the declaration is hoisted, so accessing the variable before its assignment results in <code>undefined</code>.
    <br>- For <code>let</code> and <code>const</code>: Although declarations are hoisted, they remain in the temporal dead zone (TDZ) and accessing them early will throw an error.
  </p>
  <p>Understanding hoisting aids developers in structuring code to prevent issues related to premature variable access.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 3,
    question: "Giải thích sự khác biệt giữa `null` và `undefined`.",
    questionENG: "Explain the difference between `null` and `undefined`.",
    answer: `
<div>
  <h2>Null và Undefined</h2>
  <p>
    <strong>undefined:</strong>
    <br>- Giá trị mặc định cho biến được khai báo nhưng chưa được khởi tạo.
    <br>- Kết quả trả về của các hàm không có lệnh trả về.
    <br>- Thường được gán bởi JavaScript khi một biến không được xác định.
  </p>
  <p>
    <strong>null:</strong>
    <br>- Một giá trị được lập trình viên chỉ định để biểu thị “không có giá trị”.
    <br>- Được dùng khi muốn đặc tả rõ rằng biến không có giá trị hợp lệ.
    <br>- Rõ ràng khác với undefined, vì null thể hiện ý định đặt giá trị rỗng.
  </p>
  <p>Do đó, undefined thường xuất hiện tự nhiên, trong khi null được sử dụng có chủ ý để biểu thị sự trống rỗng.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Null vs Undefined</h2>
  <p>
    <strong>undefined:</strong>
    <br>- Is the default value for variables that have been declared but not yet assigned.
    <br>- Also returned by functions that do not explicitly return a value.
    <br>- Indicates the absence of an initialized value.
  </p>
  <p>
    <strong>null:</strong>
    <br>- Is an explicitly assigned value that represents “no value.”
    <br>- Used by developers to intentionally denote that a variable is empty.
    <br>- Differentiates from undefined by conveying deliberate emptiness.
  </p>
  <p>Thus, undefined is automatically set by JavaScript, while null is purposefully assigned to indicate an absence of value.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 4,
    question: "Giải thích event loop và cách hoạt động của nó trong JavaScript.",
    questionENG: "What is the event loop in JavaScript and how does it work?",
    answer: `
<div>
  <h2>Event Loop trong JavaScript</h2>
  <p>Event loop là cơ chế nền tảng của JavaScript cho phép xử lý các tác vụ bất đồng bộ trong một môi trường đơn luồng. Nó đồng bộ hoá quá trình thực thi bằng cách xếp lịch cho các hàm callback.</p>
  <p><strong>Các thành phần chính:</strong></p>
  <ul>
    <li><strong>Call Stack:</strong> Nơi chứa các hàm đang được thực thi. Khi hàm được gọi, nó được đẩy vào stack và khi hoàn thành sẽ bị loại bỏ.</li>
    <li><strong>Callback Queue:</strong> Hàng đợi chứa các hàm callback từ các tác vụ bất đồng bộ như setTimeout hay các request HTTP.</li>
    <li><strong>Microtask Queue:</strong> Hàng đợi chứa các microtasks, ví dụ như Promise callbacks, được ưu tiên xử lý trước các hàm trong callback queue.</li>
  </ul>
  <p>Khi call stack trống, event loop sẽ chuyển các nhiệm vụ từ microtask queue trước, sau đó đến callback queue để đưa vào call stack thực thi. Cơ chế này đảm bảo giao diện người dùng không bị block và các tác vụ bất đồng bộ được xử lý theo thứ tự ưu tiên.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Event Loop in JavaScript</h2>
  <p>The event loop is a fundamental mechanism in JavaScript that enables asynchronous operations in a single-threaded environment by scheduling callback functions.</p>
  <p><strong>Main Components:</strong></p>
  <ul>
    <li><strong>Call Stack:</strong> Stores the functions currently being executed. Functions are pushed onto the stack when called and popped off when completed.</li>
    <li><strong>Callback Queue:</strong> Holds callbacks from asynchronous tasks like setTimeout and HTTP requests.</li>
    <li><strong>Microtask Queue:</strong> Contains microtasks (such as Promise callbacks) which are processed before the regular callback queue.</li>
  </ul>
  <p>When the call stack is empty, the event loop moves tasks from the microtask queue (if available) and then from the callback queue to the call stack, ensuring that the UI remains responsive and asynchronous tasks are executed in order of priority.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 5,
    question: "Giải thích closures trong JavaScript.",
    questionENG: "What are closures in JavaScript?",
    answer: `
<div>
  <h2>Closures trong JavaScript</h2>
  <p>Closures là khả năng của một hàm truy cập vào phạm vi bên ngoài của nó ngay cả sau khi hàm đó đã được thực thi. Đây là đặc điểm mạnh mẽ của JavaScript, giúp:</p>
  <ul>
    <li>Tạo ra các biến private, bảo vệ dữ liệu khỏi truy cập trực tiếp từ bên ngoài.</li>
    <li>Duy trì trạng thái qua nhiều lần gọi hàm mà không làm ô nhiễm phạm vi toàn cục.</li>
    <li>Hỗ trợ trong việc xây dựng các module và callback functions với dữ liệu được đóng gói (encapsulated).</li>
  </ul>
  <p><em>Ví dụ:</em></p>
  <pre><code>function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
</div>
    `,
    answerENG: `
<div>
  <h2>Closures in JavaScript</h2>
  <p>A closure is a feature where an inner function has access to the outer (enclosing) function's variables even after the outer function has finished executing. This mechanism is useful for:</p>
  <ul>
    <li>Creating private variables that are inaccessible from the global scope.</li>
    <li>Maintaining state between function invocations without using global variables.</li>
    <li>Building modules and callback functions with encapsulated data.</li>
  </ul>
  <p><em>Example:</em></p>
  <pre><code>function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
</div>
    `,
    type: "basic",
  },
  {
    id: 6,
    question: "Giải thích cách hoạt động của `this` trong JavaScript, đặc biệt là trong các hàm arrow và hàm thông thường.",
    questionENG: "Explain `this` in JavaScript. How does `this` work in arrow functions compared to regular functions?",
    answer: `
<div>
  <h2>Khái niệm về this trong JavaScript</h2>
  <p><strong>Hàm thông thường:</strong>
    <br>- Giá trị của <code>this</code> được xác định dựa trên cách gọi hàm (ví dụ: gọi dưới dạng phương thức của đối tượng, hàm độc lập hoặc qua hàm khởi tạo).
    <br>- Nếu hàm được gọi như một phương thức, <code>this</code> trỏ đến đối tượng sở hữu phương thức đó; nếu không, trong chế độ không nghiêm ngặt, <code>this</code> trỏ tới đối tượng toàn cục.
  </p>
  <p><strong>Arrow functions:</strong>
    <br>- Arrow functions không có binding riêng cho <code>this</code>, mà kế thừa từ phạm vi bao quanh nơi chúng được định nghĩa.
    <br>- Điều này giúp tránh các lỗi khi truyền callback vì ngữ cảnh <code>this</code> sẽ không bị thay đổi bởi cách gọi hàm.
  </p>
  <p>Nhờ vậy, arrow functions thường được ưu tiên khi bạn cần giữ nguyên ngữ cảnh của <code>this</code> mà không cần phải sử dụng các phương thức như <code>bind()</code> hay lưu trữ giá trị của <code>this</code> vào biến khác.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>The Concept of this in JavaScript</h2>
  <p><strong>Regular functions:</strong>
    <br>- The value of <code>this</code> is determined by how the function is called (for example, as an object method, a standalone function, or a constructor).
    <br>- If invoked as an object method, <code>this</code> refers to that object; otherwise, in non-strict mode, it defaults to the global object.
  </p>
  <p><strong>Arrow functions:</strong>
    <br>- Arrow functions do not have their own <code>this</code> binding. Instead, they inherit <code>this</code> from their lexical scope, which is the surrounding context where they were defined.
    <br>- This behavior prevents common pitfalls with callbacks and makes arrow functions ideal for preserving context.
  </p>
  <p>Consequently, arrow functions are often preferred when you need to maintain the same <code>this</code> context without resorting to .bind() or other workarounds.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 7,
    question: "Giải thích sự khác biệt giữa `==` và `===` trong JavaScript.",
    questionENG: "What is the difference between `==` and `===` in JavaScript?",
    answer: `
<div>
  <h2>Sự khác biệt giữa == và ===</h2>
  <p>
    <strong>== (Loose Equality):</strong>
    <br>- So sánh giá trị sau khi thực hiện ép kiểu nếu cần, có thể dẫn đến những kết quả bất ngờ khi so sánh các kiểu dữ liệu khác nhau.
    <br>- Ví dụ: <code>'5' == 5</code> trả về true vì kiểu dữ liệu được chuyển đổi để so sánh.
  </p>
  <p>
    <strong>=== (Strict Equality):</strong>
    <br>- So sánh cả giá trị và kiểu dữ liệu mà không ép kiểu, chỉ trả về true khi cả hai đối tượng hoàn toàn giống nhau.
    <br>- Ví dụ: <code>'5' === 5</code> trả về false vì kiểu dữ liệu khác nhau.
  </p>
  <p>Sử dụng === giúp tránh các lỗi do ép kiểu không mong muốn và đảm bảo so sánh chính xác.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Difference between == and ===</h2>
  <p>
    <strong>== (Loose Equality):</strong>
    <br>- Performs type conversion if necessary when comparing values, which can lead to unexpected results.
    <br>- For example, <code>'5' == 5</code> evaluates to true because the string is converted to a number.
  </p>
  <p>
    <strong>=== (Strict Equality):</strong>
    <br>- Checks for both value and type, returning true only if both are identical.
    <br>- For instance, <code>'5' === 5</code> returns false since the types are different.
  </p>
  <p>Using strict equality (===) is recommended to avoid unintended type coercion and ensure accurate comparisons.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 8,
    question: "Giải thích cơ chế kế thừa theo prototype trong JavaScript.",
    questionENG: "Explain prototypal inheritance in JavaScript.",
    answer: `
<div>
  <h2>Prototypal Inheritance</h2>
  <p>Trong JavaScript, mỗi đối tượng có một thuộc tính <em>prototype</em> cho phép nó kế thừa các thuộc tính và phương thức từ đối tượng khác.</p>
  <p>Quá trình kế thừa diễn ra theo chuỗi prototype (prototype chain): Nếu một thuộc tính không được tìm thấy trên đối tượng hiện tại, JavaScript sẽ tìm kiếm trên prototype của đối tượng đó, sau đó trên prototype của prototype và cứ tiếp tục như vậy cho đến khi đạt tới <code>null</code>.</p>
  <p>Điều này giúp chia sẻ các hành vi chung giữa các đối tượng mà không cần sao chép từng thuộc tính, từ đó giúp tiết kiệm bộ nhớ và tối ưu hóa code.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Prototypal Inheritance</h2>
  <p>In JavaScript, every object has a <em>prototype</em> property, which allows it to inherit properties and methods from another object. This inheritance follows a prototype chain: if a property is not found on the current object, JavaScript looks it up on the object's prototype, then the prototype's prototype, and so on until it reaches <code>null</code>.</p>
  <p>This model promotes code reuse and efficient memory usage by sharing common behaviors among objects without copying each property individually.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 9,
    question: "Giải thích Promise trong JavaScript là gì.",
    questionENG: "What is a Promise in JavaScript?",
    answer: `
<div>
  <h2>Promise trong JavaScript</h2>
  <p>Promise là một đối tượng đại diện cho kết quả của một thao tác bất đồng bộ, có thể hoàn thành hoặc thất bại trong tương lai. Nó có ba trạng thái cơ bản:</p>
  <ul>
    <li><strong>Pending:</strong> Trạng thái ban đầu khi Promise được khởi tạo và chưa xác định được kết quả.</li>
    <li><strong>Fulfilled:</strong> Trạng thái thành công, khi Promise hoàn thành và trả về giá trị mong đợi.</li>
    <li><strong>Rejected:</strong> Trạng thái thất bại, khi có lỗi xảy ra hoặc tác vụ không thành công.</li>
  </ul>
  <p>Promise cho phép xử lý bất đồng bộ một cách có cấu trúc qua việc sử dụng <code>.then()</code> để xử lý kết quả và <code>.catch()</code> để bắt lỗi, giúp tránh callback hell và cải thiện khả năng đọc code.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Promise in JavaScript</h2>
  <p>A Promise is an object representing the eventual completion (or failure) of an asynchronous operation, with three possible states:</p>
  <ul>
    <li><strong>Pending:</strong> The initial state, where the outcome has not yet been determined.</li>
    <li><strong>Fulfilled:</strong> The state when the operation succeeds and returns a value.</li>
    <li><strong>Rejected:</strong> The state when the operation fails and returns an error.</li>
  </ul>
  <p>Promises help structure asynchronous operations using <code>.then()</code> for handling successful results and <code>.catch()</code> for error handling, thereby avoiding deeply nested callbacks.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 10,
    question: "Giải thích async/await trong JavaScript.",
    questionENG: "What are async/await in JavaScript?",
    answer: `
<div>
  <h2>Async/Await trong JavaScript</h2>
  <p><strong>async:</strong> Đánh dấu một hàm là bất đồng bộ, nó luôn trả về một Promise. Bất kỳ giá trị nào được trả về từ hàm sẽ được tự động bọc trong Promise.</p>
  <p><strong>await:</strong> Được sử dụng bên trong hàm async để tạm dừng thực thi cho đến khi Promise được giải quyết (fulfilled hoặc rejected). Cú pháp này giúp viết mã bất đồng bộ theo phong cách đồng bộ, làm cho code dễ đọc và bảo trì hơn.</p>
  <p>Việc sử dụng async/await giúp loại bỏ callback lồng nhau phức tạp và hỗ trợ xử lý lỗi bằng cách sử dụng try/catch một cách trực quan.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Async/Await in JavaScript</h2>
  <p><strong>async:</strong> Marks a function as asynchronous, automatically returning a Promise. Any value returned from an async function is wrapped in a Promise.</p>
  <p><strong>await:</strong> Can only be used inside async functions; it pauses execution until the awaited Promise settles (either fulfilled or rejected), thus allowing asynchronous code to be written in a synchronous style.</p>
  <p>Async/await simplifies complex asynchronous workflows by reducing nested callbacks and enabling straightforward error handling using try/catch.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 11,
    question: "Giải thích cách hoạt động của phương thức `bind` trong JavaScript.",
    questionENG: "How does the `bind` method work in JavaScript?",
    answer: `
<div>
  <h2>Phương thức bind()</h2>
  <p>Phương thức <code>bind()</code> tạo ra một hàm mới với <code>this</code> đã được cố định theo đối tượng được truyền vào. Nó cũng cho phép thiết lập trước một số đối số cho hàm mới này.</p>
  <p>Nhờ vậy, khi gọi hàm được bind, bạn không cần lo lắng về ngữ cảnh của <code>this</code>, đặc biệt hữu ích khi truyền hàm làm callback trong các sự kiện hoặc khi sử dụng trong các hàm bất đồng bộ.</p>
  <p><em>Ví dụ:</em></p>
  <pre><code>const obj = { x: 42 };
function getX() { return this.x; }
const boundGetX = getX.bind(obj);
console.log(boundGetX()); // 42</code></pre>
</div>
    `,
    answerENG: `
<div>
  <h2>The bind Method</h2>
  <p>The <code>bind()</code> method creates a new function with the <code>this</code> keyword permanently set to the specified object. It also allows you to pre-set some initial arguments for the new function.</p>
  <p>This is especially useful for ensuring the correct context in callbacks or asynchronous functions.</p>
  <p><em>Example:</em></p>
  <pre><code>const obj = { x: 42 };
function getX() { return this.x; }
const boundGetX = getX.bind(obj);
console.log(boundGetX()); // 42</code></pre>
</div>
    `,
    type: "basic",
  },
  {
    id: 12,
    question: "Giải thích sự khác biệt giữa các phương thức `call()` và `apply()` trong JavaScript.",
    questionENG: "What is the difference between `call()` and `apply()` methods?",
    answer: `
<div>
  <h2>call() vs apply()</h2>
  <p>Cả hai phương thức <code>call()</code> và <code>apply()</code> được dùng để gọi một hàm với một giá trị cụ thể cho <code>this</code>. Tuy nhiên, cách truyền đối số là khác nhau:</p>
  <ul>
    <li><strong>call():</strong> Truyền các đối số dưới dạng danh sách riêng lẻ. Ví dụ: <code>fn.call(obj, arg1, arg2)</code>.</li>
    <li><strong>apply():</strong> Truyền các đối số dưới dạng một mảng. Ví dụ: <code>fn.apply(obj, [arg1, arg2])</code>.</li>
  </ul>
  <p>Việc lựa chọn giữa call và apply phụ thuộc vào việc bạn có đối số dưới dạng mảng hay không.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>call() vs apply()</h2>
  <p>Both <code>call()</code> and <code>apply()</code> methods invoke a function with a specified <code>this</code> value. However, they differ in how you pass arguments:</p>
  <ul>
    <li><strong>call():</strong> Accepts arguments as a comma-separated list. For example: <code>fn.call(obj, arg1, arg2)</code>.</li>
    <li><strong>apply():</strong> Accepts arguments as an array. For example: <code>fn.apply(obj, [arg1, arg2])</code>.</li>
  </ul>
  <p>Your choice between call and apply depends on whether the arguments are in an array format or individual values.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 13,
    question: "Giải thích higher-order functions trong JavaScript và cho ví dụ.",
    questionENG: "What are higher-order functions in JavaScript? Can you give an example?",
    answer: `
<div>
  <h2>Higher-order Functions</h2>
  <p>Higher-order functions là những hàm có thể nhận một hoặc nhiều hàm khác làm đối số, hoặc trả về một hàm. Chúng giúp trừu tượng hóa các thao tác lặp lại và cho phép tái sử dụng logic theo cách linh hoạt.</p>
  <p><em>Ví dụ:</em> Các phương thức như <code>map()</code>, <code>filter()</code>, và <code>reduce()</code> của mảng là các higher-order functions vì chúng nhận callback function để xử lý từng phần tử của mảng.</p>
  <p>Các hàm này giúp làm cho code trở nên ngắn gọn và dễ bảo trì hơn.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Higher-order Functions</h2>
  <p>Higher-order functions are functions that take one or more functions as arguments or return a function. They allow you to abstract common patterns and reuse functionality in a flexible manner.</p>
  <p><em>Example:</em> Array methods like <code>map()</code>, <code>filter()</code>, and <code>reduce()</code> are higher-order functions because they take a callback function to process each element of an array.</p>
  <p>These functions contribute to writing concise, modular, and maintainable code.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 14,
    question: "Giải thích sự khác biệt giữa `forEach`, `map`, `filter`, và `reduce` trong JavaScript.",
    questionENG: "What is the difference between `forEach`, `map`, `filter`, and `reduce` in JavaScript?",
    answer: `
<div>
  <h2>forEach, map, filter, reduce</h2>
  <ul>
    <li><strong>forEach:</strong> Duyệt qua từng phần tử của mảng và thực hiện một hàm callback. Nó không trả về mảng mới mà chỉ thực thi một thao tác tại mỗi phần tử.</li>
    <li><strong>map:</strong> Thực hiện hàm callback cho từng phần tử và trả về một mảng mới chứa kết quả sau khi biến đổi các phần tử ban đầu.</li>
    <li><strong>filter:</strong> Lọc các phần tử trong mảng dựa trên điều kiện của callback và trả về một mảng mới chỉ chứa các phần tử thỏa mãn điều kiện.</li>
    <li><strong>reduce:</strong> Áp dụng một hàm reducer lên các phần tử của mảng để tính toán thành một giá trị duy nhất, ví dụ như tổng hoặc tích các phần tử.</li>
  </ul>
  <p>Mỗi phương thức phục vụ mục đích khác nhau trong việc xử lý dữ liệu trên mảng, từ đơn giản lặp đi lặp lại đến biến đổi phức tạp.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>forEach, map, filter, reduce</h2>
  <ul>
    <li><strong>forEach:</strong> Iterates over each element of an array and executes a callback function, without returning a new array.</li>
    <li><strong>map:</strong> Applies a callback to each element of an array, returning a new array containing the results of the callback.</li>
    <li><strong>filter:</strong> Filters the array by only including elements that satisfy the condition in the callback, returning a new array with those elements.</li>
    <li><strong>reduce:</strong> Reduces the array to a single value by iteratively applying a reducer function to each element.</li>
  </ul>
  <p>Each method is designed for different data-processing tasks, from simple iteration to complex transformations.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 15,
    question: "Giải thích cách hoạt động của `setTimeout` và `setInterval`.",
    questionENG: "Explain how the `setTimeout` and `setInterval` functions work.",
    answer: `
<div>
  <h2>setTimeout và setInterval</h2>
  <p><strong>setTimeout:</strong> Tạm dừng việc thực thi của một hàm trong khoảng thời gian nhất định (tính bằng mili-giây) rồi chỉ thực hiện một lần sau đó. Nó thường dùng để trì hoãn một tác vụ hoặc tạo hiệu ứng.</p>
  <p><strong>setInterval:</strong> Thực thi một hàm callback lặp đi lặp lại sau mỗi khoảng thời gian cố định cho đến khi bị hủy bằng <code>clearInterval()</code>. Điều này rất hữu ích khi bạn cần cập nhật dữ liệu liên tục, chẳng hạn như đồng hồ hoặc hiện thị thời gian thực.</p>
  <p>Cả hai hàm đều không chặn luồng chính của ứng dụng, giúp duy trì hiệu suất và trải nghiệm người dùng mượt mà.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>setTimeout and setInterval</h2>
  <p><strong>setTimeout:</strong> Delays the execution of a callback function by a specified number of milliseconds and executes it only once.</p>
  <p><strong>setInterval:</strong> Repeatedly calls a callback function at fixed intervals (in milliseconds) until it is cancelled with <code>clearInterval()</code>. This is useful for operations like clocks or real-time updates.</p>
  <p>Both functions execute asynchronously, ensuring that the main execution thread is not blocked, thereby contributing to smoother user experiences.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 16,
    question: "Giải thích sự khác biệt giữa các phương thức `slice()` và `splice()` trong mảng JavaScript.",
    questionENG: "What is the difference between `slice()` and `splice()` methods in JavaScript arrays?",
    answer: `
<div>
  <h2>slice() vs splice()</h2>
  <p><strong>slice():</strong> Tạo ra một mảng mới chứa các phần tử được trích xuất từ mảng gốc dựa trên chỉ số bắt đầu và kết thúc. Mảng ban đầu không bị thay đổi.</p>
  <p><strong>splice():</strong> Thay đổi mảng gốc bằng cách loại bỏ, thêm hoặc thay thế các phần tử từ một vị trí cụ thể. Nó trả về một mảng chứa các phần tử bị loại bỏ (nếu có).</p>
  <p>Sự khác biệt chính là slice không thay đổi mảng ban đầu và trả về bản sao, còn splice trực tiếp thao tác trên mảng gốc.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>slice() vs splice()</h2>
  <p><strong>slice():</strong> Returns a new array containing a portion of the original array, defined by the start and end indices, without modifying the original array.</p>
  <p><strong>splice():</strong> Directly modifies the original array by adding, removing, or replacing elements, and returns the removed elements as a new array.</p>
  <p>The main difference is that slice creates a shallow copy while splice mutates the original array.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 17,
    question: "Giải thích arrow functions trong JavaScript và sự khác biệt so với hàm thông thường.",
    questionENG: "What are arrow functions and how do they differ from regular functions?",
    answer: `
<div>
  <h2>Arrow Functions</h2>
  <p>Arrow functions cung cấp cú pháp viết ngắn gọn cho hàm và có một số khác biệt quan trọng:</p>
  <ul>
    <li><strong>Không có binding cho this:</strong> Arrow functions kế thừa giá trị <code>this</code> từ phạm vi bao quanh, giúp tránh các lỗi do mất ngữ cảnh trong callback.</li>
    <li><strong>Không có đối số riêng:</strong> Không có biến <code>arguments</code> riêng, khiến việc xử lý tham số trở nên đơn giản trong các trường hợp callback.</li>
    <li><strong>Không dùng làm constructor:</strong> Không thể dùng arrow functions với từ khóa <code>new</code>, vì chúng không có prototype riêng.</li>
  </ul>
  <p>Nhờ những đặc điểm này, arrow functions rất phù hợp cho các hàm ngắn gọn, đặc biệt là khi xử lý các hàm callback trong các hàm bất đồng bộ.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Arrow Functions</h2>
  <p>Arrow functions offer a concise syntax and come with several key differences compared to regular functions:</p>
  <ul>
    <li><strong>No own binding for this:</strong> They inherit <code>this</code> from the surrounding lexical scope, which helps prevent context-related bugs in callbacks.</li>
    <li><strong>No separate arguments object:</strong> They do not have their own <code>arguments</code>, simplifying parameter handling in certain scenarios.</li>
    <li><strong>Not constructible:</strong> They cannot be used as constructors with the <code>new</code> keyword because they lack a prototype property.</li>
  </ul>
  <p>These properties make arrow functions ideal for short, inline functions and callbacks where preserving context is essential.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 18,
    question: "Làm thế nào để ngăn một đối tượng bị thay đổi trong JavaScript?",
    questionENG: "How can you prevent an object from being modified in JavaScript?",
    answer: `
<div>
  <h2>Ngăn Chặn Thay Đổi Đối Tượng</h2>
  <p>Bạn có thể sử dụng phương thức <code>Object.freeze()</code> để “đóng băng” đối tượng. Sau khi đối tượng được freeze:</p>
  <ul>
    <li>Không thể thêm hoặc xoá thuộc tính mới.</li>
    <li>Không thể thay đổi giá trị của các thuộc tính hiện có.</li>
    <li>Nếu đối tượng có các thuộc tính là đối tượng lồng nhau, cần freeze đệ quy để đảm bảo tính bất biến.</li>
  </ul>
  <p>Phương pháp này thường được sử dụng trong các ứng dụng cần đảm bảo tính toàn vẹn của state, như trong Redux.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Preventing Object Modification</h2>
  <p>You can prevent an object from being modified by using <code>Object.freeze()</code>, which:</p>
  <ul>
    <li>Prevents new properties from being added or existing properties from being removed.</li>
    <li>Prevents existing properties from being altered.</li>
    <li>For nested objects, a deep freeze (recursive freezing) is required to ensure immutability.</li>
  </ul>
  <p>This method is particularly useful in applications that require immutable state management, such as with Redux.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 19,
    question: "Những tính năng mới của ES6 (ES2015) là gì?",
    questionENG: "What are the new features introduced in ES6 (ES2015)?",
    answer: `
<div>
  <h2>ES6 (ES2015) Features</h2>
  <p>ES6 đã mang đến nhiều cải tiến so với các phiên bản trước, giúp code trở nên hiện đại, ngắn gọn và dễ bảo trì hơn. Một số tính năng nổi bật gồm:</p>
  <ul>
    <li><strong>Let & Const:</strong> Cho phép khai báo biến với phạm vi block, giúp hạn chế lỗi do phạm vi biến không rõ ràng.</li>
    <li><strong>Arrow Functions:</strong> Cú pháp ngắn gọn cho hàm, đồng thời không có binding riêng cho <code>this</code>.</li>
    <li><strong>Template Literals:</strong> Hỗ trợ chuỗi đa dòng và nhúng biểu thức trực tiếp vào chuỗi bằng cú pháp <code>\${expression}</code>.</li>
    <li><strong>Destructuring:</strong> Cho phép trích xuất giá trị từ mảng và đối tượng thành các biến riêng lẻ một cách trực quan.</li>
    <li><strong>Default Parameters:</strong> Khai báo giá trị mặc định cho các tham số hàm khi không có giá trị truyền vào.</li>
    <li><strong>Rest & Spread Operators:</strong> Giúp thao tác với mảng và đối tượng trở nên đơn giản hơn thông qua việc “mở rộng” hoặc hợp nhất các giá trị.</li>
    <li><strong>Classes & Modules:</strong> Cung cấp cú pháp định nghĩa lớp và module rõ ràng, hỗ trợ phát triển ứng dụng quy mô lớn.</li>
    <li><strong>Promises:</strong> Cung cấp cách tiếp cận mới cho xử lý bất đồng bộ, thay thế các callback phức tạp.</li>
  </ul>
  <p>Những tính năng này không chỉ cải thiện cú pháp mà còn giúp tối ưu hóa hiệu năng và khả năng mở rộng của ứng dụng.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>ES6 (ES2015) Features</h2>
  <p>ES6 introduced numerous enhancements over previous versions of JavaScript, making the language more modern, concise, and maintainable. Key features include:</p>
  <ul>
    <li><strong>Let & Const:</strong> Allow block-scoped variable declarations to prevent unintended access and modifications.</li>
    <li><strong>Arrow Functions:</strong> Provide a concise syntax and inherit <code>this</code> from the surrounding context.</li>
    <li><strong>Template Literals:</strong> Support multi-line strings and embedded expressions using the <code>\${expression}</code> syntax.</li>
    <li><strong>Destructuring:</strong> Enables concise extraction of values from arrays and objects into individual variables.</li>
    <li><strong>Default Parameters:</strong> Allow you to specify default values for function parameters if no value is provided.</li>
    <li><strong>Rest & Spread Operators:</strong> Simplify working with arrays and objects by allowing expansion or merging of elements.</li>
    <li><strong>Classes & Modules:</strong> Offer clear syntax for class definitions and module organization, improving code structure in large applications.</li>
    <li><strong>Promises:</strong> Provide a cleaner approach to asynchronous operations, reducing callback complexity.</li>
  </ul>
  <p>These features have modernized JavaScript development, enhancing both the readability and scalability of your code.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 20,
    question: "Giải thích cách hoạt động của destructuring trong JavaScript.",
    questionENG: "Explain how destructuring works in JavaScript.",
    answer: `
<div>
  <h2>Destructuring trong JavaScript</h2>
  <p>Destructuring cho phép bạn giải nén các giá trị từ mảng hoặc đối tượng thành các biến riêng lẻ, giúp code ngắn gọn và rõ ràng hơn.</p>
  <p><strong>Ví dụ với mảng:</strong></p>
  <pre><code>const arr = [1, 2, 3];
const [a, b, c] = arr;
// a = 1, b = 2, c = 3;</code></pre>
  <p><strong>Ví dụ với đối tượng:</strong></p>
  <pre><code>const obj = { name: "John", age: 30 };
const { name, age } = obj;
// name = "John", age = 30;</code></pre>
  <p>Destructuring giúp bạn truy cập nhanh các giá trị cần thiết mà không cần thao tác nhiều bước, đồng thời cải thiện khả năng đọc của code.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Destructuring in JavaScript</h2>
  <p>Destructuring allows you to extract values from arrays or objects into distinct variables in a concise manner.</p>
  <p><strong>Example with an array:</strong></p>
  <pre><code>const arr = [1, 2, 3];
const [a, b, c] = arr;
// a = 1, b = 2, c = 3;</code></pre>
  <p><strong>Example with an object:</strong></p>
  <pre><code>const obj = { name: "John", age: 30 };
const { name, age } = obj;
// name = "John", age = 30;</code></pre>
  <p>This feature streamlines the process of extracting multiple values and improves overall code readability.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 21,
    question: "JavaScript module là gì và làm thế nào để sử dụng chúng?",
    questionENG: "What is a JavaScript module, and how do you use them?",
    answer: `
<div>
  <h2>JavaScript Modules</h2>
  <p>Modules là các đơn vị code độc lập, cho phép bạn tách riêng các chức năng, biến, và hàm, từ đó giúp code dễ quản lý và tái sử dụng hơn.</p>
  <p>Bạn có thể sử dụng từ khóa <code>export</code> để xuất khẩu các thành phần từ một file module, và dùng <code>import</code> để đưa chúng vào các file khác.</p>
  <p><strong>Ví dụ:</strong></p>
  <pre><code>// module.js
export const pi = 3.14;
export function square(x) {
  return x * x;
}

// main.js
import { pi, square } from './module.js';
console.log(pi, square(5));</code></pre>
  <p>Cách tiếp cận theo module giúp phân tách trách nhiệm, giảm thiểu sự phụ thuộc giữa các thành phần và tăng khả năng bảo trì của ứng dụng.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>JavaScript Modules</h2>
  <p>Modules are independent units of code that allow you to organize and separate functionality into reusable components.</p>
  <p>You use the <code>export</code> keyword to expose variables, functions, or classes from a module, and the <code>import</code> keyword to use them in another file.</p>
  <p><strong>Example:</strong></p>
  <pre><code>// module.js
export const pi = 3.14;
export function square(x) {
  return x * x;
}

// main.js
import { pi, square } from './module.js';
console.log(pi, square(5));</code></pre>
  <p>This modular approach promotes separation of concerns and greatly enhances code maintainability and reuse.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 22,
    question: "Giải thích promise chain và cách xử lý lỗi trong chuỗi promise.",
    questionENG: "What is a promise chain? Can you explain how to handle errors in promise chains?",
    answer: `
<div>
  <h2>Promise Chain</h2>
  <p>Promise chain là quá trình nối tiếp các Promise lại với nhau, trong đó kết quả của Promise trước đó được truyền vào Promise tiếp theo thông qua hàm <code>.then()</code>.</p>
  <p>Để xử lý lỗi, thông thường ta đính kèm một hàm <code>.catch()</code> ở cuối chuỗi. Nếu bất kỳ Promise nào bị rejected, lỗi sẽ được bắt và xử lý bởi <code>.catch()</code>. Khi sử dụng async/await, ta có thể sử dụng cấu trúc try/catch để quản lý lỗi một cách trực quan.</p>
  <p>Phương pháp này giúp xây dựng luồng xử lý bất đồng bộ trở nên tuyến tính và dễ kiểm soát.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Promise Chain</h2>
  <p>A promise chain is a sequence of promises where each <code>.then()</code> passes its result to the next promise, creating a linear flow of asynchronous operations.</p>
  <p>To handle errors, it is common to append a <code>.catch()</code> handler at the end of the chain, which will catch any rejection that occurs along the chain. Alternatively, using async/await with try/catch can achieve similar error handling in a cleaner, more synchronous-like style.</p>
  <p>This approach enables clear and manageable asynchronous workflows.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 23,
    question: "Giải thích khái niệm debouncing và throttling trong JavaScript.",
    questionENG: "Explain the concept of debouncing and throttling in JavaScript.",
    answer: `
<div>
  <h2>Debouncing và Throttling</h2>
  <p><strong>Debouncing:</strong> Là kỹ thuật trì hoãn việc thực hiện một hàm cho đến khi không còn sự kiện nào được kích hoạt trong một khoảng thời gian nhất định. Ví dụ: khi người dùng gõ liên tục, hàm chỉ được gọi sau khi người dùng dừng gõ.</p>
  <p><strong>Throttling:</strong> Giới hạn số lần một hàm được thực thi trong một khoảng thời gian cố định. Ví dụ: khi người dùng cuộn trang, hàm chỉ được gọi định kỳ mỗi X mili-giây, tránh việc gọi hàm quá nhiều lần.</p>
  <p>Cả hai kỹ thuật này đều giúp cải thiện hiệu năng của ứng dụng bằng cách giảm số lần thực hiện các hành động tốn tài nguyên.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Debouncing and Throttling</h2>
  <p><strong>Debouncing:</strong> Is a technique that delays the execution of a function until a specified period of inactivity has passed. For instance, during continuous typing, the function only executes after the user stops typing.</p>
  <p><strong>Throttling:</strong> Limits the rate at which a function is called by ensuring it runs at most once every specified interval. For example, during scrolling, a function might only be executed at fixed intervals to prevent performance issues.</p>
  <p>Both methods improve performance by reducing the frequency of function calls in response to high-frequency events.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 24,
    question: "Mục đích của phương thức `Object.freeze()` trong JavaScript là gì?",
    questionENG: "What is the purpose of `Object.freeze()` in JavaScript?",
    answer: `
<div>
  <h2>Object.freeze()</h2>
  <p><code>Object.freeze()</code> được sử dụng để làm cho một đối tượng trở nên bất biến, tức là sau khi freeze, không thể:</p>
  <ul>
    <li>Thêm mới thuộc tính</li>
    <li>Xoá thuộc tính</li>
    <li>Chỉnh sửa giá trị của thuộc tính</li>
  </ul>
  <p>Điều này rất hữu ích trong việc bảo vệ dữ liệu quan trọng, giúp tránh bị thay đổi không mong muốn, đặc biệt khi quản lý state trong các ứng dụng phức tạp.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Object.freeze()</h2>
  <p><code>Object.freeze()</code> is used to make an object immutable. Once an object is frozen:</p>
  <ul>
    <li>No new properties can be added.</li>
    <li>Existing properties cannot be removed.</li>
    <li>The values of existing properties cannot be changed.</li>
  </ul>
  <p>This is particularly useful for protecting critical data and maintaining state integrity in complex applications.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 25,
    question: "Giải thích cách JavaScript quản lý bộ nhớ và thực hiện garbage collection.",
    questionENG: "Explain how JavaScript handles memory management and garbage collection.",
    answer: `
<div>
  <h2>Memory Management và Garbage Collection</h2>
  <p>JavaScript tự động quản lý bộ nhớ thông qua cơ chế cấp phát và thu hồi bộ nhớ. Khi bạn tạo biến, đối tượng, hay hàm, trình biên dịch sẽ cấp phát bộ nhớ cần thiết. Khi các đối tượng không còn được tham chiếu nào nữa (không thể truy cập được từ đâu hết), garbage collector sẽ tự động thu hồi bộ nhớ đó.</p>
  <p>Quá trình garbage collection chủ yếu sử dụng thuật toán mark-and-sweep: đánh dấu các đối tượng có thể truy cập được và sau đó quét dọn các đối tượng không được đánh dấu, giải phóng bộ nhớ.</p>
  <p>Dù quá trình này được tự động hóa, lập trình viên vẫn cần chú ý đến các tham chiếu không cần thiết, nhằm tránh rò rỉ bộ nhớ.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Memory Management and Garbage Collection</h2>
  <p>JavaScript automatically manages memory by allocating it when objects, functions, and variables are created, and by reclaiming it when they are no longer in use. Garbage collection typically uses a mark-and-sweep algorithm where reachable objects are marked and unreachable objects are collected.</p>
  <p>This automated process helps prevent memory leaks, although developers should still remove unused references to ensure optimal performance.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 26,
    question: "Giải thích spread operator (`...`) và cách sử dụng nó trong JavaScript.",
    questionENG: "What is the spread operator (`...`) and how is it used in JavaScript?",
    answer: `
<div>
  <h2>Spread Operator</h2>
  <p>Spread operator (<code>...</code>) cho phép bạn “mở rộng” các phần tử của mảng hoặc các thuộc tính của đối tượng thành các giá trị riêng lẻ. Nó được sử dụng để:</p>
  <ul>
    <li>Sao chép mảng hoặc đối tượng.</li>
    <li>Hợp nhất các mảng hoặc đối tượng.</li>
    <li>Truyền các phần tử của mảng như các đối số cho hàm.</li>
  </ul>
  <p><em>Ví dụ:</em></p>
  <pre><code>const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const mergedObj = { ...obj1, ...obj2 };</code></pre>
</div>
    `,
    answerENG: `
<div>
  <h2>Spread Operator</h2>
  <p>The spread operator (<code>...</code>) expands the elements of an array or the properties of an object into individual elements. It can be used to:</p>
  <ul>
    <li>Copy arrays or objects.</li>
    <li>Merge multiple arrays or objects.</li>
    <li>Pass array elements as separate arguments to a function.</li>
  </ul>
  <p><em>Example:</em></p>
  <pre><code>const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const mergedObj = { ...obj1, ...obj2 };</code></pre>
</div>
    `,
    type: "basic",
  },
  {
    id: 27,
    question: "Giải thích template literal và cách sử dụng chúng trong JavaScript.",
    questionENG: "What is a template literal and how do you use it?",
    answer: `
<div>
  <h2>Template Literals</h2>
  <p>Template literals cho phép tạo chuỗi sử dụng dấu backticks (<code>\`</code>) thay vì dấu nháy đơn hoặc kép, hỗ trợ:</p>
  <ul>
    <li>Chuỗi đa dòng dễ dàng, không cần ký tự newline đặc biệt.</li>
    <li>Nhúng biểu thức trực tiếp vào chuỗi bằng cú pháp <code>\${expression}</code>.</li>
  </ul>
  <p><em>Ví dụ:</em></p>
  <pre><code>const name = "Alice";
const greeting = \`Hello, \${name}! Welcome to our site.\`;
console.log(greeting);</code></pre>
  <p>Template literals giúp code trở nên trực quan và dễ đọc hơn khi làm việc với chuỗi có nhiều dòng hoặc cần xử lý biểu thức bên trong.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Template Literals</h2>
  <p>Template literals allow you to create strings using backticks (<code>\`</code>) instead of traditional quotes. They support:</p>
  <ul>
    <li>Multi-line strings without needing special newline characters.</li>
    <li>Embedded expressions using the <code>\${expression}</code> syntax.</li>
  </ul>
  <p><em>Example:</em></p>
  <pre><code>const name = "Alice";
const greeting = \`Hello, \${name}! Welcome to our site.\`;
console.log(greeting);</code></pre>
  <p>This syntax enhances readability and makes it easier to work with dynamic string content.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 28,
    question: "Giải thích cách JavaScript xử lý các thao tác bất đồng bộ.",
    questionENG: "How does JavaScript handle asynchronous code execution?",
    answer: `
<div>
  <h2>Xử lý Asynchronous trong JavaScript</h2>
  <p>Mặc dù JavaScript là ngôn ngữ đơn luồng, nhưng nhờ vào event loop, nó có thể xử lý đồng thời các tác vụ bất đồng bộ mà không làm chậm giao diện người dùng.</p>
  <p><strong>Các thành phần chính:</strong></p>
  <ul>
    <li><strong>Call Stack:</strong> Nơi thực thi các hàm đồng bộ theo thứ tự.</li>
    <li><strong>Callback Queue:</strong> Lưu trữ các hàm callback của các tác vụ bất đồng bộ như setTimeout, AJAX, và sự kiện người dùng.</li>
    <li><strong>Microtask Queue:</strong> Đưa các Promise callbacks và các microtasks khác vào hàng đợi ưu tiên cao hơn callback queue.</li>
  </ul>
  <p>Khi call stack rỗng, event loop sẽ chuyển các tác vụ từ microtask queue trước, sau đó từ callback queue vào call stack để thực thi. Điều này giúp ứng dụng hoạt động mượt mà và hiệu quả.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Asynchronous Code Execution in JavaScript</h2>
  <p>Although JavaScript is single-threaded, it handles asynchronous operations through an event loop that schedules tasks without blocking the main thread.</p>
  <p><strong>Main Components:</strong></p>
  <ul>
    <li><strong>Call Stack:</strong> Executes synchronous code sequentially.</li>
    <li><strong>Callback Queue:</strong> Holds callbacks from asynchronous operations like setTimeout, AJAX, and user events.</li>
    <li><strong>Microtask Queue:</strong> Contains microtasks (such as Promise callbacks) that are prioritized over regular callbacks.</li>
  </ul>
  <p>When the call stack is empty, the event loop transfers tasks from the microtask queue first, then from the callback queue, ensuring non-blocking execution and a smooth user experience.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 29,
    question: "Giải thích sự khác biệt giữa các hàm đồng bộ và bất đồng bộ.",
    questionENG: "What are the differences between synchronous and asynchronous functions?",
    answer: `
<div>
  <h2>Synchronous vs Asynchronous Functions</h2>
  <p><strong>Synchronous functions:</strong>
    <br>- Thực thi theo thứ tự từ trên xuống dưới, mỗi hàm phải hoàn thành trước khi hàm kế tiếp bắt đầu.
    <br>- Các tác vụ dài có thể làm chậm toàn bộ quá trình thực thi, gây block giao diện.
  </p>
  <p><strong>Asynchronous functions:</strong>
    <br>- Cho phép khởi chạy tác vụ và tiếp tục thực thi các phần khác của code mà không phải chờ đợi.
    <br>- Sử dụng cơ chế như callbacks, Promises, hoặc async/await để xử lý kết quả sau này.
    <br>- Giúp giao diện người dùng luôn mượt mà, vì các tác vụ nặng được thực thi song song.
  </p>
  <p>Như vậy, asynchronous functions cung cấp khả năng xử lý tác vụ bất đồng bộ, đảm bảo hiệu năng và phản hồi nhanh hơn trong ứng dụng.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Synchronous vs Asynchronous Functions</h2>
  <p><strong>Synchronous:</strong>
    <br>- Execute in a strict sequence: one function finishes before the next one begins.
    <br>- Long-running synchronous tasks can block subsequent code execution, affecting performance.
  </p>
  <p><strong>Asynchronous:</strong>
    <br>- Allow operations to run in parallel, so the rest of the code continues executing.
    <br>- Use mechanisms like callbacks, Promises, or async/await to handle the results when they become available.
    <br>- Improve user experience by keeping the interface responsive during long-running tasks.
  </p>
  <p>This distinction is crucial for building applications that remain performant and responsive even during heavy data processing or network requests.</p>
</div>
    `,
    type: "basic",
  },
  {
    id: 30,
    question: "Giải thích mục đích sử dụng của `Object.create()` trong JavaScript.",
    questionENG: "What is the use of `Object.create()` in JavaScript?",
    answer: `
<div>
  <h2>Object.create()</h2>
  <p><code>Object.create()</code> tạo ra một đối tượng mới với prototype được chỉ định, giúp thực hiện kế thừa một cách trực tiếp mà không cần dùng đến hàm khởi tạo (constructor).</p>
  <p>Bằng cách này, bạn có thể:</p>
  <ul>
    <li>Tạo ra các đối tượng chia sẻ chung một tập các phương thức và thuộc tính từ prototype.</li>
    <li>Giảm thiểu việc lặp lại code bằng cách chia sẻ logic chung qua các đối tượng.</li>
    <li>Dễ dàng ghi đè hoặc mở rộng các thuộc tính của prototype theo nhu cầu.</li>
  </ul>
  <p><em>Ví dụ:</em> Giả sử có đối tượng <code>animal</code> chứa phương thức chung, bạn có thể tạo đối tượng <code>dog</code> kế thừa từ <code>animal</code> để sử dụng các phương thức đó mà không cần viết lại.</p>
</div>
    `,
    answerENG: `
<div>
  <h2>Object.create()</h2>
  <p><code>Object.create()</code> creates a new object with the specified prototype, enabling direct inheritance without the need for constructor functions.</p>
  <p>This method allows you to:</p>
  <ul>
    <li>Create objects that share common methods and properties from a prototype.</li>
    <li>Avoid duplicating code by reusing shared logic across objects.</li>
    <li>Easily override or extend properties on the newly created object as needed.</li>
  </ul>
  <p><em>Example:</em> Given an <code>animal</code> object with common methods, you can create a <code>dog</code> object that inherits from <code>animal</code> to reuse those methods without rewriting them.</p>
</div>
    `,
    type: "basic",
  }
];

export default QAJavascript;
