import './css/Ticket.css';

import PropTypes from 'prop-types';
import React from 'react';


function Ticket(props) {

    const {type, price} = props;

    
    return (
        <div className='ticket'>
            <p>
                <span className='ticket-type'>{type}</span>
                <span className='ticket-price'>{price}</span>
            </p>
            <div className='label'>坐席</div>
        </div>
    );
}

Ticket.propTypes = {
    price: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    seatType: PropTypes.string,
};

export default Ticket;
