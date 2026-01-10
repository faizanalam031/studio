import { getFoodStallById, getMenuForStall } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StallPage({ params }: { params: { id: string } }) {
  const stall = getFoodStallById(params.id);
  const menu = getMenuForStall(params.id);

  if (!stall) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-64 w-full rounded-lg overflow-hidden">
        <Image
          src={stall.imageUrl}
          alt={stall.name}
          fill
          data-ai-hint={stall.imageHint}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white">{stall.name}</h1>
          <Badge variant="secondary" className="mt-2 text-base">{stall.cuisine}</Badge>
        </div>
      </div>
      
      <div>
        <h2 className="font-headline text-2xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    data-ai-hint={item.imageHint}
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                <CardDescription className="mt-1 text-sm">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
                <p className="text-lg font-semibold text-primary">₹{item.price.toFixed(2)}</p>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
