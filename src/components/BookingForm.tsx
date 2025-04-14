import { useState } from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";
import { CircleSlash } from "lucide-react";

interface BookingFormProps {
  date: Date;
  onSubmit: (booking: Booking) => void;
  onCancel: () => void;
}

const timeSlots = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", 
  "19:00", "20:00", "21:00", "22:00", "23:00"
];

const BookingForm = ({ date, onSubmit, onCancel }: BookingFormProps) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [attendee, setAttendee] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !startTime || !endTime) {
      alert("Please fill in the required fields");
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      title,
      date: date.toISOString(),
      startTime,
      endTime,
      description,
      attendee,
    };

    onSubmit(newBooking);
  };

  const handleTimeSelect = (time: string, isStart: boolean) => {
    if (isStart) {
      setStartTime(time);
      
      const timeIndex = timeSlots.indexOf(time);
      if (timeIndex < timeSlots.length - 1 && (!endTime || endTime <= time)) {
        setEndTime(timeSlots[timeIndex + 1]);
      }
    } else {
      if (startTime && time > startTime) {
        setEndTime(time);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting with Client"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="block text-sm font-medium mb-1">
          Start Time <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={`start-${time}`}
              type="button"
              onClick={() => handleTimeSelect(time, true)}
              className={cn(
                "time-slot",
                "flex justify-center items-center",
                startTime === time && "selected"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="block text-sm font-medium mb-1">
          End Time <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isDisabled = startTime && time <= startTime;
            
            return (
              <button
                key={`end-${time}`}
                type="button"
                onClick={() => handleTimeSelect(time, false)}
                className={cn(
                  "time-slot",
                  "flex justify-center items-center relative",
                  endTime === time && "selected",
                  isDisabled && "disabled"
                )}
                disabled={isDisabled}
              >
                {time}
                {isDisabled && (
                  <CircleSlash className="absolute h-4 w-4 text-gray-400 opacity-70" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="attendee" className="block text-sm font-medium mb-1">
          Attendee
        </Label>
        <Input
          id="attendee"
          value={attendee}
          onChange={(e) => setAttendee(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any details about this booking..."
          className="h-24"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">Save Booking</Button>
      </div>
    </form>
  );
};

export default BookingForm;
