import { RiAccountCircleFill } from "../../../components/Icons/Icons";
import { MeetupRsvpAttendanceStatusEnum, type MeetupGroupItem, type MeetupItem } from '../../../types/types';
import { getGuestList } from '../../../utils/utils';

type EventGuestsProps = {
  event: MeetupItem;
  group: MeetupGroupItem | null;
};
export default function EventGuests({ event, group }: EventGuestsProps) {
  const { rsvps } = event;
  const confirmedGuests = getGuestList(rsvps, MeetupRsvpAttendanceStatusEnum.Coming);

  // TODO...
  return (
    <div class="flex flex-col gap-2">
      <h2 class="text-base tracking-tight font-semibold">Guests</h2>
      <div class="flex flex-row items-start gap-2">
        <RiAccountCircleFill width={24} height={24} />

        <div class="flex flex-row flex-wrap relative flex-grow">
          {confirmedGuests.length} guest/s
        </div>
      </div>
    </div>
  );
}
