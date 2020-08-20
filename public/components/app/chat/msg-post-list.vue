<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      color="secondary"
      :dark="theme.dark"
      elevation="0"
    >
      <!-- No Posts -->
      <div
        v-if="!(items && items.length)"
        key="title"
        class="title font-weight-light grey--text pa-4 text-center"
      >
        {{ $t('chat_messages.noPosts') }}
      </div>
      <template v-else v-for="item in getItems">
        <!-- dtDate -->
        <div>
          <div v-if="item.dtDate">
            <div  class="d-flex justify-center">
              <v-chip
                class="ma-2"
                small
              >
                {{ item.dtDate }}
              </v-chip>
            </div>
            <v-divider></v-divider>
          </div>
          <!-- Messages List -->
          <flex-box
            :md="6"
            :justify="item.isOwnerAuth? 'end' : 'start'"
          >
            <msg-post
              :ref="item.goToPost? 'goToPost' : ''"
              :item="item"
              v-on:onClickShowContact="onShowContact"
              v-on:onClickRemoveMsg="onRemoveMsg"
              v-on:onClickEditMsg="onEditMsg"
            ></msg-post>
          </flex-box>
        </div>
      </template>
      <v-card-actions>
        <msg-post-input
          v-if="isSelectedItem"
          :label="$t('chat_messages.typeMessage')"
          :btn-title="$t('chat_messages.sendMsg')"
          :msgInput="msgInput"
          v-on:onMsgInput="modelMsgInput"
          v-on:onClickSend="clickSendMsg"
        ></msg-post-input>
      </v-card-actions>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FlexBox from '~/components/widgets/containers/flex-box';
  import MsgPost from '~/components/app/chat/msg-post';
  import MsgPostInput from '~/components/app/chat/msg-post-input';

  const debug = require('debug')('app:comp.msg-post-list');
  const isLog = false;

  export default {
    components: {
      FlexBox,
      MsgPost,
      MsgPostInput
    },
    props: {
      items: Array,
      isSelectedItem: Boolean
    },
    data() {
      return {
        msgInput: ''
      }
    },
    created: function () {
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
      getItems() {
        const self = this;
        this.items.forEach(item => {
          if(item.goToPost){
            debug('computed.getItems:', 'Is item.goToPost!');
            setTimeout(function() {
              if(Array.isArray(self.$refs.goToPost) && self.$refs.goToPost.length){
                const goToPost = self.$refs.goToPost[0];
                self.$util.goToScroll(goToPost);// , {duration: 1000}
              }
            }, 500);
          }
        });
        return this.items
      }
    },
    methods: {
      modelMsgInput: function (newValue) {
        this.msgInput = newValue
      },
      clickSendMsg: function () {
        // debug('methods.clickSendMsg.msgInput:', this.msgInput)
        this.$emit('onSendPost', this.msgInput);
        this.msgInput = '';
      },
      onShowContact: function (ownerId) {
        this.$emit('onShowContact', ownerId);
      },
      onRemoveMsg: function (msgId) {
        this.$emit('onRemoveMsg', msgId);
      },
      onEditMsg: function (msgId) {
        this.$emit('onEditMsg', msgId);
      },
    }
  }
</script>
