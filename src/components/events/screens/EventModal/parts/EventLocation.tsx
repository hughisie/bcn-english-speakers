import cn from "classnames";
import { RiInformation2Line } from "../../../components/Icons/Icons";
import type { MeetupItem } from "../../../types/types";
import {
  getMeetupMapLink,
  meetupLocationIsDisclosedYet,
} from "../../../utils/utils";

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

  const mapTile = {
    // src: `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=400x200`, // requires API key
    src: "/example-map-tile.jpg",
    alt: "Map location preview",
  };
  const googleMapsLink = getMeetupMapLink(event);

  const handleViewMap = () => {
    window.open(googleMapsLink, "_blank");
  };

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
                <span class="font-semibold">Directions</span>:{" "}
                {event.directions}
              </p>
            </div>
          )}
          {/* Map */}
          {googleMapsLink && (
            <div>
              <p class="font-semibold mb-1">Map</p>
              <div class="aspect-video w-full h-36 bg-slate-200 rounded-lg mb-2 relative overflow-hidden">
              <img
                class="object-cover w-full h-full"
                src={mapTile.src}
                alt={mapTile.alt}
              />
              <button
                type="button"
                onClick={handleViewMap}
                class={cn(
                  "w-full h-full border-none outline-none text-transparent hover:bg-black/40 hover:text-white text-xl transition-all ease-in-out",
                  "absolute inset-0 z-10"
                )}
              >
                View Map
              </button>
            </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
