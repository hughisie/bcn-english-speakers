import cn from "classnames";
import { signal } from "@preact/signals";
import { eventRSVPStatus } from "../../../../services/events.service";
import Button from "../../components/Button/Button";
import ModalDrawer from "../../components/ModalDrawer/ModalDrawer";
import useAppStateContext from "../../contexts/AppStateProvider";
import EventDateTime from "../EventModal/parts/EventDateTime";
import FormStepper from "./parts/FormStepper";

const readMore = signal(false);

type AttendModalProps = {
  /** Close modal without submitting */
  onClose: () => void;
  onSignup: () => void;
};
export default function AttendModal({ onClose, onSignup }: AttendModalProps) {
  const {
    api: { attendModalState, currentEvent, group, attendModalCanSubmitForm },
  } = useAppStateContext();

  const event = currentEvent.value;
  const groupInfo = group.value.data;

  if (!event || !groupInfo) {
    return null;
  }

  const { meetupId, title, description, location, rsvpType, eventConfig } =
    event;

  // const rsvpButtonLabel = getRsvpButtonLabel(event);
  const rsvpStatus = eventRSVPStatus(event);
  const handleReadMore = () => {
    readMore.value = !readMore.value;
  };

  return (
    <ModalDrawer
      title="Attend event"
      isOpen={attendModalState.value?.isOpen ?? false}
      onClose={onClose}
      maxHeightMobile={100}
      presentationMode="drawer"
      preventClose
    >
      <div class="flex flex-col justify-center gap-2 mb-2">
        <h2 class="mt-4 text-3xl font-semibold tracking-tight">{title}</h2>
        <div class="flex flex-col">
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            class={cn(
              "mt-6 prose tracking-tight overflow-hidden text-ellipsis pr-1",
              !readMore.value ? "line-clamp-2" : "max-h-48 overflow-y-auto"
            )}
          />

          {readMore.value === false && (
            <p class="text-right mt-0">
              <button type="button" onClick={handleReadMore} class="text-sky-700">
                show all...
              </button>
            </p>
          )}
        </div>

        <div class="border-b border-gray-900/10 pb-6 mt-6">
          <h2 class="text-xl/7 font-semibold text-gray-900 mb-4">Date/time</h2>
          <EventDateTime event={event} />
        </div>

        <FormStepper />
      </div>
      <ModalDrawer.Footer>
        <div class="flex flex-row items-center justify-center gap-4 py-4 px-6">
          <Button
            onClick={onClose}
            type='reset'
            text="CANCEL"
            variant="tertiary"
            classes="flex-shrink-0 flex-grow basis-1/2"
          />
          <Button
            onClick={onSignup}
            text={"SUBMIT"}
            // text={rsvpButtonLabel}
            variant="primary"
            classes="flex-shrink-0 flex-grow basis-1/2"
            disabled={!rsvpStatus.isAcceptingRSVPs || !attendModalCanSubmitForm.value}
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
