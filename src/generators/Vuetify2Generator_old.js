import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";

export default class extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates(`vuetify2/`, [
      // components
      // "components/ActionCell.vue",
      // "components/Breadcrumb.vue",
      // "components/ConfirmDelete.vue",
      // "components/DataFilter.vue",
      // "components/InputDate.vue",
      // "components/Loading.vue",
      // "components/Snackbar.vue",
      // "components/Toolbar.vue",
      // "components/foo/Filter.vue",
      // "components/foo/Form.vue",
      // "components/foo/Layout.vue",

      "store/modules/foo/index.js",
      "store/modules/foo/create/actions.js",
      "store/modules/foo/create/index.js",
      "store/modules/foo/create/mutation_types.js",
      "store/modules/foo/create/mutations.js",
      "store/modules/foo/delete/actions.js",
      "store/modules/foo/delete/index.js",
      "store/modules/foo/delete/mutation_types.js",
      "store/modules/foo/delete/mutations.js",
      "store/modules/foo/list/actions.js",
      "store/modules/foo/list/index.js",
      "store/modules/foo/list/mutation_types.js",
      "store/modules/foo/list/mutations.js",
      "store/modules/foo/show/actions.js",
      "store/modules/foo/show/index.js",
      "store/modules/foo/show/mutation_types.js",
      "store/modules/foo/show/mutations.js",
      "store/modules/foo/update/actions.js",
      "store/modules/foo/update/index.js",
      "store/modules/foo/update/mutation_types.js",
      "store/modules/foo/update/mutations.js",

      // locales
      // "locales/en.js",

      // routes
      "router/foo.js",

      // views
      "views/foo/Create.vue",
      "views/foo/Form.vue",
      "views/foo/List.vue",
      "views/foo/Show.vue",
      "views/foo/Update.vue",
    ]);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();
    console.log(
      'Code for the "%s" resource type has been generated!',
      resource.title
    );
    console.log(
      "Paste the following definitions in your application configuration:"
    );
    console.log(
      chalk.green(`
// Register the routes in you router
// src/router/index.js
import ${titleLc}Routes from './${titleLc}';

// Add routes to VueRouter
export default new VueRouter({
  // ...
  routes: [
      ${titleLc}Routes,
  ]
});

// Register the modules in the store
// src/store/index.js
import ${titleLc}Service from '../services/${titleLc}';
import makeCrudModule from './modules/crud';

export const store = new Vuex.Store({
  // ...
  modules: {
    // other modules
    ${titleLc}: makeCrudModule({
      service: ${titleLc}Service
    })
  }
});
`)
    );
  }

  generateFiles(api, resource, dir, params) {
    super.generateFiles(api, resource, dir, params);

    const context = super.getContextForResource(resource, params);
    const lc = context.lc;

    // Create directories
    // These directories may already exist
    this.createDir(`${dir}/router`, false);
    this.createDir(`${dir}/locales`, false);

    for (let dir of [`${dir}/components/${lc}`, `${dir}/views/${lc}`]) {
      this.createDir(dir);
    }

    this.createFile("locales/en.js", `${dir}/locales/en.js`, context, false);

    [
      // components
      "components/%s/Filter.vue",
      "components/%s/Form.vue",
      "components/%s/Layout.vue",

      // routes
      "router/%s.js",

      // views
      "views/%s/Create.vue",
      "views/%s/List.vue",
      "views/%s/Show.vue",
      "views/%s/Update.vue",
    ].forEach((pattern) =>
      this.createFileFromPattern(pattern, dir, lc, context)
    );

    // components
    [
      "ActionCell.vue",
      "Breadcrumb.vue",
      "ConfirmDelete.vue",
      "DataFilter.vue",
      "InputDate.vue",
      "Loading.vue",
      "Snackbar.vue",
      "Toolbar.vue",
    ].forEach((file) =>
      this.createFile(
        `components/${file}`,
        `${dir}/components/${file}`,
        context,
        false
      )
    );
  }

  generate(api, resource, dir) {
    const lc = resource.title.toLowerCase();
    const titleUcFirst =
      resource.title.charAt(0).toUpperCase() + resource.title.slice(1);

    const context = {
      title: resource.title,
      name: resource.name,
      lc,
      uc: resource.title.toUpperCase(),
      fields: resource.readableFields,
      formFields: this.buildFields(resource.writableFields),
      hydraPrefix: this.hydraPrefix,
      titleUcFirst,
    };

    // Create directories
    // These directories may already exist
    for (let dir of [
      `${dir}/config`,
      `${dir}/error`,
      `${dir}/router`,
      `${dir}/utils`,
    ]) {
      this.createDir(dir, false);
    }

    for (let dir of [
      `${dir}/store/modules/${lc}`,
      `${dir}/store/modules/${lc}/create`,
      `${dir}/store/modules/${lc}/delete`,
      `${dir}/store/modules/${lc}/list`,
      `${dir}/store/modules/${lc}/show`,
      `${dir}/store/modules/${lc}/update`,
      `${dir}/views/${lc}`,
    ]) {
      this.createDir(dir);
    }

    for (let pattern of [
      // modules
      // "store/modules/%s/index.js",
      // "store/modules/%s/create/actions.js",
      // "store/modules/%s/create/index.js",
      // "store/modules/%s/create/mutation_types.js",
      // "store/modules/%s/create/mutations.js",
      // "store/modules/%s/delete/actions.js",
      // "store/modules/%s/delete/index.js",
      // "store/modules/%s/delete/mutation_types.js",
      // "store/modules/%s/delete/mutations.js",
      // "store/modules/%s/list/actions.js",
      // "store/modules/%s/list/index.js",
      // "store/modules/%s/list/mutation_types.js",
      // "store/modules/%s/list/mutations.js",
      // "store/modules/%s/show/actions.js",
      // "store/modules/%s/show/index.js",
      // "store/modules/%s/show/mutation_types.js",
      // "store/modules/%s/show/mutations.js",
      // "store/modules/%s/update/actions.js",
      // "store/modules/%s/update/index.js",
      // "store/modules/%s/update/mutation_types.js",
      // "store/modules/%s/update/mutations.js",
      // components
      // "views/%s/Create.vue",
      // "views/%s/Form.vue",
      // "views/%s/List.vue",
      // "views/%s/Update.vue",
      // "views/%s/Show.vue",
      // routes
      "router/%s.js",
    ]) {
      this.createFileFromPattern(pattern, dir, lc, context);
    }

    // error
    this.createFile(
      "error/SubmissionError.js",
      `${dir}/error/SubmissionError.js`,
      context,
      false
    );

    this.createEntrypoint(api.entrypoint, `${dir}/config/entrypoint.js`);
    this.createFile(
      "utils/fetch.js",
      `${dir}/utils/fetch.js`,
      { hydraPrefix: this.hydraPrefix },
      false
    );
  }
}
