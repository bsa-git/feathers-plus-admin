<template>
  <!--
  <div class="theme--dark py-5 darken-1">
    <div>
      <v-btn icon large flat slot="activator">
        <v-avatar>
          <img :src="userAvatar" :alt="userName" :title="userName">
        </v-avatar>
      </v-btn>
    </div>
    <v-list class="mini-menu">
      <template v-for="item in items">
        <v-list-tile :to="item.to" :key="item.icon" class="py-2 mini-tile my-2" avatar>
          <v-icon :color="item.iconColor" class="mini-icon" size="36">{{ item.icon }}</v-icon>
        </v-list-tile>
      </template>
    </v-list>
</div>
-->
  <v-list>
    <v-list-item-group v-model="compModel" mandatory color="indigo">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-avatar v-if="item.avatar">
          <v-img :src="item.avatar" :alt="item.name" :title="item.name"></v-img>
        </v-list-item-avatar>

        <v-list-item-icon v-else>
          <v-icon v-text="item.icon" :title="item.text"></v-icon>
        </v-list-item-icon>

<!--        <v-list-item-content>-->
<!--          <v-list-item-title v-text="item.text"></v-list-item-title>-->
<!--        </v-list-item-content>-->
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    selMenu: {
      type: Number,
      default: 1
    }
  },
    // data: function () {
    //   return {
    //     // model: 1,
    //   }
    // },
    computed: {
      compModel: {
        // Getter:
        get: function () {
          return this.selMenu
        },
        // Setter:
        set: function (newValue) {
          // this.$emit('onSelMenu', newValue)
          const selMenu = this.items[newValue];
          const path = this.$i18n.path(selMenu.to);
          if (isLog) debug('watch.selected.path:', path);
          this.$redirect(path);
        }
      },
    }
    // userAvatar: {
    //   type: String
    // },
    // userName: {
    //   type: String
    // }
};
</script>

