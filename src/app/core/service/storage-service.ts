import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  onSaveItem(key: string, item: any) {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.log('Err: ', err);
    }
  }
  onGetItem(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (value != '' && value != null && typeof value != 'undefined') {
        return JSON.parse(value!);
      }
    } catch (err) {
      console.log('ERR: ', err);
    }
  }
  onRemoveItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.log('Err: ', err);
    }
  }
}
