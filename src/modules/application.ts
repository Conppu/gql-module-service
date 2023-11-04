import { createApplication } from "graphql-modules";
import baseModule from "./base/module.js";
import userModule from "./user/module.js";
import module from "./module.js";

export default createApplication({
  modules: [baseModule, userModule, module],
});
