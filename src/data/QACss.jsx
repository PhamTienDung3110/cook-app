const QACss = [
  {
    id: 1,
    question: "CSS là gì?",
    questionENG: "What is CSS?",
    answer: `
      <div>
        <h2>CSS là gì?</h2>
        <p><strong>CSS</strong> (Cascading Style Sheets) là ngôn ngữ định kiểu được sử dụng để mô tả cách trình bày của một tài liệu HTML hoặc XML. CSS xác định cách các phần tử trên trang web được hiển thị, bao gồm màu sắc, phông chữ, bố cục và khoảng cách giữa các phần tử.</p>
        <p>CSS giúp cho việc tách biệt nội dung và giao diện của trang web, giúp người phát triển dễ dàng thay đổi giao diện mà không cần thay đổi mã HTML. Ví dụ, bạn có thể thay đổi màu nền của trang web, font chữ, chiều rộng và chiều cao của các phần tử mà không làm ảnh hưởng đến nội dung của nó.</p>
        <p><b>Ví dụ:</b></p>
        <pre><code>
body {
  background-color: lightblue;
  color: darkslategray;
}

h1 {
  font-family: Arial, sans-serif;
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>What is CSS?</h2>
        <p><strong>CSS</strong> (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS defines how elements on a web page are displayed, including colors, fonts, layouts, and spacing between elements.</p>
        <p>CSS separates content from layout, enabling developers to easily change the design of a webpage without altering its structure. For instance, you can change the background color, font style, width, and height of elements without affecting the content.</p>
        <p><b>Example:</b></p>
        <pre><code>
body {
  background-color: lightblue;
  color: darkslategray;
}

h1 {
  font-family: Arial, sans-serif;
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 2,
    question: "Có những cách nào để thêm CSS vào trang web?",
    questionENG: "What are the ways to add CSS to a web page?",
    answer: `
      <div>
        <h2>Các cách thêm CSS vào trang web</h2>
        <p>Trong HTML, có ba cách chính để thêm CSS vào trang web:</p>
        <ul>
          <li><b>Inline CSS</b>: Thêm thuộc tính <code>style</code> trực tiếp vào thẻ HTML. Ví dụ: <code>&lt;p style="color: blue;"&gt;Đoạn văn bản&lt;/p&gt;</code></li>
          <li><b>Internal CSS</b>: Đặt các quy tắc CSS trong thẻ <code>&lt;style&gt;</code> bên trong phần <code>&lt;head&gt;</code> của tài liệu HTML. Ví dụ: <code>&lt;style&gt;p { color: blue; }&lt;/style&gt;</code></li>
          <li><b>External CSS</b>: Liên kết đến tệp CSS bên ngoài bằng thẻ <code>&lt;link&gt;</code> trong phần <code>&lt;head&gt;</code>. Ví dụ: <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></li>
        </ul>
        <p><b>Ví dụ:</b></p>
        <pre><code>
&lt;head&gt;
  &lt;style&gt;
    p {
      color: blue;
    }
  &lt;/style&gt;
&lt;/head&gt;
        </code></pre>
        <p>Cách sử dụng External CSS là phương pháp phổ biến và mạnh mẽ nhất vì nó giúp tách biệt phần giao diện và nội dung, đồng thời dễ dàng bảo trì và thay đổi phong cách cho toàn bộ trang web.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Ways to Add CSS to a Web Page</h2>
        <p>In HTML, there are three main ways to add CSS to a web page:</p>
        <ul>
          <li><b>Inline CSS</b>: Add the <code>style</code> attribute directly to HTML elements. Example: <code>&lt;p style="color: blue;"&gt;Text&lt;/p&gt;</code></li>
          <li><b>Internal CSS</b>: Place CSS rules inside a <code>&lt;style&gt;</code> tag within the <code>&lt;head&gt;</code> section of the HTML document. Example: <code>&lt;style&gt;p { color: blue; }&lt;/style&gt;</code></li>
          <li><b>External CSS</b>: Link to an external CSS file using a <code>&lt;link&gt;</code> tag in the <code>&lt;head&gt;</code> section. Example: <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></li>
        </ul>
        <p><b>Example:</b></p>
        <pre><code>
&lt;head&gt;
  &lt;style&gt;
    p {
      color: blue;
    }
  &lt;/style&gt;
&lt;/head&gt;
        </code></pre>
        <p>Using External CSS is the most common and powerful method, as it separates the structure and the styling of a page, making it easier to maintain and apply design changes to the entire website.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 3,
    question: "Bạn biết các đơn vị đo độ dài nào trong CSS và giải thích về chúng?",
    questionENG: "What length units are used in CSS and explain them?",
    answer: `
      <div>
        <h2>Các đơn vị đo độ dài trong CSS</h2>
        <p>Trong CSS, có 2 loại đơn vị đo độ dài chính:</p>
        <ul>
          <li><b>Đơn vị tuyệt đối</b>: Xác định kích thước cố định, không thay đổi theo bối cảnh. Ví dụ: <code>px</code> (pixel), <code>cm</code> (centimeter), <code>mm</code> (millimeter), <code>in</code> (inch), <code>pt</code> (point), <code>pc</code> (pica).</li>
          <li><b>Đơn vị tương đối</b>: Kích thước thay đổi dựa trên yếu tố khác. Ví dụ: <code>%</code> (phần trăm), <code>em</code> (dựa trên kích thước phông chữ của phần tử cha), <code>rem</code> (dựa trên kích thước phông chữ của phần tử gốc), <code>vw</code> (viewport width), <code>vh</code> (viewport height).</li>
        </ul>
        <p>Đơn vị tuyệt đối có giá trị cố định, không phụ thuộc vào các yếu tố bên ngoài. Trong khi đó, đơn vị tương đối có thể thay đổi tùy theo các yếu tố khác như kích thước màn hình hoặc phông chữ của phần tử cha.</p>
        <p><b>Ví dụ:</b></p>
        <pre><code>
div {
  width: 50%; /* Đơn vị % */
  font-size: 2em; /* Đơn vị em */
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Length Units in CSS</h2>
        <p>In CSS, there are 2 primary types of length units:</p>
        <ul>
          <li><b>Absolute Units</b>: Define fixed sizes that do not change relative to other elements. Examples: <code>px</code> (pixel), <code>cm</code> (centimeter), <code>mm</code> (millimeter), <code>in</code> (inch), <code>pt</code> (point), <code>pc</code> (pica).</li>
          <li><b>Relative Units</b>: Sizes that depend on other factors. Examples: <code>%</code> (percentage), <code>em</code> (based on the font size of the parent element), <code>rem</code> (based on the font size of the root element), <code>vw</code> (viewport width), <code>vh</code> (viewport height).</li>
        </ul>
        <p>Absolute units have fixed values that do not depend on other factors, while relative units may change based on other elements, such as the font size of the parent element or screen size.</p>
        <p><b>Example:</b></p>
        <pre><code>
div {
  width: 50%; /* Percentage unit */
  font-size: 2em; /* Em unit */
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 4,
    question: "Phân biệt giữa các thuộc tính position: static, relative, absolute, fixed và sticky?",
    questionENG: "Differentiate between position: static, relative, absolute, fixed, and sticky?",
    answer: `
      <div>
        <h2>Phân biệt các thuộc tính position trong CSS</h2>
        <p>Thuộc tính <code>position</code> xác định cách một phần tử được định vị:</p>
        <ul>
          <li><b>static</b>: Giá trị mặc định, không cho phép dùng các thuộc tính định vị như <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>.</li>
          <li><b>relative</b>: Phần tử được định vị tương đối với vị trí ban đầu trong luồng tài liệu, cho phép điều chỉnh vị trí thông qua các thuộc tính định vị.</li>
          <li><b>absolute</b>: Phần tử được định vị tuyệt đối so với phần tử cha có định vị (khác static) hoặc so với toàn bộ trang nếu không có phần tử cha tương ứng.</li>
          <li><b>fixed</b>: Phần tử được định vị so với cửa sổ trình duyệt, không thay đổi vị trí khi cuộn trang.</li>
          <li><b>sticky</b>: Phần tử ban đầu hoạt động như relative cho đến khi đạt đến một điểm cuộn nhất định, sau đó nó cố định vị trí như fixed.</li>
        </ul>
        <p><b>Ví dụ:</b></p>
        <pre><code>
div {
  position: absolute;
  top: 50px;
  left: 100px;
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Differentiate between position in CSS</h2>
        <p>The <code>position</code> property determines how an element is positioned:</p>
        <ul>
          <li><b>static</b>: The default value; the element is positioned in the normal document flow and cannot use positional properties like <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>.</li>
          <li><b>relative</b>: The element is positioned relative to its original position and can be moved using positional properties.</li>
          <li><b>absolute</b>: The element is removed from the normal document flow and is positioned relative to the nearest positioned ancestor or the document if none exists.</li>
          <li><b>fixed</b>: The element is positioned relative to the browser window and does not move when the page is scrolled.</li>
          <li><b>sticky</b>: The element behaves like relative until a specified scroll position is reached, then it becomes fixed.</li>
        </ul>
        <p><b>Example:</b></p>
        <pre><code>
div {
  position: absolute;
  top: 50px;
  left: 100px;
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 5,
    question: "Margin và padding trong CSS khác nhau thế nào?",
    questionENG: "What is the difference between margin and padding in CSS?",
    answer: `
      <div>
        <h2>Margin và Padding trong CSS</h2>
        <p>Cả hai thuộc tính này đều tạo khoảng cách, nhưng:</p>
        <ul>
          <li><b>Margin</b>: Tạo khoảng cách bên ngoài phần tử, giữa phần tử và các phần tử lân cận.</li>
          <li><b>Padding</b>: Tạo khoảng cách bên trong phần tử, giữa nội dung và viền của phần tử.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Margin and Padding in CSS</h2>
        <p>Both are used for spacing, but:</p>
        <ul>
          <li><b>Margin</b>: Creates space outside the element, between the element and its neighbors.</li>
          <li><b>Padding</b>: Creates space inside the element, between the element's content and its border.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 6,
    question: "Sự khác nhau giữa inline, block và inline-block trong CSS là gì?",
    questionENG: "What is the difference between inline, block, and inline-block elements in CSS?",
    answer: `
      <div>
        <h2>Inline, Block và Inline-Block</h2>
        <ul>
          <li><b>Inline</b>: Phần tử chỉ chiếm không gian cần thiết và không bắt đầu trên dòng mới (ví dụ: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>).</li>
          <li><b>Block</b>: Phần tử chiếm toàn bộ chiều rộng của container và luôn bắt đầu trên một dòng mới (ví dụ: <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>).</li>
          <li><b>Inline-block</b>: Kết hợp đặc điểm của inline và block; phần tử được xếp trong dòng như inline nhưng có thể đặt kích thước chiều rộng và chiều cao.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Inline, Block and Inline-Block</h2>
        <ul>
          <li><b>Inline</b>: The element only takes up as much width as necessary and does not break into a new line (e.g., <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>).</li>
          <li><b>Block</b>: The element occupies the full width of its container and always starts on a new line (e.g., <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>).</li>
          <li><b>Inline-block</b>: The element flows inline but respects width and height properties.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 7,
    question: "Thẻ <code>&lt;div&gt;</code> và <code>&lt;span&gt;</code> khác nhau thế nào?",
    questionENG: "What is the difference between <div> and <span> elements?",
    answer: `
      <div>
        <h2>So sánh &lt;div&gt; và &lt;span&gt;</h2>
        <ul>
          <li><b>&lt;div&gt;</b>: Là phần tử block-level, dùng để nhóm các thành phần và tạo bố cục theo khối.</li>
          <li><b>&lt;span&gt;</b>: Là phần tử inline, thường dùng để nhóm các phần tử nhỏ trong dòng mà không phá vỡ cấu trúc dòng chữ.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Difference between &lt;div&gt; and &lt;span&gt;</h2>
        <ul>
          <li><b>&lt;div&gt;</b>: A block-level element used for grouping and layout purposes.</li>
          <li><b>&lt;span&gt;</b>: An inline element used for grouping inline portions of text or elements.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 8,
    question: "Thuộc tính <code>!important</code> trong CSS có tác dụng gì?",
    questionENG: "What does the <code>!important</code> declaration do in CSS?",
    answer: `
      <div>
        <h2>!important trong CSS</h2>
        <p>Thuộc tính <code>!important</code> được sử dụng để tăng độ ưu tiên của một quy tắc CSS, ghi đè lên các quy tắc khác có cùng mức độ ưu tiên. Tuy nhiên, nên sử dụng một cách hạn chế vì có thể gây khó khăn trong việc bảo trì code.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Using <code>!important</code> in CSS</h2>
        <p>The <code>!important</code> declaration increases the priority of a CSS rule, overriding any other rules with lower specificity. However, it should be used sparingly as it can make maintenance harder.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 9,
    question: "Thuộc tính nào được sử dụng để thay đổi phông chữ trong CSS?",
    questionENG: "Which property is used to change the font in CSS?",
    answer: `
      <div>
        <h2>Thay đổi phông chữ với <code>font-family</code></h2>
        <p>Sử dụng thuộc tính <code>font-family</code> để thiết lập phông chữ cho phần tử. Ví dụ: <code>font-family: Arial, sans-serif;</code>.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Changing Fonts with <code>font-family</code></h2>
        <p>The <code>font-family</code> property sets the typeface for an element. For example: <code>font-family: Arial, sans-serif;</code>.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 10,
    question: "Đơn vị <code>vh</code> và <code>vw</code> trong CSS là gì?",
    questionENG: "What are the <code>vh</code> and <code>vw</code> units in CSS?",
    answer: `
      <div>
        <h2>Đơn vị <code>vh</code> và <code>vw</code></h2>
        <p><code>vh</code> (viewport height) là 1% của chiều cao vùng nhìn của cửa sổ, và <code>vw</code> (viewport width) là 1% của chiều rộng vùng nhìn. Chúng được dùng để tạo bố cục tương đối theo kích thước của cửa sổ trình duyệt.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2><code>vh</code> and <code>vw</code> Units</h2>
        <p><code>vh</code> is 1% of the viewport height and <code>vw</code> is 1% of the viewport width. These units are useful for creating layouts relative to the browser's size.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 11,
    question: "Có những cách nào để ẩn một phần tử trong CSS?",
    questionENG: "What are the methods to hide an element in CSS?",
    answer: `
      <div>
        <h2>Các cách ẩn phần tử</h2>
        <ul>
          <li><b>display: none;</b>: Phần tử sẽ không được hiển thị và không chiếm không gian.</li>
          <li><b>visibility: hidden;</b>: Phần tử không hiển thị nhưng vẫn chiếm không gian.</li>
          <li><b>opacity: 0;</b>: Phần tử trở nên trong suốt hoàn toàn nhưng vẫn giữ không gian và có thể tương tác nếu có sự kiện.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Methods to Hide an Element</h2>
        <ul>
          <li><b>display: none;</b>: The element is not rendered and does not take up any space.</li>
          <li><b>visibility: hidden;</b>: The element is invisible but still occupies space.</li>
          <li><b>opacity: 0;</b>: The element is fully transparent but still occupies space and can capture events.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 12,
    question: "CSS Flexbox là gì và khi nào nên sử dụng?",
    questionENG: "What is CSS Flexbox and when should it be used?",
    answer: `
      <div>
        <h2>CSS Flexbox</h2>
        <p>Flexbox là một hệ thống bố cục một chiều giúp dễ dàng căn chỉnh, phân phối không gian giữa các phần tử trong container, đặc biệt hữu ích khi kích thước phần tử không cố định.</p>
        <p><b>Ví dụ:</b></p>
        <pre><code>
.container {
  display: flex;
  justify-content: space-between;
}

.item {
  flex: 1;
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Flexbox</h2>
        <p>Flexbox is a one-dimensional layout system that simplifies the alignment and distribution of space among items in a container, especially when the sizes of items are unknown or dynamic.</p>
        <p><b>Example:</b></p>
        <pre><code>
.container {
  display: flex;
  justify-content: space-between;
}

.item {
  flex: 1;
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 13,
    question: "CSS Grid Layout là gì và khi nào nên sử dụng?",
    questionENG: "What is CSS Grid Layout and when should it be used?",
    answer: `
      <div>
        <h2>CSS Grid Layout</h2>
        <p>CSS Grid Layout là hệ thống bố cục hai chiều, cho phép tạo ra các thiết kế phức tạp với hàng và cột. Nó rất phù hợp khi cần kiểm soát chính xác vị trí của các phần tử trong bố cục.</p>
        <p><b>Ví dụ:</b></p>
        <pre><code>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.item {
  grid-column: span 2;
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Grid Layout</h2>
        <p>CSS Grid Layout is a two-dimensional layout system that enables you to design complex web layouts with rows and columns. It is ideal when precise control over the placement of items is required.</p>
        <p><b>Example:</b></p>
        <pre><code>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.item {
  grid-column: span 2;
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 14,
    question: "Làm thế nào để căn giữa một phần tử trong CSS?",
    questionENG: "How do you center an element in CSS?",
    answer: `
      <div>
        <h2>Cách căn giữa phần tử</h2>
        <ul>
          <li><b>Căn giữa theo chiều ngang</b>: Đối với phần tử block, sử dụng <code>margin: 0 auto;</code>; đối với văn bản, sử dụng <code>text-align: center;</code> trên phần tử cha.</li>
          <li><b>Căn giữa theo chiều dọc</b>: Sử dụng Flexbox trên phần tử cha: <code>display: flex; align-items: center;</code> hoặc đặt <code>line-height</code> bằng chiều cao của phần tử nếu nó chỉ chứa một dòng văn bản.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Centering an Element</h2>
        <ul>
          <li><b>Horizontally</b>: For block elements, use <code>margin: 0 auto;</code>. For inline text, apply <code>text-align: center;</code> on the parent container.</li>
          <li><b>Vertically</b>: Use Flexbox on the parent container with <code>display: flex; align-items: center;</code> or set the <code>line-height</code> equal to the element's height if it only contains one line of text.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 15,
    question: "CSS Pseudo-classes là gì? Cho ví dụ về <code>:hover</code> và <code>:active</code>.",
    questionENG: "What are CSS pseudo-classes? Provide examples of <code>:hover</code> and <code>:active</code>.",
    answer: `
      <div>
        <h2>CSS Pseudo-classes</h2>
        <p>Pseudo-classes được sử dụng để định kiểu các trạng thái đặc biệt của phần tử. Ví dụ:</p>
        <ul>
          <li><b>:hover</b>: Áp dụng khi người dùng di chuột qua phần tử.</li>
          <li><b>:active</b>: Áp dụng khi phần tử được kích hoạt, chẳng hạn như khi nhấn vào liên kết hoặc nút.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Pseudo-classes</h2>
        <p>Pseudo-classes style elements based on their state. For example:</p>
        <ul>
          <li><b>:hover</b>: Applied when the mouse hovers over an element.</li>
          <li><b>:active</b>: Applied when an element is activated, such as when a link or button is pressed.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 16,
    question: "CSS Pseudo-elements là gì? Cho ví dụ về <code>::before</code> và <code>::after</code>.",
    questionENG: "What are CSS pseudo-elements? Provide examples of <code>::before</code> and <code>::after</code>.",
    answer: `
      <div>
        <h2>CSS Pseudo-elements</h2>
        <p>Pseudo-elements cho phép bạn định dạng một phần của phần tử. Ví dụ:</p>
        <ul>
          <li><b>::before</b>: Chèn nội dung vào trước nội dung của phần tử.</li>
          <li><b>::after</b>: Chèn nội dung vào sau nội dung của phần tử.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Pseudo-elements</h2>
        <p>Pseudo-elements allow you to style parts of an element. For example:</p>
        <ul>
          <li><b>::before</b>: Inserts content before an element's content.</li>
          <li><b>::after</b>: Inserts content after an element's content.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 17,
    question: "Media Queries trong CSS là gì và làm thế nào để sử dụng?",
    questionENG: "What are Media Queries in CSS and how do you use them?",
    answer: `
      <div>
        <h2>Media Queries</h2>
        <p>Media Queries cho phép áp dụng các quy tắc CSS khác nhau cho các thiết bị và kích thước màn hình khác nhau. Ví dụ:</p>
        <pre><code>
@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}
        </code></pre>
        <p>Trong ví dụ trên, khi kích thước màn hình nhỏ hơn hoặc bằng 768px, nền của trang sẽ chuyển sang màu xanh nhạt.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Media Queries</h2>
        <p>Media Queries allow you to apply different CSS rules based on device characteristics and screen sizes. For example:</p>
        <pre><code>
@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}
        </code></pre>
        <p>In the example above, when the screen width is 768px or less, the background color of the page changes to light blue.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 18,
    question: "CSS Specificity là gì và ảnh hưởng ra sao đến việc áp dụng style?",
    questionENG: "What is CSS specificity and how does it affect style application?",
    answer: `
      <div>
        <h2>CSS Specificity</h2>
        <p>Specificity xác định mức độ ưu tiên của các quy tắc CSS khi có xung đột. Nó được tính dựa trên số lượng selectors: inline styles có độ ưu tiên cao nhất, sau đó là IDs, classes, và cuối cùng là selectors theo tên thẻ.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Specificity</h2>
        <p>Specificity determines which CSS rule will be applied when multiple rules conflict. It is calculated based on the number of selectors: inline styles have the highest priority, followed by IDs, classes, and then tag selectors.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 19,
    question: "CSS combinators là gì? Cho ví dụ về descendant, child, adjacent và general sibling selectors.",
    questionENG: "What are CSS combinators? Provide examples of descendant, child, adjacent, and general sibling selectors.",
    answer: `
      <div>
        <h2>CSS Combinators</h2>
        <ul>
          <li><b>Descendant</b>: Chọn tất cả các phần tử con (không nhất thiết trực tiếp) ví dụ: <code>div p</code></li>
          <li><b>Child</b>: Chọn các phần tử con trực tiếp. Ví dụ: <code>ul > li</code></li>
          <li><b>Adjacent sibling</b>: Chọn phần tử ngay sau một phần tử cụ thể. Ví dụ: <code>h1 + p</code></li>
          <li><b>General sibling</b>: Chọn tất cả các phần tử anh chị em cùng cấp sau phần tử cụ thể. Ví dụ: <code>h1 ~ p</code></li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Combinators</h2>
        <ul>
          <li><b>Descendant</b>: Selects all elements that are descendants (not necessarily direct children) of a specified element. Example: <code>div p</code></li>
          <li><b>Child</b>: Selects direct child elements only. Example: <code>ul > li</code></li>
          <li><b>Adjacent sibling</b>: Selects the immediate next sibling. Example: <code>h1 + p</code></li>
          <li><b>General sibling</b>: Selects all siblings following the specified element. Example: <code>h1 ~ p</code></li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 20,
    question: "CSS Inheritance là gì và thuộc tính nào thường được thừa kế?",
    questionENG: "What is CSS Inheritance and which properties are typically inherited?",
    answer: `
      <div>
        <h2>CSS Inheritance</h2>
        <p>Inheritance là cơ chế mà một số thuộc tính CSS của phần tử cha được truyền xuống phần tử con. Các thuộc tính liên quan đến văn bản (như <code>color</code>, <code>font-family</code>, <code>font-size</code>) thường được thừa kế, trong khi các thuộc tính về bố cục (như <code>margin</code>, <code>padding</code>) thì không.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Inheritance</h2>
        <p>Inheritance is a mechanism where certain CSS properties of a parent element are passed on to its children. Typically, text-related properties (such as <code>color</code>, <code>font-family</code>, <code>font-size</code>) are inherited, whereas layout properties (like <code>margin</code> and <code>padding</code>) are not.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 21,
    question: "Giải thích Box Model trong CSS.",
    questionENG: "Explain the Box Model in CSS.",
    answer: `
      <div>
        <h2>Box Model trong CSS</h2>
        <p>Mô hình hộp (Box Model) bao gồm:</p>
        <ul>
          <li><b>Content</b>: Nội dung của phần tử.</li>
          <li><b>Padding</b>: Khoảng cách giữa nội dung và viền.</li>
          <li><b>Border</b>: Viền bao quanh phần tử.</li>
          <li><b>Margin</b>: Khoảng cách giữa viền và phần tử khác.</li>
        </ul>
        <p>Thuộc tính <code>box-sizing</code> có thể thay đổi cách tính toán kích thước của phần tử.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>The CSS Box Model</h2>
        <p>The Box Model consists of:</p>
        <ul>
          <li><b>Content</b>: The content of the element.</li>
          <li><b>Padding</b>: Space between the content and the border.</li>
          <li><b>Border</b>: The border surrounding the element.</li>
          <li><b>Margin</b>: Space between the border and other elements.</li>
        </ul>
        <p>The <code>box-sizing</code> property can alter how the total width and height of the element are calculated.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 22,
    question: "CSS Transitions là gì và làm thế nào để sử dụng?",
    questionENG: "What are CSS Transitions and how do you use them?",
    answer: `
      <div>
        <h2>CSS Transitions</h2>
        <p>CSS Transitions cho phép thay đổi dần dần các thuộc tính CSS khi có sự thay đổi trạng thái. Cú pháp cơ bản:</p>
        <pre><code>
.element {
  transition: property duration timing-function;
}
        </code></pre>
        <p>Ví dụ, chuyển màu nền khi hover:</p>
        <pre><code>
.box {
  background-color: blue;
  transition: background-color 0.5s ease;
}

.box:hover {
  background-color: red;
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Transitions</h2>
        <p>CSS Transitions enable gradual changes to CSS properties when state changes occur. A basic syntax is:</p>
        <pre><code>
.element {
  transition: property duration timing-function;
}
        </code></pre>
        <p>For example, changing the background color on hover:</p>
        <pre><code>
.box {
  background-color: blue;
  transition: background-color 0.5s ease;
}

.box:hover {
  background-color: red;
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 23,
    question: "CSS Animations là gì và làm thế nào để sử dụng?",
    questionENG: "What are CSS Animations and how do you use them?",
    answer: `
      <div>
        <h2>CSS Animations</h2>
        <p>CSS Animations cho phép tạo ra các hiệu ứng động phức tạp thông qua việc định nghĩa các keyframes:</p>
        <pre><code>
@keyframes example {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(100px); }
  100% { transform: translateX(0); }
}

.animate {
  animation: example 2s infinite;
}
        </code></pre>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Animations</h2>
        <p>CSS Animations allow you to create complex dynamic effects by defining keyframes:</p>
        <pre><code>
@keyframes example {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(100px); }
  100% { transform: translateX(0); }
}

.animate {
  animation: example 2s infinite;
}
        </code></pre>
      </div>
    `,
    type: "basic",
  },
  {
    id: 24,
    question: "Z-index trong CSS có tác dụng gì và hoạt động ra sao?",
    questionENG: "What is the purpose of z-index in CSS and how does it work?",
    answer: `
      <div>
        <h2>Z-index</h2>
        <p>Thuộc tính <code>z-index</code> xác định thứ tự xếp chồng của các phần tử có vị trí định nghĩa (position khác static). Phần tử có <code>z-index</code> cao hơn sẽ được hiển thị phía trên phần tử có <code>z-index</code> thấp hơn.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Z-index</h2>
        <p>The <code>z-index</code> property determines the stacking order of positioned elements. Elements with a higher <code>z-index</code> appear on top of those with a lower one.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 25,
    question: "Sự khác biệt giữa các đơn vị <code>px</code>, <code>em</code> và <code>rem</code> là gì?",
    questionENG: "What is the difference between <code>px</code>, <code>em</code>, and <code>rem</code> units?",
    answer: `
      <div>
        <h2>So sánh px, em và rem</h2>
        <ul>
          <li><b>px</b>: Đơn vị tuyệt đối, cố định.</li>
          <li><b>em</b>: Đơn vị tương đối, phụ thuộc vào kích thước phông chữ của phần tử cha.</li>
          <li><b>rem</b>: Đơn vị tương đối, dựa trên kích thước phông chữ của phần tử gốc (thường là thẻ <code>&lt;html&gt;</code>).</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Comparing px, em, and rem</h2>
        <ul>
          <li><b>px</b>: An absolute unit with a fixed size.</li>
          <li><b>em</b>: A relative unit based on the font size of the parent element.</li>
          <li><b>rem</b>: A relative unit based on the font size of the root element (usually the <code>&lt;html&gt;</code> element).</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 26,
    question: "Làm thế nào để tạo giao diện web đáp ứng (responsive design) với CSS?",
    questionENG: "How do you create a responsive web design using CSS?",
    answer: `
      <div>
        <h2>Responsive Design</h2>
        <p>Responsive design đảm bảo giao diện web thích ứng với các kích cỡ màn hình khác nhau bằng cách sử dụng:</p>
        <ul>
          <li>Media Queries để thay đổi kiểu dáng cho từng kích thước màn hình.</li>
          <li>Đơn vị tương đối như % và viewport units (<code>vh</code>, <code>vw</code>).</li>
          <li>CSS Flexbox hoặc Grid để bố trí linh hoạt.</li>
        </ul>
      </div>
    `,
    answerENG: `
      <div>
        <h2>Responsive Design</h2>
        <p>Responsive design ensures a website adapts to different screen sizes by using:</p>
        <ul>
          <li>Media Queries to adjust styles based on screen dimensions.</li>
          <li>Relative units like percentages and viewport units (<code>vh</code>, <code>vw</code>).</li>
          <li>CSS Flexbox or Grid for flexible layouts.</li>
        </ul>
      </div>
    `,
    type: "basic",
  },
  {
    id: 27,
    question: "CSS Reset là gì và tại sao nó quan trọng?",
    questionENG: "What is a CSS Reset and why is it important?",
    answer: `
      <div>
        <h2>CSS Reset</h2>
        <p>CSS Reset là tập hợp các quy tắc giúp loại bỏ các kiểu mặc định của trình duyệt, tạo một nền tảng nhất quán để phát triển giao diện.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Reset</h2>
        <p>A CSS Reset is a set of CSS rules that removes the browser's default styling to provide a consistent baseline for styling your web pages.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 28,
    question: "CSS Preprocessor (SASS/LESS) là gì và có những lợi ích gì?",
    questionENG: "What are CSS Preprocessors (SASS/LESS) and what are their benefits?",
    answer: `
      <div>
        <h2>CSS Preprocessors</h2>
        <p>CSS Preprocessors như SASS và LESS cho phép viết CSS theo cách có cấu trúc hơn, hỗ trợ biến, nesting, mixins,... Giúp code sạch hơn, dễ bảo trì và mở rộng.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Preprocessors</h2>
        <p>CSS Preprocessors like SASS and LESS let you write more structured and maintainable CSS by providing features like variables, nesting, and mixins.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 29,
    question: "CSS Variables là gì và làm thế nào để sử dụng?",
    questionENG: "What are CSS Variables and how do you use them?",
    answer: `
      <div>
        <h2>CSS Variables</h2>
        <p>CSS Variables (Custom Properties) cho phép định nghĩa các giá trị tái sử dụng trong CSS. Ví dụ:</p>
        <pre><code>
:root {
  --main-color: #3498db;
}

h1 {
  color: var(--main-color);
}
        </code></pre>
        <p>Giúp code dễ bảo trì và thay đổi giá trị ở một nơi duy nhất.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>CSS Variables</h2>
        <p>CSS Variables (Custom Properties) allow you to define reusable values in your CSS. For example:</p>
        <pre><code>
:root {
  --main-color: #3498db;
}

h1 {
  color: var(--main-color);
}
        </code></pre>
        <p>This makes the code easier to maintain and update.</p>
      </div>
    `,
    type: "basic",
  },
  {
    id: 30,
    question: "Giải thích khái niệm 'Cascading' trong CSS và cách nó ảnh hưởng đến độ ưu tiên của các quy tắc.",
    questionENG: "Explain the concept of 'Cascading' in CSS and how it affects the specificity of rules.",
    answer: `
      <div>
        <h2>Cascading trong CSS</h2>
        <p>Từ "Cascading" trong CSS ám chỉ cách các quy tắc được sắp xếp và ghi đè lẫn nhau dựa trên nguồn gốc, thứ tự và độ ưu tiên (specificity). Quy tắc nào có độ ưu tiên cao hơn sẽ ghi đè quy tắc có độ ưu tiên thấp hơn. Các yếu tố quyết định bao gồm inline styles, selectors, và thứ tự xuất hiện của các quy tắc.</p>
      </div>
    `,
    answerENG: `
      <div>
        <h2>The 'Cascading' in CSS</h2>
        <p>The term "Cascading" in CSS refers to the way that CSS rules are applied and override one another based on their source, order, and specificity. Rules with higher specificity override those with lower specificity, and the order of appearance also plays a role.</p>
      </div>
    `,
    type: "basic",
  }
];

export default QACss;
  