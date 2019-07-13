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
                itemKey: 'sub2.1',
                itemLink: '/student',
                itemIcon: 'unordered-list',
                itemText: 'List student'
            },
            {
                itemKey: 'sub2.2',
                itemLink: '/student/create',
                itemIcon: 'plus-square',
                itemText: 'Create new student'
            }
        ]
    },
    {
        subKey: 'sub3',
        subIcon: 'team',
        subText: 'User',
        subLink: undefined,
        subItem: [
            {
                itemKey: 'sub3.1',
                itemLink: '/user',
                itemIcon: 'unordered-list',
                itemText: 'List user'
            },
            {
                itemKey: 'sub3.2',
                itemLink: '/user/create',
                itemIcon: 'plus-square',
                itemText: 'Create new user'
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
                itemKey: 'sub4.1',
                itemLink: '/major',
                itemIcon: 'unordered-list',
                itemText: 'List major'
            },
            {
                itemKey: 'sub4.2',
                itemLink: '/major/create',
                itemIcon: 'plus-square',
                itemText: 'Create new major'
            }
        ]
    },
    {
        subKey: 'sub5',
        subIcon: 'form',
        subText: 'Register method',
        subLink: undefined,
        subItem: [
            {
                itemKey: 'sub5.1',
                itemLink: '/method-register',
                itemIcon: 'unordered-list',
                itemText: 'List register method'
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

export const rootSubmenuKeys = menus.map(item => {
    return item.subKey
})