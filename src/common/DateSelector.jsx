import './css/DateSelector.css';

import { PropTypes } from 'prop-types';
import React from 'react';

import Header from './Header';
import { h0 } from './unitls';


function Day(props) {
    const {day, onSelect} = props;
    
    if(!day) {
        return <td className='null'></td>
    }

    let classes = ''; // 样式的数组;

    const now = h0();


    // 判断是否是周末;
    if( [6, 0].includes(new Date(day).getDay()) ) {
        classes='weekend';
    }

    // 判断 是否是 过去?
    if(day < now) {
        classes='disabled'; // 推送disabled 可能是不能点;
        if( [6, 0].includes(new Date(day).getDay()) ) {
            classes='disabled weekend';
        }
    }

    // 判断 大于 30天 = 30 * 86400 * 1000
    if(day >= now + 30 * 86400 * 1000) {
        classes='disabled'; // 推送disabled 可能是不能点;
        if( [6, 0].includes(new Date(day).getDay()) ) {
            classes='disabled weekend';
        }
    }

    // console.log(day, now + 30 * 86400 * 1000);

    // console.log('day: ',Month , currentMonth, new Date(day).getDay(),'---', allDate, currentDate-2, allDate >= (currentDate-2))
    

    // 周末 class="disabled,weekend"

    // 判断是否今天
    const dateString = now === day ? '今天' : new Date(day).getDate();

    return(
        <td className={classes} onClick={() => onSelect(day)}>{dateString}</td>
    )
}

// //
function Week(props) {
    
    const {week, onSelect} = props;

    return (
        
        <tr>
            {
                week.map( (day, idx) => {
                    return(
                        <Day key={idx} day={day} onSelect={onSelect} />
                    )
                })
            }
        </tr>
    )
}


// 月组件;
function Month(props) {

    // 在里面有 3 个月要渲染;
    const {
        startingTimeInMonth, // 这个月的第一天的 0 时刻;
        onSelect,
    } = props;

    // 遍历当月的日期, 以 7 天为一组,渲染出来; 以当月第一天的 0 时候代表这一天;

    // 怎么获取当月的日期呢?
    // 创建一个 0 时刻的 day 对象;
    const startDay = new Date(startingTimeInMonth);

    // 创建个指针变量;
    const currentDay = new Date(startingTimeInMonth); //定义与上面startDay 一样,但是 currentDay 会让它 自增;

    // 创建个天的数组;
    let days = [];

    // 再做一个循环;
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1); // 设置 currentDay 自增; 不会溢出,因为月也会加 1;
    }


    // 001, 前面 补齐空数组操作;
    // 处理 1 号不是星期一的时候, 补一些空白; 星期几 补齐几少 1个, 如果是 星期天,就得补齐 6 个;
    // startDay.getDate() ? (startDay.getDate() - 1) : 6
    // .fill(null) 就是往数组里面,填入没有意义的 null;
    // .concat(days) 就是与 days 连接起来;
    // 把最后的结果 赋值给 days= 结果,
    days = new Array(startDay.getDay() ? (startDay.getDay() - 1) : 6)
        .fill(null).concat(days);

    // 002, 后面 补齐空数组操作;
    // 最后一天是星期几,我们就补齐 7 减星期几的数字; 星期日除外,星期日不用补齐;
    const lastDay = new Date(days[days.length - 1]); // 因为数组是从 0 开始,所以要长度减 1;
    // lastDay.getDay() 不是星期日, 补:7 - lastDay.getDay(), 是:补 0; 把它赋给一个新数组;
    // 要把新数组放到 days 的后面, days.concat(新数组), 再赋值回给  days;
    days = days.concat(
        new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
    );

    // 前后补齐后,,days 的长度肯定是 7 的倍数;
    // console.log(days)
    const weeks = [];

    // week的  起点: row * 7 ; 终点:(row+1) * 7;
    // 把 week 存入到 weeks 数组里,  weeks.push(week);
    for (let row = 0; row < days.length / 7; row++) {
        const week = days.slice(row * 7, (row + 1) * 7); // 起点: row * 7 ; 终点:(row+1) * 7;
        weeks.push(week); // 把 week 存入到 weeks 数组里
    }

    return (
        <table className='data-table'>
            <thead>
                <tr>
                    <th colSpan="7" className='month'>
                            {startDay.getFullYear()}年 
                            {startDay.getMonth() + 1/** 月从 0 开始,所以加 1 */}月
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className='data-table-weeks'>
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className='weekend'>周六</th>
                    <th className='weekend'>周日</th>
                </tr>

                {/* 遍历weeks 周 */}
                {/* {weeks.getDay()} */}
                {
                    weeks.map( (week, idx) => {
                        return(
                            <Week onSelect={onSelect} key={idx} week={week} />
                        )
                    })
                }

            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired, 
    onSelect: PropTypes.func.isRequired,
}

export default function DateSelector(props) {
    const { show, onBack, onSelect, sizeHeight } = props;

    // 获取当前月; 先获取当天;
    const now = new Date(); // 获取当天;
    now.setHours(0); // 清楚小时为0;
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // console.log(now.getDate()) // 23 ; 4 6 9 11

    // getMonthDate= () => {
    //     return now.getMonth()+1 === 2 || ((now.getMonth()+1 === 4 || now.getMonth()+1 === 6 || now.getMonth()+1 === 9 || now.getMonth()+1 === 4) && now.getDate() > 1) || now.getDate() > 2
    // }

    let monthSequence=[];
    if(now.getMonth()+1 === 2 || ((now.getMonth()+1 === 4 || now.getMonth()+1 === 6 || now.getMonth()+1 === 9 || now.getMonth()+1 === 4) && now.getDate() > 1) || now.getDate() > 2) {
        now.setDate(1); // 设置当天到 当月的 1 号;

        // console.log(now.getDate()) // 1


        // now.getTime(); // 能获取到 当月的 1 号 第一天的 0 时刻; 把它存进数组里;

        monthSequence = [now.getTime()];

        // 现在要计算 2 个月的,, 不能用 monthSequence 加 30 天 或者 31 去计算,太麻烦,
        // 可以用 getMonth+1;
        now.setMonth(now.getMonth() + 1); // 得到下个月的第一天;
        // 这时再执行 now.getTime() , 就能得到下个月的 第一天的 0 时刻; 再它推送到 monthSequence 这个数组里;
        monthSequence.push(now.getTime());

    } else {
        now.setDate(1); // 设置当天到 当月的 1 号;
        monthSequence = [now.getTime()];
    }

    // // 再执行一次,就能得到下下个月的; // 不用担心 12 月份会溢出, 一旦跨年, 年也会自动加 1;
    // now.setMonth(now.getMonth() + 1);
    // monthSequence.push(now.getTime());
    // // 这时遍历 monthSequence 把三个月都渲染出来;


    // now.setMonth(now.getMonth() + 1);
    // monthSequence.push(now.getTime());


    return (
        <div className={!show ? "date-select hidden" : "date-select"}>
            <Header title="日期选择" onBack={onBack} />
            <div className="bd" style={{ height: sizeHeight - 42 }}>

                {
                    monthSequence.map((month) => {
                        return (
                            <Month 
                                key={month} 
                                onSelect={onSelect}
                                startingTimeInMonth={month} 
                            />
                        );
                    })
                }


            </div>
        </div>
    );
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    sizeHeight: PropTypes.number.isRequired,
};
