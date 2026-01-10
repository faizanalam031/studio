import { getOrders, getMenuItemById } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function OrdersPage() {
  const orders = getOrders();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">My Orders</h1>
      {orders.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {orders.map((order) => {
            const items = order.items.map(item => {
                const menuItem = getMenuItemById(item.menuItemId);
                return menuItem ? { ...menuItem, quantity: item.quantity } : null;
            }).filter(Boolean);

            return (
              <AccordionItem value={order.id} key={order.id} className="border-b-0">
                 <div className="bg-card rounded-lg border shadow-sm">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex justify-between items-center w-full">
                        <div className="text-left">
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-semibold text-lg">₹{order.total.toFixed(2)}</p>
                            <Badge
                            variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                            className={cn(order.status === 'Delivered' && 'bg-green-600 text-white', order.status === 'Processing' && 'bg-amber-500 text-white')}
                            >
                            {order.status}
                            </Badge>
                        </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="space-y-4">
                            {items.map(item => item && (
                                <div key={item.id} className="flex items-center gap-4">
                                    <Image src={item.imageUrl} alt={item.name} data-ai-hint={item.imageHint} width={64} height={64} className="rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <p>You have no past orders.</p>
      )}
    </div>
  );
}
