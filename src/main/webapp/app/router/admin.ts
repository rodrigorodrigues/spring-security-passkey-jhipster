import { Authority } from '@/shared/security/authority';

const JhiUserManagementComponent = () => import('@/admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('@/admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('@/admin/user-management/user-management-edit.vue');
const JhiDocsComponent = () => import('@/admin/docs/docs.vue');

export default [
  {
    path: '/spring-security-passkey/admin/user-management',
    name: 'JhiUser',
    component: JhiUserManagementComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/spring-security-passkey/admin/user-management/new',
    name: 'JhiUserCreate',
    component: JhiUserManagementEditComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/spring-security-passkey/admin/user-management/:userId/edit',
    name: 'JhiUserEdit',
    component: JhiUserManagementEditComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/spring-security-passkey/admin/user-management/:userId/view',
    name: 'JhiUserView',
    component: JhiUserManagementViewComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/spring-security-passkey/admin/docs',
    name: 'JhiDocsComponent',
    component: JhiDocsComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
];
