<template>
  <flex-box-card
    :md="12"
    :color=" theme.dark? 'grey darken-1' : 'grey lighten-4'"
    :outlined="true"
  >
    <template v-slot:card-title>
      <v-card-title class="pa-0">
        <v-list-item>
          <v-list-item-avatar size="36">
            <v-img :src="item.owner.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle :class="theme.dark? 'white--text' : 'black--text'">{{ item.owner.fullName }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.owner.role" >{{ item.owner.role.name }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="" @click="showContact" :title="$t('chat_messages.moreDetails')">
              <v-icon>mdi-account-question</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>
    </template>
    <v-divider></v-divider>
    <div class="mt-3">{{ item.msg }}</div>
    <template v-slot:card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span class="subheading orange--text">{{ item.dt.split(' ')[1] }}</span>
      </v-card-actions>
    </template>
  </flex-box-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';

  const debug = require('debug')('app:page.chat-messages');
  const isLog = false;

  export default {
    components: {
      FlexBoxCard
    },
    props: {
      item: Object,
    },
    created: function () {
      // debug('created.item:', this.item)
      // debug('created.users:', this.users)
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
    methods: {
      showContact: function () {
        this.$emit('onClickShowContact', this.item.owner.id);
      }
    }
  }
</script>
