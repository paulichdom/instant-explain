export interface IStorageService {
  get(keys?: string | string[] | object | null): Promise<object>;
  set(items: object): Promise<void>;
  remove(keys: string | string[]): Promise<void>;
  clear(): Promise<void>;
  getBytesInUse(keys?: string | string[] | null): Promise<number>;
  getKeys(): Promise<string[]>;
  setAccessLevel(accessOptions: { accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" | "TRUSTED_CONTEXTS" }): Promise<void>;
}
