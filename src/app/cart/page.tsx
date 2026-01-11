'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

    const subtotal = getTotalPrice();
    const deliveryFee = 2.50;
    const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-3">
        <ShoppingCart className="h-8 w-8" />
        My Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                        <p className="text-muted-foreground text-center">Add some delicious items from our stalls to get started!</p>
                    </CardContent>
                </Card>
            ) : (
                cartItems.map(cartItem => (
                    <Card key={cartItem.menuItem.id}>
                        <CardContent className="flex items-center gap-4 p-4">
                            <Image src={cartItem.menuItem.imageUrl} alt={cartItem.menuItem.name} data-ai-hint={cartItem.menuItem.imageHint} width={80} height={80} className="rounded-md object-cover" />
                            <div className="flex-grow">
                                <p className="font-semibold">{cartItem.menuItem.name}</p>
                                <p className="text-sm text-muted-foreground">₹{cartItem.menuItem.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity - 1)}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{cartItem.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="font-semibold w-20 text-right">₹{(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(cartItem.menuItem.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
        <Card className="lg:col-span-1 sticky top-24">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" placeholder="Enter your address" defaultValue="123 Flavor St, Food City" />
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" size="lg">Proceed to Payment</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
