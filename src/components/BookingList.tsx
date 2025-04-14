
import { format, parseISO, isSameDay } from "date-fns";
import { Booking } from "@/types/booking";
import { CalendarIcon, ClockIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingListProps {
  bookings: Booking[];
  selectedDate: Date | null;
  onDeleteBooking: (id: string) => void;
}

const BookingList = ({
  bookings,
  selectedDate,
  onDeleteBooking,
}: BookingListProps) => {
  // Display bookings for the selected date, or all upcoming bookings if no date is selected
  const filteredBookings = selectedDate
    ? bookings.filter((booking) =>
        isSameDay(parseISO(booking.date), selectedDate)
      )
    : bookings
        .filter((booking) => {
          const bookingDate = parseISO(booking.date);
          return bookingDate >= new Date();
        })
        .sort((a, b) => {
          // Sort by date and then by start time
          const dateA = parseISO(a.date);
          const dateB = parseISO(b.date);
          if (isSameDay(dateA, dateB)) {
            return a.startTime.localeCompare(b.startTime);
          }
          return dateA.getTime() - dateB.getTime();
        })
        .slice(0, 5); // Show only the next 5 upcoming bookings

  if (filteredBookings.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        {selectedDate
          ? "No bookings for this date"
          : "No upcoming bookings"}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredBookings.map((booking) => {
        const bookingDate = parseISO(booking.date);

        return (
          <div
            key={booking.id}
            className="border rounded-md p-4 bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {booking.title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-500 hover:text-red-500"
                onClick={() => onDeleteBooking(booking.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <span>{format(bookingDate, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                <span>
                  {booking.startTime} - {booking.endTime}
                </span>
              </div>
              {booking.attendee && (
                <div className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                  Attendee: {booking.attendee}
                </div>
              )}
            </div>

            {booking.description && (
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
                {booking.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingList;
