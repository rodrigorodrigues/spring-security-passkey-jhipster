<template>
  <div class="modal-body">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <b-alert show data-cy="passkeyError" variant="danger" v-if="passkeyError"
          ><strong>Failed to register passkey!</strong> Please check your credentials and try again.</b-alert
        >
      </div>
      <div class="col-md-8">
        <b-form @submit.prevent="doRegisterPasskey()">
          <b-form-group label="Label" label-for="label">
            <b-form-input id="label" type="text" name="label" autofocus placeholder="Your label" v-model="label" data-cy="label">
            </b-form-input>
          </b-form-group>
          <div>
            <b-button data-cy="submit" type="submit" variant="primary">Register Passkey</b-button>
          </div>
        </b-form>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./passkey-form.component.ts"></script>
