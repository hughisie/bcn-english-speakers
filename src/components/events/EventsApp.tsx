/* eslint-disable no-unused-vars */
import { type Signal, signal } from "@preact/signals";
// import cn from 'classnames';
import { AppStateProvider } from "./contexts/AppStateProvider";
import { initialState, type AppState } from "./state/state";
import EventsList from "./screens/EventsList/EventsList";
import { useEffect } from "preact/hooks";
import {
  getEventsByOrganiserId,
  getGroupInfo,
  hasUpdatedRecently,
} from "../../services/events.service";
import GroupHeader from './components/GroupHeader';

export default function EventsApp() {
  const LOCAL_STORAGE_KEYS = {
    APP_STATE: "APP_STATE",
  } as const;

  const getStoredAppData = (): AppState => {
    if (typeof window.localStorage === "undefined") return { ...initialState };
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEYS.APP_STATE);
    if (value === null) return { ...initialState };
    return JSON.parse(value);
  };

  const appState = signal(getStoredAppData());

  // effect(() => {
  //   window.localStorage.setItem(LOCAL_STORAGE_KEYS.APP_STATE, JSON.stringify(appState.value));
  // });

  // useEffect here to fetch group ID and events for the group
  useEffect(() => {
    if (
      appState.value.groupInfo.data &&
      hasUpdatedRecently(appState.value.groupInfo.lastFetched)
    ) {
      return;
    }
    const p1 = getGroupInfo;
    const p2 = getEventsByOrganiserId;
    (async () => {
      const groupInfo = await p1();
      if (!groupInfo || !groupInfo.data) {
        throw new Error("Failed to fetch group");
      }

      const meetups = await p2();

      appState.value = {
        ...appState.value,
        groupInfo,
        meetups,
      };
    })();
  }, [appState]);

  return (
    <AppStateProvider appState={appState}>
      <App appState={appState} />
    </AppStateProvider>
  );
}

type AppProps = {
  appState: Signal<AppState>;
};
function App({ appState }: AppProps) {
  const {
    value: { currentScreen },
  } = appState;
  return (
    <div>
      <div class="mx-auto max-w-xl min-h-[100vh] border border-slate-200 rounded-b-lg">
        <GroupHeader state={appState} />
        <div>
        <hr />
        {currentScreen === "HOME" && <EventsList state={appState} />}
        </div>
      </div>
    </div>
  );
}
