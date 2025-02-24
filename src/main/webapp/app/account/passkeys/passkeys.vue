<template>
  <!--
  <iframe
    src="/webauthn/register"
    width="100%"
    height="900"
    seamless
    target="_top"
    title="Passkeys UI"
    class="border-0"
    data-cy="swagger-frame"
  ></iframe>
  -->
  <div>
    <h2 id="page-heading" data-cy="PasskeyHeading">
      <span id="passkey-heading">Passkeys</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh list</span>
        </button>
        <button
          @click="openPasskey()"
          id="jh-create-entity"
          data-cy="entityCreateButton"
          class="btn btn-primary jh-create-entity create-passkey"
        >
          <font-awesome-icon icon="plus"></font-awesome-icon>
          <span>Create a new Passkey</span>
        </button>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && passkeys && passkeys.length === 0">
      <span>No passkeys found</span>
    </div>
    <div class="table-responsive" v-if="passkeys && passkeys.length > 0">
      <table class="table table-striped" aria-describedby="passkeys">
        <thead>
          <tr>
            <th scope="row"><span>Label</span></th>
            <th scope="row"><span>Created</span></th>
            <th scope="row"><span>Last Used</span></th>
            <th scope="row"><span>Signature Count</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="passkey in passkeys" :key="passkey.id" data-cy="entityTable">
            <td>{{ passkey.label }}</td>
            <td>{{ passkey.created }}</td>
            <td>{{ passkey.lastUsed }}</td>
            <td>{{ passkey.signatureCount }}</td>
            <td>
              {{ passkey.user ? passkey.user.login : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <b-button
                  @click="prepareRemove(passkey)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="jhipsterPasskeyApp.passkey.delete.question" data-cy="passkeyDeleteDialogHeading">Confirm delete operation</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-passkey-heading">Are you sure you want to delete Passkey {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" @click="closeDialog()">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-passkey"
            data-cy="entityConfirmDeleteButton"
            @click="removePasskey()"
          >
            Delete
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./passkeys.component.ts"></script>
