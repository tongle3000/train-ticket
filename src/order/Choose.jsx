/**
 * 在线选坐 组件
 * 至少需要 所有乘客 passengers, 更新数据 updatePassengers
 */
import './css/Choose.css';

import PropTypes from 'prop-types';
import React from 'react';


function Choose(props) {
    const {
        passengers,
        updatePassenger
    } = props;


    // 使用内部函数 创建 JSX 是有缺陷的,性能上要差点;
    function createSeat(seatType) {
        return(
            <div>
                {   passengers.map(passenger => {
                    return(
                        <p 
                            key={passenger.id}
                            className={ passenger.seat === seatType ? 'seat active' : 'seat' }
                            data-text={seatType} // .choose .seats .seat::after { content: attr(data-text); ...}
                            onClick={ () => updatePassenger(passenger.id, {
                                seat: seatType,
                            })}
                        >
                            &#xe02d;
                        </p>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='choose'>
            <p className='tip'> 在线选座</p>
            <div className='container'>
                <div className='seats'>
                    <div>窗</div>
                    {createSeat('A')}
                    {createSeat('B')}
                    {createSeat('C')}
                    <div>过道</div>
                    {createSeat('E')}
                    {createSeat('F')}
                    <div>窗</div>
                </div>
            </div>
        </div>
    );
}

Choose.propTypes = {
    passengers: PropTypes.array.isRequired,
    updatePassenger: PropTypes.func.isRequired,
};

export default Choose;
