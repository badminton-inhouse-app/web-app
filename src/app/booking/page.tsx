'use client';

import { useState } from "react";
import { format } from "date-fns";
import Calendar from "@/components/Calendar";
import BookingForm from "@/components/BookingForm";
import BookingList from "@/components/BookingList";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Booking } from "@/types/booking";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddBooking = () => {
    setIsFormOpen(true);
  };

  const handleBookingSubmit = (booking: Booking) => {
    setBookings([...bookings, booking]);
    setIsFormOpen(false);
  };

  const handleBookingCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Calendar Booking Buddy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Simple and easy way to manage your appointments and bookings
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                bookings={bookings}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {selectedDate ? (
                    <>
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        {format(selectedDate, "MMMM d, yyyy")}
                      </span>
                    </>
                  ) : (
                    "Select a date"
                  )}
                </h2>
                {selectedDate && !isFormOpen && (
                  <Button size="sm" onClick={handleAddBooking}>
                    Add Booking
                  </Button>
                )}
              </div>

              {isFormOpen && selectedDate ? (
                <BookingForm
                  date={selectedDate}
                  onSubmit={handleBookingSubmit}
                  onCancel={handleBookingCancel}
                />
              ) : (
                <div className="text-center py-6">
                  {selectedDate ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      {bookings.filter(
                        (booking) =>
                          format(new Date(booking.date), "yyyy-MM-dd") ===
                          format(selectedDate, "yyyy-MM-dd")
                      ).length > 0
                        ? "Click on 'Add Booking' to create a new appointment"
                        : "No bookings yet. Click the button above to create one."}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Please select a date from the calendar
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Upcoming Bookings
              </h2>
              <BookingList
                bookings={bookings}
                selectedDate={selectedDate}
                onDeleteBooking={(id) =>
                  setBookings(bookings.filter((booking) => booking.id !== id))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
