
export const userList = ( state = [], action) => {
    switch (action.type){
        case "FORCELOGOUT" :{
            let list = [];
            for(let index in state){
                let userObj = state[index];
                if( action.token.indexOf(userObj.token) == -1){
                    list.push(userObj);
                }
            }
            return list;
        }
        case "UPDATE_USERLIST" : {
            let userList = action.userList;
                for(let index in userList){
                    let userObj = userList[index];
                    userObj['online'] = true;
                    userObj['isActived'] = false;
                }
            return userList;
        }
        case "SELECTED_USER" : {
            let list = [];
            for(let index in state){
                let userObj = state[index];
                if(userObj.token == action.token){
                    userObj.isActived = !userObj.isActived;
                }
                list.push(userObj);
            }
            return list;
        }
        case "RESET_STATUS" : {
            let newUserList = [];
            state.map( user => {
                user['online'] = true;
                user['isActived'] = false;
                newUserList.push(user);
            })
            return newUserList;
        }
        default:
            return state
    }
}

const initInfo = {
    visible: false,
    userObj: {
        token: ""
    }
};
export const sliderBar = (state = initInfo, action) => {
    switch (action.type){
        case "TOGGLE_SLIDER" : {
            if(!state.visible){
                return {
                    visible: true,
                    userObj : action.userObj
                }
            }else{
                if(action.userObj.token == state.userObj.token){
                    return {
                        visible: false,
                        userObj: state.userObj
                    }
                }else{
                    return {
                        visible: true,
                        userObj : action.userObj
                    }
                }
            }
        }
        case "CLOSE_SLIDER" : {
            return {
                visible: false,
                userObj: state.userObj
            }
        }
        default : return state
    }
}