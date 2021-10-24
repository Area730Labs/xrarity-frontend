import React from 'react';
import ReactGA from 'react-ga';

import 'three-dots/dist/three-dots.css'

class NewMintDetails extends React.Component {
    constructor(props) {
        super(props);

        this.updateTimer = this.updateTimer.bind(this);

        this.mintDate = new Date(this.props.mint_time + 'Z');

        this.state = {timerRunning: false, intervalId: 0, timerLabel: '', isToday: false}
    }

    componentDidMount(){
        ReactGA.pageview('/upcoming/' + this.props.collection_slug);
    }


    msToTime(ms){
        let secs = ms/1000;
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        hours = hours.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        minutes = minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        seconds = seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };

        return obj;
      }

      updateTimer(){
        const today = new Date()

        if (this.mintDate > today){
            const timeLeft = this.mintDate.getTime() - today.getTime()

            // if more than 24 hours left - show date
            if (this.mintDate.getTime() - today.getTime() > 24*60*60*1000){
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                let dateStr = this.mintDate.toLocaleDateString('en-US', options);
                let timeStr = this.mintDate.toLocaleTimeString('en-US');
                this.setState({timerLabel: dateStr + '   ' + timeStr, isToday: false});
            } else {
                let time = this.msToTime(timeLeft);

                let timerLabel = `${time.h}:${time.m}:${time.s}`;
                this.setState({timerLabel: timerLabel, isToday: true});
            }
        } else {
            if (this.state.timerRunning){
                clearInterval(this.state.intervalId);
            }
            this.setState({timerLabel: this.liveMintText, timerRunning: false, isToday: true})
        }
    }

    componentDidMount(){
        this.updateTimer();

        var intervalId = setInterval(this.updateTimer, 1000);
        this.setState({intervalId: intervalId, timerRunning: true});
    }

    componentWillUnmount(){
        if (this.state.timerRunning){
            clearInterval(this.state.intervalId);
        }
    }


    render() {
        const collectionName = this.props.collection_name;

        const markets = this.props.markets;

        let part_1 = []
        let part_2 = []

        for(let i=0;i<3 && i<markets.length;i++){
            part_1.push(markets[i])
        }

        for(let i=3;i<6 && i<markets.length;i++){
            part_2.push(markets[i])
        }
      
        return (
            <main className="form-signin text-center px-2 pb-1">
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
                            return (<span className="pr-1 px-1"><img width="22px" src={require('../img/icons/tag.png').default} /><a href={market.url} target="_blank" className="link-primary">{market.name}</a></span>)
                        })}
                    </div>

                    {/* ======== MARKETS LINE 2 ======== */}
                    {part_2.length > 0 && (
                        <div className="btn-group btn-group-sm text-center  w-100 d-block mb-1" >
                            {part_2.map((market, i) => {
                                return (<span className="pr-1 px-1"><img width="22px" src={require('../img/icons/tag.png').default} /><a href={market.url} target="_blank" className="link-primary">{market.name}</a></span>)
                            })}
                        </div>
                    )}

                    {this.state.timerRunning && this.state.isToday && (<p className="mt-3 mb-3"><span className="h4">Mint in: <strong>{this.state.timerLabel}</strong></span></p>)}
                    
                    {this.state.timerRunning && !this.state.isToday && (<p className="mt-3 mb-3"><span className="h4"><strong>{this.state.timerLabel}</strong></span></p>)}

                    {!this.state.timerRunning && (<p className="mt-3 mb-3"><span className="h4 text-success"><strong>Mint is Live!</strong></span></p>)}

                 
                    {/* ======== MINT BTN ====== */}
                    {this.props.mint_website && this.props.mint_website.length > 0 && (<button type="button" className="w-100 btn btn-lg btn-warning mt-2" onClick={()=> window.open(this.props.mint_website, "_blank")}>Mint</button>)}
                    

                </div>
            </main>
           
        );
    }
}


export default NewMintDetails;
