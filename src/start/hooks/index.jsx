import './Style.css';

import React, { Component } from 'react';

import HselfHooks from './HselfHooks';
import HuseCallback from './HuseCallback.jsx';
import HuseContext from './HuseContext.jsx';
import HuseEffect from './HuseEffect.jsx';
import HuseMemo from './HuseMemo.jsx';
import HuseRef from './HuseRef.jsx';
import HuseState from './HuseState.jsx';

/**
 * 第 3 章 【No723】慕课 ReactHooks重构去哪网购票
 * Context 、ContextType 、 LazySuspense 、 Memo
 */
export default function() {

        return (
            <div>
                <h1 className='cell'>train-ticket项目 : Hooks</h1>
                <div className='cell'><HuseState /></div>
                <div className='cell'><HuseEffect /></div>
                <div className='cell'><HuseContext /></div>
                <div className='cell'><HuseMemo /></div>
                <div className='cell'><HuseCallback /></div>
                <div className='cell'><HuseRef /></div>
                <div className='cell'><HselfHooks /></div>
            </div>
        )

}
