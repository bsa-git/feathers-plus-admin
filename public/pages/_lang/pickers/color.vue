<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-color-picker</kbd> allows you to select a color using a variety
      of input methods.</em></blockquote>
    <br/>
    <!--=== Model ===-->
    <div class="title">Model</div>
    <div class="subtitle-1">The <kbd>v-color-picker</kbd> uses the <kbd>v-model</kbd> prop to control the color
      displayed. It supports hex
      strings such as <kbd>#FF00FF</kbd> and <kbd>#FF00FF00</kbd>, and objects representing <strong>RGBA</strong>,
      <strong>HSLA</strong> and <strong>HSVA</strong> values.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  v-for="t in types"
                  :key="t"
                  class="my-4"
                  block
                  @click="type = t"
                >{{ t }}
                </v-btn>
              </v-col>
              <!--  -->
              <v-col
                class="d-flex justify-center"
                cols="12"
                md="8"
              >
                <v-color-picker v-model="color"></v-color-picker>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-sheet
                  dark
                  class="pa-4"
                >
                  <pre>{{ showColor }}</pre>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--=== Swatches ===-->
    <div class="title">Swatches</div>
    <div class="subtitle-1">Using the <kbd>show-swatches</kbd> prop you can display an array of color swatches
      that users can pick from. It is also possible to customize what colors are shown using the <kbd>swatches</kbd>
      prop.
      This prop accepts a two-dimensional array, where the first dimension defines a column, and second dimension
      defines
      the swatches from top to bottom by providing rgba hex strings. You can also set the max height of the swatches
      section with the <kbd>swatches-max-height</kbd> prop.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="10"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-color-picker class="ma-2" show-swatches></v-color-picker>
              <v-color-picker class="ma-2" :swatches="swatches" show-swatches></v-color-picker>
              <v-color-picker class="ma-2" show-swatches swatches-max-height="300px"></v-color-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--=== Inputs ===-->
    <div class="title">Inputs</div>
    <div class="subtitle-1">The number inputs can be hidden with the <kbd>hide-inputs</kbd> prop. You can also hide the
      mode
      switch icon with the <kbd>hide-mode-switch</kbd> prop. The mode can also be controlled externally through the
      <kbd>mode</kbd> prop.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-col
                class="d-flex justify-center"
                cols="12"
                md="6"
              >
                <v-color-picker class="ma-2" hide-inputs></v-color-picker>
              </v-col>
              <v-col
                class="d-flex justify-center"
                cols="12"
                md="6"
              >
                <v-color-picker class="ma-2" hide-mode-switch></v-color-picker>
              </v-col>
              <v-col
                class="d-flex justify-center"
                cols="12"
                md="6"
              >
                <v-color-picker :mode.sync="mode"></v-color-picker>
              </v-col>
              <v-col
                class="d-flex justify-center"
                cols="12"
                md="6"
              >
                <v-select v-model="mode" :items="modes" style="max-width: 300px"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--=== Canvas ===-->
    <div class="title">Canvas</div>
    <div class="subtitle-1">The canvas can be hidden with the <kbd>hide-canvas</kbd> prop, and you can set its height
      with the
      prop <kbd>canvas-height</kbd>. The size of the selection dot can be controlled with the <kbd>dot-size</kbd> prop.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-color-picker class="ma-2" hide-canvas></v-color-picker>
              <v-color-picker class="ma-2" canvas-height="300"></v-color-picker>
              <v-color-picker class="ma-2" dot-size="30"></v-color-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader,
    },
    data() {
      return {
        title: this.$t('colorPicker.title'),
        description: this.$t('colorPicker.description'),
        types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
        type: 'hex',
        hex: '#FF00FF',
        hexa: '#FF00FFFF',
        rgba: {r: 255, g: 0, b: 255, a: 1},
        hsla: {h: 300, s: 1, l: 0.5, a: 1},
        hsva: {h: 300, s: 1, v: 1, a: 1},
        swatches: [
          ['#FF0000', '#AA0000', '#550000'],
          ['#FFFF00', '#AAAA00', '#555500'],
          ['#00FF00', '#00AA00', '#005500'],
          ['#00FFFF', '#00AAAA', '#005555'],
          ['#0000FF', '#0000AA', '#000055'],
        ],
        mode: 'hsla',
        modes: ['hsla', 'rgba', 'hexa'],
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
      color: {
        get() {
          return this[this.type]
        },
        set(v) {
          this[this.type] = v
        },
      },
      showColor() {
        if (typeof this.color === 'string') return this.color

        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
    },
  }
</script>
