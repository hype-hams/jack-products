/** @jest-environment jsdom */
import {render} from '@testing-library/react'
import RelatedItems from '../RelatedItems.jsx';
import '@testing-library/jest-dom'
import Jest from 'jest'


describe(RelatedItems, () => {
    it('Renders properly', ()=>{
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
});