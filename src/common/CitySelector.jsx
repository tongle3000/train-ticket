import '../index/css/App.css';
import './css/CitySelector.css';

import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Header from './Header';





// "cityList":[
//     {
//         "citys":[
//             {"name":"安顺"},
//             {"name":"安溪"},
//             {"name":"安辽"},
//         ], 
//         "title":'A'
//     },

// 单个城市列表渲染; 
// {"name":"安辽"}  // 这里的 onSlect 没定义,要从父组件传过来.
const CityItem = memo(function CityItem(props) {
    const { name, onSelect } = props;

    return (
        <li onClick={() => onSelect(name)} key={name} className='city-li'>{name}</li>
    )
})

// 定义类型
CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

// 一个字母块(A)的 list;  // citys=[] 这里必须赋值空数组, 不然报错: Uncaught TypeError: Cannot read property 'map' of 
/* 需要循环 citys, title
    "citys":[
      {"name":"安顺"},
      {"name":"安溪"},
       {"name":"安辽"},
    ], 
    "title":'A'
*/
// li title 里 data-cate={list.title} 是给 26个字母 点击跳转用的.
const OneLetterCityList = memo(function OneLetterCityList(props) {
    const { title, citys = [], onSelect } = props; // citys=[] 这里必须赋值空数组
    return (
        <ul className="city-ul">
            <li className="city-li title" key={title} data-cate={title}>
                {title}
            </li>
            {
                citys.map(city => {
                    return (
                        <CityItem
                            name={city.name}
                            onSelect={onSelect}
                            key={city.name}
                        />
                    )
                })
            }
        </ul>
    )
})

OneLetterCityList.propTypes = {
    title: PropTypes.string.isRequired,
    citys: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
}

