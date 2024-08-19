'use client'

import { Container, MainContent } from '@/shared/Layouts';
import ChatList from '@/widgets/ChatList/ChatList';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import React from 'react';

const SettingsPage: React.FC = () =>
{

    return (
        <Container>
            <Sidebar />
            <MainContent>
            </MainContent>
        </Container>
    );
}

export default SettingsPage;