import React, { useMemo, useState } from 'react';


function Counter(props) {
    return <h1>Counter count {props.count} , Counter double{props.double}</h1>
}

function HuseMemo() {

    const [count, setCount] = useState(0);

        // useMemo; useMemo(() => function, input) 它有返回值, 是在渲染期间完成的. 而 useEffect 是渲染之后完成的;
        // 只有 count 发生变化, useMemo 执行;
        const double = useMemo(() => {
            return count * 2;
        }, [count===3]) // count=3时, double执行一次 6; 再点一次啊,是 false double变为 8, 不变;

        // half 依赖 double, 但是要注意,不能 循环依赖,不然会把浏览器搞崩溃掉;
        const half = useMemo(() => {
            return double / 4;
        }, [double]) 

        return (
            <div>
                <h1>useMemo 优化</h1>
                <p>memo 用来优化 组件 重新渲染 的行为, 传入属性值都不变的 情况下, 就不会 触发组件的 重新渲染;
                效果同 PureComponent</p>
                <div>{`memo 是定义是否重新渲染  组件<Foo />,`}</div>
                <p>{`useMemo 定义一段 函数()=>{} 逻辑是否 重新渲染 执行;`}</p>
                <p>momo 和 useMemo 紧紧用来做性能优化使用, 避免重复计算,造成资源浪费,不会对业务逻辑产生变话.</p>
                <p>half 依赖 double, 但是要注意,不能 <b>循环依赖</b> ,不然会把浏览器搞死;</p>
                <button
                    type='button'
                    onClick = {() => setCount(count+1)}>
                    click ({count}), double: ({double}), half:({half})
                </button>

                {/* 这里要传入 count */}
                <Counter count ={count} double={double} />
            </div>
        )
}

export default HuseMemo;