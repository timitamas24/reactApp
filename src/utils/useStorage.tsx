import { Storage } from "@capacitor/storage";
import { ContractProps } from "../models/ContractProps";

export const useStorage = () => {
  const set = (key: string, value: any) => Storage.set({ key, value: JSON.stringify(value) });
  const get = async (key: string) => {
    const result = await Storage.get({ key });
    return result.value === null ? null : JSON.parse(result.value);
  }
  const remove = (key: string) => Storage.remove({ key });
  return { set, get, remove };
};
