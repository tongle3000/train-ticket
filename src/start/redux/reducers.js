const reducers = {
    // todos reducer
    todos(state, action) {

        const {type, payload} = action;

        switch (type) {
            case 'set':
                return payload;

            case 'add':
                return [payload, ...state];
                
            case 'remove':
                return state.filter(todo => todo.id !== payload);

            case 'toggle':
                return state.map( todo => {return todo.id === payload ? {...todo, complete: !todo.complete} : todo;})
                
            default:
                
        }
        return state;
    },

    // incrementCount reducer;
    incrementCount(state, action) {
        const {type/*, payload*/} = action;
        switch(type) {
            case 'set':
            case 'add':
                return state + 1;
            default:
        }
        return state;
    }
}

function combineReducers(reducers) {
    return function reducer(state, action) { // 全局 reducer, 这个 state 包括了 todos 和 incrementCount;

        const changed = {};

        for (const key in reducers) {
            changed[key] = reducers[key](state[key], action); // 拆分后的 reducer
        }

        return {
            ...state,  
            ...changed, 
        }

    }
}

// const reducer = combineReducers(reducers);
export default combineReducers(reducers);


