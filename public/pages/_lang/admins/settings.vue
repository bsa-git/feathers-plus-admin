<template>
  <div>
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card>
          <!-- Toolbar -->
          <v-toolbar color="primary" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>{{ $t('settings.environment') }}</v-toolbar-title>
          </v-toolbar>
          <v-list three-line subheader>
            <!-- Sub Header -->
            <v-subheader>{{ $t('settings.general') }}</v-subheader>
            <!-- GENERAL -->
            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>HOST</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.host }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PORT</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.port }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>NODE_ENV</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.nodeEnv }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>BASE_URL</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.baseUrl }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>HOME_PATH</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.homePath }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>DEBUG</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.debug }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <!-- DATABASE -->
            <!--
            <v-subheader>{{ $t('settings.database') }}</v-subheader>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>MONGODB</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.mongodb }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            -->

            <!-- SECRET DATA -->
            <!--
            <v-subheader>{{ $t('settings.secretData') }}</v-subheader>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>GMAIL</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.gmail }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>GMAIL_PASSWORD</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.gmail_password }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>GITHUB_ID</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.githubId }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>GITHUB_SECRET</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.githubSecret }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>GOOGLE_ID</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.googleId }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>GOOGLE_SECRET</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.googleSecret }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            -->

            <!-- AUTHORIZATION -->
            <v-subheader>{{ $t('settings.authorization') }}</v-subheader>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>EXTERNAL_ACCOUNTS</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.externalAccounts }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>ROLES</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.roles }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PUBLIC_PATHS</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.publicPaths }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PUBLIC_SERVICES</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.publicServices }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>ADMIN_PATHS</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.adminPaths }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>ADMIN_SERVICES</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.adminServices }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <!-- LOG-MESSAGES -->
            <v-subheader>{{ $t('settings.logMessages') }}</v-subheader>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>LOGMSG_ENABLE</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.logMsgEnable }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>LOGMSG_MAXROWS</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.logMsgMaxRows }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <!-- PERSONAL-DATA -->
            <v-subheader>{{ $t('settings.personalData') }}</v-subheader>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_IS_AVATAR</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.isAvatar }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_ICON</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.logoImage }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_LOGO_TITLE</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.logoTitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_COPYRIGHT</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.copyright }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_WEBSITE</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.website }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_EMAIL</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-content>
                <v-list-item-title>PERSONAL_GITHUB_PROJECT</v-list-item-title>
                <v-list-item-subtitle v-html>{{ config.githubProject }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('settings.title'),
        description: this.$t('settings.description'),
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
