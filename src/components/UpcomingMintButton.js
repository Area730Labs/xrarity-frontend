import React from 'react';
import { withRouter } from 'react-router-dom';


class UpcomingMintButton extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.updateTimer = this.updateTimer.bind(this);

        this.mintDate = new Date(this.props.mint_time + 'Z');
        this.liveMintText = 'Mint is live!';

        this.state = {timerLabel: '', timerRunning: false, intervalId: 0}
        
    }

    handleClick(){
        this.props.history.push({
            pathname: '/upcoming/' + this.props.slug
        });
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
                this.setState({timerLabel: this.mintDate.toLocaleDateString('en-US', options)});
            } else {
                let time = this.msToTime(timeLeft);

                let timerLabel = `${time.h}:${time.m}:${time.s}`;
                this.setState({timerLabel: timerLabel});
            }
        } else {
            if (this.state.timerRunning){
                clearInterval(this.state.intervalId);
            }
            this.setState({timerLabel: this.liveMintText, timerRunning: false})
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

        const name = this.props.name;
        const slug = this.props.slug;

        return (
            <div onClick={this.handleClick}  >
                <div className="list-group-item py-2 d-flex align-middle" htmlFor ="listGroupCheckableRadios1">
                    
                    <img className="rounded-circle mr-4" src={this.props.url} width="50px" height="50px"/>
                    <span className="d-block align-middle m-2 lh-35 h5 pl-2">{name}</span>
                    <div className={`d-block align-middle lh-35 h5 pl-2 collection_btn_align my-2 ` + (this.state.timerRunning ? '':'text-success')}>{this.state.timerLabel}</div>
                    
                </div>
                
            </div>
        );
    }
}


export default withRouter(UpcomingMintButton);
