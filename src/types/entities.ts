export interface Center {
  id: string;
  address: string;
  district: string;
  city: string;
  phoneNo: string;
  lat: string;
  lng: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: "CANCELLED" | "CONFIRMED" | "PENDING";
  createdAt: string;
  updatedAt: string | null;
}

export interface CenterDetails {
  id: string;
  address: string;
  district: string;
  city: string;
  phoneNo: string;
  lat: string;
  lng: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Court {
  id: string;
  centerId: string;
  courtNo: number;
  status: "AVAILABLE" | string;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetCenterDetailsData {
  details: CenterDetails;
  bookings: Booking[];
  courts: Court[];
}
