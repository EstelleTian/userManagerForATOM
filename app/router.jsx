import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, hashHistory, browserHistory, Router } from 'react-router';
import LoginContainer from './container/loginContainer';
import App from './app';
import Home from './components/home/home';
import OnlineUserListContainer from './container/onlineUserListContainer';
import UserListContainer from './container/userListContainer';
import RoleListContainer from './container/roleListContainer';
import AuthoritiesListContainer from './container/authoritiesListContainer';
import GroupListContainer from './container/groupListContainer';
import './fontIcon/index.css';

const Root = () => (
    <Router history={hashHistory}>
        <Route path="/" component={ App } >
            <IndexRoute components={ LoginContainer } />
            <Route path="/home" component={Home} >
                <IndexRoute components={OnlineUserListContainer} />
                <Route path="/home/online-users" component={OnlineUserListContainer} />
                <Route path="/home/users" component={UserListContainer} />
                <Route path="/home/roles" component={RoleListContainer} />
                <Route path="/home/authorities" component={AuthoritiesListContainer} />
                <Route path="/home/groups" component={GroupListContainer} />
            </Route>
        </Route>

    </Router>
);

const dom = document.getElementById('root');

ReactDOM.render(<Root />, dom);
