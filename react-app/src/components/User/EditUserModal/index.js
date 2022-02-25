import React, { useEffect, useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditUser from './EditUser';
import './EditUser.css';

function EditUserModal({ showModal, setShowModal }) {

    useEffect(() => {
        return () => {setShowModal(false)}
    }, [setShowModal]);

    const onClick = () => {
        setShowModal(true);
    };


    return (
        <>
            <i id='edit-user' onClick={onClick} className="fa-solid fa-pencil"></i>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}


export default EditUserModal;
