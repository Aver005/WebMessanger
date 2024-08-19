import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface NotificationProps 
{
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
}

enum NotiStatus
{
    Enter,
    Exit,
    Exited
}

const slideIn = keyframes`
    from {transform: translateX(100%);}
    to {transform: translateX(0);}
`;

const slideOut = keyframes`
    from {transform: translateX(0);}
    to {transform: translateX(100%);}
`;

const NotificationContainer = styled.div<{ type?: string }>`
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 16px;
    animation: ${slideIn} 0.3s ease-in-out,
        ${(props) => (props.type === 'exit' ? slideOut : '')} 0.3s ease-in-out forwards;
    animation-delay: ${(props) => (props.type === 'exit' ? '2s' : '0s')};

    ${(props) => 
    {
        switch (props.type) 
        {
            case 'success': return `border-left: 4px solid #4CAF50;`;
            case 'error': return `border-left: 4px solid #F44336;`;
            case 'info': return `border-left: 4px solid #2196F3;`;
            default: return '';
        }
    }}
`;

const NotificationMessage = styled.p`margin: 0;`;

const NotificationBadge: React.FC<NotificationProps> = (
{
    message,
    type = 'info',
    duration = 3000,
}) => 
{
    const [status, setStatus] = useState<NotiStatus>(NotiStatus.Enter);

    useEffect(() => 
    {
        let timer: NodeJS.Timeout;

        if (status === NotiStatus.Enter) 
            timer = setTimeout(
                () => setStatus(NotiStatus.Exit), duration
            );

        return () => clearTimeout(timer);
    }, 
    [status, duration]);

    useEffect(() =>
    {
        const handleAnimationEnd = (e: AnimationEvent) =>
        {
            if (e.animationName === slideOut.name)
                setStatus(NotiStatus.Exited);
        };

        window.addEventListener('animationend', handleAnimationEnd);

        return () =>
        {
            window.removeEventListener('animationend', handleAnimationEnd);   
        }
    }, []);


    return (
        status === NotiStatus.Exited ? null : (
            <NotificationContainer type={status !== NotiStatus.Exit ? type : 'exit'}>
                <NotificationMessage>{message}</NotificationMessage>
            </NotificationContainer>
        )
    );
};

export default NotificationBadge;