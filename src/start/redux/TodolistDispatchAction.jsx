/**
 * 
 * 1111; dispatch({type:'toggle', payload: id})
 * 
 * 2222; actions.js; 优化, 把传入 {type: 'xxx', payload: xxx}参数, 统一放入 actionCreate 里操作. 创建个新文件 actions.js
 * 
 * 3333; bindActionCreates(actionCreates, dispatch), {addTodo: createAdd} 方法和对应aciton 封装到 actionCreates里; 然后把 actionCreates 和 dispatch统一封装到 bindActionCreates方法里;
 * 
 * 4444; reducers.js; 简化 dispatch, 把一些数据处理逻辑放入了 reducer, 引入 reducers.js 文件;
 * 
 */
import './Style.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { createAdd, createRemove, createSet, createToggle } from './actions';
import reducer from './reducers';



// 4444 import reducer from './reducers';

// let isSpe = Date.now();

// // 3333, 把 组件里引用属性 的 dispatch 也省掉; 就 dispatch 写进方法里; 把createAdd 封装成 addTodo; 
// // 这样的操作会有多个, 写个函数 批量实现下,  (actionCreates, dispatch) 
// 把下面的 属性 定义到 actionCreates 里
// {
//     key: value,
//     addTodo: createAdd,
//     removeTodo: createRemove,
//     // 每个成员,都经过这样的封装
// }

// 3333;  批量 把{KEY: VALUE} 封装到 actionCreates里, 把 actionCreates 和 dispatch 封装到一起, 直接完成 dispatch(create()),
// 3333; 下面 add 时使用: {...bindActionCreates({addTodo: createAdd}, dispatch)}
function bindActionCreates(actionCreates, dispatch) {
    const ret = {} // 存放key, value

    // 用 for in 遍历所有的 key; 封装了 dispatch(createXxx());
    for (const key in actionCreates) {
        ret[key] = function(...args) {
            const actionCreate = actionCreates[key];
            const action = actionCreate(...args)
            dispatch(action);
        }
    }

    return ret;
}

function Control(props) {
    const inputRef = useRef();
    // const {addTodo} = props;
    // 1111
    // const {dispatch} = props;

    /// 3333;
    const {addTodo} = props;

    const onSubmit = (e) => {
        e.preventDefault();// 回车提交; 如果是按钮使用这个回调函数, 这句就不要就可以了.

        const newText = inputRef.current.value.trim();

        if (newText === '') {
            return;
        }
        // addTodo({
        //     id: ++isSpe,
        //     text: newText,
        //     complete: false,
        // })

        // 1111
        // dispatch({
        //     type:'add', 
        //     payload:{
        //         id: ++isSpe,
        //         text: newText,
        //         complete: false,
        //     }
        // });

        // 2222 
        // dispatch(createAdd({
        //     id: ++isSpe,
        //     text: newText,
        //     complete: false,
        // }))


        // 3333; 现在的 addTodo封装后, 具备 2 222 dispatch 和 createAdd 的双层功能, 所以只要传入个 新的对象 即可;
        // addTodo({
        //     id: ++isSpe,
        //     text: newText,
        //     complete: false,
        // })

        // 5555 异步 Action; 
        addTodo(newText);


        inputRef.current.value = '';
    }
    return (
        <div className='control'>
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type = 'text'
                    ref = {inputRef}
                    placeholder='请输入内容,3 秒后显示'
                    className='new-todo'
                />
            </form>
        </div>
    )
}

function TodoItem (props) {

    // const {todo:{id,text,complete}, removeTodo, toggleTodo} =props;
    // 1111
    // const {todo:{id,text,complete}, dispatch} =props;

    // 3333
    const {todo:{id,text,complete}, removeTodo, toggleTodo} =props;

    const onChange = () => {
        // toggleTodo(id)
        // 1111
        // dispatch({type:'toggle', payload: id})

        // 2222
        // dispatch(createToggle(id));

        // 3333
        toggleTodo(id)
    }

    const onRemove = () => {
        // removeTodo(id)
        // 1111
        // dispatch({type:'remove', payload: id})

        // 2222
        // dispatch(createRemove(id));

        // 3333
        removeTodo(id)
    }

    return (
        <li className='todo-item'>
            {/* 就这里 少了 onChange={ onChange } */}
            <input type='checkbox' checked={complete} onChange={onChange} />
            <label className={complete ? 'complete' : '' }>{text}</label>
            <button onClick={onRemove}>x</button>
        </li>
    )
}

function Todos(props) {
    // const {todos, removeTodo, toggleTodo} =props;
    // 1111
    // const {todos, dispatch} = props;

    // 3333
    const {todos, removeTodo, toggleTodo} = props;
    return (
        <ul className='todos'>
            {
                todos.map( todo => 
                    // 1111 <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
                    // 3333
                    <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
                )
            }
        </ul>
    )
}


// 5555 异步 Action; ⑤ actions.js 里 state 改成 getState();  
// 在组件之外创建个store 用来 存放 所有的  state; 这样有 2 份 state, 我们要把组件内部的数据 同步到 store, 要用到副作用useEffect; 转 ⑥;
let store = {
    todos: [],
    incrementCount: 0,
}

