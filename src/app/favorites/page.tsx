import { getFavoriteItems } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';

export default function FavoritesPage() {
  const favoriteItems = getFavoriteItems();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">My Favorites</h1>
      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteItems.map((item) => (
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
                  <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-8 w-8">
                      <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
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
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No Favorites Yet</h2>
          <p className="mt-2 text-muted-foreground">
            Add your favorite dishes to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
