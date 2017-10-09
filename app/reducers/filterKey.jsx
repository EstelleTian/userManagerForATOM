export const filterKey = ( state = "all", action) =>{
    switch (action.type){
        case "FILTER_LIST":
            return action.text || 'all';
        default :
            return state;
    }
}

export const filterPopover = (state = false, action) => {
    switch (action.type){
        case "TOGGLE_FILTER_POPOVER":
            return !state;
        case "CLOSE_FILTER_POPOVER" :
            return false;
        default :
            return state;
    }
}

const init = {
    username: "",
    clientVersion: "",
    ipAddress: "",
    startTime: "",
    endTime: ""
}
export const multiFilterKey = (state = init, action) => {
    switch (action.type){
        case "UPDATE_MULTI_FILTER" : {
            const res = {
                ...state,
                ...action.result
            };
            return res
        }
        default : return state
    }
}
