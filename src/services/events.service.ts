import { API_STUB, } from "../consts";
import type { MeetupItem } from '../types/types';


/** Fetches BCN-ES events */
export async function getEventsByOrganiserId(): Promise<{ data: MeetupItem[] }> {
  const endpoint = `${API_STUB}/api/meetup/list/a7fc8a95-2f1c-4841-9564-b4a267c0eae3`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return data as Promise<{ data: MeetupItem[] }>;
}


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type MeetupGroupItem = any;

/** Get organiser info */
export async function getGroupInfo(): Promise<{ data: MeetupGroupItem | null }> {
  const endpoint = `${API_STUB}/api/meetupGroup/a7fc8a95-2f1c-4841-9564-b4a267c0eae3`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return data as Promise<{ data: MeetupGroupItem }>;
}
