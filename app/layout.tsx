'use client';

import { EventsProvider } from '@/components/EventsProvider';
import './globals.css';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Modals from '@/widgets/Modals/Modals';
import { StorageProvider } from '@/components/StorageProvider';
import CustomRouter, { PageRoutes } from '@/components/CustomRouter';
import { usePathname } from 'next/navigation';
import Badges from '@/widgets/Badges/Badges';
import Overlay from '@/widgets/Overlay/Overlay';

const inter = Inter(
{
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export default function RootLayout({children,}: 
    Readonly<{children: React.ReactNode;}>) 
{
    const pathname = usePathname();
    const currentRoute = PageRoutes.find((route) => route.path === pathname);

    return (
        <html lang="ru" className={inter.className}>
            <head>
                <title>{(currentRoute?.title || '404') as string}</title> 
            </head>
            <body>
                <EventsProvider>
                <StorageProvider>
                    <Badges />
                    <Modals />
                    <Overlay />
                    <CustomRouter />
                </StorageProvider>
                </EventsProvider>
            </body>
        </html>
    );
}
