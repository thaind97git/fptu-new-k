export const SET_OPEN_KEYS = "SET_OPEN_KEYS";
export const SET_DEFAULT_KEYS = "SET_DEFAULT_KEYS";

const menus = [
    {
        subKey: 'sub1',
        subIcon: 'user',
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
        subIcon: 'team',
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

const firstSubItem = menus[0].subItem;
const firstSubKey = menus[0].subKey;

const openKeys = [firstSubKey];
const defaultKeys = (firstSubItem.length === 0 || firstSubItem === undefined)
    ? [firstSubKey] : [firstSubItem[0].itemKey]

export default {
    menus: (state = menus, { type, payload }) => {
        return state;
    },
    defaultKeys: (state = defaultKeys, { type, payload }) => {
        return state;
    }
}

