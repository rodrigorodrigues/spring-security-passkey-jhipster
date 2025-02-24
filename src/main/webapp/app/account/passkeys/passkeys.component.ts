import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';

import PasskeyService from '@/account/passkey.service';
import { type IPasskey } from '@/shared/model/passkey.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Passkeys',
  setup() {
    const passkeyService = inject('passkeyService', () => new PasskeyService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const passkeys: Ref<IPasskey[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const openPasskey = () => {
      passkeyService.openPasskey();
    };

    const retrievePasskeys = async () => {
      isFetching.value = true;
      try {
        const res = await passkeyService.retrieve();
        passkeys.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrievePasskeys();
    };

    onMounted(async () => {
      await retrievePasskeys();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IPasskey) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removePasskey = async () => {
      try {
        await passkeyService.delete(removeId.value);
        const message = `A Passkey is deleted with identifier ${removeId.value}`;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrievePasskeys();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      passkeys,
      handleSyncList,
      isFetching,
      retrievePasskeys,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removePasskey,
      openPasskey,
    };
  },
});
