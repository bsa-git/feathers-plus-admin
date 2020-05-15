<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-stepper</kbd> component displays progress through numbered steps.
    </em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage (Exx.1)</div>
    <div class="subtitle-1">
      A stepper can be used for a multitude of scenarios, including shopping carts, record creation and more.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code1></code1>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box>
      <v-stepper v-model="exx1E1">
        <v-stepper-header>
          <v-stepper-step :complete="exx1E1 > 1" step="1">Name of step 1</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="exx1E1 > 2" step="2">Name of step 2</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Name of step 3</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="exx1E1 = 2"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="exx1E1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="exx1E1 = 1"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Editable steps ===-->
    <div class="title">Editable steps (Exx.2)</div>
    <div class="subtitle-1">
      An editable step can be selected by a user at any point and will navigate them to that step.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
          <highlight-code :md="12" title="Template" :init="true">
            <code3></code3>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper>
        <v-stepper-header>
          <v-stepper-step
            complete
            editable
            step="1"
          >
            Select campaign settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            complete
            step="2"
          >Create an ad group</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            step="3"
            editable
          >
            Create an ad
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Non-editable steps ===-->
    <div class="title">Non-editable steps (Exx.3)</div>
    <div class="subtitle-1">
      Non-editable steps force a user to process linearly through your process.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
          <highlight-code :md="12" title="Template" :init="true">
            <code4></code4>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper value="2">
        <v-stepper-header>
          <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Create an ad group</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Optional steps ===-->
    <div class="title">Optional steps (Exx.4)</div>
    <div class="subtitle-1">
      An optional step can be called out with sub-text.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
          md="7"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code5></code5>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper value="1">
        <v-stepper-header>
          <v-stepper-step step="1">Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">
            Create an ad group
            <small>Optional</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-stepper value="2" class="mt-12">
        <v-stepper-header>
          <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">
            Create an ad group
            <small>Optional</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Horizontal steps ===-->
    <div class="title">Horizontal steps (Exx.5)</div>
    <div class="subtitle-1">
      Horizontal steppers move users along the <kbd>x-axis</kbd> through the defined steps.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
          md="7"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code6></code6>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper value="1">
        <v-stepper-header>
          <v-stepper-step step="1">Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Create an ad group</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Vertical steppers ===-->
    <div class="title">Vertical steppers (Exx.6)</div>
    <div class="subtitle-1">
      Vertical steppers move users along the y-axis and otherwise work exactly the same as their horizontal counterpart.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code7></code7>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code8></code8>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper v-model="exx6E1" vertical>
        <v-stepper-step :complete="exx6E1 > 1" step="1">
          Select an app
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx6E1 = 2">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="exx6E1 > 2" step="2">Configure analytics for this app</v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx6E1 = 3">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="exx6E1 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx6E1 = 4">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">View setup instructions</v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx6E1 = 1">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Linear steppers ===-->
    <div class="title">Linear steppers (Exx.7)</div>
    <div class="subtitle-1">
      Linear steppers will always move a user through your defined path.
    </div>
    <!-- Template/Script -->
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
          md="7"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code9></code9>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper>
        <v-stepper-header>
          <v-stepper-step step="1">Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Create an ad group</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-stepper value="2" class="mt-12">
        <v-stepper-header>
          <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Create an ad group</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-stepper value="3" class="mt-12">
        <v-stepper-header>
          <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2" complete>Create an ad group</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Create an ad</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Non-linear steppers ===-->
    <div class="title">Non-linear steppers (Exx.8)</div>
    <div class="subtitle-1">
      Non-linear steppers allow the user to move through your process in whatever way they choose.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code10></code10>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper non-linear>
        <v-stepper-header>
          <v-stepper-step
            editable
            step="1"
          >
            Select campaign settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            editable
            step="2"
          >
            Create an ad group
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            step="3"
            editable
          >
            Create an ad
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-stepper
        class="mt-12"
        non-linear
      >
        <v-stepper-header>
          <v-stepper-step
            complete
            editable
            step="1"
          >
            Select campaign settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            editable
            step="2"
          >
            Create an ad group
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            complete
            editable
            step="3"
          >
            Create an ad
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-stepper
        class="mt-12"
        non-linear
        value="3"
      >
        <v-stepper-header>
          <v-stepper-step
            complete
            editable
            step="1"
          >
            Select campaign settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            complete
            editable
            step="2"
          >
            Create an ad group
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            complete
            editable
            step="3"
          >
            Create an ad
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Alternate labels ===-->
    <div class="title">Alternate labels (Exx.9)</div>
    <div class="subtitle-1">
      Steppers also have an alternative label style which places the title under the step itself.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code11></code11>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-step step="1">Ad unit details</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Ad sizes</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Ad templates</v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-stepper alt-labels class="mt-12">
        <v-stepper-header>

          <v-stepper-step step="1">Ad unit details</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">
            Ad sizes
            <small>Optional</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Ad templates</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Multi-line error state ===-->
    <div class="title">Multi-line error state (Exx.10)</div>
    <div class="subtitle-1">
      An error state can be displayed to notify the user of some action that must be taken.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code12></code12>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper>
        <v-stepper-header>
          <v-stepper-step step="1">Ad unit details</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :rules="[() => false]" step="2">
            Ad templates
            <small>Alert message</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Ad sizes</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Alternative label multi-line error state ===-->
    <div class="title">Alternative label multi-line error state (Exx.11)</div>
    <div class="subtitle-1">
      The error state can also be applied to the alternative label style.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code13></code13>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-step step="3" complete>Ad type</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4" complete>Ad style</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :rules="[() => false]" step="5">
            Custom channels
            <small>Alert message</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="6">Get code</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Vertical multi-line error state ===-->
    <div class="title">Vertical multi-line error state (Exx.12)</div>
    <div class="subtitle-1">
      The same state also applies to Vertical steppers.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code14></code14>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code15></code15>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box
      :md="10"
    >
      <v-stepper v-model="exx12E1" vertical>
        <v-stepper-step step="1" complete>
          Name of step 1
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx12E1 = 2">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="2" complete>Name of step 2</v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx12E1 = 3">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :rules="[() => false]" step="3">
          Ad templates
          <small>Alert message</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx12E1 = 4">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">View setup instructions</v-stepper-step>

        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="exx12E1 = 1">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Dynamic steps ===-->
    <div class="title">Dynamic steps (Exx.13)</div>
    <div class="subtitle-1">
      Steppers can have their steps dynamically added or removed. If a currently active step is removed, be sure to
      account for this by changing the applied model.
    </div>
    <!-- Template/Script -->
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
          <highlight-code :md="12" title="Template" :init="true">
            <code16></code16>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code17></code17>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Steppers -->
    <flex-box-card
      :md="2"
      class-value="mb-4"
    >
      <v-select
        v-model="exx13Steps"
        :items="[2, 3, 4, 5, 6]"
        label="# of steps"
      ></v-select>
    </flex-box-card>
    <flex-box
      :md="10"
    >
      <v-stepper v-model="exx13E1">
        <v-stepper-header>
          <template v-for="n in exx13Steps">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"
              editable
            >
              Step {{ n }}
            </v-stepper-step>

            <v-divider
              v-if="n !== exx13Steps"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="n in exx13Steps"
            :key="`${n}-content`"
            :step="n"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="exx13NextStep(n)"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </flex-box>
  </div>
