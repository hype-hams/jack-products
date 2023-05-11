import React, {useState, useEffect} from 'react';
import axios from 'axios'

const OutfitListCard = ({card, onDelete , handleRelatedItemClick}) =>{
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
        })
    }
    const onClickHandler = ()=>{
        onDelete(card.id);
    }
    useEffect(()=>{
        GETPhotoURL();
    },[]);
    return (
        <div className='OutfitListCard'>
            <button onClick={onClickHandler}>Delete</button>
                <div onClick={()=>{handleRelatedItemClick(card.id)}}>    
                    <img src={`${photoURL}`} /> 
                    <p>{card.category}</p>
                    <h2>{card.name}</h2>
                    <p>${card.default_price}</p>
                    <p>{card.rating}</p>
                </div>
        </div>
    )

}

export default OutfitListCard;