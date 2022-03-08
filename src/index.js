import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { HunelProvider, HunelCreditCard } from 'reactjs-credit-card';


// import AlertTemplate from 'react-alert-template-basic';
import AlertTemplate from 'react-alert-template-oldschool-dark';

const options = {
  timeout: 5000,
  transition: transitions.FADE,
  position: positions.BOTTOM_CENTER
}
const hunel = new HunelCreditCard({
  middlePartHide: true,
  yearLength: 15,
});


ReactDOM.render(
  
  <React.StrictMode>
        <AlertProvider template={AlertTemplate} {...options}>
          <Provider store={store}>
            <HunelProvider config={hunel}>

              <App />
            </HunelProvider>
          </Provider>
        </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

