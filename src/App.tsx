import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './store/reducers';
import { rootSaga } from './store/sagas';
import { StockPage } from './pages/StockPage';

const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <StockPage />
    </Provider>
  );
}

export default App;
