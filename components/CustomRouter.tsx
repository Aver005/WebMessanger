'use client';

import AuthPage from '@/pages/AuthPage';
import ContactsPage from '@/pages/ContactsPage';
import DashboardPage from '@/pages/DashboardPage';
import DirectsPage from '@/pages/DirectsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RoomsPage from '@/pages/RoomsPage';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { EventType, useEvents } from './EventsProvider';
import SavedPage from '@/pages/SavedPage';
import ArchivePage from '@/pages/ArchivePage';
import PortalsPage from '@/pages/PortalsPage';
import SettingsPage from '@/pages/SettingsPage';

export type Route =
{
    title: string;
    path: string;
    component: ReactNode;
    needAuth?: boolean;
}

export const PageRoutes: Route[] = 
[
    {
        title: 'Авторизация',
        path: "/auth",
        component: <AuthPage />,
        needAuth: false,
    },
    {
        title: 'Главная',
        path: "/",
        component: <DashboardPage />,
        needAuth: true,
    },
    {
        title: 'Комнаты',
        path: "/rooms",
        component: <RoomsPage />,
        needAuth: true,
    },
    {
        title: 'Личные комнаты',
        path: "/directs",
        component: <DirectsPage />,
        needAuth: true,
    },
    {
        title: 'Контакты',
        path: "/contacts",
        component: <ContactsPage />,
        needAuth: true,
    },
    {
        title: 'Избранное',
        path: "/saved",
        component: <SavedPage />,
        needAuth: true,
    },
    {
        title: 'Архив',
        path: "/archive",
        component: <ArchivePage />,
        needAuth: true,
    },
    {
        title: 'Порталы',
        path: "/portals",
        component: <PortalsPage />,
        needAuth: true,
    },
    {
        title: 'Настройки',
        path: "/settings",
        component: <SettingsPage />,
        needAuth: true,
    },
];

// const getRouteParams = (pathname: string): [string, {}] => 
// {
//     // const parts = pathname.split('/');
//     // const params: { [key: string]: string } = {};
//     // let matchRoutes = [...Object.keys(routes)];

//     // Object.keys(routes).forEach((route) => 
//     // {
//     //     const routeParts = route.split('/');
//     //     if (routeParts.length === parts.length) 
//     //     {
//     //         routeParts.forEach((part, index) => 
//     //         {
//     //             if (part !== parts[index])
//     //             {
//     //                 if (part.startsWith(':')) return;
//     //                 matchRoutes = matchRoutes.filter(
//     //                     (prRoute) => prRoute !== route
//     //                 );
//     //             }
//     //         });

//     //         return;
//     //     }
        
//     //     matchRoutes = matchRoutes.filter(
//     //         (prRoute) => prRoute !== route
//     //     );
//     // });

//     // if (matchRoutes.length === 0) return [Pages.Dashboard.url as string, {}];

//     // const routeParts = matchRoutes[0].split('/');
//     // routeParts.forEach((part, index) => 
//     // {
//     //     if (!part.startsWith(':')) return;
//     //     const paramName = part.slice(1);
//     //     params[paramName] = parts[index];
//     // });

//     // return [matchRoutes[0], params];
// };

export const EmptyRoute: React.FC = () => <>Ошибка маршрутизации</>;

export default function CustomRouter() 
{
    const pathname = usePathname();
    const events = useEvents();

    const route = useMemo(() => {
        return PageRoutes.find((route) => route.path === pathname);
    }, [pathname]);
    
    events?.emit(EventType.INIT_SELECTED_TAB, {tab: route?.title || '404'});
    if (!route) return <NotFoundPage />;
    return <>{route.component}</>;
}