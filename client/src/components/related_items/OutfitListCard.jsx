import React from 'react';

const OutfitListCard = ({card}) =>{

    return (
        <div>
            <ul>
                <li>Category: {card.category}</li>
                <li>Name: {card.name}</li>
                <li>Price: {card.default_price}</li>
                <li>Rating:{card.rating}</li>
            </ul>
        </div>
    )

}

export default OutfitListCard;