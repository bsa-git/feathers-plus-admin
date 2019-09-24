<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-1 pa-3">
          <v-card-title>
            <v-spacer></v-spacer>
            <router-link :to="$i18n.path(config.homePath)" class="close-icon">
              <v-icon>clear</v-icon>
            </router-link>
          </v-card-title>
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="headline align-center">{{ $t('authManagement.titleNewPwd') }}</div>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      append-icon="lock"
                      v-validate="'required|min:3'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      v-model="model.password"
                      :label="$t('login.password')"
                      type="password"
                      ref="confirmation"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      append-icon="lock"
                      v-validate="'required|confirmed:confirmation'"
                      :error-messages="errors.collect('passwordConfirmation')"
                      data-vv-name="passwordConfirmation"
                      v-model="model.passwordConfirmation"
                      :label="$t('signup.passwordConfirmation')"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" type="submit" :loading="loadingSubmit">
                {{ $t('profile.save') }}
              </v-btn>
              <v-btn block @click="onClear">
                {{ $t('login.clear') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import Auth from '~/plugins/lib/auth-client.class';
  import Http from '~/plugins/lib/http.client.class';

  const debug = require('debug')('app:page.user-forgot');

  const isLog = true;
  const isDebug = true;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
//      AppPageHeader
    },
    data() {
      return {
        title: this.$t('authManagement.titleResetPwd'),
        description: this.$t('authManagement.descriptionResetPwd'),
        loadingSubmit: false,
        error: undefined,
        model: {
          password: '',
          passwordConfirmation: ''
        }
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    created: function () {
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
    },
    methods: {
      async onSubmit() {
        if (isDebug) debug('<<onSubmit>> Start onSubmit');
        this.error = undefined;
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError({text: 'Validation Error!', timeout: 10000});
        } else {
          this.loadingSubmit = true;
          try {
            const http = new Http();
            const token = http.getParams('token');
            if (isDebug) debug('token:', token);
            const user = await Auth.resetPwdLong(token, this.model.password);
            if (user) {
              if (isLog) debug('onSubmit.user:', user);
              this.showSuccess(this.$t('authManagement.successfulResetPwd'));
              const encodeParam = Http.urlEncode(user.email);
              this.$redirect(`/user/login?email=${encodeParam}`);
            } else {
              this.showError(this.$t('authManagement.errorUserResetPwd'));
              this.$redirect(this.config.homePath);
            }
          } catch (error) {
            if (isLog) debug('onSubmit.error:', error);
            this.error = error;
            this.showError(error.message);
          }
        }
      },
      onClear() {
        this.model.password = '';
        this.model.passwordConfirmation = '';
        this.$validator.reset();
        this.error = undefined;
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
