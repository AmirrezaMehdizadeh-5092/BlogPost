import axios from 'axios';
import { defineStore } from 'pinia';

export const useStore = defineStore('myStore', {
  state: () => ({
    api: 'http://localhost:5092',
  }),
});