import './css/HighSpeed.css';

import { Switch } from 'antd';
import React from 'react';

export default function HighSpeed(props) {

    const { highSpeed, toggle } = props;
    
    return (
        <div className='high-speed'>
            <label style={{color:'#666', fontSize:'16px'}}>只看高铁/动车</label>
            <div className='switch-btn'  onClick={() => toggle()}>
                {/* 这个 input 不能放入 switch 包裹,不然提交不了 highSpeed 的数据 */}
                <input type='hidden' name='highSpeed' value={highSpeed} />

                <Switch checked={highSpeed} />
            </div>
        </div>
    )
}
