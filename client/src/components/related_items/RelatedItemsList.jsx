import React, {useState, useEffect} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx'
import axios from 'axios';
import Promise from 'bluebird'

const RelatedItemsList = ({IDlist,  currProduct, handleRelatedItemClick}) => {
    const [list, setList] = useState ([])
    const [responses, setResponses] = useState([]);
    // console.log(IDList)
    const GETRelatedProductsProps = ()=>{
        const url = `http://localhost:3000/api/products` 
        const promises = IDlist.map(id=> axios.get(`${url}/${id}`));
        Promise.all([...promises]).then(props=> {
            setResponses(props)
        })
    }

    const listHandler = ()=>{
        const data = []
        responses.forEach(res=>{
            console.log(res.data)
            data.push(res.data);
        });
        setList(data)
    }

    useEffect(()=>{
        GETRelatedProductsProps();
    }, [IDlist])

    useEffect(()=>{
        listHandler();
    }, [responses])

    return (
        <div>
        {list.map(card=><RelatedItemCard card={card} currProduct={ currProduct} handleRelatedItemClick={handleRelatedItemClick} />)}
        </div>
    )
}

export default RelatedItemsList;