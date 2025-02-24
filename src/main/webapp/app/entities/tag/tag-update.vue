<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2 id="jhipsterPasskeyApp.tag.home.createOrEditLabel" data-cy="TagCreateUpdateHeading">Create or edit a Tag</h2>
        <div>
          <div class="form-group" v-if="tag.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="tag.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tag-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="tag-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label for="tag-entry">Entry</label>
            <select
              class="form-control"
              id="tag-entries"
              data-cy="entry"
              multiple
              name="entry"
              v-if="tag.entries !== undefined"
              v-model="tag.entries"
            >
              <option :value="getSelected(tag.entries, postOption, 'id')" v-for="postOption in posts" :key="postOption.id">
                {{ postOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./tag-update.component.ts"></script>
