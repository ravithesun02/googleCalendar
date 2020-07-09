import React from 'react';
import './App.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import SignIn from './components/SignInComponent';

class App extends React.Component{

  render(){
    return (
      <>
      <Header/>
      <SignIn/>
      <Footer/>
      </>
    )
  }
}

export default App;
