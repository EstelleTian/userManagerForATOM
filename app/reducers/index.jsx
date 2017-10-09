import { combineReducers } from 'redux';
import { userList, sliderBar } from './userList';
import { filterKey, multiFilterKey, filterPopover } from './filterKey';

const reducer = combineReducers({
    userList,
    filterKey,
    sliderBar,
    multiFilterKey,
    filterPopover
});

export default reducer;
