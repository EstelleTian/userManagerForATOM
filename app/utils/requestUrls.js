//测试地址
// const host = "http://192.168.217.233:18380/uuma-server"
const host = "http://192.168.243.69:8080/uuma-server"
//新疆生产地址
// const host = "http://10.27.10.16:18080/uuma-server"
//西南生产地址
// const host = "http://175.17.200.52:18080/uuma-server"
//登录
export const loginUrl = `${host}/uuma/login`
//登出
export const logoutUrl = `${host}/uuma/logout`
//在线用户 获取在线用户列表
export const getOnlineUserListUrl = `${host}/online/list`
//在线用户 删除
export const sendLogoutUrl = `${host}/online/del`
//在线用户 根据token获取在线用户详情
export const getOnlineUserByTokenUrl = `${host}/online/user-bytoken`
//在线用户 多条件查询
export const sendMultiFiltersUrl = `${host}/online/filtered-list`
//查询所有角色
export const getRolesListUrl = `${host}/roles/list`
//查询所有权限
export const getAuthoritiesListUrl = `${host}/authorities/list`
//查询所有组
export const getGroupsListUrl = `${host}/groups/list`
//查询所有用户
export const getUsersListUrl = `${host}/users/list`



export const parseHalfFullTime = ( str ) => {
    let newStr = "";
    if(str.length == 14 && str*1 > 0 ){
        let month = str.substring(4, 6);
        let day = str.substring(6, 8);
        let hour = str.substring(8, 10);
        let mins = str.substring(10, 12);
        newStr = month + "-" + day + " " + hour + ":" + mins;
    }else if(str.indexOf("-")>-1 && str.indexOf(":")>-1){
        newStr = str;
    }
    return newStr;
}

export const parseFullTime = ( str ) => {
    let newStr = "";
    if(str.length == 14 && str*1 > 0 ){
        let year = str.substring(0, 4);
        let month = str.substring(4, 6);
        let day = str.substring(6, 8);
        let hour = str.substring(8, 10);
        let mins = str.substring(10, 12);
        let secs = str.substring(12, 14);
        newStr = year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + secs;
    }else if(str.indexOf("-")>-1 && str.indexOf(":")>-1){
        newStr = str;
    }
    return newStr;
}