'use client';

import { EventType, useEvents } from '@/components/EventsProvider';
import { useStorage } from '@/components/StorageProvider';
import { faUser, faBell, faBookmark, faCog, faComment, faArchive, faLink, faHouse, faThumbTack, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';
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

const Split = styled.div`
    margin: auto;
    width: 100%;
    height: 2px;
    border-radius: 16px;
    background-color: #444;
`;

type SidebarTab = 
{
    icon: IconDefinition,
    title: string,
    path?: string,
    trigger?: EventType,
    onClick?: () => void,
    isSplitted?: boolean,
    isBottom?: boolean
}

export const SidebarTabs: SidebarTab[] =
[
    {
        icon: faHouse,
        title: 'Главная',
        path: '/',
    },
    {
        icon: faUser,
        title: 'Контакты',
        path: '/contacts',
    },
    {
        icon: faComment,
        title: 'Комнаты',
        path: '/rooms',
    },
    {
        icon: faBookmark,
        title: 'Избранное',
        path: '/saved',
    },
    {
        icon: faArchive,
        title: 'Архив',
        path: '/archive',
    },
    {
        icon: faLink,
        title: 'Порталы',
        path: '/portals',
    },
    {
        icon: faBell,
        title: 'Уведомления',
        isSplitted: true,
        trigger: EventType.CALL_NOTIFICATIONS,
    },
    {
        icon: faThumbTack,
        title: 'Закреплённое',
        trigger: EventType.CALL_PINS,
    },
    {
        icon: faCog,
        title: 'Настройки',
        path: '/settings',
        isBottom: true,
    },
];

const Sidebar: React.FC<any> = ({...props}) => 
{
    const router = useRouter();
    const storage = useStorage();
    const events = useEvents();

    const topTabs = SidebarTabs.filter(tab => !tab.isBottom);
    const bottomTabs = SidebarTabs.filter(tab => tab.isBottom);

    const onTabClick = (tab: SidebarTab, e: MouseEvent) => 
    {
        if (tab.onClick) tab.onClick();
        if (tab.path) router.push(tab.path);
        if (tab.trigger) events?.emit(tab.trigger, {triggerElement: e.target});
    }

    return (
        <SidebarContainer>
            <div>
                {topTabs.map((tab, index) => (
                    <React.Fragment key={index}>
                        {tab.isSplitted && index > 0 && <Split />}
                        <SidebarIcon 
                            isSelected={storage?.selectedTab == tab.title} 
                            onClick={(e) => onTabClick(tab, e)}
                        >
                            <FontAwesomeIcon icon={tab.icon} />
                        </SidebarIcon>
                    </React.Fragment>
                ))}
            </div>
            <div>
                {bottomTabs.map((tab, index) => (
                    <React.Fragment key={index}>
                        {tab.isSplitted && index > 0 && <Split />}
                        <SidebarIcon
                            isSelected={storage?.selectedTab == tab.title} 
                            onClick={(e) => onTabClick(tab, e)}
                        >
                            <FontAwesomeIcon icon={tab.icon} />
                        </SidebarIcon>
                    </React.Fragment>
                ))}
            </div>
        </SidebarContainer>
    );
}

export default Sidebar;
