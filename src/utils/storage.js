import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`Error obtained variable for key AsyncStorage ${key}`);
  }
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`Error creating variable for key AsyncStorage ${key}`);
  }
};

const getDataFormat = async (Variable) => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    if (keys.length !== 0) {
      const result = await getData(Variable);
      return result;
    } else {
      console.log(`There is no varieble ${Variable}`);
    }
  } catch (e) {
    console.log(`Error when searching for key AsyncStorage ${e}`);
  }
};

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};



export const storageResult = {
  getData,
  storeData,
  getDataFormat,
  removeItemValue
};
