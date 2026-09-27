import './globals.css';

import { ReactNode } from 'react';

import type { Metadata } from 'next';
import {
  JetBrains_Mono,
  Libre_Bodoni,
  Plus_Jakarta_Sans,
} from 'next/font/google';

import { cn } from '@/lib/utils';

const heading = Libre_Bodoni({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nguyen Thanh Dat (KumoD) — Portfolio",
  description: "Front-End Developer Building Web - Web Application - CMS - E-Commerces - Blog Main-Tech: Based of React - Next.js Specialist",
};

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        heading.variable,
        body.variable,
        mono.variable
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}