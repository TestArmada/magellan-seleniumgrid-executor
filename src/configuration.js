import { argv } from "yargs";
import logger from "testarmada-logger";
import settings from "./settings";

logger.prefix = "SeleniumGrid Executor";

export default {
  getConfig: () => {
    return settings.config;
  },

  /*eslint-disable no-unused-vars*/
  validateConfig: (opts, argvMock = null, envMock = null) => {
    let runArgv = argv;
    let env = process.env;

    if (argvMock) {
      runArgv = argvMock;
    }

    if (envMock) {
      env = envMock;
    }

    if (runArgv.seleniumgrid_host) {
      settings.config.seleniumgridHost = runArgv.seleniumgrid_host;
    }

    if (runArgv.seleniumgrid_port) {
      settings.config.seleniumgridPort = runArgv.seleniumgrid_port;
    }

    if (runArgv.seleniumgrid_url) {
      settings.config.seleniumgridURL = runArgv.seleniumgrid_url;
    }

    // verifications
    if (settings.config.seleniumgridURL) {
      if (settings.config.seleniumgridHost) {
        logger.err("--seleniumgrid_url cannot be used with --seleniumgrid_host");
        throw new Error("Please use --seleniumgrid_url, "
          + "or --seleniumgrid_host and --seleniumgrid_port");
      }

      if (settings.config.seleniumgridPort) {
        logger.err("--seleniumgrid_url cannot be used with --seleniumgrid_port");
        throw new Error("Please use --seleniumgrid_url, "
          + "or --seleniumgrid_host and --seleniumgrid_port");
      }
    }

    logger.debug("SeleniumGrid configuration: ");
    logger.debug(JSON.stringify(settings.config));

    logger.log("SeleniumGrid configuration OK");

    return settings.config;
  }
};
