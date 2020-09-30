/**
 * 始发 终点 站
 * 
 */
import './css/App.css';
import './css/Journey.css';

import { RetweetOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';


export default function Journey(props) {
    // 取出 那些数据    
    // 始发: from, 终点: to, 
    // 换换位置: exchangeFromTo, 
    // 弹出城市选择图层: showCitySelector, 隐藏: hideCitySelector,
    // 回填城市: setSelectedCity

    const {
        from, 
        to, 
        exchangeFromTo, 
        showCitySelector, 
        // hideCitySelector, 
        // setSelectedCity 
    } = props;
    return (
        <>
        <div className='journey-wrapper'>
            <div className='journey-station' onClick={() => showCitySelector(true)}>
                <input
                    type='text'
                    value= {from}
                    name='from'
                    className='journey-input text-left'
                    readOnly
                />
            </div>
            <div  className='switch' onClick={() => exchangeFromTo()} >
                {/* <RetweetOutlined /> */}
                <Button icon={<RetweetOutlined />} />
            </div>
            <div className='journey-station'  onClick={() => showCitySelector(false)}>
                <input
                    type='text'
                    value= {to}
                    name='to'
                    className='journey-input text-right'
                    readOnly
                />
            </div>
        </div>
        </>
        
        
    )
}
