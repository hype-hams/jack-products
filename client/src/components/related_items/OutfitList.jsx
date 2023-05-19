import React, {useState, useEffect} from 'react';
// import Card from './RelatedItemCard.jsx'
import OutfitListCard from './OutfitListCard.jsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Carousel from './Carousel.jsx';

const OutfitList = ({currProduct, currPhotoURL, handleRelatedItemClick, test}) => {
    const [list, setList] = useState([]);
    const [lastIndex, setLastIndex] = useState(4)
    const [startIndex, setStartIndex] = useState(0);

    const eventHandler = (e) => {
        e.preventDefault();
        addCard();
    }
    
    
    const addCard = ()=>{
       
        let collection = [];
        if(JSON.parse(localStorage.getItem("OutfitList"))){
            collection = [...JSON.parse(localStorage.getItem("OutfitList"))]
        }
        collection.push(currProduct)
        //getting rid of potential duplicates
        let memo = new Set();
        collection = collection.filter(prop=>{
            const dup = memo.has(prop.id);
            memo.add(prop.id);
            return !dup;
        })
        //console.log(collection)
        setList(collection)
        localStorage.setItem("OutfitList", JSON.stringify(collection))
       
    }
    const effectHandler = () =>{
        // localStorage.setItem("OutfitList", JSON.stringify(list));
        let outfitList = []
        if(JSON.parse(localStorage.getItem("OutfitList"))){
            outfitList= [...JSON.parse(localStorage.getItem("OutfitList"))]
        }
        // console.log(outfitList);
        setList(outfitList);

    }

    const deleteCard = (id) => {
        let newList = [...list];
        newList = newList.filter(item=> item.id !== id );
        setList(newList);
        localStorage.removeItem("Outfit");
        localStorage.setItem("OutfitList", JSON.stringify(newList));
    }

    useEffect(()=>{
        effectHandler();
    },[]);

    if(test){
        useEffect(()=>{
            addCard();
        },[test])
    }

    return (
        <div >
            <header>
                <h2>Outfit List</h2>
            </header>
            <div className='OutfitList'>
                <button className='addToOutfitBttn' onClick={eventHandler}>
                    <div className='faPlus'>
                        <FontAwesomeIcon  icon={faPlus} />
                    </div> 
                    <p>Add Current Product</p> 
                    <p> To Outfit</p>
                </button>
                <Carousel startIndex={startIndex} 
                            setStartIndex={setStartIndex} 
                            lastIndex={lastIndex} 
                            setLastIndex={setLastIndex}
                            maxIndex={list.length}>
                   {list ? list.map((card, index)=>{
                        if(index >= startIndex && index < lastIndex) 
                            return <OutfitListCard key={card.id} card={card} 
                                onDelete={deleteCard} handleRelatedItemClick={handleRelatedItemClick}/>;
                    }) : null}
                </Carousel>
            </div>
        </div>
    )
}


export default OutfitList;