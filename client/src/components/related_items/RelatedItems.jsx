//main file for component, feel free to rename it or delete as you see fit..
//Also, feel free to add as many .jsx files in this folder 
import React, {useState, useEffect} from 'react';
import RelatedItemsList from './RelatedItemsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';
 
const RelatedItems = ({currProduct, IDlist, handleRelatedItemClick}) => {
    //send get requests to routes here
    // const [IDlist, setIDList] = useState([]);

    // const GETRelatedProductsID = () => {  
    //   var url = `http://localhost:3000/api/related/${currProduct.id}`
    //   axios.get(url).then(response=>{
    //     setIDList(response.data);
    //   }).catch(err=>{
    //     console.error('error:', err);
    //   })
    // }

    // // const GETRelatedProductsReviews = () => {  
    // //   var url = `http://localhost:3000/api/reviews/${id}`
    // //   axios.get(url).then(response=>{
    // //   }).catch(err=>{
    // //     console.error('error:', err);
    // //   })
    // // }


    // useEffect(()=> {
    //   GETRelatedProductsID();
    // }, [])

    return (
    <div>
      <header>
        <h2>Related Items</h2>
      </header>
        <RelatedItemsList key={currProduct.id} IDlist={IDlist} currProduct={currProduct} handleRelatedItemClick= {handleRelatedItemClick} />
        <OutfitList key={currProduct.id} currProduct={currProduct} handleRelatedItemClick={handleRelatedItemClick}/>
    </div>
  );
}

export default RelatedItems;
