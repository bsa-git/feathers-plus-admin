<template>
  <v-container fluid>
    <confirm-dialog
      :confirm-dialog="confirmDialog"
      :title-dialog="$t('profile.titleDialog')"
      :text-dialog="$t('profile.textDialog')"
      :run-action="remove"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>
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
              <div class="layout column align-center">
                <v-avatar size="120"><img :src="model.avatar"></v-avatar>
                <router-link :to="$i18n.path(config.homePath)">
                  <h1 class="my-4 primary--text font-weight-light">Material Admin Template</h1>
                </router-link>
              </div>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      :counter="15"
                      v-validate="'required|max:20'"
                      :error-messages="errors.collect('firstName')"
                      data-vv-name="firstName"
                      v-model="model.firstName"
                      :label="$t('signup.firstName')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      :counter="20"
                      v-validate="'required|max:20'"
                      :error-messages="errors.collect('lastName')"
                      data-vv-name="lastName"
                      v-model="model.lastName"
                      :label="$t('signup.lastName')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      append-icon="email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('email')"
                      data-vv-name="email"
                      v-model="model.email"
                      :label="$t('login.email')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      append-icon="lock"
                      v-validate="'min:3'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      v-model="model.password"
                      :label="$t('login.password')"
                      type="password"
                      ref="confirmation"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
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
              <v-btn block @click="confirmDialog = true" :loading="loadingRemove" color="error">
                {{ $t('profile.removeAccount') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import ConfirmDialog from '~/components/layout/ConfirmDialog';

  const debug = require('debug')('app:page.user-profile');

  const isLog = true;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      ConfirmDialog,
    },
    data() {
      return {
        title: this.$t('profile.title'),
        description: this.$t('profile.description'),
        confirmDialog: false,
        loadingSubmit: false,
        loadingRemove: false,
        error: undefined,
        model: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
          password: '',
          passwordConfirmation: ''
        },
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
      if (this.user) {
        this.model.avatar = this.user.avatar;
        this.model.firstName = this.user.firstName;
        this.model.lastName = this.user.lastName;
        this.model.email = this.user.email;
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
      ...mapState('auth', [
        'user'
      ]),
    },
    methods: {
      async onSubmit() {
        this.dismissError();
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError('Validation Error!');
        } else {
          this.loadingSubmit = true;
          if (isLog) debug('onSubmit.formData:', this.model);
          const profileResponse = await this.save(this.model);
          if (profileResponse) {
            if (isLog) debug('onSubmit.profileResponse:', profileResponse);
            this.showSuccess(`${this.$t('profile.successSaveUser')}!`);
            setTimeout(() => {
              this.$router.push(this.$i18n.path(this.config.homePath));
            }, 1000);
          }
        }
      },
//      clearAll() {
//        this.$validator.reset();
//        this.dismissError();
//      },
      isChangeEmail() {
        return (this.model.email !== this.user.email);
      },
      isChangePassword() {
        return !!this.model.password;
      },
      dismissError() {
        this.error = undefined;
        this.clearError()
      },

      async save(data) {
        try {
          const idFieldUser = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          let userData = {
            [idFieldUser]: this.user[idFieldUser],
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
          if (this.isChangeEmail()) {
            const avatar = new this.$Avatar(data.email);
            userData.avatar = await avatar.getImage();
          }
          if (this.isChangePassword()) {
            userData.password = data.password;
          }
          const user = new User(userData);
          return await user.save();
        } catch (error) {
          if (isLog) debug('user.save.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          this.showError(error.message);
        }
      },

      async remove() {
        try {
          this.loadingRemove = true;
          const idFieldUser = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          const user = new User({
            [idFieldUser]: this.user[idFieldUser],
          });
          await user.remove();
          this.showSuccess(`${this.$t('profile.successRemoveUser')}!`);
          setTimeout(() => {
            this.logout();
            this.$router.push(this.$i18n.path(this.config.homePath));
          }, 1000);
        } catch (error) {
          if (isLog) debug('user.remove.error:', error);
          this.loadingRemove = false;
          this.error = error;
          this.showError(error.message);
        }
      },

      ...mapMutations('auth', {
        clearError: 'clearAuthenticateError'
      }),
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
      ...mapActions(['logout'])
    }

  };
</script>

