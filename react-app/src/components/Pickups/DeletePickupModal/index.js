import React, { useState, useEffect } from 'react';
import { Modal } from '../../../context/Modal';
import DeletePickup from './DeletePickup';


function DeletePickupModal({ posting, pickup, setDeletePickup }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
		return () => setShowModal(false);
	}, [setShowModal]);

  return (
    <>
      {/* <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i> */}
      <div onClick={() => setShowModal(true)}>Delete</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePickup setShowModal={setShowModal} posting={posting} pickup={pickup} setDeletePickup={setDeletePickup}/>
        </Modal>
      )}
    </>
  );
}


export default DeletePickupModal;
