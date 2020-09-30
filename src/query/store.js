import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { h0 } from '../common/unitls';
import { ORDER_DEPART } from './constant';
import reducers from './reducers';

export default createStore(
    combineReducers(reducers),
    {
        // Nav 日期导航组件的;
        from: null,                 // 出发城市;
        to: null,                   // 到达城市
        departDate: h0(Date.now()), // 出发日期; 我们要把它的 小时分钟都去掉; 引入 h0() 方法;
        highSpeed: false,           // 是否选择了高铁动车, 默认 false

        // List 列表组件的 trainList, 其他都是 筛选项 的默认值;
        trainList: [],

        // Bottom 筛选项的值;
        // Bottom 筛选项的值;  第一按钮: 出发 早->晚 ORDER_DEPART(=1),点一下,变成 耗时 短->长 ORDER_DURATION =2;
        orderType: ORDER_DEPART, // 它是个枚举值, 要定义常量从 constant.js 里引入; 默认:ORDER_DEPART(=1), ORDER_DURATION=2
        // Bottom 筛选项的值;  第二按钮: 高铁动车,highSpeed 上面有了;
        // Bottom 筛选项的值;  第三按钮: 只看邮票; 显然是个布尔值;
        onlyTickets: false,

        // Bottom 筛选项的值;  第四按钮: 综合筛选浮层; 有截图:query 综合筛选.png  1.坐席类型, 2.车次类型, 3.出发车站, 4.到达车站, 5.出发时间, 6.到达时间
        ticketTypes: [],          // 1.坐席类型, 所有的备选项, 是个数组;
        ticketTypesChecked: {},   // 1.坐席类型, 选中的项, 用个对象来表示, 方便以后的查询;

        trainTypes: [],           // 2.车次类型, 所有的;
        trainTypesChecked: {},    // 2.车次类型, 选中的;

        departStations: [],       // 3.出发车站, 所有的;
        departStationsChecked: {},// 3.出发车站, 选中的;

        arriveStations: [],       // 4.到达车站, 所有的;
        arriveStationsChecked: {},// 4.到达车站, 选中的;

        departTimeStart: 0,       // 5.出发时间: 开始时间;
        departTimeEnd: 24,        // 5.出发时间: 截止时间;

        arriveTimeStart: 0,       // 5.到达时间: 开始时间;
        arriveTimeEnd: 24,        // 5.到达时间: 截止时间;

        // 还有综合筛选 浮层的, 显示与隐藏; 默认隐藏;
        isFiltersVisible: false, 

        // 执行副作用,
        // 程序一启动, 就必须立即解析 浏览器的 定额参数, 比如from, to, departDate,highSpeed, trainList需要向服务端查询必要的数据,
        // 我们只能在解析完成之后,执行副作用,发起请求,这时需要一个变量表示已经解析完成; 况且,在解析完成之前,显示任何都是没有意义的.
        searchParsed: false,

        
    },
    applyMiddleware(thunk)
)