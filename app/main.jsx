import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, hashHistory, Router } from 'react-router';
import App from './container/App';
import userModule from './components/userModule';
import './fontIcon/index.css';


const Root = () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute components={userModule} />
        </Route>
    </Router>
);

const dom = document.getElementById('root');

ReactDOM.render(<Root />, dom);
