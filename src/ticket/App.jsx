import './css/App.css';

import dayjs from 'dayjs';
import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';

import Detail from '../common/Detail';
import Header from '../common/Header';
import Nav from '../common/Nav';
import { h0 } from '../common/unitls';
import useNav from '../common/useNav';
import useOnback from '../common/useOnback';
import useSize from '../common/useSize';
import {
    nextDepartDate,
    prevDepartDate,
    setArriveDate,
    setArriveStation,
    setArriveTimeStr,
    setDepartDate,
    setDepartStation,
    setDepartTimeStr,
    setDurationStr,
    setSearchParsed,
    setTickets,
    setTrainNumber,
    toggleIsScheduleVisible,
} from './actions';
import Candidate from './Candidate';
import { TrainContext } from './context';

// import Schedule from './Schedule';

// 这里import是异步引入, 会返回一个 promise, 现在 Schedule 就是个异步组件了,下面的 jsx代码处,组件外面就要用 Suspense 包裹;
const Schedule = lazy(() => import('./Schedule.jsx'));


function App(props) {

    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,
        dispatch,
    } = props;

    console.log('trainNumber',trainNumber)

    // const onBack = useCallback(() => {
    //     window.history.back();
    // }, []);

    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);

     // 解析 index 提交搜索后, 提交过来的数据, 使用副作用; 它是字符串,自己写比较困难, 使用第三方库 urijs;
     useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const {
            dCity,
            aCity,
            trainNumber,
            date, // 看到这,,可以知道,为什么要 setHighSpeed 这个 action了;
        } = queries; // 能解构到 4 个 数据, 我们必须把他们写入到 redux的 store 中; 只能通过 dispatch aciton,所以我们要 props 中取出 dispatch,和引入 actions;
        
        dispatch(setDepartStation(dCity));
        dispatch(setArriveStation(aCity));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(h0( dayjs(date).valueOf() ))); 

        dispatch(setSearchParsed(true)); // 解析 index 传到 query 里的数据用的;
        console.log('date', date, h0( dayjs(date).valueOf() ));
    }, [dispatch]); // 解析 URL 参数, 只要解析一次就够,传空数组;
    

    // 发起 异步请求;
    useEffect(() => {
        if(!searchParsed) {
            return;
        }

        const url = new URI('/rest/ticket')
            .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
            .setSearch('trainNumber', trainNumber)
            .toString();
        
            console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                const {detail, candidates} = result;
                
                const {
                    dTime, // 出发钟点
                    aTime, // 到达钟点
                    date, // 到达日期
                    time, //durationStr, // 耗时
                } = detail;

                dispatch(setDepartTimeStr(dTime));
                dispatch(setArriveTimeStr(aTime));
                dispatch(setArriveDate(date));
                dispatch(setDurationStr(time));
                dispatch(setTickets(candidates));
                console.log(aTime, dTime, time, date)
            })

    }, [dispatch, departDate, trainNumber,searchParsed]);

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDepartDate, 
        nextDepartDate
    );


   

    const { sizeHeight } = useSize();
    const { onBack } = useOnback();

    const detailCbs = useMemo(() => {
        return bindActionCreators({
            toggleIsScheduleVisible,
        }, dispatch)
    }, [dispatch])

    if(!searchParsed) {
        return null;
    }

    return(
        <div>
            <Header title={trainNumber} onBack={onBack} />
            <Nav
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                togglePrevDepartDate={prev}
                toggleNextDepartDate={next}
            />
            <div style={{height:sizeHeight-84,position:"relative",top:84, overflowY:'scroll',background:'#f0f0f0'}}>
                <Detail 
                    departStation={departStation} 
                    arriveStation={arriveStation}
                    departDate={departDate}
                    arriveDate={arriveDate}
                    trainNumber={trainNumber}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    durationStr={durationStr}
                    // { ...detailCbs }
                >
                    -- <span className='skb' onClick={() => detailCbs.toggleIsScheduleVisible()}>时刻表</span> --
                </Detail>

                <TrainContext.Provider value={{trainNumber,departStation,arriveStation,departDate}}>
                    <Candidate tickets={tickets} />
                </TrainContext.Provider>
                
            </div>
            { // 时刻表 浮层; isScheduleVisible 为 true 显示.
                isScheduleVisible && 
                <div className='mask' onClick={() => dispatch(toggleIsScheduleVisible())}>
                    <Suspense fallback={<div>loading...</div>}>
                        <Schedule 
                            date={departDate}
                            trainNumber={trainNumber}
                            departStation={departStation}
                            arriveStation={arriveStation}
                        />
                    </Suspense>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);