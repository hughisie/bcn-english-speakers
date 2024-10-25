import { computed } from "@preact/signals";
import { AppStateProvider } from "./contexts/AppStateProvider";
import { initialState, type AppState } from "./state/state";
import { LOCAL_STORAGE_KEYS } from './types/config';
import MainApp from './MainApp';

export default function EventsApp() {
  console.log('Rendering EventsApp.tsx');
  
  const getStoredAppData = (): AppState => {
    if (typeof window.localStorage === "undefined") return { ...initialState };
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEYS.APP_STATE);
    if (value === null) return { ...initialState };
    return JSON.parse(value);
  };
  const storedAppState = getStoredAppData();

  return (
    <AppStateProvider api={{
      currentScreen: computed(() => storedAppState.currentScreen),
      setCurrentScreen: () => {},
      currentEvent: computed(() => storedAppState.currentEvent),
      setCurrentEvent: () => { },
      modalState: computed(() => storedAppState.modalState),
      setModalState: () => { },
      handleShowEventModal: () => { },
      group: computed(() => storedAppState.groupInfo),
      setGroup: () => { },
      meetups: computed(() => storedAppState.meetups),
      setMeetups: () => { },
      handleCloseModals: () => {},
      restartApp: () => { },
    }}>
      <MainApp />
    </AppStateProvider>
  );
}

