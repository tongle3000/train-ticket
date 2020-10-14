


export const ACTION_SET_TRAINNUMBER='action_set_trainNumber';
export const ACTION_SET_DEPARTSTATION='action_set_departStation';
export const ACTION_SET_ARRIVESTATION='action_set_arriveStation';
export const ACTION_SET_SEATTYPE='action_set_seatType';
export const ACTION_SET_DEPARTDATE='action_set_DepartDate';
export const ACTION_SET_ARRIVEDATE='action_set_arriveDate';
export const ACTION_SET_DEPARTTIMESTR='action_set_departTimeStr';
export const ACTION_SET_ARRIVETIMESTR='action_set_arriveTimeStr';
export const ACTION_SET_DURATIONSTR='action_set_durationStr';
export const ACTION_SET_PRICE='action_set_price';
export const ACTION_SET_PASSENGERS='action_set_passengers';
export const ACTION_SET_MENU='action_set_menu';
export const ACTION_SET_ISMENUVISIBLE='action_set_isMenuVisible';
export const ACTION_SET_SEARCHPARSED='action_set_searchParsed';



export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_TRAINNUMBER,
        payload: trainNumber,
    }
}
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_DEPARTSTATION,
        payload: departStation,
    }
}
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_ARRIVESTATION,
        payload: arriveStation,
    }
}
export function setSeatType(seatType) {
    return {
        type: ACTION_SET_SEATTYPE,
        payload: seatType,
    }
}
export function setDepartDate(DepartDate) {
    return {
        type: ACTION_SET_DEPARTDATE,
        payload: DepartDate,
    }
}

export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_ARRIVEDATE,
        payload: arriveDate,
    }
}


export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_DEPARTTIMESTR,
        payload: departTimeStr,
    }
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_ARRIVETIMESTR,
        payload: arriveTimeStr,
    }
}
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_DURATIONSTR,
        payload: durationStr,
    }
}
export function setPrice(price) {
    return {
        type: ACTION_SET_PRICE,
        payload: price,
    }
}
export function setPassengers(passengers) {
    return {
        type: ACTION_SET_PASSENGERS,
        payload: passengers,
    }
}
export function setMenu(menu) {
    return {
        type: ACTION_SET_MENU,
        payload: menu,
    }
}
export function setIsMenuVisible(isMenuVisible) {
    return {
        type: ACTION_SET_ISMENUVISIBLE,
        payload: isMenuVisible,
    }
}
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCHPARSED,
        payload: searchParsed,
    }
}

export function fetchInitial(url) {
    return (dispatch, getState) => {
        fetch(url)
        .then(res => res.json())
        .then( data => {
            const {
                departTimeStr,
                arriveTimeStr,
                arriveDate,
                durationStr,
                price,
            } = data;

            dispatch(setDepartTimeStr(departTimeStr));
            dispatch(setArriveTimeStr(arriveTimeStr));
            dispatch(setArriveDate(arriveDate));
            dispatch(setDurationStr(durationStr));
            dispatch(setPrice(price));
        });

    }
}


/**
 * 购票处: 添加成人, 添加儿童 2 个 actionCreater
 * 
 */
let passengerIdSeed=0;

// 成人 adult
export function createAdult() {
    return (dispatch, getState) => {
        const {passengers} = getState();

        // 不加下面这块,点添加成人 会一直添加下去,很多项都是空值,也添加下去;
        // 下面是判断,如果有空值,就直接 return; 不执行下面添加操作;
        // for (let passenger of passengers) {

            // 如果没填,不让添加人;
            // const keys = Object.keys(passenger);
            // for (let key of keys) {
            //     if(!passenger[key]) { // 不存在值的话,
            //         return;
            //     }
            // }


        // }

        dispatch(setPassengers([
            ...passengers,
            {
                id: ++passengerIdSeed,
                name:'',
                ticketType: 'adult',
                licenceNo: '',
                seat: 'Z',
            }
        ]));
    }
}

// 儿童 child 
export function createChild() {
    return (dispatch, getState) => {
        const {passengers} = getState();

        let adultFound = null;
        // 不加下面这块,点添加成人 会一直添加下去,很多项都是空值,也添加下去;
        // 下面是判断,如果有空值,就直接 return; 不执行下面添加操作;
        for (let passenger of passengers) {

            // 如果没填,不让添加人;
            // const keys = Object.keys(passenger);
            // for (let key of keys) {
            //     if(!passenger[key]) { // 不存在值的话,
            //         return;
            //     }
            // }

            // 这里要加一步, 检查是否添加过成人,如果没添加过, 也不让添加儿童;
            if(passenger.ticketType === 'adult') {
                adultFound = passenger.id;
            }
            
        }
        if(!adultFound) {
            alert('请先添加一个同行成人');
            return; // !adultFound 如果没找到任何信息,直接 return;
        } 
        // else if ( passengers.filter( item => item.followAdult === adultFound).length > 0 ) {
        //     console.log(passengers,passengers.filter( item => item.followAdult === adultFound).length)
        //     alert('一名成人只能携带一名儿童');
        //     return;
        // }

        dispatch(setPassengers([
            ...passengers,
            {
                id: ++passengerIdSeed,
                name:'',
                gender: 'none', // 性别
                birthday:'',
                followAdult: adultFound,
                ticketType: 'child',
                seat: 'Z',
            }
        ]));
    }
}

