import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export type NotificationType = 'error' | 'warning' | 'info';

interface NotificationProps {
  title: string;
  message: string;
  type?: NotificationType;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'error':
      return AlertCircle;
    case 'warning':
      return AlertTriangle;
    case 'info':
      return Info;
    default:
      return AlertCircle;
  }
};

export const showNotification = ({ title, message, type = 'error' }: NotificationProps) => {
  const Icon = getIcon(type);
  
  toast(title, {
    description: message,
    position: 'top-right', // Add top-right positioning
    icon: <Icon className={cn(
      'size-5',
      type === 'error' && 'text-red-500',
      type === 'warning' && 'text-yellow-500',
      type === 'info' && 'text-blue-500'
    )} />,
    className: cn(
      'border-2',
      type === 'error' && 'border-red-500 bg-red-50',
      type === 'warning' && 'border-yellow-500 bg-yellow-50',
      type === 'info' && 'border-blue-500 bg-blue-50'
    ),
  });
};
