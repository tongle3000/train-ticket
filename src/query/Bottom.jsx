import './css/Bottom.css';

import { createFromIconfontCN, FieldTimeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useState } from 'react';

import { ORDER_DEPART, ORDER_DURATION } from './constant';
import Slider from './Slider';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2103473_3rbl10gg7b4.js',
});

const Filter = memo(function Filter(props) {
    const {
        name,
        checked,
        value,
        toggle,
    } = props;

    return (
        <li 
            className={ checked ? 'checked' : '' } 
            onClick={
                // 要改变 value 的值,需要传递 value 值;
                () => toggle(value)
            }
        >{name}</li>
    )
})

Filter.propTypes ={
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
}


const Option = memo(function Option(props) {
    const {
        title,   // 标题
        options, // 选项
        checkedMap, // 选中的
        update, // 更新的 选中的选项;
    } = props; 

    // 为了 切换 某个选项是否被选中, 定义一个 方法
    // 作为一个向下级组件传递的函数, 用 useCallback 
    const toggle = useCallback((value) => {
        // 先创建个 new 用来 返回
        const newCheckedMap = {...checkedMap};

        if(value in checkedMap) {

            delete newCheckedMap[value]; // 如果存在 value 删除;
        } else {
            newCheckedMap[value] = true;
        }

        // 再更新 update
        update(newCheckedMap);

    }, [checkedMap, update]);

    return (
        <div className='option'>
            <h3 className='sub-hd'>{title}</h3>
            <ul className='sub-bd'>
                {
                    options.map( option => {
                        return (
                            <Filter 
                                key={option.value} 
                                {...option} 
                                checked={option.value in checkedMap} 
                                toggle={toggle}
                            />
                        )
                    })
                }
            </ul>
        </div>
    );

});

Option.propTypes ={
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    checkedMap: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
}


const BottomModel = memo(function BottomModal(props) {
    const {
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        ticketTypesChecked,
        trainTypesChecked,
        departStationsChecked,
        arriveStationsChecked,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setTrainTypesChecked,
        setTicketTypesChecked,
        setDepartStationsChecked,
        setArriveStationsChecked,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        toggleIsFiltersVisible,

        isFiltersVisible, //隐藏显示
        sizeHeight, // 高度
    } = props;

    /**
     * 缓冲区 代码
     * 设置 useState 暂存 选中的默认数据; 点右上角确定,,才一起想 store 里提交;
     * state 的初始值,在组件第一次渲染的时候 才会用到, 所以在每个渲染周期中都去计算的话,浪费性能,
     * 延迟初始化 state, useState 可以传入一个函数,只有在组件第一渲染才被调用;
     */
    // cosnt [localTicketTypesChecked, setLocalTicketTypesChecked] = useState({
    //     ...ticketTypesChecked, // 解构所有的项
    // })
    const [localTicketTypesChecked, setLocalTicketTypesChecked] = useState(() => {
        return {
            ...ticketTypesChecked, // 解构所有的项
        }
    })

    const [localTrainTypesChecked, setLocalTrainTypesChecked] = useState(() => {
        return {
            ...trainTypesChecked, // 解构所有的项
        }
    })

    const [localDepartStationsChecked, setLocalDepartStationsChecked] = useState(() => {
        return {
            ...departStationsChecked, // 解构所有的项
        }
    })

    const [localArriveStationsChecked, setLocalArriveStationsChecked] = useState(() => {
        return {
            ...arriveStationsChecked, // 解构所有的项
        }
    })

    // 定义 起点站  终点站 时间缓冲区  useState
    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);


    // 所有模块,
    const optionGroup = [
        {
            title: '坐席类型',
            options: ticketTypes,
            // checkedMap: ticketTypesChecked,
            checkedMap: localTicketTypesChecked, // 换成上面缓存在 useState 里的数据
            // 我们要把点击 保存的数据通过 setState 把选中的项 通过setLocalTicketTypesChecked  放到 update 里
            update: setLocalTicketTypesChecked, // 把 set 这些函数, 映射到 upadte 里,
        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localTrainTypesChecked, // 原: trainTypesChecked; 换:localTrainTypesChecked
            update: setLocalTrainTypesChecked,
        },
        {
            title: '出发车站',
            options: departStations,
            checkedMap: localDepartStationsChecked,
            update: setLocalDepartStationsChecked,
        },
        {
            title: '到达车站',
            options: arriveStations,
            checkedMap: localArriveStationsChecked,
            update: setLocalArriveStationsChecked,
        },
    ]

    return (
        <div className='botteom-all-selects'>
            <div className='main' style={{ height: sizeHeight - 116, }}>
                <div className='hd'>
                    <span className='reset'>重置</span>
                    <span className='ok'>确定</span>
                </div>
                <div className='bd'>
                    {/* 因为下面很多 选择的模块 都很类型,基于模块化原则,我们再声明个组件; */}
                    {
                        optionGroup.map(group => <Option {...group} key={group.title} />)
                    }

                    <Slider
                        title='出发时间'
                        currentStartHours = {localDepartTimeStart}
                        currentEndHours = {localDepartTimeEnd}
                        // 上面光传数据不行, 还有拖动发生变化的数据;所以得传入 2 个 callback, 2个 setState 函数;
                        onStartChanged = {setLocalDepartTimeStart}
                        onEndChanged = {setLocalDepartTimeEnd}
                    />

                    <Slider
                        title='到达时间'
                        currentStartHours = {localArriveTimeStart}
                        currentEndHours = {localArriveTimeEnd}
                        // 上面光传数据不行, 还有拖动发生变化的数据;所以得传入 2 个 callback, 2个 setState 函数;
                        onStartChanged = {setLocalArriveTimeStart}
                        onEndChanged = {setLocalArriveTimeEnd}
                    /> 
                </div>
            </div>
        </div>
    )
})

