'use client';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const queryClient = new QueryClient()

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <Sonner />
            {children}
        </QueryClientProvider>
    )
}

export default Provider;