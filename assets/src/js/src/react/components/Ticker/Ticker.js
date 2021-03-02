import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import {formatPrice} from "../../utilities/number-utils";
import AnimateOnChange from 'react-animate-on-change'

const cb = "cp-ticker";

class Ticker extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        const { bid, daily_change, daily_change_relative, symbol, title } = this.props.data;
        const pos_neg = daily_change > 0 ? '+' : '-';
        const loading_class = !bid ? `${cb}--loading` : '';

        return (
            <div className={`${cb} ${cb}--${symbol} ${loading_class}`}>
                <div className={`${cb}__inner`}>
                    { bid ? (
                        <>
                            <div className={`${cb}__title`}>
                                <span></span>{ title }
                            </div>
                            <div className={`${cb}__bottom`}>
                                <div className={`${cb}__percentage`}>
                                    { pos_neg } { Math.abs( daily_change_relative * 100 ).toFixed(2) }%
                                </div>
                                <div className={`${cb}__price`}>
                                    <AnimateOnChange
                                        baseClassName={`price-${symbol}`}
                                        animationClassName={`price-bounce-${symbol}`}
                                        animate={this.props.diff != 0}>
                                        { formatPrice(bid) }
                                    </AnimateOnChange>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Loader />
                    ) }
                </div>
            </div>
        );
    }
}

Ticker.propTypes = {
    data: PropTypes.object
};
Ticker.defaultProps = {
    data: {}
};

const MemoizedTicker = React.memo(Ticker);

export default MemoizedTicker;
