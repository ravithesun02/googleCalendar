import React , { Component } from 'react';
import { Button } from 'reactstrap';
import '../css/Sign.css';

class SignIn extends Component{

    render()
    {
        return (
            <div className="main">
                <div className="container" style={{height:"100%"}}>
                    <div className="row syncbtn">
                        <Button color="success">
                            Sync Google Calendar
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignIn;