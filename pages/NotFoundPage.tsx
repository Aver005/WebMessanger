'use client'

import ClassicButton from '@/shared/ClassicButton';
import { Container, MainContent } from '@/shared/Layouts';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

export const ActionButtons = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin: 2vh;
`;

const NotFoundPage: React.FC = () =>
{
    const navigate = useRouter();

    return (
        <Container>
            <Sidebar />
            <MainContent>
                <h1>404 - Страница не найдена</h1>
                <ActionButtons>
                    <ClassicButton label='На главную' onClick={() => navigate.push('/')}/>
                </ActionButtons>
            </MainContent>
        </Container>
    );
}

export default NotFoundPage;