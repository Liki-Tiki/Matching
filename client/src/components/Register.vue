<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense style="background: #FF5252" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <form
              name="register-form"
              autocomplete="off">
              <v-text-field
                label="E-mail"
                v-model="username"></v-text-field>
              <br/>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-password"></v-text-field>
              <v-text-field
                label="ConfirmPassword"
                type="password"
                v-model="confirmPassword"
                autocomplete="new-password"></v-text-field>
              <v-text-field
                label="Gender"
                type="gender"
                v-model="gender">
                </v-text-field>
              <v-text-field
                label="Orientation"
                type="orientation"
                v-model="orientation">
              </v-text-field>
              <br/>
              <v-alert
                v-if="error"
                :value="true"
                color="error"
                v-html="error"
                icon="warning"
              >
              </v-alert>
              <br/>
              <v-btn class="green"
                v-on:click="register" dark>
                Register
              </v-btn>
            </form>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        orientation: '',
        error: null
      }
    }
  }
</script>

<style scoped>
</style>
