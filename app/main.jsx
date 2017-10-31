import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import LoginStore from './container/LoginStore';
import App from './container/App';
import userModule from './components/userModule';
import './fontIcon/index.css';

const Root = () => (
    <Router history={browserHistory}>
        <Route path="/" component={LoginStore} />
        <Route path="/home" component={App}>
            <IndexRoute components={userModule} />
            <Route path="/home/user" component={userModule} />
        </Route>
    </Router>
);

const dom = document.getElementById('root');

ReactDOM.render(<Root />, dom);
