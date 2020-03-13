<template>
  <div class="main-content">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t('authManagement.titleNewPwd') }}</span>
            <v-spacer></v-spacer>
            <router-link :to="$i18n.path(config.homePath)" class="close-icon">
              <v-icon>mdi-close</v-icon>
            </router-link>
          </v-card-title>
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="text-center">
                <v-icon size="120">mdi-shield-refresh</v-icon>
              </div>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    append-icon="mdi-lock"
                    v-validate="'required|min:3'"
                    :error-messages="errors.collect('password')"
                    data-vv-name="password"
                    v-model="model.password"
                    :label="$t('login.password')"
                    type="password"
                    ref="confirmation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    append-icon="mdi-lock"
                    v-validate="'required|confirmed:confirmation'"
                    :error-messages="errors.collect('passwordConfirmation')"
                    data-vv-name="passwordConfirmation"
                    v-model="model.passwordConfirmation"
                    :label="$t('signup.passwordConfirmation')"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loading="loadingSubmit">
                {{ $t('profile.save') }}
              </v-btn>
              <v-btn @click="onClear">
                {{ $t('login.clear') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import appMenu from '~/api/app/app-menu';
  import Auth from '~/plugins/auth/auth-client.class';
  import Http from '~/plugins/lib/http.client.class';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';

  const debug = require('debug')('app:page.user-forgot');
  const isLog = false;
  const isDebug = false;

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
        saveLogMessage: null,
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
      this.saveLogMessage = createLogMessage(this.$store);
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
            this.saveLogMessage('ERROR-CLIENT', {error});
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
