'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { EventType, useEvents } from './EventsProvider';
import { RoomEventType } from '@/types/Events';


export interface Storage 
{
    selectedRoom: number,
    rooms: any[];
    directs: any[];
    contacts: any[];
}

const StorageContext = createContext<Storage | undefined>(
{
    selectedRoom: 1,
    rooms: [],
    directs: [],
    contacts: [],
});

export const StorageProvider: React.FC<any> = ({ children }) => 
{
    const events = useEvents();
    const [selectedRoom, setSelectedRoom] = useState(1);
    const [rooms, setRooms] = useState([
        {
            id: 1,
            name: "User 1",
            text: "Привет, как дела?",
            timestamp: "12:00",
            isSelected: true,
            events: 
            [
                {
                    id: 1,
                    type: RoomEventType.MESSAGE,
                    author: 'John',
                    text: 'Hello, how are you?',
                    timestamp: '14:32',
                    isOwnMessage: false,
                    isRead: true,
                    avatarSrc: 'https://i0.wp.com/cojo.ru/wp-content/uploads/2022/12/pepe-retroveiv-3.webp?ssl=1',
                },
                {
                    id: 2,
                    type: RoomEventType.MESSAGE,
                    text: "I'm good, thanks!",
                    timestamp: '14:33',
                    isOwnMessage: true,
                    isRead: true,
                },
                {
                    id: 3,
                    type: RoomEventType.MESSAGE,
                    author: 'John',
                    text: 'Внезапно, некоторые особенности внутренней политики набирают популярность среди определенных слоев населения, а значит, должны быть описаны максимально подробно. Ясность нашей позиции очевидна: базовый вектор развития не даёт нам иного выбора, кроме определения поставленных обществом задач. Есть над чем задуматься: активно развивающиеся страны третьего мира и по сей день остаются уделом либералов, которые жаждут быть смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности требует определения и уточнения укрепления моральных ценностей. Банальные, но неопровержимые выводы, а также предприниматели в сети интернет являются только методом политического участия и в равной степени предоставлены сами себе! Повседневная практика показывает, что социально-экономическое развитие предопределяет высокую востребованность новых предложений. Картельные сговоры не допускают ситуации, при которой диаграммы связей освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, преданы социально-демократической анафеме. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий требует анализа системы массового участия.',
                    timestamp: '14:34',
                    isOwnMessage: false,
                    isRead: false,
                },
                {
                    id: 4,
                    type: RoomEventType.MESSAGE,
                    author: 'John',
                    text: 'Есть над чем задуматься: акционеры крупнейших компаний являются только методом политического участия и подвергнуты целой серии независимых исследований. Принимая во внимание показатели успешности, экономическая повестка сегодняшнего дня создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса приоретизации разума над эмоциями. Лишь интерактивные прототипы призывают нас к новым свершениям, которые, в свою очередь, должны быть в равной степени предоставлены сами себе. С другой стороны, высококачественный прототип будущего проекта способствует подготовке и реализации укрепления моральных ценностей. Мы вынуждены отталкиваться от того, что социально-экономическое развитие способствует подготовке и реализации кластеризации усилий.',
                    timestamp: '14:34',
                    isOwnMessage: true,
                    isRead: false,
                },
            ]
        }, 
        {
            id: 2,
            name: "User 2",
            text: "Привет, как дела?",
            timestamp: "12:00",
            events: []
        }
    ]);

    const storage: Storage =
    {
        selectedRoom: selectedRoom,
        rooms: rooms,
        directs: [],
        contacts: [],
    };

    useEffect(() =>
    {
        const onPickRoom = (data: any) => 
        {
            setSelectedRoom(data.id);
            rooms.forEach((room) => {room.isSelected = room.id === data.id;});
            events?.emit(EventType.ROOM_PICKED, {id: data.id});
        };

        const onCreateRoom = (data: any) => 
        {
            const newRoom = {...data, id: storage.rooms.length + 1};
            setRooms([...rooms, newRoom]);
            events?.emit(EventType.ROOM_CREATED, {...newRoom});
        };

        const onSendMessage = (data: any) =>
        {
            const thisRoom = rooms.find((room) => room.id === selectedRoom);
            const newRooms = rooms.filter(room => room.id !== thisRoom?.id);
            const roomEvents = thisRoom?.events || [];
            const newEvent = {...data, id: roomEvents.length + 1};
            const newRoom: any = {...thisRoom, events: [...roomEvents, newEvent]};
            setRooms([newRoom, ...newRooms]);
            events?.emit(EventType.MESSAGE_SEND, {...newEvent});
        };

        events?.on(EventType.PICK_ROOM, onPickRoom);
        events?.on(EventType.CREATE_ROOM, onCreateRoom);
        events?.on(EventType.SEND_MESSAGE, onSendMessage);

        return () => 
        {
            events?.off(EventType.PICK_ROOM, onPickRoom);
            events?.off(EventType.CREATE_ROOM, onCreateRoom);
        }
    }, 
    [rooms, selectedRoom]);

    return (
        <StorageContext.Provider value={storage}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorage = () => {return useContext(StorageContext);};