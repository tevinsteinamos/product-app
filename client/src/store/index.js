import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
  const logger = createLogger();
  const enhancer = compose(applyMiddleware(thunkMiddleware, logger));
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      let nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
