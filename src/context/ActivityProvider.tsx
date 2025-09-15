import React, { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export type Category = "study" | "work" | "relax" | "other";

export interface Activity {
  id: string;
  name: string;
  date?: string | null; // ISO string
  duration: number; // hours
  cost: number; // vnđ
  category: Category;
  completed?: boolean;
  createdAt: string;
  updatedAt?: string;
}

type State = Activity[];

type Action =
  | { type: "ADD"; payload: Omit<Activity, "id" | "createdAt" | "updatedAt"> }
  | { type: "UPDATE"; payload: Activity }
  | { type: "DELETE"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "SET"; payload: Activity[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const newItem: Activity = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: false,
        ...action.payload,
      };
      return [newItem, ...state];
    }
    case "UPDATE":
      return state.map((a) => (a.id === action.payload.id ? { ...action.payload, updatedAt: new Date().toISOString() } : a));
    case "DELETE":
      return state.filter((a) => a.id !== action.payload);
    case "TOGGLE":
      return state.map((a) => (a.id === action.payload ? { ...a, completed: !a.completed, updatedAt: new Date().toISOString() } : a));
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

const ActivityContext = createContext<{
  activities: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [persisted, setPersisted] = useLocalStorage<Activity[]>("activities_v1", []);
  const [state, dispatch] = useReducer(reducer, persisted);

  // keep storage in sync
  React.useEffect(() => setPersisted(state), [state, setPersisted]);

  return <ActivityContext.Provider value={{ activities: state, dispatch }}>{children}</ActivityContext.Provider>;
}

export function useActivities() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivities must be used inside ActivityProvider");
  return ctx;
}
