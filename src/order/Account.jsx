/**
 * 票价
 * 提交按钮
 */
import './css/Account.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Account(props) {
    const {
        price = 0,
        length
    } = props;

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='account'>
            <div className={expanded ? 'price expanded' : 'price'}
                onClick={() => setExpanded(!expanded)}
            >
                <div className='money'>{ length * price }</div>
                <div className='amount'>支付金额</div>
            </div>

            <div className='button'>提交按钮</div>

            {/* 黑背景 遮罩 */}
            <div 
                className={ !expanded ? 'layer hidden' : 'layer'}
                onClick={() => setExpanded(false)}
            >
            </div>

            {/* 详情 */}
            <div 
                className={ !expanded ? 'detail hidden' : 'detail'}
            >
                <div className='title'>金额详情</div>
                <ul>
                    <li>
                        <span>火车票</span>
                        <span>¥{price}</span>
                        <span>&#xd7;{length}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

Account.propTypes = {
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) ,
    length: PropTypes.number.isRequired,
};

export default Account;
