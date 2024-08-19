'use client'

import { Container, MainContent } from '@/shared/Layouts';
import Chat from '@/widgets/Chat/Chat';
import ChatList from '@/widgets/ChatList/ChatList';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import React from 'react';

const RoomsPage: React.FC = () =>
{

    return (
        <Container>
            <Sidebar />
            <ChatList />
            <MainContent>
                <Chat/>
            </MainContent>
        </Container>
    );
}

export default RoomsPage;