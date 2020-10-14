import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';


export default createStore(
    combineReducers(reducers),
    {
        trainNumber: null, // 这 5 个为url地址传过来的.
        departStation: null,
        arriveStation: null,
        seatType: null,
        departDate: Date.now(),
        arriveDate: Date.now(), // 下面这些 是 必须通过异步请求,去服务端获取的.
        departTimeStr: null,
        arriveTimeStr: null,
        durationStr: null,
        price: null,
        passengers: [], // 乘客信息
        menu: null, // 弹出菜单
        isMenuVisible: false, // 是否可见
        searchParsed: false, // 标记 url 参数是否解析完成

    },
    applyMiddleware(thunk)
)