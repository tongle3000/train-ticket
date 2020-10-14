import leftPad from 'left-pad';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import useSize from '../common/useSize';

const Slider = (function Slider(props) {
    const {
        title,
        currentStartHours,
        currentEndHours,
        onStartChanged,
        onEndChanged,
    } = props;

    // ------点"重置" 按钮, 时间不会重置; prev 代表上一次的 StartHours 的值, 初始值为 currentStartHours 值; end 也一样;
    // 然后我们对比 本次的 props 和上一次的 props, 如果有变动,我们就更新 startHours 和 endHours;
    const prevCurrentStartHours = useRef(currentStartHours);
    const prevCurrentEndHours = useRef(currentEndHours);


    // 创建缓冲区; currentStartHours 转换成百分比; 
    const [start, setStart] = useState(() => currentStartHours / 24 * 100); // 开始时间
    const [end, setEnd] = useState(() => currentEndHours / 24 * 100); // 结束时间
    

    // ------点"重置" 按钮,
    if(prevCurrentStartHours.current !== currentStartHours) {
        setStart( currentStartHours / 24 * 100);
        prevCurrentStartHours.current = currentStartHours;
    }
    if(prevCurrentEndHours.current !== currentEndHours) {
        setEnd( currentEndHours / 24 * 100);
        prevCurrentEndHours.current = currentEndHours;
    }


    /**
     * 拖动功能 const
     */
    const startHandle = useRef();
    const endHandle = useRef();
    

    const lastStartX = useRef();
    const lastEndX = useRef();
    
    const range = useRef();
    const rangeWidth = useRef();

    // 拖动时可能有溢出问题, 所以这个给 start 限制一下;
    const startPrecent = useMemo(() => {
        if(start > 100) {
            return 100;
        }

        if(start < 0 ) {
            return 0;
        }

        return start;
    }, [start]);

    const endPrecent = useMemo(() => {
        if(end > 100) {
            return 100;
        }

        if(end < 0 ) {
            return 0;
        }

        return end;
    }, [end]);

    // const middle = useMemo(() => {
    //     if(end > start) {
    //         let middle = Math.ceil((end - start) * 24 / 100);
    //         if(middle > 4) {
    //             return middle;
    //         }
    //     }
    // }, [start, end])
    // console.log('middle',middle)

    
        // 上面时滑块, 滑块上面还有显示时间; 这里要把上面滑块转换成时间;
        const startHours = useMemo(() => {
                return Math.round(startPrecent * 24 / 100); // Math.round() 取整
            
        }, [startPrecent]);

        const endHours = useMemo(() => {
                return  Math.round(endPrecent * 24 / 100);
            
        }, [endPrecent]);

    

    // 上面时整数, 下面还得加上 ':00';
    const startText = useMemo(() => {
            return leftPad(startHours, 2, '0') + ':00';
        
    }, [startHours]);

    const endText = useMemo(() => {
            return leftPad(endHours, 2, '0') + ':00';
        
    }, [endHours]);

    

    /**
     * 拖动功能 方法和 useEffect
     */
    // 左边
    function onStartTouchBegin(e) {
            const touch = e.targetTouches[0];
            lastStartX.current = touch.pageX; // 赋值拖动后的
        // console.log(touch)
    
    }

    // 右边 
    function onEndTouchBegin(e) {
            const touch = e.targetTouches[0];
            lastEndX.current = touch.pageX; // 赋值拖动后的
        
    }

    // 左边 touch move
    function onStartTouchMove(e) {
            const touch = e.targetTouches[0];
            const distance = touch.pageX - lastStartX.current; // 滑过的距离;
            lastStartX.current = touch.pageX; // 刷新起点初始值;
            
                setStart(start => start + (distance / rangeWidth.current) * 100) // 更新滑块的位置, rangeWidth.current通过下面副作用 去取;
        
    }
    
    // 右边 touch move
    function onEndTouchMove(e) {
            const touch = e.targetTouches[0];
            const distance = touch.pageX - lastEndX.current;

            lastEndX.current = touch.pageX; // 刷新起点初始值;
            setEnd(end => end + (distance / rangeWidth.current) * 100);
        
    }

    const { sizeWidth } = useSize();

    // rangeWidth.current
    useEffect(() => {
        rangeWidth.current = parseFloat( // parseFloat() 把带有单位的 转换成数字;
            window.getComputedStyle(range.current).width, // 这个 width 可能有单位,我们把它转换成数字;
        )
    }, [sizeWidth]); // 只要处理一次就够,[] // 这个宽度 其实受 resize 的影响,我们要 onrisze 触发它刷新;

    console.log(sizeWidth, rangeWidth.current)
    // 操作 DOM 事件; 

    useEffect(() => {
        // target.addEventListener(type, listener, options); 监听鼠标点击一个元素。
        
        startHandle.current.addEventListener('touchstart', onStartTouchBegin, false); // 左边滑块 初始值
        startHandle.current.addEventListener('touchmove', onStartTouchMove, false);

        endHandle.current.addEventListener('touchstart', onEndTouchBegin, false);  // 右边初始
        endHandle.current.addEventListener('touchmove', onEndTouchMove, false);
        

        // 解绑, add 改成 remove
        return () => {
            startHandle.current.removeEventListener('touchstart', onStartTouchBegin, false); // 左边滑块 初始值
            startHandle.current.removeEventListener('touchmove', onStartTouchMove, false);

            endHandle.current.removeEventListener('touchstart', onEndTouchBegin, false);
            endHandle.current.removeEventListener('touchmove', onEndTouchMove, false);
        }
    }); // 不用传第二参数;在每个渲染周期,,都要执行


    // 不能正常拖动的问题是,,我 addEventListener 的 第一个参数 type 我有大写字母;
    // console.log(startPrecent, endPrecent, range.current, rangeWidth.current, startHandle.current,)


    // 把拖动好的时间, 同步 给 bottom 组件
    useEffect(() => {
        onStartChanged(startHours)
    }, [startHours, onStartChanged]);

    useEffect(() => {
        onEndChanged(endHours);
    }, [endHours, onEndChanged]);


    return (
        <div className='option'>
            <h3 className='sub-hd'>{title}</h3>
            <div className='sub-bd' style={{padding:'30px 60px 40px',}}>
                
                <div className='slider' ref={range}>
                    {/* 先定义有颜色的蓝线 */}
                    {/* {startPrecent} */}

                    <div className='slider-range' style={{
                        left: startPrecent + '%', // 左边起点位置;
                        width: endPrecent - startPrecent  + '%', // 钟点-起点 等于宽度;
                    }}></div>


                    {/* 2个滑块 */}
                    <span ref={ startHandle } className='slider-handle' style={{
                        left: startPrecent + '%',
                    }}>
                        <i>{startText}</i>
                    </span>


                    <span ref={ endHandle } className='slider-handle' style={{
                        left: endPrecent + '%',
                    }}>
                        <i>{endText}</i>
                    </span>
                </div>
            </div>
        </div>
    )
})

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChanged: PropTypes.func.isRequired,
    onEndChanged: PropTypes.func.isRequired,
}

export default Slider;

