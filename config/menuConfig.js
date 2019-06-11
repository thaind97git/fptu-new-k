export const menus = [
    {
        subKey: 'sub1',
        subIcon: 'appstore',
        subText: 'Dashboard',
        subLink: "/dashboard",
        subItem: []
    },
    {
        subKey: 'sub2',
        subIcon: 'user',
        subText: 'Student',
        subLink: undefined,
        subItem: [
            {
                itemKey: '1',
                itemLink: '/student',
                itemIcon: 'unordered-list',
                itemText: 'List student'
            }
        ]
    },
    {
        subKey: 'sub3',
        subIcon: 'team',
        subText: 'Account',
        subLink: undefined,
        subItem: [
            {
                itemKey: '2',
                itemLink: '/user',
                itemIcon: 'unordered-list',
                itemText: 'List acount'
            },
            {
                itemKey: '3',
                itemLink: '/admin',
                itemIcon: 'unordered-list',
                itemText: 'List admin'
            }
        ]
    },
    {
        subKey: 'sub4',
        subIcon: 'medium',
        subText: 'Major',
        subLink: undefined,
        subItem: [
            {
                itemKey: '4',
                itemLink: '/major',
                itemIcon: 'unordered-list',
                itemText: 'List major'
            }
        ]
    }
]
/**
 * Find Parent menu in array menus by path
 * @param {String} path 
 * @param {Array} menuItem 
 */
function findMenuItemByPath(path, menuItem) {
    return menuItem.find(item => item.subLink == path);
}
/**
 * Find Sub menu in array menus.subItem by path
 * @param {String} path 
 * @param {Arrray} subItemArray 
 */
function findSubItemByPath(path, subItemArray) {
    return subItemArray.find(item => item.itemLink == path);
}

export const getOpenKeys = (path, menus) => {
    let openKeysSelected;
    const subMenu = findMenuItemByPath(path, menus);
    if (subMenu !== undefined) {
        openKeysSelected = subMenu.subKey
    } else {
        for (let item of menus) {
            const subItem = findSubItemByPath(path, item.subItem);
            if (subItem !== undefined) {
                openKeysSelected = item.subKey
            }
        }
    }
    return [openKeysSelected];
}

export const getDefaultKeys = (path, menus) => {
    let openDefaultKeys;

    const subMenu = findMenuItemByPath(path, menus);
    if (subMenu !== undefined) {
        openDefaultKeys = subMenu.subKey
    }
    if (subMenu === undefined) {
        for (let item of menus) {
            const subItem = findSubItemByPath(path, item.subItem);
            if (subItem !== undefined) {
                openDefaultKeys = subItem.itemKey
            }
        }
    }
    return [openDefaultKeys]
}