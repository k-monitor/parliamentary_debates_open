import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import "react-billboardjs/lib/billboard.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} basename="/parliamentary_debates_open/">
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
