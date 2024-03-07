/**
 * Represents a recursive partial type that allows partial updates of nested properties.
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
