import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Pre_Modal from './Pre_Modal.jsx'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from '../reviews_ratings/components/Stars.jsx'

const Card = ({card, onDelete , currProduct, handleRelatedItemClick, relatedItems}) =>{
    const [photoURL, setPhotoURL] = useState(null)
    const [price, setPrice] = useState({final_price: card.default_price, discount:false});
    const [avgRate, setAvgRate] = useState(null)

    const GETStyle = (id = card.id) =>{
        const url = `/api/products`
        axios.get(`${url}/${id}/styles`).then((res)=>{
            // const thumbnail_url = res.data.results[0].photos[0].thumbnail_url;
            let result = (res.data.results).filter(style=>style['default?']);
            if(result.length === 0){
                result = [...res.data.results];
            }
            // console.log('style:' , result);
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

    const getStars = () => {
        const metaData = axios.get(`/api/reviews/meta?product_id=${card.id}`)
        .then(response => {
            setAvgRate(response.data.ratings)
        })
    }

    const onClickHandler = ()=>{
        onDelete(card.id);
    }

    useEffect(()=>{
        GETStyle();
        getStars();
    },[]);


    const cardContent = () => {
        return (
            <div onClick={()=>{handleRelatedItemClick(card.id)}}>
                        {photoURL && <img data-testid="testImage"
                        loading="lazy"
                        className="image" src={`${photoURL}`} alt="images/image-not-found-icon.png"/>}
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
                                    {avgRate && <Stars avgRate={avgRate} />}
                                </div>
                        </div>
                </div>

            );
    }


    return (
        <div>
            {relatedItems?
                <div>
                    <Pre_Modal key={card.id} card={card}  currProduct={currProduct} />
                    <div className='RelatedItemCard'>
                       {cardContent()}
                    </div>
                </div>
                :
                <div>
                    <button className="OutfitListDeleteBttn"
                    aria-label="Delete Outfit from list"
                    title="Delete"
                    onClick={onClickHandler}><FontAwesomeIcon icon={faTrashCan}/></button>
                    <div data-testid="OutfitListCardTest" className='OutfitListCard'>
                        {cardContent()}
                    </div>
                </div>
            }
        </div>
    )

}

export default Card;

