<template>
  <v-list>
    <template v-for="(item, index) in notes">
      <v-subheader v-if="item.header" :key="item.header">{{ $t(`app_notification.${item.name}`) }}</v-subheader>
      <v-divider v-else-if="item.divider" :key="index"></v-divider>
      <v-list-item v-else :key="item.title" @click="handleClick">
        <v-list-item-avatar :color="item.color">
          <v-icon dark>{{item.icon}}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle>{{ $t(`app_notification.${item.name}`) }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text>
          {{item.timeLabel}}
        </v-list-item-action-text>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
  export default {
    props: {
      notes: Array
    },
    methods: {
      handleClick: (e) => {
        console.log(e);
      }
    },
  };
</script>
