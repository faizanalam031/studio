'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';
import { useAuth } from '@/lib/auth-context';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, pathname, router]);

  if (pathname === '/login' || pathname === '/staff-dashboard') {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
