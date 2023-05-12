//main file for component, feel free to rename it or delete as you see fit..
//Also, feel free to add as many .jsx files in this folder 
import React, {useState, useEffect} from 'react';
import RelatedItemsList from './RelatedItemsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';
 
const RelatedItems = ({currProduct, currPhotoURL, IDlist, handleRelatedItemClick}) => {
    
    return (
    <div className='RelatedItems'>
      <header>
        <h1>Related Items</h1>
      </header>
        <div>
          <RelatedItemsList key={currProduct.id} IDlist={IDlist} currProduct={currProduct} handleRelatedItemClick= {handleRelatedItemClick} />
        </div>
        <div>
          <OutfitList key={currProduct.id} currPhotoURL={currPhotoURL} currProduct={currProduct} handleRelatedItemClick={handleRelatedItemClick}/>
        </div>
    </div>
  );
}

export default RelatedItems;
