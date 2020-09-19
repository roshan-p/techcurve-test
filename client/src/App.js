import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import reducer from './reducers'
import Home from './pages/Home'

const store = createStore(reducer);
store.subscribe(()=>{
  console.log('[subscribe]',store.getState());
})

class App extends Component {
  componentWillMount() {
  
  }

  render() {

    return (
    
      <Provider store={store} >
        <div className="App">
        <Home/>
        </div>
      </Provider>

    );
  }
};

export default App;