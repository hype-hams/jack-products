import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div>
            <button className="OutfitListDeleteBttn" onClick={onClickHandler}><FontAwesomeIcon icon={faTrashCan} /></button>
            <div className='OutfitListCard'>
                    <div onClick={()=>{handleRelatedItemClick(card.id)}}>    
                        <img className="image" src={`${photoURL}`} /> 
                        <p>{card.category}</p>
                        <h3>{card.name}</h3>
                        <h4>${card.default_price}</h4>
                        <p>{card.rating}</p>
                    </div>
            </div>
        </div>
    )

}

export default OutfitListCard;