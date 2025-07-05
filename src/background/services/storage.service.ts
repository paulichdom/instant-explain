import { IStorageService } from "@/shared/interfaces/IStorageService";

type StorageArea = "local" | "managed" | "session" | "sync";

export class StorageService implements IStorageService {
  constructor(private storageArea: StorageArea = "local") {}

  private get api() {
    return chrome.storage[this.storageArea];
  }

  async get(keys?: string | string[] | object | null): Promise<object> {
    try {
      const result = await this.api.get(keys);
      return result;
    } catch (error) {
      console.error(`Error getting storage key(s) "${keys}":`, error);
      throw error;
    }
  }

  async set(items: object): Promise<void> {
    try {
      await this.api.set(items);
    } catch (error) {
      console.error(`Error setting storage items:`, error);
      throw error;
    }
  }

  async remove(keys: string | string[]): Promise<void> {
    try {
      await this.api.remove(keys);
    } catch (error) {
      console.error(`Error removing storage key(s) "${keys}":`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.api.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }

  async getBytesInUse(keys?: string | string[] | null): Promise<number> {
    try {
      return await this.api.getBytesInUse(keys);
    } catch (error) {
      console.error(`Error getting bytes in use for key(s) "${keys}":`, error);
      throw error;
    }
  }

  async getKeys(): Promise<string[]> {
    try {
      return await this.api.getKeys();
    } catch (error) {
      console.error("Error getting keys:", error);
      throw error;
    }
  }

  async setAccessLevel(accessOptions: {
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" | "TRUSTED_CONTEXTS";
  }): Promise<void> {
    try {
      await this.api.setAccessLevel(accessOptions);
    } catch (error) {
      console.error("Error setting access level:", error);
      throw error;
    }
  }
}
