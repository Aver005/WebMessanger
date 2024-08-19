'use client'

import React, { useEffect, useState } from 'react';
import Modal, { ModalButton } from './Modal';
import { EventType, useEvents } from '@/components/EventsProvider';

const CreateRoomModal: React.FC = () =>
{
    const events = useEvents();

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const createRoom = () =>
    {
        events?.emit(EventType.CREATE_ROOM, {name: "ЗАГОЛОВОК КОМНАТЫ"});
        handleClose();
    };

    const actions = (<>
        <ModalButton onClick={handleClose}>Отмена</ModalButton>
        <ModalButton onClick={createRoom}>Создать</ModalButton>
    </>);


    useEffect(() =>
    {
        events?.on(EventType.CALL_CREATE_ROOM, handleOpen);
        return () => events?.off(EventType.CALL_CREATE_ROOM, handleOpen);
    }, 
    []);

    if (!isOpen) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            title='Создать комнату'
            actions={actions}
        >
            Test
        </Modal>
    );
}

export default CreateRoomModal;