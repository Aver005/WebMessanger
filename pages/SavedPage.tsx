'use client'

import { Container, MainContent } from '@/shared/Layouts';
import ChatList from '@/widgets/ChatList/ChatList';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import React from 'react';

const SavedPage: React.FC = () =>
{

    return (
        <Container>
            <Sidebar />
            <ChatList />
            <MainContent>
            </MainContent>
        </Container>
    );
}

export default SavedPage;