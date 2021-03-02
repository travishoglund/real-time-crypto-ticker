import React, { Component } from "react";
import PropTypes from "prop-types";
import {deepObject} from "../../utilities/object-utils";

const cb = "cp-loader";

class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animationName: '',
            sheet: ''
        }
    }

    componentDidMount() {
        const animationName = `animation${Math.round(Math.random() * 100000)}`;

        // Add custom stylesheet to DOM
        const style = (function() {
            const style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style;
        })();

        // Add custom key
        style.sheet.animationName = animationName;

        // Add custom stylesheet rule for keyframes
        const keyframes =
            `@keyframes ${animationName} {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }`;

        style.sheet.insertRule(keyframes, style.sheet.cssRules.length);

        this.setState({
            animationName: animationName,
            style: style
        })
    }

    componentWillUnmount() {
        // remove dynamic stylesheet from document
        if ( deepObject(this.state, 'style.remove') ) {
            this.state.style.remove();
        }
    }

    render () {

        const style = {
            animationName: this.state.animationName,
            animationTimingFunction: 'linear',
            animationDuration: '1.1s',
            animationDelay: '0.0s',
            animationIterationCount: 'infinite',
            animationDirection: 'normal',
            borderLeftColor: '#000000'
        };

        return (
            <div className={`${cb} ${cb}--${this.props.size}`} style={ style }>
                Loading...
            </div>
        );
    }
}

Loader.propTypes = {
    size: PropTypes.string
};
Loader.defaultProps = {};

export default Loader;
