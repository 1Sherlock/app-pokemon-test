import {UPDATE_STATE_POKEMON} from "../types";

const initialState = {
    page: 1, limit: 12, pokemonList: [], pokemonShow: [], types: []
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