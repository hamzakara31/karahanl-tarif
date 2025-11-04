'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ to, label = 'Geri', className = '' }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 hover:scale-105 group ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="font-medium hidden sm:inline">{label}</span>
    </button>
  );
}

