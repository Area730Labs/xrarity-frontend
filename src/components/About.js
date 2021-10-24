import React from 'react';


class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      const collections = this.props.group;

      return (
        <main className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">About Sol Tracker</h6>
                <div className="d-flex text-muted pt-3 text-black">
                
                    <p className="pb-3 mb-0 lh-sm border-bottom h6 mt-3 pb-4 text-black">
                        Sol Tracker is a collection of tools for Solana NFT ecosystem. Our first product is the best in the market NFT rarity system. We strongy believe that Solana is the best blockchain for NFT and payments in the visible future. 
                    </p>

                
                </div>

                <p className="pb-3 mb-0 lh-sm h6 mt-4 text-black">
                    Contact: <strong>soltracker@protonmail.com</strong>
                </p>
            </div>
        </main>
      );
    }
}

export default About;
