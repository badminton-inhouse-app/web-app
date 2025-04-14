
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  bookings: Booking[];
}

const Calendar = ({ selectedDate, onSelectDate, bookings }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const startDay = firstDayOfMonth.getDay();

  // Create blank days at the beginning of the calendar
  const blanks = Array.from({ length: startDay }, (_, i) => i);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Check if a day has bookings
  const hasBookingsOnDay = (day: Date) => {
    return bookings.some((booking) => {
      const bookingDate = parseISO(booking.date);
      return isSameDay(bookingDate, day);
    });
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Blank spaces for days from previous month */}
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="calendar-day disabled" />
        ))}

        {/* Actual days of the month */}
        {daysInMonth.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDayToday = isToday(day);
          const hasBookings = hasBookingsOnDay(day);

          return (
            <button
              key={format(day, "yyyy-MM-dd")}
              onClick={() => onSelectDate(day)}
              className={cn(
                "calendar-day",
                isSelected && "selected",
                isDayToday && "today",
                hasBookings && "has-bookings"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
