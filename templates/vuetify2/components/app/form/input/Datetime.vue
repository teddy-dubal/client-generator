<template>
  <v-dialog
    ref="dialog"
    v-model="show_datetime"
    :disabled="disabled"
    persistent
    width="290px"
  >
    <template v-slot:[`activator`]="{ on }">
      <v-text-field
        v-on="on"
        :disabled="disabled"
        :value="formatDate"
        :label="label"
        :clearable="clearable"
        @click:clear="cleared"
        prepend-icon="fa-calendar-alt"
        :error-messages="errorMessages"
        readonly
      ></v-text-field>
    </template>
    <div>
      <v-date-picker
        v-show="!show_time"
        v-model="date"
        @input="show_time = true"
        :min="min"
        :max="max"
        :locale="locale"
      >
        <v-btn color="primary" @click="show_datetime = show_time = false"
          >\{{ $t('common.form.datetime.cancel') }}</v-btn
        >
      </v-date-picker>
      <v-time-picker v-show="show_time" v-model="time" format="24hr">
        <v-btn color="primary" @click="show_datetime = show_time = false"
          >\{{ $t('common.form.datetime.cancel') }}</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save"
          >\{{ $t('common.form.datetime.validate') }}</v-btn
        >
      </v-time-picker>
    </div>
  </v-dialog>
</template>
<script>
export default {
  name: 'AppFormInputDatetime',
  data: function () {
    return {
      show_datetime: false,
      show_time: false,
      tmp_datetime: null,
      int_datetime: null
    }
  },
  props: {
    value: {
      type: [String, Date],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    min: {
      type: String
    },
    max: {
      type: String
    },
    locale: {
      type: String,
      default: 'fr-fr'
    },
    errorMessages: {
      type: [String, Array]
    }
  },
  computed: {
    // eslint-disable-next-line
    date: {
      get () {
        const _d = this.tmp_datetime ? this.$moment(this.tmp_datetime) : this.$moment()
        return _d.format('YYYY-MM-DD')
      },
      set (val) {
        this.tmp_datetime = this.$moment(`${ val } ${ this.time }`).format()
        return val
      }
    },
    time: {
      get () {
        const _t = this.tmp_datetime ? this.$moment(this.tmp_datetime) : this.$moment()
        return _t.format('HH:mm')
      },
      set (val) {
        this.tmp_datetime = this.$moment(`${ this.date } ${ val }`).format()
        return val
      }
    },
    formatDate () {
      return this.value ? this.$moment(this.value).format('llll') : ''
    }
  },
  methods: {
    cleared () {
      this.$emit('cleared', true)
    },
    save () {
      this.show_datetime = this.show_time = false
      this.$emit('input', this.tmp_datetime)
    },
    cancel () {
      this.show_datetime = this.show_time = false
    }
  }
}
</script>
