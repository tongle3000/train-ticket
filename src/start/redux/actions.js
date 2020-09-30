export function createSet(payload) {
    return {
        type: 'set',
        payload,
    }
}

// export function createAdd(payload) {
//     return {
//         type: 'add',
//         payload,
//     }
// }
// 针对某一字段的 reducer ,希望能读取到当前其他字段的值

// 5555 异步 Action, 
// 返回的不只是一个 纯对象,而是返回一个函数, 
let isSeq = Date.now(); // 页面里挪过来的;  
export function createAdd(text) {  // payload 改成 text
    return (dispatch, getState) => { // 5555 异步 Action; ②要把 state 改成 function 函数; getState;

        // 加入 异步延迟 setTime()
        setTimeout(() => {
            const {todos} = getState(); // 5555 异步 Action; ③ state 改成 getState(); 转页面里面,dispatch 也要改;
            if( !todos.find( todo => todo.text === text ) ) { // 5555 异步 Action; 如果输入与列表一样的内容,则提交 不了.// payload.text 改成 text;
                dispatch({
                    type: 'add',
                    payload:{
                        id: ++isSeq,
                        text,           // text; 页面里直接 addTodo(newText); 就是只要 这里的 text 一项 参数;
                        complete: false,
                    }
                });
            } 
            // else {
            //     alert('请不要输入下面已有的内容!')
            // }
        }, 3000);// 5555 异步 Action; 3秒; ① bug 输入内容,回车,快速删掉列表里已有的 同输入的 一样的内容. 会提交不成功;  解决此问题; 因为 state 不可变, 要获取最新的 state, 要把 state 改成 function 函数; getState;

    }
}




// // 3333, 把 组件里引用属性 的 dispatch 也省掉; 就 dispatch 写进方法里; 把createAdd 封装成 addTodo; 
// // 这样的操作会有多个, 写个函数 批量实现下, 
// addTodo = (payload) => dispatch(createAdd(payload))
// {
//     key: value,
//     addTodo: createAdd,
//     removeTodo: createRemove,
//     // 每个成员,都经过这样的封装, 转到首页去处理;
// }


export function createRemove(payload) {
    return {
        type: 'remove',
        payload,
    }
}

export function createToggle(payload) {
    return {
        type: 'toggle',
        payload,
    }
}

