'use client';

import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Logo } from '../logo';
import Link from 'next/link';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-8 border border-gray-700">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Đăng Ký Tài Khoản
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Gia nhập hội viên để nhận các ưu đãi và thông tin mới nhất từ chúng tôi.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300">
                Tên tài khoản
              </label>
              <input
                defaultValue={""}
                {...register("username", { required: true })}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhâp tên tài khoản của bạn"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Mật khẩu
              </label>
              <input
                defaultValue={""}
                {...register("password", { required: true })}
                type="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Xác nhận mật khẩu
              </label>
              <input
                defaultValue={""}
                {...register("confirmPassword", { required: true })}
                type="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập lại mật khẩu của bạn"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              <UserPlus className="h-4 w-4" />
              Tạo tài khoản
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          Bạn đã có tài khoản trước đó?{' '}
          <Link href="/sign-in" className="font-medium text-blue-400 hover:text-blue-300">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}