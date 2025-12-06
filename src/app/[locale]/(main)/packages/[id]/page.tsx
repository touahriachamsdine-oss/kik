import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPackageById, getAgencyById, getReviewsForPackage } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingStars } from '@/components/rating-stars';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Calendar, Check, X, Building, Award } from 'lucide-react';

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const travelPackage = await getPackageById(params.id);

  if (!travelPackage) {
    notFound();
  }

  const agency = await getAgencyById(travelPackage.agencyId);
  const reviews = await getReviewsForPackage(travelPackage.id);

  const galleryImages = travelPackage.images.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

  return (
    <div className="container max-w-7xl py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">{travelPackage.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{travelPackage.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{travelPackage.durationDays} Days</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{travelPackage.category}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <Carousel className="w-full mb-8">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <Image
                      src={image!.imageUrl}
                      alt={`${travelPackage.title} - Image ${index + 1}`}
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover"
                      data-ai-hint={image!.imageHint}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
          
          {/* Details Tabs */}
          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose max-w-none text-foreground/80">
              <p>{travelPackage.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center"><Check className="h-5 w-5 mr-2 text-green-600"/>Includes</h3>
                  <ul className="space-y-2 list-none p-0">
                    {travelPackage.includes.map((item, i) => <li key={i} className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center"><X className="h-5 w-5 mr-2 text-red-600"/>Excludes</h3>
                   <ul className="space-y-2 list-none p-0">
                    {travelPackage.excludes.map((item, i) => <li key={i} className="flex items-start"><X className="h-4 w-4 mr-2 mt-1 text-red-600 shrink-0"/>{item}</li>)}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="itinerary" className="prose max-w-none text-foreground/80">
              <p>A day-by-day plan of your adventure.</p>
              {/* This would be mapped from data */}
              <div className="space-y-4 mt-4">
                <p><strong>Day 1:</strong> Arrival and Welcome Dinner</p>
                <p><strong>Day 2:</strong> City Tour and Historical Sites</p>
                <p><strong>Day 3:</strong> Free Day for Exploration</p>
                <p><strong>Day 4-6:</strong> Special Excursions</p>
                <p><strong>Day 7:</strong> Departure</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map(review => {
                    const avatar = PlaceHolderImages.find(img => img.id === review.user.avatarUrl);
                    return(
                      <div key={review.id} className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatarUrl || avatar?.imageUrl} alt={review.user.name} data-ai-hint={avatar?.imageHint}/>
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold">{review.user.name}</p>
                            <RatingStars rating={review.rating}/>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.createdAt.toLocaleDateString()}</p>
                          <p className="mt-2 text-foreground/80">{review.comment}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews for this package yet. Be the first to leave one!</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Booking Card */}
          <Card className="sticky top-24 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold text-primary">${travelPackage.price}</span>
                  <span className="text-muted-foreground">/person</span>
                </div>
                <div className="text-right">
                  <RatingStars rating={travelPackage.rating} />
                  <span className="text-xs text-muted-foreground">{travelPackage.totalReviews} reviews</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Form elements would go here */}
              <p className="text-sm text-muted-foreground">Select date and number of travelers to book.</p>
              <Button size="lg" className="w-full text-lg h-12">Book Now</Button>
            </CardContent>
          </Card>
          
          {/* Agency Card */}
          {agency && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center gap-2"><Building className="h-5 w-5 text-primary"/>Agency</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                   <AvatarImage src={agency.logo} alt={agency.businessName}/>
                  <AvatarFallback>{agency.businessName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{agency.businessName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4"/>
                    <span>{agency.rating} average rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
