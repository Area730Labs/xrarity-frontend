import React from 'react';
import CollectionButton from './CollectionButton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import RarityCheck from './RarityCheck';
import ReactGA from 'react-ga';
import PropTypes from "prop-types";
import { withRouter } from "react-router";


class RarityCollections extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    

    constructor(props) {
        super(props);   

        this.state = {query: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        var query = e.target.value.trim().toLowerCase();
       
        this.setState({query: query})
    }

    filterCollections(collections, query) {
        if (!query) {
            return collections;
        }
    
        return collections.filter((collection) => {
            const collectionName = collection.name.toLowerCase();
            return collectionName.includes(query);
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.setState({query: ''})
        }
      }
    

    async componentDidMount(){
        ReactGA.pageview('/rarity');
    }

    render() {
        const collections = this.props.collections;
        const filteredCollections = this.filterCollections(collections, this.state.query);

      return (

        <Switch>

            <Route exact path="/rarity/">
                <div className="list-group list-group-checkable p-2 mt-4">

                    <div className="mb-2 card card-body p-2 d-flex">
                        <input type="text" className="form-control bg-light border-0" placeholder="Search" onChange={this.handleChange} value={this.state.query}   />
                    </div>

                    {filteredCollections.map((collection, i) => {
                        return (
                            <CollectionButton key={`3_${collection.id}`} name={collection.name} slug={collection.slug} id={collection.id}  url={collection.icon_url} />
                        )
                    })}

                </div>
            </Route>

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/rarity/' + collection.slug}>
                        <RarityCheck key={`1_${collection.slug}`}  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  />
                    </Route>
                )
            })}

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/c/' + collection.slug}>
                        <RarityCheck key={`2_${collection.id}`}  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  />
                    </Route>
                )
            })}

        </Switch>
      );
    }
}


export default withRouter(RarityCollections);
