import { connect } from 'react-redux'
import { refreshUsers, updateUsers, addOneUser, delOneUser, openUserModal } from "../../actions"
import usersList from '../../components/users/usersList'


const mapStateToProps = (state) => ({
    userList: state.userList
});

const mapDispatchToProps = {
    refreshUsers,
    updateUsers,
    addOneUser,
    delOneUser,
    openUserModal
}

const UserListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(usersList);

export default UserListContainer