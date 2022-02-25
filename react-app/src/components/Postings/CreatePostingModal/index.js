import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePosting from './CreatePosting';
import '../Posting.css';

function CreatePostingModal({ closeNav }) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
    closeNav();
  }

  return (
    <>
      <i id='create-posting' onClick={onClick} className="fa-solid fa-circle-plus"></i>
      {/* <i id='create-posting' onClick={() => setShowModal(true)} onClick={closeNav} className="fa-solid fa-circle-plus"></i> */}
      {/* <button onClick={() => setShowModal(true)}>+</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePosting setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}


export default CreatePostingModal;
