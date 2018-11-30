<template>
  <v-container fluid>
    <app-page-header
      :app-menu="appMenu"
      :home-path="homePath"
    ></app-page-header>
    <v-layout>
      <v-flex text-xs-center>
        <!-- -->
        <img
          src="/static/img/logo/v.png"
          alt="Vuetify.js"
          class="mb-5">
        <blockquote class="exotic--light exotic--font headline blockquote">
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-flex>
    </v-layout>
    <!-- v-card -->
    <v-layout >
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            :src="myImage"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-img
            :src="myImage"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-img
            :src="myImage"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import appMenu from '~/store/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        appMenu: appMenu,
        homePath: process.env.HOME_PATH,
        myImage: '/static/img/nature/n1.jpeg'
      }
    },
  }
</script>
