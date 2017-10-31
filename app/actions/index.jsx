
export const userLogin = param => ({
    type: 'USER_LOGIN',
    ...param
})

export const forceLogout = token => ({
    type: 'FORCELOGOUT',
    token,
})
export const updateUserList = userList => ({
    type: "UPDATE_USERLIST",
    userList
})

export const selectedUser = token => ({
    type: "SELECTED_USER",
    token
})

export const filterList = text => ({
    type: "FILTER_LIST",
    text
})

export const toggleSlider = userObj => ({
    type: "TOGGLE_SLIDER",
    userObj
})

export const updateMultiFilter = ( obj ) => ({
    type: "UPDATE_MULTI_FILTER",
    result: obj
})

export const closeSlider = () => ({
    type: "CLOSE_SLIDER"
})

export const toggleFilterPopover = () => ({
    type: "TOGGLE_FILTER_POPOVER"
})

export const closeFilterPopover = () => ({
    type: "CLOSE_FILTER_POPOVER"
})


