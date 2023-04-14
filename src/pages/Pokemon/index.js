import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPokemon, searchPokemon, updateState} from "../../redux/actions/pokemonAction";
import {Card, Col, Row, Tag, Divider, Modal, Button, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const {CheckableTag} = Tag;

const Pokemon = (props) => {

    const [selectedTags, setSelectedTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [search, setSearch] = useState("");
    const {page, limit, pokemonList, pokemonShow} = useSelector((state) => state.pokemon)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPokemon(10000, 0));
    }, [dispatch])

    const {Meta} = Card;
    let nimadir;


    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
    };

    const handleSearch = (e) => {
        clearInterval(nimadir)
        nimadir = setTimeout(() => {
            dispatch(searchPokemon(e.target.value))
        }, 1000)
    }
    return (
        <div>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col span={12} offset={6}>
                    <Input placeholder="Search" onChange={handleSearch} prefix={<SearchOutlined/>}/>
                </Col>
            </Row>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {/*{pokemonList && pokemonList.filter((item, index) => (index >= page * limit && index < (page + 1) * limit) && (search.length > 0 ? item.name.toLowerCase().includes(search.toLowerCase()) : true)).map((item, index) => (*/}
                {pokemonShow && pokemonShow.map((item, index) => (
                    <Col span={6} key={item.name}>
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
                                        checked={selectedTags.includes(tag.type.name)}
                                        onChange={(checked) => handleChange(tag.type.name, checked)}
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