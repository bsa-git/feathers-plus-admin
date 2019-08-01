<template>
  <v-dialog v-model="inputDialog" persistent max-width="320">
    <v-card>
      <v-card-title class="title">{{ titleDialog }}</v-card-title>
      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-if="validateType === 'numeric'"
                  v-validate="'numeric'"
                  :error-messages="errors.collect('inputValue')"
                  data-vv-name="inputValue"
                  v-model="model.inputValue"
                  :label="labelInput"
                  :hint="hintInput"
                  persistent-hint
                ></v-text-field>
                <v-text-field
                  v-else-if="validateType === 'alpha_num'"
                  v-validate="'alpha_num'"
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
          <v-btn flat type="submit" color="primary">{{ $t('common.enter') }}</v-btn>
          <v-btn flat @click="$emit('onCloseInputDialog')">{{ $t('common.close') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

  import {mapMutations} from 'vuex'

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    props: {
      inputDialog: Boolean,
      runAction: Function,
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
    methods: {
      async onSubmit() {
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError('Validation Error!');
        } else {
          this.runAction();
        }
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
        showWarning: 'SHOW_WARNING'
      }),
    },
  };
</script>
