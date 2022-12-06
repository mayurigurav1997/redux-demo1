const redux = require("redux");
const produce = require("immer").produce

const initialState = {
    name: "Mayuri",
    address: {
        street: "123 Main st",
        city: "kolapur",
        state: "MH"
    }
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            // draft is duplicate copy of state
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {
    console.log("Updated state ", store.getState())
})
store.dispatch(updateStreet("46 Main stdlo."))
unsubscribe();