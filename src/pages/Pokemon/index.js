import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMorePokemon, getPokemon, getPokemonTypes, searchPokemon, updateState, filterByTag} from "../../redux/actions/pokemonAction";
import {Card, Col, Row, Tag, Divider, Modal, Button, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const {CheckableTag} = Tag;

const Pokemon = (props) => {
    const [offsets, setOffsets] = useState([12, 24, 60]);
    const [selectedOffset, setSelectedOffset] = useState(12);
    const [selectedTags, setSelectedTags] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [search, setSearch] = useState("");
    const {page, limit, pokemonList, pokemonShow, types} = useSelector((state) => state.pokemon)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemon(10000, 0));
        dispatch(getPokemonTypes());
    }, [dispatch])

    const {Meta} = Card;
    let searchTimeout;

    const handleChange = (tag) => {
        setSelectedTags(tag);
        dispatch(filterByTag(tag))
    };

    const handleChangeOffset = (tag) => {
        if (tag !== selectedOffset){
            setSelectedOffset(tag);
            dispatch(updateState({limit: tag}))
            dispatch(getMorePokemon(0, tag, true))
        }
    };

    const handleSearch = (e) => {
        clearInterval(searchTimeout)
        searchTimeout = setTimeout(() => {
            setSearch(e.target.value);
            dispatch(searchPokemon(e.target.value))
        }, 1000)
    }

    const handleGetMorePokemon = () => {
        dispatch(getMorePokemon(page, limit))
    }
    return (
        <div>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col xs={{span: 24}} sm={{span: 12}} md={{span: 8, offset: 8}} lg={{span: 8, offset: 8}} xl={{span: 12, offset: 6}} xxl={{span: 8, offset: 8}}>
                    <Input placeholder="Search" onChange={handleSearch} prefix={<SearchOutlined/>}/>
                </Col>
            </Row>
            <div className="tag-content">
                {types.map(tag => (
                    <CheckableTag
                        color="magenta"
                        key={tag.name}
                        checked={selectedTags === tag.name}
                        onChange={(checked) => handleChange(tag.name === selectedTags ? "" : tag.name, checked)}
                    >
                        {tag.name}
                    </CheckableTag>
                ))}
            </div>
            <div className="tag-content">
                {offsets.map(tag => (
                    <CheckableTag
                        color="magenta"
                        key={tag}
                        checked={selectedOffset === tag}
                        onChange={(checked) => handleChangeOffset(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {/*{pokemonList && pokemonList.filter((item, index) => (index >= page * limit && index < (page + 1) * limit) && (search.length > 0 ? item.name.toLowerCase().includes(search.toLowerCase()) : true)).map((item, index) => (*/}
                {pokemonShow && pokemonShow.sort((a, b) => a.originalIndex - b.originalIndex).map((item, index) => (
                    <Col xs={{span: 24}} sm={{span: 12}} md={{span: 8}} lg={{span: 8}} xl={{span: 6}} xxl={{span: 4}} key={item.name}>
                        <div className="col-padding">
                            <Card
                                hoverable
                                cover={<img alt={item.name} src={item.sprites?.front_default}/>}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setSelectedPokemon(item)
                                }}
                            >
                                <Meta title={item.name}/>
                                <Divider dashed className="mb-5"/>
                                {item.types?.map(tag => (
                                    <CheckableTag
                                        color="magenta"
                                        key={tag.type.name}
                                        checked={selectedTags === tag.type.name}
                                        // onChange={(checked) => handleChange(tag.type.name, checked)}
                                    >
                                        {tag.type.name}
                                    </CheckableTag>
                                ))}
                                <Divider dashed className="mt-5 mb-5"/>
                                <p>Experience: <b>{item.base_experience}</b></p>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>

            {search.length === 0 && selectedTags.length === 0 ? <Button className="btn-style" onClick={handleGetMorePokemon}>More</Button> : ""}

            <Modal title={selectedPokemon?.name} open={isModalOpen} footer={null} onCancel={() => {
                setIsModalOpen(false);
                setSelectedPokemon(null)
            }}>
                {selectedPokemon?.stats?.map(item => (
                    <p>{item.stat?.name}: {item.base_stat}</p>
                ))}
                <Divider dashed className="mt-5 mb-5"/>
                <Button type="primary" onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPokemon(null)
                }}>OK</Button>
            </Modal>
        </div>
    );
};

export default Pokemon;