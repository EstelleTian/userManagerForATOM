import { combineReducers } from 'redux';
import { login } from './loginReducer';
import { onlineUserList, sliderBar, filterKey, multiFilterKey } from './onlineUserListReducer';
import { roleList, roleModal, authCbArr, roleSearchValue } from './roleListReducer';
import { authoritiesList, authoritiesModal, authSearchValue } from './authoritiesListReducer';
import { groupList, groupModal, groupSearchValue } from './groupListReducer';
import { userList, userModal, roleCbArr, groupCbArr, userSearchValue } from './userListReducer';
import { sliderMenu } from './sliderMenuReducer';

const reducer = combineReducers({
    login,
    onlineUserList, filterKey, sliderBar, multiFilterKey,
    roleList, roleModal, authCbArr, roleSearchValue,
    authoritiesList, authoritiesModal, authSearchValue,
    groupList, groupModal, groupSearchValue,
    userList, userModal, roleCbArr, groupCbArr, userSearchValue,
    sliderMenu
});

export default reducer;
