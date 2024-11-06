import type { MeetupRsvpAttendanceStatusEnum } from "../types/types";

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


type SubmitRsvpPayload = Pick<AttendFormState, 'guests' | 'meetupId'>;

export type SubmitRsvpPayloadResponse = SubmitRsvpPayload & {
  /** The saved RSVP ID */
  rsvpId: string;
  /** Whether or not the rsvp was confirmed */
  responseCode: number;
  // @todo - do we need the meetup data again?
}
export async function submitRsvp(
  payload: SubmitRsvpPayload
): Promise<SubmitRsvpPayloadResponse> {
  console.log(payload);
  return new Promise((resolve, reject) => {
    return resolve({
      rsvpId: "XXX",
      meetupId: payload.meetupId,
      guests: payload.guests,
      responseCode: 200,
    });
    // const suspectCorrect = guess.suspect?.id === realAnswer.suspect?.id;
    // const weaponCorrect = guess.weapon?.id === realAnswer.weapon?.id;
    // const roomCorrect = guess.room?.id === realAnswer.room?.id;

    // if (suspectCorrect && weaponCorrect && roomCorrect) {
    //   return resolve({
    //     result: {
    //       suspect: true,
    //       weapon: true,
    //       room: true,
    //     },
    //     message: "Congratulations, you have solved the mystery!",
    //   }); // @todo - add a message from Mr Black here..."You were close etc..."
    // }

    // const all = [suspectCorrect, weaponCorrect, roomCorrect];
    // const totalCorrect = all.filter((x) => x).length;
    // let message = "";
    
    // // @todo - this can be made harder by only revealing if 1 is correct, like in the boardgame...
    // return reject({
    //   result: {
    //     suspect: suspectCorrect,
    //     weapon: weaponCorrect,
    //     room: roomCorrect,
    //   },
    //   message,
    // });
  });
}

export function buildRsvpPayload(guests: GuestItem[], meetupId: string): SubmitRsvpPayload {
  return {
    meetupId,
    guests,
  };
}