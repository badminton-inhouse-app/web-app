'use client'

import { baseAxios } from "@/services/api/baseAxios";
import { Booking, Center, Court } from "@/types/entities";
import { useQuery } from "@tanstack/react-query"
import BookingsTable from "./bookings-table";

export default function Page() {
    const { data: bookings } = useQuery({
        queryKey: ['user-bookings'],
        queryFn: async () => {
            const response = await baseAxios('/bookings');
            return response.data as Array<Booking & {
                center: Center,
                court: Court,
            }>
        },
    })
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Bookings</h1>
            <BookingsTable bookings={bookings || []} />
        </div>
    )
}