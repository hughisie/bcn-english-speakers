import type { ApiFetchInfo } from "../components/events/state/state";
import { API_STUB_LOCAL } from "../consts";
import {
  RsvpButtonCtaDefault,
  type MeetupGroupItem,
  type MeetupItem,
  type RsvpButtonCtaTypes,
} from "../types/types";

const BCN_ENG_SPEAKERS_GROUP_ID = "a9989daa-d864-4b3a-82e3-899df9baccc1";
// export const API_CALL_REFRESH_PERIOD = 60000; // 1 minute
export const API_CALL_REFRESH_PERIOD = 6000000; // 1 minute

/** Fetches BCN-ES events */
export async function getEventsByOrganiserId(): Promise<
  ApiFetchInfo<MeetupItem[]>
> {
  console.debug("Fetching Events List");
  const endpoint = `${API_STUB_LOCAL}/api/meetup/list/${BCN_ENG_SPEAKERS_GROUP_ID}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return {
    data: data.data ?? null,
    lastFetched: Date.now(),
  };
}

/** Get organiser info */
export async function getGroupInfo(): Promise<
  ApiFetchInfo<MeetupGroupItem | null>
> {
  console.debug("Fetching Group Info");
  const endpoint = `${API_STUB_LOCAL}/api/meetupGroup/${BCN_ENG_SPEAKERS_GROUP_ID}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return {
    data: data.data ?? null,
    lastFetched: Date.now(),
  };
}

/** Prevent repeat calls */
export function hasUpdatedRecently(lastFetchTime: number) {
  return lastFetchTime + API_CALL_REFRESH_PERIOD > Date.now();
}

/** @todo - submit new event */
/** @todo - get event by ID */
/** @todo - rsvp to event by ID */

export function getLocationInfo(event: MeetupItem): string {
  const { location, locationDisclosureAt } = event;

  // make sure can show location yet
  if (locationDisclosureAt && locationDisclosureAt.getTime() < Date.now()) {
    return "Location revealed closer to the time";
  }
  const fullLocation = [
    location.address1,
    location.address2,
    location.postcode,
    location.town,
  ];

  switch (location.locationPrecision) {
    case 1:
      return fullLocation.filter((i) => i).join(", ");
    case 2:
      return fullLocation.filter((i) => i).join(", "); // todo
    case 3:
      return location.town;
    case 4:
      return "Location hidden";
    default:
      return "Location unknown";
  }
}

export function getEventFromToDate(
  event: MeetupItem,
  monthAsName = true
): string {
  const eventDate: string[] = [];

  if (event.startTime) {
    const newDateFrom = new Date(event.startTime);
    if (monthAsName) {
      const date1Parts = getDateParts(newDateFrom);
      eventDate.push(
        [date1Parts.day, date1Parts.month, date1Parts.year].join(" ")
      );
    } else {
      eventDate.push(
        newDateFrom.toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" })
      );
    }
  }

  if (event.endTime) {
    const newDateTo = new Date(event.endTime);
    if (monthAsName) {
      const date2Parts = getDateParts(newDateTo);
      eventDate.push(
        [date2Parts.day, date2Parts.month, date2Parts.year].join(" ")
      );
    } else {
      eventDate.push(
        newDateTo.toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" })
      );
    }
  }

  // if the event is on the same day, do not return "a" - "a", instead return just "a"
  if (eventDate.length === 2 && eventDate[0] === eventDate[1]) {
    return eventDate[0];
  }

  return eventDate.join(" - ");
}

export function getDateParts(theDate: Date): {
  day: string;
  month: string;
  year: string;
} {
  const day = theDate.getDate().toString();
  const monthZeroIndex = theDate.getMonth(); // jan = 0
  const transKey = MONTHS[monthZeroIndex];
  const month = transKey;
  const year = theDate.getFullYear().toString();
  return {
    day,
    month,
    year,
  };
}

const MONTHS = [
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

export const meetupLocationIsDisclosedYet = ({
  locationDisclosureAt,
}: MeetupItem): boolean => {
  let locationIsDisclosed = true;

  if (locationDisclosureAt) {
    const disclosedDate = new Date(locationDisclosureAt);
    locationIsDisclosed = disclosedDate.getTime() < Date.now();
  }
  return locationIsDisclosed;
};

export const getRsvpButtonLabel = ({ eventConfig }: MeetupItem): string => {
  const ctaType = eventConfig?.rsvpButtonCtaType ?? RsvpButtonCtaDefault;
  // @todo - if we need a special label for the type, do a switch here...
  return ctaType.replace("_", " ");
};
