import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateLovablePrompt } from '@/ai/flows/generate-lovable-prompt';
import { getFoodStalls } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default async function Home() {
  const foodStalls = getFoodStalls();
  const { prompt } = await generateLovablePrompt({ appName: 'QuickBite Delight' });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome to QuickBite Delight
        </h1>
        <p className="text-muted-foreground">{prompt}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for food stalls or dishes..." className="pl-10" />
      </div>

      <div>
        <h2 className="font-headline text-2xl font-semibold mb-4">Featured Food Stalls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foodStalls.map((stall) => (
            <Link href={`/stalls/${stall.id}`} key={stall.id} className="group">
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={stall.imageUrl}
                      alt={stall.name}
                      fill
                      data-ai-hint={stall.imageHint}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-headline text-lg font-bold">{stall.name}</h3>
                    <p className="text-sm text-muted-foreground">{stall.cuisine}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
