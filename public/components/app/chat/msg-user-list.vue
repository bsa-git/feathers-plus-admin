<template>
  <div>
    <v-list
      color="secondary"
      :dark="theme.dark"
      max-height="400"
      two-line
      :subheader="subheader? true : false"
    >
      <v-subheader v-if="subheader">{{ subheader }}</v-subheader>
      <v-list-item-group
        v-model="compIndexSelected"
        active-class="primary--text"
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.email">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.fullName"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.roleName"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.countMsg? item.lastMsg : item.email"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-if="item.countMsg" v-text="item.timeLabel"></v-list-item-action-text>
                <v-badge v-if="item.countMsg" :color="active? 'orange' : 'red'" overlap>
                  <template v-slot:badge>{{ item.countMsg }}</template>
                  <v-icon color="grey">mdi-chat</v-icon>
                </v-badge>
                <div v-else>
                  <v-icon
                    v-if="!active"
                    color="grey"
                  >
                    mdi-chat
                  </v-icon>

                  <v-icon
                    v-else
                    color="orange"
                  >
                    mdi-chat
                  </v-icon>
                </div>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
<!--    <v-divider></v-divider>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    components: {},
    props: {
      items: Array,
      indexSelected: Number,
      subheader: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
      compIndexSelected: {
        // Getter:
        get: function () {
          return this.indexSelected
        },
        // Setter:
        set: function (newValue) {
          this.$emit('onIndexSelected', newValue)
        }
      },
    },
    methods: {}
  }
</script>
