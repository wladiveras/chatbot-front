import { defineStore } from 'pinia'
import { PROFILE } from "@/__mocks__/profile"
import type { IProfile, IStateProfile } from '~/types';

const TESTING = true;

export const useProfileStore = defineStore('profile', {
  state: (): IStateProfile => ({
    profile: {} as IProfile
  }),
  actions: {
    async fetchProfile() {
      if (TESTING) {
        this.profile = PROFILE;
      }
    }
  }
});