// 所有字母块的 list;
/*  第一层的项: title, citys
    {
        "citys":[
            {"name":"安顺"},
            {"name":"安溪"},
            {"name":"安辽"},
        ], 
        "title":'A'
    },
    {
        "citys":[
            {"name":"宜昌"},
            {"name":"盐城"},
            {"name":" 宜春"},
        ], 
        "title":'B'
    },
*/
const AllCityList = memo(function AllCityList(props) {
    const { cityList, onSelect } = props;
    return (
        <div className='city-list'>
            <div className='city-cate'>
                {
                    cityList.map(list => {
                        return (
                            <OneLetterCityList
                                title={list.title}
                                citys={list.citys}

                                onSelect={onSelect}
                                key={list.title}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
})

AllCityList.propTypes = {
    cityList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired
}






// 数组里的 title 字母 26个字母; 
const AllLetters = memo(function AllLetters(props) {

    const { cityListTitle, toAlpha, sizeHeight } = props;
    return (
        <ul className='letter-list' style={{ height: sizeHeight - 116 }}>
            {
                cityListTitle.map(list => {
                    return (
                        <li
                            onClick={() => toAlpha(list.title)}
                            className='letter'
                            key={list.title}
                        >
                            {list.title}
                        </li>
                    )
                })

            }
        </ul>
    )
})

AllLetters.protoTypes = {
    cityListTitle: PropTypes.array.isRequired,
}



// 热门城市
const HotCityList = memo(function HotCityList(props) {
    const { hotCities, onSelect } = props;
    return (
        <div className='hot-city'>
            <div className='title'>热门城市</div>
            <ul>
                {
                    hotCities.map(list => {
                        return (
                            <CityItem
                                name={list.name}

                                onSelect={onSelect}
                                key={list.name}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
})

HotCityList.propTypes = {
    hotCities: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired
}


const SuggestItem = memo(function SuggestItem(props) {
    const { name, onClick } = props;
    return (
        <li onClick ={() => onClick(name)}>{name}</li>
    )
})

const Suggest = memo(function Suggest(props) {
    const { searchKey, onSelect, sizeHeight } = props;

    const [result, setResult] = useState([]);

    useEffect( () => {
        fetch('/rest/search?key=' + encodeURIComponent(searchKey))
        // fetch('/rest/search/'+encodeURIComponent(searchKey))
            .then(res => res.json())
            .then(data => {

                const {result, key} = (data.data.filter(
                    Item => encodeURIComponent(searchKey) === Item.key
                )[0] || {});

                // console.log(data.data[0].key)
                if(key) {
                    result.map(() => {
                        return setResult(result)
                    })
                } else {
                    setResult([])
                }
            })
    }, [searchKey])

    const fallBackResult = useMemo(() => {
        if(!result.length) { // 若果为空
            // return [{display: searchKey}]
            return [];
        }

        return result;
    }, [result])

    return (
        <div className='search-list' style={{height: sizeHeight-84}}>
            <ul>
                {console.log(searchKey)}
            {
                fallBackResult.map( item => {
                    return <SuggestItem key={item.display} name={item.display} onClick={onSelect} />
                })
            }
            </ul>
        </div>
    )
})




const CitySelector = memo(function CitySelector(props) {
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData,
        onSelect, // 这里的 onSlect 没定义,要从父组件传过来.
        sizeHeight
    } = props;

    // 读取城市数据, 副作用 useEffect
    useEffect(() => {
        if (!show || cityData || isLoading) { return; } // 如果是!show 直接 return 不读取城市数据; 或者正在加载, 或已经有数据了, 也是 不读取,所以第二个参数要传入他们
        fetchCityData();  // 这个读取数据的方法, 从父组件里读取;
    }, [show, cityData, isLoading, fetchCityData]);

    const [searchKey, setSearchKey] = useState('');

    // const [city, setCityData] = useState();

    // 要使用 useMemo 优化这行;  当 key 的值不变的时候,也不用一直计算;
    const inputKey = useMemo(() => searchKey.trim(), [searchKey]);


    // 点击右边竖排字母后, 调整到左边字母 title位置; 下面的参数,可以任意改.
    const toAlpha = useCallback((title) => {
        document.querySelector(`[data-cate='${title}']`).scrollIntoView();
        console.log(title)
    }, [])

    // 以为需要判断一些条件才能决定输出城市列表; 所以定义一个函数;
    const getAllCityList = () => {

        // 判断是否在加载,如果在加载,返回 loading...
        if (isLoading) {
            return <div>loading...</div>
        }

        // 如果 cityData 存在, 才渲染 AllCityList
        if (cityData) {

            return (
                <div className='all-city-list' style={{ height: sizeHeight - 84 }}>
                    <HotCityList hotCities={cityData.hotCities} onSelect={onSelect} />
                    <AllCityList
                        cityList={cityData.cityList}
                        onSelect={onSelect} // 这里的 onSlect 没定义,要从父组件传过来.
                    />
                    <AllLetters cityListTitle={cityData.cityList} toAlpha={toAlpha} sizeHeight={sizeHeight} />
                </div>
            )
        }

        // 最后, 我们认为出了错误, 返回 error
        return <div>error</div>

    }

    // 数组里的 title;


    return (
        <div className={show ? 'city-selector' : 'city-selector hidden'} >
            <div className="city-select-box"><Header title='车站选择' onBack={onBack}  />

            <div className='searchbar'>
                <div className='search'>
                    <i className='search-icon'>
                        <SearchOutlined />
                    </i>
                    <input
                        type='text'
                        placeholder='城市中文 拼音 或者 首字母'
                        value={inputKey}
                        onChange={e => setSearchKey(e.target.value)}
                    />
                    <i
                        onClick={() => setSearchKey('')}
                        className={inputKey.length === 0 ? 'serch-clean hidden' : 'serch-clean'}>
                        <CloseCircleOutlined />
                    </i>
                </div>
            </div>
            </div>

            {/* 搜索列表 */}
            {
                Boolean(inputKey) && (
                    <Suggest
                        searchKey={inputKey}
                        onSelect = { inputKey => onSelect(inputKey)}
                        sizeHeight ={sizeHeight}
                    />
                )
            }

            {console.log(sizeHeight)}
            {/* {JSON.stringify(cityData) } */}
            {getAllCityList()}

        </div>

    )
})

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchCityData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CitySelector;
