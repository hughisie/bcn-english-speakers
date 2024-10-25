import Button from '../../components/Button/Button';
import ModalDrawer from '../../components/ModalDrawer/ModalDrawer';
import useAppStateContext from '../../contexts/AppStateProvider';

type EventModalProps = {
  onClose: () => void;
};
export default function EventModal({ onClose }: EventModalProps) {
  const {
    api: { modalState, currentEvent },
  } = useAppStateContext();

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
      isOpen={modalState.value.openId === 'EVENTS'}
      onClose={onClose}
      maxHeightMobile={100}
      // preventClose
    >
      <div class="flex flex-col justify-center gap-2 my-4 mb-2">
        <h2 class="text-xl text-center text-black font-light uppercase">Event</h2>
        <p class="text-lg text-black font-bold">Event stuff here?</p>
      </div>
      <ModalDrawer.Footer>
        <div class="flex flex-row items-center justify-center gap-4 py-4 px-6">
          <Button onClick={onClose} text="Cancel" variant="outline" classes="flex-shrink-0 flex-grow basis-1/2" />
          <Button
            onClick={handleRSVP}
            text="RSVP"
            variant="secondary"
            classes="flex-shrink-0 flex-grow basis-1/2"
          />
        </div>
      </ModalDrawer.Footer>
    </ModalDrawer>
  );
}
