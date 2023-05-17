import React, {useState, useEffect} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx'
import axios from 'axios';
import Promise from 'bluebird'

const RelatedItemsList = ({IDlist,  currProduct, handleRelatedItemClick}) => {
    const [list, setList] = useState ([])
    const [responses, setResponses] = useState([]);

    const GETRelatedProductsProps = ()=>{
        const url = `http://localhost:3000/api/products` 
        const promises = IDlist.map(id=> axios.get(`${url}/${id}`));
        Promise.all([...promises]).then(props=> {
            setResponses(props)
        });
    };

    const listHandler = ()=>{
        const data = []
        responses.forEach(res=>{
            data.push(res.data);
        });
        setList(data)
    };


    useEffect(()=>{
        GETRelatedProductsProps();
    }, [IDlist]);

    useEffect(()=>{
        listHandler();
    }, [responses]);

    return (
        <div className='RelatedItemsList'>
            {list.map(card=><RelatedItemCard key={card.id} card={card} currProduct={ currProduct} handleRelatedItemClick={handleRelatedItemClick} />)}
        </div>
    );
}

export default RelatedItemsList;