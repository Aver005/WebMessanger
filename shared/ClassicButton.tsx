'use client'
import React from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
    background-color: #1f1f1f;
    color: #fff;
    border: none;
    padding: 1vh 2vh;
    border-radius: 1vh;
    cursor: pointer;
    font-size: 1.6vh;

    &:hover
    {
        background-color: #3f3f3f;
        transition: background-color 0.1s ease-in-out;
    }

    &:active
    {
        background-color: #5f5f5f;
        color: #ccc;
        transform: scale(0.95);
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    &:disabled 
    {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ClassicButton: React.FC<any> = ({label, onClick, ...props}) =>
{

    return (
        <StyledButton onClick={onClick}>{label}</StyledButton>
    );
}

export default ClassicButton;