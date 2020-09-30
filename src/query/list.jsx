import './css/list.css';

import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import URI from 'urijs';

const ListItem = memo(function ListItem(props) {
    const {
        dTime, // 出发时间
        aTime, // 到达时间
        dCity, // 出发城市
        aCity, // 到大城市
        trainNumber, // 车次
        date, // 日期
        time, //站到站的时间;
        priceMsg, // 价格
        dayAfter, // 是否跨越日期的标记; +1标志
        trainShowDesc,
        trainStatusDes
    } = props;

    // 每个 li 点击跳转到下一个页面; 我们使用 URI 把需要的参数 传给 下个页面 ticket App.jsx;
    // li 里的 a 链接 直接赋值 这个 url  href={url}
    const url = useMemo(() => {
        return new URI('ticket.html')
            .setSearch('dCity', dCity)
            .setSearch('aCity', aCity)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', date)
            .toString();
    }, [
        dCity, // 出发城市
        aCity, // 到大城市
        trainNumber, // 车次
        date, // 日期
    ]);

    return (
        <li key={trainNumber}>
            <a href={url}>
                <div className='time'>
                    <span>{dTime}</span>
                    <span className='small'>{aTime} <i className='time-after'>{dayAfter}</i></span>
                </div>
                <div className='city'>
                    <span><i className='shi-zhong'>始</i>{dCity}</span>
                    <span className='small'><i className='shi-zhong'>终</i>{aCity}</span>
                </div>
                <div className='train-number'>
                    <span>{trainNumber}</span>
                    <span className='small'>{time}</span>
                </div>
                <div className='price'>
                    <span>{priceMsg}</span>
                    <span className='small'>
                        {trainShowDesc ? trainShowDesc : trainStatusDes}
                        {/* {trainShowDesc} */}
                    </span>
                </div>
            </a>
        </li>
    )
})


const List = memo(function List(props) {
    const { trainList, orderType } = props;
    const { sizeHeight } = props;

    return (
        <div className='train-list' style={{ height: sizeHeight - 140, top: '84px' }}>
            <ul>
                {
                    trainList.map(item => {
                        return (
                            <ListItem {...item} key={item.trainNumber} />
                            // 分到一个子组件写,可能是为了列举那些 参数. 好方便传给下个子页面;

                            // <li key={list.trainNumber}>
                            //     <div className='time'>
                            //         <span>{list.dTime}</span>
                            //         <span className='small'>{list.aTime}</span>
                            //     </div>
                            //     <div className='city'>
                            //         <span><i className='shi-zhong'>始</i>{list.dCity}</span>
                            //         <span className='small'><i className='shi-zhong'>终</i>{list.aCity}</span>
                            //     </div>
                            //     <div className='train-number'>
                            //         <span>{list.trainNumber}</span>
                            //         <span className='small'>{list.time}</span>
                            //     </div>
                            //     <div className='price'>
                            //         <span>{list.priceMsg}</span>
                            //         <span className='small'>
                            //             {list.trainShowDesc ? list.trainShowDesc : list.trainStatusDes}
                            //             {/* {list.trainShowDesc} */}
                            //         </span>
                            //     </div>

                            // </li>
                        )
                    })
                }
            </ul>
        </div>
    )
});

List.propTypes = {
    trainList: PropTypes.array.isRequired,
}

export default List;
