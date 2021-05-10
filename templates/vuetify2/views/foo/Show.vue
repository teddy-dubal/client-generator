
<template>
<v-card>
    <v-card-title>\{{ $t('{{{lc}}}.show.form') }}</v-card-title>
    <v-card-text>
      <v-alert :value="isLoading" color="info" outlined>\{{
        $t('common.alert.loading')
      }}</v-alert>
      <v-alert :value="Boolean(error.length)" dismissible type="error">\{{
        $t(error)
      }}</v-alert>
      <div v-if="item" class="table-{{{lc}}}-show">
      <v-simple-table>
        <template slot="default">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>

              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {{#forEach fields}}
            {{#ifOdd index}}
            <tr>
            {{/ifOdd}}
              <td><strong>\{{ $t('{{{name}}}') }}</strong></td>
              <td>{{#switch type}}
                {{#case "dateTime"}}\{{ formatDateTime(item['{{{name}}}'], 'long') }}{{/case~}}
                {{#case "date"}}\{{ formatDateTime(item['{{{name}}}'], 'short') }}{{/case~}}
                {{#case "number"}}\{{ $t(item['{{{name}}}']) }}{{/case~}}
                {{#default}}
                  {{#if reference}}
                  {{#if maxCardinality }}
                    \{{ item['{{{name}}}'] && item['{{{name}}}'].name }}
                  {{else~}}
                    <ul>
                      <li v-for="_item in item['{{{name}}}']" :key="_item['@id']">
                        \{{ _item['@id'] }}
                      </li>
                    </ul>
                  {{/if}}
                  {{else}}
                    \{{ item['{{{name}}}'] }}
                  {{/if}}
                {{/default}}
              {{/switch}}
              </td>
            {{#ifEven index}}
            </tr>
            {{/ifEven}}
            {{#if isLast}}{{#ifOdd index}}
              <td></td>
            </tr>
            {{/ifOdd}}{{/if}}
            {{/forEach }}
          </tbody>
        </template>
      </v-simple-table>
    </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { get, call } from 'vuex-pathify'

export default {
  props: {
    handleCancel: {
      type: Function,
      required: true
    },
    values: {
      type: Object,
      required: true
    },
    initialValues: {
      type: Object,
      default: () => { }
    }
  },
  created () {
    this.retrieve(this.initialValues.id)
  },
  beforeDestroy () {
    this.reset()
  },
   computed: {
    ...get({
      isLoading: '{{{lc}}}/show/isLoading',
      error: '{{{lc}}}/show/error',
      item: '{{{lc}}}/show/retrieved'
    })
  },
  methods: {
    ...call({
      retrieve: '{{{lc}}}/show/retrieve',
      showReset: '{{{lc}}}/show/reset'
    })
}
</script>
