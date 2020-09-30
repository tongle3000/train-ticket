import React, { memo, PureComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * state 也能渲染周期之前共享数据存储,但是 state 的赋值 会触发重新渲染.Ref 不会.
 * 
 * 一. 获取子组件里面的 DOM 元素 和方法等;
 * 同步不同渲染周期之消不了的数据?
 * 二. Ref保存普通变量(count=10): 下面我们尝试不用 useRef 来保存 组件或者 DOM, 而是用来 保存一个普通变量.
 * 
 * 组件一挂载, 组件里的 count 每秒钟 自动加 1; 当 count >10 后,就不自动增加; 显然这是个副作用, 要引用 useEffect;
 * 
 * 得定义 2 个副作用, 第一个是启动定时器;第二个用来检测 count 的值,是否大于 10;
 * 
 */


// ④useRef; 运行报: Function components cannot be given refs. 因此要改成类组件; 使用 pureComponent
// const Counter = memo(function Counter(props) {
//     return <h1 onClick={props.onClick}>count {props.count}, double {props.double}</h1>
// })
class Counter extends PureComponent {
    // ①组件上有函数成员要调用,举个例子; 在这里先生成个成员;
    speack() {
        console.log(`Counter speack(): now counter is: ${this.props.count}`)
    }

    render() {
        const { props } = this;
        // ⑤useRef; 运行点击 h1, 会打印这个组件; 这种场景会用到上面呢,,比如 组件上有函数成员要调用.
        return <h1 onClick={props.onClick}>count {props.count}, double {props.double}</h1>
    }
}


function HuseRef() {

    const [count, setCount] = useState(0);

    const [clickCount, setClickCount] = useState(0);

    const counterRef = useRef(); // ① useRef, 引入 useRef,定义counterRef, 方便 ②引入它;

    // const it; // ②Ref保存普通变量; 改成④,不起作用;
    const it = useRef(); // ④Ref保存普通变量; 初始值定义成useRef(); 再是下面,把定时器赋值给 it.current



    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);


    const onClick = useCallback(() => {
        console.log('Counter子组件 click');

        setClickCount((clickCount) => clickCount + 1);

        // ③useRef; 组件点击 通过 counterRef 获取到组件, counterRef.current 获取值
        console.log(counterRef.current)

        // ②组件上有函数成员要调用,举个例子; 
        counterRef.current.speack(); // 能打印出 speack()方法打印的内容;

    }, [counterRef]); // ③useRef; 注入counterRef依赖; 做到第三步,运行时保持, Ref不支持函数组件,只支持类组件;所以这里要到上面改成类组件;

    // ①Ref保存普通变量; 第一个副作用: 定义第一个定时器
    useEffect(() => {
        // 需要保存这个定时器,赋值给 it; 再到上面定义
        // it = setInterval(() => {
        it.current = setInterval(() => { // ⑤Ref保存普通变量; 把定时器赋值给 it.current; 同样下面清理也是.
            setCount(count => count + 1);
        }, 1000);
    }, []); // 只启动一次;

    // ③Ref保存普通变量; 第二个副作用:每次作用, 所以第二个参数,不用传[];
    useEffect(() => {
        if (count >= 10) {
            // clearInterval(it); // ③Ref保存普通变量; 清楚定时器; 做到这里后,运行,但是还是会一直增加,不会停止;这时请看下一步;
            clearInterval(it.current)// ⑥Ref保存普通变量; it 改为 it.current; 这时到 10 后,会自动停止加 1;
        }
    })


    return (
        <div>
            <h1>useRef</h1>

            <button
                type='button'
                onClick={() => setCount(count + 1)}>
                click ({count}), double: ({double})
                </button>

            {/* // ② useRef; 引入 counterRef ref={counterRef}  */}
            <Counter ref={counterRef} count={count} double={double} onClick={onClick} />
        </div>
    )
}

export default HuseRef;