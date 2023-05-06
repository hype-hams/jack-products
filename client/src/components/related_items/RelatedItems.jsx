//main file for component, feel free to rename it or delete as you see fit..
//Also, feel free to add as many .jsx files in this folder 
import React, {useState} from 'react';
import RelatedItemsList from './RelatedItemsList.jsx'
import data from './mockData/mockData.js'

const RelatedItems = (props) => {
    //send get requests to routes here

    return (
    <div>
        <RelatedItemsList relatedData={data} />
        <OutfitList />
    </div>
  );
}

export default RelatedItems;
