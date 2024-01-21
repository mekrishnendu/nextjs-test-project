'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

//Link
export const LinkCustom = ({ children, navigateTo }) => {
  return <Link href={navigateTo}>{children}</Link>;
};

//Button
export const Button = ({ children, navigateTo, buttonType }) => {
  const router = useRouter();
  return (
    <button type={buttonType} onClick={() => router.push(navigateTo)}>
      {children}
    </button>
  );
};
