import React from 'react';
import { formatDateTime } from '../../lib/utils/dateTime';

interface DateTimeProps {
  date: string;
  className?: string;
}

export function DateTime({ date, className = '' }: DateTimeProps) {
  return (
    <time dateTime={date} className={`text-sm text-gray-400 ${className}`}>
      {formatDateTime(date)}
    </time>
  );
}