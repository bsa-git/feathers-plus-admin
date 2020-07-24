<template>
  <v-list
    color="secondary"
    :dark="theme.dark"
    max-height="400"
    two-line
  >
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
              <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon
                v-if="!active"
                color="grey lighten-1"
              >
                mdi-star-outline
              </v-icon>

              <v-icon
                v-else
                color="orange"
              >
                mdi-star
              </v-icon>
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
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    components: {},
    props: {
      items: Array,
      indexSelected: Number
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
