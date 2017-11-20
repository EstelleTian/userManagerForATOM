//登录--记录登录名、密码、登录状态、提示错误
const intiLoginState = {
    username: "",
    password: "",
    loginStatus: false,
    errmsg: ""
};
export const login = ( state = intiLoginState, action ) => {
    switch( action.type ){
        case "USER_LOGIN" :
            if( action.loginStatus ){
                return {
                    username: action.username || "",
                    password: action.password || "",
                    loginStatus: action.loginStatus || false,
                    errmsg: action.errmsg || ""
                }
            }else{
                return {
                    ...intiLoginState,
                    errmsg: action.errmsg
                }
            }
        default:
            return state
    }

}