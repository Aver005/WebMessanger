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
    width: 100%;
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

    const chevron = 
        (e: any) => events?.emit(EventType.CALL_ROOM_PROFILE, {triggerElement: e.target});
    const invite = 
        () => events?.emit(EventType.CALL_USER_INVITE, {name: "Комната 1"});
    const search = 
        (e: any) => events?.emit(EventType.CALL_MESSAGE_SEARCH, {triggerElement: e.target});

    return (
        <ChatHeaderContainer>
            <ChatTitle>
                <strong>{title}</strong>
                <IconButton onClick={chevron} icon={faChevronDown} />
            </ChatTitle>
            <ChatActions>
                <IconButton onClick={invite} icon={faUserPlus} />
                <IconButton icon={faPhone} />
                <IconButton onClick={search} icon={faSearch} />
                <IconButton icon={faEllipsisVertical} />
            </ChatActions>
        </ChatHeaderContainer>
    );
}

export default ChatHeader;
