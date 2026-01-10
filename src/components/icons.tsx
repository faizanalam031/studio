import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>QuickByte Delight Logo</title>
      <path d="M12 2a5.5 5.5 0 0 1 5.5 5.5c0 2-1.5 3-1.5 3s1.5 1 1.5 3A5.5 5.5 0 0 1 12 22a5.5 5.5 0 0 1-5.5-5.5c0-2 1.5-3 1.5-3s-1.5-1-1.5-3A5.5 5.5 0 0 1 12 2Z" />
      <path d="m15.5 8.5-4 4-4-4" />
      <path d="M12 12v6" />
    </svg>
  );
}
