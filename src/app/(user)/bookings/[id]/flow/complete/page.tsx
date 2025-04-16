'use client'

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";
import { useWindowSize } from "react-use";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
    const [isClient, setIsClient] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => setIsClient(true), [])

    if (!isClient) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50">
            <Confetti width={width} height={height} recycle={false} />
            <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
                <motion.div
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl max-w-md w-full text-center p-8 space-y-6"
                >
                    <div className="flex justify-center">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Đặt Sân Thành Công!</h1>
                    <p className="text-gray-600">
                        Bạn đã đặt sân thành công. Kiểm tra email của bạn để nhận mail xác nhận thông  tin đặt sân.
                    </p>
                    <div className="pt-4">
                        <Button asChild className="w-full">
                            <Link href="/centers">Về lại trang chủ</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
