import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import SearchContainer from './SearchContainer';

window.onload = () => {
  document.addEventListener('tizenhwkey', function(e) {
      if (e.keyName === "back") {
          try {
              tizen.application.getCurrentApplication().exit();
          } catch (ignore) {

          }
      }
  });
}

ReactDOM.render(
  <AppContainer
    component={SearchContainer}
  />,
  document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./SearchContainer', () => {
    ReactDOM.render(
      <AppContainer
        component={require('./SearchContainer').default}
      />,
      document.getElementById('root')
    );
  });
}
