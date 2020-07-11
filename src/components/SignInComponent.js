import React , { Component } from 'react';
import { Button } from 'reactstrap';
import ApiCalendar from 'react-google-calendar-api';
import '../css/Sign.css';

class SignIn extends Component{

    constructor(props)
    {
        super(props);

        this.handleSignIn=this.handleSignIn.bind(this);

    }

    handleSignIn()
    {
        ApiCalendar.handleAuthClick();
        console.log('yes');
    }
    getEvent()
    {
        if (ApiCalendar.sign)
        ApiCalendar.listUpcomingEvents(10)
          .then((result) => {
            console.log(result.result.items);
          });
    }

    render()
    {
        return (
            <div className="main">
                <div className="container" style={{height:"100%"}}>
                    <div className="row syncbtn">
                        <Button color="success" onClick={()=>this.handleSignIn()}>
                            Sync Google Calendar
                        </Button>
                        <Button onClick={()=>this.getEvent()}>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignIn;