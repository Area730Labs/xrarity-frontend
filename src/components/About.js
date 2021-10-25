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
                <h6 className="border-bottom pb-2 mb-0">About X-Rarity</h6>
                <div className="d-flex text-muted pt-3 text-black">
                
                    <p className="pb-3 mb-0 lh-sm border-bottom h6 mt-3 pb-4 text-black">
                        X-Rarity if the first rarity tool for Immutable X market NFTs.
                    </p>

                
                </div>

                <p className="pb-3 mb-0 lh-sm h6 mt-4 text-black">
                    Contact: <strong>xrarity@protonmail.com</strong>
                </p>
            </div>
        </main>
      );
    }
}

export default About;
