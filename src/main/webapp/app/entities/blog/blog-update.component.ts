import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import BlogService from './blog.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';
import { Blog, type IBlog } from '@/shared/model/blog.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BlogUpdate',
  setup() {
    const blogService = inject('blogService', () => new BlogService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const blog: Ref<IBlog> = ref(new Blog());
    const userService = inject('userService', () => new UserService());
    const users: Ref<Array<any>> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveBlog = async blogId => {
      try {
        const res = await blogService().find(blogId);
        blog.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.blogId) {
      retrieveBlog(route.params.blogId);
    }

    const initRelationships = () => {
      userService()
        .retrieve()
        .then(res => {
          users.value = res.data;
        });
    };

    initRelationships();

    const validations = useValidation();
    const validationRules = {
      name: {
        required: validations.required('This field is required.'),
        minLength: validations.minLength('This field is required to be at least 3 characters.', 3),
      },
      handle: {
        required: validations.required('This field is required.'),
        minLength: validations.minLength('This field is required to be at least 2 characters.', 2),
      },
      user: {},
    };
    const v$ = useVuelidate(validationRules, blog as any);
    v$.value.$validate();

    return {
      blogService,
      alertService,
      blog,
      previousState,
      isSaving,
      currentLanguage,
      users,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.blog.id) {
        this.blogService()
          .update(this.blog)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(`A Blog is updated with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.blogService()
          .create(this.blog)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(`A Blog is created with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
