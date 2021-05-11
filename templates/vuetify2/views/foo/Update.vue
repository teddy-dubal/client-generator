<template>
  <v-card>
    <v-card-title>\{{ $t('{{{lc}}}.update.form') }}</v-card-title>
    <v-card-text>
      <v-alert :value="isLoading || deleteLoading" color="info" outlined>\{{
        $t('common.alert.loading')
      }}</v-alert>
      <v-alert :value="Boolean(error.length)" dismissible type="error">\{{
        $t(error)
      }}</v-alert>
      <v-alert :value="Boolean(deleteError.length)" dismissible type="error">\{{
        $t(deleteError)
      }}</v-alert>
      <{{{lc}}}-form
        v-if="item"
        :handle-cancel="handleCancel"
        :handle-submit="onSendForm"
        :handle-update-field="updateField"
        :values="item"
        :errors="violations"
        :initial-values="retrieved"
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
    },
    initialValues: {
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
      isLoading: '{{{lc}}}/update/isLoading',
      isLoadingCreate: '{{{lc}}}/create/isLoading',
      error: '{{{lc}}}/update/error',
      deleteError: '{{{lc}}}/del/error',
      deleteLoading: '{{{lc}}}/del/isLoading',
      deleted: '{{{lc}}}/del/deleted',
      retrieved: '{{{lc}}}/update/retrieved',
      violations: '{{{lc}}}/update/violations'
    })
  },
  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    initialValues: function (item) {
      this.retrieve(item.id)
    }
  },
  created () {
    this.retrieve(this.initialValues.id)
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    ...call({
      delReset: '{{{lc}}}/del/reset',
      retrieve: '{{{lc}}}/update/retrieve',
      updateReset: '{{{lc}}}/update/reset',
      createReset: '{{{lc}}}/create/reset',
      updateA: '{{{lc}}}/update/update',
      setRetrievedRetrievedA: '{{{lc}}}/update/setRetrieved',
      updateRetrievedA: '{{{lc}}}/update/updateRetrieved'
    }),
    reset () {
      this.updateReset()
      this.delReset()
      this.createReset()
    },
    onSendForm () {
      this.updateA({})
    },
    updateField (field, value) {
      this.updateRetrievedA({ [field]: value })
    }
  }
}
</script>
