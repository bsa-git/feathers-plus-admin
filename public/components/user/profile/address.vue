<template>
  <v-container fluid>
    <v-form @submit.prevent="onSubmit">
      <!--<v-container grid-list-md>-->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="15"
            v-validate="'max:15'"
            :error-messages="errors.collect('addressSuite')"
            data-vv-name="addressSuite"
            v-model="model.addressSuite"
            :label="$t('profile.addressSuite')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="25"
            v-validate="'max:25'"
            :error-messages="errors.collect('addressStreet')"
            data-vv-name="addressStreet"
            v-model="model.addressStreet"
            :label="$t('profile.addressStreet')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="25"
            v-validate="'max:25'"
            :error-messages="errors.collect('addressCity')"
            data-vv-name="addressCity"
            v-model="model.addressCity"
            :label="$t('profile.addressCity')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="15"
            v-validate="{ regex: $util.getRegex('zip_code')}"
            :error-messages="errors.collect('addressZipCode')"
            data-vv-name="addressZipCode"
            v-model="model.addressZipCode"
            :label="$t('profile.addressZipCode')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="15"
            v-validate="'max:15'"
            :error-messages="errors.collect('addressState')"
            data-vv-name="addressState"
            v-model="model.addressState"
            :label="$t('profile.addressState')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="5"
            v-validate="'max:5'"
            :error-messages="errors.collect('addressStateAbbr')"
            data-vv-name="addressStateAbbr"
            v-model="model.addressStateAbbr"
            :label="$t('profile.addressStateAbbr')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="25"
            v-validate="'max:25'"
            :error-messages="errors.collect('addressCountry')"
            data-vv-name="addressCountry"
            v-model="model.addressCountry"
            :label="$t('profile.addressCountry')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="5"
            v-validate="'max:5'"
            :error-messages="errors.collect('addressCountryCode')"
            data-vv-name="addressCountryCode"
            v-model="model.addressCountryCode"
            :label="$t('profile.addressCountryCode')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="10"
            v-validate="{ regex: $util.getRegex('lat')}"
            :error-messages="errors.collect('addressLatitude')"
            data-vv-name="addressLatitude"
            v-model="model.addressLatitude"
            :label="$t('profile.addressLatitude')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="10"
            v-validate="{ regex: $util.getRegex('long')}"
            :error-messages="errors.collect('addressLongitude')"
            data-vv-name="addressLongitude"
            v-model="model.addressLongitude"
            :label="$t('profile.addressLongitude')"
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
        loadingSubmit: false,
        error: undefined,
        model: {
          addressSuite: '',
          addressStreet: '',
          addressCity: '',
          addressState: '',
          addressStateAbbr: '',
          addressCountry: '',
          addressCountryCode: '',
          addressZipCode: '',
          addressLatitude: '',
          addressLongitude: '',
        },
      }
    },
    created: function () {
      if (this.user) {
        this.model.addressSuite = this.user.profile.addressSuite;
        this.model.addressStreet = this.user.profile.addressStreet;
        this.model.addressCity = this.user.profile.addressCity;
        this.model.addressState = this.user.profile.addressState;
        this.model.addressStateAbbr = this.user.profile.addressStateAbbr;
        this.model.addressCountry = this.user.profile.addressCountry;
        this.model.addressCountryCode = this.user.profile.addressCountryCode;
        this.model.addressZipCode = this.user.profile.addressZipCode;
        this.model.addressLatitude = this.user.profile.addressLatitude;
        this.model.addressLongitude = this.user.profile.addressLongitude;
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
              this.loadingSubmit = false;
            }, 1000);
          }
        }
      },
      onClear() {
        this.model.addressSuite = '';
        this.model.addressStreet = '';
        this.model.addressCity = '';
        this.model.addressState = '';
        this.model.addressStateAbbr = '';
        this.model.addressCountry = '';
        this.model.addressCountryCode = '';
        this.model.addressZipCode = '';
        this.model.addressLatitude = '';
        this.model.addressLongitude = '';
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
            addressSuite: data.addressSuite,
            addressStreet: data.addressStreet,
            addressCity: data.addressCity,
            addressState: data.addressState,
            addressStateAbbr: data.addressStateAbbr,
            addressCountry: data.addressCountry,
            addressCountryCode: data.addressCountryCode,
            addressZipCode: data.addressZipCode,
            addressLatitude: data.addressLatitude,
            addressLongitude: data.addressLongitude,
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
        }
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }

  };
</script>

