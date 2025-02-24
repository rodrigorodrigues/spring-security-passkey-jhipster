import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import TagService from './tag.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import PostService from '@/entities/post/post.service';
import { type IPost } from '@/shared/model/post.model';
import { type ITag, Tag } from '@/shared/model/tag.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TagUpdate',
  setup() {
    const tagService = inject('tagService', () => new TagService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const tag: Ref<ITag> = ref(new Tag());

    const postService = inject('postService', () => new PostService());

    const posts: Ref<IPost[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveTag = async tagId => {
      try {
        const res = await tagService().find(tagId);
        tag.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.tagId) {
      retrieveTag(route.params.tagId);
    }

    const initRelationships = () => {
      postService()
        .retrieve()
        .then(res => {
          posts.value = res.data;
        });
    };

    initRelationships();

    const validations = useValidation();
    const validationRules = {
      name: {
        required: validations.required('This field is required.'),
        minLength: validations.minLength('This field is required to be at least 2 characters.', 2),
      },
      entries: {},
    };
    const v$ = useVuelidate(validationRules, tag as any);
    v$.value.$validate();

    return {
      tagService,
      alertService,
      tag,
      previousState,
      isSaving,
      currentLanguage,
      posts,
      v$,
    };
  },
  created(): void {
    this.tag.entries = [];
  },
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.tag.id) {
        this.tagService()
          .update(this.tag)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(`A Tag is updated with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.tagService()
          .create(this.tag)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(`A Tag is created with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    getSelected(selectedVals, option, pkField = 'id'): any {
      if (selectedVals) {
        return selectedVals.find(value => option[pkField] === value[pkField]) ?? option;
      }
      return option;
    },
  },
});
