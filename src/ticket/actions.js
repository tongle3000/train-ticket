import { h0 } from '../common/unitls';

export const ACTION_SET_DEPART_DATE = 'action_set_depart_date';
export const ACTION_SET_ARRIVE_DATE = 'action_set_arrive_date';
export const ACTION_SET_DEPART_TIME_STR = 'action_set_depart_time_str';
export const ACTION_SET_ARRIVE_TIME_STR = 'action_set_arrive_time_str';
export const ACTION_SET_DEPART_STATION = 'action_set_depart_station';
export const ACTION_SET_ARRIVE_STATION = 'action_set_arrive_station';
export const ACTION_SET_TRAIN_NUMBER = 'action_set_train_number';
export const ACTION_SET_DURATION_STR = 'action_set_duration_str';
export const ACTION_SET_TICKETS = 'action_set_tickets';
export const ACTION_SET_ISSCHEDULE_VISIBLE = 'action_set_isschedule_visible';
export const ACTION_SET_SEARCH_PARSED = 'action_set_search_parsed';


export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    }
}
export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    }
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    }
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    }
}
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_DEPART_STATION,
        payload: departStation,
    }
}
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    }
}
export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    }
}
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    }
}
export function setTickets(tickets) {
    return {
        type: ACTION_SET_TICKETS,
        payload: tickets,
    }
}
export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: ACTION_SET_ISSCHEDULE_VISIBLE,
        payload: isScheduleVisible,
    }
}

// 切换
export function toggleIsScheduleVisible() {
    // 获取当前值, 需要异步 return 一个函数,
    // 能写这里的异步 逻辑, 是因为我们加了 redux-thunk 这个中间键;
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState();
        dispatch(setIsScheduleVisible(!isScheduleVisible))
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