import '../common/css/common.css';
import './css/App.css';

import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';

import Header from '../common/Header';
import Nav from '../common/Nav';
import { h0 } from '../common/unitls';
import useNav from '../common/useNav';
import useOnback from '../common/useOnback';
import useSize from '../common/useSize';
import {
    nextDepartDate,
    prevDepartDate,
    setArriveStations,
    setArriveStationsChecked,
    setArriveTimeEnd,
    setArriveTimeStart,
    setDepartDate,
    setDepartStations,
    setDepartStationsChecked,
    setDepartTimeEnd,
    setDepartTimeStart,
    setFrom,
    setHighSpeed,
    setSearchParsed,
    setTicketTypes,
    setTicketTypesChecked,
    setTo,
    setTrainList,
    setTrainTypes,
    setTrainTypesChecked,
    toggleHighSpeed,
    toggleIsFiltersVisible,
    toggleOnlyTickets,
    toggleOrderType,
} from './actions';
import Bottom from './Bottom';
import List from './list';

function App(props) {
    const {
        from,
        to,
        departDate,
        highSpeed, // bottom 高铁/动车
        dispatch,
        searchParsed, // 解析 index 传到 query 里的数据用的; // 这些也是发起异步请求属于的参数;

        // 这些都是下面 发起异步请求属于的参数;
        orderType,   // 发起异步请求属于的参数;       // bottom 早晚; 
        onlyTickets, // 发起异步请求属于的参数;       // bottom 有票的;
        ticketTypes,                              // bottom浮层: 坐席类型
        trainTypes,                               // bottom浮层: 车次类型
        departStations,                           // bottom浮层: 出发车站
        arriveStations,                           // 浮bottom浮层层: 到达车站
        ticketTypesChecked,// 发起异步请求属于的参数; // bottom浮层: 选定的坐席;
        trainTypesChecked,// 发起异步请求属于的参数;   // bottom浮层: 选定的 车次;
        departStationsChecked,// 发起异步请求属于的参数; // bottom浮层: 选定的出发站;
        arriveStationsChecked,// 发起异步请求属于的参数; // bottom浮层: 选定的到达站;
        departTimeStart,// 发起异步请求属于的参数;       // bottom浮层: 出发时间,开始;
        departTimeEnd,// 发起异步请求属于的参数;         // bottom浮层: 出发时间,结束;
        arriveTimeStart,// 发起异步请求属于的参数;       // bottom浮层: 到达时间 开始;
        arriveTimeEnd,// 发起异步请求属于的参数;         // bottom浮层: 到达时间 结束;

        // list.jsx
        trainList,

        isFiltersVisible, // 显示综合筛选图层;
        


    } = props;

    const {onBack} = useOnback();

    // 解析 index 提交搜索后, 提交过来的数据, 使用副作用; 它是字符串,自己写比较困难, 使用第三方库 urijs;
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const {
            from,
            to,
            date,
            highSpeed, // 看到这,,可以知道,为什么要 setHighSpeed 这个 action了;
        } = queries; // 能解构到 4 个 数据, 我们必须把他们写入到 redux的 store 中; 只能通过 dispatch aciton,所以我们要 props 中取出 dispatch,和引入 actions;
        
        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0( dayjs(date).valueOf() ))); // 视频的 setDepartDate(h0( dayjs(date).valueOf() )) ; setDepartDate(date)
        dispatch(setHighSpeed(highSpeed === "true")); // 我们 解析 true 的值

        dispatch(setSearchParsed(true)); // 解析 index 传到 query 里的数据用的;
        console.log('date', date, h0( dayjs(date).valueOf() ));
    }, [dispatch]); // 解析 URL 参数, 只要解析一次就够,传空数组;

    // 获取上面这些参数, 主要目的是 拿这些参数 去发起请求,找出对应 参数 的数据;
    // searchParsed store 里定义的这个值用上, 相应的 acitoncreater setSearchParsed 也引入进来;
    // 在执行下面获取数据前, 我们要把 searchParsed 的值 设为 true;  上面 这句 dispatch(setSearchParsed(true));
    useEffect(() => {
        if (!searchParsed) {  // 解析 index 传到 query 里的数据用的;
            // 为了避免层级太深, 直接 searchParsed 改为 !searchParsed; return掉; 本身可以判断 true 然后执行请求数据的;
            return;
        }
        // fetch // searchParsed为 true 时,发起请求
        const url = new URI('/rest/query')
            .setSearch("from", from)
            .setSearch("to", to)
            .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
            .setSearch("highSpeed", highSpeed)

            .setSearch("orderType", orderType)
            .setSearch("onlyTickets", onlyTickets)
            // 下面四个 checked 是对象, 我们只要取出来他们的 keys, 对于每个参数,只要 key 值存在,就表示选中了;
            .setSearch("ticketTypesChecked", Object.keys(ticketTypesChecked).join())
            .setSearch("trainTypesChecked", Object.keys(trainTypesChecked).join())
            .setSearch(
                "departStationsChecked",
                Object.keys(departStationsChecked).join()
            )
            .setSearch(
                "arriveStationsChecked",
                Object.keys(arriveStationsChecked).join()
            )
            .setSearch("departTimeStart", departTimeStart)
            .setSearch("departTimeEnd", departTimeEnd)
            .setSearch("arriveTimeStart", arriveTimeStart)
            .setSearch("arriveTimeEnd", arriveTimeEnd)
            .toString(); // 返回字符串的 url; 赋值给 url 对象;
            
        // console.log('departDate', dayjs(departDate).format("YYYY-MM-DD"));
                // console.log(url)
        // 下面真正发起异步请求 fetch
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                // 解构下 result 拿到我们需要的数据;
                const {
                    // 这一块是服务端的数据结构,
                    dataMap: {
                        // today,
                        directTrainInfo: {
                            trains,
                            filter: { ticketType, trainType, depStation, arrStation },
                        },
                    },
                } = result; // 结构获取, 下面 dispatch 存储;

                console.log('url ',url); // 点击触发,地址会变化;
                
                // dispatch(setDepartDate(new Date(today).getTime())); 
                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            });
    }, [
            dispatch,
            // 这四个是传过来的
            from,
            to,
            highSpeed,
            departDate,

            searchParsed,
            // 这些是 新的,
            orderType,
            onlyTickets,
            ticketTypesChecked,
            trainTypesChecked,
            departStationsChecked,
            arriveStationsChecked,
            departTimeStart,
            departTimeEnd,
            arriveTimeStart,
            arriveTimeEnd,
        ]
    );

    

    // console.log('today', departDate, dayjs(departDate).format("YYYY-MM-DD")); // 
    /**
     * 获取屏幕的高度
     *
     * 下面的代码改成了 自定义 hook useSize;  common -> useSize.js
     */
    const { sizeHeight } = useSize();

    // console.log("useSize", sizeHeight, sizeWidth);

    // 如果出发日期 早于, 或者等于今天,是不可以点的;
    // 下面这块,可以自定义成 hook 函数. common -> useNav.js
    // const isPrevDisabled = h0(departDate) <= h0();
    // const isNextDisabled = h0(departDate) - h0() >  30 * 86400 * 1000;

    // const prev = useCallback(() => {
    //     if(isPrevDisabled) {
    //         return;
    //     }
    //     dispatch(prevDepartDate());
    // }, [isPrevDisabled]);

    // const next = useCallback(() => {
    //     if(isNextDisabled) {
    //         return;
    //     }
    //     dispatch(nextDepartDate());
    // }, [isNextDisabled]);
    // 下面这块,可以自定义成 hook 函数. 取代上面的代码 common -> useNav.js
    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDepartDate,
        nextDepartDate
    );

    const cbsBottom = useMemo(() => {
        return bindActionCreators({
            toggleOrderType,
            toggleHighSpeed,
            toggleOnlyTickets,
            toggleIsFiltersVisible,
            setTrainTypesChecked,
            setTicketTypesChecked,
            setDepartStationsChecked,
            setArriveStationsChecked,
            setDepartTimeStart,
            setDepartTimeEnd,
            setArriveTimeStart,
            setArriveTimeEnd,
        }, dispatch);
    }, [dispatch])
    

    // 报错 hook 把下面这个代码放最下面;
    // 失败  uri 参数不足, 异步接口失败;
    if (!searchParsed) {
        // 为 false, 返回空;
        return null;
    }


    return (
        <div>
            <Header title={`${from} -> ${to}`} onBack={onBack} />
            <Nav
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                togglePrevDepartDate={prev}
                toggleNextDepartDate={next}
            />
            <List sizeHeight={sizeHeight} orderType={orderType} trainList={trainList} />
            <Bottom 
                orderType={orderType} 
                highSpeed={highSpeed}  
                onlyTickets={onlyTickets}
                isFiltersVisible={isFiltersVisible}
                sizeHeight={sizeHeight}
                // 浮层
                ticketTypes={ticketTypes}
                trainTypes={trainTypes}
                departStations={departStations}
                arriveStations={arriveStations}
                ticketTypesChecked={ticketTypesChecked}
                trainTypesChecked={trainTypesChecked}
                departStationsChecked={departStationsChecked}
                arriveStationsChecked={arriveStationsChecked}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                {...cbsBottom} 
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
