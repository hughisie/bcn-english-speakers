import type {
  MeetupRsvpAttendanceStatusEnum,
  MeetupRsvpModel,
  TicketTypeEnum,
} from "../types/types";

// RSVP FORM STATE
export type GuestItem = {
  isMainGuest: boolean;
  name: string;
  mobile: string;
  avatar: string;
  lastname?: string;
  email?: string;
  barrio?: number;
  response: MeetupRsvpAttendanceStatusEnum | undefined;
  comment?: string;
};

export type AttendFormState = {
  /** Zero-indexed step */
  currentStep: number;
  meetupId: string;
  response: MeetupRsvpAttendanceStatusEnum | undefined;
  guests: GuestItem[];
};

type SubmitRsvpPayload = Pick<AttendFormState, "guests" | "meetupId" | 'response'>;

export type SubmitRsvpPayloadResponse = SubmitRsvpPayload & {
  /** The saved RSVP ID */
  rsvpId: string;
  /** Whether or not the rsvp was confirmed */
  responseCode: number;
  // @todo - do we need the meetup data again?
};
export async function submitRsvp(
  payload: SubmitRsvpPayload
): Promise<SubmitRsvpPayloadResponse> {
  console.log(payload);
  return new Promise((resolve, reject) => {
    return resolve({
      rsvpId: "XXX",
      meetupId: payload.meetupId,
      response: payload.response,
      guests: payload.guests,
      responseCode: 200,
    });
    
  });
}

export function buildRsvpPayload(
  response: MeetupRsvpAttendanceStatusEnum,
  guests: GuestItem[],
  meetupId: string
): SubmitRsvpPayload {
  return {
    response,
    meetupId,
    guests,
  };
}

export function getGuestList(
  guests: MeetupRsvpModel[],
  guestType: MeetupRsvpAttendanceStatusEnum,
  ticket?: TicketTypeEnum
) {
  // if (ticket) {
  //   return guests.filter((guest) => guest.rsvpStatus === guestType && guest.ticketType === ticket);
  // }
  return guests.filter((guest) => guest.rsvpStatus === guestType);
}
