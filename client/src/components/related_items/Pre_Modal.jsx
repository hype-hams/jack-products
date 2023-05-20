import React, {useEffect, useState} from 'react';
import Modal from './Modal.jsx';
import { faCodeCompare, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Pre_Modal = ({ card , currProduct, test})=> {
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
            feature.item = card.name;
            feature.value_feature= [feature.value, feature.feature].filter(s => !!s).join(' ')
        });
        currProduct.features.map(feature=>{
            feature.item = currProduct.name;
            feature.value_feature= [feature.value, feature.feature].filter(s => !!s).join(' ')
        });

        setFeatures(filterFeatures());
        setShowModal(!showModal);
    }

    const closeModal = ()=>{
        setShowModal(false)
    }

   // useEffect for test
    if(test){
        useEffect(()=>{
            setShowModal(true);
            setFeatures(filterFeatures());
        }, [test])
    }

    return (
        <div>
            <button className="ComparisonModalBttn" aria-label="Compare Products" title="Compare Products" onClick={clickHandler}><FontAwesomeIcon icon={faCodeCompare}/></button>
            <Modal key={card.id} showModal={showModal} closeModal={closeModal}>
                <table className='comprison-table'>
                    <thead>
                        <tr>
                            <td> <h5 className='comparing'>Comparing...</h5>  </td>
                        </tr>
                        <tr>
                            <th className='CurrProductName'><h3>{currProduct.name}</h3></th>
                            <th></th>
                            <th className='comparedProdName'><h3>{card.name}</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map(item=>
                        <tr key={item.value_feature}>
                            <td>{item.currProductFeature ? <FontAwesomeIcon className='faCheck' icon={faCheck} /> : <area></area>}</td>
                            <td className='productFeature'>{item.value_feature}</td>
                            <td>{item.comparedProductFeature ? <FontAwesomeIcon className='faCheck' icon={faCheck} /> : null}</td>
                        </tr>)}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
}
export default Pre_Modal;

