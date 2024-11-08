import { useEffect } from "preact/hooks";
import GroupHeader from "./components/GroupHeader/GroupHeader";
import type { MeetupItem } from './types/types';
import useAppStateContext from "./contexts/AppStateProvider";
import EventsList from "./screens/EventsList/EventsList";
import { getEventsByOrganiserId, getGroupInfo, hasUpdatedRecently } from './services/meetup.service';

export default function MainApp() {
  console.log("Rendering MainApp.tsx");
  const {
    api: {
      currentScreen,
      group,
      setGroup,
      meetups,
      setMeetups,
      handleShowEventModal
    },
  } = useAppStateContext();

  const handleViewEvent = (newMeetup: MeetupItem) => {
    handleShowEventModal(newMeetup);
  };

  // useEffect here to fetch group ID and events for the group
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      group.value.data === null &&
      hasUpdatedRecently(group.value.lastFetched)
    ) {
      return;
    }

    const p1 = getGroupInfo;
    const p2 = getEventsByOrganiserId;
    (async () => {
      
      // @todo - try-catch here if fails getting group info
      const groupInfo = await p1();

      if (!groupInfo || !groupInfo.data) {
        throw new Error("Failed to fetch group");
      }
      setGroup(groupInfo);

      // @todo - try-catch here if fails getting events
      const meetups = await p2();
      setMeetups(meetups);
    })();
  }, []);

  return (
    <div class="bg-slate-100 pb-12">
      <div class="mx-auto max-w-xl min-h-[100vh] bg-white rounded-b-lg">
        <GroupHeader group={group.value.data} />
        <div>
          <hr />
          {currentScreen.value === "HOME" && (
            <EventsList
              meetups={meetups.value.data}
              group={group.value.data}
              viewEvent={(newMeetup) => handleViewEvent(newMeetup)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
