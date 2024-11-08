import { computed } from "@preact/signals";
import { AppStateProvider, type Api } from "./contexts/AppStateProvider";
import { initialState, type AppState } from "./state/state";
import { LOCAL_STORAGE_KEYS } from './config/config';
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

  const api: Api = {
    currentScreen: computed(() => storedAppState.currentScreen),
    setCurrentScreen: () => {},
    currentEvent: computed(() => storedAppState.currentEvent),
    setCurrentEvent: () => { },
    modalState: computed(() => storedAppState.modalState),
    setModalState: () => { },
    attendModalState: computed(() => storedAppState.attendModalState),
    setAttendModalState: () => { },
    attendModalCanSubmitForm: computed(() => false),
    handleShowEventModal: () => { },
    handleShowAttendModal: () => { },
    handleCloseAttendModal: () => { },
    handleSubmitRsvp: () => { },
    group: computed(() => storedAppState.groupInfo),
    setGroup: () => { },
    meetups: computed(() => storedAppState.meetups),
    setMeetups: () => { },
    handleCloseModals: () => {},
    restartApp: () => { },
  }

  return (
    <AppStateProvider api={api}>
      <MainApp />
    </AppStateProvider>
  );
}

