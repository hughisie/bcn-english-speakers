import type { Signal } from "@preact/signals";
import type { AppState } from "../../state/state";
import EventItem from "./EventItem";

type EventsListProps = {
  state: Signal<AppState>;
};
export default function EventsList({ state }: EventsListProps) {
  const { data = null } = state.value.meetups;
  const { data: groupData = null } = state.value.groupInfo;
  if (!data || !groupData) {
    return <div>Loading list...</div>;
  }

  return (
    <div class="py-6 px-4">
      <h2 class="text-2xl font-bold">Events</h2>

      {data.map((item) => (
        <EventItem item={item} key={item.meetupId} group={groupData} />
      ))}
    </div>
  );
}
