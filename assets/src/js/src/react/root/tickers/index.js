import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";
import { getInitialTickerState, getInitialUiState } from "./init";
import App from "./App";

const react_tickers = document.getElementById("react-tickers");

if( react_tickers ) {

    const store = createStore(
        reducers,
        {
            tickers: getInitialTickerState(),
            ui: getInitialUiState()
        },
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );

    const render = () => {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            react_tickers
        );
    };
    render();
    store.subscribe(render);
}
