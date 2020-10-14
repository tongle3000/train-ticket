/**
 * Candidate 座次 出票渠道
 * memo 优化
 * 
 */
import '../common/css/common.css';
import './css/Candidate.css';

import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import URI from 'urijs';

import { TrainContext } from './context';



const Channel = memo(function Channel(props) {
    const  {name, desc, type} = props;

    const { trainNumber, departStation, arriveStation, departDate } = useContext(TrainContext);

    const src = useMemo(() => {
        // 除了 type 其他几个参数,都暂时没有;
        // 其他 4 个要通过 context 传过来, 新建 context.js 文件
        return new URI('order.html')
            .setSearch('trainNumber', trainNumber)
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', type)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
    }, [type,trainNumber,departStation,arriveStation,departDate])

    return (
        <div className='channel'>
            <h3>{name}</h3>
            <div>{desc}</div>
            <div><a href={src} className='buy'>买票</a></div>
        </div>
    )
})

const Seat = memo(function Seat(props) {
    const { type, price, ticketId, channels, open, onToggle, idx} = props;

    return (
        <li key={type}>
            <div className='bar' onClick={()=> onToggle(idx)}>
                <span>{type}</span>
                <span className='price'>{price}</span>
                <span>{ parseInt(ticketId) < 10 ? ticketId : '有票' }</span>
                <button onClick={()=> onToggle(idx)}>{open ? '收起' : '预定'}</button>
            </div>
            <div className={ open ? 'channels' : 'channels hidden'} >
                {
                    channels.map( channel => {
                        return <Channel key={channel.name} {...channel} type={type} />
                    })
                }
            </div>
        </li>
    )
})


const Candidate = memo(function Candidate(props) {

    const { tickets } = props;



    const [openIndex, setOpenIndex] = useState(-1);

    const onToggle = useCallback(idx => {
        setOpenIndex(idx === openIndex ? -1 : idx );
    }, [openIndex])


    
    return (
        <div className='candidate'>
            <ul>
                {
                    tickets.map((ticket, idx) => {
                        return (
                            <Seat idx={idx} onToggle={onToggle} open={ openIndex === idx } {...ticket} key={ticket.type} />
                            // <li key={item.type}>
                            //     <span>{item.type}</span>
                            //     <span className='price'>{item.price}</span>
                            //     <span>{item.ticketId}
                            //     <button>收起</button></span>
                            // </li>
                        )
                    })
                }
            </ul>
        </div>
    )
});

Candidate.propTypes = {
    tickets: PropTypes.array.isRequired,
}

export default Candidate;

