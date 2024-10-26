import type { GenericMediaItem } from "../../../types/types";

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

