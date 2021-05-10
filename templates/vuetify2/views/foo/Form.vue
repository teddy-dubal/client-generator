<template>
  <form @submit.prevent="handleFormSubmit">
    <v-container fluid>
      {{#forEach formFields}}
      {{#ifOdd index}}
      <v-row>
      {{/ifOdd}}
      {{#compare type "==" "checkbox" }}
        <v-col cols="12" sm="6" md="6">
          <v-checkbox
            v-model="item.{{{name}}}"
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"{{#if required}}
            required{{/if}}
            @blur="$v.item.{{{name}}}.$touch()"
          />
        </v-col>
      {{/compare}}
      {{#compare type "==" "date" }}
        <v-col cols="12" sm="6" md="6">
          date
        </v-col>
      {{/compare}}
      {{#compare type "==" "time" }}
        <v-col cols="12" sm="6" md="6">
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
        </v-col>
      {{/compare}}
      {{#compare type "==" "dateTime" }}
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          datetime
        </v-col>
      {{/compare}}
      {{#compare type "==" "number" }}
        <v-col cols="12" sm="6" md="6">
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
            @blur="$v.item.{{{name}}}.$touch()"
          />
        </v-col>
      {{/compare}}
      {{#compare type "==" "text" }}
      {{#if reference}}
        <v-col cols="12" sm="6" md="6">
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
        </v-col>
      {{else}}
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.{{{name}}}"
            data-vv-name="{{{name}}}"
            :data-vv-as="$t('{{{../lc}}}.form.{{{name}}}')"
            v-validate="'{{#if required}}required{{/if}}'"
            @input="handleUpdateField('{{{name}}}', $event)"
            :error-messages="violations.{{{name}}} || verrors.collect('{{{name}}}')"
            :label="$t('{{{../lc}}}.form.{{{name}}}')"{{#if required}}
            required{{/if}}
            @blur="$v.item.{{{name}}}.$touch()"
          />
        </v-col>
      {{/if}}
      {{/compare}}
      {{#ifEven index}}
      </v-row>
      {{/ifEven}}
      {{#if isLast}}{{#ifOdd index}}
        <v-col cols="12"></v-col>
      </v-row>
      {{/ifOdd}}{{/if}}
      {{/forEach}}
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
