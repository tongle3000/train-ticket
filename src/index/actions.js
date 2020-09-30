

export const ACTION_SET_FROM = 'ACTION_SET_FROM';
export const ACTION_SET_TO = 'ACTION_SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'ACTION_SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'ACTION_SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'ACTION_SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'ACTION_SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'ACTION_SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'ACTION_SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'ACTION_SET_DEPART_DATE';


export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    }
}
export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    }
}
export function setIsLoaddingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    }
}
export function setCityData(cityData) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityData,
    }
}

// 高铁, 布尔值, 不用 set 用 toggle;  要用到异步 action
export function toggleHighSpeed() {
    
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        // console.log('highSpeed',highSpeed); // 测试antd 的 switch是否执行了这个 action;
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        })
    }
    
}

// 城市选择  浮层 展现; 要用到异步 action
export function showCitySelector(currentSelectingLeftCity) {
    return (dispatch) => {
        // 先设置为 true
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        })
        // 设置 currentSelectingLeftCity 的值;
        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        })
    }
}


//  城市选择  浮层 隐藏;
export function hideCitySelector(currentSelectingLeftCity) {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    }
}

// 选完城市 回填进来;            参数 城市名 ,  getState 能获取到 数据 currentSelectingLeftCity
export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();
        if(currentSelectingLeftCity) {           // 回填到 From
            dispatch(setFrom(city));   
        } else {
            dispatch(setTo(city));              // 否则 回填到 To
        }
        dispatch(hideCitySelector());  // 再把 城市 浮层 隐藏;   () 括号忘记写  报 input 显示[Object Object]
    }
}

// 日期; show
export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    }
}

// 日期; hide
export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    }
}


// 日期回填; 自己写;
export function setDepartDate(departDate) {
    // return (dispatch, getState) => {
    //     dispatch({
    //         type: ACTION_SET_DEPART_DATE,
    //         payload: date
    //     })
    // }
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    }
}

// 始发 与 终点 站是可以任意调换的, 我们下面这个 action 执行;
export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to } = getState();        // 先获取当前From to 的值;
        dispatch(setFrom(to));
        dispatch(setTo(from));
    }
}


// 读取城市数据,

export function fetchCityData() {
    const CITY_DATA_CACHE='city_data_cache';
    return (dispatch, getState) => {
        const {isLoadingCityData} = getState();

        // 如果是在加载, 直接返回,不执行下面操作
        if(isLoadingCityData) { 
            return;
        }

        // 如果缓存有值, 直接取缓存里的. 返回;
        // 缓存: 取值;
        const cache = JSON.parse(localStorage.getItem(CITY_DATA_CACHE) || '{}'); // 为了防止解释报错, 加 || '{}'
        // 缓存:判断缓存过期时间;
        if(Date.now() < cache.expires) {
            dispatch(setCityData(cache.data));

            return;
        }


        // 给 isLoadingCityData 传入 true , 再执行下面获取数据, 获取完后,赋值 false;
        dispatch(setIsLoaddingCityData(true)); // 

        // fetch('rest/cities')
        fetch('rest/citys?_' + Date.now())
            .then(res => res.json())                                               // 少了()
            .then( cityDate => {
                dispatch(setCityData(cityDate)); // 这个 cityData (是这里的) =>{}
                
                // 缓存: 存储数据 到 localStorage
                localStorage.setItem(CITY_DATA_CACHE, 
                    JSON.stringify({ // 转化成字符串
                        expires: Date.now() + 60 * 1000, // 加一分钟;
                        data: cityDate,
                    })
                )

                dispatch(setIsLoaddingCityData(false));
            })
            .catch(() => dispatch(setIsLoaddingCityData(false)));

    }
}