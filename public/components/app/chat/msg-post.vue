<template>
  <flex-box-card
    :md="12"
    :color=" theme.dark? 'grey darken-1' : 'grey lighten-4'"
    :outlined="true"
  >
    <template v-slot:system-bar>
      <v-system-bar
        :color="theme.dark? 'grey darken-3' : 'grey lighten-1'"
        :dark="theme.dark"
      >
        <v-spacer></v-spacer>
        <v-btn v-if="!isYouAuth(item.ownerId)" icon color="" @click="showContact" :title="$t('chat_messages.moreDetails')">
          <v-icon>mdi-account-question</v-icon>
        </v-btn>
        <v-btn v-if="isYouAuth(item.ownerId)" icon color="" @click="editMsg" :title="$t('chat_messages.edit')">
          <v-icon>mdi-playlist-edit</v-icon>
        </v-btn>
        <v-btn v-if="isYouAuth(item.ownerId)" icon color="" @click="removeMsg" :title="$t('chat_messages.remove')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-system-bar>
    </template>
    <template v-slot:card-title>
      <v-card-title class="pa-0">
        <v-list-item>
          <v-list-item-avatar size="36">
            <v-img :src="item.owner.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle :class="theme.dark? 'white--text' : 'black--text'">{{ item.owner.fullName }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.owner.role" >{{ item.owner.role.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-title>
    </template>
    <v-divider></v-divider>
    <div class="mt-3">{{ item.msg }}</div>
    <template v-slot:card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span class="grey--text mr-3">{{ `${getMsgAction()}:` }}</span>
        <span :class="item.isNew? 'subheading orange--text' : 'subheading grey--text'">{{ getMsgTime() }}</span>
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
        user: 'getUser',
        isYouAuth: 'isYouAuth',
      }),
    },
    methods: {
      showContact: function () {
        this.$emit('onClickShowContact', this.item.owner.id);
      },
      removeMsg: function () {
        this.$emit('onClickRemoveMsg', this.item.id);
      },
      editMsg: function () {
        this.$emit('onClickEditMsg', this.item.id);
      },
      getMsgAction() {
        let action = '';
        if(this.item.dt === this.item.dtUpdatedAt){
          action = this.$t('chat_messages.created');
        }else {
          action = this.item.msg? this.$t('chat_messages.changed') : this.$t('chat_messages.deleted');
        }
        return action.toLowerCase();
      },
      getMsgTime() {
        let tm = this.item.dt === this.item.dtUpdatedAt? this.item.dt.split(' ')[1] : this.item.dtUpdatedAt.split(' ')[1];
        const tms = tm.split(':');
        tm = `${tms[0]}:${tms[1]}`;
        return tm;
      }
    }
  }
</script>
