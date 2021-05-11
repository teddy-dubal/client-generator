<template>
  <div>
    <v-tabs color="transparent" fixed-tabs slider-color="yellow">
      <v-menu bottom left>
        <template v-slot:[`activator`]="{ on }">
          <v-btn v-on="on" color="primary" text>
            \{{ $t('crontab.update.tab.minute') }}
            <v-icon>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't1_minute'">
            \{{ $t('crontab.update.tab.minute.t1') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't2_minute'">
            \{{ $t('crontab.update.tab.minute.t2') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't3_minute'">
            \{{ $t('crontab.update.tab.minute.t3') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom left>
        <template v-slot:[`activator`]="{ on }">
          <v-btn v-on="on" color="primary" text>
            \{{ $t('crontab.update.tab.hour') }}
            <v-icon>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't1_hour'">
            \{{ $t('crontab.update.tab.hour.t1') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't2_hour'">
            \{{ $t('crontab.update.tab.hour.t2') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't3_hour'">
            \{{ $t('crontab.update.tab.hour.t3') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom left>
        <template v-slot:[`activator`]="{ on }">
          <v-btn v-on="on" color="primary" text>
            \{{ $t('crontab.update.tab.day.month') }}
            <v-icon>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't1_day_month'">
            \{{ $t('crontab.update.tab.day.month.t1') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't2_day_month'">
            \{{ $t('crontab.update.tab.day.month.t2') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom left>
        <template v-slot:[`activator`]="{ on }">
          <v-btn v-on="on" color="primary" text>
            \{{ $t('crontab.update.tab.month') }}
            <v-icon>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't1_month'">
            \{{ $t('crontab.update.tab.month.t1') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't2_month'">
            \{{ $t('crontab.update.tab.month.t2') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom left>
        <template v-slot:[`activator`]="{ on }">
          <v-btn v-on="on" color="primary" text>
            \{{ $t('crontab.update.tab.day.week') }}
            <v-icon>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't1_day_week'">
            \{{ $t('crontab.update.tab.day.week.t1') }}
          </v-list-item>
        </v-list>
        <v-list class="grey lighten-3">
          <v-list-item @click="tabs = 't2_day_week'">
            \{{ $t('crontab.update.tab.day.week.t2') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item value="t1_minute">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle>
              <v-btn large @click="addCmd('m', '*')">*</v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t2_minute">
        <v-card flat>
          <v-card-text>
            <v-autocomplete
              :label="$t('crontab.update.tab.minute.t2')"
              :items="[
                ...Array(59)
                  .fill()
                  .map((v, i) => String('0' + (i + 1)).slice(-2))
              ]"
              v-model="cmd.m"
              @input="addCmd('m', `*/${parseInt($event)}`)"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t3_minute">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle :key="n" v-for="n in 60">
              <v-btn large @click="addCmdMulti('m', n - 1)"
                >\{{ String('0' + (n - 1)).slice(-2) }}</v-btn
              >
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t1_hour">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle>
              <v-btn large @click="addCmd('h', '*')">*</v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t2_hour">
        <v-card flat>
          <v-card-text>
            <v-autocomplete
              :label="$t('crontab.update.tab.hour.t2')"
              :items="[
                ...Array(23)
                  .fill()
                  .map((v, i) => String('0' + (i + 1)).slice(-2))
              ]"
              v-model="cmd.h"
              @input="addCmd('h', `*/${parseInt($event)}`)"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t3_hour">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle :key="n" v-for="n in 24">
              <v-btn large @click="addCmdMulti('h', n - 1)"
                >\{{ String('0' + (n - 1)).slice(-2) }}</v-btn
              >
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t1_day_month">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle>
              <v-btn large @click="addCmd('dm', '*')">*</v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t2_day_month">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle :key="n" v-for="n in 31">
              <v-btn large @click="addCmdMulti('dm', n)"
                >\{{ String('0' + n).slice(-2) }}</v-btn
              >
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t1_month">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle>
              <v-btn large @click="addCmd('mh', '*')">*</v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t2_month">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle :key="n" v-for="n in 12" multiple>
              <v-btn @click="addCmdMulti('mh', n - 1)"
                >\{{
                  $moment()
                    .set('month', n - 1)
                    .format('MMMM')
                }}</v-btn
              >
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t1_day_week">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle>
              <v-btn @click="addCmd('dw', '*')">*</v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="t2_day_week">
        <v-card flat>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xs-center"
          >
            <v-btn-toggle multiple>
              <v-btn large @click="addCmdMulti('dw', 1)"
                >\{{ $t('crontab.update.tab.day.week1') }}</v-btn
              >
              <v-btn large @click="addCmdMulti('dw', 2)"
                >\{{ $t('crontab.update.tab.day.week2') }}</v-btn
              >
              <v-btn large @click="addCmdMulti('dw', 3)"
                >\{{ $t('crontab.update.tab.day.week3') }}</v-btn
              >
              <v-btn large @click="addCmdMulti('dw', 4)"
                >\{{ $t('crontab.update.tab.day.week4') }}</v-btn
              >
              <v-btn large @click="addCmdMulti('dw', 5)"
                >\{{ $t('crontab.update.tab.day.week5') }}</v-btn
              >
              <v-btn large @click="addCmdMulti('dw', 6)"
                >\{{ $t('crontab.update.tab.day.week6') }}</v-btn
              >
              <v-btn large @click="addCmdMulti('dw', 7)"
                >\{{ $t('crontab.update.tab.day.week7') }}</v-btn
              >
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'AppFormInputScheduler',
  props: {
    value: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: [String, Array]
    }
  },
  data () {
    return {
      tabs: null,
      cmd: {}
    }
  },
  computed: {
    item: {
      get () {
        return this.value
      },
      set (val) {
        return val
      }
    }
  },
  methods: {
    addCmd (key, value) {
      this.cmd[key] = value
      this.setCron(this.cmd)
    },
    addCmdMulti (key, value) {
      if (Array.isArray(this.cmd[key])) {
        const i = this.cmd[key].indexOf(value)
        i >= 0 ? this.cmd[key].splice(i, 1) : this.cmd[key].push(value)
      } else {
        this.cmd[key] = [value]
      }
      this.setCron(this.cmd)
    },
    setCron (cmd) {
      // Order of pos array , is importante
      const pos = ['m', 'h', 'dm', 'mh', 'dw']
      const result = []
      for (let ind = 0 ind < pos.length ind++) {
        const v = cmd[pos[ind]]
        if (Array.isArray(v)) {
          if (v.length === 0) {
            result.push('*')
          } else {
            result.push(v.map(i => Number.parseInt(i)).join(','))
          }
          continue
        }
        if (v === '*' || v === undefined) {
          result.push('*')
        } else {
          result.push(v)
        }
      }
      this.$emit('input', result.join(' '))
    }
  }
}
</script>

<style>
</style>
