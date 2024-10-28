import type { MeetupItem } from "../../../../types/types";
import { getEventDateReadout, getMonthName } from '../../utils/utils';

type EventDateTimeProps = {
  event: MeetupItem;
};
export default function EventDateTime({ event }: EventDateTimeProps) {
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const { date, time } = getEventDateReadout(start, end, true);
  return (
    <div class="flex flex-row gap-2 items-center">
      <div>
        <MiniCalendar start={start} />
      </div>
      <div>
        <div class="flex flex-col gap-1">
          <p class="font-semibold text-sm">{date}</p>
          <p class="text-sm">{time}</p>
        </div>
      </div>
    </div>
  );
}


type MiniCalendarProps = {
  start: Date;
};
function MiniCalendar({ start }: MiniCalendarProps) {
  return (
    <div class="flex flex-col justify-stretch items-center rounded-md border border-slate-200 w-12">
      <p class="text-xs py-0.5 text-center px-1 w-full bg-slate-200">{getMonthName(start.getMonth()).toUpperCase()}</p>
      <p class="font-semibold text-base py-0.5 px-1">{start.getDate()}</p>
    </div>
  );
}