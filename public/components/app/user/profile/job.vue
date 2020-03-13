<template>
  <v-container fluid>
    <v-form @submit.prevent="onSubmit">
      <!--<v-container grid-list-md>-->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="20"
            v-validate="'max:20'"
            :error-messages="errors.collect('jobCompanyName')"
            data-vv-name="jobCompanyName"
            v-model="model.jobCompanyName"
            :label="$t('profile.jobCompanyName')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="35"
            v-validate="'max:35'"
            :error-messages="errors.collect('jobTitle')"
            data-vv-name="jobTitle"
            v-model="model.jobTitle"
            :label="$t('profile.jobTitle')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="15"
            v-validate="'max:15'"
            :error-messages="errors.collect('jobType')"
            data-vv-name="jobType"
            v-model="model.jobType"
            :label="$t('profile.jobType')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="15"
            v-validate="{ regex: $util.getRegex('phone')}"
            :error-messages="errors.collect('jobPhone')"
            data-vv-name="jobPhone"
            v-model="model.jobPhone"
            :label="$t('profile.jobPhone')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-validate="'email'"
            :error-messages="errors.collect('jobEmail')"
            data-vv-name="jobEmail"
            v-model="model.jobEmail"
            :label="$t('profile.jobEmail')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-validate="'url'"
            :error-messages="errors.collect('jobWebSite')"
            data-vv-name="jobWebSite"
            v-model="model.jobWebSite"
            :label="$t('profile.jobWebSite')"
          ></v-text-field>
        </v-col>
      </v-row>
      <!--</v-container>-->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" :loading="loadingSubmit">
          {{ $t('profile.save') }}
        </v-btn>
        <v-btn @click="onClear" class="ml-3">
          {{ $t('login.clear') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import createLogMessage from '~/plugins/service-helpers/create-log-message';

  const debug = require('debug')('app:comp.user-profile-address');
  const isLog = false;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {},
    data() {
      return {
        saveLogMessage: null,
        loadingSubmit: false,
        error: undefined,
        model: {
          jobCompanyName: '',
          jobTitle: '',
          jobType: '',
          jobPhone: '',
          jobWebSite: '',
          jobEmail: '',
        },
      }
    },
    created: function () {
      if (this.user) {
        this.model.jobCompanyName = this.user.profile.jobCompanyName;
        this.model.jobTitle = this.user.profile.jobTitle;
        this.model.jobType = this.user.profile.jobType;
        this.model.jobPhone = this.user.profile.jobPhone;
        this.model.jobWebSite = this.user.profile.jobWebSite;
        this.model.jobEmail = this.user.profile.jobEmail;
      }
      this.saveLogMessage = createLogMessage(this.$store);
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
              this.loadingSubmit = false;
            }, 1000);
          }
        }
      },
      onClear() {
        this.model.jobCompanyName = '';
        this.model.jobTitle = '';
        this.model.jobType = '';
        this.model.jobPhone = '';
        this.model.jobWebSite = '';
        this.model.jobEmail = '';
        this.$validator.reset();
        this.dismissError();
      },
      dismissError() {
        this.error = undefined;
      },

      async save(data) {
        const idFieldUserProfile = this.$store.state['user-profiles'].idField;
        const {UserProfile} = this.$FeathersVuex;
        try {
          let profileData = {
            [idFieldUserProfile]: this.user.profile.id,
            jobCompanyName: data.jobCompanyName,
            jobTitle: data.jobTitle,
            jobType: data.jobType,
            jobPhone: data.jobPhone,
            jobWebSite: data.jobWebSite,
            jobEmail: data.jobEmail,
          };
          const userProfile = new UserProfile(profileData);
          return await userProfile.save();
        } catch (error) {
          if (isLog) debug('userProfile.save.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          this.showError(error.message);
          // Recover user profile data
          await UserProfile.get(this.user.profile.id);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }

  };
</script>

