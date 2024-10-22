import { API_CALL_REFRESH_PERIOD } from "../../../services/events.service";
import type { MeetupGroupItem, MeetupItem } from "../../../types/types";

export const initialState: AppState = {
  currentScreen: "HOME",
  groupInfo: {
    data: null,
    lastFetched: Date.now() - API_CALL_REFRESH_PERIOD,
  },
  meetups: {
    data: [],
    lastFetched: Date.now() - API_CALL_REFRESH_PERIOD,
  },
};

export type AppState = {
  currentScreen: string;
  groupInfo: ApiFetchInfo<MeetupGroupItem | null>;
  meetups: ApiFetchInfo<MeetupItem[]>;
};

/** Generic type for storing fetch data */
export type ApiFetchInfo<T = unknown> = {
  lastFetched: number;
  data: T;
};
