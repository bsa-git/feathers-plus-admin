<template>
  <div class="main-content">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <!-- Form title -->
          <v-card-title>
            <v-icon class="mr-3">mdi-account-circle</v-icon>
            <span class="headline">{{ currentTitle(step) }}</span>
            <v-spacer></v-spacer>
            <v-btn
              v-on:click="close"
              icon
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-close</v-icon>
                </template>
                <span>{{ $t('management.close') }}</span>
              </v-tooltip>
            </v-btn>
          </v-card-title>
          <!-- User avatar -->
          <v-card-title>
            <div class="layout column align-center">
              <v-avatar size="120"><img :src="model.avatar"></v-avatar>
            </div>
          </v-card-title>
          <v-window v-model="step">
            <!-- Account Form -->
            <v-window-item :value="0">
              <v-card-text>
                <account-form></account-form>
              </v-card-text>
            </v-window-item>
            <!-- Personal Form -->
            <v-window-item :value="1">
              <v-card-text>
                <personal-form></personal-form>
              </v-card-text>
            </v-window-item>
            <!-- Address Form -->
            <v-window-item :value="2">
              <v-card-text>
                <address-form></address-form>
              </v-card-text>
            </v-window-item>
            <!-- Job Form -->
            <v-window-item :value="3">
              <v-card-text>
                <job-form></job-form>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions class="justify-space-between">
            <v-btn
              :disabled="step === 0"
              depressed
              @click="prev"
              icon
            >
              <v-icon large>mdi-menu-left</v-icon>
            </v-btn>

            <!--<v-spacer></v-spacer>-->
            <v-item-group
              v-model="step"
              class="text-xs-center"
              mandatory
            >
              <v-item
                v-for="n in steps"
                :key="`btn-${n}`"
              >
                <v-btn
                  slot-scope="{ active, toggle }"
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-panorama-fisheye</v-icon>
                    </template>
                    <span>{{ currentTitle(n-1) }}</span>
                  </v-tooltip>
                </v-btn>
              </v-item>
            </v-item-group>

            <v-btn
              :disabled="step === steps - 1"
              depressed
              @click="next"
              icon
            >
              <v-icon large>mdi-menu-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import AccountForm from '~/components/user/profile/account';
  import PersonalForm from '~/components/user/profile/personal';
  import AddressForm from '~/components/user/profile/address';
  import JobForm from '~/components/user/profile/job';

  const debug = require('debug')('app:page.user-profile');

  const isLog = true;

  export default {
    layout: 'user',
    components: {
      AccountForm,
      PersonalForm,
      AddressForm,
      JobForm
    },
    data() {
      return {
        title: this.$t('profile.title'),
        description: this.$t('profile.description'),
        step: 0,
        steps: 4,
        model: {
          avatar: ''
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
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        user: 'getUser'
      }),
    },
    methods: {
      next() {
        this.step = this.step + 1;
      },
      prev() {
        this.step = this.step - 1;
      },
      close() {
        const path = this.$i18n.path(this.config.homePath);
        this.$redirect(path);
      },
      currentTitle(step) {
        switch (step) {
          case 0:
            return this.$t('profile.userAccount');
          case 1:
            return this.$t('profile.userPersonalData');
          case 2:
            return this.$t('profile.userAddress');
          case 3:
            return this.$t('profile.userJob');
          default:
            return 'Account created'
        }
      }
    }

  };
</script>

