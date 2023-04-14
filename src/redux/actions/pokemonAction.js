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
    if (index < 12){

        axios.get(url)
        .then(res => {
            dispatch(updateState({
                pokemonList: getState().pokemon.pokemonList.map((item, indexItem) => indexItem === index ? {...item, ...res.data, downloaded: true} : item),
            }))
                dispatch(updateState({
                    pokemonShow: [...getState().pokemon.pokemonShow, {...getState().pokemon.pokemonList[index], ...res.data}]
                }))
            return res.data;
        })
    }

    // .then(res => {
        //     dispatch(updateState({
        //         pokemonShow: [...getState().pokemon.pokemonShow, {...getState().pokemon.pokemonList[index], ...res.data}]
        //     }))
        // })
}

export const searchPokemon  =  (value) => (dispatch, getState) => {
        const pokemonList = getState().pokemon.pokemonList
        if (value.length > 0){
            dispatch(updateState({
                pokemonShow: pokemonList.filter( (item, index) => item.name.toLowerCase().includes(value.toLowerCase())).map( async (item, index) => {
                    if (item.downloaded){
                        return item;
                    } else {
                        let data;
                        await axios.get(item.url).then(res => {
                            data = res.data;
                        })
                        return data;
                    }
                })
            }))
        } else {
            dispatch(updateState({
                pokemonShow: pokemonList.filter((item, index) => index<12)
            }))
        }
}