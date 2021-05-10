<template>
  <v-card>
    <v-card-title>\{{ $t('{{{lc}}}.create.form') }}</v-card-title>
    <v-card-text>
      <v-alert :value="isLoading" color="info" outlined>\{{
        $t('common.alert.loading')
      }}</v-alert>
      <v-alert :value="Boolean(error.length)" dismissible type="error">\{{
        $t(error)
      }}</v-alert>
      <{{{titleUcFirst}}}Form
        :handle-cancel="handleCancelCreate"
        :handle-submit="onSendForm"
        :handle-update-field="updateField"
        :values="item"
        :errors="violations"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { get, call } from 'vuex-pathify'
import {{{titleUcFirst}}}Form from './Form.vue'

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
    errors: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    {{{titleUcFirst}}}Form
  },
  data () {
    return {
      item: {}
    }
  },
  computed: {
    ...get({
      error: '{{{lc}}}/create/error',
      isLoading: '{{{lc}}}/create/isLoading',
      created: '{{{lc}}}/create/created',
      violations: '{{{lc}}}/create/violations'
    })
  },
  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    values (elt) {
      if (!elt) {
      return
      }
        this.item = elt
    },
    created (elt) {
      if (!elt) {
        return
      }
      this.item = {}
    }
  },
  created () {
    if (this.values) {
      this.item = this.values
    }
  },
  methods: {
    create: call('{{{lc}}}/create/create'),
    onSendForm () {
      this.create(this.item)
    },
    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    },
    handleCancelCreate () {
      this.item = {}
      this.handleCancel()
    }
  }
}
</script>
