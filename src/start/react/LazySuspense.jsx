import React, { Component, lazy, Suspense } from 'react';

/**
 * 
 * lazy, Suspense
 * 
 * 延迟加载
 * 
 * Webpack - Code Splitting
 * import 静态导入模块, 动态导入模块.
 * import ('./detail.js').then(...)
 */

// const About = lazy(() => import('./lazySuspense-Aboout.jsx'));
// 给 lazySuspense-Aboout 这个页面价格独立的请求的名, 这个是到 chrom 浏览器里 Network -> about.chunk.js
// /* webpackChunkName:·"about" */   这里实验报错,跟视频的结果不一样,不能加名;
const About = lazy(() => import(/* webpackChunkName:·"about" */ './LazySuspenseAbout.jsx'));

// ErrorBoundary 捕获 lazy没有加载到的 报错问题;
// componentDidCatch, static getDerivedStateFromError
// 测试,没有加载到 chrome 浏览 2.chunk.js, 对着它右击: Block request URL; 没加载到会输出 error;

export default class lazySuspense extends Component {
    state = {
        hasError: false,
    }
    // 001 方法: 测试,捕获没有加载到 chrome 浏览 2.chunk.js; 没加载到会输出 error;
    // componentDidCatch() {
    //     this.setState({
    //         hasError: true,
    //     })
    // }
    // 002 方法: 测试,捕获没有加载到 chrome 浏览 2.chunk.js, 没加载到会输出 error;
    static getDerivedStateFromError() {
        return  {
            hasError: true,
        }
    }

    render() {
        if (this.state.hasError) {
            return <div>error</div>
        };
        return (
            <div>
                <h1>lazy (Suspense与lazy搭配使用)<br /></h1>
                <div>延迟 异步加载 先 显示 loading 组件, 再显示内容功能(滚动到对应位置才加载)</div>
                <p>异步加载: {`const About = lazy(() => import('./LazySuspenseAbout.jsx'));`}</p>
				<p>
                    loading 加载失败错误捕获: 测试,捕获没有加载到 chrome 浏览 2.chunk.js, 没加载到会输出 error 有 2 个方法: componentDidCatch();static getDerivedStateFromError() <br/>
				</p>
                <Suspense fallback={<div>正在加载中...</div>/** <Loading /> */}>
                    <About></About>
                </Suspense>
            </div>
        )
    }
}
