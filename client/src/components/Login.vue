<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense style="background: #FF5252;" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="E-mail"
              v-model="username"></v-text-field>
            <br/>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"></v-text-field>
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
              v-on:click="login" dark>
              Login
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: null
      }
    }
  }
</script>

<style scoped>
</style>
