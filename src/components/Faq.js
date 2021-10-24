import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import ReactGA from 'react-ga';

class Faq extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount(){
        ReactGA.pageview('/faq/');
    }

    render() {

      return (
        <main className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">How we rank NFTs</h6>
                <div className="d-flex text-muted pt-3">
                    <p className="pb-3 mb-0 lh-sm border-bottom h6 mt-2 pb-4 text-black">
                        First, it is important to understand that any ranking is very subjective. There is no one proper formula and websites calculate ratings as they see fit.
                        <br /><br />
                        For example, if we take statistical rarity (e.g. Moonrank) - it calculates NFT's rarity by multiplying the rarities of each attribute. Unfortunately, this approach doesn't work properly for NFTs - truly rare ones often get ranked lower than multiple identical NFTs without really unique properties.
                        <br /><br />

                        We use a ranking system similar to <a href="https://rarity.tools/" target="_blank">RarityTools</a>. You can read more about how rank is calculated in their <a href="https://raritytools.medium.com/ranking-rarity-understanding-rarity-calculation-methods-86ceaeb9b98c" target="_blank">blog post</a>.
                        <br /><br />

                        Some collections require a non-generic approach.  For example, the total count of attributes may influence the rarity. In such cases, we work closely with collection owners to adjust the rarity so it perfectly matches the intended one.  
                        <br /><br />

                        If you have any questions, suggestions, etc - don't hesitate to contact us on <a href="https://twitter.com/sol_tracker" target="_blank">Twitter</a>!
                    </p>

                </div>

            </div>
        </main>
       
      );
    }
}




export default Faq;
