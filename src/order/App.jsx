import './css/App.css';

import { createFromIconfontCN } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';

import Detail from '../common/Detail';
import Header from '../common/Header';
import { h0 } from '../common/unitls';
import useOnback from '../common/useOnback';
import useSize from '../common/useSize';
import Account from './Account';
import {
    createAdult,
    createChild,
    fetchInitial,
    hideMenu,
    removePassenger,
    setArriveStation,
    setDepartDate,
    setDepartStation,
    setSearchParsed,
    setSeatType,
    setTrainNumber,
    showFollowAdultMenu,
    showGenderMenu,
    showTicketTypeMenu,
    updatePassenger,
} from './actions';
import Choose from './Choose';
import Menu from './Menu';
import Passengers from './Passengers';
import Ticket from './Ticket';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2103473_3rbl10gg7b4.js',
});


function App(props) {
    const {
        trainNumber,
        departStation,
        arriveStation,
        seatType,
        departDate,

        arriveDate,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        price,
        passengers,
        menu,
        isMenuVisible,
        searchParsed,

        dispatch,
    } = props;

    const { sizeHeight } = useSize();
    const { onBack } = useOnback();


    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const {
            trainNumber,
            dStation,
            aStation,
            type,
            date,
        } = queries;

        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(h0( dayjs(date).valueOf() )));
        dispatch(setSearchParsed(true));

    }, [dispatch]);

    useEffect(() => {
        if(!searchParsed) {
            return;
        }

        const url = new URI('/rest/order')
            .setSearch('dStattion', departStation)
            .setSearch('aStattion', arriveStation)
            .setSearch('type', seatType)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
        
        dispatch(fetchInitial(url));
    }, [
        searchParsed,
        departStation,
        arriveStation,
        seatType,
        departDate,
        dispatch
    ]);

    const passengersCbs = useMemo(() => {
        return bindActionCreators({
            createAdult,
            createChild,
            removePassenger,
            updatePassenger,
            showGenderMenu,
            showFollowAdultMenu, // 同行人选择
            showTicketTypeMenu, // 切换 票种
        }, dispatch)
    }, [dispatch]);


    const menuCbs = useMemo(() => {
        return bindActionCreators({
            hideMenu,
            
        }, dispatch)
    }, [dispatch]);

    const chooseCbs = useMemo(() => {
        return bindActionCreators({
            updatePassenger,
        }, dispatch)
    }, [dispatch]);


    if(!searchParsed) {
        return null;
    }

    return (
        <div>
            <Header title="订单填写" onBack={onBack} />
            <div style={{height:sizeHeight-92,position:"relative",top:42, overflowY:'scroll',background:'#f0f0f0'}}>
                <Detail 
                    departStation={departStation} 
                    arriveStation={arriveStation}
                    departDate={departDate}
                    arriveDate={arriveDate}
                    trainNumber={trainNumber}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    durationStr={durationStr}
                    // { ...detailCbs }
                >
                    <IconFont type="icon-huoche" style={{fontSize:'40px', color:'#1ba9ba',marginTop:'-20px',}} />
                </Detail>
                <Ticket type={seatType} price={price} />
                <Passengers passengers={passengers} { ...passengersCbs } />
                { passengers.length > 0 && 
                    <Choose 
                        passengers={passengers}
                        { ...chooseCbs }
                    />
                }

                <Account length={passengers.length} price={price} />

                <Menu 
                    show={isMenuVisible}
                    {
                        ...menu
                    }
                    {
                        ...menuCbs
                    }
                />

                
                
                
                
            </div>
            
        </div>
    )

}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);