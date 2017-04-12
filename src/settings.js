import { argv } from "yargs";

const debug = argv.debug;

const config = {
  seleniumgridHost: null,
  seleniumgridPort: null,
  seleniumgridURL: null
};

export default {
  debug,
  config
};
