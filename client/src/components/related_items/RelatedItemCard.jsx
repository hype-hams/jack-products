import React, {useEffect, useState} from 'react';
import Pre_Modal from './Pre_Modal.jsx'
import axios from 'axios'

const RelatedItemCard = ({card,  currProduct, handleRelatedItemClick}) => {
    
    const [photoURL, setPhotoURL] = useState('')
    
    const GETPhotoURL = (id = card.id) =>{
        const url = `http://localhost:3000/api/products`
        axios.get(`${url}/${id}/styles`).then((res)=>{
            const thumbnail_url = res.data.results[0].photos[0].thumbnail_url;
            if(thumbnail_url !== null){
                setPhotoURL(thumbnail_url);
            } else {
                setPhotoURL('images/image-not-found-icon.png');
            }
        }).catch(err=>{
            console.error(err);
        });
    }
    
    useEffect(()=>{
        GETPhotoURL();
    },[]);

    return (
        <div className='RelatedItemCard'>
                <div onClick={()=>{handleRelatedItemClick(card.id)}} >
                    <img src={`${photoURL}`} /> 
                    <p>{card.category}</p>
                    <h2>{card.name}</h2>
                    <p>${card.default_price}</p>
                    <p>{card.rating}</p>
                </div>
                <Pre_Modal key={card.id} card={card}  currProduct={currProduct} />
        </div>
    );
} 
export default RelatedItemCard;