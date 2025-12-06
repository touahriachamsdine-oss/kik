'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Loader, Wand2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { getAITripRecommendations, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function AIPlannerForm() {
  const [state, formAction] = useFormState(getAITripRecommendations, initialState);
  const { toast } = useToast();
  const { register } = useForm();
  
  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.issues ? state.issues.join(', ') : state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Tell us what you&apos;re looking for</CardTitle>
          <CardDescription>The more details you provide, the better the recommendations will be.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="preferences" className="text-base">Your Preferences</Label>
            <Textarea
              id="preferences"
              name="preferences"
              placeholder="e.g., 'I'm looking for a relaxing beach vacation for two people, with good food and some light activities like snorkeling. I'm interested in destinations in the Mediterranean.'"
              rows={5}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base">Budget (USD)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                defaultValue="1500"
                min="100"
                step="50"
                required
              />
              <p className="text-sm text-muted-foreground">Approximate budget per person.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelHistory" className="text-base">Travel History (Optional)</Label>
              <Input
                id="travelHistory"
                name="travelHistory"
                placeholder="e.g., 'Last year I went to Spain and loved it. Also visited Turkey.'"
              />
              <p className="text-sm text-muted-foreground">Helps us suggest new places for you.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
      {state.recommendations && (
        <div className="border-t">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Personal recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-p:my-2 prose-headings:my-3 max-w-none text-foreground whitespace-pre-wrap">
              {state.recommendations}
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
}
