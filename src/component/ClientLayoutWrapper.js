'use client';

import { usePathname } from 'next/navigation';
import ChatWidget from '@/component/ChatWidget';
import Landing from '@/component/Landing';
import MarketData from '@/component/MarketData';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage && (
        <>
          <Landing />
          <ChatWidget />
          <MarketData />
        
        </>
      )} 

      {children}
    </>
  );
}
