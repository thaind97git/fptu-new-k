import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { Icon, Menu } from 'antd';
import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';
import { SET_OPEN_KEYS, SET_DEFAULT_KEYS } from '../store/MenuState';

const connectToRedux = connect(pick(['menus', 'openKeys', 'defaultKeys']), null);

/**
 * Find Parent menu in array menus by path
 * @param {String} path 
 * @param {Array} menuItem 
 */
function findMenuItemByPath(path, menuItem) {
    return menuItem.filter(item => item.subLink == path);
}
/**
 * Find Sub menu in array menus.subItem by path
 * @param {String} path 
 * @param {Arrray} subItemArray 
 */
function findSubItemByPath(path, subItemArray) {
    return subItemArray.filter(item => item.itemLink == path);
}

const getOpenKeys = (path, menus) => {
    let openKeysSelected;
    const subMenu = findMenuItemByPath(path, menus);
    if (subMenu !== undefined && subMenu.length !== 0) {
        openKeysSelected = subMenu[0].subKey
    } else {
        for (let item of menus) {
            const subItem = findSubItemByPath(path, item.subItem);
            if (subItem !== undefined && subItem.length !== 0) {
                openKeysSelected = item.subKey
            }
        }
    }
    return [openKeysSelected];
}

class MenuComponent extends Component {

    constructor(props) {
        super(props);
        const { path, menus } = this.props;
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
        const { menus, defaultKeys, path, setOpenKeys, setDefaultKeys } = this.props;
        console.log(this.state.openKeys)
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={defaultKeys}
                // defaultOpenKeys={['sub2']}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ height: '100%', borderRight: '1px solid #dcdcdc' }}
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

export default connectToRedux(MenuComponent);