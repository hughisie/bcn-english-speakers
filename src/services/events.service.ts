import type { ApiFetchInfo } from '../components/events/state/state';
import { API_STUB_LOCAL } from "../consts";
import type { MeetupGroupItem, MeetupItem } from "../types/types";

const BCN_ENG_SPEAKERS_GROUP_ID = "a9989daa-d864-4b3a-82e3-899df9baccc1";
export const API_CALL_REFRESH_PERIOD = 60000; // 1 minute

/** Fetches BCN-ES events */
export async function getEventsByOrganiserId(): Promise<ApiFetchInfo<MeetupItem[]>> {
  const endpoint = `${API_STUB_LOCAL}/api/meetup/list/${BCN_ENG_SPEAKERS_GROUP_ID}`;
  const resp = await fetch(endpoint);
    const data = await resp.json();
    return {
      data: data.data ?? null,
      lastFetched: Date.now()
    };
}

/** Get organiser info */
export async function getGroupInfo(): Promise<ApiFetchInfo<MeetupGroupItem | null>> {
  const endpoint = `${API_STUB_LOCAL}/api/meetupGroup/${BCN_ENG_SPEAKERS_GROUP_ID}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return {
    data: data.data ?? null,
    lastFetched: Date.now()
  };
}

/** Prevent repeat calls */
export function hasUpdatedRecently(lastFetchTime: number) {
  return lastFetchTime < Date.now() + API_CALL_REFRESH_PERIOD;
}

/** @todo - submit new event */
/** @todo - get event by ID */
/** @todo - rsvp to event by ID */
