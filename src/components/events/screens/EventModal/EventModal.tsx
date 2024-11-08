import Button from "../../components/Button/Button";
import HeroImage from "../../components/HeroImage/HeroImage";
import { RiAccountCircleFill } from "../../components/Icons/Icons";
import ModalDrawer from "../../components/ModalDrawer/ModalDrawer";
import useAppStateContext from "../../contexts/AppStateProvider";
import { eventPriceIsFree, eventRSVPStatus, getFeaturedMediaItem, getRsvpButtonLabel, PLACEHOLDER_HERO } from "../../utils/utils";
import EventDateTime from "./parts/EventDateTime";
import EventHosts from "./parts/EventHosts";
import EventLocation from "./parts/EventLocation";
import EventHeading from "./parts/EventHeading";
import EventRegistration from "./parts/EventRegistration";
import { MeetupRsvpAttendanceStatusEnum } from '../../types/types';
import EventGuests from './parts/EventGuests';

type EventModalProps = {
  onClose: () => void;
};
export default function EventModal({ onClose }: EventModalProps) {
  const {
    api: { modalState, currentEvent, group, setAttendModalState },
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
    // price,
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

  const eventIsFree = eventPriceIsFree(event);
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
  const rsvpButtonLabel = getRsvpButtonLabel(event);
  const rsvpStatus = eventRSVPStatus(event);
  const handleRSVP = () => {
    setAttendModalState({
      isOpen: true,
      formData: {
        guests: [],
        isAttending: MeetupRsvpAttendanceStatusEnum.Cannot,
      },
      currentStep: 0,
    });
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
          <p class="text-sm flex items-center gap-2">
            <RiAccountCircleFill width={24} height={24} />{" "}
            <span>
              Hosted by: <strong>{groupInfo.groupName}</strong>
            </span>
          </p>
        </div>

        <div class="p-2 bg-yellow-50 rounded-md">
          <EventHeading label={modeString} class="!my-0" />
        </div>

        <div class="my-4">
          <EventDateTime event={event} />
        </div>
        <hr />
        <EventHeading label="About the event" />
        <p
          class="prose tracking-tight"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <hr />

        <EventHeading label="Location" />
        <EventLocation event={event} />
        <hr />
        <EventRegistration event={event} />
        <hr />

        <EventHosts event={event} group={group.value.data} />
        <hr />
        <EventGuests event={event} group={group.value.data} />
        <hr />

        {!eventPriceIsFree && (
          <>
            <div>
              <EventHeading label="Refund policy" />
              <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{
                  __html: groupInfo.refundPolicy,
                }}
                class="prose tracking-tight"
              />
            </div>
            <hr />
          </>
        )}

        <div>
          <EventHeading label="Share event" />
          <a
            class="text-cyan-700 underline"
            href={`/events?shortId=${shortId}`}
            target="_blank"
            rel="noreferrer"
          >
            Event Short URL
          </a>
        </div>
      </div>
      <ModalDrawer.Footer>
        <div class="flex flex-row items-center justify-center gap-4 py-4 px-6">
          <Button
            onClick={onClose}
            text="CANCEL"
            variant="tertiary"
            classes="flex-shrink-0 flex-grow basis-1/2"
          />
          <Button
            onClick={handleRSVP}
            text={rsvpButtonLabel}
            variant="primary"
            classes="flex-shrink-0 flex-grow basis-1/2"
            disabled={!rsvpStatus.isAcceptingRSVPs}
          />
        </div>
        {!rsvpStatus.isAcceptingRSVPs && (
          <div class="py-4 pt-0 px-6 text-center font-semibold">
            Event RSVP-ing is closed for this event.
          </div>
        )}
      </ModalDrawer.Footer>
    </ModalDrawer>
  );
}
