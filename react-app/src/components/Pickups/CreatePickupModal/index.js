import React, { useState, useEffect } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePickup from './CreatePickup';


function CreatePickupModal({ posting, setUpdate }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i> */}
      <button onClick={() => setShowModal(true)}>Schedule Pickup</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePickup setShowModal={setShowModal} setUpdate={setUpdate} posting={posting} />
        </Modal>
      )}
    </>
  );
}


export default CreatePickupModal;
