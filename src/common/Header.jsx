import './css/Header.css';

import PropTypes from 'prop-types';
import React from 'react';

function Header(props) {
    // 从 props 取出 出入属性, 标题 返回首页;
    const {onBack, title} = props;

    return (
        <div className='header'>
            <div className='header-back' onClick={onBack}>
                <svg width='42' height='42'>
                    <polyline 
                    points='25,13 16,21 25,29'
                    stroke='#fff'
                    strokeWidth='2'
                    fill='none' />
                </svg>
            </div>
            <h1 className='header-title'>
                {title}
            </h1>
        </div>
    )
}

// 类型约束; Header是函数组件; 
Header.protoTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

export default Header;

