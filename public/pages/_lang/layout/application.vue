<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>In Vuetify, the <kbd>v-app</kbd> component and the app prop on
      components
      like <kbd>v-navigation-drawer</kbd>, <kbd>v-app-bar</kbd>, <kbd>v-footer</kbd> and more, help bootstrap your
      application with the proper sizing
      around <kbd>v-content</kbd> component. This allows you to create truly unique interfaces without the hassle of
      managing your layout sizing. The <kbd>v-app</kbd> component is <strong>REQUIRED</strong> for all applications.
      This is the mount point
      for many of Vuetify's components and functionality and ensures that it propagates the default application
      variant (dark/light) to children components and also ensures proper cross-browser support for certain
      click events in browsers like Safari. <kbd>v-app</kbd> should only be used within your application
      <strong>ONCE</strong>.</em></blockquote>
    <br/>
    <v-alert type="error">
      In order for your application to work properly, you <span class="font-weight-bold">must</span> wrap it in a <kbd>v-app</kbd>
      component. This component
      is required for ensuring proper <span class="font-weight-bold">cross-browser compatibility</span>. Vuetify doesn't
      support multiple isolated
      Vuetify instances on a page. v-app can exist <span class="font-weight-bold">anywhere</span> inside the body of
      your app, however, there should
      only be one and it must be the parent of <span class="font-weight-bold">ALL</span> Vuetify components.
    </v-alert>

    <!--=== Default application markup ===-->
    <div class="title">Default application markup</div>
    <div class="subtitle-1">
      <p>This is an example of the default application markup for Vuetify. You can place your layout elements anywhere,
        as long as you apply the app property. The key component in all of this is <kbd>v-content</kbd>. This will be
        dynamically
        sized depending upon the structure of your designated app components. You can use combinations of any or all
        of the above components including <kbd>v-bottom-navigation</kbd>.</p>
      <p>When using <a href="https://router.vuejs.org/" target="_blank">vue-router</a> it is recommended that you
        place your views inside <kbd>v-content</kbd>.</p>
    </div>
    <br/>
    <hljs-pre-code
      lang="xml"
    >
      <code1></code1>
    </hljs-pre-code>

    <v-alert type="info">
      Applying the <kbd>app</kbd> prop automatically applies position: <kbd>fixed</kbd> to the layout element. If your application
      calls for an absolute element, you can overwrite this functionality by using the <kbd>absolute</kbd> prop.
    </v-alert>

    <!--=== Application components ===-->
    <div class="title">Application components</div>
    <div class="subtitle-1">
      Below is a list of all the components that support the <kbd>app</kbd> prop and can be used as layout elements in your
      application. These can be mixed and matched and only <kbd>one</kbd> of each particular component should exist at any time.
      You can, however, swap them out and the layout will accommodate. For some examples displaying how you can build
      various layouts, checkout the <a href="https://vuetifyjs.com/en/getting-started/pre-made-layouts/" target="_blank">Pre-made layouts page</a>.

      <ul>
        <li><a href="https://vuetifyjs.com/en/components/app-bars/" target="_blank">v-app-bar</a></li>
        <li><a href="https://vuetifyjs.com/en/components/bottom-navigation/" target="_blank">v-bottom-navigation</a></li>
        <li><a href="https://vuetifyjs.com/en/components/footer/" target="_blank">v-footer</a></li>
        <li><a href="https://vuetifyjs.com/en/components/navigation-drawers/" target="_blank">v-navigation-drawer</a></li>
        <li><a href="https://vuetifyjs.com/en/components/system-bars/" target="_blank">v-system-bar</a></li>
      </ul>

      Each of these application components have a designated location and priority that it affects within the layout system.

      <ul>
        <li><strong>v-system-bar: </strong>Is always placed at the top of an application with higher priority than <code>v-app-bar</code>.</li>
        <li><strong>v-app-bar: </strong>Is always placed at the top of an application with a lower priority than <code>v-system-bar</code>.</li>
        <li><strong>v-navigation-drawer: </strong>Can be placed on the left or right side of an application and can be configured to sit next to or below <code>v-app-bar</code>.</li>
        <li><strong>v-footer: </strong>Is always placed at the bottom of an application with a lower priority than <code>v-bottom-navigation</code>.</li>
        <li><strong>v-bottom-navigation: </strong>Is always placed at the bottom of an application with a higher priority than <code>v-footer</code>.</li>
      </ul>

      In a nutshell, that means that <code>v-system-bar</code> is always above <code>v-app-bar</code>,
      <code>v-navigation-drawer</code> can occupy the left or right side and <code>v-footer</code> always sits on top of
      <code>v-bottom-navigation</code>.
    </div>
    <br/>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import HljsPreCode from '~/components/widgets/highlight/hljs-pre-code';
  import Code1 from '~/components/codes/layout/application/code-html-1';

  export default {
    components: {
      AppPageHeader,
      HljsPreCode,
      Code1,
    },
    data() {
      return {
        title: this.$t('application_layout.title'),
        description: this.$t('application_layout.description'),
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
    mounted: function () {
      this.$nextTick(function () {
        // const hl = new Highlight(this.theme.dark);
        // hl.initBlock('pre code');
      })
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig'
      }),
    },
    methods: {},
  }
</script>
