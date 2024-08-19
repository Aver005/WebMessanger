'use client'
import IconButton from '@/shared/IconButton';
import { faList, faM, faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-bottom: 10px;
    gap: 12px;
`;

const ToolbarAction = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #8b8b8b;
    width: 30px;
    height: 30px;
    &:hover {color: #555;}
`;

const MessageToolbar: React.FC = () =>
{

    return (
        <ToolbarContainer>
            <IconButton icon={faPaperclip} />
            <IconButton icon={faSmile} />
            <IconButton icon={faM} />
            <IconButton icon={faList} />
        </ToolbarContainer>
    );
}

export default MessageToolbar;