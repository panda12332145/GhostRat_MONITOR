/**
 * Date Formatter - Format timestamps dynamically
 * Converts milliseconds timestamp to relative time format like "1M AGO", "5 MIN", etc
 */

export type TimeUnit = 'now' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years';

interface TimeConfig {
  unit: TimeUnit;
  value: number;
  label: string;
}

/**
 * Calculate the difference between now and a timestamp
 * Returns a human-readable format like "1M AGO", "5 MIN AGO", "NOW"
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSeconds = Math.floor(diffMs / 1000);

  // Less than 30 seconds
  if (diffSeconds < 30) {
    return 'NOW';
  }

  // Less than 60 seconds
  if (diffSeconds < 60) {
    return `${diffSeconds}S AGO`;
  }

  // Minutes
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 MIN AGO' : `${diffMinutes} MIN AGO`;
  }

  // Hours
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return diffHours === 1 ? '1H AGO' : `${diffHours}H AGO`;
  }

  // Days
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return diffDays === 1 ? '1D AGO' : `${diffDays}D AGO`;
  }

  // Months
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return diffMonths === 1 ? '1M AGO' : `${diffMonths}M AGO`;
  }

  // Years
  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? '1Y AGO' : `${diffYears}Y AGO`;
};

/**
 * Format timestamp as ISO date string
 */
export const formatISODate = (timestamp: number): string => {
  return new Date(timestamp).toISOString();
};

/**
 * Format timestamp as locale date string
 */
export const formatLocaleDate = (timestamp: number, locale: string = 'en-US'): string => {
  return new Date(timestamp).toLocaleString(locale);
};

/**
 * Format timestamp as time only (HH:MM:SS)
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

/**
 * Format timestamp as date only (MM/DD/YYYY)
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Get time config object for more complex formatting
 */
export const getTimeConfig = (timestamp: number): TimeConfig => {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 30) {
    return { unit: 'now', value: 0, label: 'NOW' };
  }

  if (diffSeconds < 60) {
    return { unit: 'seconds', value: diffSeconds, label: `${diffSeconds}S AGO` };
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return { unit: 'minutes', value: diffMinutes, label: `${diffMinutes} MIN AGO` };
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return { unit: 'hours', value: diffHours, label: `${diffHours}H AGO` };
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return { unit: 'days', value: diffDays, label: `${diffDays}D AGO` };
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return { unit: 'months', value: diffMonths, label: `${diffMonths}M AGO` };
  }

  const diffYears = Math.floor(diffMonths / 12);
  return { unit: 'years', value: diffYears, label: `${diffYears}Y AGO` };
};
