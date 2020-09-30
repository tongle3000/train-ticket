import React, { memo, PureComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

//  class Counter extends PureComponent {
//     render() {
//             const { props } = this;
//             return <h1>count {props.count}</h1>
        
//     }
// }

// ② 把 Counter 改成 Hooks useCounter;
function useCounter(count) {
    const size = useSize();  // ③自定义获取屏幕尺寸 hooks,
    return <h1>count {count} ,当前屏幕尺寸:{size.width}x{size.height} </h1>
}


// ①自定义 HOOKS 函数;
function useCount(defaultCount) {
    // ①这块代码之前的位置在下面
    const [count, setCount] = useState(0);
    const it = useRef(); 

    useEffect(() => {
        it.current = setInterval(() => { 
            setCount(count => count + 1);
        }, 1000);
    }, []); 

    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current)
        }
    })
    return [count, setCount];
}



// ③自定义获取屏幕尺寸 hooks, 其他组件要应用 直接通过这个 取: const size = useSize(); Counter 组件里要用,直接用const size = useSize(); 
function useSize () {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });

    // onResize
    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    },[]);

    useEffect(() => {
        window.addEventListener('resize',onResize, false);
        return () => {
            window.removeEventListener('resize',onResize, false);
        }
    },[]); // 只要监听一次
    return size;
}


function HselfHooks(){
    // ①上面那块代码本在这里, 改成了useCount, 下面加这句,就可以了.
    const [count, setCount] = useCount(0);

    // ② 把 Counter 改成 Hooks useCounter
    const Counter = useCounter(count);

    // ③自定义获取屏幕尺寸 hooks;
    const size = useSize();

    return (
        <div>
            <h1>自定义 hooks: useSize, useCounter</h1>
            <p>定义 Hooks 子组件: {`function useCounter(count){}`}</p>
            <p>本组件引用: const Counter = useCounter(count);</p>
            <p>{`本组件jsx处引用: {Counter}`}</p>
            <button type='button' onClick ={() => {setCount(count+1)}}>
                click ({count}), 当前屏幕尺寸:{size.width}x{size.height}
            </button>
            {/* // ② 把 Counter 改成 Hooks useCounter, 下面这句改成下下面那句, 因为它返回的是 JSX 代码; */}
            {/* <Counter count={count} /> */}
            {Counter}
        </div>
    )
}


export default HselfHooks;