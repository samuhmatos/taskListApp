import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "./storageType";

async function getOne<Data>(key: StorageKeys): Promise<Data> {
  var data = await AsyncStorage.getItem(key);
  return JSON.parse(data) as Data;
}

async function set(key: StorageKeys, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const storageUtils = {
  getOne,
  set,
};
