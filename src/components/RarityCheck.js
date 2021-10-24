import React from 'react';
import API from '../api';
import ReactGA from 'react-ga';

import 'three-dots/dist/three-dots.css'

class RarityCheck extends React.Component {
    constructor(props) {
        super(props);
    
        this.onCheckIdClicked = this.onCheckIdClicked.bind(this);
        this.onCheckRankClicked = this.onCheckRankClicked.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.changeToById = this.changeToById.bind(this);
        this.changeToByRank = this.changeToByRank.bind(this);
    
        this.state = {
            inputValue: '', 
            isError: false, 
            imageUrl: '', 
            rank: 0, 
            isLoading: false, 
            isImageLoading: false, 
            delayOver: true, 
            byId: true, 
            byRank: false,
            nft_name: '',
            traits: []
        }
    }

    componentDidMount(){
        ReactGA.pageview('/rarity/' + this.props.collection_slug);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeToById(){
        this.setState({
            byId: true, 
            byRank: false,
            inputValue: '',
            isImage: false,
            rank: 0,
            nft_name: '',
            imageUrl: '',
            traits: []
        })
    }

    changeToByRank(){
        this.setState({
            byId: false, 
            byRank: true,
            inputValue: '',
            isImage: false,
            rank: 0,
            nft_name: '',
            imageUrl: '',
            traits: []
        })
    }


    // Find rank by nft id or name
    async onCheckIdClicked(e){
        if (this.state.inputValue && (this.state.inputValue.length) > 0)
        {
            this.setState({isError: false, isLoading: true, isImageLoading: false, delayOver: false});

            try {
                const val = encodeURIComponent(this.state.inputValue.trim());
                const response = await API.get(`check_rank/${this.props.collection_id}/${val}`);

                this.setState({
                    isLoading: false,
                    imageUrl: response.data.url,
                    rank: response.data.rank,
                    isImageLoading: true,
                    nft_name: response.data.name,
                    traits: response.data.traits
                });

                await this.sleep(1000);

                this.setState({delayOver: true})

                window.scrollTo(0,document.body.scrollHeight);

            } catch (err) {
                this.setState({
                    isLoading: false,
                    isError: true,
                    isImageLoading: false,
                    delayOver: true
                });
            }
        } else {
            this.setState({isError: true});
        }
    }

    // Find nft by rank
    async onCheckRankClicked(e){
        const maxRank = this.props.total_count;

        if (this.state.inputValue && (this.state.inputValue.length) > 0)
        {
            this.setState({isError: false, isLoading: true, isImageLoading: false, delayOver: false});

            try {
                const val = encodeURIComponent(this.state.inputValue.trim());
                const response = await API.get(`find_by_rank/${this.props.collection_id}/${val}`);

                this.setState({
                    isLoading: false,
                    imageUrl: response.data.url,
                    rank: response.data.rank,
                    isImageLoading: true,
                    nft_name: response.data.name,
                    traits: response.data.traits
                });

                await this.sleep(1000);

                this.setState({delayOver: true})

                window.scrollTo(0,document.body.scrollHeight);

            } catch (err) {
                this.setState({
                    isLoading: false,
                    isError: true,
                    isImageLoading: false,
                    delayOver: true
                });
            }
        } else {
            this.setState({isError: true});
        }
    }


    handleChange(e){
        this.setState({inputValue: e.target.value});
    }
    

    render() {
        const collectionName = this.props.collection_name;

        let isError = this.state.isError;
        let isImage = !isError && this.state.imageUrl.length > 0;
        let hasRank = !isError && this.state.rank > 0;
        let hasName = !isError && this.state.nft_name.length > 0;
        let isLoading = this.state.isLoading;
        let imageUrl = this.state.imageUrl;

        // let isError = true;
        // let isImage = true;
        // let hasRank = true;
        // let hasName = true;
        // let isLoading = false;
        // let imageUrl = 'https://64puygu2gtahymut4opt6lbwhiieidmcfuira65fleyat5rue2mq.arweave.net/9x9MGpo0wHwyk-OfPyw2OhBEDYItERB7pVkwCfY0Jpk/data.png';

        const total_count = this.props.total_count;
        const markets = this.props.markets;

        let part_1 = []
        let part_2 = []

        for(let i=0;i<3 && i<markets.length;i++){
            part_1.push(markets[i])
        }

        for(let i=3;i<6 && i<markets.length;i++){
            part_2.push(markets[i])
        }

        let inputPlaceholder = "Enter NFT number or name";

        if (this.state.byRank){
            inputPlaceholder = "Enter NFT rank";
        }


        return (
            <main class="form-signin text-center px-2 pb-1">
                <div className="d-flex align-items-center p-3 my-2 text-white bg-purple rounded shadow-sm align-center">
                    <h3 className="h5 mb-0 text-white lh-1 float-right">{collectionName}</h3>
                </div>

                <div className="my-1 px-3 py-2 bg-body rounded shadow-sm">

                    {/* ========     ICON     ========= */}
                    <img className="mb-2 rounded-circle" src={this.props.icon_url} alt="" width="150" height="150" />

                    {/* ======== SOCIAL LINKS  ======== */}
                    <div className="btn-group btn-group-sm pb-2 w-100" role="group" aria-label="Small button group">
                        <button type="button" className="btn btn-outline-social" onClick={()=> window.open(this.props.website, "_blank")}><img width="18px" src={require('../img/icons/website.png').default} /><span className="p-1" >Website</span></button>
                        <button type="button" className="btn btn-outline-social" onClick={()=> window.open('https://twitter.com/' + this.props.twitter, "_blank")}><img width="18px" src={require('../img/icons/twitter.png').default} /><span className="p-1" >Twitter</span></button>
                        <button type="button" className="btn btn-outline-social" onClick={()=> window.open(this.props.discord, "_blank")}><img width="18px" src={require('../img/icons/discord.png').default} /><span className="p-1" >Discord</span></button>
                    </div>


                    {/* ======== MARKETS LINE 1 ======== */}
                    <div className="btn-group btn-group-sm text-center w-100 d-block mt-2 mb-1" >
                        {part_1.map((market, i) => {
                            return (<span  key={'1_' + i} className="pr-1 px-1"><img width="22px" src={require('../img/icons/tag.png').default} /><a href={market.url} target="_blank" className="link-primary">{market.name}</a></span>)
                        })}
                    </div>

                    {/* ======== MARKETS LINE 2 ======== */}
                    {part_2.length > 0 && (
                        <div className="btn-group btn-group-sm text-center  w-100 d-block mb-1" >
                            {part_2.map((market, i) => {
                                return (<span key={'2_' + i} className="pr-1 px-1"><img width="22px" src={require('../img/icons/tag.png').default} /><a href={market.url} target="_blank" className="link-primary">{market.name}</a></span>)
                            })}
                        </div>
                    )}

                    {/* ========  SWITCH MODE  ======== */}
                    <div className="btn-group  btn-group-sm w-100 mt-2 mb-2" role="group" aria-label="Choose mode">
                        <button type="button" className={`btn btn-outline-primary ${this.state.byId ? "active" : ""}`} onClick={this.changeToById}>By ID</button>
                        <button type="button" className={`btn btn-outline-primary ${this.state.byRank ? "active" : ""}`} onClick={this.changeToByRank}>By Rank</button>
                    </div>

                    {/* ========   ERROR MSG   ======== */}
                    {isError && (
                        <div className="alert alert-danger smaller_alert" role="alert">
                            Wrong number
                        </div>
                    )}

                    {/* ========     INPUT     ======== */}
                    <div className="form-floating">
                        <input className="form-control" id="floatingInput" placeholder="1234" value={this.state.inputValue} onChange={this.handleChange}/>
                        <label htmlFor="floatingInput">{inputPlaceholder}</label>
                    </div>

                    {/* ======== FIND RANK BTN ======== */}
                    {this.state.byId && (<button type="button" className="w-100 btn btn-lg btn-primary mt-2" onClick={this.onCheckIdClicked}>Check Rarity</button>)}

                    {/* ======== FIND NFT ID BTN ====== */}
                    {this.state.byRank && (<button type="button" className="w-100 btn btn-lg btn-primary mt-2" onClick={this.onCheckRankClicked}>Find NFT</button>)}
                    

                    {/* ======== RANK LABEL ======== */}
                    {this.state.byId && !isLoading && hasRank && this.state.delayOver && (
                        <p className="mt-3 mb-3"><span className="h4">Rank: <strong>{this.state.rank}/{total_count}</strong></span>
                        {/* <button type="button" class="btn btn-warning">?</button> */}
                        {/* <img className="info-btn-rank" src={require('../img/icons/info.png').default} width="20px"/> */}
                        </p>
                    )}

                    {/* ======== NAME LABEL ======== */}
                    {this.state.byRank && !isLoading && hasName && this.state.delayOver && (
                        <p className="mt-3 mb-3"><h4><strong>{this.state.nft_name}</strong></h4></p>
                    )}

                    {/* ======== LOADING DOTS ======== */}
                    {(isLoading || this.state.isImageLoading || !this.state.delayOver) && (
                        <div className="w-100 form-floating d-flex justify-content-center p-3">
                            <div class="dot-typing"></div>
                        </div>
                    )}

                    {/* ======== IMAGE ======== */}
                    {!isLoading && isImage && (
                        <img className="w-100" 
                            style={(!this.state.isImageLoading && this.state.delayOver) ? {} : {display: 'none'}}
                            src={imageUrl}
                            onLoad={() => this.setState({isImageLoading: false})}
                        />
                    )}

                    {this.state.traits && this.state.traits.length > 0 && !isLoading && this.state.delayOver && (
                        <div class="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Trait</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Rarity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.traits.map((trait, i) => {
                                        return (
                                            <tr>
                                                <th scope="row">{trait['n']}</th>
                                                <td>{trait['v']}</td>
                                                <td>{Number(trait['p']).toFixed(2)}%</td>
                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            </main>
           
        );
    }
}


export default RarityCheck;
