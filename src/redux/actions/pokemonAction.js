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
    if (index < 12) {
        axios.get(url)
            .then(res => {
                dispatch(updateState({
                    pokemonList: getState().pokemon.pokemonList.map((item, indexItem) => indexItem === index ? {...item, ...res.data, downloaded: true, originalIndex: indexItem} : item),
                }))
                dispatch(updateState({
                    pokemonShow: [...getState().pokemon.pokemonShow, {...getState().pokemon.pokemonList[index], ...res.data}]
                }))
                return res.data;
            })
    }
}

export const searchPokemon = (value) => (dispatch, getState) => {
    const pokemonList = getState().pokemon.pokemonList.filter((item, index) => item.name.toLowerCase().includes(value.toLowerCase()))
    dispatch(updateState({pokemonShow: [], page: 1}))
    if (value.length > 0) {
        pokemonList.map((item, index) => {
            if (item.downloaded) {
                dispatch(updateState({pokemonShow: [...getState().pokemon.pokemonShow, item]}))
                return item
            } else {
                axios.get(item.url)
                    .then(res => {
                        dispatch(updateState({pokemonShow: [...getState().pokemon.pokemonShow, res.data]}))

                        dispatch(updateState({
                            pokemonList: getState().pokemon.pokemonList.map((pokemon, pokeIndex) => {
                                if (pokeIndex === item.originalIndex) {
                                    return {
                                        ...item,
                                        ...res.data,
                                        downloaded: true
                                    }
                                } else
                                    return pokemon;
                            })
                        }))
                    })
            }
        })
    } else {
        dispatch(updateState({
            pokemonShow: getState().pokemon.pokemonList.filter((item, index) => index < getState().pokemon.limit)
        }))
    }
}

export const getMorePokemon = (page, limit, isOffsetChange) => (dispatch, getState) => {
    const pokemonList = getState().pokemon.pokemonList.filter((item, index) => index >= page * limit && index < (page + 1) * limit)
    if (isOffsetChange){
        dispatch(updateState({pokemonShow: []}))
    } else {
        dispatch(updateState({page: page + 1}))
    }
    pokemonList.map((item, index) => {
        if (item.downloaded) {
            dispatch(updateState({pokemonShow: [...getState().pokemon.pokemonShow, item]}))
            return item
        } else {
            axios.get(item.url)
                .then(res => {
                    dispatch(updateState({pokemonShow: [...getState().pokemon.pokemonShow, res.data]}))

                    dispatch(updateState({
                        pokemonList: getState().pokemon.pokemonList.map((pokemon, pokeIndex) => {
                            if (pokeIndex === item.originalIndex) {
                                return {
                                    ...item,
                                    ...res.data,
                                    downloaded: true
                                }
                            } else
                                return pokemon;
                        })
                    }))
                })
        }
    })
}

export const getPokemonTypes = () => dispatch => {
    axios.get(API_PATH + "type")
        .then(res => {
            dispatch(updateState({types: res.data.results}))
        })
}

export const filterByTag = (value) => (dispatch, getState) => {
    const pokemonList = getState().pokemon.pokemonList.filter((item, index) => item.types?.filter(type => type.type.name === value).length > 0)
    dispatch(updateState({pokemonShow: [], page: 1}))
    if (value.length > 0) {
        pokemonList.map((item, index) => {
            if (item.downloaded) {
                dispatch(updateState({pokemonShow: [...getState().pokemon.pokemonShow, item]}))
                return item
            } else {
                axios.get(item.url)
                    .then(res => {
                        dispatch(updateState({pokemonShow: [...getState().pokemon.pokemonShow, res.data]}))

                        dispatch(updateState({
                            pokemonList: getState().pokemon.pokemonList.map((pokemon, pokeIndex) => {
                                if (pokeIndex === item.originalIndex) {
                                    return {
                                        ...item,
                                        ...res.data,
                                        downloaded: true
                                    }
                                } else
                                    return pokemon;
                            })
                        }))
                    })
            }
        })
    } else {
        dispatch(updateState({
            pokemonShow: getState().pokemon.pokemonList.filter((item, index) => index < getState().pokemon.limit)
        }))
    }
}