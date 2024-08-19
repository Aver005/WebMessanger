'use client';

import ChatList from '@/widgets/ChatList/ChatList';
import Chat from '@/widgets/Chat/Chat';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = styled.div`
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

export default function HomePage() 
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
