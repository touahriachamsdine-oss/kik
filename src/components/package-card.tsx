import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bookmark } from 'lucide-react';

import type { TravelPackage } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from '@/components/rating-stars';

interface PackageCardProps {
  travelPackage: TravelPackage;
}

export function PackageCard({ travelPackage }: PackageCardProps) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === travelPackage.images[0]);
  const imageUrl = placeholderImage?.imageUrl ?? `https://picsum.photos/seed/${travelPackage.id}/600/400`;
  const imageHint = placeholderImage?.imageHint ?? 'travel landscape';

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <Link href={`/packages/${travelPackage.id}`}>
          <Image
            src={imageUrl}
            alt={travelPackage.title}
            width={600}
            height={400}
            className="h-56 w-full object-cover"
            data-ai-hint={imageHint}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-3 left-3">{travelPackage.category}</Badge>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white text-primary">
          <Bookmark className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl leading-tight">
          <Link href={`/packages/${travelPackage.id}`} className="hover:text-primary transition-colors">
            {travelPackage.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
          <MapPin className="h-4 w-4" />
          <span>{travelPackage.destination}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RatingStars rating={travelPackage.rating} />
            <span className="text-sm text-muted-foreground">({travelPackage.totalReviews})</span>
          </div>
          <p className="text-sm text-muted-foreground">{travelPackage.durationDays} days</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-2xl font-bold text-primary">${travelPackage.price}<span className="text-sm font-normal text-muted-foreground">/person</span></p>
        <Button asChild>
          <Link href={`/packages/${travelPackage.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
