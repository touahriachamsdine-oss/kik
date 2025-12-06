import { Plane } from "lucide-react";

export const Icons = {
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <div className="flex items-center gap-2 font-headline text-lg font-bold text-primary">
      <Plane className="h-6 w-6" />
      <span className="mt-1">rahalati+</span>
    </div>
  ),
};
