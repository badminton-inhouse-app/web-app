import React from 'react';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking, BookingStatus, Center, Court } from '@/types/entities';
import { useRouter } from 'next/navigation';

interface Props {
    bookings: Array<Booking & {
        center: Center,
        court: Court,
    }>;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case BookingStatus.COMPLETED:
            return "bg-green-500";
        case BookingStatus.PENDING:
            return "bg-yellow-500";
        case BookingStatus.CANCELLED:
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
};

const BookingsTable: React.FC<Props> = ({ bookings }) => {
    const router = useRouter();

    return (
        <div className="w-full p-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mã Đặt Sân</TableHead>
                            <TableHead>Địa Chỉ Sân</TableHead>
                            <TableHead>Sân Số</TableHead>
                            <TableHead>Trạng Thái</TableHead>
                            <TableHead>Ngày</TableHead>
                            <TableHead>Khung Giờ Đặt</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings && bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell className="font-medium">{booking.id}</TableCell>
                                <TableCell>{booking.center.address}</TableCell>
                                <TableCell>{booking.court.courtNo}</TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {moment(booking.startTime).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell>
                                    Từ {moment(booking.startTime).format("HH:mm")} tới {moment(booking.endTime).format("HH:mm")}
                                </TableCell>
                                <TableCell>
                                    <Button 
                                    onClick={() => router.push(`/bookings/${booking.id}`)}
                                    variant="default"
                                        className='cursor-pointer disabled:cursor-not-allowed'
                                        disabled={booking.status !== BookingStatus.PENDING}>
                                        Thanh toán
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BookingsTable;