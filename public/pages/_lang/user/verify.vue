<template>
  <v-container fluid>
    <!--<app-page-header-->
      <!--:app-menu="appMenu"-->
      <!--:home-path="config.homePath"-->
    <!--&gt;</app-page-header>-->
    <v-layout align-center justify-center row>
      <div class="text-md-center">
        <div class="exotic--light display-1 mt-5">{{ description }}</div>
        <v-progress-circular class="mt-5"
          :size="80"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <!--<v-btn color="primary" @click="action">-->
          <!--Verify SignUp Long-->
        <!--</v-btn>-->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import Auth from '~/plugins/lib/auth-client.class';
  import Http from '~/plugins/lib/http.client.class';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  const debug = require('debug')('app:page.user-verify');

  const isLog = true;
  const isDebug = true;

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('authManagement.titleVerifySignUp'),
        description: this.$t('authManagement.descriptionVerifySignUp'),
//        appMenu: appMenu,
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
    created: async function () {
      try {
        const http = new Http();
        const token = http.getParams('token');
        if (isDebug) debug('action.token:', token);
        const user = await Auth.verifySignupLong(token);
        if (user.isVerified){
          this.showSuccess(this.$t('authManagement.successfulUserVerification'));
          const encodeParam = Http.urlEncode(user.email);
          this.$redirect(`/user/login?email=${encodeParam}`);
        } else {
          this.showError(this.$t('authManagement.errorUserVerification'));
          this.$redirect(this.config.homePath);
        }
      } catch (error) {
        if (isLog) debug('action.error:', error);
        this.error = error;
        if(error.message === 'User not found.'){
          this.showError(this.$t('authManagement.msgForErrorUserNotFind'));
        }else {
          this.showError(error.message);
        }
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
    },
    methods: {
//      async action() {
//        try {
//          const http = new Http();
//          const token = http.getParams('token');
//          if (isDebug) debug('action.token:', token);
//          const user = await Auth.verifySignupLong(token);
//          if (user.isVerified){
//            this.showSuccess(this.$t('authManagement.successfulUserVerification'));
//            this.$redirect('/user/login');
//          } else {
//            this.showError(this.$t('authManagement.errorUserVerification'));
//            this.$redirect(this.config.homePath);
//          }
//        } catch (error) {
//          if (isLog) debug('action.error:', error);
//          this.error = error;
//          if(error.message === 'User not found.'){
//            this.showError(this.$t('authManagement.msgForErrorUserNotFind'));
//          }else {
//            this.showError(error.message);
//          }
//        }
//      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
