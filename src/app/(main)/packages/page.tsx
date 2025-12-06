import { PackageCard } from "@/components/package-card";
import { travelPackages } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function PackagesPage() {
  return (
    <div className="container max-w-7xl py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Explore Our Packages</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find your next adventure from our wide selection of curated trips.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-headline">Filter Trips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Category Filter */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Category</Label>
                <RadioGroup defaultValue="all" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r-all" />
                    <Label htmlFor="r-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adventure" id="r-adventure" />
                    <Label htmlFor="r-adventure">Adventure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="family" id="r-family" />
                    <Label htmlFor="r-family">Family</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="youth" id="r-youth" />
                    <Label htmlFor="r-youth">Youth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="religious" id="r-religious" />
                    <Label htmlFor="r-religious">Religious</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Price Range Filter */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Price Range</Label>
                <Slider defaultValue={[1000]} max={5000} step={100} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>$5000+</span>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Duration (days)</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="d-1-3" />
                    <Label htmlFor="d-1-3" className="font-normal">1-3 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="d-4-7" />
                    <Label htmlFor="d-4-7" className="font-normal">4-7 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="d-8-14" />
                    <Label htmlFor="d-8-14" className="font-normal">8-14 days</Label>
                  </div>
                   <div className="flex items-center space-x-2">
                    <Checkbox id="d-15" />
                    <Label htmlFor="d-15" className="font-normal">15+ days</Label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Packages Grid */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {travelPackages.map(pkg => (
              <PackageCard key={pkg.id} travelPackage={pkg} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
