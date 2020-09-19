import React, { Component } from 'react';
import EnergyPichart from '../components/EnergyPichart';
import InputForm from '../components/InputForm';
class Home extends Component {
  render() {

    return (
        <div className="rowDiv">
        <InputForm/>
        <EnergyPichart/>
      </div>
    );
  }
};

export default Home;