BottomModel.propTypes = {
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    // 浮层
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,

    ticketTypesChecked: PropTypes.object.isRequired,
    trainTypesChecked: PropTypes.object.isRequired,
    departStationsChecked: PropTypes.object.isRequired,
    arriveStationsChecked: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,

    setTrainTypesChecked: PropTypes.func.isRequired,
    setTicketTypesChecked: PropTypes.func.isRequired,
    setDepartStationsChecked: PropTypes.func.isRequired,
    setArriveStationsChecked: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
}


function Bottom(props) {
    const {
        orderType,
        highSpeed,
        onlyTickets,
        isFiltersVisible,
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        sizeHeight,
        // 浮层
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        ticketTypesChecked,
        trainTypesChecked,
        departStationsChecked,
        arriveStationsChecked,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        // 浮层方法: action
        setTrainTypesChecked,
        setTicketTypesChecked,
        setDepartStationsChecked,
        setArriveStationsChecked,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
    } = props;

    // console.log(orderType)

    return (
        <>
            <div className='query-bottom'>
                <ul>
                    {/* oderType */}
                    <li onClick={() => toggleOrderType()}>
                        <FieldTimeOutlined />
                        <span className='title'>{orderType === ORDER_DEPART ? '出发 早-晚' : '耗时 短-长'}</span>
                    </li>

                    {/* highSpeed */}
                    {/* className={!show ? "date-select hidden" : "date-select"} */}
                    <li className={highSpeed ? 'bottom-select' : ''} onClick={toggleHighSpeed}>
                        <IconFont type="icon-huoche" />
                        <span className='title'>只看高铁/动车</span>
                    </li>
                    {/* onlyTickets */}
                    <li className={onlyTickets ? 'bottom-select' : ''} onClick={toggleOnlyTickets}>
                        <IconFont type="icon-piao" />
                        <span className='title'>只看有票</span>
                    </li>
                    {/* isFiltersVisible 是否显示 综合筛选 浮层 */}
                    <li className={isFiltersVisible ? 'bottom-select' : ''} onClick={toggleIsFiltersVisible}>
                        <IconFont type="icon-shaixuan" />
                        <span className='title'>综合筛选</span>
                    </li>
                </ul>
            </div>

            { 
                isFiltersVisible && (
                    <BottomModel 
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
                        setTrainTypesChecked={setTrainTypesChecked}
                        setTicketTypesChecked={setTicketTypesChecked}
                        setDepartStationsChecked={setDepartStationsChecked}
                        setArriveStationsChecked={setArriveStationsChecked}
                        setDepartTimeStart={setDepartTimeStart}
                        setDepartTimeEnd={setDepartTimeEnd}
                        setArriveTimeStart={setArriveTimeStart}

                        toggleIsFiltersVisible={toggleIsFiltersVisible} // 右上角有个 确定按钮, 要关闭这个 浮层;
                        sizeHeight={sizeHeight}
                    />
                )
            }
        </>
    )
}

Bottom.propTypes = {
    orderType: PropTypes.number.isRequired,
    highSpeed: PropTypes.bool.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,
    toggleOrderType: PropTypes.func.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    // 浮层
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,

    ticketTypesChecked: PropTypes.object.isRequired,
    trainTypesChecked: PropTypes.object.isRequired,
    departStationsChecked: PropTypes.object.isRequired,
    arriveStationsChecked: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,

    setTrainTypesChecked: PropTypes.func.isRequired,
    setTicketTypesChecked: PropTypes.func.isRequired,
    setDepartStationsChecked: PropTypes.func.isRequired,
    setArriveStationsChecked: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,

}

export default Bottom;
