import { combineReducers } from "redux";
import tickers from "./tickers";
import ui from "./ui";

const rootReducer = combineReducers({
    tickers,
    ui
});

export default rootReducer;
