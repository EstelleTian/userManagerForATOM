import { connect } from 'react-redux'
import { forceLogout, filterList, updateUserList, updateMultiFilter, toggleFilterPopover, closeFilterPopover} from '../actions'
import FilterContent from '../components/FilterContent'

const mapStateToProps = (state) => {
    return {
        userList: state.userList,
        filterList: state.filterList,
        multiFilterKey: state.multiFilterKey,
        filterPopover: state.filterPopover,
    };
}

const mapDispatchToProps = {
    forceLogout: forceLogout,
    filterList: filterList,
    updateUserList: updateUserList,
    updateMultiFilter: updateMultiFilter,
    toggleFilterPopover: toggleFilterPopover,
    closeFilterPopover: closeFilterPopover,
}

const FilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterContent)

export default FilterContainer