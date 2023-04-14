import {UPDATE_STATE_POKEMON} from "../types";

const initialState = {
    page: 0, limit: 10, pokemonList: [], pokemonShow: []
}

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATE_POKEMON:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}