</template>

<script>
  import moment from 'moment';
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/components/steppers/code-html-1';
  import Code2 from '~/components/codes/components/steppers/code-js-2';
  import Code3 from '~/components/codes/components/steppers/code-html-3';
  import Code4 from '~/components/codes/components/steppers/code-html-4';
  import Code5 from '~/components/codes/components/steppers/code-html-5';
  import Code6 from '~/components/codes/components/steppers/code-html-6';
  import Code7 from '~/components/codes/components/steppers/code-html-7';
  import Code8 from '~/components/codes/components/steppers/code-js-8';
  import Code9 from '~/components/codes/components/steppers/code-html-9';
  import Code10 from '~/components/codes/components/steppers/code-html-10';
  import Code11 from '~/components/codes/components/steppers/code-html-11';
  import Code12 from '~/components/codes/components/steppers/code-html-12';
  import Code13 from '~/components/codes/components/steppers/code-html-13';
  import Code14 from '~/components/codes/components/steppers/code-html-14';
  import Code15 from '~/components/codes/components/steppers/code-js-15';
  import Code16 from '~/components/codes/components/steppers/code-html-16';
  import Code17 from '~/components/codes/components/steppers/code-js-17';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxCard,
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
      Code10,
      Code11,
      Code12,
      Code13,
      Code14,
      Code15,
      Code16,
      Code17,
    },
    data() {
      return {
        title: this.$t('steppers.title'),
        description: this.$t('steppers.description'),
        panel: [],
        exx1E1: 1,
        exx6E1: 1,
        exx12E1: 1,
        exx13E1: 1,
        exx13Steps: 2,
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
    watch: {
      steps (val) {
        if (this.exx13E1 > val) {
          this.exx13E1 = val
        }
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
      initPanelDelay: function (delay) {
        this.setLoadingDelay(delay);
        this.setLoading(true);
      },
      modelPanel: function (val) {
        if (val !== undefined) {
          this.initPanelDelay(2000);
        }
      },
      exx13NextStep (n) {
        if (n === this.exx13Steps) {
          this.exx13E1 = 1
        } else {
          this.exx13E1 = n + 1
        }
      },
    },
  }
</script>
