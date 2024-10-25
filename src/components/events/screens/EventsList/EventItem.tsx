import { getEventFromToDate, getLocationInfo } from '../../../../services/events.service';
import type { GenericMediaItem, MeetupGroupItem, MeetupItem } from "../../../../types/types";
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
  group: MeetupGroupItem | null;
  viewEvent: () => void;
};
export default function EventItem({ item, group, viewEvent }: EventItemProps) {
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
  const locationString = getLocationInfo(item);

  return (
    <button onClick={viewEvent} type="button">
      <article class="my-6 rounded-lg bg-slate-100 border border-slate-200 p-4 text-sm md:text-base">
        <div class="flex flex-row justify-between gap-2">
          <div class="flex-grow">
            <time datetime={new Date(item.startTime).toISOString()}>{getEventFromToDate(item)}</time>
            <h2 class="my-1 text-xl tracking-tight">{item.title}</h2>
            <p>By <strong>{group?.groupName ?? ''}</strong></p>
            <h3>Icon Location: <strong>{locationString}</strong></h3>
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
    </button>
  );
}

