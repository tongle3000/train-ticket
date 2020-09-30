import './css/Nav.css';
import 'dayjs/locale/zh-cn';

import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';


const Nav = memo(function Nav(props) {
    
    const { date, toggleNextDepartDate, togglePrevDepartDate, isPrevDisabled, isNextDisabled, } = props;

    console.log('Nav.jsx', dayjs(date).format("YYYY-MM-DD"))
    // 001 方法 获取 月日 周几;
    // const month = new Date(departDate).getMonth() + 1;
    // const date = new Date(departDate).getDate();
    // // const day = new Date(departDate).getDay(); // 得到数字 5;
    // const weekString = '周' + ['日', '一', '二','三','四','五','六'][new Date(departDate).getDay()]; // 得到 周五;

    // 002 方法 获取 月日 周几;
    const currentString = useMemo(() => {
        const d = dayjs(date);
        return d.format('M月D日 ') + d.locale('zh-cn').format('ddd');
    }, [date])

    

    return (
        <div className='navbar'>
                <div onClick={togglePrevDepartDate} className={isPrevDisabled ? 'prev disabled' : 'prev'}>前一天</div>
                <div className='date'>
                    {/* {month}月{date}日 {weekString} */}
                    {currentString}
                </div>
                <div onClick={toggleNextDepartDate} className={isNextDisabled ? 'next disabled' : 'next'}>后一天</div>
        </div>
    )
});

Nav.propTypes = {
    date: PropTypes.number.isRequired,
    toggleNextDepartDate: PropTypes.func.isRequired,
    togglePrevDepartDate: PropTypes.func.isRequired,
    isPrevDisabled: PropTypes.bool.isRequired,
    isNextDisabled: PropTypes.bool.isRequired,
}

export default Nav;

