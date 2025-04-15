'use client';

import React, { useState } from 'react';
import { LogIn, User } from 'lucide-react';
import { Logo } from '../logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SignInPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempted with:', username, password);
    };

    const handleGuestLogin = () => {
        router.push('/centers');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-8 border border-gray-700">
                <div className="text-center">
                    <div className="relative mx-auto h-16 w-16">
                        <Logo />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Đăng Nhập Hội Viên
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Đăng nhập tài khoản để nhận các ưu đãi của hội viên hoặc tiếp tục với tư cách khách vãng lai
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Tên tài khoản
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập tên tài khoản của bạn"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập mật khẩu của bạn"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Nhớ thông tin đăng nhập
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                        >
                            <LogIn className="h-4 w-4" />
                            Đăng Nhập
                        </button>

                        <button
                            type="button"
                            onClick={handleGuestLogin}
                            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                        >
                            <User className="h-4 w-4" />
                            Tiếp tục với tư cách khách vãng lai
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Bạn chưa có tài khoản hội viên?{' '}
                    <Link href="/sign-up" className="font-medium text-blue-400 hover:text-blue-300">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignInPage;