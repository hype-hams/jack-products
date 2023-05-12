import React, {useState} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Modal = ({showModal, closeModal, children})=>{

    return (
        <div>
            {showModal ? (
                <div className='Modal-backg'>
                    <div className='Modal-inside'>
                        <button className="closeModal" onClick={()=>{closeModal();}}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    {children}
                </div> 
            </div>): null}
        </div>
      
    );
}

export default Modal;