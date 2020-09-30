import '../common/css/common.css';
import './css/App.css';

import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AntdDateSelector from '../common/AntdDateSelector';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import Header from '../common/Header';
import { h0 } from '../common/unitls';
import useSize from '../common/useSize';
import {
    exchangeFromTo,
    fetchCityData,
    hideCitySelector,
    hideDateSelector,
    setDepartDate,
    setSelectedCity,
    showCitySelector,
    showDateSelector,
    toggleHighSpeed,
} from './actions';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';

function App(props) {
    const {
        // 城市
        from,
        to,
        // 城市选择
        isCitySelectorVisible, // 是否显示
        cityData, //城市数据
        isLoadingCityData, // 加载城市数据状态
        departDate, // 选择日期
        isDateSelectorVisible,
        highSpeed,
        dispatch,
    } = props;

    // onBack, 一直返回, 没有传数据, Header 会一直 重新渲染; 这时要加 useCallBack(),第二个参数空数组, 就不会重新渲染了;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    // // 切换始发 终点 站;
    // const _exchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo());
    // },[]);

    // // 展现 选择的城市列表;
    // const _showCityselector = useCallback((m) => {
    //     dispatch(showCitySelector(m))
    // },[]);

    // 这个只是多加一个 useMemo 封装, 不让多余的渲染;
    const cbsJourney = useMemo(() => {
        return bindActionCreators({
                exchangeFromTo,
                showCitySelector,
            }, dispatch);
    }, [dispatch]);

    const cbsCitySelector = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideCitySelector, // onBack 直接调用 hideCitySelector 的 aciton
                fetchCityData,
                onSelect: setSelectedCity, // 选中 城市的操作;调用 actions 里的 setSelectedCity
            },
            dispatch
        );
    }, [dispatch]);

    const cbsDepartDate = useMemo(() => {
        /*console.log(showDateSelector);*/
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, [dispatch]);
    const cbsDateSelector = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, [dispatch]);

    // switch
    const cbsHighSpeed = useMemo(() => {
        
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, [dispatch]);

    /**
     * 获取屏幕的高度
     * 改成自定义 hook useSize;
     */
    
    const { sizeHeight } = useSize(); 
    // const [size, setSize] = useState({
    //     // 定义获取屏幕尺寸;
    //     width: document.documentElement.clientWidth,
    //     height: document.documentElement.clientHeight,
    // });

    // const onResize = () => {
    //     // 改变值的方法; 没有 this, 所以前面用 const 定义;
    //     setSize({
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //     });
    // };

    // // 这个useEffect 调用一次.
    // useEffect(() => {
    //     window.addEventListener("resize", onResize, false); // 挂载 事件
    //     return () => {
    //         window.removeEventListener("resize", onResize, false); // 移除事件
    //     };
    // }, []); // useEffect 每次组件渲染后,都运行. 得给它多传个空数组 [] ,就会执行 1 次就是;
    // 第二个参数, [] 数组,只有里面的每一项都不变, useEffect 才不会再次 执行 .
    /**
     * 获取屏幕的高度 end
     */

    // 要传入 day
    const onSelectDate = (day) => {
        const now = h0();

        if (
            !day ||
            day < now ||
            day >= now + 30 * 86400 * 1000 // 判断day大于 30天的时间;
        ) {
            return;
        }
        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    };

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form action='./query.html' className="form">
                <Journey
                    from={from}
                    to={to}
          /* exchangeFromTo={_exchangeFromTo} showCityselector={_showCityselector}*/ {...cbsJourney}
                />
                <DepartDate time={departDate} {...cbsDepartDate} />
                <AntdDateSelector />
                <HighSpeed highSpeed={highSpeed} {...cbsHighSpeed} />
                <Submit />
            </form>
            <CitySelector
                // 这些是取默认数据显示用的
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                // 这里是方法操作用的
                {...cbsCitySelector}
                sizeHeight={sizeHeight}
            />
            <DateSelector
                show={isDateSelectorVisible}
                sizeHeight={sizeHeight}
                {...cbsDateSelector}
                onSelect={onSelectDate}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };

    // return {
    //     handleJourney: bindActionCreators({
    //         exchangeFromTo,
    //         showCitySelector,
    //     }, dispatch),

    //     handleCitySlector: bindActionCreators({
    //         onBack: hideCitySelector, // onBack 直接调用 hideCitySelector 的 aciton
    //         fetchCityData,
    //         onSelect: setSelectedCity, // 选中 城市的操作;调用 actions 里的 setSelectedCity
    //     }, dispatch),

    //     handleDepartDate: bindActionCreators({
    //         onClick: showDateSelector,
    //     }, dispatch),

    //     // 日期弹窗组件
    //     handleDateSelector:bindActionCreators({
    //         onBack: hideDateSelector,
    //     }, dispatch),

    // }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
