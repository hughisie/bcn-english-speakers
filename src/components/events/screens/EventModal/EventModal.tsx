import { getRsvpButtonLabel } from '../../../../services/events.service';
import Button from "../../components/Button/Button";
import HeroImage from "../../components/HeroImage/HeroImage";
import ModalDrawer from "../../components/ModalDrawer/ModalDrawer";
import useAppStateContext from "../../contexts/AppStateProvider";
import { PLACEHOLDER_HERO } from "../../types/config";
import { getFeaturedMediaItem } from "../../utils/utils";
import EventDateTime from "./EventDateTime";
import EventHosts from './EventHosts';
import EventLocation from './EventLocation';

type EventModalProps = {
  onClose: () => void;
};
export default function EventModal({ onClose }: EventModalProps) {
  const {
    api: { modalState, currentEvent, group },
  } = useAppStateContext();

  const event = currentEvent.value;
  const groupInfo = group.value.data;

  if (!event || !groupInfo) {
    return null;
  }

  const {
    category,
    description,
    directions,
    // endTime,
    eventConfig,
    // groupId,
    // hosts,
    // location,
    // locationDisclosureAt,
    maxTicketsPerPerson,
    meetupId,
    mode,
    photos,
    price,
    privacy,
    promoCodes,
    requiresUserCheckin,
    rsvpType,
    rsvps,
    shortId,
    // startTime,
    status,
    subcategory,
    subtitle,
    tags,
    title,
    vouchers,
    rsvpClosesAt,
    rsvpOpensAt,
    waitingList,
  } = event;

  const groupLogoImage = getFeaturedMediaItem(groupInfo.logo ?? []);

  const eventImage = getFeaturedMediaItem(photos ?? []) ?? PLACEHOLDER_HERO;
  const modeString =
    mode === "ONLINE"
      ? "This is an online-only event"
      : mode === "HYBRID"
      ? "This is a hybrid event"
      : mode === "IN_PERSON"
      ? "This is an in-person event"
      : "";
  const rsvpButtonLabel = getRsvpButtonLabel(event)

  const handleRSVP = () => {
    // onClose();
    // // wait for modal to close...
    // setTimeout(() => {
    //   onSummary({
    //     ...guess.value,
    //   });
    // }, 1000);
  };

  return (
    <ModalDrawer
      title="View event"
      isOpen={modalState.value.openId === "EVENTS"}
      onClose={onClose}
      maxHeightMobile={100}
    >
      <div class="flex flex-col justify-center gap-2 mb-2">
        <HeroImage image={eventImage} class="aspect-video rounded-md" />
        <h2 class="mt-4 text-3xl font-semibold tracking-tight">{title}</h2>
        <h3 class="text-lg tracking-tight">{subtitle}</h3>

        <div class="flex flex-row gap-2">
          {groupLogoImage && (
            <img
              src={groupLogoImage.url}
              alt={groupLogoImage.alt}
              class="object-cover aspect-square w-5 h-5 absolute rounded-full"
            />
          )}
          <p class="text-sm">Hosted by: {groupInfo.groupName}</p>
        </div>

        <div>
          <h3 class="tracking-tight mt-2 font-semibold">{modeString}</h3>
        </div>

        <div class="my-4">
          <EventDateTime event={event} />
        </div>
        <hr />
        <h3 class="tracking-tight mt-2 font-semibold">About the event</h3>
        <p
          class="prose tracking-tight"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <hr />

        <h3 class="tracking-tight mt-2 font-semibold">Location</h3>
        <EventLocation event={event} />
        <hr />
        <EventHosts event={event} />
        <hr />
        <div>
          <h3>Share event</h3>
          <a class="text-cyan-700 underline" href={`/events?shortId=${shortId}`} target="_blank" rel="noreferrer">Event Short URL</a>
        </div>

      </div>
      <ModalDrawer.Footer>
        <div class="flex flex-row items-center justify-center gap-4 py-4 px-6">
          <Button
            onClick={onClose}
            text="Cancel"
            variant="outline"
            classes="flex-shrink-0 flex-grow basis-1/2"
          />
          <Button
            onClick={handleRSVP}
            text={rsvpButtonLabel}
            variant="primary"
            classes="flex-shrink-0 flex-grow basis-1/2"
          />
        </div>
      </ModalDrawer.Footer>
    </ModalDrawer>
  );
}
