import { connect } from 'react-redux'
import { forceLogout, filterList, updateUserList, selectedUser, toggleSlider, closeSlider } from '../../actions/index'
import UserList from '../../components/userList/index'

const mapStateToProps = (state) => {
    return {
        userList: state.userList,
        filterKey: state.filterKey,
        sliderBar: state.sliderBar,
        multiFilterKey: state.multiFilterKey,
    };
}

const mapDispatchToProps = {
    forceLogout: forceLogout,
    filterList: filterList,
    updateUserList: updateUserList,
    selectedUser: selectedUser,
    toggleSlider: toggleSlider,
    closeSlider: closeSlider
}


const UserListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)

export default UserListContainer