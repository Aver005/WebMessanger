import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageToolbar from './MessageToolbar';
import { useStorage } from '@/components/StorageProvider';
import { EventType, useEvents } from '@/components/EventsProvider';

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow-y: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    padding: 0 15px;
    overflow-y: auto;
`;

const InputContainer = styled.div`
`;

interface Message 
{
    id?: number;
    author?: string;
    text: string;
    timestamp: string;
    isOwnMessage: boolean;
    isRead: boolean;
    avatarSrc?: string;
}

const Chat: React.FC = () => 
{
    const storage = useStorage();
    const events = useEvents();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

    const chat = useMemo(() => {
        return storage?.rooms.find((room: any) => room.id === storage?.selectedRoom);
    }, [storage?.rooms, storage?.selectedRoom]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => 
    {
        if (!newMessage.trim()) return;

        const newMessageObj: Message = 
        {
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwnMessage: true,
            isRead: false,
        };
        
        setNewMessage('');
        events?.emit(EventType.SEND_MESSAGE, newMessageObj);
    };

    useEffect(() => 
    {
        const container = messagesContainerRef.current;
        if (container && shouldScrollToBottom) 
            container.scrollTop = container.scrollHeight;
    }, 
    [chat.events, shouldScrollToBottom]);

    const handleScroll = () => 
    {
        const container = messagesContainerRef.current;
        if (!container) return;
        setShouldScrollToBottom(container.scrollTop + container.clientHeight >= container.scrollHeight);
    };

    return (
        <>
            <ChatHeader title={chat.name || "Новый чат"} />
            <ChatContainer>
                <MessagesContainer ref={messagesContainerRef} onScroll={handleScroll}>
                    {chat.events && chat.events.map((message: any) => (
                        <MessageBubble
                            key={message.id}
                            author={message.author}
                            text={message.text}
                            timestamp={message.timestamp}
                            isOwnMessage={message.isOwnMessage}
                            isRead={message.isRead}
                            avatarSrc={message.avatarSrc}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </MessagesContainer>
                <InputContainer>
                    <MessageInput 
                        value={newMessage} 
                        onSend={handleSendMessage}
                        placeholder="Напишите что-нибудь..." 
                        onChange={(e: any) => setNewMessage(e.target.value)}
                        onKeyPress={(e: any) => 
                        {
                            if (e.key === 'Enter') 
                                handleSendMessage();
                        }}
                    />
                    <MessageToolbar />
                </InputContainer>
            </ChatContainer>
        </>
    );
};

export default Chat;