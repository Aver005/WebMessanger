'use client'

import { Container, MainContent } from '@/shared/Layouts';
import Chat from '@/widgets/Chat/Chat';
import ChatList from '@/widgets/ChatList/ChatList';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import React from 'react';

const DirectsPage: React.FC = () =>
{

    return (
        <Container>
            <Sidebar />
            <ChatList title='Личные комнаты' />
            <MainContent>
                <Chat/>
            </MainContent>
        </Container>
    );
}

export default DirectsPage;