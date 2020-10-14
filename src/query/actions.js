import { h0 } from '../common/unitls';
import { ORDER_DEPART, ORDER_DURATION } from './constant';

export const ACTION_SET_FROM = 'action_set_from';
export const ACTION_SET_TO = 'action_set_to';
export const ACTION_SET_DEPAR_TDATE = 'action_set_depar_tdate';
export const ACTION_SET_HIGH_SPEED = 'action_set_high_speed';
export const ACTION_SET_TRAIN_LIST = 'action_set_train_list';
export const ACTION_SET_ORDER_TYPE = 'action_set_order_type';
export const ACTION_SET_ONLY_TICKETS = 'action_set_only_tickets';
export const ACTION_SET_TICKET_TYPES = 'action_set_ticket_types';
export const ACTION_SET_TICKET_TYPES_CHECKED = 'action_set_ticket_types_checked';
export const ACTION_SET_TRAIN_TYPES = 'action_set_train_types';
export const ACTION_SET_TRAIN_TYPES_CHECKED = 'action_set_train_types_checked';
export const ACTION_SET_DEPART_STATIONS = 'action_set_depart_stations';
export const ACTION_SET_DEPART_STATIONS_CHECKED = 'action_set_depart_stations_checked';
export const ACTION_SET_ARRIVE_STATIONS = 'action_set_arrive_stations';
export const ACTION_SET_ARRIVE_STATIONS_CHECKED = 'action_set_arrive_stations_checked';
export const ACTION_SET_DEPART_TIME_START = 'action_set_depart_time_start';
export const ACTION_SET_DEPART_TIME_END = 'action_set_depart_time_end';
export const ACTION_SET_ARRIVE_TIME_START = 'action_set_arrive_time_start';
export const ACTION_SET_ARRIVE_TIME_END = 'action_set_arrive_time_end';
export const ACTION_SET_IS_FILTERS_VISIBLE = 'action_set_is_filters_visible';
export const ACTION_SET_SEARCH_PARSED = 'action_set_search_parsed';



export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    }
}
export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    }
}
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPAR_TDATE,
        payload: departDate,
    }
}



// 这里要 set 是因为综合选项  里面有要设置 这个选项 ?
export function setHighSpeed(highSpeed) {
    return {
        type: ACTION_SET_HIGH_SPEED,
        payload: highSpeed,
    }
}

// 切换的布尔值;
export function toggleHighSpeed(highSpeed) {
    return (dispatch, getState) => {
        const {highSpeed} = getState();
        // dispatch({
        //     type: ACTION_SET_HIGH_SPEED,
        //     payload: !highSpeed,
        // })
        dispatch(setHighSpeed(!highSpeed)); // 上下写法都可以; 留 set 暂时不清楚干什么用;
    }
}


export function setTrainList(trainList) {
    return {
        type: ACTION_SET_TRAIN_LIST,
        payload: trainList,
    }
}

// Bottom 筛选项的值;  第一按钮:  切换状态用的
// 出发 早->晚 ORDER_DEPART(=1)   ,点一下,变成  
// 耗时 短->长 ORDER_DURATION =2;
// set 改成 toggle 状态; 现有获取当前的值, 就要使用异步, 用 dispatch
export function toggleOrderType(orderType) {
    return (dispatch, getState) => {
        const { orderType } = getState(); // 先获取到状态;
        if (orderType === ORDER_DEPART) {  //如果是出发 1, 点一下 传耗时 2 ORDER_DURATION
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DURATION,
            })
        } else {                           // 如果是耗时 2 ,点一下, 传出发 1;
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPART,
            })
        }
    }
}

// 只看有票的它也是个 布尔值; 连 set 都不要.
export function toggleOnlyTickets(onlyTickets) {
    return (dispatch, getState) => {
        const {onlyTickets} = getState();

        dispatch({
            type: ACTION_SET_ONLY_TICKETS,
            payload: !onlyTickets, // 当前值的反值
        });
    }
}
export function setTicketTypes(ticketTypes) {
    return {
        type: ACTION_SET_TICKET_TYPES,
        payload: ticketTypes,
    }
}
export function setTicketTypesChecked(ticketTypesChecked) {
    return {
        type: ACTION_SET_TICKET_TYPES_CHECKED,
        payload: ticketTypesChecked,
    }
}
export function setTrainTypes(trainTypes) {
    return {
        type: ACTION_SET_TRAIN_TYPES,
        payload: trainTypes,
    }
}
export function setTrainTypesChecked(trainTypesChecked) {
    return {
        type: ACTION_SET_TRAIN_TYPES_CHECKED,
        payload: trainTypesChecked,
    }
}
export function setDepartStations(departStations) {
    return {
        type: ACTION_SET_DEPART_STATIONS,
        payload: departStations,
    }
}
export function setDepartStationsChecked(departStationsChecked) {
    return {
        type: ACTION_SET_DEPART_STATIONS_CHECKED,
        payload: departStationsChecked,
    }
}
export function setArriveStations(arriveStations) {
    return {
        type: ACTION_SET_ARRIVE_STATIONS,
        payload: arriveStations,
    }
}
export function setArriveStationsChecked(arriveStationsChecked) {
    return {
        type: ACTION_SET_ARRIVE_STATIONS_CHECKED,
        payload: arriveStationsChecked,
    }
}
export function setDepartTimeStart(departTimeStart) {
    return {
        type: ACTION_SET_DEPART_TIME_START,
        payload: departTimeStart,
    }
}
export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: ACTION_SET_DEPART_TIME_END,
        payload: departTimeEnd,
    }
}
export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: ACTION_SET_ARRIVE_TIME_START,
        payload: arriveTimeStart,
    }
}
export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: ACTION_SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd,
    }
}

// 是否 显示综合选项;
export function toggleIsFiltersVisible(isFiltersVisible) {
    return (dispatch, getState) => {
        const {isFiltersVisible} = getState();

        dispatch({
            type: ACTION_SET_IS_FILTERS_VISIBLE,
            payload: !isFiltersVisible, // 当前值的反值
        });
    }
}
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    }
}



// 再声明 2 个,, 操作日期 前一天, 后一天;

export function prevDepartDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        // dispatch({
        //     type: ACTION_SET_DEPAR_TDATE,
        //     payload: h0(departDate) - 86400 * 1000, // 1 天的毫秒数; 这个简单的算法是基于 departDate 从 0 时开始;
        // })
        // 上面的改为 直接 调用 上面的 action  setDepartDate()
        dispatch(setDepartDate(h0(departDate) - 86400 * 1000)); // 减 1 天的毫秒数; 这个简单的算法是基于 departDate 从 0 时开始;
    }
}

export function nextDepartDate() {
    return (dispatch, getState) => {
        const {departDate} = getState();
        dispatch(setDepartDate(h0(departDate) + 86400 * 1000)) // 加 1 天;
        console.log('nextDepartDate',departDate)
    }
}