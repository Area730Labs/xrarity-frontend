import React from 'react';


class Maintenance extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
      return (
        <div className="maintenance h3 text-center align-middle form-signin bg-body rounded shadow-sm">
            🚨Under maintenance🚨<br /><br/>We will be back online shortly 👀 <br/> <br/>
            <a href="https://twitter.com/sol_tracker" target="_blank">Follow us</a> for more information 🤖
        </div>
        
        
      );
    }
}


export default Maintenance;
