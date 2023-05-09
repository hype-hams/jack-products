import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

const The_Modal = ({comparedProductName, currProductName, features})=> {
    
    return (
        <table>
            <tr>
                <th>{currProductName}</th>
                <th>  </th>
                <th>{comparedProductName}</th>
            </tr>
                {features.map(item=>
                <tr>
                    <td>{item.currProductFeature ? '✅' : null}</td>
                    <td>{item.value_feature}</td>
                    <td>{item.comparedProductFeature ? '✅' : null}</td>
                </tr>)}
        </table>
    );
}
export default The_Modal;

