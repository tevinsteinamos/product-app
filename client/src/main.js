import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import configureStore from './store';

import 'grommet/scss/vanilla/index';

import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';

import App from './components/app';
import ProductList from './components/ProductList';

let store = configureStore();
let element = document.querySelector('.container');

let Information = () => {
  return (
    <Box align="stretch"
      pad="large"
      responsive={true}>
      <Heading tag="h2"
        align="center">
        Grrrrr....
      </Heading>
    </Box>
  );
};

let ExtraInformation = () => {
  return (
    <Box align="stretch"
      pad="large"
      responsive={true}>
      <Heading tag="h2"
        align="center">
        Rawrrrr....
      </Heading>
    </Box>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ProductList}></IndexRoute>
        <Route path="information" component={Information}></Route>
        <Route path="extra-information" component={ExtraInformation}></Route>
      </Route>
    </Router>
  </Provider>
  , element);
