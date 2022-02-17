import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePosting from './CreatePosting';

function CreatePostingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePosting setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}


export default CreatePostingModal;
