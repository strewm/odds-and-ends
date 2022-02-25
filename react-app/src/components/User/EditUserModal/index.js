import React, { useEffect, useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditUser from './EditUser';
// import './EditUser.css';

function EditUserModal() {
    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState(false)

    const onClick = () => {
        setShowModal(true);
    }

    useEffect(() => {
		return () => {setShowModal(false)}
	}, [setShowModal]);

    return (
        <>
            <i id='create-posting' onClick={onClick} className="fa-solid fa-circle-plus"></i>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}


export default EditUserModal;
