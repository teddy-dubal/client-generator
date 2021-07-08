<template>
  <form @submit.prevent="handleFormSubmit">
    <v-container fluid>
      <v-row>
        <v-col>
      {{#forEach formFields}}
      {{#compare type "==" "checkbox" }}
          <v-checkbox
            v-model="item.{{{name}}}"
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"{{#if required}}
            required{{/if}}
          />
      {{/compare}}
      {{#compare type "==" "date" }}
          date
      {{/compare}}
      {{#compare type "==" "time" }}
          <v-time-picker
            v-model="item.{{{name}}}"
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            {{#if required}}
            required{{/if}}
          />
      {{/compare}}
      {{#compare type "==" "dateTime" }}
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
          datetime
      {{/compare}}
      {{#compare type "==" "number" }}
          <v-text-field
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            v-model.number="item.{{{name}}}"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"{{#if required}}
            required{{/if}}{{#if step}}
            step="{{{step}}}"{{/if}}
          />
      {{/compare}}
      {{#compare type "==" "text" }}
      {{#if reference}}
          <v-combobox
            v-model="item.{{{name}}}"
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            :items="{{{name}}}SelectItems"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            :no-data-text="$t('{{{../labels.noresults}}}')"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"{{#if required}}
            required{{/if}}{{#unless maxCardinality}}
            multiple{{/unless}}
            item-text="name"
            item-value="@id"{{#unless maxCardinality}}
            chips{{/unless}}
          />
      {{else}}
          <v-text-field
            v-model="item.{{{name}}}"
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"{{#if required}}
            required{{/if}}
          />
      {{/if}}
      {{/compare}}
      {{/forEach}}
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-btn
          color="default"
          @click="handleCancel"
          block
          large
        >\{{ $t('common.form.btn.cancel') }}</v-btn>
      </v-col>
      <v-col>
        <v-btn
          type="submit"
          color="success"
          block
          large
        >\{{ $t('common.form.btn.submit') }}</v-btn>
      </v-col>
    </v-row>
    </v-container>
  </form>
</template>

<script>

export default {
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },
    handleUpdateField: {
      type: Function,
      required: true
    },
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
      default: () => {}
    },
    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },
    violations() {
      return this.errors || {}
    }
  },
  methods: {
    handleFormSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          this.handleSubmit()
        }
      })
    }
  }
}
</script>
