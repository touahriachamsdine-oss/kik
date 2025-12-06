
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, DollarSign, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PackageCard } from '@/components/package-card';
import { getPackages, getReviewsForPackage } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingStars } from '@/components/rating-stars';
import { reviews as placeholderReviews } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';


export default async function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const featuredPackages = await getPackages({ featured: true });
  // For now, we'll keep using placeholder reviews for the homepage testimonials section
  const reviews = placeholderReviews.slice(0,3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">Your Journey Begins Here</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            Discover and book unforgettable travel experiences curated by top agencies in Algeria and beyond.
          </p>
        </div>
        {/* Search Card */}
        <div className="relative z-20 mx-auto -mt-24 w-full max-w-5xl px-4">
          <Card className="shadow-2xl">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
                <div className="relative md:col-span-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Destination, city..." className="pl-10 h-12 text-base" />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="text" placeholder="Dates" className="pl-10 h-12 text-base" />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="number" placeholder="Travelers" className="pl-10 h-12 text-base" />
                </div>
                <Button size="lg" className="h-12 w-full text-base md:col-span-1">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section id="destinations" className="py-24 sm:py-32 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight">Featured Trips</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Handpicked adventures that you won&apos;t want to miss.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} travelPackage={pkg} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/packages">View All Packages <ChevronRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* AI Planner CTA Section */}
      <section className="py-24 sm:py-32 bg-secondary/50">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="default" className="bg-accent text-accent-foreground">New</Badge>
              <h2 className="font-headline text-4xl font-bold tracking-tight mt-4">Can&apos;t Decide? Let AI Help!</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our intelligent trip planner analyzes your preferences to suggest the perfect vacation. Get personalized recommendations in minutes.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-3 bg-primary/10 rounded-full"><MapPin className="h-6 w-6 text-primary"/></div>
                  <p>Personalized Destinations</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-3 bg-primary/10 rounded-full"><DollarSign className="h-6 w-6 text-primary"/></div>
                  <p>Budget Friendly</p>
                </div>
              </div>
              <Button size="lg" asChild className="mt-10">
                <Link href="/ai-planner">Try AI Planner <ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
                <p className="font-semibold">"Suggest a 7-day family-friendly trip in Algeria with a mix of beach and history, budget around $2000."</p>
                <div className="my-4 h-px w-full bg-border" />
                <div className="space-y-3 text-muted-foreground">
                  <p className="font-bold text-foreground">AI Response:</p>
                  <p>1. **Coastal & Roman Ruins Tour (5 Days):** Explore Tipaza and Cherchell, staying at a family resort. Budget-friendly and educational.</p>
                  <p>2. **Algiers & Beyond (7 Days):** Combine the capital with a trip to the Ghardaïa valley for a unique cultural experience.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 sm:py-32 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight">What Our Travelers Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Real stories from our adventurous community.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map(review => {
              const avatar = PlaceHolderImages.find(img => img.id === review.user.avatarUrl);
              return (
                <Card key={review.id} className="flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <RatingStars rating={review.rating} />
                    <p className="mt-4 text-muted-foreground">"{review.comment}"</p>
                  </CardContent>
                  <CardHeader className="flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={avatar?.imageUrl} alt={review.user.name} data-ai-hint={avatar?.imageHint} />
                      <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.user.name}</p>
                      <p className="text-sm text-muted-foreground">Traveled in {new Date(review.date).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
