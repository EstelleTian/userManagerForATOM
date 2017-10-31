//测试地址
// const host = "http://192.168.217.233:18380/uuma-server"
const host = "http://192.168.243.238:8080/uuma-server"
//新疆生产地址
// const host = "http://10.27.10.16:18080/uuma-server"
//西南生产地址
// const host = "http://175.17.200.52:18080/uuma-server"
export const loginUrl = `${host}/uuma/login`
export const logoutUrl = `${host}/uuma/logout`
export const getUserListUrl = `${host}/online/list`
export const sendLogoutUrl = `${host}/online/del`
export const getUserByTokenUrl = `${host}/online/user-bytoken`
export const sendMultiFiltersUrl = `${host}/online/filtered-list`



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