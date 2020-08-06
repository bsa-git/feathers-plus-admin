<template>
  <v-scroll-y-transition mode="out-in">
    <div
      v-if="!item"
      key="title"
      class="title font-weight-light grey--text pa-4 text-center"
    >
      {{ $t('chat_contacts.selectUser') }}
    </div>
    <v-card
      v-else
      :key="item.id"
      color="secondary"
      :dark="theme.dark"
      class="pt-6 mx-auto"
      flat
      max-width="400"
    >
      <v-card-text>
        <v-avatar
          size="120"
        >
          <v-img
            :src="item.avatar"
            class="mb-6"
          ></v-img>
        </v-avatar>
        <h3 class="headline mb-2">
          {{ item.fullName }}
        </h3>
        <div class="primary--text mb-2">{{ item.email }}</div>
        <div class="primary--text subheading font-weight-bold">{{ item.roleName }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-row
        class="text-left"
        tag="v-card-text"
      >
        <v-col class="text-right mr-4 mb-2" tag="strong" cols="5" v-if="item.profile.jobCompanyName">Company:</v-col>
        <v-col v-if="item.profile.jobCompanyName">{{ item.profile.jobCompanyName }}</v-col>
        <v-col class="text-right mr-4 mb-2" tag="strong" cols="5" v-if="item.profile.jobWebSite">Website:</v-col>
        <v-col v-if="item.profile.jobWebSite"><a :href="item.profile.jobWebSite" target="_blank">{{
          item.profile.jobWebSite }}</a></v-col>
        <v-col class="text-right mr-4 mb-2" tag="strong" cols="5" v-if="item.profile.personalPhone">Phone:</v-col>
        <v-col v-if="item.profile.personalPhone">{{ item.profile.personalPhone }}</v-col>
      </v-row>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    components: {},
    props: {
      item: Object,
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
    methods: {}
  }
</script>
