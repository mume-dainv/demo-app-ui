'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/contexts/userContext';

const roles = [
  { role: 'ADMIN', block: [] },
  { role: 'USER', block: ['/admin/*'] },
];

export function Role() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const path = pathname;
    const role = user?.role;

    roles.forEach((r) => {
      if (r.role === role) {
        r.block.forEach((b) => {
          const patern = b.replace('*', '');
          if (path.startsWith(patern)) {
            router.replace('/');
          }
        });
      }
    });
  }, [pathname, searchParams]);

  return null;
}
