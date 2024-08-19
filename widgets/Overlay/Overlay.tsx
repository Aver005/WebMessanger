'use client'

import { EventType, useEvents } from '@/components/EventsProvider';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { OverlayEventData, OverlayEvents } from './OverlayEvents';
import styled from 'styled-components';

const OverlayContent = styled.div`
    position: absolute;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    max-width: 90%;
    width: 500px;
    padding: 20px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
    margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
    font-size: 1.2rem;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 1.5rem;
    color: #888;
`;

const HeaderButtons = styled.div`
    display: flex;
    margin-right: auto;
`;

const Overlay: React.FC = () => 
{
    const events = useEvents();
    const [overlayData, setOverlayData] = useState<OverlayEventData | null>(null);
    const [coords, setCoords] = useState<[number, number] | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const close = () => setOverlayData(null);

    useEffect(() => 
    {
        const handlers = Object.entries(OverlayEvents).reduce((acc, [eventType, oData]) => 
        {
            acc[eventType as unknown as EventType] = (data: any) =>
            {
                setCoords(
                [
                    data.triggerElement?.getBoundingClientRect().left, 
                    data.triggerElement?.getBoundingClientRect().top
                ])
                
                setOverlayData(
                    (prev) => prev?.children === oData.children ? null : {...oData}
                );
            }
            return acc;
        }, {} as Record<EventType, (data: any) => void>);

        Object.entries(handlers).forEach(
            ([event, handler]) => events?.on(event as unknown as EventType, handler)
        );

        return () => 
        {
            Object.entries(handlers).forEach(
                ([event, handler]) => events?.off(event as unknown as EventType, handler)
            );
        };
    }, []);

    return (overlayData && coords) && (
        <OverlayContent
            ref={overlayRef}
            style=
            {{
                top: `${coords[1] - 16}px`,
                left: `${coords[0] + 64}px`,
            }}
        >
            {overlayData.title && (
                <ModalHeader>
                    <ModalTitle>{overlayData.title}</ModalTitle>
                    <HeaderButtons>{overlayData.headerButtons}</HeaderButtons>
                    <CloseButton onClick={close}>&times;</CloseButton>
                </ModalHeader>
            )}
            {overlayData.children}
            {overlayData.actions}
        </OverlayContent>
    );
};

export default Overlay;