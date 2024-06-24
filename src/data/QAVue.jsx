const QAVue = [
  {
    question: "Trình bày về lifecycle của vuejs?",
    answer: `<div>
    <h1>Lifecycle của Vue.js</h1>
    <p>Trong Vue.js, mỗi instance của Vue đi qua một quá trình khởi tạo mà trong đó nó cần thiết lập quan sát dữ liệu, biên dịch template, gắn kết với DOM, và cập nhật DOM khi trạng thái thay đổi. Dưới đây là các giai đoạn chính:</p>
    <ul>
        <li><strong>beforeCreate:</strong> Được gọi ngay sau khi instance được khởi tạo, trước khi quá trình quan sát và khởi tạo sự kiện diễn ra.</li>
        <li><strong>created:</strong> Được gọi sau khi instance được tạo, tại thời điểm này, các phương thức của instance, quan sát dữ liệu và sự kiện đã được khởi tạo hoàn tất.</li>
        <li><strong>beforeMount:</strong> Được gọi ngay trước khi instance được gắn kết vào DOM, sau khi template đã được biên dịch.</li>
        <li><strong>mounted:</strong> Được gọi sau khi instance được gắn kết vào DOM. Đây là giai đoạn thích hợp để thực hiện các hoạt động liên quan đến DOM hoặc thực thi các hoạt động sau khi render.</li>
        <li><strong>beforeUpdate:</strong> Được gọi ngay trước khi DOM được cập nhật do thay đổi dữ liệu. Đây là cơ hội để truy cập trạng thái trước khi cập nhật.</li>
        <li><strong>updated:</strong> Được gọi sau khi cập nhật DOM do thay đổi dữ liệu. Đây là thời điểm để thực hiện các hoạt động phụ thuộc vào DOM sau khi cập nhật.</li>
        <li><strong>beforeDestroy:</strong> Được gọi ngay trước khi một instance Vue bị hủy. Sử dụng để dọn dẹp tài nguyên, lắng nghe sự kiện, và các định tác vụ chưa hoàn thành trước khi instance bị hủy.</li>
        <li><strong>destroyed:</strong> Được gọi sau khi một instance Vue bị hủy. Tất cả các chỉ thị của Vue, sự kiện lắng nghe và sub-instance Vue cũng đã bị hủy ở giai đoạn này.</li>
    </ul>
    <p>Các hooks này cung cấp cơ hội để thực hiện các hành động tại các điểm khác nhau trong vòng đời của component.</p>
</div>
`,
  },
  {
    question: "Method watch trong vuejs là gì?",
    answer: `<div>
    <h1>Method Watch trong Vue.js</h1>
    <p><strong>Watch</strong> là một tính năng của Vue.js cho phép bạn theo dõi sự thay đổi của một hay nhiều thuộc tính dữ liệu và thực hiện hành động khi giá trị của chúng thay đổi. Đây là một công cụ mạnh mẽ để xử lý phản ứng dựa trên sự thay đổi dữ liệu.</p>
    <h2>Cách sử dụng</h2>
    <p>Để sử dụng watch, bạn định nghĩa một đối tượng <code>watch</code> trong options của component Vue. Mỗi thuộc tính của đối tượng <code>watch</code> là tên của một dữ liệu bạn muốn theo dõi và giá trị là một hàm callback sẽ được gọi khi dữ liệu đó thay đổi.</p>
    <h2>Ví dụ:</h2>
    <pre>
&lt;script&gt;
export default {
    data() {
        return {
            count: 0
        };
    },
    watch: {
        count(newVal, oldVal) {
            console.log('Giá trị cũ: oldVal, giá trị mới: newVal');
        }
    }
}
&lt;/script&gt;
    </pre>
    <h2>Lợi ích của Watch</h2>
    <p>Method watch rất hữu ích khi bạn cần thực hiện các hành động phức tạp hoặc tốn kém về mặt tính toán mỗi khi dữ liệu thay đổi, ví dụ như lấy dữ liệu từ API, thực hiện tính toán nặng hoặc xử lý chuyển tiếp dữ liệu.</p>
</div>
`,
  },
  {
    question:
      "Method computed trong vuejs là gì?",
    answer: `
    <div>
    <h1>Computed Properties trong Vue.js</h1>
    <p><strong>Computed properties</strong> là một tính năng trong Vue.js cho phép bạn tạo ra các thuộc tính có thể tính toán được dựa trên các thuộc tính dữ liệu khác của component. Các thuộc tính computed được tính toán lại mỗi khi một trong các thuộc tính phụ thuộc của chúng thay đổi, cung cấp một cách hiệu quả để cập nhật giao diện người dùng dựa trên những thay đổi dữ liệu.</p>
    <h2>Cách sử dụng</h2>
    <p>Bạn định nghĩa computed properties trong phần <code>computed</code> của đối tượng component. Mỗi thuộc tính trong đối tượng <code>computed</code> là một hàm mà giá trị trả về sẽ được Vue theo dõi và cập nhật tự động.</p>
    <h2>Ví dụ:</h2>
    <pre>
&lt;script&gt;
export default {
    data() {
        return {
            firstName: 'John',
            lastName: 'Doe'
        };
    },
    computed: {
        fullName() {
            return 'this.firstName this.lastName';
        }
    }
}
&lt;/script&gt;
    </pre>
    <h2>Lợi ích của Computed Properties</h2>
    <p>Computed properties giúp giữ cho code của bạn gọn gàng và hiệu quả bằng cách giảm thiểu số lần tính toán cần thiết, chỉ thực hiện khi các giá trị phụ thuộc có sự thay đổi. Điều này đặc biệt hữu ích khi bạn cần tính toán dữ liệu phức tạp để hiển thị trên giao diện người dùng.</p>
</div>

    `,
  },
  {
    question: "So sánh watch và computed trong vuejs ?",
    answer: `<div>
    <h1>So sánh Watch và Computed trong Vue.js</h1>
    <p><strong>Computed properties</strong> và <strong>Watchers</strong> là hai tính năng của Vue.js được sử dụng để xử lý thay đổi dữ liệu, nhưng chúng được sử dụng trong các trường hợp khác nhau và hoạt động theo những cách khác nhau.</p>
    <h2>Computed Properties</h2>
    <p>Computed properties là các hàm dựa trên dữ liệu phụ thuộc và chỉ được tính toán lại khi một trong các phụ thuộc thay đổi. Chúng được dùng để tính toán các giá trị dẫn xuất mà có thể cập nhật giao diện người dùng. Computed properties được lưu trữ trong bộ nhớ cache và chỉ được tính toán lại khi các phụ thuộc của chúng thay đổi, giúp chúng hiệu quả về mặt hiệu năng.</p>
    <h2>Watchers</h2>
    <p>Watchers được dùng để theo dõi sự thay đổi của bất kỳ dữ liệu nào và thực hiện các hành động khi dữ liệu đó thay đổi. Chúng không trả về một giá trị nhưng có thể thực hiện các tác vụ như gọi API, thực hiện các phép tính phức tạp, hoặc điều hướng logic điều khiển dựa trên sự thay đổi dữ liệu.</p>
    <h2>So sánh</h2>
    <table border="1" cellpadding="10">
        <thead>
            <tr>
                <th>Tính năng</th>
                <th>Computed</th>
                <th>Watch</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Chức năng</td>
                <td>Để tính toán dữ liệu dẫn xuất từ dữ liệu khác</td>
                <td>Để phản ứng trước sự thay đổi của dữ liệu</td>
            </tr>
            <tr>
                <td>Tính hiệu quả</td>
                <td>Cao, do lưu trữ trong bộ nhớ cache và chỉ tính toán lại khi cần thiết</td>
                <td>Thấp hơn so với computed, do không có bộ nhớ cache và luôn phản ứng với thay đổi</td>
            </tr>
            <tr>
                <td>Phản hồi</td>
                <td>Chỉ cập nhật khi có sự thay đổi trong phụ thuộc</td>
                <td>Có thể thực hiện các tác vụ phức tạp không cần phải trả về giá trị</td>
            </tr>
            <tr>
                <td>Sử dụng</td>
                <td>Thường được sử dụng cho dữ liệu cần hiển thị trực tiếp trên giao diện</td>
                <td>Thường được sử dụng để xử lý dữ liệu đầu vào hoặc phản ứng với sự thay đổi dữ liệu</td>
            </tr>
        </tbody>
    </table>
    <p>Khi lựa chọn giữa computed và watch, cần cân nhắc liệu bạn có cần tính toán một giá trị dựa trên các giá trị khác và sử dụng giá trị đó nhiều lần không (computed), hay bạn cần thực hiện một hành động dựa trên sự thay đổi của dữ liệu (watch).</p>
</div>
`,
  },
  {
    question: "So sánh vue2 và vue3?",
    answer: `<div>
    <h1>So sánh Vue 2 và Vue 3</h1>
    <p>Vue 3 là phiên bản nâng cấp của Vue 2 với nhiều cải tiến về hiệu suất, tính năng và khả năng mở rộng. Dưới đây là một số điểm khác biệt chính giữa hai phiên bản này:</p>
    <h2>Cải tiến Hiệu suất</h2>
    <p>Vue 3 cung cấp cải tiến đáng kể về hiệu suất so với Vue 2 nhờ vào cơ chế Virtual DOM mới và kỹ thuật compiler tối ưu hóa. Vue 3 sử dụng các cơ chế như tree-shaking để loại bỏ các phần không sử dụng trong mã cuối cùng, giúp các ứng dụng nhỏ gọn và nhanh hơn.</p>
    <h2>Composition API</h2>
    <p>Vue 3 giới thiệu Composition API, một bộ API mới cho phép tái sử dụng và tổ chức mã tốt hơn. Nó cung cấp một cách linh hoạt hơn để tạo ra và quản lý logic ứng dụng, làm cho mã nguồn dễ quản lý và mở rộng hơn, đặc biệt trong các ứng dụng lớn.</p>
    <h2>Kiến trúc Hệ thống Phản ứng</h2>
    <p>Vue 3 có kiến trúc hệ thống phản ứng mới, được viết lại hoàn toàn để cung cấp hiệu suất tốt hơn và ít sử dụng bộ nhớ hơn. Cách tiếp cận này cũng giảm thiểu số lượng cập nhật DOM không cần thiết.</p>
    <h2>Hỗ trợ TypeScript</h2>
    <p>Trong khi Vue 2 có hỗ trợ TypeScript, Vue 3 được xây dựng và tối ưu hóa cho TypeScript, cung cấp trải nghiệm lập trình mượt mà hơn cho các nhà phát triển sử dụng TypeScript.</p>
    <h2>API Đa dạng</h2>
    <p>Vue 3 cũng giới thiệu một số API mới như Teleport và Fragments, cho phép các kịch bản phát triển phức tạp hơn và linh hoạt hơn trong việc xử lý DOM.</p>
    <h2>Kết luận</h2>
    <p>Vue 3 mang lại nhiều cải tiến quan trọng so với Vue 2, bao gồm hiệu suất tốt hơn, các API mới và hỗ trợ mạnh mẽ hơn cho TypeScript. Những thay đổi này làm cho Vue 3 trở thành sự lựa chọn hấp dẫn cho cả các dự án mới và các dự án hiện tại đang cân nhắc nâng cấp.</p>
</div>
`,
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
  },
];

export default QAVue;
