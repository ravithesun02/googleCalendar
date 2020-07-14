import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent';

class App extends React.Component{

  render(){
    return (
     <BrowserRouter>
      <Main/>
     </BrowserRouter>
    )
  }
}

export default App;
