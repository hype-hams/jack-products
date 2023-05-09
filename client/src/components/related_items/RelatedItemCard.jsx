import React, {useState} from 'react';
import The_Modal from './Modal.jsx'

const RelatedItemCard = ({card,  currProduct, handleRelatedItemClick}) => {
    const [showModal, setShowModal] = useState(false);
    const [features, setFeatures] = useState([])
    
    const filterFeatures = () =>{
        var filteredFeatures =[];
        card.features.map(afeature=>{
            var newFeature= {
                value_feature: `${afeature.value_feature}`,
                comparedProductFeature: true,
                currProductFeature: false
            }
            if(currProduct.features.find(currfeature=> currfeature.value_feature === afeature.value_feature)){
                newFeature.currProductFeature = true;
            }
            filteredFeatures.push(newFeature);
        });
        currProduct.features.map(currProductFeature=>{
            var newFeature= {
                value_feature: `${currProductFeature.value_feature}`,
                currProductFeature: true
            }
           filteredFeatures.push(newFeature);
        });

        let memo = new Set();
        filteredFeatures = filteredFeatures.filter(prop=>{
            const dup = memo.has(prop.value_feature);
            memo.add(prop.value_feature);
            return !dup;
        })

        return filteredFeatures;
    }

    const clickHandler = (e) => {
        e.preventDefault();
        
        card.features.map(feature=>{    
            feature.item = card.name,
            feature.value_feature= `${feature.value} ${feature.feature}`
        });
        currProduct.features.map(feature=>{
            feature.item = currProduct.name;
            feature.value_feature= `${feature.value} ${feature.feature}`;
        });
         
        setFeatures(filterFeatures());
        setShowModal(!showModal);
    }

    return (
        <div>
            <form onSubmit={clickHandler}>
                <ul>
                    <div onClick={()=>{handleRelatedItemClick(card.id)}}>
                        <li>Category: {card.category}</li>
                        <li>Name: {card.name}</li>
                        <li>Price: {card.default_price}</li>
                        <li>Rating:{card.rating}</li>
                    </div>
                </ul>
                <input type="submit" value='⭐'/>
            </form>
            {showModal? <The_Modal comparedProductName={card.name} currProductName={currProduct.name} features={features} />: null}
        </div>
    );
} 
export default RelatedItemCard;