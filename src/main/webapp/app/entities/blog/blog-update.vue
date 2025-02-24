<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2 id="jhipsterPasskeyApp.blog.home.createOrEditLabel" data-cy="BlogCreateUpdateHeading">Create or edit a Blog</h2>
        <div>
          <div class="form-group" v-if="blog.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="blog.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="blog-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="blog-name"
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
            <label class="form-control-label" for="blog-handle">Handle</label>
            <input
              type="text"
              class="form-control"
              name="handle"
              id="blog-handle"
              data-cy="handle"
              :class="{ valid: !v$.handle.$invalid, invalid: v$.handle.$invalid }"
              v-model="v$.handle.$model"
              required
            />
            <div v-if="v$.handle.$anyDirty && v$.handle.$invalid">
              <small class="form-text text-danger" v-for="error of v$.handle.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="blog-user">User</label>
            <select class="form-control" id="blog-user" data-cy="user" name="user" v-model="blog.user">
              <option :value="null"></option>
              <option
                :value="blog.user && userOption.id === blog.user.id ? blog.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
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
<script lang="ts" src="./blog-update.component.ts"></script>
