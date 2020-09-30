/**
 * 日期选择 DepartDate
 */
import './css/DepartDate.css';

import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import React, { useMemo } from 'react';

import { h0 } from '../common/unitls';

/**
 * 
 * 这个组件不适合 用 useMemo 来优化, 因为,h0 组件;
 */
export default function DepartDate(props) {

    // 从 props 拿到 时间 点击事件;
    const { time, onClick } = props;

   
    // 把父组件传过来的 time 使用h0 组件方法, 转成 不带分钟 秒 毫秒 的时间;传给 departDateString 的第二个参数, 不然 departDateString会谁在毫秒在变,不听的在运算; 
    const h0OfDepart = h0(time); // 过滤 小时 分钟

    //  // 根据需求,要把 time 转换成 年月日;  使用第三方插件 dayjs 来转换日期, 比较复杂, 我们使用 useMemo 来优化
    const departDateString = useMemo(() => { 
        return dayjs(h0OfDepart).format('YYYY-MM-DD');
    }, [h0OfDepart]);

    // // 判断日期是不是今天;
    const isToday = h0OfDepart === h0();

    // 显示的日期 后面 加上星期几 或今天;
    const departDate = new Date(h0OfDepart);
    const weekString = '周' 
        + ['日', '一', '二','三','四','五','六'][departDate.getDay()]
        + (isToday ? '今天' : ''); 
    
    return (
        <div className='depart-date' onClick={onClick}>

            {/* 为了整个页面的表单提交需要 在这里放个 input */}
            <input type='hidden' name='date' value={departDateString} />

            {departDateString} <span className='depart-week'>{weekString}</span>
            
            {/* 测试 ==== time:{time} ==== ====={h0(time)}====  {dayjs(h0OfDepart).format('YYYY-MM-DD')} */}
            

        </div>
    )
}


DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};
