import React, {useEffect, useState} from 'react';

const Modal = ({comparedProductName, currProductName, features})=> {
    
    return (
        <table>
            <tr>
                <th>{currProductName}</th>
                <th>  </th>
                <th>{comparedProductName}</th>
            </tr>
                {features.map(item=>
                <tr>
                    <td>{item.item === currProductName ? '✅' : null}</td>
                    <td>{item.value} {item.feature}</td>
                    <td>{item.item === comparedProductName ? '✅' : null}</td>
                </tr>)}
        </table>
    );
}
export default Modal;

