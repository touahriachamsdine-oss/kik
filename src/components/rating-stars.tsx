'use client';

import { Star, StarHalf, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  className?: string;
  starClassName?: string;
}

export function RatingStars({ rating, maxRating = 5, className, starClassName }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn('h-4 w-4 text-accent fill-accent', starClassName)} />
      ))}
      {halfStar && <StarHalf className={cn('h-4 w-4 text-accent fill-accent', starClassName)} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn('h-4 w-4 text-muted-foreground/50 fill-muted-foreground/20', starClassName)} />
      ))}
    </div>
  );
}
