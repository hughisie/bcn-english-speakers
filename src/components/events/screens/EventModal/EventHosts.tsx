import type { MeetupItem } from "../../../../types/types";
import { RiAccountCircleFill } from '../../components/Icons/Icons';

type EventHostsProps = {
  event: MeetupItem;
};
export default function EventHosts({ event }: EventHostsProps) {
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
      <h2 class="text-base tracking-tight font-semibold">
        Hosts
      </h2>
      <div class="flex flex-row flex-wrap relative">
        {
          mainHosts.slice(0, 3).map((host) => (
            <div key={host.userId} class="rounded-full p-1 bg-slate-100 w-8 h-8 text-center leading-none text-xl flex justify-center items-center">
              <RiAccountCircleFill width={24} height={24} />
              {/* {host.isOrganiser ? "O" : "G"} */}
            </div>
          ))
        }
      </div>
    </div>
  );
}
