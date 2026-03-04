import React, { ReactElement } from 'react';

export default function Loading({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return <>{isLoading ? <span>Loading</span> : children}</>;
}
