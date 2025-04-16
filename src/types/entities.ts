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
  courts: Court[];
}

export interface GetFiltersValuesResponse {
  message: string;
  status: "success" | "error";
  data?: {
    [key: string]: FilterDetails;
  };
}

export interface FilterDetails {
  label: string;
  values: FilterValue[];
}

export interface FilterValue {
  value: string;
  total_items: number;
}

export enum BookingStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface PaymentSession {
  id: string;
  userId: string;
  bookingId: string;
  clientSecret: string;
  amount: string;
  paymentMethod: "STRIPE" | "MOMO";
  paymentSessionId: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt: string | null;
}
