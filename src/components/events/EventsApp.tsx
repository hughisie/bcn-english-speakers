/* eslint-disable no-unused-vars */
import { type Signal, signal } from "@preact/signals";
// import cn from 'classnames';
import { AppStateProvider } from "./contexts/AppStateProvider";
import { initialState, type AppState } from "./state/state";

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
  return <div class="mx-auto max-w-lg min-h-[100vh]">App here</div>;
}
