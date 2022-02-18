import React, { useState, useEffect } from 'react';
import { Modal } from '../../../context/Modal';
import DeletePosting from './DeletePosting';


function DeletePostingModal({ posting }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
		return () => setShowModal(false);
	}, []);

  return (
    <>
      <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i>
      {/* <button onClick={() => setShowModal(true)}>Edit</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePosting setShowModal={setShowModal} posting={posting} />
        </Modal>
      )}
    </>
  );
}


export default DeletePostingModal;
