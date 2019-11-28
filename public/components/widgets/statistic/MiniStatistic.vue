<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <v-row class="ma-0">
          <v-col cols="6" class="d-flex justify-center align-center white">
            <div class="ma-0">
              <v-icon size="56px" :color="color">{{icon}}</v-icon>
            </div>
          </v-col>
          <v-col cols="6" class="d-flex flex-column justify-center align-center py-3 white--text" :class="color">
            <div class="headline">{{ title }}</div>
            <div class="caption">{{ subTitle }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String
  }
};
</script>
