// import redux from 'redux';
const redux = require("redux")
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
console.log("From index.js")
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger()

//create constant for action
const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

//orderCake is action creator function which returns action (object)
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
function orderIceCream() {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}
function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }
const initilaCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    numOfIceCreams: 20,
}

// (prevState, action) => newState
const cakeReducer = (state = initilaCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            //return new state(object)
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            //return new state(object)
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    cake1: cakeReducer,
    iceCream1: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log("Initila state", store.getState());
const unsubscribe = store.subscribe(() => {
    // console.log("updated state", store.getState());
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)
unsubscribe()