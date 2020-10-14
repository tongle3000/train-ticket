import './css/Passengers.css';

import React, { memo, useMemo } from 'react';


const Passenger = memo(function Passenger(props) {
    const {
        id,
        name,
        // followAdult, // 同行成人
        ticketType,
        licenceNo,   // 身份证
        gender,  // 性别
        birthday,
        onRemove, // 删除
        onUpdate, // 跟新
        showGenderMenu, // 性别选择;
        showFollowAdultMenu, // 同行人选择
        showTicketTypeMenu,
        followAdultName
    } = props;

    const isAdult = ticketType === 'adult';

    return (
        <li className={ !isAdult ? 'passenger border-bottom' : 'passenger'}>
            <i className='delete' onClick={() => onRemove(id)}>-</i>
            {/* {props.id} */}
            <ol className='items'>
                <li className='item'>
                    <label className='label name'>姓名</label>
                    <input 
                        type='text' 
                        className='input name'
                        placeholder='乘客姓名'
                        value={name}
                        onChange={(e) => onUpdate(id, {
                            name: e.target.value
                        })}
                    />
                    <label className='ticket-type' onClick={()=> showTicketTypeMenu(id)}>{ isAdult ? '成人票' : '儿童票' }</label>
                </li>

                {/* 身份证   const isAdult = ticketType === 'adult';  */}
                { isAdult &&
                    <li className='item'>
                        <label className='label licenceNo'>身份证</label>
                        <input 
                            type='text' 
                            className='input licenceNo'
                            placeholder='证件号码'
                            value={licenceNo}
                            onChange={(e) => onUpdate(id, {
                                licenceNo: e.target.value
                            })}
                        />
                    </li>
                }

                {/* 性别 只针对儿童 */}
                { !isAdult &&
                    <li className='item arrow'>
                        <label className='label gender'>性别</label>
                        <input 
                            type='text' 
                            className='input gender'
                            placeholder='请选择'

                            // 弹出选项框;
                            onClick={() => showGenderMenu(id)} // 性别选择;
                            
                            value={
                                gender === 'male'
                                ? '男'
                                : gender === 'female'
                                    ? '女'
                                    : ''
                            }
                            readOnly
                        />
                    </li>
                }

                {/* 生日  儿童   */}
                { !isAdult &&
                    <li className='item'>
                        <label className='label birthday'>出生日期</label>
                        <input 
                            type='text' 
                            className='input  birthday'
                            placeholder='如 19951015'
                            value={ birthday}
                            onChange={(e) => onUpdate(id, {
                                 birthday: e.target.value
                            })}
                        />
                    </li>
                }

                {/* 同行成人 只针对儿童 */}
                { !isAdult &&
                    <li className='item arrow'>
                        <label className='label followAdult'>同行成人</label>
                        <input 
                            type='text' 
                            className='input followAdult'
                            placeholder='请选择'
                            value={followAdultName} 
                            onClick={() => showFollowAdultMenu(id)}
                            readOnly
                        />
                    </li>
                }


            </ol>
        </li>  
    )
})

// import PropTypes from 'prop-types';
function Passengers(props) {

    const { 
        passengers, // 里面包括了 id name  followAdult ticketType licenceNo gender birthday
        createAdult,
        createChild, 
        removePassenger,
        updatePassenger,
        showGenderMenu, // 性别选择;
        showFollowAdultMenu, // 同行人选择
        showTicketTypeMenu, // 切换 票种
    } = props;

    // 同行成人 显示名字, 弄个 id 到 name 的映射;
    const nameMap = useMemo(() => {
        const ret = {};

        for(const passenger of passengers) {
            ret[passenger.id] = passenger.name;   // key 是 id,  value:name
        }

        return ret;
    }, [passengers]);


    return (
        <div className='passengers'>
                <ul>
                    {
                        passengers.map(passenger => {
                            return (
                                <Passenger 
                                    {...passenger} 
                                    followAdultName={nameMap[passenger.followAdult]}
                                    showGenderMenu={showGenderMenu}
                                    key={passenger.id} 
                                    onRemove={removePassenger} 
                                    onUpdate={updatePassenger}
                                    showFollowAdultMenu={showFollowAdultMenu}
                                    showTicketTypeMenu={showTicketTypeMenu}
                                />
                            )
                        })
                    }
                </ul>
                <section className='add'>
                    <div className='adult' onClick={() => createAdult()}>添加成人</div>
                    <div className='child' onClick={ () => createChild()}>添加儿童</div>
                </section>
        </div>
    );
}

// Passengers.propTypes = {
//     passengers: PropTypes.array.isRequired,
// };

export default Passengers;
