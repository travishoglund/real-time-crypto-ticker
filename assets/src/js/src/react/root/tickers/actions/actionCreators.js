import * as actionTypes from "./actionTypes";

export function webSocketReceived(data) {
    return {
        type: actionTypes.WEBSOCKET_EVENT_RECEIVED,
        data: data
    }
}
