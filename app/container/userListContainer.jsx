import { connect } from 'react-redux'
import { forceLogout, filterList, updateUserList, selectedUser, toggleSlider, closeSlider } from '../actions'
import UserList from '../components/userList'

const mapStateToProps = (state) => {

    return state;
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