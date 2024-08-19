import { EventType } from "@/components/EventsProvider";
import { ReactNode } from "react";

export interface OverlayEventData
{
    title: string;
    children: ReactNode;
    x?: number;
    y?: number;
    actions?: ReactNode;
    headerButtons?: ReactNode;
    data?: any;
}

export const OverlayEvents =
{
    [EventType.CALL_NOTIFICATIONS]: 
    {
        title: 'Уведомления',
        children: <>123</>,
    },
    [EventType.CALL_PINS]:
    {
        title: 'Закрепленное',
        children: <>456</>,
    },
    [EventType.CALL_ROOM_PROFILE]:
    {
        title: 'Закрепленное',
        children: <>456</>,
    },
}