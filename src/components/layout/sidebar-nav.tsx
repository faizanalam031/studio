'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { getUser } from '@/lib/data';
import {
  Home,
  User,
  Heart,
  ShoppingBag,
  MessageCircleQuestion,
  Settings,
  Star,
  LogOut,
  Wallet,
  BarChart3,
  Package,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const user = getUser();

export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { role } = useAuth();

  const menuItems = role === 'staff' ? [
    { href: '/staff-dashboard', label: 'Dashboard', icon: Home },
    { href: '/orders', label: 'Order Management', icon: ShoppingBag },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/inventory', label: 'Inventory', icon: Package },
    { href: '/settings', label: 'Store Settings', icon: Settings },
  ] : [
    { href: '/', label: 'Home', icon: Home },
    { href: '/orders', label: 'My Orders', icon: ShoppingBag },
    { href: '/favorites', label: 'Favorites', icon: Heart },
    { href: '/account', label: 'Account', icon: Wallet },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/help', label: 'Help', icon: MessageCircleQuestion },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/feedback', label: 'Feedback', icon: Star },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span
            className={`font-headline text-lg font-bold transition-opacity duration-200 ${
              state === 'collapsed' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            QuickBite
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex-col !items-stretch gap-2">
        
        <div className="flex items-center gap-3 p-2 rounded-lg bg-background">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div
            className={`overflow-hidden transition-opacity duration-200 ${
              state === 'collapsed' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </>
  );
}
