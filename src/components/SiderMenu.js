import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem = item => ( // item.route 菜单单独跳转的路由
    <Menu.Item
        key={item.key}
    >
        <Link to={(item.route || item.key) + (item.query || '')}>   
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => ( 
    <Menu.SubMenu
        key={item.key}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text">{item.title}</span>
            </span>
        }
    >
        {item.subs.map(item => renderMenuItem(item))}
    </Menu.SubMenu>
);

export default ({ user, menus, ...props }) => (
    <Menu {...props}>
        {menus && menus.map(item => {
            if(!item.role || user.role === `ROLE_${item.role}`){
                return item.subs ? renderSubMenu(item) : renderMenuItem(item)
            }
            return null;
        })}
    </Menu>
);