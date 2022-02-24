import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePickup from './CreatePickup';
import './Pickup.css';


function CreatePickupModal({ posting, setUpdate }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i> */}
      <div id='create-pickup' onClick={() => setShowModal(true)}>S C H E D U L E &nbsp;&nbsp; P I C K U P</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePickup setShowModal={setShowModal} setUpdate={setUpdate} posting={posting} />
        </Modal>
      )}
    </>
  );
}


export default CreatePickupModal;
