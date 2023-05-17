/** @jest-environment jsdom */
import RelatedItems from '../RelatedItems.jsx';
import RelatedItemCard from '../RelatedItemCard.jsx';
import OutfitListCard from '../OutfitListCard.jsx'
import Pre_Modal from '../Pre_Modal.jsx';
import Modal from '../Modal.jsx';
import OutfitList from '../OutfitList.jsx';

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios';
import Jest from 'jest'
import {product, related, cardProduct, noPhotoURL} from './mockData.js'



describe(RelatedItems, () => {
    it('Renders Related Items header properly', ()=>{
        const {getByText} = render(<RelatedItems currProduct={product} IDlist={related} handleRelatedItemClick={null} />);
        expect(getByText('Related Items')).toBeInTheDocument();
    });

    it('Renders OutFit list header properly', async ()=> {
        const resProd = await axios.get('http://localhost:3000/api/products/40344/') ;
        const relatedProd = await axios.get('http://localhost:3000/api/products/40344/related')
        // console.error(res.data)
        // const {getByText} = render(<RelatedItems currProduct={product} IDlist={related} handleRelatedItemClick={null} />);
        const {getByText}= render(<RelatedItems currProduct={resProd.data} IDlist={relatedProd.data} handleRelatedItemClick={null} />);
        expect(getByText('Outfit List')).toBeInTheDocument();
    });

    it('Check if images render properly for Related Items List for when photo does not exist', async ()=>{
        const resProd = await axios.get('http://localhost:3000/api/products/40344/') ;
        const relatedProdList = await axios.get('http://localhost:3000/api/products/40344/related');
        const relatedProdExample = await axios.get('http://localhost:3000/api/products/40345/')
        // console.error(relatedProd.data)
        await render(<RelatedItems currProduct={resProd.data} IDlist={relatedProdList.data} handleRelatedItemClick={null} />);
        await render(<RelatedItemCard card={relatedProdExample.data} currProduct={resProd.data} handleRelatedItemClick={null} />);
        // console.log(theCard);
        const image = await screen.getByTestId('testImage');
        expect(image).toBeVisible();
    });
    it('Check if images render properly for Outfit Items List for when photo does not exist', async ()=>{
        await render(<RelatedItems currProduct={product} IDlist={related} handleRelatedItemClick={null} />);
        await render(<OutfitListCard card={cardProduct} currProduct={product} handleRelatedItemClick={null} />);
        const image = await screen.getByRole('img');
        expect(image).toBeVisible();
    });

    it('Check if modal is poping up properly', async ()=>{
        await render(<Pre_Modal currProduct={product}  card={cardProduct} test={true}/>);
        const modalRender= await screen.getByTestId('modalTest');
        expect(modalRender).toBeVisible();
    });
    it('Check if OutfitList card renders properly when added', async ()=>{
        await render(<OutfitList currProduct={product} currPhotoURL={null} handleRelatedItemClick={null} test={true}/>)
        const cardRender = await screen.getByTestId('OutfitListCardTest');
        expect(cardRender).toBeVisible();
    })

});