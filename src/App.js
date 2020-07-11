import React from 'react';
import './App.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import SignIn from './components/SignInComponent';
import EventCalendar from './components/CalendarComponent';

class App extends React.Component{

  render(){
    return (
      <>
      <Header/>
      <EventCalendar/>
      <Footer/>
      </>
    )
  }
}

export default App;
