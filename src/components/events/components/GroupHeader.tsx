import type { Signal } from '@preact/signals';
import type { AppState } from '../state/state';

type GroupHeaderProps = {
  state: Signal<AppState>;
}
export default function GroupHeader({ state }: GroupHeaderProps) {

  if (state.value.groupInfo.data) {
    return (
      <div>Group: {state.value.groupInfo.data?.groupName}</div>
    )
  }
  return <div>Loading group info...</div>
}