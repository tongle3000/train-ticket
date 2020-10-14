/**
 * useReducer
 * 局部的 state 管理;
 */
import './css/Bottom.css';

import { createFromIconfontCN, FieldTimeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { memo, useMemo, useReducer, useState } from 'react';

import { ORDER_DEPART } from './constant';
import Slider from './Slider';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2103473_3rbl10gg7b4.js',
});


/**
 * useReducer
 * checkedReducer 函数;
 */
function checkedReducer(state, action) {
    const {type, payload} = action;
    switch (type) {
        case 'toggle':
            const newState = {...state};
            if(payload in newState) {
                delete newState[payload];
            } else {
                newState[payload] = true;
            }
            return newState;
        case 'reset':
            return {};
    
        default:
    }
    return state;
}


// const Filter = memo(function Filter(props) {
//     const {
//         name,
//         checked,
//         value,
//         toggle,
//     } = props;

//     return (
//         <li 
//             className={ checked ? 'checked' : '' } 
//             onClick={
//                 // 要改变 value 的值,需要传递 value 值;
//                 () => toggle(value)
//             }
//         >{name}</li>
//     )
// })

// Filter.propTypes ={
//     checked: PropTypes.bool.isRequired,
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     toggle: PropTypes.func.isRequired,
// }

/**
 * useReducer
 * Filter 组件修改
 */
const Filter = memo(function Filter(props) {
    const {
        name,
        checked,
        value,
        dispatch,
    } = props;

    return (
        <li 
            className={ checked ? 'checked' : '' } 
            onClick={
                // 要改变 value 的值,需要传递 value 值;
                () => dispatch({payload: value, type: 'toggle'})
            }
        >{name}</li>
    )
})

Filter.propTypes ={
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
}


// const Option = memo(function Option(props) {
//     const {
//         title,   // 标题
//         options, // 选项
//         checkedMap, // 选中的
//         update, // 更新的 选中的选项;
//     } = props; 

//     // 为了 切换 某个选项是否被选中, 定义一个 方法
//     // 作为一个向下级组件传递的函数, 用 useCallback 
//     const toggle = useCallback((value) => {
//         // 先创建个 new 用来 返回
//         const newCheckedMap = {...checkedMap};

//         if(value in checkedMap) {

//             delete newCheckedMap[value]; // 如果存在 value 删除;
//         } else {
//             newCheckedMap[value] = true;
//         }

//         // 再更新 update
//         update(newCheckedMap);

//     }, [checkedMap, update]);

//     return (
//         <div className='option'>
//             <h3 className='sub-hd'>{title}</h3>
//             <ul className='sub-bd'>
//                 {
//                     options.map( option => {
//                         return (
//                             <Filter 
//                                 key={option.value} 
//                                 {...option} 
//                                 checked={option.value in checkedMap} 
//                                 toggle={toggle}
//                             />
//                         )
//                     })
//                 }
//             </ul>
//         </div>
//     );

// });

// Option.propTypes ={
//     title: PropTypes.string.isRequired,
//     options: PropTypes.array.isRequired,
//     checkedMap: PropTypes.object.isRequired,
//     update: PropTypes.func.isRequired,
// }

/**
 * useReducer 
 * Option 组件修改
 */
