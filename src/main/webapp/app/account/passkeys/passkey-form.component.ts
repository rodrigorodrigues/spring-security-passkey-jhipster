import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type PasskeyService from '@/account/passkey.service';
import { parseRegistration } from '@passwordless-id/webauthn/dist/esm/parsers';

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const passkeyError: Ref<boolean> = ref(false);
    const label: Ref<string> = ref(null);
    const router = useRouter();

    const passkeyService = inject<PasskeyService>('passkeyService');

    const doRegisterPasskey = async () => {
      try {
        passkeyError.value = false;

        const registerPasskey = await passkeyService.doRegister(label.value);
        console.log(`registerPasskey: ${registerPasskey}`);
        if (registerPasskey) {
          passkeyError.value = false;
          passkeyService.hidePasskey();
        } else {
          passkeyError.value = true;
        }
      } catch (_error) {
        passkeyError.value = true;
      }
    };

    return {
      passkeyError,
      label,
      doRegisterPasskey,
    };
  },
});
