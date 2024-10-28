import {
  eventPriceIsFree,
  eventPriceIsTBC,
  eventRSVPStatus,
  getEventAttendeesCriteria,
  getPaymentSchemeReadout,
} from "../../../../../services/events.service";
import type { MeetupItem } from "../../../../../types/types";
import { PriceFormatter } from "../../../utils/priceFormatter";

type EventRegistrationProps = {
  event: MeetupItem;
};
export default function EventRegistration({ event }: EventRegistrationProps) {
  const eventIsFree = eventPriceIsFree(event);
  const eventIsTBC = eventPriceIsTBC(event);

  const formatter = new PriceFormatter({
    code: event.price.currencyCode,
    locale: event.price.locale,
    symbol: "€",
  });
  const formattedPrice =
    event.price.priceCents > 0
      ? formatter.toFormatted(event.price.priceCents, true)
      : "";

  const paymentScheme = getPaymentSchemeReadout(event);
  const rsvpStatus = eventRSVPStatus(event);
  const eventAttendeesCriteria = getEventAttendeesCriteria(event);

  return (
    <div class="my-2 rounded-md overflow-hidden border border-slate-100">
      <h3 class="bg-slate-100 m-0 p-1 px-4">Registration</h3>
      <div class="p-4 flex flex-col gap-2">
        <div class="flex flex-row items-center gap-2">
          <span class="text-sm">Price:</span>
          {(eventIsFree || eventIsTBC) && (
            <span class="text-sm font-bold">
              {eventIsFree ? "Free" : "TBC"}
            </span>
          )}
          {!eventIsFree && !eventIsTBC && (
            <span class="text-sm font-bold">{formattedPrice} / person</span>
          )}
        </div>
        {!eventIsFree && !eventIsTBC && (
          <div class="flex flex-row items-center gap-2">
            <span class="text-sm">Payment:</span>
            <span class="text-sm font-bold">{paymentScheme}</span>
          </div>
        )}
        {rsvpStatus.isAcceptingRSVPs ? (
          <>
            <div class="flex flex-row items-center gap-2">
              <span class="text-sm">Spaces left:</span>
              <span class="text-sm font-bold">
                {rsvpStatus.spacesLeft > 99 ? "99+" : rsvpStatus.spacesLeft}
              </span>
            </div>

            {eventAttendeesCriteria.max > 0 && (
              <div class="flex flex-row items-center gap-2">
                <span class="text-sm">Max guests</span>
                <span class="text-sm font-bold">
                  You can bring {eventAttendeesCriteria.max} friend/s to this
                  event
                </span>
              </div>
            )}
          </>
        ) : (
          <div class="flex flex-row items-center gap-2">
            <span class="text-sm">RSVP:</span>
            <span class="text-sm font-bold">
              Signup is closed for this event.
            </span>
          </div>
        )}

        {/* Check Bizum info Form for signup? Check waiting list status Form: name
        Additional fields: email, phone, address, lastname, social profile Form
        intro text telling the user what to do (please enter your instagram)
        Meetup: Feedback message for after rsvp/signup 1. Normal message to
        guests on signup 2. Message if they are on the waiting list 3. Requires
        identity card? Check min/max attendees Will you be bringing a friend?
        How many guests will you bring with you? */}
        <div class="flex flex-row items-center gap-2">
          <span class="text-sm">Price:</span>
          <span class="text-sm font-bold">{event.price.priceCents}</span>
        </div>
      </div>
    </div>
  );
}
