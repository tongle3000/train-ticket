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


const BatteryContext = createContext(); 
const OnlineContext = createContext(); 

class Leaf extends React.Component {

	/**
	 * contextType
	 * 
	 * static contextType = BatteryContext;
	 * const battery = this.context;
	 * 
	 * <h1>Battery: {battery}</h1>
	 * 
	 * BatteryContext.Provider 要的,不然只能获取到 上面 括号 里的值
	 * 
	 */
	static contextType = BatteryContext;   // 引用: contextType

	render() {
		const battery = this.context;     // 引用: contextType, 直接读取  this.context 里的 battery;

		return (
			// 引用: contextType, 直接读取
			<h1>Battery: {battery}</h1>
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
				<h1>ContextType<br />改进了 Context 孙组件Consumer 取值的代码, 使用contextType </h1>
				<div>
					* {`static contextType = BatteryContext;`}<br/>
					* {`const battery = this.context;`}<br/>
					* {`<h1>Battery: {battery}</h1>`}
				</div>
					<Middle />
					<button
						className='button'
						type="button"
						onClick={() => this.setState({ battery: battery - 1 })}
					>
						battery -1
         			</button>
			</BatteryContext.Provider>
		);
	}
}

export default App;
