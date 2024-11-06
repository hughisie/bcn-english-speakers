import type { GenericMediaItem } from '../types/types';

export const DEFAULT_LOCALE = "es-ES";

export const getFeaturedMediaItem = (
  mediaItems: GenericMediaItem[]
): GenericMediaItem | undefined => {
  return mediaItems.find((i) => i.featured);
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getMonthName = (monthIndex: number, full = false): string => {
  if (full) return MONTHS_FULL[monthIndex];
  return MONTHS[monthIndex];
};

/** Return a event date string like: date: Tuesday, October 22, time: 2:00 PM - 5:00 PM */
export const getEventDateReadout = (
  dateStart: Date,
  dateEnd: Date,
  full = false,
  locale = "en-GB"
): {
  date: string;
  time: string;
} => {
  const month = getMonthName(dateStart.getMonth(), full);
  const day = dateStart.getDate();
  const weekday = dateStart.toLocaleString(locale || DEFAULT_LOCALE, {
    weekday: "long",
  });
  const dateStr = `${weekday}, ${month}, ${day}`;

  // format a time like: 2:00 PM - 5:00 PM
  const timeStrStart = dateStart.toLocaleString(locale || DEFAULT_LOCALE, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const timeStrEnd = dateEnd.toLocaleString(locale || DEFAULT_LOCALE, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return {
    date: dateStr,
    time: `${timeStrStart.toUpperCase()} - ${timeStrEnd.toUpperCase()}`,
  };
};
