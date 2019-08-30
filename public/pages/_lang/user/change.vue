<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <div class="text-md-center">
        <div class="exotic--light display-1 mt-5">{{ description }}</div>
        <v-progress-circular class="mt-5"
          :size="80"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Auth from '~/plugins/lib/auth-client.class';
  import Http from '~/plugins/lib/http.client.class';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  const debug = require('debug')('app:page.user-change');

  const isLog = false;
  const isDebug = false;

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('authManagement.titleIdentityChange'),
        description: this.$t('authManagement.descriptionIdentityChange'),
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
//        const idFieldUser = this.$store.state.users.idField;
        const http = new Http();
        const token = http.getParams('token');
        if (isDebug) debug('action.token:', token);
        if (isDebug) debug('<<verifySignUpLong>> Start verifySignUpLong');
        const changeUser = await Auth.verifySignupLong(token);
        if (changeUser){
          // Get new avatar
//          const avatar = new this.$Avatar(changeUser.email);
//          const avatarImage = await avatar.getImage();
//          let userData = {
//            [idFieldUser]: changeUser[idFieldUser],
//            avatar: avatarImage
//          };
//          const user = new User(userData);
//          await user.save();
          if (isDebug) debug('verifySignUpLong.OK');
          this.showSuccess(this.$t('authManagement.successfulUserVerification'));
          if(!this.isAuth){
            const encodeParam = Http.urlEncode(changeUser.email);
            this.$redirect(`/user/login?email=${encodeParam}`);
          }else {
            this.$redirect(this.config.homePath);
          }
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
        isAuth: 'isAuth'
      }),
    },
    methods: {
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
