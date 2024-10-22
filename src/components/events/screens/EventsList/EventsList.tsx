import type { Signal } from "@preact/signals";
import type { AppState } from "../../state/state";
import type { MeetupItem } from "../../../../types/types";

type EventsListProps = {
  state: Signal<AppState>;
};
export default function EventsList({ state }: EventsListProps) {
  const { data = null } = state.value.meetups;
  if (!data) {
    return <div>Loading list...</div>;
  }

  return (
    <div class="my-6">
      {data.map((item) => (
        <ListItem item={item} key={item.meetupId} />
      ))}
    </div>
  );
}

type ListItemProps = {
  item: MeetupItem;
};
function ListItem({ item }: ListItemProps) {
  return <div class="my-6">{item.title}</div>;
}
