import { Authority } from '@/shared/security/authority';

const Register = () => import('@/account/register/register.vue');
const Activate = () => import('@/account/activate/activate.vue');
const ResetPasswordInit = () => import('@/account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('@/account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('@/account/change-password/change-password.vue');
const Settings = () => import('@/account/settings/settings.vue');
const Sessions = () => import('@/account/sessions/sessions.vue');
const JhiPasskeysComponent = () => import('@/account/passkeys/passkeys.vue');

export default [
  {
    path: '/spring-security-passkey/account/passkeys',
    name: 'Passkeys',
    component: JhiPasskeysComponent,
  },
  {
    path: '/spring-security-passkey/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/spring-security-passkey/account/activate',
    name: 'Activate',
    component: Activate,
  },
  {
    path: '/spring-security-passkey/account/reset/request',
    name: 'ResetPasswordInit',
    component: ResetPasswordInit,
  },
  {
    path: '/spring-security-passkey/account/reset/finish',
    name: 'ResetPasswordFinish',
    component: ResetPasswordFinish,
  },
  {
    path: '/spring-security-passkey/account/password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/spring-security-passkey/account/sessions',
    name: 'Sessions',
    component: Sessions,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/spring-security-passkey/account/settings',
    name: 'Settings',
    component: Settings,
    meta: { authorities: [Authority.USER] },
  },
];
