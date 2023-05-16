import React, {useState, useRef, useEffect} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Modal = ({showModal, closeModal, children})=>{

    const modalRef = useRef(null);

    const clickedOutside = (e) => {

    }
    
    
    useEffect(()=>{

    },[showModal])

    return (
        <div>
            {showModal ? (
                <div className='Modal-backg' ref={modalRef} onClick={closeModal}>
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