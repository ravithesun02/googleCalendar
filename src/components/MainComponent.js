import React, { Component } from 'react';
import EventCalendar from './CalendarComponent';

class Main extends Component{

    componentDidMount()
    {

    }

   render()
   {
       return (
           <div>
            
            <EventCalendar/>
            
           </div>
       )
   }

}

export default Main;
//<Route exact path="/calendar" component={EventCalendar}/>