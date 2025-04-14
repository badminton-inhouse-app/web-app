
export interface Booking {
  id: string;
  title: string;
  date: string; // ISO string format
  startTime: string; // 24-hour format "HH:MM"
  endTime: string; // 24-hour format "HH:MM"
  description?: string;
  attendee?: string;
}
