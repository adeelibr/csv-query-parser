import React from 'react';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AdSection() {
  return (
    <div className="w-full md:w-[250px] bg-white border border-border p-8 rounded-lg hover:bg-slate-50">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Rocket className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-xl font-bold text-gray-900">Launch Your MVP</h3>

        <div className="space-y-2">
          <p className="text-2xl font-bold text-primary">
            Starting at
            <br />
            €10,000
          </p>
          <p className="text-sm text-gray-600">Ready in 2 to 3 months</p>
        </div>

        <Button className="w-full" asChild>
          <Link
            href="https://binarycodebarn.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}
