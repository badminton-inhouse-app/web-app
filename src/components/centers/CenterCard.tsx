import { MapPin, Phone, Star } from 'lucide-react';
import React from 'react';
import { Center } from '@/types/entities';
import { useRouter } from 'next/navigation';
import { commons } from '@/utils';

interface CenterCardProps {
  center: Center;
}

export function CenterCard({ center }: CenterCardProps) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/centers/${center.id}`)}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] group cursor-pointer">
      <div className="relative">
        {/* <img
          src={center.image}
          alt={center.name}
          className="w-full h-56 object-cover group-hover:brightness-110 transition-all"
        /> */}
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray-700">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-white">5</span>
        </div>
      </div>

      <div className="p-6">
        {/* <h3 className="text-xl font-semibold text-white mb-4">{center.name}</h3> */}

        <div className="space-y-3 text-gray-300">
          <div className="flex items-center gap-3">
            <div className="bg-gray-700/50 border border-gray-600 p-2 rounded-lg">
              <Phone className="h-4 w-4 text-blue-400" />
            </div>
            <span>{commons.formatPhoneNumberDots(center.phoneNo)}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-700/50 border border-gray-600 p-2 rounded-lg">
              <MapPin className="h-4 w-4 text-blue-400" />
            </div>
            <span>{center.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}