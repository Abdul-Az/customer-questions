import React, { Component } from 'react'
// import Header from "./components/Header"
import CustomCard from './components/CustomCard';
// import FloatingButton from './components/FloatingButton';
import FixedNavBar from './components/FixedNavBar';
import CreateThreadModel from './components/Modal';



export default class App extends Component {

  render() {
    return (
      <div>
         
        <FixedNavBar />
        <CustomCard />
        <CreateThreadModel />
        </div>
    
    )
  }
}
