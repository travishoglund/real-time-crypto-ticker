import * as actionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {

        case actionTypes.WEBSOCKET_EVENT_RECEIVED:

            if ( action.data.event === 'subscribed' ) {
                return {
                    ...state,
                    [ action.data.symbol ]: {
                        ...state[ action.data.symbol ],
                        "channelId": action.data.chanId
                    }
                }
            }

            /**
             * Find Ticker on Price Update Event
             */
            if ( ! action.data.event ) {
                const channel_to_lookup = action.data[0];
                let found_ticker = null;

                for (const [key, value] of Object.entries(state)) {
                    if (value.channelId === channel_to_lookup) {
                        found_ticker = value;
                    }
                }

                if (found_ticker !== null && Array.isArray( action.data[1] ) ) {
                    return {
                        ...state,
                        [found_ticker.symbol]: {
                            ...state[found_ticker.symbol],
                            bid: action.data[1][0],
                            ask: action.data[1][2],
                            daily_change: action.data[1][4],
                            daily_change_relative: action.data[1][5],
                            volume: action.data[1][7],
                            high: action.data[1][8],
                            low: action.data[1][9],
                        }
                    }
                }
            }

            return state;

        default:
            return state;
    }
};
