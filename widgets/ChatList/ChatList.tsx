'use client';

import { EventType, useEvents } from '@/components/EventsProvider';
import { useStorage } from '@/components/StorageProvider';
import IconButton from '@/shared/IconButton';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ChatListContainer = styled.div`
    width: 360px;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
`;

const ChatListHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ChatListItems = styled.div`
    overflow-y: auto;
`;

const ChatListItem = styled.div<{isSelected: boolean}>`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 14px;
    ${(props) => (props.isSelected && 'background-color: #ccc')};
    &:hover {${(props) => (!props.isSelected && 'background-color: #e3e3e3')};}
`;

const ChatAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
    cursor: pointer;
`;

const ChatInfo = styled.div`
    flex: 1;
`;

const ChatName = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const ChatLastMessage = styled.div`
    font-size: 14px;
    color: #8b8b8b;
`;

const ChatListHeaderActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

const DEFAULT_NEW_ROOM_NAME = "Новая комната";
const DEFAULT_NEW_ROOM_TEXT = "Новая комната успешно создана!";
const DEFAULT_USER_AVATAR = "/images/DefaultUserAvatar.png";

export interface Chat 
{
    id: number;
    name: string;
    text: string;
    timestamp?: string;
    avatarSrc?: string;
    creator?: string;
    isSelected?: boolean;
}

const ChatList: React.FC<any> = ({title, ...props}) => 
{
    const events = useEvents();
    const storage = useStorage();

    const handleCreateRoom = () => events?.emit(EventType.CALL_CREATE_ROOM);
    const handleAvatarClick = (name: string) => events?.emit(EventType.CALL_USER_PROFILE, { name: name });
    const handlePickRoom = (id: number) => events?.emit(EventType.PICK_ROOM, { id: id });

    return (
        <ChatListContainer>
            <ChatListHeader>
                <strong>{title || 'Список комнат'}</strong>
                <ChatListHeaderActions>
                    <IconButton icon={faFilter} />
                    <IconButton onClick={handleCreateRoom} icon={faPlus} />
                </ChatListHeaderActions>
            </ChatListHeader>
            <ChatListItems>
                {storage?.rooms.map((chat: any) => (
                    <ChatListItem onClick={() => handlePickRoom(chat.id)} key={chat.name} isSelected={chat.isSelected}>
                        <ChatAvatar onClick={() => handleAvatarClick(chat.name)} src={chat.avatarSrc || DEFAULT_USER_AVATAR} />
                        <ChatInfo>
                            <ChatName>{chat.name || DEFAULT_NEW_ROOM_NAME}</ChatName>
                            <ChatLastMessage>{chat.lastMessageText || DEFAULT_NEW_ROOM_TEXT}</ChatLastMessage>
                        </ChatInfo>
                    </ChatListItem>
                ))}
            </ChatListItems>
        </ChatListContainer>
    );
}

export default ChatList;
