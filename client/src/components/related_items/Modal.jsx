import React, {useState, useRef, useEffect} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Modal = ({showModal, closeModal, children})=>{

    const modalRef = useRef(null);

    const clickedOutside = (e) => {
        if(showModal && modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    }
    
    useEffect(()=>{
        document.addEventListener('mousedown', clickedOutside);
        return ()=> {
            document.removeEventListener('mousedown', clickedOutside);
        }
    },[showModal])

    return (
        <div>
            {showModal ? (
                <div className='Modal-backg' >
                    <div data-testid="modalTest" className='Modal-inside' ref={modalRef}>
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