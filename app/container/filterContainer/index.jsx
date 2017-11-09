import { connect } from 'react-redux'
import { forceLogout, filterList, updateOnlineUserList, updateMultiFilter} from '../../actions/index'
import FilterContent from '../../components/onlineUsers/filterContent/index'

const mapStateToProps = (state) => ({
    userList: state.onlineUserList,
    filterList: state.filterList,
    multiFilterKey: state.multiFilterKey,
    filterPopover: state.filterPopover,
})

const mapDispatchToProps = {
    forceLogout: forceLogout,
    filterList: filterList,
    updateOnlineUserList: updateOnlineUserList,
    updateMultiFilter: updateMultiFilter,
}

const FilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterContent)

export default FilterContainer