// 删除
export function removePassenger(id) {
    return (dispatch, getState) => {
        const {passengers} = getState();

        const newPassengers = passengers.filter( passenger => { // 过滤留下 passenger.id !== id 的项;
            return passenger.id !== id && passenger.followAdult !== id; // 成人删了,随带的儿童也要删 passenger.followAdult !== id 
        });

        dispatch(setPassengers(newPassengers));
    }
}

// input onChange 的 action
// export function updatePassenger(id, data) {
//     return((dispatch, getState) => {
//         const {passengers} = getState(); // 获取到所有乘客

//         for (let i = 0; i < passengers.length; i++) {
//             if(passengers[i].id === id) {                               // 如果找到, 我们就要构造个新的 passengers
//                 const newPassengers = [...passengers];                 // 所有乘客信息 拷贝新的里面
//                 newPassengers[i] = Object.assign({}, passengers[i], data);  // 再把 id 相等的, 更新他的信息
//                 dispatch(setPassengers(newPassengers));                    // 保存到 store 里

//                 break;
//             }
            
//         }
//     })
    
// }


// input onChange 的 action
// 曾加第三个 参数, 删除 选项属性; keysToBeRemoved=[], 在这个 里面出现的 key 我们认为是要被删除的;
export function updatePassenger(id, data, keysToBeRemoved = []) {
    return((dispatch, getState) => {
        const {passengers} = getState(); // 获取到所有乘客

        for (let i = 0; i < passengers.length; i++) {
            if(passengers[i].id === id) {                               // 如果找到, 我们就要构造个新的 passengers
                const newPassengers = [...passengers];                 // 所有乘客信息 拷贝新的里面
                newPassengers[i] = Object.assign({}, passengers[i], data);  // 再把 id 相等的, 更新他的信息

                // 删除多余的项;
                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key]; // 删除这个乘客 keysToBeRemoved 数组里的 key;
                }

                dispatch(setPassengers(newPassengers));                    // 保存到 store 里

                break;
            }
            
        }
    })
    
}


// 定义 2 个下拉弹窗的 action

export function showMenu(menu) {
    return (dispatch) => {
        // const { menu } = getState(); // 不需要获取值,,,dispatch 是要用到的.
        // dispatch(setMenu(true)); // 我写的
        dispatch(setMenu(menu));
        dispatch(setIsMenuVisible(true));
    }
}

// 性别选择
export function showGenderMenu(id) {
    return (dispatch, getState) => {
        const {passengers} = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if(!passenger){
            return;
        }
        dispatch(showMenu({
            onPress(gender) {
                dispatch(updatePassenger(id, { gender }));
                dispatch(hideMenu());
            },
            options: [
                {
                    title: '男',
                    value: 'male',
                    active: 'male' === passenger.gender,
                },
                {
                    title: '女',
                    value: 'female',
                    active: 'female' === passenger.gender,
                },
            ]
        }))
    }
}

// 同行成人
export function showFollowAdultMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        const passenger = passengers.find(passenger => passenger.id === id);

        if(!passenger) {
            return;
        }

        // 如果这人存在,弹出菜单;
        dispatch(showMenu({
            onPress(followAdult) {
                dispatch(updatePassenger(id, {followAdult}));
                dispatch(hideMenu());
            },
            options: passengers
                .filter(passenger => passenger.ticketType === 'adult')
                .map(adult => {
                    return {
                        title: adult.name,
                        value: adult.id,
                        active: adult.id === passenger.followAdult,
                    }
                })
        }))

    }
}


// 票种选择;
export function showTicketTypeMenu(id) {
    return (dispatch, getState) => {
        const {passengers} = getState();
        const passenger = passengers.find(passenger => passenger.id === id);

        if(!passenger) { return; }

        dispatch(showMenu({
            onPress(ticketType) {
                // 儿童 切换成 成人;
                if('adult' === ticketType) { 
                    dispatch(updatePassenger(id, {
                        ticketType, // 这个值也要跟新
                        licenceNo:'', // 增加身份证选项, 但要删除 gender birthday followAdult 3 个字段;
                        // 这时要扩展 updatePassenger 函数, 添加第 3 个参数, 删除多余字段.
                    }, ['gender', 'birthday', 'followAdult']))
                } else { // 成人 切换成 儿童 ;    'child' === ticketType

                    // 先判断这个 儿童前面 有没有 其他成人, 如果没有, 不让切换成儿童票;
                    // 过滤掉 自己, 再 找到这样的  成人 乘客 , 如果这样的成人乘客在,
                    const adult = passengers.find(passenger => passenger.id !== id && passenger.ticketType === 'adult');

                    // 如果这样的成人乘客在,
                    if(adult) { // 假设 成人 存在,  切换成儿童的操作; 
                        dispatch(updatePassenger(id, {
                            ticketType, // 这个值也要跟新
                            gender: '', 
                            followAdult: adult.id,
                            birthday: '', 
                        }, ['licenceNo']))
                    } else { // 如果不存在成人,
                        alert('没有其他成人乘客!')
                    }
                }

                dispatch(hideMenu());
            },
            options: [{
                title: '成人票',
                value: 'adult',
                active: 'adult' === passenger.ticketType,
            },{
                title: '儿童票',
                value: 'child',
                active: 'child' === passenger.ticketType,
            }]
        }))

    }
}


export function hideMenu() {
    return setIsMenuVisible(false);
}
