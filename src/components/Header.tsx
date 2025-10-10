import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b shadow-sm sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-2">
        <Leaf className="text-primary h-7 w-7" />
        <h1 className="text-2xl font-bold font-headline tracking-tight">
          KISdoc AI
        </h1>
      </div>
    </header>
  );
}
