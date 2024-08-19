'use client';

import React from 'react';
import CreateRoomModal from './CreateRoomModal';
import UserProfileModal from './UserProfileModal';
import UserInviteModal from './UserInviteModal';

const Modals: React.FC = () =>
{

    return (
        <>
            <CreateRoomModal />
            <UserProfileModal />
            <UserInviteModal />
        </>
    );
}

export default Modals;