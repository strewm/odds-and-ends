import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePosting from './CreatePosting';
import './CreatePosting.css';

function CreatePostingModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <i id='create-posting' onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i>
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
