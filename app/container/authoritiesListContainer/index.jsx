import { connect } from 'react-redux'
import { refreshAuths, updateAuths, delOneAuth, openAuthModal, updateAuthSearch } from "../../actions"
import authoritiesList from '../../components/authorities/authoritiesList'

const mapStateToProps = (state) =>{
    const searchVal = state.authSearchValue.toLowerCase() || "";
    //若搜索值是空，不变
    if("" == searchVal){
        return {
            authoritiesList: state.authoritiesList
        }
    }else{
        //过滤数据
        const listData = state.authoritiesList.data || [];
        let newDataArr = [];
        listData.map( item => {
            let flag = false;
            //遍历每个值的具体值
            for(let key in item){
                //中
                const lowerCaseVal = (item[key]+"").toLowerCase();
                if( lowerCaseVal.indexOf(searchVal) > -1){
                    flag = true;
                    break;
                }
            }
            if(flag){
                newDataArr.push(item);
            }
        });
        return {
            authoritiesList: {
                ...state.authoritiesList,
                data: newDataArr
            }
        }
    }
};

const mapDispatchToProps = {
    refreshAuths,
    updateAuths,
    delOneAuth,
    openAuthModal,
    updateAuthSearch
}

const AuthoritiesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(authoritiesList);

export default AuthoritiesListContainer