'use client'

import React, { useEffect, useState } from 'react';
import Modal, { ModalButton } from './Modal';
import { EventType, useEvents } from '@/components/EventsProvider';

const UserInviteModal: React.FC = () =>
{
    const events = useEvents();

    const [isOpen, setIsOpen] = useState(false);
    const [roomName, setRoomName] = useState('Новая комната');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const actions = (<>
        
        <ModalButton onClick={handleClose}>Закрыть</ModalButton>
    </>);


    useEffect(() =>
    {
        const onOpen = ({...data}) =>
        {
            setRoomName(data.name);
            handleOpen();
        }

        events?.on(EventType.CALL_USER_INVITE, onOpen);
        return () => events?.off(EventType.CALL_USER_INVITE, onOpen);
    }, 
    []);

    if (!isOpen) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            title={`Пригласить в ${roomName}`}
            actions={actions}
        >
            {roomName}
        </Modal>
    );
}

export default UserInviteModal;