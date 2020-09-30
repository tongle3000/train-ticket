import React, { memo, useCallback, useMemo, useState } from 'react';


const Counter = memo(function Counter(props) {
    // 001 下面的值变化了,就会打印这句.下面组件里给 count ={double} ,可以看到变化就打印;
    // console.log('Counter render') 
    // return <h1>Counter {props.count}</h1>

    // 002 给 h1 添加 onClick 事件, 这时这个 Counter 没点击一次,都会渲染;
    // onClick 只是个函数,其实不用每次渲染. 这时要给 onClick 方法加上 useMemo 或者useMemo 的变种 useCallback;
    console.log('Counter render 代表渲染了这个组件') 
    return <h1 onClick={props.onClick}>click me 不会渲染Counter这个组件,只有点击button,值改变,渲染 count {props.count}, double {props.double}</h1>


})

function HuseCallback() {

    const [count, setCount] = useState(0);

    const [clickCount, setClickCount] = useState(0); // 实际使用中,click useCallback的第二个参数一般不是空[];

        // useMemo; useMemo(() => function, input) 它有返回值, 是在渲染期间完成的. 而 useEffect 是渲染之后完成的;
        // 只有 count 发生变化, useMemo 执行;
        const double = useMemo(() => {
            return count * 2;
        }, [count===3]) // count=3时, double执行一次 6; 再点一次啊,是 false double变为 8, 不变;

        // 001
        const onClick2 = ()=> {
            console.log('Counter子组件 click');
        }
        // 002 useMemo ,每次点h1击不会每次 重新渲染 打印 Counter 组件里的 Counter render;
        // useMemo 里面有 2 层函数, 这时用 useCallback 代替, 只要写一层函数;
        const onClick1 = useMemo(() => {
            return () => {
                console.log('Counter子组件 click');
            }
        }, [])

        // 003 useCallback; useMemo(()=> fn) 等价于 useCallback(fn), 
        // useCallback 里面只有一层 函数, 渲染每次都会创建新的函数,怎么优化性能了呢? 
        // 注意:使用它是不能阻止创建新的函数, 但这个函数不一定会被返回.很可能就抛弃不用了.
        // 它解决的是,传入子组件的函数参数,过度变化,导致过度渲染的问题.
        const onClick = useCallback(() => {
                console.log('Counter子组件 click');
                // setClickCount(clickCount+1); // 001 这句加[clickCount],会每次渲染组件,是有问题的. 所以必须下面这个写法,传箭头函数.
                // 002 上面这句改为: 同时下面依赖中括号里面的 clickCount , 也可以移除掉.
                setClickCount((clickCount) => clickCount+1); 
        }, [/*clickCount*/ /*, setClickCount] 这个方法一般不用写 */])


        return (
            <div>
                <h1>useCallback 优化</h1>
                <p>useCallback 是 useMemo 的衍生, 一个是里面是一个回调函数, 一个是里面包了 2 层回调函数.</p>
                <p> //useCallback 里面只有一层 函数, 渲染每次都会创建新的函数,怎么优化性能了呢? <br />
                // 注意:使用它是不能阻止创建新的函数, 但这个函数不一定会被返回.很可能就抛弃不用了. <br />
                // 它解决的是,传入子组件的函数参数,过度变化,导致过度渲染的问题.</p>
                <p>{`useCallback(fn) === useMemo(()=> fn)`}</p>

                <button
                    type='button'
                    onClick = {() => setCount(count+1)}>
                    click ({count}), double: ({double})
                </button>

                {/* 这里要传入 count */}
                <Counter count ={count} double={double} onClick={onClick} />
            </div>
        )
}

export default  HuseCallback;