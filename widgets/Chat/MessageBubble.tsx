// components/MessageBubble.tsx
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble, faCopy, faEdit, faEllipsisVertical, faFlag, faReply } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import IconButton from '@/shared/IconButton';
import { EventType, useEvents } from '@/components/EventsProvider';

const MessageContainer = styled.div<{ isOwnMessage: boolean }>`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-direction: ${(props) => (props.isOwnMessage ? 'row-reverse' : 'row')};
    margin: 10px 0;
`;

const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-bottom: 4px;
    margin-right: 16px;
    display: ${(props: any) => (props.isOwnMessage ? 'none' : 'block')};
    cursor: pointer;
`;

const MessageContent = styled.div<{ isOwnMessage: boolean }>`
    background-color: ${(props) => (props.isOwnMessage ? '#e0ffe0' : '#e0e0e0')};
    color: ${(props) => (props.isOwnMessage ? '#333' : '#333')};
    border-radius: 15px;
    padding: 10px 15px;
    max-width: 60%;
    position: relative;
`;

const MessageAuthor = styled.b`
    font-size: 14px;
    margin-bottom: 6px;
    display: block;
`;

const MessageText = styled.p`
    font-size: 16px;
    margin: 0;
`;

const MessageInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    color: #999;
    margin-top: 5px;
`;

const MessageTime = styled.span`
    margin-right: 8px;
`;

const CheckIcon = styled(FontAwesomeIcon)<{ $isRead: boolean }>`
    color: ${(props) => (props.$isRead ? '#4CAF50' : '#999')};
`;

const MessageActions = styled.div`
    margin: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const MessageAction = styled.button<{ isOwnMessage: boolean }>`
    background-color: ${(props) => (props.isOwnMessage ? '#e0ffe0' : '#e0e0e0')};
    border-radius: 8px;
    border: none;
    cursor: pointer;
    padding: 2px;
`;

interface MessageBubbleProps 
{
    text: string;
    author?: string;
    timestamp: string;
    isOwnMessage: boolean;
    isRead: boolean;
    avatarSrc?: string;
}

const MessageBubble = ({ text, author, timestamp, isOwnMessage, isRead, avatarSrc }: MessageBubbleProps) => 
{
    const events = useEvents();
    const [onHover, setHover] = useState(false);

    const handleAvatarClick = () => events?.emit(EventType.CALL_USER_PROFILE, { name: author });

    return (
        <MessageContainer 
            isOwnMessage={isOwnMessage}
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
        >
            {!isOwnMessage && <Avatar onClick={handleAvatarClick} src={avatarSrc || '/images/DefaultUserAvatar.png'} />}
            <MessageContent isOwnMessage={isOwnMessage}>
                <MessageAuthor>{author}</MessageAuthor>
                <MessageText>{text}</MessageText>
                <MessageInfo>
                    <MessageTime>{timestamp}</MessageTime>
                    <CheckIcon icon={isRead ? faCheckDouble : faCheck} $isRead={isRead} />
                </MessageInfo>
            </MessageContent>
            {onHover && <MessageActions>
                {/* <MessageAction isOwnMessage={isOwnMessage}><IconButton icon={faReply} /></MessageAction>
                <MessageAction isOwnMessage={isOwnMessage}><IconButton icon={faFlag} /></MessageAction>
                {isOwnMessage && <MessageAction isOwnMessage={isOwnMessage}><IconButton icon={faEdit} /></MessageAction>}
                <MessageAction isOwnMessage={isOwnMessage}><IconButton icon={faCopy} /></MessageAction> */}
                <MessageAction isOwnMessage={isOwnMessage}><IconButton icon={faEllipsisVertical} /></MessageAction>
            </MessageActions>}
        </MessageContainer>
    );
}

export default MessageBubble;
