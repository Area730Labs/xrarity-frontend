import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import ReactGA from 'react-ga';
import UpcomingMintButton from './UpcomingMintButton.js';
import NewMintDetails from './NewMintDetails'

class UpcomingMints extends React.Component {


    async componentDidMount(){
        ReactGA.pageview('/upcoming/');
    }

    render() {
        const collections = this.props.collections;

        return (
            <div>
                

            <Switch>

                <Route exact path="/upcoming">

                <div className="list-group list-group-checkable p-2 text-center h5 mt-4 mb-2">
                    We are filling up our upcoming mint calendar 💻<br/><br/>
                    <span>👉 <a href="https://twitter.com/sol_tracker" target="_blank">Follow us</a> 👈</span> to be the first one to know!
                </div>
                    
                    <div className="list-group list-group-checkable p-2 mt-4">

                        {collections.map((collection, i) => {
                            return (
                                <UpcomingMintButton key={collection.slug} name={collection.name} slug={collection.slug} id={collection.id} url={collection.icon_url} mint_website={collection.mint_website} mint_time={collection.mint_time}/>
                            )
                        })}

                    </div>
                </Route>

                {collections.map((collection, i) => {
                    return (
                        <Route exact path={'/upcoming/' + collection.slug}>
                            <NewMintDetails key={collection.id}  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  mint_website={collection.mint_website} mint_time={collection.mint_time} />
                        </Route>
                    )
                })}

            </Switch>
            </div>
        );
    }
}


export default UpcomingMints;
