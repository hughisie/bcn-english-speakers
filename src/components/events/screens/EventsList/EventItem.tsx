import cn from 'classnames'
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
    <button onClick={viewEvent} type="button" class={cn(
      "text-left border hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-lg",
      "p-4 my-6 rounded-lg bg-cyan-50 border border-cyan-200 text-sm md:text-base"
    )}>
      <article>
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

