import React,{Component} from 'react';
import '../css/Footer.css';

class Footer extends Component{

    render()
    {
        return (
            <div className="bg-img">
                <div className="container p-2">
                    <div className="row p-3">
                        <div className="col-md-3">
                            <h5>COMPANY</h5>
                                <ul className="list-unstyled">
                                    <li className="list-items">About us</li>
                                    <li className="list-items">Contact</li>
                                    <li className="list-items">Costs and billings</li>
                                </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>HELP</h5>
                                <ul className="list-unstyled">
                                    <li className="list-items">How it works</li>
                                    <li className="list-items">Support</li>
                                    <li className="list-items">Trust and safety</li>
                                </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>LEGALITIES</h5>
                                <ul className="list-unstyled">
                                    <li className="list-items">Privacy</li>
                                    <li className="list-items">Terms and conditions</li>
                                    <li className="list-items">Code of conduct</li>
                                </ul>
                        </div>
                        <div className="col-md-3 social">
                            <h5>CONNECT WITH US</h5>
                            <div className="mt-2">
                                <span className="mr-2">
                                    <img src="assests/social_linkedin.png" height="30" width="30" alt="fb"/>
                                </span>
                                <span className="mr-2">
                                    <img src="assests/social_facebook.png" height="30" width="30" alt="fb"/>
                                </span>
                                <span className="mr-2">
                                    <img src="assests/social_twitter.png" height="30" width="30" alt="fb"/>
                                </span>
                                <span className="mr-2">
                                    <img src="assests/social_youtube_default.png" height="30" width="30" alt="fb"/>
                                </span>
                            </div>
                            <div className="copyright">
                            ©Copyright Conrati 2018

                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        )
    }

}

export default Footer;