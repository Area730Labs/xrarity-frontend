import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
  } from "react-router-dom";
  import axios from 'axios';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.onCheckcheckActiveIdClicked = this.checkActive.bind(this);
        this.checkPrice = this.checkPrice.bind(this);

        this.state = {solPrice: 170.0}
    }

    checkActive(match, location){
        //some additional logic to verify you are in the home URI
        if(!location) return false;
        const {pathname} = location;
        return pathname === "/";
    }

    checkPrice(){
        axios.get('https://api.binance.com/api/v3/avgPrice?symbol=SOLUSDT').then(results => {
            this.setState({
                solPrice: Number(results.data.price).toFixed(1),
            });
        });
    }

    componentDidMount() {
        this.checkPrice();
        this.interval = setInterval(this.checkPrice, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
      const collections = this.props.group;

      return (
        <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-2 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="bi me-2" src={require('../img/logo.png').default} width="30px" height="30px" />
                <span className="fs-5"><strong>SOL Tracker</strong></span>
            </a>
    
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink to="/" className="nav-link px-2 link-dark py-0" isActive={this.checkActive} activeStyle={{fontWeight: "bold", textDecoration: "underline"}}>Home</NavLink></li>
                <li><NavLink to="/rarity" className="nav-link px-2 link-dark py-0" activeStyle={{fontWeight: "bold", textDecoration: "underline"}}>Rarity</NavLink></li>
                <li><NavLink to="/upcoming" className="nav-link px-2 link-dark text-danger py-0" activeStyle={{fontWeight: "bold", textDecoration: "underline"}}>🔥Upcoming mints🔥</NavLink></li>
                <li><NavLink to="/about" className="nav-link px-2 link-dark py-0" activeStyle={{fontWeight: "bold", textDecoration: "underline"}}>About</NavLink></li>
            </ul>
    
            <div className="col-md-3 text-end">
                <div className="sol_price"><strong><span className="active_dot rounded-circle"></span>SOL ${this.state.solPrice}</strong></div>
                <span className="twitter-align"><a href="https://twitter.com/sol_tracker?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-size="large" data-show-screen-name="false" data-show-count="false">Follow @sol_tracker</a>
                </span>
            {/* <button type="button" className="btn btn-outline-primary me-2">Login</button>
                <button type="button" className="btn btn-primary">Sign-up</button> */}
            </div>
        </header>
        </div>
      );
    }
}


export default Header;
