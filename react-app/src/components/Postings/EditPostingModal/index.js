import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditPosting from './EditPosting';


function EditPostingModal({ posting }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i> */}
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPosting setShowModal={setShowModal} posting={posting} />
        </Modal>
      )}
    </>
  );
}


export default EditPostingModal;
