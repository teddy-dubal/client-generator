import { route } from "@/utils/routes"

export default [
  route("{{{titleUcFirst}}}List", { default: "{{{lc}}}/List" }, "{{{name}}}", {
    requiresAuth: true,
  }),
  route(
    "{{{titleUcFirst}}}Create",
    { default: "{{{lc}}}/Create" },
    "{{{name}}}/create",
    { requiresAuth: true }
  ),
  route(
    "{{{titleUcFirst}}}Update",
    { default: "{{{lc}}}/Update" },
    "{{{name}}}/:id/update",
    { requiresAuth: true }
  ),
  route(
    "{{{titleUcFirst}}}Show",
    { default: "{{{lc}}}/Show" },
    "{{{name}}}/:id/show",
    { requiresAuth: true }
  ),
]
