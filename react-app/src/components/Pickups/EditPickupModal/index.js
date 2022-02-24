import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditPickup from './EditPickup';
import '../CreatePickupModal/Pickup.css';


function EditPickupModal({ posting, pickup, setEditPickup }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <i onClick={() => setShowModal(true)} className="fa-solid fa-circle-plus"></i> */}
      <div id='edit-pickup' onClick={() => setShowModal(true)}>Edit</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPickup setShowModal={setShowModal} posting={posting} pickup={pickup} setEditPickup={setEditPickup} />
        </Modal>
      )}
    </>
  );
}


export default EditPickupModal;
