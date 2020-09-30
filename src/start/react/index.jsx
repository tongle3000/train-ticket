/**
 * 第 3 章 【No723】慕课 ReactHooks重构去哪网购票
 * Context 、ContextType 、 LazySuspense 、 Memo
 */
import './Style.css';

import React, { Component } from 'react';

import Context from './Context.jsx';
import ContextType from './ContextType.jsx';
import LazySuspense from './LazySuspense.jsx';
import Memo from './Memo.jsx';

export default class index extends Component {
    render() {
        return (
            <div>
                <h1 className='cell'>train-ticket项目 : React新特性</h1>
                <div className='cell'><Context /></div>
                <div className='cell'><ContextType /></div>
                <div className='cell'><LazySuspense /></div>
                <div className='cell'><Memo /></div>
            </div>
        )
    }
}
