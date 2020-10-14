/**
 * detail 车次详情 哪到哪, 时间 地点 运行时间;
 */
import './css/Detail.css';
import 'dayjs/locale/zh-cn';

import React, { memo } from 'react';

// import PropTypes from 'prop-types';
// import dayjs from 'dayjs';


// function format(day) {
//     const date = dayjs(day);

//     return date.format('MM-DD') + '' + date.locale('zh-cn').format('ddd'); // ddd 周一周二...
// }

const Detail = memo(function Detail(props) {

    const {
        departStation,
        arriveStation,
        // departDate,
        // arriveDate,
        trainNumber,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        // toggleIsScheduleVisible
    } = props;

    // const departDateStr = useMemo(() => format(departDate), [departDate]);// const departDateStr = format(departDate);
    // const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);

    return (
        <div className='details'>
            <div className='left'>
                <h3>{departStation} </h3>
                <p>{departTimeStr} </p>
                {/* <p>{departDateStr} </p> */}
            </div>
            <div className='middle'>
                <h3>{trainNumber}</h3>
                <p>
                    {/* -- <span className='skb' onClick={() => toggleIsScheduleVisible()}>时刻表</span> -- */}
                    { props.children }
                </p>
                <p className='haoshi'>耗时{ durationStr}</p>
            </div>
            <div className='right'>
                <h3>{arriveStation} </h3>
                <p>{arriveTimeStr} </p>
                {/* <p>{arriveDateStr}</p> */}
            </div>
            
        </div>
    )
})

// Detail.propTypes = {
//     departStation: PropTypes.string,
//     arriveStation: PropTypes.string,
//     departDate: PropTypes.number.isRequired,
//     arriveDate: PropTypes.number,
//     trainNumber: PropTypes.string,
//     departTimeStr: PropTypes.string,
//     arriveTimeStr: PropTypes.string,
//     durationStr: PropTypes.string,
// }

export default Detail;

