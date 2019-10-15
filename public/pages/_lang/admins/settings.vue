<template>
  <v-container fluid>
    <app-page-header
      :app-menu="appMenu"
      :home-path="config.homePath"
    ></app-page-header>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <div class="text-xs-center">
          <div class="exotic--light display-1 my-3">{{ description }}</div>
        </div>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>{{ $t('settings.environment') }}</v-toolbar-title>
          </v-toolbar>
          <v-list three-line subheader>
            <!-- GENERAL -->
            <v-subheader>{{ $t('settings.general') }}</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>NODE_ENV</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.nodeEnv }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>BASE_URL</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.baseUrl }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>HOME_PATH</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.homePath }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>DEBUG</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.debug }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <!-- DATABASE -->
            <v-subheader>{{ $t('settings.database') }}</v-subheader>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>MONGODB</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.mongodb }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <!-- SECRET DATA -->
            <v-subheader>{{ $t('settings.secretData') }}</v-subheader>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>GMAIL</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.gmail }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>GMAIL_PASSWORD</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.gmail_password }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>GITHUB_ID</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.githubId }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>GITHUB_SECRET</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.githubSecret }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>GOOGLE_ID</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.googleId }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>GOOGLE_SECRET</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.googleSecret }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <!-- AUTHORIZATION -->
            <v-subheader>{{ $t('settings.authorization') }}</v-subheader>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>IS_AUTH_MNG</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.isAuthMng }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>EXTERNAL_ACCOUNTS</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.externalAccounts }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>ROLES</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.roles }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PUBLIC_PATHS</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.publicPaths }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PUBLIC_SERVICES</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.publicServices }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>ADMIN_PATHS</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.adminPaths }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>ADMIN_SERVICES</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.adminServices }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <!-- PERSONAL DATA -->
            <v-subheader>{{ $t('settings.personalData') }}</v-subheader>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_IS_AVATAR</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.isAvatar }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_ICON</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.logoImage }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_LOGO_TITLE</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.logoTitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_COPYRIGHT</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.copyright }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_WEBSITE</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.website }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_EMAIL</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.email }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>PERSONAL_GITHUB_PROJECT</v-list-tile-title>
                <v-list-tile-sub-title v-html>{{ config.githubProject }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
        </v-card>
      </v-flex>
      <!--<v-flex xs12 sm6 offset-sm3>-->
        <!---->
      <!--</v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('settings.title'),
        description: this.$t('settings.description'),
        appMenu: appMenu,
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
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
    },
  }
</script>
