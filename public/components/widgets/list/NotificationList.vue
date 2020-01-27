<template>
  <v-card class="elevation-0">
    <v-toolbar dense color="transparent" class="elevation-0">
      <v-toolbar-title>{{ $t('app_notification.notification') }}</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- rounded -->
    <v-list two-line subheader>
      <v-list-item-group v-model="selItem" color="primary">
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header" inset>{{ $t(`app_notification.${item.name}`) }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>
          <v-list-item v-else :key="item.title">
            <v-list-item-avatar :color="item.color">
              <v-icon dark>{{item.icon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ $t(`app_notification.${item.name}`) }}</v-list-item-title>
              <v-list-item-subtitle>{{item.timeLabel}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-badge color="red" overlap>
                  <template v-slot:badge>{{ item.amount }}</template>
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <v-btn block @click="clickShowAll" text>{{  $t('app_notification.show_all') }}</v-btn>
  </v-card>
</template>

<script>
  export default {
    props: {
//      title: String,
      items: Array,
      itemIndex: {
        type: Number,
        default: -1
      }
    },
    computed: {
      selItem: {
        // Getter:
        get: function () {
          return this.itemIndex
        },
        // Setter:
        set: function (newValue) {
          this.$emit('onItem', newValue)
        }
      }
    },
    methods: {
      clickShowAll: function() {
        this.$emit('onShowAll')
      }
    },
  };
</script>
