'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const isMobile = useIsMobile();
  const { logout, role } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {isMobile && <SidebarTrigger />}
        {role && (
          <Badge variant="secondary" className="capitalize">
            {role}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-4">
        {role === 'user' && (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
}
