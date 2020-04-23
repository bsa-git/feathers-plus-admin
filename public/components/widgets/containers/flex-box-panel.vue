<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md"
    >
      <v-expansion-panels
        v-model="panelModel"
        focusable
        inset
      >
        <v-expansion-panel>
          <v-expansion-panel-header v-if="icon" disable-icon-rotate>
            {{ title }}
            <template v-slot:actions>
              <v-icon color="primary">{{ icon }}</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-header v-else>{{ title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <slot></slot>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      model: {
        type: Array,
        default: () => {null}
      },
      justify: {
        type: String,
        default: 'center'
      },
      align: {
        type: String,
        default: 'center'
      },
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      md: {
        type: Number,
        default: 10
      }
    },
    computed: {
      panelModel: {
        // Getter:
        get: function () {
          return this.model
        },
        // Setter:
        set: function (newValue) {
          this.$emit('onTogglePanel', newValue)
        }
      }
    },
  };
</script>
