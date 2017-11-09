import { connect } from 'react-redux'
import { forceLogout, filterList, updateOnlineUserList, selectedUser, toggleSlider, closeSlider } from '../../actions/index'
import onlineUserList from '../../components/onlineUsers/onlineUserList/index'

const mapStateToProps = (state) => ({
    userList: state.onlineUserList,
    filterKey: state.filterKey,
    sliderBar: state.sliderBar,
    multiFilterKey: state.multiFilterKey,
})

const mapDispatchToProps = {
    forceLogout: forceLogout,
    filterList: filterList,
    updateOnlineUserList: updateOnlineUserList,
    selectedUser: selectedUser,
    toggleSlider: toggleSlider,
    closeSlider: closeSlider
}


const OnlineUserListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(onlineUserList)

export default OnlineUserListContainer