
'use client';

import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useUser, useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where } from 'firebase/firestore';
import { useMemo } from 'react';
import type { TravelPackage } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPackagesPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const packagesQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'packages'), where('agencyId', '==', user.uid));
  }, [user, firestore]);

  const { data: travelPackages, isLoading } = useCollection<TravelPackage>(packagesQuery);

  const renderSkeleton = () => (
    <TableRow>
      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline text-xl">Travel Packages</CardTitle>
          <CardDescription>Manage your travel packages and view their status.</CardDescription>
        </div>
        <Button size="sm" asChild className="gap-1">
          <Link href="/dashboard/packages/new">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Package</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isUserLoading ? (
              <>
                {renderSkeleton()}
                {renderSkeleton()}
                {renderSkeleton()}
              </>
            ) : travelPackages && travelPackages.length > 0 ? (
              travelPackages.map(pkg => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.title}</TableCell>
                <TableCell>
                  <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>{pkg.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">${pkg.price}</TableCell>
                <TableCell className="hidden md:table-cell">{pkg.durationDays} days</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No packages found. <Link href="/dashboard/packages/new" className="text-primary underline">Create your first one!</Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
