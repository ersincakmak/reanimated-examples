import { useReducer } from 'react';

export const useReducerState = <T extends object>(initialData: T) =>
  useReducer(
    (state: T, newState: Partial<T>) => ({
      ...state,
      ...newState,
    }),
    initialData,
  );
