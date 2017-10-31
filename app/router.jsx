import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';

import App from './app';
import LoginContainer from './container/loginContainer';
import userModule from './components/userModule';
import Home from './components/home/home';
import './fontIcon/index.css';

const Root = () => (
    <Router history={browserHistory}>
        <Route path="/" component={ App } >
            <IndexRoute components={ LoginContainer } />
            <Route path="/home" component={Home} >
                <IndexRoute components={userModule} />
                <Route path="/home/user" component={userModule} />
            </Route>
        </Route>
    </Router>
);

const dom = document.getElementById('root');

ReactDOM.render(<Root />, dom);
