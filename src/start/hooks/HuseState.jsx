import React, { Component, useState } from 'react';


/**
 * useState
 * 
 * 调用,不能在循环语句,块中调用;不能多调用和少调用,要和定义的数量一致.
 */

class HuseState2 extends Component {
    state = {
        count: 0,
    }
    render() {
        const {count} = this.state;
        return (
            <div>
                <button 
                    type="button" 
                    onClick={() => this.setState({count: count+1})}
                >
                    class connt({count})
                </button>
            </div>
        )
    }
};

function HuseState(props) {
    // ①定义一个初始值; 这行计算逻辑,都会运行, 如果复杂度高, 会影响加载性能.浪费资源. useState支持用一种函数来延迟初始化.
    // const defaultCount = props.defaultCount || 0;     // 这句每次都会运行 
    console.log('写在这个位置点一次useState按钮就触发 1 次, 多次输出')
    // const [count, setCount] = useState(defaultCount); // 这样写,如果运算复杂度高会浪费资源性能;
    
    // ②使用初始值,括号里不能直接用 defaultCount, 函数来延迟初始化 count 的默认值.
    const [count, setCount] = useState(() => {
        console.log('验证延迟初始化数据,只会触发 2 次, 每次点按钮不会再触发')
        return props.defaultCount || 0; 
    });

    // const [count, setCount] = useState(0);
    const [name, setName] = useState('Mike');

    return (
            <div>
                {name}

                <button 
                    type="button"
                    onClick={() => setCount(count+1) }
                >
                    useState connt({count})
                </button>
                
                <HuseState2 />
            </div>
    )

}
export default HuseState;

