import type { Signal } from "@preact/signals";
import EventItem from "./EventItem";
import SkeletonShape from "../../components/Skeleton/SkeletonShape";
import SkeletonText from "../../components/Skeleton/SkeletonText";
import type { MeetupGroupItem, MeetupItem } from '../../../../types/types';
import EventModal from '../EventModal/EventModal';
import useAppStateContext from '../../contexts/AppStateProvider';

type EventsListProps = {
  meetups: MeetupItem[];
  group: MeetupGroupItem | null;
  viewEvent: (item: MeetupItem) => void;
};
export default function EventsList({ meetups, group, viewEvent }: EventsListProps) {
  const {
    api: {
      handleCloseModals,
    },
  } = useAppStateContext();
  
  if (!meetups || !group) {
    return (
      <div class="flex flex-col gap-1">
        {[0,1,2].map(i => {
          return <EventsListSkeleton key={i} />
        })}
      </div>
    );
  }

  return (
    <div class="py-6 px-4 mt-4">
      <h2 class="text-3xl font-bold">Events</h2>

      {meetups.map((item) => (
        <EventItem item={item} key={item.meetupId} group={group} viewEvent={() => viewEvent(item)} />
      ))}
      <EventModal onClose={handleCloseModals} />
    </div>
  );
}

function EventsListSkeleton() {
  return (
    <div class="relative aspect-[2] flex flex-col justify-center items-center gap-4 p-4">
      <SkeletonShape
        class="w-full h-32"
        style={{
          "--height": "160px",
        }}
      />
      <SkeletonText class="w-full h-8" />
      <SkeletonText class="w-full h-8" />
    </div>
  );
}
