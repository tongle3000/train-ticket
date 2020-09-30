import React, { Component, useEffect, useState } from 'react';

class HuseEffect2 extends Component {
    state = {
        count: 0,
        size: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
    };

    onResize= () => {  // 同这方法 @bind() 换行 onRsize() {};
        this.setState({
            size: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            } 
        })
    }

    componentDidMount() {
        document.title = this.state.count // document.title 赋值给 浏览器选项卡里的 title
         
        window.addEventListener('resize', this.onResize, false); // 挂事件 add, 监听 resize 绑定到 onRsize 事件上;
    }

    
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false); // 移除事件 romove, 这个步是很难看到的, 不操作,很容易造成资源泄漏;
    }

    componentDidUpdate() {
        document.title = this.state.count // document.title 赋值给 浏览器选项卡里的 title
    }


    render() {
        const { count, size } = this.state;
        return (
            <div>
                <button type='button' onClick={() => {this.setState({count: count + 1})}}>
                    Click ({count})
                    size: {size.width}x{size.height}
                </button>
            </div>
        )
    }
}


// useEffect 
// 1. 把 state count 的值更新页面,title 里; 
// 2. 监听浏览器窗口变化,并把尺寸在页面里显示;
function HuseEffect() {
    
    /** 
     * count 
     * 
     */ 
    const [count, setCount] = useState(0);

    // 这个useEffect 一直在调用.
    useEffect(() => {
        document.title = count; // 这个只要这一步;而不用 componentDidMount, componentDidUpdate 里面都写;
    }) // useEffect 第二个参数没设置, 只要点击了就会 再次 执行 .

    // // 打印 count 
    // useEffect (()=>{
    //     console.log('count:', count);
    // },[count]) // count 变化后,才会触发打印.


    /** 
     * size 
     */ 
    const [size, setSize] = useState({  // 定义获取屏幕尺寸;
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize= () => {  // 改变值的方法; 没有 this, 所以前面用 const 定义;
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }
    
    // 这个useEffect 调用一次.
    useEffect(() => {
        window.addEventListener('resize', onResize, false); // 挂载 事件
        return () => {
            window.removeEventListener('resize', onResize, false); // 移除事件
        }
    }, []) // useEffect 每次组件渲染后,都运行. 得给它多传个空数组 [] ,就会执行 1 次就是; 
    // 第二个参数, [] 数组,只有里面的每一项都不变, useEffect 才不会再次 执行 .


    /**
     * 绑定副作用, 就是绑定 click 事件;
     */
    // 001 只执行一次. 如果 下面 dom 没改变(span 变为 p),就可以直接用这个;
    // useEffect(() => {
    //     document.querySelector('#size').addEventListener('click', onClick, false);
    // }, []);  // 执行 1 次就是; 

    // 002 让它每次执行更新,频繁清理状态的副作用;
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick, false);
        // 追求最新状态, 让useEffect 渲染后每次都能运行,
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick, false);
        }
    });// 每次都执行, 每次都removeEventListener ;




    const onClick = () => {
        console.log('click')
    }

    return (
        <div>
            <h1> useEffect都是处理副作用的 </h1>
            
            <button type='button' onClick={() => {setCount(count + 1)}}>
                useEfect Click ({count})
            </button>
            {
                // 奇 偶 决定显示那个元素,一旦dom 元素被替换.绑定的事件就失效. 一个p 一个 span; 如果 是 2 个一样的 span 就不会,
                // count%2 
                // ? <span id='size'>size: {size.width}x{size.height}</span>
                // : <span id='size'>偶size: {size.width}x{size.height}</span>

                // 解决 dom 不一样的情况; 就得追求最新状态, 就得让上面的 useEffect 渲染后每次都能运行, 得加 return 释放
                count%2 
                ? <span id='size'>size: {size.width}x{size.height}</span>
                : <p id='size'>偶size: {size.width}x{size.height}</p>
            }
            
            
        </div>
    )
}

export default HuseEffect;

