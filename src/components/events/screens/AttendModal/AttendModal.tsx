import { eventRSVPStatus, getRsvpButtonLabel } from '../../../../services/events.service';
import type { MeetupItem } from '../../../../types/types'
import Button from '../../components/Button/Button';
import ModalDrawer from '../../components/ModalDrawer/ModalDrawer';
import useAppStateContext from '../../contexts/AppStateProvider';

type AttendModalProps = {
  /** Close modal without submitting */
  onClose: () => void;
  onSignup: () => void;
}
export default function AttendModal({ onClose, onSignup }: AttendModalProps) {
  const {
    api: { attendModalState, currentEvent, group },
  } = useAppStateContext();
  
  const event = currentEvent.value;
  const groupInfo = group.value.data;

  if (!event || !groupInfo) {
    return null;
  }

  const {
    meetupId,
  } = event;

  const rsvpButtonLabel = getRsvpButtonLabel(event);
  const rsvpStatus = eventRSVPStatus(event);
  
  return (
    <ModalDrawer
      title="Attend event"
      isOpen={attendModalState.value.isOpen}
      onClose={onClose}
      maxHeightMobile={100}
      presentationMode="modal"
    >
      <div class="flex flex-col justify-center gap-2 mb-2">
        <h2 class="mt-4 text-3xl font-semibold tracking-tight">Attend event</h2>
        To do...
      </div>
      <ModalDrawer.Footer>
        <div class="flex flex-row items-center justify-center gap-4 py-4 px-6">
          <Button
            onClick={onClose}
            text="Cancel"
            variant="tertiary"
            classes="flex-shrink-0 flex-grow basis-1/2"
          />
          <Button
            onClick={onSignup}
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