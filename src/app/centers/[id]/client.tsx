'use client'

import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { MapPin, Clock, Users, Phone, Mail, Star, ChevronLeft } from 'lucide-react';
import 'react-day-picker/dist/style.css';
import { GetCenterDetailsData } from '@/types/entities';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const timeSlots = [
  '7:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
];

interface Props {
  data: GetCenterDetailsData;
}

const CenterClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [overlappedBookingCourtIds, setOverlappedBookingCourtIds] = useState<string[]>([]);
  const [onHoverTimeSlot, setOnHoverTimeSlot] = useState<string>('');

  const handleTimeSlotClick = (time: string) => {
    if (!startTime) {
      setStartTime(time);
    } else if (!endTime && time > startTime) {
      setEndTime(time);
    } else {
      setStartTime(time);
      setEndTime('');
    }
  };

  const isTimeSlotSelected = (time: string) => {
    if (startTime && endTime) {
      return time >= startTime && time <= endTime;
    }
    return time === startTime;
  };

  const getTimeSlotClass = (time: string) => {
    const baseClass = "p-3 text-center rounded-lg transition-colors duration-200 font-normal ";
    if (isTimeSlotSelected(time)) {
      return baseClass + "bg-indigo-600 text-white";
    }
    if (onHoverTimeSlot !== "" && startTime !== "") {
      const startHour = Number(startTime.split(':')[0]);
      const timeHour = Number(time.split(':')[0]);
      const onHoverHour = Number(onHoverTimeSlot.split(':')[0]);
      if (timeHour > startHour && timeHour < onHoverHour) {
        return baseClass + "bg-indigo-200 text-black";
      }
    }
    return baseClass + "bg-white hover:bg-indigo-200 cursor-pointer text-black";
  };

  useEffect(() => {
    // console.log(data.bookings);
    if (selectedDate && data.bookings.length > 0 && startTime !== "" && endTime !== "") {
      const overlappedBookingCourtIds: string[] = [];
      for (let i = 0; i < data.bookings.length; i++) {
        const a = data.bookings[i];
        const startTimeDT = new Date();
        startTimeDT.setDate(selectedDate.getDate());
        startTimeDT.setMonth(selectedDate.getMonth());
        startTimeDT.setHours(Number(startTime.split(':')[0]));
        startTimeDT.setMinutes(Number(startTime.split(':')[1]));
        const endTimeDT = new Date();
        endTimeDT.setDate(selectedDate.getDate());
        endTimeDT.setMonth(selectedDate.getMonth());
        endTimeDT.setHours(Number(endTime.split(':')[0]));
        endTimeDT.setMinutes(Number(endTime.split(':')[1]));
        if (Number(new Date(a.startTime).getTime()) < endTimeDT.getTime() && Number(new Date(a.endTime).getTime() > startTimeDT.getTime())) {
          overlappedBookingCourtIds.push(data.bookings[i].courtId);
        }
      }
      setOverlappedBookingCourtIds(overlappedBookingCourtIds);
    }
  }, [selectedDate, data.bookings, startTime, endTime]);

  const checkIfPastTime = (time: string) => {
    const currentTime = new Date();
    const selectedTime = new Date(selectedDate);
    selectedTime.setHours(Number(time.split(':')[0]));
    return selectedTime < currentTime;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-14 flex items-center w-full">
        <Button
          variant="ghost"
          className="flex items-center gap-1"
          onClick={() => router.push(`/centers`)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Badminton Center Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&q=80&w=1000"
                alt="Badminton Center"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Elite Badminton Center</h1>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>123 Sports Avenue, City Center</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Open 8:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>4 Professional Courts</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>+1 234 567 8900</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>info@elitebadminton.com</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 mr-1" fill="currentColor" />
                    <Star className="h-5 w-5 mr-1" fill="currentColor" />
                    <Star className="h-5 w-5 mr-1" fill="currentColor" />
                    <Star className="h-5 w-5 mr-1" fill="currentColor" />
                    <Star className="h-5 w-5 mr-1" fill="currentColor" />
                    <span className="ml-2 text-gray-600">(4.9/5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Calendar and Time Selection */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="border border-gray-700 rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-4">Select Date</h2>
                  <DayPicker
                    disabled={{ before: new Date() }}
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date || new Date())
                    }}
                    className="border-0"
                  />
                </div>

                {/* Time Selection */}
                <div className="rounded-lg p-4 border border-gray-700">
                  <h2 className="text-lg font-semibold mb-4">Select Time</h2>
                  <p className="text-sm text-white mb-4">
                    {!startTime
                      ? "Select a start time"
                      : !endTime
                        ? "Select an end time"
                        : "Time slot selected"}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        disabled={checkIfPastTime(time)}
                        key={time}
                        onClick={() => handleTimeSlotClick(time)}
                        className={getTimeSlotClass(time) + " disabled:opacity-50 disabled:cursor-not-allowed"}
                        onMouseEnter={() => setOnHoverTimeSlot(time)}
                        onMouseLeave={() => setOnHoverTimeSlot('')}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Courts */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Available Courts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.courts.map((court) => (
                    <div
                      key={court.id}
                      className={`p-4 rounded-lg border ${!overlappedBookingCourtIds.includes(court.id)
                        ? 'border-green-500 bg-green-50 cursor-pointer hover:bg-green-100 text-black'
                        : 'border-red-300 bg-red-50 cursor-not-allowed'
                        }`}
                    >
                      <div className="text-center">
                        <span className={1 === 1 ? 'text-green-700' : 'text-red-700'}>
                          {court.courtNo}
                        </span>
                        <p className="text-sm mt-1">
                          {1 === 1 ? 'Available' : 'Booked'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="mt-8 border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg p-4 ">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Time</p>
                      <p className="font-medium">
                        {startTime && endTime ? `${startTime} - ${endTime}` : 'Not selected'}
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => alert('Booking confirmed!')}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterClient;