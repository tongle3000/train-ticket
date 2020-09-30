/**
 * Context 
 * 
 * Provider 传值value={ name }, Consumer 接收值 { name => {name} };
 * 不要滥用 context 会影响组件的独立性; 
 * 一般在一个组件中,只使用一个 Context
 * 
 */
import './Context.css';

import React, { createContext } from 'react';


const BatteryContext = createContext(); // 取不到值,可以在这个括号里 赋值 测试;
const OnlineContext = createContext(); // 多个 Context

class Leaf extends React.Component {
	render() {
		return (
			// Consumer 这里面不能渲染组件,只能参数;
			<BatteryContext.Consumer>
				{/*  一个 Context
		{
			(battery) => <h1>Battery: {battery}</h1>
		}
		*/}

				{/* 多个 Context consume;  String(online) 布尔值转换成 string */}
				{
					battery => (
						<OnlineContext.Consumer>
							{
								online => <h1>Battery: {battery}, Online: {String(online)}</h1>
							}
						</OnlineContext.Consumer>
					)
				}
			</BatteryContext.Consumer>
		);
	}
}

// 中间组件
class Middle extends React.Component {
	render() {
		return <Leaf />;
	}
}

class App extends React.Component {
	state = {
		battery: 1,
		online: false, // 多个 Context
	};

	render() {
		const { battery, online } = this.state;
		return (
			// Provider 提供值; Consumer 消费这个值;
			// 多个 Context, 把新的 provider 放入里面即可;
			<BatteryContext.Provider value={battery}>
				<OnlineContext.Provider value={online}>
					<h1>Context<br />祖组件 向 孙组件传递 值时,可以跳过,直接传给孙组件; </h1>
					<div>{`祖组件 定义 Provider 传值value={ name }, 孙组件 Consumer 接收值 { name => {name} }`};</div>
					<Middle />
					<button
						className='button'
						type="button"
						onClick={() => this.setState({ battery: battery - 1 })}
					>
						battery -1
         			</button>
					<button
						className='button'
						type="button"
						onClick={() => this.setState({ online: !online })}
					>
						Switch online
          			</button>
				</OnlineContext.Provider>
			</BatteryContext.Provider>
		);
	}
}

export default App;
