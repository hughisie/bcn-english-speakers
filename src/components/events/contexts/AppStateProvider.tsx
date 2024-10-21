import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import type { Signal } from "@preact/signals";
import type { AppState } from '../state/state';

export type AppStateProps = {
  appState: Signal<AppState>;
};
const AppStateContext = createContext<AppStateProps | undefined>(undefined);

type AppStateProviderProps = AppStateProps & {
  children: ComponentChildren;
};
export function AppStateProvider({ children, appState }: AppStateProviderProps) {
  return (
    <AppStateContext.Provider value={{
      appState
    }}>{children}</AppStateContext.Provider>
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
