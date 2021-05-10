import chalk from "chalk";
import BaseVueGenerator from "./Vue2BaseGenerator";

export default class extends BaseVueGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates(`vuetify2/`, [
      // components
      "components/Links.vue",
      "components/Overlay.vue",
      "components/Breadcrumb.vue",
      "components/MaterialCard.vue",
      "components/MaterialChartCard.vue",
      "components/app/form/select/Locale.vue",
      "components/app/form/select/Timezone.vue",
      "components/app/form/input/ComboDate.vue",
      "components/app/form/input/Datemonth.vue",
      "components/app/form/input/Scheduler.vue",
      "components/app/form/input/Datetime.vue",
      "components/app/form/input/Tel.vue",
      "components/app/form/input/Password.vue",
      "components/app/BarItem.vue",
      "components/app/Tabs.vue",
      "components/Snackbar.vue",
      "components/MaterialStatsCard.vue",
      // modules
      "store/modules/foo/index.js",
      "store/modules/foo/create/actions.js",
      "store/modules/foo/create/getters.js",
      "store/modules/foo/create/index.js",
      "store/modules/foo/create/mutation_types.js",
      "store/modules/foo/create/mutations.js",
      "store/modules/foo/delete/actions.js",
      "store/modules/foo/delete/getters.js",
      "store/modules/foo/delete/index.js",
      "store/modules/foo/delete/mutation_types.js",
      "store/modules/foo/delete/mutations.js",
      "store/modules/foo/list/actions.js",
      "store/modules/foo/list/getters.js",
      "store/modules/foo/list/index.js",
      "store/modules/foo/list/mutation_types.js",
      "store/modules/foo/list/mutations.js",
      "store/modules/foo/show/actions.js",
      "store/modules/foo/show/getters.js",
      "store/modules/foo/show/index.js",
      "store/modules/foo/show/mutation_types.js",
      "store/modules/foo/show/mutations.js",
      "store/modules/foo/update/actions.js",
      "store/modules/foo/update/getters.js",
      "store/modules/foo/update/index.js",
      "store/modules/foo/update/mutation_types.js",
      "store/modules/foo/update/mutations.js",

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

    for (let dir of [
      `${dir}/components/app/form/input`,
      `${dir}/components/app/form/select`,
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

    // this.createFile("locales/en.js", `${dir}/locales/en.js`, context, false);
    [
      // routes
      "router/%s.js",
      // modules
      "store/modules/%s/index.js",
      "store/modules/%s/create/actions.js",
      "store/modules/%s/create/getters.js",
      "store/modules/%s/create/index.js",
      "store/modules/%s/create/mutation_types.js",
      "store/modules/%s/create/mutations.js",
      "store/modules/%s/delete/actions.js",
      "store/modules/%s/delete/getters.js",
      "store/modules/%s/delete/index.js",
      "store/modules/%s/delete/mutation_types.js",
      "store/modules/%s/delete/mutations.js",
      "store/modules/%s/list/actions.js",
      "store/modules/%s/list/getters.js",
      "store/modules/%s/list/index.js",
      "store/modules/%s/list/mutation_types.js",
      "store/modules/%s/list/mutations.js",
      "store/modules/%s/show/actions.js",
      "store/modules/%s/show/getters.js",
      "store/modules/%s/show/index.js",
      "store/modules/%s/show/mutation_types.js",
      "store/modules/%s/show/mutations.js",
      "store/modules/%s/update/actions.js",
      "store/modules/%s/update/getters.js",
      "store/modules/%s/update/index.js",
      "store/modules/%s/update/mutation_types.js",
      "store/modules/%s/update/mutations.js",
      // views
      "views/%s/Create.vue",
      "views/%s/Form.vue",
      "views/%s/List.vue",
      "views/%s/Show.vue",
      "views/%s/Update.vue",
    ].forEach((pattern) =>
      this.createFileFromPattern(pattern, dir, lc, context)
    );

    // components
    [
      "components/Links.vue",
      "components/Overlay.vue",
      "components/Breadcrumb.vue",
      "components/MaterialCard.vue",
      "components/MaterialChartCard.vue",
      "components/app/form/select/Locale.vue",
      "components/app/form/select/Timezone.vue",
      "components/app/form/input/ComboDate.vue",
      "components/app/form/input/Datemonth.vue",
      "components/app/form/input/Scheduler.vue",
      "components/app/form/input/Datetime.vue",
      "components/app/form/input/Tel.vue",
      "components/app/form/input/Password.vue",
      "components/app/BarItem.vue",
      "components/app/Tabs.vue",
      "components/Snackbar.vue",
      "components/MaterialStatsCard.vue",
    ].forEach((file) =>
      this.createFile(file, `${dir}/${file}`, context, false)
    );
  }
}
