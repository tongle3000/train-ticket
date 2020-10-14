import './css/Menu.css';

import PropTypes from 'prop-types';
import React, { memo } from 'react';


const MenuItem = memo(function MenuItem(props) {
    const {
        onPress, // 选择事件;
        title, // 选项的集合 的 标题;
        value, // 唯一代表这个选项的值;
        active, // 选中;
    } = props;

    return (
        <li className={ active ? 'active' : '' } onClick={()=>{onPress(value)}}>
            {title}
        </li>
    )
    
});

MenuItem.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
}


const Menu = memo(function Menu(props) {
    const {
        show,
        options, // 选项;
        onPress, // 选中某一项的回调;
        hideMenu, // 关闭弹窗,

    } = props;

    return (
        <div>
            {show && <div className='menu-mask' onClick={() => hideMenu()}></div>}
            <div className={show ? 'menu show' : 'menu'}>
                <div className='menu-title'></div>
                <ul>
                    {
                        options && 
                        options.map( option => {
                            return (
                                <MenuItem key={option.value} {...option} onPress={onPress} />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
})

Menu.propTypes = {
    show: PropTypes.bool.isRequired,
    options: PropTypes.array,
    onPress: PropTypes.func,
    hideMenu: PropTypes.func.isRequired,
};

export default Menu;
