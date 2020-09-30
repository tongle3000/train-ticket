import { useEffect, useState } from 'react';

/**
 * 获取屏幕的高度
 */
export default function useSize() {
    const [size, setSize] = useState({
        // 定义获取屏幕尺寸;
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });

    const onResize = () => {
        // 改变值的方法; 没有 this, 所以前面用 const 定义;
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    };

    // 这个useEffect 调用一次.
    useEffect(() => {
        window.addEventListener("resize", onResize, false); // 挂载 事件
        return () => {
            window.removeEventListener("resize", onResize, false); // 移除事件
        };
    }, []); // useEffect 每次组件渲染后,都运行. 得给它多传个空数组 [] ,就会执行 1 次就是;
    // 第二个参数, [] 数组,只有里面的每一项都不变, useEffect 才不会再次 执行 .
    /**
     * 获取屏幕的高度 end
     */
    const sizeHeight = size.height;
    const sizeWidth = size.width;
    return { sizeHeight, sizeWidth };
}
