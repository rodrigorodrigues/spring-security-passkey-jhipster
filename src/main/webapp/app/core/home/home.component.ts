import { type ComputedRef, defineComponent, inject, type Ref, ref } from 'vue';
import type AccountService from '@/account/account.service';
import type LoginService from '@/account/login.service';
import type PasskeyService from '@/account/passkey.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const authenticationPasskeyError: Ref<boolean> = ref(false);
    const accountService = inject<AccountService>('accountService');
    const loginService = inject<LoginService>('loginService');
    const passkeyService = inject<PasskeyService>('passkeyService');

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    const openLogin = () => {
      loginService.openLogin();
    };

    const doPasskeysLogin = async () => {
      try {
        authenticationPasskeyError.value = false;

        const responseRetrieveAccount = await passkeyService.doLogin();
        console.log(`responseRetrieveAccount: ${responseRetrieveAccount}`);
        if (responseRetrieveAccount) {
          await accountService.retrieveAccount();
          authenticationPasskeyError.value = false;
          loginService.hideLogin();
        } else {
          authenticationPasskeyError.value = true;
        }
      } catch (_error) {
        authenticationPasskeyError.value = true;
      }
    };

    return {
      authenticated,
      username,
      openLogin,
      doPasskeysLogin,
      authenticationPasskeyError,
    };
  },
});
