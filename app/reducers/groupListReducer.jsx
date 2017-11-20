//组列表相关reducers
//组列表---组数据 Map结构
const initList = {
    loading: true,
    data: []
}
export const groupList = (state = initList, action) => {
    switch (action.type){
        case "REFRESH_GROUPS" : {
            const data = action.data;
            if(undefined == data){
                return state;
            }else if( data.constructor == Array ){
                return {
                    loading: action.loading,
                    data: data
                }
            }
            return state;
        }
        case "UPDATE_GROUPS" : {
            let sData = state.data;
            let newDatas = action.dataObj || {};
            //数据id
            const newId = newDatas.id || "";
            if( "" != newId ){
                let isUpdata = false;
                //遍历组，补充key和操作列
                for(let index in sData){
                    if(sData[index].id == newId){
                        isUpdata = true;
                        //做修改，替换数据
                        sData.splice(index, 1, newDatas);
                        break;
                    }
                }
                //添加
                if(!isUpdata){
                    sData.unshift(newDatas);
                }
            }
            return {
                loading: false,
                data: sData
            }
        }
        case "DELETE_ONE_GROUP" : {
            let data = state.data || [];
            const delId = action.id || "";
            for(let n in data){
                if(data[n].id == delId){
                    //删除该id
                    data.splice(n,1);
                }
            }
            return  {
                loading: false,
                data: data
            }
        }
        default:
            return state;
    }
}

//组添加、修改模块
let initModalData = {
    visible: false,
    isAdd: true,
    data: {}
}
export const groupModal = (state = initModalData, action) => {
    switch (action.type){
        case "OPEN_GROUP_MODAL" : {
            const data = action.data || {};
            //若data是空对象---添加模块
            if( JSON.stringify(data) == "{}" ){
                return {
                    visible: true,
                    isAdd: true,
                    data: {}
                }
            }else{//修改模块
                return {
                    isAdd: false,
                    visible : true,
                    data: action.data
                }
            }
        }
        case "CLOSE_GROUP_MODAL" : {
            return {
                ...state,
                visible : false
            }
        }
        default :
            return state;
    }
}

//组--自定义搜索--记录搜索值
export const groupSearchValue = (state = "", action) => {
    switch (action.type){
        case "UPDATE_SEARCH_VALUE": {
            return action.value;
        }
        default: return state;
    }
}