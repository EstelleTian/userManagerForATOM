import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../../actions'
import Login from '../../components/login'

const mapStateToProps = ( state ) => ({
    login : state.login
})

const mapDispatchToProps =  {
    userLogin
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;