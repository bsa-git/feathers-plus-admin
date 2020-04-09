<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!--=== Gradients ===-->
    <div class="title">Gradients</div>
    <div class="subtitle-1">The <kbd>gradient</kbd> prop can be used to apply a simple gradient overlay to the image. More complex
      gradients should be written as a class on the content slot instead.</div>
    <v-container fluid>
      <v-row>
        <v-col cols="6" sm="4">
          <v-img
            src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>
        </v-col>

        <v-col cols="6" sm="4">
          <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
            <div class="fill-height bottom-gradient"></div>
          </v-img>
        </v-col>

        <v-col cols="6" sm="4">
          <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
            <div class="fill-height repeating-gradient"></div>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
    <!--=== Grid ===-->
    <div class="title">Grid</div>
    <div class="subtitle-1">You can use <kbd>v-img</kbd> to make, for example, a picture gallery.</div>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card
          :color="theme.dark? 'secondary' : ''"
          :dark="theme.dark? true : false"
        >
          <v-container fluid>
            <v-row>
              <v-col
                v-for="n in 9"
                :key="n"
                class="d-flex child-flex"
                cols="4"
              >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!--=== Contain and Cover ===-->
    <div class="title">Contain and Cover</div>
    <div class="subtitle-1">If the provided aspect ratio doesn't match that of the actual image, the default behavior is
      to fill as much space as possible, clipping the sides of the image. Enabling the <kbd>contain</kbd> prop will prevent this,
      but will result in empty space at the sides.</div>
    <v-container fluid>
      <v-row justify="space-around">
        <v-col cols="5">
          <div class="title mb-1">Default (cover)</div>
          <div class="subheading">Matching</div>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
          <div class="subheading pt-4">Too high</div>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
          <div class="subheading pt-4">Too low</div>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4"></v-img>
        </v-col>

        <v-col cols="5">
          <div class="title mb-1">Contain</div>
          <div class="subheading">Matching</div>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" contain></v-img>
          <div class="subheading pt-4">Too high</div>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2" contain></v-img>
          <div class="subheading pt-4">Too low</div>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4" contain></v-img>
        </v-col>
      </v-row>
    </v-container>
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
        title: this.$t('media.title'),
        description: this.$t('media.description'),
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
    },
  }
</script>

<style scoped>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
    rgba(255,0,0,.25),
    rgba(255,0,0,.25) 5px,
    rgba(0,0,255,.25) 5px,
    rgba(0,0,255,.25) 10px
    );
  }
</style>
