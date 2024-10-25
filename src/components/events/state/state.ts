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
  currentEvent: null,
  modalState: {
    openId: undefined,
  },
};

export type AppState = {
  currentScreen: string;
  groupInfo: ApiFetchInfo<MeetupGroupItem | null>;
  meetups: ApiFetchInfo<MeetupItem[]>;
  currentEvent: MeetupItem | null;
  modalState: {
    openId: undefined | "EVENTS";
  };
};

/** Generic type for storing fetch data */
export type ApiFetchInfo<T = unknown> = {
  lastFetched: number;
  data: T;
};
