import './Style.css';

import React, { Component, createContext, useContext, useState } from 'react';

const CountContext = createContext();

// 001 class 类组件;
class Foo extends Component {
    render() {
        return (
            <div className='useContext'>
                <h1>class 类组件: Consumer</h1>
                <CountContext.Consumer>
                    {
                        count => <h3>class Foo {count}</h3>
                    }
                </CountContext.Consumer>
            </div>
        )
    }
}

// 002 class 类组件 contextType;
class Bar extends Component {
    static contextType = CountContext;
    render() {
        const count = this.context;
        return (
            <div className='useContext'>
                <h1>class 类组件: contextType</h1>
                <div>static conttextType = CountContext; const count = this.context;</div>
                <h3> class Bar  {count}</h3>
            </div>
        )
    }
}

// 003 Hooks 组件 useContext; 不能滥用,,会破坏组件独立性;
function Counter() {
    const count = useContext(CountContext); // 传入 CountContext 默认参数
    return(
        <div className='useContext'>
            <h1>Hooks 组件: useContext </h1>
            <div>const count = useContext(CountContext); 传入 CountContext 默认参数, 就能读到 count 值</div>
            <h3>function Counter  {count}</h3>
        </div>
    )
}




function HuseContext() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button 
                type='button'
                onClick={() => setCount(count+1)}
            >
                Click ({count})
            </button>
            <CountContext.Provider value = {count}>
                <Foo />
                <Bar />
                <Counter />
            </CountContext.Provider>
        </div>
    );
}

export default HuseContext;