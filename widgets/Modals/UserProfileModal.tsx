'use client'

import React, { useEffect, useState } from 'react';
import Modal, { ModalButton } from './Modal';
import { EventType, useEvents } from '@/components/EventsProvider';

const UserProfileModal: React.FC = () =>
{
    const events = useEvents();

    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('НЕИЗВЕСТЕН');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const actions = (<>
        
        <ModalButton onClick={handleClose}>Написать сообщение</ModalButton>
        <ModalButton onClick={handleClose}>Добавить в контакты</ModalButton>
    </>);


    useEffect(() =>
    {
        const onOpen = ({...data}) =>
        {
            setUserName(data.name);
            handleOpen();
        }

        events?.on(EventType.CALL_USER_PROFILE, onOpen);
        return () => events?.off(EventType.CALL_USER_PROFILE, onOpen);
    }, 
    []);

    if (!isOpen) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            title={`Профиль ${userName}`}
            actions={actions}
        >
            {userName}
        </Modal>
    );
}

export default UserProfileModal;