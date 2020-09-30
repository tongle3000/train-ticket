import {
    ACTION_SET_CITY_DATA,
    ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    ACTION_SET_DEPART_DATE,
    ACTION_SET_FROM,
    ACTION_SET_HIGH_SPEED,
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    ACTION_SET_IS_LOADING_CITY_DATA,
    ACTION_SET_TO,
} from './actions';

// const defaultState = {
//     from: '北京',                        // 始发站
//     to: '上海',                          // 终点站
//     isCitySelectorVisible: false,       // 城市 选择 浮层
//     currentSelectingLeftCity: false,    // 选择的城市 回填到那里
//     cityData: null,                     // 所有的城市数据; 这里需要默认的按 需 加载,异步的, 默认值 空;
//     isLoadingCityData: false,           // 是否正在加载城市数据; 这个状态时拿来做节流操作的,如果正在加载,就不能再次发起请求;
//     isDateSelectorVisible: false,       // 日期选择开关; 
//     departDate:null,                   // 日期 回填;
//     highSpeed: false,                   // 高铁开关;
// }

export default {
    from(state = '北京', action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_FROM:
                return payload;
            default:
        } 

        return state; // 如果都没匹配上, 就返回默认值; 
    },
    to(state = '上海', action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_TO:
                return payload;
            default:
        }

        return state;
    },
    isCitySelectorVisible(state = false, action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    currentSelectingLeftCity(state = false, action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
                return payload;
            default:
        }

        return state;
    },
    cityData(state = null, action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_CITY_DATA:
                return payload;
            default:
        }

        return state;
    },
    isLoadingCityData(state = false, action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_IS_LOADING_CITY_DATA:
                return payload;
            default:
        }

        return state;
    },
    isDateSelectorVisible(state = false, action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    highSpeed(state = false, action) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_HIGH_SPEED:
                return payload;
            default:
        }

        return state;
    },
    // 回填日期;
    departDate(state = null, action) {  
        const {type, payload} = action;
        switch(type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        }
        return state;
    }

}

// export default (state = defaultState, action) => {
//     switch (action.type) {
//         case ACTION_SET_FROM:{
            
//             return newState;
//         }
//         case ACTION_SET_TO:{
            
//             return newState;
//         }
//         case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:{
            
//             return newState;
//         }
//         case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:{
            
//             return newState;
//         }
//         case ACTION_SET_CITY_DATA:{
            
//             return newState;
//         }
//         case ACTION_SET_IS_LOADING_CITY_DATA:{
            
//             return newState;
//         }
//         case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:{
            
//             return newState;
//         }
//         case ACTION_SET_HIGH_SPEED:{
            
//             return newState;
//         }
//         default:
//             return state;
//     }
// };
