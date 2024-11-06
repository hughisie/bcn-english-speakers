import { RiAccountCircleFill } from "../../../components/Icons/Icons";
import type { MeetupGroupItem, MeetupItem } from '../../../types/types';

type EventHostsProps = {
  event: MeetupItem;
  group: MeetupGroupItem | null;
};
export default function EventHosts({ event, group }: EventHostsProps) {
  const { hosts } = event;
  const mainHosts = hosts.sort((a, b) =>
    b.isOrganiser && !a.isOrganiser
      ? 1
      : !b.isOrganiser && !a.isOrganiser
      ? 0
      : -1
  );

  return (
    <div class="flex flex-col gap-2">
      <h2 class="text-base tracking-tight font-semibold">Hosts</h2>
      <div class="flex flex-row items-start gap-2">
        <RiAccountCircleFill width={24} height={24} />

        <div class="flex flex-row flex-wrap relative flex-grow">
          {mainHosts.length} host/s
          {/* {mainHosts.slice(0, 99).map((host) => (
            <div
              key={host.userId}
              class="rounded-full p-1 bg-slate-100 w-6 h-6 text-center leading-none text-xl flex justify-center items-center"
            >
              {host.isOrganiser ? "O" : "G"}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
