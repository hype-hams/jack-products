import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from '../reviews_ratings/components/Stars.jsx'

const OutfitListCard = ({card, onDelete , handleRelatedItemClick}) =>{
    const [photoURL, setPhotoURL] = useState('')
    const [price, setPrice] = useState({final_price: card.default_price, discount:false});

    const GETStyle = (id = card.id) =>{
        const url = `/api/products`
        axios.get(`${url}/${id}/styles`).then((res)=>{
            // const thumbnail_url = res.data.results[0].photos[0].thumbnail_url;
            let result = (res.data.results).filter(style=>style['default?']);
            if(result.length === 0){
                result = [...res.data.results];
            }
            console.log('style:' , result);
            result[0].photos[0].thumbnail_url? setPhotoURL(result[0].photos[0].thumbnail_url): 
                                        setPhotoURL('images/image-not-found-icon.png');
            result[0].sale_price? setPrice( 
                {
                    original_price:result[0].original_price, 
                    final_price: result[0].sale_price, 
                    discount:true
                })
                : setPrice({final_price: result[0].original_price, discount:false}); 
           
        }).catch(err=>{
            console.error(err);
        });
    }


    const onClickHandler = ()=>{
        onDelete(card.id);
    }
    useEffect(()=>{
        GETStyle();
    },[]);


    return (
        <div>
            <button className="OutfitListDeleteBttn" onClick={onClickHandler}><FontAwesomeIcon icon={faTrashCan} /></button>
            <div data-testid="OutfitListCardTest" className='OutfitListCard'>
                    <div onClick={()=>{handleRelatedItemClick(card.id)}}>    
                        <img className="image" src={`${photoURL}`} /> 
                        <div className='cardText'>
                            <p className="category">{card.category}</p>
                            <h3 className='productName'>{card.name}</h3>
                            {!price.discount? 
                            <h4 className='original-price'>
                                ${price.final_price}
                            </h4>: 
                            <span>
                                <h4 className='price-discount'>
                                    <del className='original-price-marked'>
                                        ${price.original_price}
                                    </del> 
                                    &nbsp; ${price.final_price}
                                </h4>
                            </span>}
                            <div className='stars'>
                                <Stars productId={card.id} />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )

}

export default OutfitListCard;