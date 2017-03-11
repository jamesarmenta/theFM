import React from 'react';
import { AsyncStorage } from 'react-native';

async function createMemory(imagePath) {
  let date = new Date().getTime().toString();
  let memoryObject = { date: date, imagePath: imagePath, viewed: 1 };
  let memoryValue = JSON.stringify(memoryObject)

  try {
    await AsyncStorage.setItem('memory:' + date, memoryValue)
    return memoryObject
  } catch (error) {
    console.log('ERROR OCURRED CREATING MEMORY');
  }
}

async function getStorageItem(key) {
  try {
    let memoryValue = await AsyncStorage.getItem(key);
    memoryValue = JSON.parse(memoryValue);
    return memoryValue;
  } catch (error) {
    console.log('ERROR OCURRED GETTING MEMORY');
  }
}

async function getAllMemories() {
  let memoryKeys = []
  let memoryValues = []
  try {
    //GET ALL KEYS
    let allKeys = await AsyncStorage.getAllKeys();
    for (var i = 0; i < allKeys.length; i++) {
      //GET MEMORY KEYS
      if (allKeys[i].indexOf('memory') > -1) {
        memoryKeys.push(allKeys[i])
      }
    }
    //GET VALUES OF MEMORIES
    for (var i = 0; i < memoryKeys.length; i++) {
      memoryValues[i] = await getStorageItem(memoryKeys[i])
    }
    return memoryValues
  } catch (error) {}
}

async function setStorageItem(key,value){
  try {
    value = JSON.stringify(value);
    AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('ERROR SETTING STORAGE ITEM',key);
  }
}

async function memoryViewed(date) {
  let currentMemory = await getStorageItem('memory:' + date);
  let newViews = parseInt(currentMemory.viewed) + 1;
  currentMemory.viewed = newViews;
  setStorageItem('memory:'+date,currentMemory)
}

export { createMemory, getStorageItem, getAllMemories, memoryViewed }
