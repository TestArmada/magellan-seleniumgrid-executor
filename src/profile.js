import _ from "lodash";
import { argv } from "yargs";
import logger from "testarmada-logger";
import settings from "./settings";

export default {
  /* eslint-disable camelcase */
  getNightwatchConfig: (profile) => {
    logger.prefix = "SeleniumGrid Executor";

    const config = {
      desiredCapabilities: profile.desiredCapabilities
    };

    if (settings.config.seleniumgridHost) {
      config.selenium_host = settings.config.seleniumgridHost;
    }

    if (settings.config.seleniumgridPort) {
      config.selenium_port = settings.config.seleniumgridPort;
    }

    logger.debug(`executor config: ${JSON.stringify(config)}`);
    return config;
  },

  getProfiles: (opts, argvMock = null) => {
    logger.prefix = "SeleniumGrid Executor";

    let runArgv = argv;

    if (argvMock) {
      runArgv = argvMock;
    }

    return new Promise((resolve) => {
      const browsers = [];

      if (runArgv.seleniumgrid_browser) {
        browsers.push(runArgv.seleniumgrid_browser);
      } else if (runArgv.seleniumgrid_browser) {
        _.forEach(runArgv.seleniumgrid_browser.split(","), (browser) => {
          browsers.push(browser);
        });
      }

      if (opts.settings.testFramework.profile
        && opts.settings.testFramework.profile.getProfiles) {
        // if framework plugin knows how to solve profiles
        const profiles = opts.settings.testFramework.profile.getProfiles(browsers);

        _.forEach(profiles, (profile) => {
          profile.executor = "seleniumgrid";
        });

        logger.debug(`detected profile: ${JSON.stringify(profiles)}`);
        resolve(profiles);
      } else {
        // framework doesn't understand how to solve profiles
        logger.warn("no profile is detected, use the default one");
        resolve([{ executor: "seleniumgrid", id: "mocha" }]);
      }
    });

  },

  /*eslint-disable global-require*/
  getCapabilities: (profile, opts) => {
    logger.prefix = "SeleniumGrid Executor";

    return new Promise((resolve, reject) => {
      if (opts.settings.testFramework.profile
        && opts.settings.testFramework.profile.getCapabilities) {
        // if framework plugin knows how to solve capabilities


        try {
          const p = opts.settings.testFramework.profile.getCapabilities(profile);
          p.executor = "seleniumgrid";

          resolve(p);
        } catch (e) {
          logger.err(`profile: ${profile} isn't found`);
          reject(e);
        }

      } else {
        // framework doesn't understand how to solve capabilities
        logger.warn("no capabilities is detected, use the default one");
        resolve({ executor: "seleniumgrid", id: "mocha" });
      }
    });
  },

  /*eslint-disable global-require*/
  listBrowsers: (opts, callback) => {
    logger.prefix = "SeleniumGrid Executor";

    if (opts.settings.testFramework.profile
      && opts.settings.testFramework.profile.listBrowsers) {
      // if framework plugin knows how to list browsers

      const listedBrowsers = opts.settings.testFramework.profile.listBrowsers();
      logger.log(`Available browsers: ${listedBrowsers.join(",")}`);

      return callback();
    } else {
      // if framework plugin doesn't know how to list browsers
      return callback();
    }
  }
};
