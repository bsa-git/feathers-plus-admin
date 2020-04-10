<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="320">
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <v-card-title class="title">{{ titleDialog }}</v-card-title>
        <v-form @submit.prevent="onSubmit">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-if="validateType === 'numeric'"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('inputValue')"
                    data-vv-name="inputValue"
                    v-model="model.inputValue"
                    :label="labelInput"
                    :hint="hintInput"
                    persistent-hint
                  ></v-text-field>
                  <v-text-field
                    v-else-if="validateType === 'alpha_num'"
                    v-validate="'required|alpha_num'"
                    :error-messages="errors.collect('inputValue')"
                    data-vv-name="inputValue"
                    v-model="model.inputValue"
                    :label="labelInput"
                    :hint="hintInput"
                    persistent-hint
                  ></v-text-field>
                  <v-text-field
                    v-else-if="validateType === 'email'"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('inputValue')"
                    data-vv-name="inputValue"
                    v-model="model.inputValue"
                    :label="labelInput"
                    :hint="hintInput"
                    persistent-hint
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text type="submit" color="primary">{{ $t('common.enter') }}</v-btn>
            <v-btn text @click="$emit('onCloseInputDialog')">{{ $t('common.close') }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    props: {
      dialog: Boolean,
      runAction: Function,
      showError: Function,
      titleDialog: String,
      validateType: String,
      labelInput: String,
      hintInput: String
    },
    data() {
      return {
        model: {
          inputValue: '',
        }
      }
    },
    watch: {
      'model.inputValue': function (val, oldVal) {
        this.$emit('onInput', val);
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
    methods: {
      async onSubmit() {
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError('Validation Error!');
        } else {
          this.runAction();
        }
      },
    },
  };
</script>
