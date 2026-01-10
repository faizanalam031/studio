'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div>
        {isMobile && <SidebarTrigger />}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
