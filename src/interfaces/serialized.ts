/**
 * Utility type to get the serialized version of an interface.
 * 
 * Considering conversion between the following interfaces:
 *  - Date -> string
 */
export type Serialized<T> = {
    [P in keyof T]: T[P] extends Date ? string : T[P];
}
