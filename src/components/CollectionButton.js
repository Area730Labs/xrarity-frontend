import React from 'react';
import { withRouter } from 'react-router-dom';



class CollectionButton extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.history.push({
            pathname: '/rarity/' + this.props.slug
        });
    }


    render() {
      const name = this.props.name;
      const slug = this.props.slug;

      return (
        <div onClick={this.handleClick}  >
            <input className="list-group-item-check" type="radio"  value=""  />
            <label className="list-group-item py-2 d-flex align-middle" htmlFor ="listGroupCheckableRadios1">
                
                <img className="rounded-circle mr-4" src={this.props.url} width="50px" height="50px"/>
                <span className="d-block align-middle m-2 lh-35 h5 pl-2">{name}</span>

            {/* <span class="badge rounded-pill bg-danger float-right">Hot 🔥</span> */}
                
            </label>
            
        </div>
      );
    }
}


export default withRouter(CollectionButton);
