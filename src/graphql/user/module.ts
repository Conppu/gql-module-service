import { join } from "path";
import * as url from "url";
import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import resolvers from "./resolvers.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const gqlModule = createModule({
  id: "user-module",
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, "./*.graphql")),
  resolvers,
});

export default gqlModule;
