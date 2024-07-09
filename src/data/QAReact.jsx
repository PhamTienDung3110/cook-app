const QnAReact = [
  {
    question: "Trình bày về lifecycle của reactjs?",
    answer: `
    <h1>ReactJS Lifecycle Methods</h1>

        <h2>1. Mounting (Giai đoạn gắn vào DOM)</h2>
        <p>
          Giai đoạn này xảy ra khi một component được tạo và chèn vào DOM. Các
          phương thức sau được gọi theo thứ tự:
        </p>
        <ul>
          <li>
            <b>constructor()</b>: Phương thức này được gọi đầu tiên, được sử
            dụng để khởi tạo state và binding các phương thức.
          </li>
          <li>
            <b>static getDerivedStateFromProps()</b>: Được gọi trước khi render,
            cho phép cập nhật state dựa trên props.
          </li>
          <li>
            <b>render()</b>: Phương thức này bắt buộc và chịu trách nhiệm trả về
            JSX để hiển thị.
          </li>
          <li>
            <b>componentDidMount()</b>: Được gọi sau khi component đã được
            render vào DOM. Thường được sử dụng để thực hiện các tác vụ bất đồng
            bộ như gọi API.
          </li>
        </ul>

        <h2>2. Updating (Giai đoạn cập nhật)</h2>
        <p>
          Giai đoạn này xảy ra khi props hoặc state của component thay đổi. Các
          phương thức sau được gọi theo thứ tự:
        </p>
        <ul>
          <li>
            <b>static getDerivedStateFromProps()</b>: Được gọi khi nhận props
            mới và cho phép cập nhật state dựa trên props mới.
          </li>
          <li>
            <b>shouldComponentUpdate()</b>: Quyết định xem component có cần được
            render lại hay không. Mặc định trả về true.
          </li>
          <li>
            <b>render()</b>: Được gọi để render lại component với state hoặc
            props mới.
          </li>
          <li>
            <b>getSnapshotBeforeUpdate()</b>: Được gọi ngay trước khi DOM được
            cập nhật, cho phép bạn chụp lại trạng thái DOM trước khi thay đổi.
          </li>
          <li>
            <b>componentDidUpdate()</b>: Được gọi ngay sau khi cập nhật DOM.
            Thường được sử dụng để thực hiện các tác vụ bất đồng bộ dựa trên DOM
            đã cập nhật.
          </li>
        </ul>

        <h2>3. Unmounting (Giai đoạn gỡ bỏ khỏi DOM)</h2>
        <p>
          Giai đoạn này xảy ra khi một component bị gỡ bỏ khỏi DOM. Chỉ có một
          phương thức liên quan:
        </p>
        <ul>
          <li>
            <b>componentWillUnmount()</b>: Được gọi ngay trước khi component bị
            gỡ bỏ khỏi DOM. Sử dụng để thực hiện các tác vụ dọn dẹp như hủy bỏ
            các timer hoặc huỷ đăng ký các sự kiện.
          </li>
        </ul>

        <h2>Các phương thức khác</h2>
        <ul>
          <li>
            <b>componentDidCatch()</b>: Được gọi khi có lỗi trong quá trình
            render, trong phương thức lifecycle hoặc trong các constructor của
            bất kỳ component con nào. Sử dụng để xử lý lỗi.
          </li>
        </ul>
    `,
    type: 'basic'
  },
  {
    question: "Sự khác nhau của props và state?",
    answer: `
    <h1>Props vs State in React</h1>

<h2>Props (Properties)</h2>
<ul>
    <li><b>Định nghĩa</b>: <code>props</code> là viết tắt của "properties". Chúng là các giá trị được truyền từ component cha (parent) xuống component con (child).</li>
    <li><b>Mục đích</b>: Được sử dụng để truyền dữ liệu và các hàm từ component cha sang component con.</li>
    <li><b>Tính chất</b>: <code>props</code> là bất biến (immutable). Component con không thể thay đổi giá trị của <code>props</code>.</li>
    <li><b>Cách sử dụng</b>: Được truyền vào component con thông qua các thuộc tính JSX.
        <pre><code>&lt;ChildComponent propName="propValue" /&gt;</code></pre>
    </li>
    <li><b>Ví dụ</b>:
        <pre><code>
function ParentComponent() {
    return &lt;ChildComponent message="Hello, World!" /&gt;;
}

function ChildComponent(props) {
    return &lt;h1&gt;{props.message}&lt;/h1&gt;;
}
        </code></pre>
    </li>
</ul>

<h2>State</h2>
<ul>
    <li><b>Định nghĩa</b>: <code>state</code> là một đối tượng quản lý dữ liệu bên trong component.</li>
    <li><b>Mục đích</b>: Được sử dụng để lưu trữ và quản lý dữ liệu có thể thay đổi trong vòng đời của component.</li>
    <li><b>Tính chất</b>: <code>state</code> là khả biến (mutable). Component có thể thay đổi giá trị của <code>state</code> thông qua các phương thức như <code>setState</code> (trong class component) hoặc <code>useState</code> (trong function component).</li>
    <li><b>Cách sử dụng</b>: Được khai báo và quản lý bên trong component.
        <pre><code>const [state, setState] = useState(initialState);</code></pre>
    </li>
    <li><b>Ví dụ</b>:
        <pre><code>
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;Click me&lt;/button&gt;
        &lt;/div&gt;
    );
}
        </code></pre>
    </li>
</ul>

<h2>So sánh Props và State</h2>
<table style="width: 100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border: 1px solid #ddd; padding: 10px;">Đặc điểm</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Props</th>
            <th style="border: 1px solid #ddd; padding: 10px;">State</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Định nghĩa</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Truyền dữ liệu từ cha đến con</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Quản lý dữ liệu bên trong component</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Tính chất</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Bất biến (immutable)</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Khả biến (mutable)</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Cách sử dụng</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;"><code>&lt;ChildComponent propName="propValue" /&gt;</code></td>
            <td style="border: 1px solid #ddd; padding: 10px;"><code>const [state, setState] = useState(initialState);</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Thay đổi</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Không thể thay đổi từ component con</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Có thể thay đổi từ component thông qua <code>setState</code> hoặc <code>useState</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Mục đích</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Truyền dữ liệu và hàm</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Quản lý dữ liệu thay đổi trong component</td>
        </tr>
    </tbody>
</table>

<h2>Kết luận</h2>
<p><b>Props</b>: Dùng để truyền dữ liệu từ component cha sang component con. Không thể thay đổi bên trong component con.</p>
<p><b>State</b>: Dùng để quản lý dữ liệu thay đổi bên trong component. Có thể thay đổi trong suốt vòng đời của component.</p>
    `,
    type: 'basic'
  },
  {
    question:
      "Trình bày về useEffect và lifeCycle react tương ứng với useEffect?",
    answer: `
<h1>useEffect và Các Phương Thức Lifecycle Tương Ứng trong React</h1>

<h2>useEffect</h2>
<p><code>useEffect</code> là một hook trong React được sử dụng để quản lý các side effect như gọi API, thiết lập subscriptions, và cập nhật DOM. <code>useEffect</code> có thể được coi như sự kết hợp của các phương thức lifecycle trong class component.</p>

<h2>Cách Sử Dụng useEffect</h2>
<pre><code>import React, { useEffect, useState } from 'react';

function MyComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Component mounted or updated');

        return () => {
            console.log('Cleanup on unmount or before next effect');
        };
    }, [count]);

    return (
        &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;Click me&lt;/button&gt;
        &lt;/div&gt;
    );
}
</code></pre>

<h2>Các Phương Thức Lifecycle Tương Ứng</h2>

<h3>1. componentDidMount</h3>
<p>Phương thức này được gọi ngay sau khi component được render vào DOM lần đầu tiên. Tương đương với <code>useEffect</code> với dependency array rỗng.</p>
<pre><code>useEffect(() => {
    console.log('Component mounted');
}, []);</code></pre>

<h3>2. componentDidUpdate</h3>
<p>Phương thức này được gọi sau mỗi lần cập nhật DOM. Tương đương với <code>useEffect</code> với dependency array chứa các giá trị cần theo dõi.</p>
<pre><code>useEffect(() => {
    console.log('Component updated');
}, [count]);</code></pre>

<h3>3. componentWillUnmount</h3>
<p>Phương thức này được gọi ngay trước khi component bị gỡ bỏ khỏi DOM. Tương đương với hàm cleanup trong <code>useEffect</code>.</p>
<pre><code>useEffect(() => {
    return () => {
        console.log('Component will unmount');
    };
}, []);</code></pre>

<h2>Tóm Tắt</h2>
<ul>
    <li><b>componentDidMount</b>: Tương đương với <code>useEffect</code> với dependency array rỗng.</li>
    <li><b>componentDidUpdate</b>: Tương đương với <code>useEffect</code> với dependency array chứa các giá trị cần theo dõi.</li>
    <li><b>componentWillUnmount</b>: Tương đương với hàm cleanup trong <code>useEffect</code>.</li>
</ul>

<p>Sử dụng <code>useEffect</code> giúp quản lý side effects dễ dàng hơn trong các functional component, thay thế cho việc sử dụng các phương thức lifecycle trong class component.</p>
`,
    type: 'basic'
  },
  {
    question: "Tại sao bạn lại chọn dùng reactjs thay vì vuejs hay angular?",
    answer: `
<h1>Tại Sao Chọn Dùng ReactJS Thay Vì VueJS hay Angular</h1>

<h2>1. Đơn Giản và Linh Hoạt</h2>
<p>ReactJS cung cấp cách tiếp cận đơn giản và linh hoạt để xây dựng các ứng dụng giao diện người dùng (UI). Nó cho phép sử dụng JavaScript thuần và JSX, giúp lập trình viên dễ dàng tùy chỉnh và mở rộng.</p>

<h2>2. Học Dễ Dàng</h2>
<p>ReactJS có một đường cong học tập thoải mái hơn so với Angular. Lập trình viên chỉ cần học một số khái niệm cơ bản như components, state, và props để bắt đầu.</p>

<h2>3. Hiệu Suất Cao</h2>
<p>ReactJS sử dụng Virtual DOM để tăng cường hiệu suất. Virtual DOM giúp cập nhật giao diện nhanh chóng và hiệu quả, giảm thiểu số lần thao tác trực tiếp lên DOM thật.</p>

<h2>4. Cộng Đồng Lớn và Hỗ Trợ Tốt</h2>
<p>ReactJS có một cộng đồng lớn và rất nhiều tài liệu, thư viện, và công cụ hỗ trợ. Điều này giúp lập trình viên dễ dàng tìm kiếm giải pháp cho các vấn đề gặp phải.</p>

<h2>5. Được Sử Dụng Rộng Rãi</h2>
<p>ReactJS được sử dụng rộng rãi bởi nhiều công ty lớn như Facebook, Instagram, và Airbnb. Điều này chứng tỏ sự ổn định và độ tin cậy của ReactJS.</p>

<h2>So Sánh Ngắn Gọn</h2>
<ul>
    <li><b>ReactJS</b>: Đơn giản, linh hoạt, hiệu suất cao, cộng đồng lớn.</li>
    <li><b>VueJS</b>: Dễ học, tích hợp tốt, nhưng cộng đồng nhỏ hơn và ít được sử dụng trong các dự án lớn.</li>
    <li><b>Angular</b>: Mạnh mẽ, nhiều tính năng, nhưng phức tạp hơn và có đường cong học tập dốc.</li>
</ul>

<h2>Kết Luận</h2>
<p>Chọn ReactJS vì sự đơn giản, linh hoạt, hiệu suất cao, và cộng đồng hỗ trợ mạnh mẽ, phù hợp với nhiều loại dự án từ nhỏ đến lớn.</p>
`,
    type: 'basic'
  },
  {
    question: "useMemo trong React là gì?",
    answer: `
<h1>useMemo trong React</h1>

<h2>Giới Thiệu</h2>
<p><code>useMemo</code> là một hook trong React được sử dụng để ghi nhớ giá trị của một hàm tính toán để tránh tính toán lại không cần thiết khi component re-render. Nó giúp tối ưu hóa hiệu suất của ứng dụng.</p>

<h2>Cách Sử Dụng</h2>
<p>Cú pháp của <code>useMemo</code>:</p>
<pre><code>const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);</code></pre>
<p>Trong đó:</p>
<ul>
    <li><code>computeExpensiveValue</code>: Hàm tính toán giá trị cần ghi nhớ.</li>
    <li><code>[a, b]</code>: Danh sách các dependencies. <code>useMemo</code> chỉ tính toán lại giá trị khi một trong các dependencies thay đổi.</li>
</ul>

<h2>Ví Dụ</h2>
<p>Dưới đây là ví dụ về cách sử dụng <code>useMemo</code> để tối ưu hóa hiệu suất:</p>
<pre><code>
import React, { useState, useMemo } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const expensiveCalculation = (num) => {
        console.log('Calculating...');
        for (let i = 0; i < 1000000000; i++) { }
        return num * 2;
    };

    const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

    return (
        &lt;div&gt;
            &lt;h1&gt;useMemo Example&lt;/h1&gt;
            &lt;p&gt;Count: {count}&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
            &lt;p&gt;Expensive Calculation Result: {memoizedValue}&lt;/p&gt;
            &lt;input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Type something..." 
            /&gt;
        &lt;/div&gt;
    );
}

export default App;
</code></pre>

<h2>Tóm Tắt</h2>
<ul>
    <li><code>useMemo</code> giúp ghi nhớ giá trị tính toán để tránh tính toán lại không cần thiết.</li>
    <li>Sử dụng khi bạn có các tính toán phức tạp hoặc tốn kém tài nguyên.</li>
    <li>Cải thiện hiệu suất của ứng dụng bằng cách giảm số lần render không cần thiết.</li>
</ul>
`,
    type: 'basic'
  },
  {
    question: "useCallBack trong reactjs là gì?",
    answer: `
    <h1>useCallback trong React</h1>
    
    <h2>Giới Thiệu</h2>
    <p><code>useCallback</code> là một hook trong React được sử dụng để ghi nhớ (memoize) các hàm (callbacks). Nó giúp ngăn chặn việc tạo lại các hàm không cần thiết trong mỗi lần render, tối ưu hóa hiệu suất của ứng dụng.</p>
    
    <h2>Cách Sử Dụng</h2>
    <p>Cú pháp của <code>useCallback</code>:</p>
    <pre><code>const memoizedCallback = useCallback(() => {
        doSomething(a, b);
    }, [a, b]);</code></pre>
    <p>Trong đó:</p>
    <ul>
        <li><code>doSomething</code>: Hàm cần được ghi nhớ.</li>
        <li><code>[a, b]</code>: Danh sách các dependencies. <code>useCallback</code> chỉ tạo lại hàm khi một trong các dependencies thay đổi.</li>
    </ul>
    
    <h2>Ví Dụ</h2>
    <p>Dưới đây là ví dụ về cách sử dụng <code>useCallback</code> để tối ưu hóa hiệu suất:</p>
    <pre><code>
    import React, { useState, useCallback } from 'react';
    
    function App() {
        const [count, setCount] = useState(0);
        const [inputValue, setInputValue] = useState('');
    
        const handleButtonClick = useCallback(() => {
            console.log('Button clicked:', count);
        }, [count]);
    
        return (
            &lt;div&gt;
                &lt;h1&gt;useCallback Example&lt;/h1&gt;
                &lt;p&gt;Count: {count}&lt;/p&gt;
                &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
                &lt;button onClick={handleButtonClick}&gt;Log Count&lt;/button&gt;
                &lt;input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Type something..." 
                /&gt;
            &lt;/div&gt;
        );
    }
    
    export default App;
    </code></pre>
    
    <h2>Tóm Tắt</h2>
    <ul>
        <li><code>useCallback</code> giúp ghi nhớ các hàm để tránh tạo lại không cần thiết.</li>
        <li>Sử dụng khi bạn có các hàm được truyền xuống các component con hoặc các hàm được gọi thường xuyên.</li>
        <li>Cải thiện hiệu suất của ứng dụng bằng cách ngăn chặn việc tạo lại các hàm không cần thiết.</li>
    </ul>
    `,
    type: 'basic'
  },
  {
    question: "so sánh useMemo và useCallback?",
    answer: `
<h1>So Sánh useMemo và useCallback trong React</h1>

<h2>Giới Thiệu</h2>
<p>Trong React, <code>useMemo</code> và <code>useCallback</code> đều là các hook được sử dụng để tối ưu hiệu suất bằng cách ghi nhớ (memoize) các giá trị hoặc hàm. Dưới đây là sự khác biệt chính giữa chúng.</p>

<h2>useMemo</h2>
<p><code>useMemo</code> được sử dụng để ghi nhớ giá trị được tính toán. Nó chỉ tính toán lại giá trị khi một trong các dependencies thay đổi.</p>
<p><b>Cú pháp:</b></p>
<pre><code>const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);</code></pre>
<p><b>Ví dụ:</b></p>
<pre><code>
import React, { useState, useMemo } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    const memoizedValue = useMemo(() => {
        return computeExpensiveValue(count);
    }, [count]);

    return (
        &lt;div&gt;
            &lt;p&gt;Memoized Value: {memoizedValue}&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
        &lt;/div&gt;
    );
}
</code></pre>

<h2>useCallback</h2>
<p><code>useCallback</code> được sử dụng để ghi nhớ một hàm (callback). Nó chỉ tạo lại hàm khi một trong các dependencies thay đổi.</p>
<p><b>Cú pháp:</b></p>
<pre><code>const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);</code></pre>
<p><b>Ví dụ:</b></p>
<pre><code>
import React, { useState, useCallback } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    const memoizedCallback = useCallback(() => {
        console.log('Button clicked:', count);
    }, [count]);

    return (
        &lt;div&gt;
            &lt;button onClick={memoizedCallback}&gt;Log Count&lt;/button&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
        &lt;/div&gt;
    );
}
</code></pre>

<h2>So Sánh</h2>
<table style="width: 100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border: 1px solid #ddd; padding: 10px;">Đặc điểm</th>
            <th style="border: 1px solid #ddd; padding: 10px;">useMemo</th>
            <th style="border: 1px solid #ddd; padding: 10px;">useCallback</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Mục đích</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Ghi nhớ giá trị tính toán</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Ghi nhớ hàm (callback)</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Trả về</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Giá trị đã ghi nhớ</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Hàm đã ghi nhớ</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 10px;"><b>Khi nào sử dụng</b></td>
            <td style="border: 1px solid #ddd; padding: 10px;">Khi cần tối ưu hóa tính toán phức tạp</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Khi cần tối ưu hóa hàm được truyền xuống component con</td>
        </tr>
    </tbody>
</table>

<h2>Kết Luận</h2>
<p>Sử dụng <code>useMemo</code> khi bạn cần ghi nhớ giá trị tính toán để tránh tính toán lại không cần thiết. Sử dụng <code>useCallback</code> khi bạn cần ghi nhớ hàm để tránh tạo lại hàm không cần thiết, đặc biệt là khi truyền các hàm xuống các component con.</p>
`,
    type: 'basic'
  },
  {
    question: "Cách hoạt động của redux?",
    answer: `
<h1>Cách Hoạt Động của Redux</h1>

<h2>Giới Thiệu</h2>
<p>Redux là một thư viện quản lý state cho các ứng dụng JavaScript, thường được sử dụng với React. Nó giúp quản lý state một cách nhất quán và dễ đoán.</p>

<h2>Kiến Trúc Redux</h2>
<p>Redux hoạt động dựa trên ba nguyên tắc chính:</p>
<ul>
    <li><b>Single Source of Truth</b>: Toàn bộ state của ứng dụng được lưu trữ trong một object duy nhất được gọi là store.</li>
    <li><b>State is Read-Only</b>: Cách duy nhất để thay đổi state là phát ra một action, một object mô tả những gì đã xảy ra.</li>
    <li><b>Changes are Made with Pure Functions</b>: Để xác định cách state thay đổi, bạn phải viết các hàm thuần (pure functions) được gọi là reducers.</li>
</ul>

<h2>Các Thành Phần Chính</h2>
<p>Redux bao gồm các thành phần chính sau:</p>
<ul>
    <li><b>Store</b>: Lưu trữ toàn bộ state của ứng dụng. Chỉ có một store duy nhất trong mỗi ứng dụng Redux.</li>
    <li><b>Actions</b>: Là các object chứa thông tin về hành động và dữ liệu cần thay đổi. Mỗi action có một thuộc tính <code>type</code> mô tả hành động và có thể có các thuộc tính khác chứa dữ liệu.</li>
    <li><b>Reducers</b>: Là các hàm thuần nhận vào state hiện tại và action, sau đó trả về state mới.</li>
    <li><b>Dispatch</b>: Là phương thức được sử dụng để gửi actions tới store.</li>
</ul>

<h2>Quy Trình Hoạt Động</h2>
<ol>
    <li>Một action được phát ra (dispatched) từ UI hoặc từ một sự kiện khác.</li>
    <li>Store nhận action và chuyển nó tới reducer.</li>
    <li>Reducer xử lý action và trả về state mới.</li>
    <li>Store cập nhật state mới và thông báo cho UI về sự thay đổi này.</li>
</ol>

<h2>Ví Dụ</h2>
<p>Dưới đây là một ví dụ đơn giản về cách Redux hoạt động:</p>
<pre><code>
// Action
const increment = () => ({
    type: 'INCREMENT'
});

// Reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
};

// Store
import { createStore } from 'redux';
const store = createStore(counter);

// Dispatch
store.dispatch(increment());
console.log(store.getState()); // 1
</code></pre>

<h2>Tóm Tắt</h2>
<ul>
    <li>Redux giúp quản lý state của ứng dụng một cách nhất quán và dễ đoán.</li>
    <li>Các thành phần chính bao gồm: store, actions, reducers, và dispatch.</li>
    <li>Quy trình hoạt động bao gồm: phát ra action, reducer xử lý action, store cập nhật state, và UI nhận thông báo về sự thay đổi.</li>
</ul>
`,
    type: 'basic'
  },
];

export default QnAReact;
