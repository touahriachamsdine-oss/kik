import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Icons.Logo />
        </Link>
      </div>
      {children}
    </div>
  );
}
