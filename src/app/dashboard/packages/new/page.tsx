
'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createPackage } from '@/lib/data';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash, Plus } from 'lucide-react';
import { Loader } from 'lucide-react';

const packageSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  destination: z.string().min(3, 'Destination is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  durationDays: z.coerce.number().int().positive('Duration must be a positive number'),
  price: z.coerce.number().positive('Price must be a positive number'),
  maxParticipants: z.coerce.number().int().positive('Max participants must be a positive number'),
  category: z.enum(['Adventure', 'Family', 'Youth', 'Religious']),
  status: z.enum(['draft', 'active', 'inactive']),
  featured: z.boolean().default(false),
  includes: z.array(z.object({ value: z.string().min(1, 'Include item cannot be empty') })).min(1, "At least one included item is required"),
  excludes: z.array(z.object({ value: z.string().min(1, 'Exclude item cannot be empty') })).min(1, "At least one excluded item is required"),
  images: z.array(z.string()).optional(), // Placeholder for image URLs
});

type PackageFormValues = z.infer<typeof packageSchema>;

export default function NewPackagePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: '',
      destination: '',
      description: '',
      durationDays: 7,
      price: 1000,
      maxParticipants: 10,
      category: 'Family',
      status: 'draft',
      featured: false,
      includes: [{ value: '' }],
      excludes: [{ value: '' }],
      images: [],
    },
  });

  const { fields: includesFields, append: appendInclude, remove: removeInclude } = useFieldArray({
    control: form.control,
    name: "includes",
  });

  const { fields: excludesFields, append: appendExclude, remove: removeExclude } = useFieldArray({
    control: form.control,
    name: "excludes",
  });
  
  const onSubmit = async (data: PackageFormValues) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to create a package.' });
      return;
    }
    
    // Convert array of objects to array of strings
    const packageData = {
      ...data,
      includes: data.includes.map(item => item.value),
      excludes: data.excludes.map(item => item.value),
    };
    
    const result = await createPackage(user.uid, packageData);

    if (result.success) {
      toast({ title: 'Package Created!', description: `Your new package "${data.title}" has been saved.` });
      router.push('/dashboard/packages');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error || 'Failed to create package.' });
    }
  };

  if (isUserLoading) {
    return <div className="flex items-center justify-center h-full"><Loader className="animate-spin" /></div>;
  }
  
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Travel Package</CardTitle>
        <CardDescription>Fill in the details for your new package.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Mystical Sahara Expedition" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Djanet, Algeria" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea {...field} rows={5} placeholder="Describe the travel package..." /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="durationDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Days)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Participants</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Youth">Youth</SelectItem>
                        <SelectItem value="Religious">Religious</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <FormLabel>What's Included</FormLabel>
                {includesFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`includes.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl><Input {...field} placeholder="e.g., Accommodation" /></FormControl>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeInclude(index)} disabled={includesFields.length <= 1}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" size="sm" variant="outline" className="mt-2" onClick={() => appendInclude({ value: '' })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </div>
              <div>
                <FormLabel>What's Not Included</FormLabel>
                {excludesFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`excludes.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl><Input {...field} placeholder="e.g., Flights" /></FormControl>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeExclude(index)} disabled={excludesFields.length <= 1}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" size="sm" variant="outline" className="mt-2" onClick={() => appendExclude({ value: '' })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-3 h-[72px]">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Feature on homepage</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="mr-4">Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Create Package
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
