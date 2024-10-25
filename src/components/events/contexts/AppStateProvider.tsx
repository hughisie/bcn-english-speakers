import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import { effect, signal, type Signal } from "@preact/signals";
import { initialState, type AppState } from "../state/state";
import type { ScreensType } from "../types/types";
import type { MeetupItem } from "../../../types/types";
import { LOCAL_STORAGE_KEYS } from "../types/config";

function createAppState(appState: AppState) {

  const restartApp = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.APP_STATE);
    window.location.reload();
  };

  const currentScreen = signal(appState.currentScreen);
  const setCurrentScreen = (newScreen: ScreensType) => {
    currentScreen.value = newScreen;
  };

  const modalState = signal(appState.modalState);
  const setModalState = (newState: AppState["modalState"]) => {
    modalState.value = { ...newState };
  };

  const currentEvent = signal(appState.currentEvent);
  const setCurrentEvent = (newEvent: AppState["currentEvent"]) => {
    currentEvent.value = newEvent;
  };

  const handleShowEventModal = (newEvent: MeetupItem) => {
    setCurrentEvent(newEvent);
    setModalState({
      ...modalState.value,
      openId: "EVENTS",
    });
  };

  const group = signal(appState.groupInfo);
  const setGroup = (newGroup: AppState["groupInfo"]) => {
    group.value = newGroup;
  };

  const meetups = signal(appState.meetups);
  const setMeetups = (newMeetups: AppState["meetups"]) => {
    meetups.value = newMeetups;
  };

  const handleCloseModals = () => {
    setModalState({
      openId: undefined,
    });
  };

  const addToStorage = (newState: AppState) => {
    if (typeof window.localStorage === "undefined") return;
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.APP_STATE,
      JSON.stringify(newState)
    );
  };

  effect(() => {
    // update storage when main state changes
    const newAppState: AppState = {
      ...appState,
      currentScreen: currentScreen.value,
      modalState: modalState.value,
      currentEvent: currentEvent.value,
      groupInfo: {
        ...appState.groupInfo,
        ...group.value,
      },
      meetups: {
        ...appState.meetups,
        ...meetups.value,
      },
    };
    addToStorage(newAppState);
  });

  return {
    currentScreen,
    setCurrentScreen,
    modalState,
    setModalState,
    currentEvent,
    setCurrentEvent,

    handleShowEventModal,

    group,
    setGroup,
    meetups,
    setMeetups,
    
    handleCloseModals,
    restartApp,
  };
}

type Api = {
  currentScreen: Signal<string>;
  setCurrentScreen: (newScreen: ScreensType) => void;
  currentEvent: Signal<AppState["currentEvent"]>;
  setCurrentEvent: (newEvent: AppState["currentEvent"]) => void;
  modalState: Signal<AppState["modalState"]>;
  setModalState: (newState: AppState["modalState"]) => void;
  handleShowEventModal: (newEvent: MeetupItem) => void;
  group: Signal<AppState["groupInfo"]>;
  setGroup: (newGroup: AppState["groupInfo"]) => void;
  meetups: Signal<AppState["meetups"]>;
  setMeetups: (newMeetups: AppState["meetups"]) => void;
  handleCloseModals: () => void;
  restartApp: () => void;
};

export type AppStateProps = {
  api: Api;
};
const AppStateContext = createContext<AppStateProps | undefined>(undefined);

type AppStateProviderProps = AppStateProps & {
  children: ComponentChildren;
};
export function AppStateProvider({ children }: AppStateProviderProps) {
  const getStoredAppData = (): AppState => {
    if (typeof window.localStorage === "undefined") return { ...initialState };
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEYS.APP_STATE);
    if (value === null) return { ...initialState };
    return JSON.parse(value);
  };

  const storedAppState = getStoredAppData();

  const {
    currentScreen,
    setCurrentScreen,
    modalState,
    setModalState,
    currentEvent,
    setCurrentEvent,
    group,
    setGroup,
    meetups,
    setMeetups,

    handleCloseModals,
    handleShowEventModal,
    restartApp,
  } = createAppState(storedAppState);
  return (
    <AppStateContext.Provider
      value={{
        api: {
          currentScreen,
          setCurrentScreen,
          currentEvent,
          setCurrentEvent,
          modalState,
          setModalState,
          group,
          setGroup,
          meetups,
          setMeetups,
          handleShowEventModal,
          handleCloseModals,
          restartApp,
        },
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "useAppStateContext must be used within an AppStateProvider"
    );
  }
  return context;
}
