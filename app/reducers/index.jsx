import { combineReducers } from 'redux';
import { login } from './loginReducer';
import { onlineUserList, sliderBar, filterKey, multiFilterKey } from './onlineUserListReducer';
import { roleList, roleModal } from './roleListReducer';
import { authoritiesList, authoritiesModal } from './authoritiesListReducer';
import { groupList, groupModal } from './groupListReducer';
import { userList, userModal } from './userListReducer';

const reducer = combineReducers({
    login,
    onlineUserList, filterKey, sliderBar, multiFilterKey,
    roleList, roleModal,
    authoritiesList, authoritiesModal,
    groupList, groupModal,
    userList, userModal
});

export default reducer;
