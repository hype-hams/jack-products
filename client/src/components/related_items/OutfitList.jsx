import React, {useState} from 'react';
// import Card from './RelatedItemCard.jsx'
import OutfitListCard from './OutfitListCard.jsx'

const OutfitList = ({currProduct}) => {
    const [list, setList] = useState([]);
    
    
    const addCard = (e)=>{
        e.preventDefault();
        let collection = []
        collection.push(currProduct)
        //getting rid of potential duplicates
        let memo = new Set();
        collection = collection.filter(prop=>{
            const dup = memo.has(prop.id);
            memo.add(prop.id);
            return !dup;
        })
        console.log(collection)
        setList(collection)
    }


    return (
        <div>
            <header>
                <h2>Outfit List</h2>
            </header>
            <form onSubmit={addCard}>
                <input type="submit" value="Add to Outfit" />
            </form>
            {list.map(card=> <OutfitListCard card={card}/>)}
        </div>
    )
}


export default OutfitList;