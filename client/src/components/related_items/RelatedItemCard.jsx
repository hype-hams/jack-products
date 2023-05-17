import React, {useEffect, useState} from 'react';
import Pre_Modal from './Pre_Modal.jsx'
import axios from 'axios'
import Stars from '../reviews_ratings/components/Stars.jsx'

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
                    <div onClick={()=>{handleRelatedItemClick(card.id)}} >
                        <img data-testid="testImage" className="image" src={`${photoURL}`} /> 
                        <div className='cardText'>
                            <p className="category">{card.category}</p>
                            <h3 className='productName'>{card.name}</h3>
                            <h4 className='price'>${card.default_price}</h4>
                            <div className='stars'>
                                <Stars productId={card.id} />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
} 
export default RelatedItemCard;