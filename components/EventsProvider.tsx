'use client';

import { createContext, useContext, useState } from 'react';

export enum EventType 
{
    CALL_CREATE_ROOM,
    CALL_USER_PROFILE,
    CALL_USER_INVITE,
    CALL_NOTIFICATIONS,
    CALL_PINS,
    CALL_MESSAGE_SEARCH,
    CALL_ROOM_PROFILE,
    PICK_ROOM,
    CREATE_ROOM,
    SEND_MESSAGE,
    ROOM_CREATED,
    ROOM_REMOVED,
    ROOM_PICKED,
    MESSAGE_SEND,
    INIT_SELECTED_TAB,
}

export interface EventHandler 
{
    on: (type: EventType, callback: Function) => void;
    off: (type: EventType, callback: Function) => void;
    emit: (type: EventType, ...args: any[]) => void;
    listeners: Record<EventType, Array<Function>>;
}

const EventsContext = createContext<EventHandler | undefined>(
{
    on: () => {},
    off: () => {},
    emit: () => {},
    listeners: {} as Record<EventType, Array<Function>>,
});

export const EventsProvider: React.FC<any> = ({ children }) => 
{
    const [listeners, setListeners] = useState<Record<EventType, Array<Function>>>({} as Record<EventType, Array<Function>>);

    const addEventListener = (type: EventType, callback: Function) => 
    {
        setListeners((prevListeners) => (
        {
            ...prevListeners,
            [type]: [...(prevListeners[type] || []), callback],
        }));
    };

    const removeEventListener = (type: EventType, callback: Function) => 
    {
        setListeners((prevListeners) => (
        {
            ...prevListeners,
            [type]: (prevListeners[type] || []).filter((listener) => listener !== callback),
        }));
    };

    const emitEvent = (type: EventType, ...args: any[]) => 
    {
        const eventListeners = listeners[type];
        if (eventListeners) 
            eventListeners.forEach((listener) => listener(...args));
    };

    const eventHandler: EventHandler = 
    {
        on: addEventListener,
        off: removeEventListener,
        emit: emitEvent,
        listeners: listeners,
    };

    return (
        <EventsContext.Provider value={eventHandler}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {return useContext(EventsContext);};