import { RiInformation2Line } from "../../../components/Icons/Icons";
import type { MeetupItem } from '../../../types/types';
import { meetupLocationIsDisclosedYet } from '../../../utils/utils';

type EventLocationProps = {
  event: MeetupItem;
};
export default function EventLocation({ event }: EventLocationProps) {
  const { location, locationDisclosureAt } = event;
  const locationString = [
    location.address1,
    location.address2,
    location.postcode,
    location.town,
    location.province,
    location.country,
  ]
    .filter((l) => l)
    .join(", ");

  const locationDisclosed = meetupLocationIsDisclosedYet({
    ...event,
    // locationDisclosureAt: new Date(locationDisclosureAt),
  });

  return (
    <div class="flex flex-col gap-2">
      
      {!locationDisclosed && (
        <div class="p-2 my-2 bg-red-50 border border-red-100 rounded-md text-sm">
          <p class="flex flex-row items-start gap-2 tracking-tight">
            <RiInformation2Line width={20} height={20} /> The real event
            location will be disclosed soon.
          </p>
        </div>
      )}

      {locationDisclosed && (
        <>
          <h2 class="text-base tracking-tight">
            Some fancy location name here
          </h2>
          <p class="text-base tracking-tight">{locationString}</p>
          {location.locationPrecision !== 1 && (
            <div class="my-2 p-4">
              <p>The event location is approximate</p>
            </div>
          )}
          {event.directions && (
            <div class="mb-2">
              <p class="tracking-tight">
                <span class="font-semibold">Directions</span>: {event.directions}
              </p>
            </div>
          )}
          {/* Map */}
          <div class="aspect-video w-full h-36 bg-slate-200 rounded-lg mb-2" />
          
        </>
      )}

    </div>
  );
}
