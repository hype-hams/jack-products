/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react'
import RelatedItems from '../RelatedItems.jsx';
import RelatedItemCard from '../RelatedItemCard.jsx';
import OutfitListCard from '../OutfitListCard.jsx'
import '@testing-library/jest-dom'
import axios from 'axios';
import Jest from 'jest'


describe(RelatedItems, () => {
    it('Renders Related Items header properly', ()=>{
        const product ={
            "id": 40344,
            "campus": "hr-rfp",
            "name": "Camo Onesie",
            "slogan": "Blend in to your crowd",
            "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
            "category": "Jackets",
            "default_price": "140.00",
            "created_at": "2021-08-13T14:38:44.509Z",
            "updated_at": "2021-08-13T14:38:44.509Z",
            "features": [
                {
                    "feature": "Fabric",
                    "value": "Canvas"
                },
                {
                    "feature": "Buttons",
                    "value": "Brass"
                }
            ]
        };
        const related = [
            40345,
            40346,
            40351,
            40350
        ];
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
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '');
    });
    it('Check if images render properly for Outfit Items List for when photo does not exist', async ()=>{
        // const resProd = await axios.get('http://localhost:3000/api/products/40344/') ;
        // const relatedProdList = await axios.get('http://localhost:3000/api/products/40344/related');
        // const relatedProdExample = await axios.get('http://localhost:3000/api/products/40345/')
        const product ={
            "id": 40344,
            "campus": "hr-rfp",
            "name": "Camo Onesie",
            "slogan": "Blend in to your crowd",
            "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
            "category": "Jackets",
            "default_price": "140.00",
            "created_at": "2021-08-13T14:38:44.509Z",
            "updated_at": "2021-08-13T14:38:44.509Z",
            "features": [
                {
                    "feature": "Fabric",
                    "value": "Canvas"
                },
                {
                    "feature": "Buttons",
                    "value": "Brass"
                }
            ]
        };
        const related = [
            40345,
            40346,
            40351,
            40350
        ];
        const cardProduct = {
            "id": 40345,
            "campus": "hr-rfp",
            "name": "Bright Future Sunglasses",
            "slogan": "You've got to wear shades",
            "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
            "category": "Accessories",
            "default_price": "69.00",
            "created_at": "2021-08-13T14:38:44.509Z",
            "updated_at": "2021-08-13T14:38:44.509Z",
            "features": [
                {
                    "feature": "Lenses",
                    "value": "Ultrasheen"
                },
                {
                    "feature": "UV Protection",
                    "value": null
                },
                {
                    "feature": "Frames",
                    "value": "LightCompose"
                }
            ]
        }
        // console.error(relatedProd.data)
        await render(<RelatedItems currProduct={product} IDlist={related} handleRelatedItemClick={null} />);
        await render(<OutfitListCard card={cardProduct} currProduct={product} handleRelatedItemClick={null} />);
        // console.log(theCard);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '');
    });
    

});