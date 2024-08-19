import { EventType, useEvents } from '@/components/EventsProvider';
import IconButton from '@/shared/IconButton';
import { faChevronDown, faEllipsisVertical, faList, faPhone, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ChatHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: #f4f4f4;
    border-left: 1px solid #eee;
`;

const ChatTitle = styled.div`
    display: flex;
    font-size: 20px;
    font-weight: bold;
    gap: 8px;
    align-items: center;
`;

const ChatActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-right: 10px;
`;

const ChatHeader: React.FC<any> = ({title}) => 
{ 
    const events = useEvents();
    const handleInviteClick = () => events?.emit(EventType.CALL_USER_INVITE, {name: "Комната 1"});

    return (
        <ChatHeaderContainer>
            <ChatTitle>
                <strong>{title}</strong>
                <IconButton icon={faChevronDown} />
            </ChatTitle>
            <ChatActions>
                <IconButton onClick={handleInviteClick} icon={faUserPlus} />
                <IconButton icon={faPhone} />
                <IconButton icon={faSearch} />
                <IconButton icon={faEllipsisVertical} />
            </ChatActions>
        </ChatHeaderContainer>
    );
}

export default ChatHeader;
