import React, { Component, memo, PureComponent } from 'react';



// 001 方法:
// class Foo extends PureComponent {
//     render() {
//         console.log('Foo render')
//         return null;
//     }
// }

// 002 方法: shouldComponentUpdate 来判断;
// class Foo extends Component {

//     shouldComponentUpdate(nextProps, nextState) {
//         if (nextProps.name === this.props.name) {
//             return false
//         }
//         return true
//     }

//     render() {
//         console.log('Foo render')
//         return null;
//     }
// }

// 讲了这么多, 最后 memo 就是可以把下面这个组件改成 function 改成无状态组件;
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::: 改成 function 改成无状态组件 :::::::::::::::::::::::::::::::::
// :::::::::::完美解决: 读取的父组件的 props(不是第一级的 props)发生改变, 它会重新渲染组件.:::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// class Foo extends PureComponent {
//     render() {
//         console.log('Foo render');
//         return <div>{this.props.person.age} :PureComponent的坑, (父组件 props 更新了)而在这里 不会 重新渲染组件.<p>只有第一级 props 变化才会 重新渲染</p></div>;
//     }
// }

// 能读取不到父组件的 props 变更;
function Foo2(props) {
    console.log('Foo render');
    return <div><p>{props.person.age} :改成 function 改成无状态组件<br/>父级的 props 变化也会 重新渲染</p></div>;
}

// 如果使用了 function, 还想使用 PureComponent 无状态组件特性:可以用 memo 包裹, 也会读取不到父组件的 props 变更;
// 拆分到越细的组件,使用到 PureComponent 和 memo 的几率就特别大;
const Foo = memo(function Foo(props) {
    console.log('Foo render');
    return <div><p>{props.person.age} :memo()方法 = PureComponent ,他们的坑, (父组件 props 更新了)而在这里 不会 重新渲染组件.<br/>只有第一级 props 变化才会 重新渲染</p></div>;
})


export default class Memo extends Component {
    state = {
        count: 0,
        person: {
            age: 1,
        },
    }

    callback = () => {
        
    }

    render() {
        const {person} = this.state;
        return (
            <div>
                <h1>memo() = PureComponent, memo(方法里面包的是 function) </h1>
                <div>改成 function 改成无状态组件, 完美解决: 读取的父组件的 props(不是第一级的 props)发生改变, 它会重新渲染组件</div>
				<p>
                如果使用了 function, 还想使用 PureComponent 无状态组件特性:可以用 memo 包裹, 也会读取不到父组件的 props 变更;<br/>
				</p>
                {this.state.person.age} 
                <button
                    // onClick={() => this.setState({ count: this.state.count + 1 })}
                    onClick = {() => {
                        person.age++;
                        this.setState({
                            person,
                        })
                    }}
                >
                    memo
                </button>
                {/* <Foo name='mike' /> */}
                <Foo person={person} cb={this.callback} />
                {/* 上面直接加这个: cb={()=>{}} 子组件 Foo 每次都会更新会更新,不管有没有读取父组件的数据发生改变. 应该改成 this.callback. 但是读取的不是第一级的 props 还是不会重新渲染,这样应该讲的是 调用回调函数怎么写. */}

                <Foo2 person={person} cb={this.callback} />
            </div>
        )
    }
}
