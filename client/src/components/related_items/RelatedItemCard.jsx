import React, {useEffect, useState} from 'react';
import Pre_Modal from './Pre_Modal.jsx'
import axios from 'axios'

const RelatedItemCard = ({card,  currProduct, handleRelatedItemClick}) => {
    
    const [photoURL, setPhotoURL] = useState('')
    
    const GETPhotoURL = (id = card.id) =>{
        const url = `http://localhost:3000/api/products`
        axios.get(`${url}/${id}/styles`).then((res)=>{
            setPhotoURL(res.data.results[0].photos[0].thumbnail_url);
        }).catch(err=>{
            
            console.error(err);
        })
    }

    
    useEffect(()=>{
        GETPhotoURL();
    },[]);

    return (
        <div className='RelatedItemCard'>
            <ul>
                <div onClick={()=>{handleRelatedItemClick(card.id)}} >
                    <img src={`${photoURL}`} />
                    <li>Category: {card.category}</li>
                    <li>Name: {card.name}</li>
                    <li>Price: {card.default_price}</li>
                    <li>Rating:{card.rating}</li>
                </div>
                <Pre_Modal card={card}  currProduct={currProduct} />
            </ul>
        </div>
    );
} 
export default RelatedItemCard;