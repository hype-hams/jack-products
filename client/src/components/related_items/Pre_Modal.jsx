import React, {useEffect, useState} from 'react';
import Modal from './Modal.jsx';

const Pre_Modal = ({ card , currProduct})=> {
    const [features, setFeatures] = useState([])
    const [showModal,setShowModal] = useState(false);

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
    const closeModal = ()=>{
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={clickHandler}>⭐</button>
            <Modal showModal={showModal} closeModal={closeModal}>
                <table>
                    <tr>
                        <th>{currProduct.name}</th>
                        <th> </th>
                        <th>{card.name}</th>
                    </tr>
                        {features.map(item=>
                        <tr>
                            <td>{item.currProductFeature ? '✅' : null}</td>
                            <td>{item.value_feature}</td>
                            <td>{item.comparedProductFeature ? '✅' : null}</td>
                        </tr>)}
                </table>
            </Modal>
        </div>
    );
}
export default Pre_Modal;

