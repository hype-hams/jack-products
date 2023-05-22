import React, { useState, useRef } from 'react';

function PhotoModal({ url }) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = 'images/image-not-found-icon.png';
  };

  return (
    <div
      className="modal-button"
      data-testid="modalTest"
    >
      <button
        type="button"
        data-testid="buttonClick"
        aria-label="modal-tester"
        onClick={() => setShowModal(!showModal)}
      >
        <img
          className="review-photo"
          loading="lazy"
          src={url}
          onError={handleError}
          alt="..."
        />
      </button>
      {
          showModal ? (
            <div
              className="Modal-backg"
              onClick={(e) => {
                if (modalRef.current.contains(e.target)) {
                  return;
                }
                setShowModal(false);
              }}
            >
              <div ref={modalRef} className="Modal-photo">
                <img
                  className="review-photo-expanded"
                  src={url}
                  onError={handleError}
                  alt="..."
                />
                <button
                  type="button"
                  className="close-modal-photo"
                  onClick={() => setShowModal(false)}
                >
                  x
                </button>

              </div>
            </div>
          ) : null
        }

    </div>

  );
}

export default PhotoModal;
