<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>When it comes to form validation, Vuetify has a multitude of
      integrations and baked in functionality. Want to use a 3rd party validation plugin? Out of the box you can
      use <a href="https://github.com/baianat/Vee-validate" target="_blank">Vee-validate</a> and
      <a href="https://github.com/vuelidate/vuelidate" target="_blank">vuelidate</a>.</em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage</div>
    <div class="subtitle-1">
      The internal <kbd>v-form</kbd> component makes it easy to add validation to form inputs. All input components have
      a
      <kbd>rules</kbd> prop which takes an array of functions. These functions allow you to specify conditions in which
      the
      field is valid or invalid. Whenever the value of an input is changed, each function in the array will receive
      the new value. If a function returns false or a string, validation has failed.
    </div>
    <br/>

    <!--=== Creating rules ===-->
    <div class="title">Creating rules</div>
    <div class="subtitle-1">
      Rules allow you to apply custom validation on all form components. These are validated sequentially and
      will display a <kbd>maximum</kbd> of 1 error at a time, so make sure you order your rules accordingly.
    </div>
    <br/>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Template"><code1></code1></highlight-code>
      </v-col>
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Script"><code2></code2></highlight-code>
      </v-col>
    </v-row>
    <br/>

    <!--=== Validation with submit & clear ===-->
    <div class="title">Validation with submit & clear</div>
    <div class="subtitle-1">
      The <code>v-form</code> component has three functions that can be accessed by setting a ref on the component.
      A ref allows us to access internal methods on a component, for example.
      <code>this.$refs.form.validate()</code> will validate all inputs and return if they are all valid or not.
      <code>this.$refs.form.reset()</code> will clear all inputs and reset their validation errors.
      <code>this.$refs.form.resetValidation()</code> will only reset input validation and not alter their state.
    </div>
    <br/>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Template"><code3></code3></highlight-code>
      </v-col>
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Script"><code4></code4></highlight-code>
      </v-col>
    </v-row>
    <br/>

    <!--=== Vuelidate ===-->
    <div class="title">Vuelidate</div>
    <div class="subtitle-1">
      <kbd>vuelidate</kbd> is a simple, lightweight model-based validation for Vue.js.
      <a href="https://vuelidate.netlify.com/" target="_blank">Documentation</a>
    </div>
    <br/>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Template"><code5></code5></highlight-code>
      </v-col>
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Script"><code6></code6></highlight-code>
      </v-col>
    </v-row>
    <br/>

    <!--=== Vee-validate ===-->
    <div class="title">Vee-validate</div>
    <div class="subtitle-1">
      <kbd>vee-validate</kbd> is a template Based Validation Framework for Vue.js.
      <a href="https://logaretm.github.io/vee-validate/" target="_blank">Documentation</a>
    </div>
    <br/>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Template"><code7></code7></highlight-code>
      </v-col>
      <v-col
        cols="12"
        :md="5"
      >
        <highlight-code :md="12" title="Script"><code8></code8></highlight-code>
      </v-col>
    </v-row>
    <br/>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBox2 from '~/components/widgets/containers/flex-box2';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/forms/basic/code-html-1';
  import Code2 from '~/components/codes/forms/basic/code-js-2';
  import Code3 from '~/components/codes/forms/basic/code-html-3';
  import Code4 from '~/components/codes/forms/basic/code-js-4';
  import Code5 from '~/components/codes/forms/basic/code-html-5';
  import Code6 from '~/components/codes/forms/basic/code-js-6';
  import Code7 from '~/components/codes/forms/basic/code-html-7';
  import Code8 from '~/components/codes/forms/basic/code-js-8';

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBox2,
      HighlightCode,
      Code1,
      Code2,
      Code3,
      Code4,
      Code5,
      Code6,
      Code7,
      Code8
    },
    data() {
      return {
        title: this.$t('basic_forms.title'),
        description: this.$t('basic_forms.description'),
        refAppToolbar: null,
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
        this.waitRefAppToolbar();
      })
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig'
      }),
    },
    methods: {
      waitRefAppToolbar() {
        util.waitTimeout(() => {
          return this.$parent.$parent.$parent.refAppToolbar;
        }, () => {
          this.refAppToolbar = this.$parent.$parent.$parent.refAppToolbar;
        });
      },
    },
  }
</script>
