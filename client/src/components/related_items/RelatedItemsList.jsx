import React, {useState} from 'react';
import Card from './Card.jsx'
const RelatedItemsList = ({relatedData}) => {

    return (
        <div>
            {relatedData.map(card=><Card card={card}/>)}
        </div>
    )
}