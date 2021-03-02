import React from "react"
import { connect } from "react-redux"
import { webSocketReceived } from './actions/actionCreators'
import Ticker from '../../components/Ticker/Ticker'
import PropTypes from "prop-types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {deepObject} from "../../utilities/object-utils";

const bitfinex = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');
const cb = "root-tickers";

class App extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {

        const symbols = Object.keys( this.props.tickers );

        bitfinex.onopen = () => {
            for ( let i = 0; i < symbols.length; i++ ) {
                bitfinex.send(JSON.stringify({
                    event: 'subscribe',
                    channel: 'ticker',
                    symbol: symbols[i]
                }))
            }
        };
        bitfinex.onmessage = (message) => {
            const data = JSON.parse( deepObject( message, 'data' ) || "{}" );
            this.props.webSocketReceived( data );
        };
    }

    componentWillUnmount() {
        bitfinex.close();
    }

    render() {

        const symbols = Object.keys( this.props.tickers );

        return (
            <div className={`${cb}`}>
                { symbols.map( symbol => (
                    <div key={symbol} className={`${cb}__ticker`}>
                        <Ticker key={`${symbol}-ticker`} data={ deepObject( this.props.tickers, symbol ) || {} } />
                    </div>
                ) )}
            </div>
        )
    }

}

App.propTypes = {
    tickers: PropTypes.object,
    ui: PropTypes.object
};

App.defaultProps = {
    tickers: {},
    ui: {}
};

export const mapStateToProps = (state = {}) => ({
    tickers: state.tickers,
    ui: state.ui
});

export const mapDispatchToProps = dispatch => ({
    webSocketReceived: (data) => dispatch(webSocketReceived(data)),
});

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
