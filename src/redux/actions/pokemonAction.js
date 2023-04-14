import {UPDATE_STATE_POKEMON} from "../types";
import axios from "axios";
import {API_PATH} from "../../tools";

export function updateState(state) {
    return {
        type: UPDATE_STATE_POKEMON,
        payload: state
    }
}

export const getPokemon = (limit, page) => (dispatch, getState) => {
    axios.get(API_PATH + "pokemon?limit=" + limit + "&offset=" + page * limit)
        .then(res => {
            if (res.data.results) {
                dispatch(updateState({pokemonList: res.data.results}));
                return res.data.results
            }
            return []
        })
        .then((list) => {
            list.map((item, index) => dispatch(getPokemonInfo(item.url, index)))
        })
}

export const getPokemonInfo = (url, index) => (dispatch, getState) => {
    axios.get(url)
        .then(res => {
            dispatch(updateState({
                pokemonList: getState().pokemon.pokemonList.map((item, indexItem) => indexItem === index ? {...item, ...res.data} : item)
            }))
        })
}