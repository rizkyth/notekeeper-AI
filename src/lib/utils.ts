import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Node modules
 */

import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns';
import { redirect } from 'react-router';
/**
 *
 * Capitalize the first letter of a string
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCustomDate(date: string | number | Date) {
  const today = new Date();

  // get the relative day string
  const relativeDay = capitalizeFirstLetter(
    formatRelative(new Date(date), today).split(' at ')[0],
  );

  const relativeDays = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  if (relativeDays.includes(relativeDay)) {
    return relativeDay;
  }

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM');
  } else {
    return format(date, 'dd MMM yyyy');
  }
}
/**
 * return a colour class based on the due date of task
 */

export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) return '';

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500';
  }
  if (isToday(dueDate)) {
    return 'text-emerald-500';
  }
  if (isTomorrow(dueDate) && !completed) {
    return 'text-amber-500';
  }
}

export function generateUniqueId() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

export function getUserId(): string {
  const clerkUserId = localStorage.getItem('clerkUserId');

  if (!clerkUserId) {
    redirect('/auth-sync');
    return '';
  }
  return clerkUserId;
}
