import type { GenericMediaItem, MeetupItem } from "../../../../types/types";
import { getFeaturedMediaItem } from "../../utils/utils";

const eventPlaceholderImage: GenericMediaItem = {
  id: "generic-item",
  url: "https://cdn.pocketbarcelona.com/app/places/images/avif/placeholder_large.avif",
  alt: "Placeholder",
  mediaType: "IMAGE",
  createdTime: new Date(),
};

type EventItemProps = {
  item: MeetupItem;
};
export default function EventItem({ item }: EventItemProps) {
  const {
    category,
    description,
    directions,
    endTime,
    eventConfig,
    hosts,
    location,
    locationDisclosureAt,
    maxTicketsPerPerson,
    meetupId,
    mode,
    photos,
    price,
    privacy,
    requiresUserCheckin,
    rsvps,
    rsvpClosesAt,
    rsvpOpensAt,
    rsvpType,
    shortId,
    startTime,
    status,
    subcategory,
    subtitle,
    tags,
    title,
    waitingList,
  } = item;
  const mainPhoto = getFeaturedMediaItem(photos);
  return (
    <article class="my-6 rounded-lg bg-slate-50 border border-slate-200 p-4">
      <div class="flex flex-row justify-between gap-2">
        <div class="flex-grow">
          <time>{item.startTime}</time>
          <h2>{item.title}</h2>
        </div>
        <div class="basis-1/3">
          {mainPhoto && (
            <img
              src={mainPhoto.url}
              alt={mainPhoto.alt}
              class="min-h-full object-cover"
            />
          )}
          {!mainPhoto && (
            <img
              src={eventPlaceholderImage.url}
              alt={eventPlaceholderImage.alt}
              class="min-h-full object-cover"
            />
          )}
        </div>
      </div>
    </article>
  );
}
