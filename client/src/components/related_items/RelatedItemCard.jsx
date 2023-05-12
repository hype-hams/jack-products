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
        <div>
            <Pre_Modal key={card.id} card={card}  currProduct={currProduct} />
            <div className='RelatedItemCard'>
                    <div className='RelatedItemCardText' onClick={()=>{handleRelatedItemClick(card.id)}} >
                        <img className='image' src={`${photoURL}`} /> 
                        <p>{card.category}</p>
                        <h3>{card.name}</h3>
                        <h4>${card.default_price}</h4>
                        <p>{card.rating}</p>
                    </div>
            </div>
        </div>
    );
} 
export default RelatedItemCard;