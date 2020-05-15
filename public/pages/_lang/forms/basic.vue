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

    <!--=== Beautiful Forms ===-->
    <div class="title">Beautiful Forms</div>
    <div class="subtitle-1">
      Utilizing alternative input styles, you can create amazing interfaces that are easy to build and easy to use.
    </div>
    <flex-box-panel
      title="Template/Script"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Template" :init="true"><code9></code9></highlight-code>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Script"><code10></code10></highlight-code>
          </v-col>
        </v-row>
    </flex-box-panel>
    <br/>

    <flex-box>
      <v-card
        style="max-width: 500px;"
        color="secondary"
        :dark="theme.dark"
      >
        <v-system-bar
          :color="'primary' + ' darken-1'"
          dark
        >
          <v-spacer></v-spacer>
          <v-icon small>mdi-square</v-icon>
          <v-icon
            class="ml-1"
            small
          >mdi-circle</v-icon>
          <v-icon
            class="ml-1"
            small
          >mdi-triangle</v-icon>
        </v-system-bar>
        <v-toolbar
          color="primary"
          cards
          dark
          flat
        >
          <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-card-title class="title font-weight-regular">Sign up</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="form"
          v-model="form"
          class="pa-4 pt-6"
        >
          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            filled
            color="primary"
            counter="6"
            label="Password"
            style="min-height: 96px"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            filled
            color="primary"
            label="Phone number"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="primary"
            label="Email address"
            type="email"
          ></v-text-field>
          <v-textarea
            v-model="bio"
            auto-grow
            filled
            color="primary"
            label="Bio"
            rows="1"
          ></v-textarea>
          <v-checkbox
            v-model="agreement"
            :rules="[rules.required]"
            color="primary"
          >
            <template v-slot:label>
              I agree to the&nbsp;
              <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
              &nbsp;and&nbsp;
              <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
            </template>
          </v-checkbox>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            text
            @click="$refs.form.reset()"
          >
            Clear
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!form"
            :loading="isLoading"
            class="white--text"
            color="primary"
            depressed
            @click="isLoading = true"
          >Submit</v-btn>
        </v-card-actions>
        <v-dialog
          v-model="dialog"
          absolute
          max-width="400"
          persistent
        >
          <v-card
            color="secondary"
            :dark="this.theme.dark"
          >
            <v-card-title class="headline primary">Legal</v-card-title>
            <v-card-text>
              <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                text
                @click="agreement = false, dialog = false"
              >
                No
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="white--text"
                color="primary"
                @click="agreement = true, dialog = false"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Creating rules ===-->
    <div class="title">Creating rules</div>
    <div class="subtitle-1">
      Rules allow you to apply custom validation on all form components. These are validated sequentially and
      will display a <kbd>maximum</kbd> of 1 error at a time, so make sure you order your rules accordingly.
    </div>
    <br/>
    <flex-box-panel
      title="Template/Script"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
      <flex-box-multi :md="10">
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Template" :init="true"><code1></code1></highlight-code>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Script"><code2></code2></highlight-code>
          </v-col>
        </v-row>
      </flex-box-multi>
    </flex-box-panel>
    <v-divider class="my-5"></v-divider>

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
    <flex-box-panel
      title="Template/Script"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
      <flex-box-multi :md="10">
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Template" :init="true"><code3></code3></highlight-code>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Script"><code4></code4></highlight-code>
          </v-col>
        </v-row>
      </flex-box-multi>
    </flex-box-panel>
    <v-divider class="my-5"></v-divider>

    <!--=== Vuelidate ===-->
    <div class="title">Vuelidate</div>
    <div class="subtitle-1">
      <kbd>vuelidate</kbd> is a simple, lightweight model-based validation for Vue.js.
      <a href="https://vuelidate.netlify.com/" target="_blank">Documentation</a>
    </div>
    <br/>
    <flex-box-panel
      title="Template/Script"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
      <flex-box-multi :md="10">
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Template" :init="true"><code5></code5></highlight-code>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Script"><code6></code6></highlight-code>
          </v-col>
        </v-row>
      </flex-box-multi>
    </flex-box-panel>
    <v-divider class="my-5"></v-divider>

    <!--=== Vee-validate ===-->
    <div class="title">Vee-validate</div>
    <div class="subtitle-1">
      <kbd>vee-validate</kbd> is a template Based Validation Framework for Vue.js.
      <a href="https://logaretm.github.io/vee-validate/" target="_blank">Documentation</a>
    </div>
    <br/>
    <flex-box-panel
      title="Template/Script"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
      <flex-box-multi :md="10">
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Template" :init="true"><code7></code7></highlight-code>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <highlight-code :md="12" title="Script"><code8></code8></highlight-code>
          </v-col>
        </v-row>
      </flex-box-multi>
    </flex-box-panel>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  // import util from '~/plugins/lib/util';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxMulti from '~/components/widgets/containers/flex-box-multi';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/forms/basic/code-html-1';
  import Code2 from '~/components/codes/forms/basic/code-js-2';
  import Code3 from '~/components/codes/forms/basic/code-html-3';
  import Code4 from '~/components/codes/forms/basic/code-js-4';
  import Code5 from '~/components/codes/forms/basic/code-html-5';
  import Code6 from '~/components/codes/forms/basic/code-js-6';
  import Code7 from '~/components/codes/forms/basic/code-html-7';
  import Code8 from '~/components/codes/forms/basic/code-js-8';
  import Code9 from '~/components/codes/forms/basic/code-html-9';
  import Code10 from '~/components/codes/forms/basic/code-js-10';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxMulti,
      FlexBoxPanel,
      HighlightCode,
      Code1,
      Code2,
      Code3,
      Code4,
      Code5,
      Code6,
      Code7,
      Code8,
      Code9,
      Code10
    },
    data() {
      return {
        title: this.$t('basic_forms.title'),
        description: this.$t('basic_forms.description'),
        panel: [],
        agreement: false,
        bio: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
        dialog: false,
        email: undefined,
        form: false,
        isLoading: false,
        password: undefined,
        phone: undefined,
        rules: {
          email: v => (v || '').match(/@/) || 'Please enter a valid email',
          length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
          password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
            'Password must contain an upper case letter, a numeric character, and a special character',
          required: v => !!v || 'This field is required',
        },
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
    created: function () {},
    watch: {
      isLoading (val) {
        if (!val) return;
        setTimeout(() => {
          this.isLoading = false;
          this.$refs.form.reset();
        },3000)
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig',
        loading: 'getLoading'
      }),
    },
    methods: {
      ...mapMutations({
        setLoading: 'SET_LOADING',
        setLoadingDelay: 'SET_LOADING_DELAY',
      }),
      initPanelDelay: function(delay) {
        this.setLoadingDelay(delay);
        this.setLoading(true);
      },
      modelPanel: function(val) {
        if(val !== undefined){
          this.initPanelDelay(2000);
        }
      }
    },
  }
</script>
