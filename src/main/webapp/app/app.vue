<template>
  <div id="app">
    <ribbon></ribbon>
    <div id="app-header">
      <jhi-navbar></jhi-navbar>
    </div>
    <div class="container-fluid">
      <div class="card jh-card">
        <router-view></router-view>
      </div>
      <b-modal id="login-page" hide-footer lazy>
        <template #modal-title>
          <span data-cy="loginTitle" id="login-title">Sign in</span>
        </template>
        <login-form></login-form>
      </b-modal>
      <b-modal id="passkey-page" hide-footer lazy>
        <template #modal-title>
          <span data-cy="passkeyTitle" id="passkey-title">Register Passkey</span>
        </template>
        <passkey-form></passkey-form>
      </b-modal>

      <jhi-footer></jhi-footer>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
