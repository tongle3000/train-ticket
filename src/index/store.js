import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { h0 } from '../common/unitls';
import reducers from './reducers';

export default createStore(
    combineReducers(reducers),
    {
        from: '北京',                        // 始发站
        to: '上海',                          // 终点站
        isCitySelectorVisible: false,       // 城市 选择 浮层
        currentSelectingLeftCity: false,    // 选择的城市 回填到那里
        cityData: null,                     // 所有的城市数据; 这里需要默认的按 需 加载,异步的, 默认值 空;
        isLoadingCityData: false,           // 是否正在加载城市数据; 这个状态时拿来做节流操作的,如果正在加载,就不能再次发起请求;
        isDateSelectorVisible: false,       // 日期选择开关; 
        departDate: h0(Date.now()),                   // 日期 回填;
        highSpeed: false,                   // 高铁开关;
        
    },
    applyMiddleware(thunk)
)