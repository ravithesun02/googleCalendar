import React ,{Component} from 'react';

class Header extends Component{
render(){
    return (
        <div className="fluid-container">
            <div className="row ml-1 mr-0">
                <img src="assests/logo.png" alt="Logo" height="80" width= "200" />
            </div>
        </div>
    )
}
}

export default Header;