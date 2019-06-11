import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';
import { getOpenKeys, getDefaultKeys, menus } from '../config/menuConfig';

class MenuComponent extends Component {

    constructor(props) {
        super(props);
        const { path } = this.props;
        this.state = {
            openKeys: getOpenKeys(path, menus)
        };
    }

    rootSubmenuKeys = ['sub1', 'sub3', 'sub2', 'sub4'];


    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    render() {
        const { path } = this.props;
        const { openKeys } = this.state;
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={getDefaultKeys(path, menus)}
                // defaultOpenKeys={['sub2']}
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                style={{ height: '100%', borderRight: '1px solid #dcdcdc', overflowY: 'auto'}}
                className="menus"
            >
                {
                    menus.map((item) => {
                        const { subItem, subIcon, subKey, subLink, subText } = item;
                        return (
                            (subItem.length === 0 || subItem === undefined)
                                ? (
                                    <Menu.Item key={subKey}>
                                        <Link href={subLink}>
                                            <a><Icon type={subIcon} /> {subText}</a>
                                        </Link>
                                    </Menu.Item>
                                )
                                : (
                                    <SubMenu key={subKey} title={<span><Icon type={subIcon} /> {subText} </span>} >
                                        {
                                            item.subItem.map((item) => {
                                                const { itemKey, itemLink, itemIcon, itemText } = item;
                                                return (
                                                    <Menu.Item key={itemKey}>
                                                        <Link href={itemLink}>
                                                            <a><Icon type={itemIcon} /> {itemText}</a>
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                        )
                    })
                }
            </Menu>
        )
    }
}

export default MenuComponent;