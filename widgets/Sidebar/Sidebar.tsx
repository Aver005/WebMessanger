import { faUser, faBell, faBookmark, faCog, faComment, faArchive, faAtom, faLink, faHouse, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 80px;
    background-color: #1f1f1f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const SidebarIcon = styled.div<{isSelected?: boolean}>`
    margin: 32px 0;
    color: ${(props: any) => props.isSelected ? '#eee' : '#888'};
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    ${(props: any) => !props.isSelected && '&:hover {color: #eee;}'}
`;

const SidebarSection = styled.div`
`;

const Split = styled.div`
    margin: auto;
    width: 100%;
    height: 2px;
    border-radius: 16px;
    background-color: #444;
`;

const Sidebar = () => (
    <SidebarContainer>
        <SidebarSection>
            <SidebarIcon><FontAwesomeIcon icon={faHouse} /></SidebarIcon>
            <SidebarIcon><FontAwesomeIcon icon={faUser} /></SidebarIcon>
            <SidebarIcon isSelected={true}><FontAwesomeIcon icon={faComment} /></SidebarIcon>
            <SidebarIcon><FontAwesomeIcon icon={faBell} /></SidebarIcon>
            <SidebarIcon><FontAwesomeIcon icon={faBookmark} /></SidebarIcon>
            <SidebarIcon><FontAwesomeIcon icon={faArchive} /></SidebarIcon>
            <SidebarIcon><FontAwesomeIcon icon={faLink} /></SidebarIcon>
            <Split />
            <SidebarIcon><FontAwesomeIcon icon={faThumbTack} /></SidebarIcon>
        </SidebarSection>
        <SidebarSection>
            <SidebarIcon><FontAwesomeIcon icon={faCog} /></SidebarIcon>
        </SidebarSection>
    </SidebarContainer>
);

export default Sidebar;
