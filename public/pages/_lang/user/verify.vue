<template>
  <!--=== Page TopBar ===-->
  <page-top-bar
    :page-title="description"
  ></page-top-bar>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import PageTopBar from '~/components/widgets/TopBars/PageTitleAndProgCircular';
  import Auth from '~/plugins/lib/auth-client.class';
  import Http from '~/plugins/lib/http.client.class';
  const debug = require('debug')('app:page.user-verify');

  const isLog = false;
  const isDebug = false;

  export default {
    components: {
      PageTopBar
    },
    data() {
      return {
        title: this.$t('authManagement.titleVerifySignUp'),
        description: this.$t('authManagement.descriptionVerifySignUp'),
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
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