function Todolist() {

    const[todos, setTodos] = useState([]);
    const[incrementCount, setIncrementCount] = useState(0);

    // 5555 异步 Action; ⑥ 我们要把组件内部的数据 同步到 store, 要用到副作用useEffect;
    useEffect(() => {
        // 我们需要把组件内部的 todos , incrementCount 同步到 store 里;
        // 简便起见,使用 Object.assign() 方法;
        Object.assign(store, {
            todos,
            incrementCount,
        })

    }, [todos, incrementCount])

    // 添加
    const addTodo = (todo) => {
        setTodos(todos => [todo, ...todos]);
    }

    // 删除
    const removeTodo = (id) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    // 选中 状态
    const toggleTodo = (id) => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id ? {...todo, complete: !todo.complete} : todo;
        }))
    }

    // 本地存储数据; 每次加载先获取 再存储;
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('LS_KEY'));
        // setTodos(todos);
        // 1111
        // dispatch({type: 'set', payload: todos})

        // 2222
        dispatch(createSet(todos));

    }, [])

    useEffect(() => {
        localStorage.setItem('LS_KEY', JSON.stringify(todos))
    }, [todos]);



    
    // 1111 dispatch action{type, payload} 增加的; dispatch 是作为属性传给子组件的, 所以要用 useCallback 包裹;
    // 1111 其实 就是把所以数据操作放进 dispatch函数 里写,都经过它来更新处理; 
    // const dispatch = useCallback((action) => {
    //     const {type, payload} = action;
    //     switch (type) {
    //         case 'set':
    //             setTodos(payload); // setTodos(todos);
    //             break;
    //         case 'add':
    //             setTodos(todos => [payload, ...todos]);
    //             break;
    //         case 'remove':
    //             setTodos(todos => todos.filter(todo => todo.id !== payload));
    //             break;
    //         case 'toggle':
    //             setTodos(todos => todos.map(todo => {
    //                 return todo.id === payload ? {...todo, complete: !todo.complete} : todo;
    //             }))
    //             break;
    //         default:
    //             break;
    //     }

    // }, []);
    
    // 2222 有待优化的是, 每个使用的,都要传入 {type: 'xxx', payload: xxx}, 为了避免写,我们把他们统一放入 actionCreate 里操作. 创建个新文件 actions.js
    // 2222 3333
    // const dispatch = useCallback((action) => {
    //     const {type, payload} = action;
    //     switch (type) {
    //         case 'set':
    //             setTodos(payload); // setTodos(todos);
    //             break;
    //         case 'add':
    //             setTodos(todos => [payload, ...todos]);
    //             break;
    //         case 'remove':
    //             setTodos(todos => todos.filter(todo => todo.id !== payload));
    //             break;
    //         case 'toggle':
    //             setTodos(todos => todos.map(todo => {
    //                 return todo.id === payload ? {...todo, complete: !todo.complete} : todo;
    //             }))
    //             break;
    //         default:
    //             break;
    //     }

    // }, []);

    // 4444; 简化 dispatch, 把一些数据处理逻辑放入了 reducer, 引入 reducers.js 文件;
    const dispatch = (action) => {

        // 5555 异步 Action; ⑨, 此处 state 没用了; 同时useCallback下面的第二个参数依赖也没用了,同时 useCallback 也没意义了,删掉;
        // const state = {
        //     todos,
        //     incrementCount,
        // }
        
        const setters = {
            todos: setTodos,
            incrementCount: setIncrementCount,
        }

        // 5555 异步 Action; 需要判断 action 类型;
        if('function' === typeof action) {
            action(dispatch, () => store);  // 5555 异步 Action; ④ actions.js 里 state 改成 getState();  ⑦这里的 state, 改成 () => store
            return;
        }


        // 引用过来的 reducers.js 文件, 在这里使用;
        // 5555 异步 Action; ⑧下面的 state 改成 store,上面定义的 state 就没用了; 不然输入已有的内容,快速删除列表同样的内容,结果显示删不掉,而且还提交上了同样内容; 改成  store, 3 秒内能删旧的,添加新的与删的一样.
        const newState = reducer(store, action); // 新的 state 与旧的 state 可能有不同; 我们再用 for 遍历一次新的;
        // 遍历新的 state ;
        for (const key in newState) {
            setters[key](newState[key]); // 不管state变不变, react 会自己检查是否要重新遍历;
        }

    };


    

    

    return (
        <div className='todo-list'>
            {/* // 1111 */}
            {/* 
                <Control dispatch={dispatch} />
                <Todos  dispatch={dispatch} todos={todos} />
            */}

            {/* // 3333;  */}
            <Control 
                {
                    ...bindActionCreates({addTodo: createAdd}, dispatch)
                } 
            />
            <Todos 
                {
                    ...bindActionCreates({ // 3333 解构 2 个
                        removeTodo: createRemove, 
                        toggleTodo: createToggle,
                    }, dispatch)
                } 
                todos={todos} 
            />

            {/* <Control addTodo={addTodo} />
            <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} /> */}
        </div>
    )
}

export default Todolist;
