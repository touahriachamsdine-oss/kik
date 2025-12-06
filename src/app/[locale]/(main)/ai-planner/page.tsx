import { Sparkles } from 'lucide-react';
import { AIPlannerForm } from '@/components/ai-planner-form';

export default function AIPlannerPage() {
  return (
    <div className="bg-secondary/30 min-h-[calc(100vh-4rem)]">
      <div className="container max-w-4xl py-12 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 p-4 mb-4">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tight">AI Trip Planner</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Describe your perfect trip, and let our AI craft personalized recommendations just for you.
          </p>
        </div>

        <AIPlannerForm />

      </div>
    </div>
  );
}
