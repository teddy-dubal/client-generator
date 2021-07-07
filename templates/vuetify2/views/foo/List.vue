<template>
  <v-container fluid grid-list-xl>
    <material-card full-header color="primary">
      <template #heading>
        <div class="pa-8 white--text">
          <h1 class>\{{ $t('{{{lc}}}.list.header') }}</h1>
        </div>
      </template>
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn color="primary" @click="add{{{ titleUcFirst }}}">
              \{{ $t('{{{lc}}}.list.btn.create') }}
            </v-btn>
          </v-col>
          <v-col>
            <v-autocomplete
              :loading="isLoadingSearch"
              :items="itemsSearch"
              :search-input.sync="search"
              v-model="select"
              no-filter
              class="mx-4"
              flat
              hide-no-data
              hide-details
              clearable
              :label="$t('{{{lc}}}.list.search')"
              solo
              @change="onSelect($event)"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-alert
          :value="Boolean(error{{{ titleUcFirst }}}.length)"
          dismissible
          type="error"
        >
          \{{ $t(error{{{ titleUcFirst }}}) }}
        </v-alert>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="{{{lc}}}s"
              :server-items-length="view{{{ titleUcFirst }}}.total_items"
              hide-default-footer
              :loading="isLoading{{{ titleUcFirst }}}"
              :loading-text="$t('common.alert.loading')"
              class="elevation-1"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  color="primary"
                  class="mx-1"
                  @click="edit{{{ titleUcFirst }}}(item)"
                >
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn
                  class="mx-1"
                  color="error"
                  @click="delete{{{ titleUcFirst }}}(item)"
                >
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
                <vh-menu :item="item" class="d-inline-block" />
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row row justify-space-around>
          <v-col class="text-md-right">
            <v-pagination
              v-if="view{{{ titleUcFirst }}}.page_count > 1"
              v-model="page"
              :length="view{{{ titleUcFirst }}}.page_count"
            ></v-pagination>
          </v-col>
        </v-row>
        <v-dialog
          v-model="show{{{ titleUcFirst }}}Modal"
          @keydown.esc="show{{{ titleUcFirst }}}Modal = false"
          max-width="750"
        >
          <template v-if="Object.keys(item{{{ titleUcFirst }}}Val).length">
            <update
              :handle-cancel="onCancel{{{ titleUcFirst }}}"
              :errors="violations{{{ titleUcFirst }}}"
              :values="item{{{ titleUcFirst }}}"
              :initial-values="item{{{ titleUcFirst }}}Val"
            />
          </template>
          <template v-else>
            <create
              :handle-cancel="onCancel{{{ titleUcFirst }}}"
              :errors="violations{{{ titleUcFirst }}}"
              :values="item{{{ titleUcFirst }}}"
            />
          </template>
        </v-dialog>
      </v-card-text>
    </material-card>
  </v-container>
</template>

<script>
import { get, call } from 'vuex-pathify'

import Create from './Create'
import Update from './Update'

export default {
  data () {
    return {
      search: null,
      select: null,
      item{{{ titleUcFirst }}}: { },
    item{{{ titleUcFirst }}}Val: { },
    params: { query: { page: 1 }, data: { id: this.$route.params.id } },
    filter: { },
    show{{{ titleUcFirst }}}Modal: false,
      headers: [
        {{#forEach fields}}
        { text: '{{{../lc}}}.list.header.{{{name}}}', value: '{{{name}}}', sortable: false, align: 'left' },
        {{/forEach}}
        { text: '', value: 'action',sortable: false}
      ]
  }
},
watch: {
  page(it) {
    this.params.query.page = it
    this.get{{{ titleUcFirst }}}A(this.params)
  },
  search(val) {
    if (this.isLoadingSearch || !val) return
    this.getSearch{{{ titleUcFirst }}} (val)
  },
  created{{{ titleUcFirst }}}G(item) {
    if (!item) {
      return
    }
    this.onCancel{{{ titleUcFirst }}} ()
    this.get{{{ titleUcFirst }}}A(this.params)

    window.getApp.$emit('APP_SNACK', {
      text: this.$t('{{{lc}}}.created.ok'),
      color: 'green'
    })
  },
  updated{{{ titleUcFirst }}}G(item) {
    if (!item) {
      return
    }
    this.onCancel{{{ titleUcFirst }}} ()
    this.get{{{ titleUcFirst }}}A(this.params)

    window.getApp.$emit('APP_SNACK', {
      text: this.$t('{{{lc}}}.updated.ok'),
      color: 'green'
    })
  },
  deleted{{{ titleUcFirst }}}G(item) {
    if (!item) {
      return
    }
    this.onCancel{{{ titleUcFirst }}} ()
    this.get{{{ titleUcFirst }}}A(this.params)
    window.getApp.$emit('APP_SNACK', {
      text: this.$t('{{{lc}}}.deleted.ok'),
      color: 'green'
    })
  },
  retrieved{{{ titleUcFirst }}}G(val) {
    if (!val) {
      return
    }
    this.item{{{ titleUcFirst }}}Val = val
    this.show{{{ titleUcFirst }}}Modal = true
  }
},
computed: {
    ...get({
  error{{{ titleUcFirst }}}: '{{{lc}}}/list/error',
    isLoading{{{ titleUcFirst }}}: '{{{lc}}}/list/isLoading',
      view{{{ titleUcFirst }}}: '{{{lc}}}/list/view',
        {{{ lc }}}s: '{{{lc}}}/list/items',
          itemsSearch: '{{{lc}}}/list/itemsSearch',
            isLoadingSearch: '{{{lc}}}/list/isLoadingSearch',
              violations{{{ titleUcFirst }}}: '{{{lc}}}/create/violations',
                updated{{{ titleUcFirst }}}G: '{{{lc}}}/update/updated',
                  created{{{ titleUcFirst }}}G: '{{{lc}}}/create/created',
                    deleted{{{ titleUcFirst }}}G: '{{{lc}}}/del/deleted'
    })
  },
components: {
  Update,
    Create
},
created() {
  this.get{{{ titleUcFirst }}}A(this.params)
},
methods: {
    ...call({
  get{{{ titleUcFirst }}}A: '{{{lc}}}/list/items',
  getSearch{{{ titleUcFirst }}}: '{{{lc}}}/list/search',
    delete{{{ titleUcFirst }}}Iem: '{{{lc}}}/del/del'
    }),
delete{{{ titleUcFirst }}}(item) {
  if (window.confirm(this.$t('{{{lc}}}.form.delete.confirm'))) {
    this.delete{{{ titleUcFirst }}}Iem({ ...item })
  }
},
  add{{{ titleUcFirst }}} () {
    this.item{{{ titleUcFirst }}}Val = {}
    this.show{{{ titleUcFirst }}}Modal = true
  },
    edit{{{ titleUcFirst }}} (item) {
      this.item{{{ titleUcFirst }}}Val = item
      this.show{{{ titleUcFirst }}}Modal = true
    },
      onCancel{{{ titleUcFirst }}} () {
        this.show{{{ titleUcFirst }}}Modal = false
      },
        onSelect(val) {
  this.item{{{ titleUcFirst }}}Val = { id: val }
  this.show{{{ titleUcFirst }}}Modal = true
}
  }
}
</script>
