import './Style.css';

import React, { useEffect, useRef, useState } from 'react';


let isSpe = Date.now();
function Control(props) {
    const inputRef = useRef();
    const {addTodo} = props;

    const onSubmit = (e) => {
        e.preventDefault();// 回车提交; 如果是按钮使用这个回调函数, 这句就不要就可以了.

        const newText = inputRef.current.value.trim();

        if (newText === '') {
            return;
        }
        addTodo({
            id: ++isSpe,
            text: newText,
            complete: false,
        })
        inputRef.current.value = '';
    }
    return (
        <div className='control'>
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type = 'text'
                    ref = {inputRef}
                    placeholder='请输入内容'
                    className='new-todo'
                />
            </form>
        </div>
    )
}

function TodoItem (props) {

    const {todo:{id,text,complete}, removeTodo, toggleTodo} =props;

    const onChange = () => {
        toggleTodo(id)
    }

    const onRemove = () => {
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
    const {todos, removeTodo, toggleTodo} =props;
    return (
        <ul className='todos'>
            {
                todos.map( todo => 
                    <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}  />
                )
            }
        </ul>
    )
}




function Todolist() {

    const[todos, setTodos] = useState([]);

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
        setTodos(todos);
    }, [])

    useEffect(() => {
        localStorage.setItem('LS_KEY', JSON.stringify(todos))
    }, [todos]);

    

    return (
        <div className='todo-list'>
            <Control addTodo={addTodo} />
            <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
        </div>
    )
}

export default Todolist;
