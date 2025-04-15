import { CircleDot } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative mx-auto h-16 w-16">
      <div className="absolute inset-0 text-blue-400">
        <CircleDot className="h-full w-full" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 text-blue-400 rotate-45">
        <CircleDot className="h-full w-full" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 text-blue-400 -rotate-45">
        <CircleDot className="h-full w-full" strokeWidth={1.5} />
      </div>
    </div>
  );
}