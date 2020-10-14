import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default createStore(
    combineReducers(reducers),
    {
        departDate: Date.now(),
        arriveDate: Date.now(),
        departTimeStr:null, // 几点几分 出发
        arriveTimeStr: null, // 
        departStation: null,
        arriveStation: null,
        trainNumber: null, // 车次,可以从 location 地址里获取
        durationStr: null, // 运行时间, 服务端获取
        tickets: [], // 座次, 出票渠道; 来自服务端数据接口;
        isScheduleVisible: false, // 浮层
        searchParsed: false, // 解析 url 完成后,我们 需要一个状态 false, 只有当解析完变成 true 之后,我们才能 再进行异步数据请求;
    },
    applyMiddleware(thunk)
)