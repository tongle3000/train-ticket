/**
 * schedule 弹窗
 */
import '../common/css/common.css';
import './css/Schedule.css';

import dayjs from 'dayjs';
import leftPad from 'left-pad';
import React, { memo, useEffect, useState } from 'react';
import URI from 'urijs';

// import PropTypes from 'prop-types';

// 一行的组件
const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        index,
        station,
        arriveTime,
        departTime,
        stay,

        isStartStation,      // 是否是 始发站
        isEndStation,        // 是否是 终点站
        isDepartStation,     // 是否是  行程的 出发车站
        isArriveStation,     // 是否是 行程的 终点站
        beforeDepartStation, // 是否在 出发车站 之前
        afterArriveStation,  // 是否在 到达车站 之后
    } = props;
     console.log(
         beforeDepartStation,
        isDepartStation,
        afterArriveStation,
        isArriveStation,
        )
    return (
        <tr className={ beforeDepartStation || afterArriveStation ? 'row grey' : 'row' }>
            <td align='left'>
                <span className={ isDepartStation || isArriveStation ? 'icon icon-red' : 'icon' }>
                    {
                        isDepartStation ? '出' : isArriveStation ? '到' : leftPad(index, 2 , 0)
                    }
                </span>
                <span className={ isArriveStation || isDepartStation ? 'station red' : 'station'}>
                    { station }
                </span>
            </td>
            <td>
                <span className ={ isArriveStation ? 'arrtime red' : 'arrtime'}>
                    { isStartStation ? '始发站' : arriveTime }
                </span>
            </td>
            <td>
                <span className ={ isDepartStation ? 'deptime red' : 'deptime'}>
                    { isEndStation ? '终点站' : departTime }
                </span>
            </td>
            <td>
                <span className='stoptime'>
                    { isStartStation || isEndStation ? '-' : stay + '分' }
                </span>
            </td>

        </tr>
    )
})

const Schedule = memo(function Schedule(props) {
    const { 
        date,
        trainNumber,
        departStation,
        arriveStation,
     } = props;

    // 定义数据类型
    const [scheduleList, setScheduleList] = useState([])

    useEffect(() => {
        
        const url = new URI('/rest/schedule')
            .setSearch('trainNumber', trainNumber)
            .setSearch('departStation', departStation)
            .setSearch('arriveStation', arriveStation)
            .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
            .toString();
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then( data => {
                let departRow;
                let arriveRow;

                for (let i = 0; i < data.length; ++i) {
                    // 先判断 有没有找到出发车站;
                    if(!departRow) { // 如果没有找到 出发车站;
                        // data 的 station = departStation, 当前车站就是 始发车站,
                        if(data[i].station === departStation) {
                            departRow = Object.assign(data[i], { // 赋值给 data[i] 4个属性,
                                beforeDepartStation: false,
                                isDepartStation: true,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        } else {
                            Object.assign(data[i], { // 赋值给 data[i] 4个属性,
                                beforeDepartStation: true,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    } else if (!arriveRow) {
                        if(data[i].station === arriveStation) {
                            arriveRow = Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: true,
                            })
                        } else {  // 经过站
                            Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: false,
                            })
                        }
                    } else { // 后面站 ,如果找到了出发车站,, 也找到了 到达站, 当前车站 一定是在到达车站之后的.
                        Object.assign(data[i], {   // 在车站 
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: true,
                            isArriveStation: false,
                        })
                    }

                    // 是否是 始发站?
                    Object.assign(data[i], {
                        isStartStation: i === 0,
                        isEndStation: i === data.length - 1,
                    })
                    
                }
                // 经过上面的 处理, 数组的每一项 都增加了 6 个属性;

                // 我们调用 useState 里的 setScheduleList 把 6 个属性保存到 state 当中
                setScheduleList(data);

            });
    }, [
        date,
        trainNumber,
        departStation,
        arriveStation,
    ]);
    
    return (
        <div className='schedule'>
            <div className='dialog'>
                <h3>列出时刻表</h3>
                <table width='100%'>
                    <tr className="head">
                        <th align='left'>车站</th><th>到达</th><th>发车</th><th>停留</th>
                    </tr>
                        {
                            scheduleList.map( (schedule, index) => {
                                return <ScheduleRow key={schedule.station} index={index+1} {...schedule} />
                            })
                        }
                </table>
                {/* <h1>列出时刻表</h1>
                <div className="head">
                    <span className='station'>车站</span>
                    <span className='deptime'>到达</span>
                    <span>发车</span>
                    <span>停留时间</span>
                </div>

                <ul>
                    {
                        scheduleList.map( (schedule, index) => {
                            return <ScheduleRow key={schedule.station} index={index+1} {...schedule} />
                        })
                    }
                </ul> */}

            </div>
        </div>
    )
});

Schedule.propTypes = {
    // date: PropTypes.number.isRequired,
    // trainNumber: PropTypes.string.isRequired,
    // departStation: PropTypes.string.isRequired,
    // arriveStation: PropTypes.string.isRequired,
}

export default Schedule

