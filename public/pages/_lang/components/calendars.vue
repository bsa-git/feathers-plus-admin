<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-calendar</kbd> component is used to display information in a daily,
      weekly, or monthly view. The daily view has slots for all day or timed elements, and the weekly and monthly view
      has a slot for each day. Optionally you can pass in an array of events and they will be rendered over the
      appropriate days and times.
    </em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage (Exx.1)</div>
    <div class="subtitle-1">
      A calendar has a type and a value which determines what type of calendar is shown over what span of time.
      This shows the bare minimum configuration, an array of events with <kbd>name</kbd>, <kbd>start</kbd> and
      <kbd>end</kbd> properties. <kbd>end</kbd> is optional, it defaults to the <kbd>start</kbd>. If the <kbd>start</kbd>
      has a time it's considered a timed event and will be shown accordingly in the day views. An event can span
      multiple days and will be rendered accordingly.
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
    <!-- Calendar -->
    <flex-box-sheet
      :tile="true"
      :height="54"
      classValue="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="exx1Type"
        :items="exx1Types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="exx1Mode"
        :items="exx1Modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="exx1Weekday"
        :items="exx1Weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </flex-box-sheet>
    <flex-box-sheet
      :height="600"
    >
      <v-calendar
        ref="calendar"
        v-model="exx1Value"
        :locale="config.locale"
        :weekdays="exx1Weekday"
        :type="exx1Type"
        :events="exx1Events"
        :event-overlap-mode="exx1Mode"
        :event-overlap-threshold="30"
        :event-color="exx1GetEventColor"
        @change="exx1GetEvents"
      ></v-calendar>
    </flex-box-sheet>
    <br/>

    <!--=== Weekly ===-->
    <div class="title">Weekly (Exx.2)</div>
    <div class="subtitle-1">
      This is an example of an event calendar with all-day and timed events with a type of <kbd>week</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="12"
      title="Template/Script/Style"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          md="4"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code3></code3>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <highlight-code :md="12" title="Script">
            <code4></code4>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <highlight-code :md="12" title="Style">
            <code5></code5>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Calendar -->
    <flex-box-sheet
      :height="400"
    >
      <v-calendar
        ref="calendar"
        :locale="config.locale"
        :now="exx2Today"
        :value="exx2Today"
        :events="exx2Events"
        color="primary"
        type="week"
      ></v-calendar>
    </flex-box-sheet>

    <!--=== Daily ===-->
    <div class="title">Daily (Exx.3)</div>
    <div class="subtitle-1">
      This is an example of calendar with content in each interval slot and a type of <kbd>day</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      title="Template/Script/Style"
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
            <code6></code6>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Calendar -->
    <flex-box-sheet
      :md="4"
      :height="400"
    >
      <v-calendar
        color="primary"
        type="day"
        :locale="config.locale"
      >
        <template v-slot:day-header="{ present }">
          <template
            v-if="present"
            class="text-center"
          >
            Today
          </template>
        </template>

        <template v-slot:interval="{ hour }">
          <div
            class="text-center"
          >
            {{ hour }} o'clock
          </div>
        </template>
      </v-calendar>
    </flex-box-sheet>

    <!--=== Slots ===-->
    <div class="title">Slots (Exx.4)</div>
    <div class="subtitle-1">
      Slots allow you to define the content for each day, time interval for the daily views, and various labels.
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
            <code6></code6>
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
    <!-- Calendar -->
    <flex-box-sheet
      :height="500"
    >
      <v-calendar
        :now="exx4Today"
        :value="exx4Today"
        color="primary"
        :locale="config.locale"
      >
        <template v-slot:day="{ present, past, date }">
          <v-row
            class="fill-height"
          >
            <template v-if="past && exx4Tracked[date]">
              <v-sheet
                v-for="(percent, i) in exx4Tracked[date]"
                :key="i"
                :title="exx4Category[i]"
                :color="exx4Colors[i]"
                :width="`${percent}%`"
                height="100%"
                tile
              ></v-sheet>
            </template>
          </v-row>
        </template>
      </v-calendar>
    </flex-box-sheet>

    <!--=== Events ===-->
    <div class="title">Events (Exx.5)</div>
    <div class="subtitle-1">
      This is an example of a planner with additional event handlers and external components controlling
      the display of the calendar.
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
            <code9></code9>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code10></code10>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Calendar -->
    <flex-box-sheet
      :height="64"
    >
      <v-toolbar flat>
        <v-btn outlined class="mr-4" @click="exx5SetToday">
          {{ $t('calendars.today') }}
        </v-btn>
        <v-btn fab text small @click="exx5Prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="exx5Next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ exx5Title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn
              outlined
              v-on="on"
            >
              <span>{{ $t(`calendars.${exx5Type}`) }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="exx5Type = 'day'">
              <v-list-item-title>{{ $t('calendars.day') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exx5Type = 'week'">
              <v-list-item-title>{{ $t('calendars.week') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exx5Type = 'month'">
              <v-list-item-title>{{ $t('calendars.month') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exx5Type = '4day'">
              <v-list-item-title>{{ $t('calendars.4day') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </flex-box-sheet>
    <flex-box-sheet
      :height="600"
    >
      <v-calendar
        ref="calendar"
        :locale="config.locale"
        v-model="exx5Focus"
        color="primary"
        :events="exx5Events"
        :event-color="exx5GetEventColor"
        :now="exx5Today"
        :type="exx5Type"
        @click:event="exx5ShowEvent"
        @click:more="exx5ViewDay"
        @click:date="exx5ViewDay"
        @change="exx5UpdateRange"
      ></v-calendar>
      <v-menu
        v-model="exx5SelectedOpen"
        :close-on-content-click="false"
        :activator="exx5SelectedElement"
        offset-x
      >
        <v-card
          color="grey lighten-4"
          min-width="350px"
          flat
        >
          <v-toolbar
            :color="exx5SelectedEvent.color"
            dark
          >
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="exx5SelectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="exx5SelectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="secondary"
              @click="exx5SelectedOpen = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </flex-box-sheet>
  </div>
</template>

<script>
  import moment from 'moment';
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxSheet from '~/components/widgets/containers/flex-box-sheet';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/components/calendars/code-html-1';
  import Code2 from '~/components/codes/components/calendars/code-js-2';
  import Code3 from '~/components/codes/components/calendars/code-html-3';
  import Code4 from '~/components/codes/components/calendars/code-js-4';
  import Code5 from '~/components/codes/components/calendars/code-css-5';
  import Code6 from '~/components/codes/components/calendars/code-html-6';
  import Code7 from '~/components/codes/components/calendars/code-html-7';
  import Code8 from '~/components/codes/components/calendars/code-js-8';
  import Code9 from '~/components/codes/components/calendars/code-html-9';
  import Code10 from '~/components/codes/components/calendars/code-js-10';


  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxSheet,
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
    },
    data() {
      return {
        title: this.$t('calendars.title'),
        description: this.$t('calendars.description'),
        panel: [],
        exx1Type: 'month',
        exx1Types: ['month', 'week', 'day', '4day'],
        exx1Mode: 'stack',
        exx1Modes: ['stack', 'column'],
        exx1Weekday: [0, 1, 2, 3, 4, 5, 6],
        exx1Weekdays: [
          { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
          { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
          { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
          { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        exx1Value: '',
        exx1Events: [],
        exx1Colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        exx1Names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        exx2Today: '2019-01-08',
        exx2Events: [
          {
            name: 'Weekly Meeting',
            start: '2019-01-07 09:00',
            end: '2019-01-07 10:00',
          },
          {
            name: 'Thomas\' Birthday',
            start: '2019-01-10',
          },
          {
            name: 'Mash Potatoes',
            start: '2019-01-09 12:30',
            end: '2019-01-09 15:30',
          },
        ],
        exx4Today: '2019-01-10',
        exx4Tracked: {
          '2019-01-09': [23, 45, 10],
          '2019-01-08': [10],
          '2019-01-07': [0, 78, 5],
          '2019-01-06': [0, 0, 50],
          '2019-01-05': [0, 10, 23],
          '2019-01-04': [2, 90],
          '2019-01-03': [10, 32],
          '2019-01-02': [80, 10, 10],
          '2019-01-01': [20, 25, 10],
        },
        exx4Colors: ['#1867c0', '#fb8c00', '#000000'],
        exx4Category: ['Development', 'Meetings', 'Slacking'],
        exx5Today: moment().format("YYYY-MM-DD"), //'2019-01-10',
        exx5Focus: '',
        exx5Type: 'month',
        exx5Start: null,
        exx5End: null,
        exx5SelectedEvent: {},
        exx5SelectedElement: null,
        exx5SelectedOpen: false,
        exx5Events: [],
        exx5Colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        exx5Names: [this.$t('calendars.meeting'), this.$t('calendars.holiday'), this.$t('calendars.pto'),
          this.$t('calendars.travel'), this.$t('calendars.event'), this.$t('calendars.birthday'),
          this.$t('calendars.conference'), this.$t('calendars.party')],
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
    mounted () {
      this.$refs.calendar.checkChange()
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig',
        loading: 'getLoading'
      }),
      exx5Title () {
        const { exx5Start, exx5End } = this;
        if (!exx5Start || !exx5End) {
          return ''
        }

        const startMonth = this.exx5MonthFormatter(exx5Start);
        const endMonth = this.exx5MonthFormatter(exx5End);
        const suffixMonth = startMonth === endMonth ? '' : endMonth;

        const startYear = exx5Start.year;
        const endYear = exx5End.year;
        const suffixYear = startYear === endYear ? '' : endYear;

        const startDay = exx5Start.day + this.exx5Nth(exx5Start.day);
        const endDay = exx5End.day + this.exx5Nth(exx5End.day);

        switch (this.exx5Type) {
          case 'month':
            return `${startMonth} ${startYear}`;
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      exx5MonthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
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
      exx1GetEvents ({ start, end }) {
        const events = [];

        const min = new Date(`${start.date}T00:00:00`);
        const max = new Date(`${end.date}T23:59:59`);
        const days = (max.getTime() - min.getTime()) / 86400000;
        const eventCount = this.exx1Rnd(days, days + 20);

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.exx1Rnd(0, 3) === 0;
          const firstTimestamp = this.exx1Rnd(min.getTime(), max.getTime());
          const first = new Date(firstTimestamp - (firstTimestamp % 900000));
          const secondTimestamp = this.exx1Rnd(2, allDay ? 288 : 8) * 900000;
          const second = new Date(first.getTime() + secondTimestamp);

          events.push({
            name: this.exx1Names[this.exx1Rnd(0, this.exx1Names.length - 1)],
            start: this.exx1FormatDate(first, !allDay),
            end: this.exx1FormatDate(second, !allDay),
            color: this.exx1Colors[this.exx1Rnd(0, this.exx1Colors.length - 1)],
          })
        }

        this.exx1Events = events
      },
      exx1GetEventColor (event) {
        return event.color
      },
      exx1Rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      exx1FormatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
      exx5ViewDay ({ date }) {
        this.exx5Focus = date;
        this.exx5Type = 'day'
      },
      exx5GetEventColor (event) {
        return event.color
      },
      exx5SetToday () {
        this.exx5Focus = this.exx5Today
      },
      exx5Prev () {
        this.$refs.calendar.prev()
      },
      exx5Next () {
        this.$refs.calendar.next()
      },
      exx5ShowEvent ({ nativeEvent, event }) {
        const open = () => {
          this.exx5SelectedEvent = event;
          this.exx5SelectedElement = nativeEvent.target;
          setTimeout(() => this.exx5SelectedOpen = true, 10)
        };

        if (this.exx5SelectedOpen) {
          this.exx5SelectedOpen = false;
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      exx5UpdateRange ({ start, end }) {
        const events = [];

        const min = new Date(`${start.date}T00:00:00`);
        const max = new Date(`${end.date}T23:59:59`);
        const days = (max.getTime() - min.getTime()) / 86400000;
        const eventCount = this.exx5Rnd(days, days + 20);

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.exx5Rnd(0, 3) === 0;
          const firstTimestamp = this.exx5Rnd(min.getTime(), max.getTime());
          const first = new Date(firstTimestamp - (firstTimestamp % 900000));
          const secondTimestamp = this.exx5Rnd(2, allDay ? 288 : 8) * 900000;
          const second = new Date(first.getTime() + secondTimestamp);

          events.push({
            name: this.exx5Names[this.exx5Rnd(0, this.exx5Names.length - 1)],
            start: this.exx5FormatDate(first, !allDay),
            end: this.exx5FormatDate(second, !allDay),
            color: this.exx5Colors[this.exx5Rnd(0, this.exx5Colors.length - 1)],
          })
        }

        this.exx5Start = start;
        this.exx5End = end;
        this.exx5Events = events
      },
      exx5Nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      exx5Rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      exx5FormatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
    },
  }
</script>

<style scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
  }

  .my-event.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
</style>
