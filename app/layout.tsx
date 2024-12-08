import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'CSV Query Playground',
  description: 'A playground for querying CSV files',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased w-full min-h-fit bg-gradient-to-r from-slate-50 to-green-50 background-animate`}
      >
        {children}
      </body>
    </html>
  );
}
