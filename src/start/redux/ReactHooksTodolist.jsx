/**
 * React Hooks 经典 TodoList
 * 
 */
import './Style.css';

import React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';


const LS_KEY = '_$todos_';
let idSep = Date.now();
// 输入框块;
function Control(props) {
    const { addTodo } = props; // 用到 addTodo 函数

    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault(); // Enter 提交;
        onBtnSubmit();
    }

    const onBtnSubmit = () => {

        const newText = inputRef.current.value.trim() // 不会 .trim() 清除 2 端空格

        if(newText.length === 0) { // 这块忘记写;
            return;
        }

        addTodo({
            id: ++idSep,           // 少了'++';
            text: newText,
            complete: false,
        })
        // e.inputRef.value = '';     // 这句写错了; 
        inputRef.current.value = '';
    }

    return(
        <div className='control'>
            <h1>todos</h1>
            <form onSubmit = {onSubmit} className='submitBar'>
                <button className='btn-submit' onClick={onBtnSubmit}>提交</button>
                <input 
                    type ='text' 
                    ref = {inputRef}
                    placeholder='请输入内容'
                    className='new-todo'
                />
                
            </form>
            
        </div>
    )
}


// 列表块里的没一项 li;
function TodoItem(props) {
    // const {todo, removeTodo ,toggleTodo} = props; // 这里有错; todo 还要详细点;

    const {todo:{id, text, complete}, removeTodo ,toggleTodo} = props;

    const onChange = () => {
        toggleTodo(id);
    }
    const onRemove = () => {
        removeTodo(id);
    }

    return (
        <li className='todo-item'>
            {/* // 这里少写了: onChange={onChange} checked={complete} */}
            <input 
                type='checkbox' 
                onChange={onChange} 
                checked={complete} 
            />

            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove} className={complete ? 'del-btn-complete' : 'yc'}>&#xd7;</button>

            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )

}

// 列表块;
function Todos(props) {
    const { todos, removeTodo, toggleTodo } = props; // 用到父组件的 todos, removeTodo, toggleTodo 函数

    return(
        <ul className='todos'>
           {
                todos.map((todo) => {
                    return(
                        <TodoItem
                            key={todo.id} // 少了这个 KEY 值;
                            todo = {todo}
                            removeTodo = {removeTodo}
                            toggleTodo = {toggleTodo}
                        />
                    )
                })
           } 
        </ul>
    )
}


// 本组件;
function ReactHooksTodolist() {
    const [todos, setTodos] = useState([]); // 默认空数组;

    // 添加; 使用 useCallback
    const addTodo = useCallback((todo) => {
        setTodos(todos => [todo, ...todos] ) // 这里写错了; 数组多了大括号{}
    }, [])

    // 移除
    const removeTodo = useCallback((id) => {
        // setTodos(todos => todos.filter(todo.id != id));    // 这里写错了; todo !==
        setTodos(todos => todos.filter((todo) => todo.id !== id )) // 返回 删除后的每一项,
    }, [])

    // checked 选中状态
    const toggleTodo = useCallback((id) => {
        
        // 点了 checkbox 改变状态的时候, 遍历 选中的 todos, 用 todos.map() 遍历todo.id === id 选中项 id.创建选中的 数组.
        setTodos(todos => todos.map(todo => { // 这里不会写;
            return todo.id === id
                ? {      // 选中的, 返回选中 的 项, 给加个 complete 状态;
                    ...todo,
                    complete: !todo.complete,
                }
                : todo; // 如果没选中 直接返回本身;
        }))

        // setTodos(todos => ({
        //     todo.id,
        //     todos:[...todos],
        //     complete: !complete,
        // }))
    }, [])

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY)) || []; // 或者空数组, 第一次进来肯定是空的.
        setTodos(todos);
    }, [])

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos])

    return (
        <div className='todo-list'>
            <Control addTodo={addTodo} />
            <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
        </div>
    )
}

export default ReactHooksTodolist;
