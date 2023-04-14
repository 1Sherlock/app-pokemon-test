import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPokemon} from "../../redux/actions/pokemonAction";
import {Card, Col, Row, Tag, Divider, Modal, Button} from 'antd';
const { CheckableTag } = Tag;

const Pokemon = (props) => {

    const [selectedTags, setSelectedTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const {page, limit, pokemonList} = useSelector((state) => state.pokemon)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemon(limit, page));
    }, [dispatch])

    const {Meta} = Card;

    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
    };
    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {pokemonList && pokemonList.map(item => (
                    <Col span={6} key={item.name}>
                       <div className="col-padding">
                           <Card
                               hoverable
                               cover={<img alt={item.name} src={item.sprites?.front_default}/>}
                               onClick={() => {setIsModalOpen(true); setSelectedPokemon(item)}}
                           >
                               <Meta title={item.name}/>
                               <Divider dashed className="mb-5" />
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
                               <Divider dashed className="mt-5 mb-5" />
                               <p>Experience: <b>{item.base_experience}</b></p>
                           </Card>
                       </div>
                    </Col>
                ))}
            </Row>

            <Modal title={selectedPokemon?.name} open={isModalOpen} footer={null} onCancel={() => {setIsModalOpen(false); setSelectedPokemon(null)}}>
                {selectedPokemon?.stats?.map(item => (
                    <p>{item.stat?.name}: {item.base_stat}</p>
                ))}
                <Divider dashed className="mt-5 mb-5" />
                <Button type="primary" onClick={() => {setIsModalOpen(false); setSelectedPokemon(null)}}>OK</Button>
            </Modal>
        </div>
    );
};

export default Pokemon;