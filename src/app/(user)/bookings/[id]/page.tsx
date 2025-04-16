'use client'

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { baseAxios } from '@/services/api/baseAxios';
import { Booking, Center, Court } from '@/types/entities';
import moment from 'moment';
import { commons } from '@/utils';

function BookingDetails() {
    const params = useParams();
    const router = useRouter();
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const { data: bookingDetails } = useQuery({
        queryKey: ['get-booking-details', params.id],
        enabled: !!params.id,
        queryFn: async () => {
            const data = await baseAxios(`/bookings/${params.id}`) as
                {
                    data: Booking & {
                        center: Center,
                        court: Court,
                    },
                    mesage: string;
                    status: "success" | "error";
                }
            return data.data;
        }
    })

    const { mutateAsync: createBookingPaymentSession } = useMutation({
        mutationFn: async () => {
            const body = {
                "paymentMethod": "STRIPE",
            }
            const data = await baseAxios.post(`/bookings/${params.id}/pay`, body)
            return data.data;
        },
        onSuccess: () => {
           router.push(`/bookings/${params.id}/flow/pay`)
        }
    })

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-white">Thông Tin Đặt Sân</h1>
                    <p className='text-md text-gray-400 font-normal py-2'>Mã đặt sân: {bookingDetails?.id}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
                    {/* Court Image */}
                    <div className="h-64 w-full overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80"
                            alt="Badminton court"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Booking Information */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column - Reservation Details */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Thông tin chi tiết</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-300">
                                            <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                                            <span>{moment(bookingDetails?.startTime).format("DD/MM/YYYY")}</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Clock className="h-5 w-5 mr-3 text-blue-400" />
                                            <div className="flex flex-col">
                                                <span>Từ {moment(bookingDetails?.startTime).format("HH:mm")} tới {moment(bookingDetails?.endTime).format("HH:mm")}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gray-700 rounded-lg mt-4">
                                            <p className="text-blue-400 font-semibold mb-1">Sân số {bookingDetails?.court.courtNo}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Địa chỉ sân</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-300">
                                            <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                                            <span>{bookingDetails?.center.address}, Quận {bookingDetails?.center.district}, {bookingDetails?.center.city}</span>
                                        </div>
                                        {bookingDetails?.center.phoneNo &&
                                            <div className="flex items-center text-gray-300">
                                                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                                                <span>{commons.formatPhoneNumberDots(bookingDetails?.center.phoneNo)}</span>
                                            </div>}
                                        <div className="flex items-center text-gray-300">
                                            <Mail className="h-5 w-5 mr-3 text-blue-400" />
                                            <span>booking@badminton.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Guest & Payment Details */}

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Phương thức thanh toán</h2>
                                    <div className="space-y-3">
                                        {/* Payment Provider Options */}
                                        <button
                                            onClick={() => setSelectedProvider('momo')}
                                            className={`w-full p-4 rounded-lg border ${selectedProvider === 'momo'
                                                ? 'border-blue-400 bg-gray-700'
                                                : 'border-gray-600 bg-gray-700 hover:border-blue-400'
                                                } transition-colors`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white font-bold">M</span>
                                                    </div>
                                                    <span className="text-white">Momo</span>
                                                </div>
                                                <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                                    {selectedProvider === 'momo' && (
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedProvider('stripe')}
                                            className={`w-full p-4 rounded-lg border ${selectedProvider === 'stripe'
                                                ? 'border-blue-400 bg-gray-700'
                                                : 'border-gray-600 bg-gray-700 hover:border-blue-400'
                                                } transition-colors`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                                        <CreditCard className="h-4 w-4 text-white" />
                                                    </div>
                                                    <span className="text-white">Stripe</span>
                                                </div>
                                                <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                                    {selectedProvider === 'stripe' && (
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedProvider('zalopay')}
                                            className={`w-full p-4 rounded-lg border ${selectedProvider === 'zalopay'
                                                ? 'border-blue-400 bg-gray-700'
                                                : 'border-gray-600 bg-gray-700 hover:border-blue-400'
                                                } transition-colors`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white font-bold">Z</span>
                                                    </div>
                                                    <span className="text-white">ZaloPay</span>
                                                </div>
                                                <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                                    {selectedProvider === 'zalopay' && (
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                                        <div className="flex justify-between text-gray-300">
                                            <span>Số tiền</span>
                                            <span>250,000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 space-y-3">
                                    <button
                                        className={`w-full py-2 px-4 rounded-lg transition-colors ${selectedProvider
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!selectedProvider}
                                        onClick={() => {
                                            createBookingPaymentSession()
                                        }}
                                    >
                                        Tiến hành thanh toán
                                    </button>
                                    <button className="w-full border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                        Huỷ đặt sân
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BookingDetails;