const Option = memo(function Option(props) {
    const {
        title,   // 标题
        options, // 选项
        checkedMap, // 选中的
        dispatch, // 更新的 选中的选项;
    } = props; 

    // 为了 切换 某个选项是否被选中, 定义一个 方法
    // 作为一个向下级组件传递的函数, 用 useCallback 
    // const toggle = useCallback((value) => {
    //     // 先创建个 new 用来 返回
    //     const newCheckedMap = {...checkedMap};

    //     if(value in checkedMap) {

    //         delete newCheckedMap[value]; // 如果存在 value 删除;
    //     } else {
    //         newCheckedMap[value] = true;
    //     }

    //     // 再更新 update
    //     update(newCheckedMap);

    // }, [checkedMap, update]);

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
                                dispatch={dispatch}
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
    dispatch: PropTypes.func.isRequired,
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
        setArriveTimeEnd,
        toggleIsFiltersVisible,

        //isFiltersVisible, //隐藏显示
        sizeHeight, // 高度
        // highSpeed
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

    /** 
     * 改写成 useReducer 
     * const [,dispatch] = userReducer(新 reducer, 第二个参数, (第二个参数) => { return { ...第二个参数 }})
    */
    // const [localTicketTypesChecked, setLocalTicketTypesChecked] = useState(() => {
    //     return {
    //         ...ticketTypesChecked, // 解构所有的项
    //     }
    // })

    // const [localTrainTypesChecked, setLocalTrainTypesChecked] = useState(() => {
    //     return {
    //         ...trainTypesChecked, // 解构所有的项
    //     }
    // })

    // const [localDepartStationsChecked, setLocalDepartStationsChecked] = useState(() => {
    //     return {
    //         ...departStationsChecked, // 解构所有的项
    //     }
    // })

    // const [localArriveStationsChecked, setLocalArriveStationsChecked] = useState(() => {
    //     return {
    //         ...arriveStationsChecked, // 解构所有的项
    //     }
    // })


    const [localTicketTypesChecked, localTicketTypesCheckedDispatch] = useReducer(checkedReducer, ticketTypesChecked, (ticketTypesChecked) => {
        return {
            ...ticketTypesChecked,
        }
    })
    const [localTrainTypesChecked, localTrainTypesCheckedDispatch] = useReducer(checkedReducer, trainTypesChecked, (trainTypesChecked) => {
        return {
            ...trainTypesChecked,
        }
    })
    const [localDepartStationsChecked, localDepartStationsCheckedDispatch] = useReducer(checkedReducer, departStationsChecked, (departStationsChecked) => {
        return {
            ...departStationsChecked,
        }
    })
    const [localArriveStationsChecked, localArriveStationsCheckedDispatch] = useReducer(checkedReducer, arriveStationsChecked, (arriveStationsChecked) => {
        return {
            ...arriveStationsChecked,
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
            // update: setLocalTicketTypesChecked, // 把 set 这些函数, 映射到 upadte 里,
            /**
             * useReducer
             * update: setLocalTicketTypesChecked, 改为下面的
             */
            dispatch: localTicketTypesCheckedDispatch,

        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localTrainTypesChecked, // 原: trainTypesChecked; 换:localTrainTypesChecked
            // update: setLocalTrainTypesChecked,
            dispatch: localTrainTypesCheckedDispatch,
        },
        {
            title: '出发车站',
            options: departStations,
            checkedMap: localDepartStationsChecked,
            // update: setLocalDepartStationsChecked,
            dispatch: localDepartStationsCheckedDispatch,
        },
        {
            title: '到达车站',
            options: arriveStations,
            checkedMap: localArriveStationsChecked,
            // update: setLocalArriveStationsChecked,
            dispatch: localArriveStationsCheckedDispatch,
        },
    ]


    function sure() {
        setTrainTypesChecked(localTrainTypesChecked);
        setTicketTypesChecked(localTicketTypesChecked);
        setDepartStationsChecked(localDepartStationsChecked);
        setArriveStationsChecked(localArriveStationsChecked);

        if(localDepartTimeStart <= localDepartTimeEnd) {
            setDepartTimeStart(localDepartTimeStart);
            setDepartTimeEnd(localDepartTimeEnd);
        }

        setArriveTimeStart(localArriveTimeStart);
        setArriveTimeEnd(localArriveTimeEnd);

        toggleIsFiltersVisible(); 
    }

    // 如果都是空的话,给重置按钮加个状态;  创建一个变量,判断他们是否有 KEY 值;  可以使用 useMemo 优化一下;
    const isResetDisabled = useMemo(() => {
        return Object.keys(localTicketTypesChecked).length === 0
            && Object.keys(localTrainTypesChecked).length === 0
            && Object.keys(localDepartStationsChecked).length === 0
            && Object.keys(localArriveStationsChecked).length === 0
            && localDepartTimeStart === 0
            && localDepartTimeEnd === 24
            && localArriveTimeStart === 0
            && localArriveTimeEnd === 24;
    }, [
        localTicketTypesChecked,
        localTrainTypesChecked,
        localDepartStationsChecked,
        localArriveStationsChecked,
        localDepartTimeStart,
        localDepartTimeEnd,
        localArriveTimeStart,
        localArriveTimeEnd,
    ])

    // 重置 按钮 ; 如果都是空的话,给重置按钮加个状态;
    function reset() {
        
        // 这里就可以判断 可以默认不让它触发下面的 action
        if(isResetDisabled) {
            return;
        }

        // setLocalTrainTypesChecked({})
        // setLocalTicketTypesChecked({})
        // setLocalDepartStationsChecked({})
        // setLocalArriveStationsChecked({})
        /**
         * useReducer
         * 上面的改为下次 Dispatch
         */
        localTicketTypesCheckedDispatch({type: 'reset'});
        localTrainTypesCheckedDispatch({type: 'reset'});
        localDepartStationsCheckedDispatch({type: 'reset'});
        localArriveStationsCheckedDispatch({type: 'reset'});
        setLocalDepartTimeStart(0)
        setLocalDepartTimeEnd(24)
        setLocalArriveTimeStart(0)
        setLocalArriveTimeEnd(24)
    }


console.log('departTimeStart',departTimeStart)
    return (
        <div className='botteom-all-selects'>
            <div className='main' style={{ height: sizeHeight - 116, }}>
                <div className='hd'>
                    <span className={isResetDisabled ? 'reset disabled' : 'reset'} onClick={reset}>重置</span>
                    <span className='ok' onClick={sure}>确定</span>
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
    setArriveTimeEnd: PropTypes.func.isRequired,
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
        setArriveTimeEnd,
    } = props;

    // console.log(orderType)

    // 加这个 是为给 综合选项 这个换图片, 没选项时显示默认一色图标,有选项时,显示 带一个圈的图片,得准备 2 个图标; 这里没做;
    // const noChecked = useMemo(() => {
    //     return Object.keys(ticketTypesChecked).length === 0
    //         && Object.keys(trainTypesChecked).length === 0
    //         && Object.keys(departStationsChecked).length === 0
    //         && Object.keys(arriveStationsChecked).length === 0
    //         && departTimeStart === 0
    //         && departTimeEnd === 24
    //         && arriveTimeStart === 0
    //         && arriveTimeEnd === 24;
    // }, [
    //     ticketTypesChecked,
    //     trainTypesChecked,
    //     departStationsChecked,
    //     arriveStationsChecked,
    //     departTimeStart,
    //     departTimeEnd,
    //     arriveTimeStart,
    //     arriveTimeEnd,
    // ]);

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
                        setArriveTimeEnd={setArriveTimeEnd}

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
