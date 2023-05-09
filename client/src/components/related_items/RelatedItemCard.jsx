import React, {useState} from 'react';
import Modal from './Modal.jsx'

const RelatedItemCard = ({card,  currProduct}) => {
    const [showModal, setShowModal] = useState(false);
    const [features, setFeatures] = useState([])
    const clickHandler = (e) => {
        e.preventDefault();
        card.features.map(feature=>{
            feature.item = card.name
        })
        currProduct.features.map(feature=>{
            feature.item = currProduct.name;
        })
        setFeatures([...currProduct.features, ...card.features])
        setShowModal(!showModal);


    }
    // console.log(card);
    return (
        <div>
            <form onSubmit={clickHandler}>
                <ul>
                    <li>Category: {card.category}</li>
                    <li>Name: {card.name}</li>
                    <li>Price: {card.default_price}</li>
                    <li>Rating:{card.rating}</li>
                </ul>
                <input type="submit" value='⭐'/>
            </form>
            {showModal? <Modal comparedProductName={card.name} currProductName={currProduct.name} features={features} />: null}
        </div>
    );
} 
export default RelatedItemCard;