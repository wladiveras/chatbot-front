import type { IProfile, IStateProfile } from "~/types";

const makeRequests = useMakeRequests();

export const useProfileStore = defineStore("profile", {
  state: (): IStateProfile => ({
    loading: false,
    profile: {} as IProfile,
  }),
  actions: {
    async fetchProfile() {
      const connectionStore = useConnectionsStore();
      const { getToken, getNumber } = storeToRefs(connectionStore);

      this.loading = true;

      await makeRequests
        .post(`/integration/whatsapp/${getToken.value}/profile`, {
          number: getNumber.value,
        })
        .then((res) => {
          this.profile = res.data.service.payload;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
