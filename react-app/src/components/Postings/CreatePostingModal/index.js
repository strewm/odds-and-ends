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
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePosting setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}


export default CreatePostingModal;
